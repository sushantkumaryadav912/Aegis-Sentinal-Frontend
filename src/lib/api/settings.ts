import { apiClient, unwrapData } from '@/lib/api/client';
import { DashboardSettings, DashboardSettingsUpdate } from '@/lib/types';

function getSettingsEndpointPath(): string {
  return process.env.NEXT_PUBLIC_SETTINGS_PATH ?? '/settings';
}

function getRotateApiKeyEndpointPath(): string {
  return `${getSettingsEndpointPath()}/api-key/rotate`;
}

export async function getSettings(): Promise<DashboardSettings> {
  const response = await apiClient.request<unknown>(getSettingsEndpointPath(), {
    method: 'GET',
  });

  return unwrapData<DashboardSettings>(response);
}

export async function updateSettings(payload: DashboardSettingsUpdate): Promise<DashboardSettings> {
  const response = await apiClient.request<unknown>(getSettingsEndpointPath(), {
    method: 'PUT',
    body: payload,
  });

  return unwrapData<DashboardSettings>(response);
}

export async function rotateApiKey(): Promise<DashboardSettings> {
  const response = await apiClient.request<unknown>(getRotateApiKeyEndpointPath(), {
    method: 'POST',
    body: {},
  });

  return unwrapData<DashboardSettings>(response);
}
