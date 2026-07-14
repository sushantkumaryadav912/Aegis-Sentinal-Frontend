'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useDashboard } from '@/hooks/useDashboard';
import { AlertTriangle, CheckCircle, AlertCircle, Activity, ArrowRight } from 'lucide-react';
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
        <div className="border border-slate-900 rounded-2xl p-8 text-center space-y-4 bg-slate-950/40 backdrop-blur-md max-w-xl mx-auto">
          <AlertCircle className="h-10 w-10 text-red-400 mx-auto" />
          <div>
            <h2 className="text-lg font-semibold text-slate-100">Unable to load dashboard</h2>
            <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
              {error instanceof Error
                ? error.message
                : 'An unexpected error occurred while fetching dashboard data.'}
            </p>
          </div>
          <Button onClick={() => refetch()} variant="outline" className="text-xs tracking-wider uppercase font-bold px-5">
            Retry Connection
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8" data-testid="overview-page">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-100 tracking-tight mb-2">Security Overview</h1>
        <p className="text-sm text-slate-400 font-light">Monitor your cloud security posture at a glance</p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card glass glow glowColor="blue">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Alerts</CardTitle>
            <Activity className="h-4 w-4 text-cyan-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold text-slate-100 font-mono" data-testid="metric-total-alerts">{metrics.total_alerts}</div>
            <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mt-1">Ingested events</p>
          </CardContent>
        </Card>

        <Card glass glow glowColor="rose">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-bold text-slate-400 uppercase tracking-widest">Critical Alerts</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold text-red-400 font-mono" data-testid="metric-critical-alerts">{metrics.critical_alerts}</div>
            <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mt-1">Requires quarantine</p>
          </CardContent>
        </Card>

        <Card glass glow glowColor="amber">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-bold text-slate-400 uppercase tracking-widest">Open Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-amber-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold text-amber-400 font-mono" data-testid="metric-open-alerts">{metrics.open_alerts}</div>
            <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mt-1">Under investigation</p>
          </CardContent>
        </Card>

        <Card glass glow glowColor="emerald">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-bold text-slate-400 uppercase tracking-widest">Resolved Alerts</CardTitle>
            <CheckCircle className="h-4 w-4 text-emerald-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold text-emerald-400 font-mono" data-testid="metric-resolved-alerts">{metrics.resolved_alerts}</div>
            <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mt-1">Successfully closed</p>
          </CardContent>
        </Card>
      </div>

      {/* Risk Distribution */}
      <Card glass className="p-2">
        <CardHeader>
          <CardTitle className="text-sm font-bold text-slate-300 uppercase tracking-wider">Risk Score Distribution</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div>
            <div className="flex justify-between mb-2 text-xs">
              <span className="text-slate-400 font-light">Low Risk (0-59)</span>
              <span className="text-cyan-400 font-mono font-semibold">
                {data.riskDistribution.low} alerts
              </span>
            </div>
            <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-900">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-500" 
                style={{ width: `${(data.riskDistribution.low / Math.max(totalDistributionAlerts, 1)) * 100}%` }}
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-2 text-xs">
              <span className="text-slate-400 font-light">Medium Risk (60-84)</span>
              <span className="text-amber-400 font-mono font-semibold">
                {data.riskDistribution.medium} alerts
              </span>
            </div>
            <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-900">
              <div 
                className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full transition-all duration-500" 
                style={{ width: `${(data.riskDistribution.medium / Math.max(totalDistributionAlerts, 1)) * 100}%` }}
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-2 text-xs">
              <span className="text-slate-400 font-light">High Risk (85-100)</span>
              <span className="text-red-400 font-mono font-semibold">
                {data.riskDistribution.high} alerts
              </span>
            </div>
            <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-900">
              <div 
                className="h-full bg-gradient-to-r from-red-500 to-rose-400 rounded-full transition-all duration-500" 
                style={{ width: `${(data.riskDistribution.high / Math.max(totalDistributionAlerts, 1)) * 100}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Alerts */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold text-slate-100 uppercase tracking-wider">Recent Alerts</h2>
          <Link
            href="/alerts"
            className="text-xs font-bold uppercase tracking-wider text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1"
            data-testid="view-all-alerts"
          >
            View All <ArrowRight size={12} />
          </Link>
        </div>
        <div className="space-y-3">
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
