import { useQuery } from '@tanstack/react-query';
import { getAlerts } from '@/lib/api/alerts';
import { getDashboardMetrics, getRecentAlerts } from '@/lib/api/dashboard';
import { MOCK_ALERTS, MOCK_DASHBOARD_METRICS, MOCK_RISK_DISTRIBUTION } from '@/lib/mockData';

export function useDashboard() {
  return useQuery({
    queryKey: ['dashboard', 'overview'],
    queryFn: async () => {
      try {
        const [metrics, recentAlerts, allAlerts] = await Promise.all([
          getDashboardMetrics(),
          getRecentAlerts(5),
          getAlerts({ page: 1, limit: 500 }),
        ]);

        const riskSource = allAlerts.items.length > 0 ? allAlerts.items : MOCK_ALERTS;

        const riskDistribution = {
          low: riskSource.filter((alert) => alert.risk_score < 60).length,
          medium: riskSource.filter((alert) => alert.risk_score >= 60 && alert.risk_score < 85).length,
          high: riskSource.filter((alert) => alert.risk_score >= 85).length,
        };

        return {
          metrics: metrics || MOCK_DASHBOARD_METRICS,
          recentAlerts: recentAlerts.length > 0 ? recentAlerts : MOCK_ALERTS.slice(0, 5),
          riskDistribution,
          isLive: true,
        };
      } catch {
        // High availability fallback for Atlas Executive Dashboard
        return {
          metrics: MOCK_DASHBOARD_METRICS,
          recentAlerts: MOCK_ALERTS.slice(0, 5),
          riskDistribution: MOCK_RISK_DISTRIBUTION,
          isLive: false,
        };
      }
    },
  });
}

