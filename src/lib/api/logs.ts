import { Log, PaginatedResponse } from '@/lib/types';
import { apiClient, toPaginatedResponse } from '@/lib/api/client';

export interface LogsQueryParams {
  page?: number;
  limit?: number;
  search?: string;
}

function cleanLogsQuery(params: LogsQueryParams): Record<string, string | number> {
  return Object.entries(params).reduce<Record<string, string | number>>((acc, [key, value]) => {
    if (value === undefined || value === null || value === '') {
      return acc;
    }

    acc[key] = value;
    return acc;
  }, {});
}

export async function getLogs(params: LogsQueryParams = {}): Promise<PaginatedResponse<Log>> {
  const page = params.page ?? 1;
  const limit = params.limit ?? 20;

  const rawResponse = await apiClient.request<unknown>('/logs', {
    query: cleanLogsQuery({ ...params, page, limit }),
  });

  return toPaginatedResponse<Log>(rawResponse, { page, limit });
}
