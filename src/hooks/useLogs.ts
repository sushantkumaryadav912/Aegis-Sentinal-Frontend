import { useQuery } from '@tanstack/react-query';
import { getLogs, LogsQueryParams } from '@/lib/api/logs';

export function useLogs(params: LogsQueryParams) {
  return useQuery({
    queryKey: ['logs', params],
    queryFn: () => getLogs(params),
    placeholderData: (previousData) => previousData,
  });
}
