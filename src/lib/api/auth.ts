import { ApiError, apiClient, unwrapData } from '@/lib/api/client';
import { clearAuthTokens, getRefreshToken, setAuthTokens } from '@/lib/auth-tokens';

export type LoginPayload = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export type RegisterPayload = {
  fullName: string;
  email: string;
  password: string;
};

export type AuthResponse = {
  message?: string;
  accessToken?: string;
  refreshToken?: string;
  expiresIn?: number;
  expiresAt?: number;
};

function getLoginEndpointPath(): string {
  return process.env.NEXT_PUBLIC_AUTH_LOGIN_PATH ?? '/auth/login';
}

function getRegisterEndpointPath(): string {
  return process.env.NEXT_PUBLIC_AUTH_REGISTER_PATH ?? '/auth/signup';
}

function getLogoutEndpointPath(): string {
  return process.env.NEXT_PUBLIC_AUTH_LOGOUT_PATH ?? '/auth/logout';
}

function normalizeTokens(payload: AuthResponse): {
  accessToken?: string;
  refreshToken?: string;
  expiresAt?: number;
} {
  const accessToken = payload.accessToken;
  const refreshToken = payload.refreshToken;
  const expiresAt = payload.expiresAt ?? (payload.expiresIn ? Date.now() + payload.expiresIn * 1000 : undefined);

  return {
    accessToken,
    refreshToken,
    expiresAt,
  };
}

function buildErrorMessage(status: number, fallback: string): string {
  if (status >= 500) {
    return 'Authentication service is unavailable. Please try again shortly.';
  }

  return fallback;
}

async function postAuth<TPayload>(endpoint: string, payload: TPayload): Promise<AuthResponse> {
  try {
    const rawResponse = await apiClient.request<unknown>(endpoint, {
      method: 'POST',
      body: payload,
    });

    const unwrapped = unwrapData<AuthResponse>(rawResponse) ?? {};
    const normalized = normalizeTokens(unwrapped);

    if (normalized.accessToken) {
      setAuthTokens({
        accessToken: normalized.accessToken,
        refreshToken: normalized.refreshToken,
        expiresAt: normalized.expiresAt,
      });
    }

    return unwrapped;
  } catch (error) {
    if (error instanceof ApiError) {
      throw new Error(buildErrorMessage(error.status, error.message));
    }

    throw error;
  }
}

export async function login(payload: LoginPayload): Promise<AuthResponse> {
  return postAuth(getLoginEndpointPath(), payload);
}

export async function register(payload: RegisterPayload): Promise<AuthResponse> {
  return postAuth(getRegisterEndpointPath(), payload);
}

export async function logout(): Promise<void> {
  const refreshToken = getRefreshToken();

  try {
    await apiClient.request<unknown>(getLogoutEndpointPath(), {
      method: 'POST',
      body: refreshToken ? { refreshToken } : {},
    });
  } finally {
    clearAuthTokens();
  }
}
