import { useQuery } from '@tanstack/react-query';
import { getAlerts } from '@/lib/api/alerts';
import { getDashboardMetrics, getRecentAlerts } from '@/lib/api/dashboard';

export function useDashboard() {
  return useQuery({
    queryKey: ['dashboard', 'overview'],
    queryFn: async () => {
      const [metrics, recentAlerts, allAlerts] = await Promise.all([
        getDashboardMetrics(),
        getRecentAlerts(5),
        getAlerts({ page: 1, limit: 500 }),
      ]);

      const riskSource = allAlerts.items;

      const riskDistribution = {
        low: riskSource.filter((alert) => alert.risk_score < 60).length,
        medium: riskSource.filter((alert) => alert.risk_score >= 60 && alert.risk_score < 85).length,
        high: riskSource.filter((alert) => alert.risk_score >= 85).length,
      };

      return {
        metrics,
        recentAlerts,
        riskDistribution,
      };
    },
  });
}
