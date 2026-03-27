import {
  login,
  logout,
  register,
  type AuthResponse,
  type LoginPayload,
  type RegisterPayload,
} from '@/lib/api/auth';
import { clearAuthTokens, enableDummyAuthBypass } from '@/lib/auth-tokens';

function getDummyAuthEmail(): string {
  return (process.env.NEXT_PUBLIC_DUMMY_AUTH_EMAIL ?? '').trim().toLowerCase();
}

function getDummyAuthPassword(): string {
  return process.env.NEXT_PUBLIC_DUMMY_AUTH_PASSWORD ?? '';
}

function shouldBypassAuth(email: string, password: string): boolean {
  const dummyEmail = getDummyAuthEmail();
  const dummyPassword = getDummyAuthPassword();

  if (!dummyEmail || !dummyPassword) {
    return false;
  }

  return email.trim().toLowerCase() === dummyEmail && password === dummyPassword;
}

export async function loginUser(payload: LoginPayload): Promise<AuthResponse> {
  if (shouldBypassAuth(payload.email, payload.password)) {
    clearAuthTokens();
    enableDummyAuthBypass();
    return { message: 'Authenticated using local dummy credentials.' };
  }

  return login(payload);
}

export async function registerUser(payload: RegisterPayload): Promise<AuthResponse> {
  if (shouldBypassAuth(payload.email, payload.password)) {
    clearAuthTokens();
    enableDummyAuthBypass();
    return { message: 'Registered using local dummy credentials.' };
  }

  return register(payload);
}

export async function logoutUser(): Promise<void> {
  await logout();
}
