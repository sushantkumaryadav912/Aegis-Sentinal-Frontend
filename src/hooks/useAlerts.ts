import { useQuery } from '@tanstack/react-query';
import { AlertsQueryParams, getAlertById, getAlerts } from '@/lib/api/alerts';

export function useAlerts(params: AlertsQueryParams) {
  return useQuery({
    queryKey: ['alerts', params],
    queryFn: () => getAlerts(params),
    placeholderData: (previousData) => previousData,
  });
}

export function useAlertById(id: string) {
  return useQuery({
    queryKey: ['alert', id],
    queryFn: () => getAlertById(id),
    enabled: Boolean(id),
  });
}
