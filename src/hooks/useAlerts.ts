import { useQuery } from '@tanstack/react-query';
import { AlertsQueryParams, getAlertById, getAlerts } from '@/lib/api/alerts';
import { getMockPaginatedAlerts, MOCK_ALERTS } from '@/lib/mockData';

export function useAlerts(params: AlertsQueryParams) {
  return useQuery({
    queryKey: ['alerts', params],
    queryFn: async () => {
      try {
        const response = await getAlerts(params);
        if (response.items && response.items.length > 0) {
          return response;
        }
        return getMockPaginatedAlerts(params);
      } catch {
        return getMockPaginatedAlerts(params);
      }
      return getAlerts(params);
    },
    placeholderData: (previousData) => previousData,
  });
}

export function useAlertById(id: string) {
  return useQuery({
    queryKey: ['alert', id],
    queryFn: async () => {
      try {
        const alert = await getAlertById(id);
        if (alert) return alert;
      } catch {
        // Fallback search in hardcoded mock dataset
      }
      const mockAlert = MOCK_ALERTS.find((a) => a.id === id);
      if (mockAlert) return mockAlert;
      throw new Error(`Alert ${id} not found.`);
      return getAlertById(id);
    },
    enabled: Boolean(id),
  });
}

