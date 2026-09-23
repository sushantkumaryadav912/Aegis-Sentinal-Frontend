import { useQuery } from '@tanstack/react-query';
import { getWorkflows, WorkflowsQueryParams } from '@/lib/api/workflows';
import { getMockPaginatedWorkflows } from '@/lib/mockData';

export function useWorkflows(params: WorkflowsQueryParams) {
  return useQuery({
    queryKey: ['workflows', params],
    queryFn: async () => {
      try {
        const response = await getWorkflows(params);
        if (response.items && response.items.length > 0) {
          return response;
        }
        return getMockPaginatedWorkflows(params);
      } catch {
        return getMockPaginatedWorkflows(params);
      }
      return getWorkflows(params);
    },
    placeholderData: (previousData) => previousData,
  });
}

