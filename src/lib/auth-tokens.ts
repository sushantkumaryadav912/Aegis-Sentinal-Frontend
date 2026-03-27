export interface AuthTokens {
  accessToken: string;
  refreshToken?: string;
  expiresAt?: number;
}

const ACCESS_TOKEN_KEY = 'cidr.accessToken';
const REFRESH_TOKEN_KEY = 'cidr.refreshToken';
const EXPIRES_AT_KEY = 'cidr.expiresAt';
const DUMMY_AUTH_BYPASS_KEY = 'cidr.dummyAuthBypass';

function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

function readLocalStorage(key: string): string | null {
  if (!isBrowser()) {
    return null;
  }

  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeLocalStorage(key: string, value: string): void {
  if (!isBrowser()) {
    return;
  }

  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Ignore write failures.
  }
}

function removeLocalStorage(key: string): void {
  if (!isBrowser()) {
    return;
  }

  try {
    window.localStorage.removeItem(key);
  } catch {
    // Ignore remove failures.
  }
}

function decodeJwtPayload(token: string): Record<string, unknown> | null {
  const segments = token.split('.');
  if (segments.length < 2) {
    return null;
  }

  try {
    const payload = segments[1]
      .replace(/-/g, '+')
      .replace(/_/g, '/');
    const normalized = payload.padEnd(Math.ceil(payload.length / 4) * 4, '=');

    if (typeof atob === 'function') {
      return JSON.parse(atob(normalized));
    }

    return JSON.parse(Buffer.from(normalized, 'base64').toString('utf8'));
  } catch {
    return null;
  }
}

function deriveExpiryFromJwt(accessToken: string): number | undefined {
  const payload = decodeJwtPayload(accessToken);
  const exp = payload?.exp;

  if (typeof exp !== 'number') {
    return undefined;
  }

  return exp * 1000;
}

export function getAuthTokens(): AuthTokens | null {
  const accessToken = readLocalStorage(ACCESS_TOKEN_KEY);

  if (!accessToken) {
    return null;
  }

  const refreshToken = readLocalStorage(REFRESH_TOKEN_KEY) ?? undefined;
  const rawExpiresAt = readLocalStorage(EXPIRES_AT_KEY);
  const expiresAt = rawExpiresAt ? Number(rawExpiresAt) : undefined;

  return {
    accessToken,
    refreshToken,
    expiresAt: Number.isFinite(expiresAt) ? expiresAt : undefined,
  };
}

export function getAccessToken(): string | null {
  return getAuthTokens()?.accessToken ?? null;
}

export function getRefreshToken(): string | null {
  return getAuthTokens()?.refreshToken ?? null;
}

export function hasRefreshToken(): boolean {
  return Boolean(getRefreshToken());
}

export function setAuthTokens(tokens: AuthTokens): void {
  writeLocalStorage(ACCESS_TOKEN_KEY, tokens.accessToken);

  if (tokens.refreshToken) {
    writeLocalStorage(REFRESH_TOKEN_KEY, tokens.refreshToken);
  } else {
    removeLocalStorage(REFRESH_TOKEN_KEY);
  }

  const expiresAt = tokens.expiresAt ?? deriveExpiryFromJwt(tokens.accessToken);

  if (expiresAt) {
    writeLocalStorage(EXPIRES_AT_KEY, String(expiresAt));
  } else {
    removeLocalStorage(EXPIRES_AT_KEY);
  }
}

export function clearAuthTokens(): void {
  removeLocalStorage(ACCESS_TOKEN_KEY);
  removeLocalStorage(REFRESH_TOKEN_KEY);
  removeLocalStorage(EXPIRES_AT_KEY);
  removeLocalStorage(DUMMY_AUTH_BYPASS_KEY);
}

export function enableDummyAuthBypass(): void {
  writeLocalStorage(DUMMY_AUTH_BYPASS_KEY, '1');
}

export function disableDummyAuthBypass(): void {
  removeLocalStorage(DUMMY_AUTH_BYPASS_KEY);
}

export function isDummyAuthBypassEnabled(): boolean {
  return readLocalStorage(DUMMY_AUTH_BYPASS_KEY) === '1';
}

export function isAccessTokenExpired(bufferSeconds: number = 30): boolean {
  const tokens = getAuthTokens();

  if (!tokens?.accessToken) {
    return true;
  }

  const expiresAt = tokens.expiresAt ?? deriveExpiryFromJwt(tokens.accessToken);
  if (!expiresAt) {
    return false;
  }

  return Date.now() + bufferSeconds * 1000 >= expiresAt;
}
