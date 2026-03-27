import { Alert, AlertStatus, PaginatedResponse, Severity } from '@/lib/types';
import { apiClient, toPaginatedResponse, unwrapData } from '@/lib/api/client';

export interface AlertsQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  severity?: Severity;
  status?: AlertStatus;
}

function cleanAlertsQuery(params: AlertsQueryParams): Record<string, string | number> {
  return Object.entries(params).reduce<Record<string, string | number>>((acc, [key, value]) => {
    if (value === undefined || value === null || value === '') {
      return acc;
    }

    acc[key] = value;
    return acc;
  }, {});
}

export async function getAlerts(params: AlertsQueryParams = {}): Promise<PaginatedResponse<Alert>> {
  const page = params.page ?? 1;
  const limit = params.limit ?? 20;
  const rawResponse = await apiClient.request<unknown>('/alerts', {
    query: cleanAlertsQuery({ ...params, page, limit }),
  });

  return toPaginatedResponse<Alert>(rawResponse, { page, limit });
}

export async function getAlertById(id: string): Promise<Alert> {
  const rawResponse = await apiClient.request<unknown>(`/alerts/${id}`);
  return unwrapData<Alert>(rawResponse);
}
