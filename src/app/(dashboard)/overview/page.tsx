'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useDashboard } from '@/hooks/useDashboard';
import { AlertTriangle, CheckCircle, AlertCircle, Activity } from 'lucide-react';
import { AlertCard } from '@/components/alerts/alert-card';
import { Skeleton } from '@/components/ui/skeleton';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function OverviewPage() {
  const router = useRouter();
  const { data, isLoading, isError, error, refetch } = useDashboard();

  const metrics = data?.metrics;
  const recentAlerts = data?.recentAlerts ?? [];
  const totalDistributionAlerts =
    (data?.riskDistribution.low ?? 0) +
    (data?.riskDistribution.medium ?? 0) +
    (data?.riskDistribution.high ?? 0);

  if (isLoading && !data) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-48" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
      </div>
    );
  }

  if (isError || !metrics) {
    return (
      <div className="space-y-6" data-testid="overview-error-state">
        <div>
          <h1 className="text-3xl font-bold text-slate-100 mb-2">Security Overview</h1>
          <p className="text-slate-400">Monitor your cloud security posture at a glance</p>
        </div>
        <div className="border border-slate-800 rounded-lg p-6 text-center space-y-4">
          <AlertCircle className="h-10 w-10 text-red-400 mx-auto" />
          <div>
            <h2 className="text-lg font-semibold text-slate-100">Unable to load dashboard</h2>
            <p className="text-sm text-slate-400 mt-1">
              {error instanceof Error
                ? error.message
                : 'An unexpected error occurred while fetching dashboard data.'}
            </p>
          </div>
          <Button onClick={() => refetch()} variant="outline">
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8" data-testid="overview-page">
      <div>
        <h1 className="text-3xl font-bold text-slate-100 mb-2">Security Overview</h1>
        <p className="text-slate-400">Monitor your cloud security posture at a glance</p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Total Alerts</CardTitle>
            <Activity className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-100" data-testid="metric-total-alerts">{metrics.total_alerts}</div>
            <p className="text-xs text-slate-500 mt-1">All time</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Critical Alerts</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-400" data-testid="metric-critical-alerts">{metrics.critical_alerts}</div>
            <p className="text-xs text-slate-500 mt-1">Requiring immediate attention</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Open Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-amber-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-amber-400" data-testid="metric-open-alerts">{metrics.open_alerts}</div>
            <p className="text-xs text-slate-500 mt-1">Currently under investigation</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Resolved Alerts</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-400" data-testid="metric-resolved-alerts">{metrics.resolved_alerts}</div>
            <p className="text-xs text-slate-500 mt-1">Successfully mitigated</p>
          </CardContent>
        </Card>
      </div>

      {/* Risk Distribution */}
      <Card className="bg-slate-900/50 border-slate-800">
        <CardHeader>
          <CardTitle>Risk Score Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-slate-400">Low Risk (0-59)</span>
                <span className="text-sm text-blue-400">
                  {data.riskDistribution.low} alerts
                </span>
              </div>
              <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                <progress
                  className="h-3 w-full rounded-full [&::-moz-progress-bar]:bg-blue-500 [&::-webkit-progress-bar]:bg-slate-800 [&::-webkit-progress-value]:bg-blue-500"
                  value={data.riskDistribution.low}
                  max={Math.max(totalDistributionAlerts, 1)}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-slate-400">Medium Risk (60-84)</span>
                <span className="text-sm text-amber-400">
                  {data.riskDistribution.medium} alerts
                </span>
              </div>
              <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                <progress
                  className="h-3 w-full rounded-full [&::-moz-progress-bar]:bg-amber-500 [&::-webkit-progress-bar]:bg-slate-800 [&::-webkit-progress-value]:bg-amber-500"
                  value={data.riskDistribution.medium}
                  max={Math.max(totalDistributionAlerts, 1)}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-slate-400">High Risk (85-100)</span>
                <span className="text-sm text-red-400">
                  {data.riskDistribution.high} alerts
                </span>
              </div>
              <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                <progress
                  className="h-3 w-full rounded-full [&::-moz-progress-bar]:bg-red-500 [&::-webkit-progress-bar]:bg-slate-800 [&::-webkit-progress-value]:bg-red-500"
                  value={data.riskDistribution.high}
                  max={Math.max(totalDistributionAlerts, 1)}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Alerts */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-slate-100">Recent Alerts</h2>
          <Link
            href="/alerts"
            className="text-sm text-blue-400 hover:text-blue-300"
            data-testid="view-all-alerts"
          >
            View All →
          </Link>
        </div>
        <div className="space-y-4">
          {recentAlerts.map((alert) => (
            <AlertCard
              key={alert.id}
              alert={alert}
              onClick={() => router.push(`/alerts/${alert.id}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
