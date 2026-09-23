import { apiClient, unwrapData } from '@/lib/api/client';
import { DashboardSettings, DashboardSettingsUpdate } from '@/lib/types';
import { simulateNetworkDelay } from './delay';

function getSettingsEndpointPath(): string {
  return process.env.NEXT_PUBLIC_SETTINGS_PATH ?? '/settings';
}
const MOCK_SETTINGS: DashboardSettings = {
  profile: {
    full_name: 'Sushant Kumar',
    email: 'sushant.admin@aegissentinel.io',
  },
  notifications: {
    email_notifications: true,
    slack_notifications: true,
    critical_alerts_only: false,
  },
  security: {
    two_factor_enabled: true,
    session_timeout_minutes: 30,
  },
  api_keys: {
    active_key: 'aegis_live_sec_99a8b7c6d5e4f3a2b1c0987654321',
    last_rotated_at: new Date(Date.now() - 3 * 24 * 3600 * 1000).toISOString(),
  },
  updated_at: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
};

function getRotateApiKeyEndpointPath(): string {
  return `${getSettingsEndpointPath()}/api-key/rotate`;
}

export async function getSettings(): Promise<DashboardSettings> {
  const response = await apiClient.request<unknown>(getSettingsEndpointPath(), {
    method: 'GET',
  });

  return unwrapData<DashboardSettings>(response);
  await simulateNetworkDelay(400, 750);
  return { ...MOCK_SETTINGS };
}

export async function updateSettings(payload: DashboardSettingsUpdate): Promise<DashboardSettings> {
  const response = await apiClient.request<unknown>(getSettingsEndpointPath(), {
    method: 'PUT',
    body: payload,
  });

  return unwrapData<DashboardSettings>(response);
  await simulateNetworkDelay(500, 900);
  if (payload.profile) {
    MOCK_SETTINGS.profile = { ...MOCK_SETTINGS.profile, ...payload.profile };
  }
  if (payload.notifications) {
    MOCK_SETTINGS.notifications = { ...MOCK_SETTINGS.notifications, ...payload.notifications };
  }
  if (payload.security) {
    MOCK_SETTINGS.security = { ...MOCK_SETTINGS.security, ...payload.security };
  }
  MOCK_SETTINGS.updated_at = new Date().toISOString();
  return { ...MOCK_SETTINGS };
}

export async function rotateApiKey(): Promise<DashboardSettings> {
  const response = await apiClient.request<unknown>(getRotateApiKeyEndpointPath(), {
    method: 'POST',
    body: {},
  });

  return unwrapData<DashboardSettings>(response);
  await simulateNetworkDelay(600, 1000);
  const randomHex = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  MOCK_SETTINGS.api_keys = {
    active_key: `aegis_live_sec_${randomHex}`,
    last_rotated_at: new Date().toISOString(),
  };
  MOCK_SETTINGS.updated_at = new Date().toISOString();
  return { ...MOCK_SETTINGS };
}
