import { clearAuthTokens, getRefreshToken, setAuthTokens } from '@/lib/auth-tokens';
import { simulateNetworkDelay } from './delay';

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

export async function login(payload: LoginPayload): Promise<AuthResponse> {
  await simulateNetworkDelay(500, 950);
  const mockResponse: AuthResponse = {
    message: 'Authenticated successfully with Aegis Sentinel Security Platform',
    accessToken: 'mock_jwt_access_token_aegis_secops_2026',
    refreshToken: 'mock_jwt_refresh_token_aegis_secops_2026',
    expiresIn: 3600,
    expiresAt: Date.now() + 3600 * 1000,
  };

  setAuthTokens({
    accessToken: mockResponse.accessToken!,
    refreshToken: mockResponse.refreshToken,
    expiresAt: mockResponse.expiresAt,
  });

  return mockResponse;
}

export async function register(payload: RegisterPayload): Promise<AuthResponse> {
  await simulateNetworkDelay(600, 1050);
  const mockResponse: AuthResponse = {
    message: 'Registered successfully with Aegis Sentinel',
    accessToken: 'mock_jwt_access_token_aegis_secops_2026',
    refreshToken: 'mock_jwt_refresh_token_aegis_secops_2026',
    expiresIn: 3600,
    expiresAt: Date.now() + 3600 * 1000,
  };

  setAuthTokens({
    accessToken: mockResponse.accessToken!,
    refreshToken: mockResponse.refreshToken,
    expiresAt: mockResponse.expiresAt,
  });

  return mockResponse;
}

export async function logout(): Promise<void> {
  await simulateNetworkDelay(300, 600);
  clearAuthTokens();
}
