'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useDashboard } from '@/hooks/useDashboard';
import { 
  AlertTriangle, 
  CheckCircle, 
  AlertCircle, 
  Activity, 
  ArrowRight, 
  LayoutDashboard, 
  ShieldCheck, 
  Cloud, 
  Server, 
  Cpu, 
  Zap, 
  Globe 
} from 'lucide-react';
import { AlertCard } from '@/components/alerts/alert-card';
import { Skeleton } from '@/components/ui/skeleton';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { MOCK_ALERTS, MOCK_DASHBOARD_METRICS, MOCK_RISK_DISTRIBUTION } from '@/lib/mockData';

export default function OverviewPage() {
  const router = useRouter();
  const { data, isLoading, isError, refetch } = useDashboard();

  const metrics = data?.metrics ?? MOCK_DASHBOARD_METRICS;
  const recentAlerts = data?.recentAlerts?.length ? data.recentAlerts : MOCK_ALERTS.slice(0, 5);
  const riskDistribution = data?.riskDistribution ?? MOCK_RISK_DISTRIBUTION;

  const totalDistributionAlerts =
    (riskDistribution.low ?? 0) +
    (riskDistribution.medium ?? 0) +
    (riskDistribution.high ?? 0);

  if (isLoading && !data) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-12 w-64" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-32 rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8" data-testid="overview-page">
      {/* Atlas Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-900 pb-6">
        <div>
          <div className="flex items-center gap-2.5 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-widest uppercase bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-mono">
              EXECUTIVE DASHBOARD
            </span>
            <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-mono font-semibold">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" /> LIVE TELEMETRY
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-100 tracking-tight flex items-center gap-3">
            Atlas <LayoutDashboard className="h-7 w-7 text-cyan-400" />
          </h1>
          <p className="text-sm text-slate-400 font-light mt-1">
            Global security posture, threat analytics, and multi-cloud infrastructure health
          </p>
        </div>

        {/* Global Security Posture Badge */}
        <div className="flex items-center gap-4 bg-slate-950/60 border border-slate-900 rounded-2xl p-3.5 backdrop-blur-md shrink-0">
          <div className="relative flex items-center justify-center">
            <div className="w-12 h-12 rounded-full border-2 border-slate-900 border-t-cyan-400 border-r-cyan-400 flex items-center justify-center font-mono text-sm font-extrabold text-cyan-400">
              94
            </div>
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Cloud Posture Score</div>
            <div className="text-xs font-bold text-emerald-400 uppercase tracking-widest font-mono">EXCELLENT (94/100)</div>
            <div className="text-[10px] text-slate-400 font-light mt-0.5">12 AWS • 4 Azure • 6 GCP Accounts</div>
          </div>
        </div>
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

      {/* Main Grid: Risk Distribution & Hardcoded Executive Overview Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Risk Distribution & Infrastructure Health */}
        <div className="lg:col-span-2 space-y-6">
          {/* Risk Distribution */}
          <Card glass className="p-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-bold text-slate-300 uppercase tracking-wider">Risk Score Distribution</CardTitle>
              <span className="text-[10px] font-mono text-slate-500 uppercase">Correlated Threats</span>
            </CardHeader>
            <CardContent className="space-y-5">
              <div>
                <div className="flex justify-between mb-2 text-xs">
                  <span className="text-slate-400 font-light">Low Risk (0-59)</span>
                  <span className="text-cyan-400 font-mono font-semibold">
                    {riskDistribution.low} alerts
                  </span>
                </div>
                <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-900">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-500" 
                    style={{ width: `${(riskDistribution.low / Math.max(totalDistributionAlerts, 1)) * 100}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2 text-xs">
                  <span className="text-slate-400 font-light">Medium Risk (60-84)</span>
                  <span className="text-amber-400 font-mono font-semibold">
                    {riskDistribution.medium} alerts
                  </span>
                </div>
                <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-900">
                  <div 
                    className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full transition-all duration-500" 
                    style={{ width: `${(riskDistribution.medium / Math.max(totalDistributionAlerts, 1)) * 100}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2 text-xs">
                  <span className="text-slate-400 font-light">High Risk (85-100)</span>
                  <span className="text-red-400 font-mono font-semibold">
                    {riskDistribution.high} alerts
                  </span>
                </div>
                <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-900">
                  <div 
                    className="h-full bg-gradient-to-r from-red-500 to-rose-400 rounded-full transition-all duration-500" 
                    style={{ width: `${(riskDistribution.high / Math.max(totalDistributionAlerts, 1)) * 100}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Infrastructure Coverage & Telemetry Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card glass className="p-1">
              <CardContent className="p-4 space-y-2">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-[10px] font-bold uppercase tracking-wider">Multi-Cloud Enclaves</span>
                  <Cloud size={14} className="text-cyan-400" />
                </div>
                <div className="text-xl font-bold font-mono text-slate-100">22 Accounts</div>
                <div className="text-[9px] text-slate-500 font-mono">AWS: 12 | Azure: 4 | GCP: 6</div>
              </CardContent>
            </Card>

            <Card glass className="p-1">
              <CardContent className="p-4 space-y-2">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-[10px] font-bold uppercase tracking-wider">Monitored Assets</span>
                  <Server size={14} className="text-cyan-400" />
                </div>
                <div className="text-xl font-bold font-mono text-slate-100">1,840 Nodes</div>
                <div className="text-[9px] text-slate-500 font-mono">K8s Pods, EC2, Lambda</div>
              </CardContent>
            </Card>

            <Card glass className="p-1">
              <CardContent className="p-4 space-y-2">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-[10px] font-bold uppercase tracking-wider">Event Ingestion</span>
                  <Cpu size={14} className="text-cyan-400" />
                </div>
                <div className="text-xl font-bold font-mono text-slate-100">4,250 / sec</div>
                <div className="text-[9px] text-slate-500 font-mono">Real-time Stream Filter</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Right Col: Atlas Platform Pipeline Health */}
        <div className="space-y-6">
          <Card glass className="p-1">
            <CardHeader>
              <CardTitle className="text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
                <span>Platform Controls</span>
                <Globe size={14} className="text-cyan-400 animate-pulse" />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3.5">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/40 border border-slate-900">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="text-emerald-400 h-4 w-4 shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-slate-200">Sentinel Core Engine</div>
                    <div className="text-[9px] text-slate-500 font-mono">Continuous Rule Evaluator</div>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded text-[8px] font-bold font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  ONLINE
                </span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/40 border border-slate-900">
                <div className="flex items-center gap-2.5">
                  <Zap className="text-cyan-400 h-4 w-4 shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-slate-200">Forge SOAR Automation</div>
                    <div className="text-[9px] text-slate-500 font-mono">18 Playbooks Operational</div>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded text-[8px] font-bold font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  ACTIVE
                </span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/40 border border-slate-900">
                <div className="flex items-center gap-2.5">
                  <Activity className="text-purple-400 h-4 w-4 shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-slate-200">Oracle AI Security Copilot</div>
                    <div className="text-[9px] text-slate-500 font-mono">Context window 128k ready</div>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded text-[8px] font-bold font-mono bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  READY
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Alerts Feed */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold text-slate-100 uppercase tracking-wider">Recent Security Incidents</h2>
          <Link
            href="/alerts"
            className="text-xs font-bold uppercase tracking-wider text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1"
            data-testid="view-all-alerts"
          >
            View Sentinel Core Engine <ArrowRight size={12} />
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
