import { useQuery } from '@tanstack/react-query';
import { getWorkflows, WorkflowsQueryParams } from '@/lib/api/workflows';

export function useWorkflows(params: WorkflowsQueryParams) {
  return useQuery({
    queryKey: ['workflows', params],
    queryFn: () => getWorkflows(params),
    placeholderData: (previousData) => previousData,
  });
}
