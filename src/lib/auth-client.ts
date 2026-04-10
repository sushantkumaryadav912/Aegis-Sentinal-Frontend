import {
  login,
  logout,
  register,
  type AuthResponse,
  type LoginPayload,
  type RegisterPayload,
} from '@/lib/api/auth';
import { clearAuthTokens } from '@/lib/auth-tokens';

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
    // Use configured dummy credentials through the real backend login route
    // so cookie-based protected APIs can authenticate normally.
    clearAuthTokens();
    const response = await login(payload);
    return {
      ...response,
      message: response.message ?? 'Authenticated using configured dummy credentials.',
    };
  }

  return login(payload);
}

export async function registerUser(payload: RegisterPayload): Promise<AuthResponse> {
  if (shouldBypassAuth(payload.email, payload.password)) {
    clearAuthTokens();
    const response = await register(payload);
    return {
      ...response,
      message: response.message ?? 'Registered using configured dummy credentials.',
    };
  }

  return register(payload);
}

export async function logoutUser(): Promise<void> {
  await logout();
}
