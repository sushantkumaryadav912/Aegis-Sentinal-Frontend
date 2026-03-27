import { PaginatedResponse, Workflow, WorkflowStatus } from '@/lib/types';
import { apiClient, toPaginatedResponse } from '@/lib/api/client';

export interface WorkflowsQueryParams {
  page?: number;
  limit?: number;
  alertId?: string;
  status?: WorkflowStatus;
}

function cleanWorkflowsQuery(params: WorkflowsQueryParams): Record<string, string | number> {
  return Object.entries(params).reduce<Record<string, string | number>>((acc, [key, value]) => {
    if (value === undefined || value === null || value === '') {
      return acc;
    }

    acc[key] = value;
    return acc;
  }, {});
}

export async function getWorkflows(params: WorkflowsQueryParams = {}): Promise<PaginatedResponse<Workflow>> {
  const page = params.page ?? 1;
  const limit = params.limit ?? 20;

  const rawResponse = await apiClient.request<unknown>('/workflows', {
    query: cleanWorkflowsQuery({ ...params, page, limit }),
  });

  return toPaginatedResponse<Workflow>(rawResponse, { page, limit });
}
