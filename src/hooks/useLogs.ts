import { useQuery } from '@tanstack/react-query';
import { getLogs, LogsQueryParams } from '@/lib/api/logs';
import { getMockPaginatedLogs } from '@/lib/mockData';

export function useLogs(params: LogsQueryParams) {
  return useQuery({
    queryKey: ['logs', params],
    queryFn: async () => {
      try {
        const response = await getLogs(params);
        if (response.items && response.items.length > 0) {
          return response;
        }
        return getMockPaginatedLogs(params);
      } catch {
        return getMockPaginatedLogs(params);
      }
    },
    placeholderData: (previousData) => previousData,
  });
}

