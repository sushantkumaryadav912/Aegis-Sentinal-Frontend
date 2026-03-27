import { Alert, AuditLog, DashboardMetrics, PaginatedResponse } from '@/lib/types';
import { apiClient, toPaginatedResponse, unwrapData } from '@/lib/api/client';

export interface AuditLogsQueryParams {
  page?: number;
  limit?: number;
}

export async function getDashboardMetrics(): Promise<DashboardMetrics> {
  const rawResponse = await apiClient.request<unknown>('/dashboard/metrics');
  return unwrapData<DashboardMetrics>(rawResponse);
}

export async function getRecentAlerts(limit: number = 5): Promise<Alert[]> {
  const rawResponse = await apiClient.request<unknown>('/alerts', {
    query: {
      page: 1,
      limit,
    },
  });

  const paginated = toPaginatedResponse<Alert>(rawResponse, { page: 1, limit });
  return paginated.items;
}

export async function getAuditLogs(
  params: AuditLogsQueryParams = {}
): Promise<PaginatedResponse<AuditLog>> {
  const page = params.page ?? 1;
  const limit = params.limit ?? 50;

  const rawResponse = await apiClient.request<unknown>('/audit-logs', {
    query: {
      page,
      limit,
    },
  });

  return toPaginatedResponse<AuditLog>(rawResponse, { page, limit });
}
