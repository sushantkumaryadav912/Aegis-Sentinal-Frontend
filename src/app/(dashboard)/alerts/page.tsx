'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { formatTimestamp } from '@/lib/utils';
import { AlertStatus, Severity } from '@/lib/types';
import { useAlerts } from '@/hooks/useAlerts';
import { 
  getMockPaginatedAlerts, 
  MOCK_SENTINEL_CORE_COMPONENTS, 
  HELIOS_MODELS_CATALOGUE,
  HELIOS_RAW_YAML_CONFIG,
  HeliosModelItem,
  HeliosCatalogueDomainKey
} from '@/lib/mockData';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { RiskBadge, SeverityBadge, StatusBadge } from '@/components/alerts/badges';
import { LogClassifierArea } from '@/components/alerts/LogClassifierArea';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AlertsSkeleton, TableSkeleton } from '@/components/layout/skeletons';
import { EmptyState } from '@/components/layout/empty-state';
import { 
  AlertTriangle, 
  ChevronLeft, 
  ChevronRight, 
  ShieldCheck, 
  Cpu, 
  Zap, 
  Activity, 
  GitBranch, 
  Layers, 
  Network, 
  CheckCircle2,
  Lock,
  FileCode,
  Copy,
  Check,
  Download,
  Search,
  Filter,
  Sparkles,
  Play,
  Server,
  Terminal,
  ExternalLink,
  RefreshCw,
  Box
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ITEMS_PER_PAGE = 20;

export default function AlertsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [severityFilter, setSeverityFilter] = useState<Severity | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<AlertStatus | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'detections' | 'architecture' | 'helios' | 'yaml'>('detections');
  const [activeTab, setActiveTab] = useState<'detections' | 'classifier' | 'architecture' | 'helios' | 'yaml'>('detections');

  // Helios Catalogue Filters
  const [domainFilter, setDomainFilter] = useState<HeliosCatalogueDomainKey | 'all'>('all');
  const [runtimeFilter, setRuntimeFilter] = useState<string>('all');
  const [statusModelFilter, setStatusModelFilter] = useState<string>('all');
  const [modelSearch, setModelSearch] = useState('');
  const [copiedYaml, setCopiedYaml] = useState(false);

  const queryParams = {
    page: currentPage,
    limit: ITEMS_PER_PAGE,
    search: searchTerm || undefined,
    severity: severityFilter === 'all' ? undefined : severityFilter,
    status: statusFilter === 'all' ? undefined : statusFilter,
  };

  const {
    data: alertsData,
    isLoading,
    isFetching,
  } = useAlerts(queryParams);

  useEffect(() => {
    setCurrentPage(1);
  }, [severityFilter, statusFilter, searchTerm]);

  // Fallback to hardcoded mock detection dataset if backend items are empty
  const activeAlertsData = (alertsData && alertsData.items && alertsData.items.length > 0)
    ? alertsData
    : getMockPaginatedAlerts(queryParams);

  const alerts = activeAlertsData.items;
  const total = activeAlertsData.meta.total;
  const totalPages = activeAlertsData.meta.totalPages;
  const start = total === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const end = Math.min(currentPage * ITEMS_PER_PAGE, total);

  // Filtered Helios Models
  const filteredModels = HELIOS_MODELS_CATALOGUE.filter((m) => {
    if (domainFilter !== 'all' && m.domain !== domainFilter) return false;
    if (runtimeFilter !== 'all' && !m.runtime.toLowerCase().includes(runtimeFilter.toLowerCase())) return false;
    if (statusModelFilter !== 'all' && m.status !== statusModelFilter) return false;
    if (modelSearch) {
      const q = modelSearch.toLowerCase();
      const matchName = m.name.toLowerCase().includes(q);
      const matchCap = m.capability.toLowerCase().includes(q);
      const matchDesc = m.description.toLowerCase().includes(q);
      const matchHf = m.hf_id ? m.hf_id.toLowerCase().includes(q) : false;
      const matchModule = m.aegisModule.toLowerCase().includes(q);
      if (!matchName && !matchCap && !matchDesc && !matchHf && !matchModule) return false;
    }
    return true;
  });

  const handleCopyYaml = () => {
    navigator.clipboard.writeText(HELIOS_RAW_YAML_CONFIG);
    setCopiedYaml(true);
    setTimeout(() => setCopiedYaml(false), 2000);
  };

  const handleDownloadYaml = () => {
    const element = document.createElement('a');
    const file = new Blob([HELIOS_RAW_YAML_CONFIG], { type: 'text/yaml' });
    element.href = URL.createObjectURL(file);
    element.download = 'models.yaml';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  if (isLoading) {
    return <AlertsSkeleton />;
  }

  const moduleColors: Record<string, string> = {
    'Sentinel Core': 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
    'Prism': 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    'Oracle': 'bg-purple-500/10 text-purple-400 border-purple-500/30',
    'Forge': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    'Watchtower': 'bg-blue-500/10 text-blue-400 border-blue-500/30',
  };

  return (
    <div className="space-y-6" data-testid="alerts-page">
      {/* Sentinel Core Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-900 pb-6">
        <div>
          <div className="flex items-center gap-2.5 mb-1.5 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-widest uppercase bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-mono">
              DETECTION & CORRELATION ENGINE
            </span>
            <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-mono font-semibold bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" /> 184 SIGMA RULES
            </span>
            <span className="flex items-center gap-1 text-[10px] text-purple-300 font-mono font-semibold bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded-full">
              <Cpu size={12} /> 32 HELIOS MODELS
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-100 tracking-tight flex items-center gap-3">
            Sentinel Core <ShieldCheck className="h-7 w-7 text-cyan-400" />
          </h1>
          <p className="text-sm text-slate-400 font-light mt-1">
            Security Intelligence Engine: Rule Detection, Helios AI Catalogue Integration, Graph Correlation & SOAR Generation
          </p>
        </div>

        {/* Engine Performance Stats Bar */}
        <div className="grid grid-cols-4 gap-2 bg-slate-950/60 border border-slate-900 rounded-2xl p-3 backdrop-blur-md shrink-0">
          <div className="text-center px-2">
            <div className="text-[9px] uppercase font-bold text-slate-500 font-mono">Eval Latency</div>
            <div className="text-xs font-bold text-cyan-400 font-mono mt-0.5">1.4 ms</div>
          </div>
          <div className="text-center border-l border-slate-900 px-2">
            <div className="text-[9px] uppercase font-bold text-slate-500 font-mono">Helios Inference</div>
            <div className="text-xs font-bold text-purple-400 font-mono mt-0.5">14 ms avg</div>
          </div>
          <div className="text-center border-l border-slate-900 px-2">
            <div className="text-[9px] uppercase font-bold text-slate-500 font-mono">AI Models</div>
            <div className="text-xs font-bold text-emerald-400 font-mono mt-0.5">32 Active</div>
          </div>
          <div className="text-center border-l border-slate-900 px-2">
            <div className="text-[9px] uppercase font-bold text-slate-500 font-mono">Engine Status</div>
            <div className="text-[10px] font-bold text-emerald-400 font-mono mt-0.5 uppercase tracking-wider">ACTIVE</div>
          </div>
        </div>
      </div>

      {/* Sentinel Core vs Helios Boundary Principle Callout */}
      <div className="border border-cyan-500/20 bg-gradient-to-r from-cyan-950/30 via-slate-950 to-purple-950/20 rounded-2xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 backdrop-blur-md">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold font-mono text-cyan-400 uppercase tracking-wider">
            <Lock size={14} /> Architectural Boundary Locked
          </div>
          <p className="text-xs text-slate-300 font-light leading-relaxed">
            <strong className="text-slate-100 font-semibold">Sentinel Core</strong> owns detection rules (184 SIGMA), temporal correlation, risk scoring & alert workflow. <strong className="text-purple-300 font-semibold">Helios</strong> owns heterogeneous AI model runtimes across 8 security domains (`models.yaml`).
          </p>
        </div>
        <div className="flex flex-wrap gap-2 shrink-0">
          <button
            onClick={() => setActiveTab('detections')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold font-mono transition-all flex items-center gap-1.5 ${
              activeTab === 'detections'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Activity size={14} /> Incident Feed
          </button>
          <button
            onClick={() => setActiveTab('classifier')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold font-mono transition-all flex items-center gap-1.5 ${
              activeTab === 'classifier'
                ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Sparkles size={14} className={activeTab === 'classifier' ? 'text-slate-950' : 'text-amber-400'} /> AI Log Classifier
          </button>
          <button
            onClick={() => setActiveTab('architecture')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold font-mono transition-all flex items-center gap-1.5 ${
              activeTab === 'architecture'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <GitBranch size={14} /> Sentinel Pipeline
          </button>
          <button
            onClick={() => setActiveTab('helios')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold font-mono transition-all flex items-center gap-1.5 ${
              activeTab === 'helios'
                ? 'bg-purple-500 text-slate-950 shadow-md shadow-purple-500/20'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Cpu size={14} /> Helios AI Catalogue ({HELIOS_MODELS_CATALOGUE.length})
          </button>
          <button
            onClick={() => setActiveTab('yaml')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold font-mono transition-all flex items-center gap-1.5 ${
              activeTab === 'yaml'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <FileCode size={14} /> models.yaml
          </button>
        </div>
      </div>

      {/* View Tab 1: Incident Feed & Detections Table */}
      {activeTab === 'detections' && (
        <div className="space-y-6">
          {/* Quick-Launch Classifier Banner */}
          <div className="bg-linear-to-r from-amber-500/10 via-slate-950 to-cyan-500/10 border border-amber-500/20 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                <Sparkles size={18} />
              </div>
              <div className="space-y-0.5">
                <div className="text-xs font-bold text-slate-200 font-mono">
                  Test Neural Log Classifier &amp; Multi-Model Benchmarks
                </div>
                <div className="text-[11px] text-slate-400 font-light">
                  Upload raw log bundles or paste telemetry to evaluate against 184 SIGMA rules and Helios neural models (Isolation Forest, DeepLog, LogFormer, UEBA).
                </div>
              </div>
            </div>
            <Button
              size="sm"
              onClick={() => setActiveTab('classifier')}
              className="h-8 text-xs font-mono font-bold bg-amber-400 text-slate-950 hover:bg-amber-300 shrink-0 shadow-md shadow-amber-400/20"
            >
              <Play size={12} className="mr-1.5 fill-slate-950" /> Test Classifier
            </Button>
          </div>
          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              placeholder="Search alerts by title, ID, or resource..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              data-testid="alerts-search-input"
              className="bg-slate-950/80 border-slate-900 text-slate-100 placeholder-slate-500 rounded-xl"
            />
            <select
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value as Severity | 'all')}
              aria-label="Filter by severity"
              className="h-10 rounded-xl border border-slate-900 bg-slate-950/80 px-3 text-xs font-bold uppercase tracking-wider text-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              data-testid="severity-filter"
            >
              <option value="all">All Severities</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as AlertStatus | 'all')}
              aria-label="Filter by status"
              className="h-10 rounded-xl border border-slate-900 bg-slate-950/80 px-3 text-xs font-bold uppercase tracking-wider text-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              data-testid="status-filter"
            >
              <option value="all">All Statuses</option>
              <option value="open">Open</option>
              <option value="investigating">Investigating</option>
              <option value="resolved">Resolved</option>
              <option value="false_positive">False Positive</option>
            </select>
          </div>

          {/* Table */}
          {alerts.length === 0 ? (
            <EmptyState
              icon={AlertTriangle}
              title="No alerts found"
              description="Try adjusting your filters or search criteria"
            />
          ) : (
            <>
              <div className="border border-slate-900 rounded-2xl overflow-hidden bg-slate-950/40 backdrop-blur-md">
                <Table>
                  <TableHeader className="bg-slate-950/80 border-b border-slate-900">
                    <TableRow className="border-slate-900 hover:bg-transparent">
                      <TableHead className="text-slate-400 text-xs font-bold uppercase tracking-wider">Alert & Resource</TableHead>
                      <TableHead className="text-slate-400 text-xs font-bold uppercase tracking-wider">Helios Model Scoring</TableHead>
                      <TableHead className="text-slate-400 text-xs font-bold uppercase tracking-wider">Risk Score</TableHead>
                      <TableHead className="text-slate-400 text-xs font-bold uppercase tracking-wider">Severity</TableHead>
                      <TableHead className="text-slate-400 text-xs font-bold uppercase tracking-wider">Status</TableHead>
                      <TableHead className="text-slate-400 text-xs font-bold uppercase tracking-wider">Cloud Provider</TableHead>
                      <TableHead className="text-slate-400 text-xs font-bold uppercase tracking-wider">Created</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {alerts.map((alert, idx) => {
                      // Map specific mock alerts to Helios catalogue models
                      const modelAttributions = [
                        { model: 'LogFormer v1.0.0', type: 'contextual_log_anomaly_detection', score: '0.96' },
                        { model: 'DeepLog v2.0.0', type: 'sequence_anomaly_detection', score: '0.92' },
                        { model: 'Isolation Forest v4.0.0', type: 'anomaly_detection', score: '0.94' },
                        { model: 'UEBA Behavioral v1.0.0', type: 'behavioral_anomaly_detection', score: '0.97' },
                        { model: 'Temporal GNN v1.0.0', type: 'time_aware_attack_correlation', score: '0.96' },
                      ];
                      const modelInfo = modelAttributions[idx % modelAttributions.length];

                      return (
                        <TableRow key={alert.id} data-testid={`alert-row-${alert.id}`} className="border-slate-900/60 hover:bg-slate-900/30 transition-colors">
                          <TableCell>
                            <Link
                              href={`/alerts/${alert.id}`}
                              className="text-cyan-400 hover:text-cyan-300 font-bold text-xs"
                              data-testid={`alert-link-${alert.id}`}
                            >
                              {alert.title}
                            </Link>
                            <p className="text-[11px] font-mono text-slate-500 mt-0.5">{alert.resource_id}</p>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col gap-0.5">
                              <span className="text-[11px] font-mono font-bold text-purple-300 flex items-center gap-1">
                                <Cpu size={10} className="text-purple-400" /> {modelInfo.model}
                              </span>
                              <span className="text-[9px] font-mono text-slate-500">
                                {modelInfo.type} (Anomaly: <strong className="text-emerald-400">{modelInfo.score}</strong>)
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <RiskBadge score={alert.risk_score} />
                          </TableCell>
                          <TableCell>
                            <SeverityBadge severity={alert.severity} />
                          </TableCell>
                          <TableCell>
                            <StatusBadge status={alert.status} />
                          </TableCell>
                          <TableCell>
                            <span className="text-xs font-mono font-bold text-slate-300 uppercase">{alert.cloud_provider}</span>
                          </TableCell>
                          <TableCell>
                            <span className="text-slate-400 text-xs font-mono">{formatTimestamp(alert.created_at)}</span>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between">
                <p className="text-xs font-mono text-slate-400">
                  Showing {start} to {end} of {total} alerts
                  {isFetching ? ' (updating...)' : ''}
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    data-testid="pagination-prev"
                    className="h-8 rounded-lg border-slate-900 bg-slate-950 text-xs text-slate-300 hover:bg-slate-900"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage >= totalPages}
                    data-testid="pagination-next"
                    className="h-8 rounded-lg border-slate-900 bg-slate-950 text-xs text-slate-300 hover:bg-slate-900"
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* View Tab: AI Log Classifier & Anomaly Detector */}
      {activeTab === 'classifier' && (
        <div className="space-y-6 animate-fade-in">
          <LogClassifierArea onNavigateToFeed={() => setActiveTab('detections')} />
        </div>
      )}

      {/* View Tab 2: Sentinel Core Pipeline Architecture */}
      {activeTab === 'architecture' && (
        <div className="space-y-6 animate-fade-in">
          {/* Step-by-Step Interactive Flow */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {[
              { step: '01', title: 'Chronos Stream', sub: 'Kafka Event Consumer', color: 'border-blue-500/30 bg-blue-950/20 text-blue-400' },
              { step: '02', title: 'Feature Extraction', sub: 'Normalization & Deviation', color: 'border-cyan-500/30 bg-cyan-950/20 text-cyan-400' },
              { step: '03', title: 'Dual Detection', sub: '184 Rules + Helios ML/LLM', color: 'border-purple-500/30 bg-purple-950/20 text-purple-400' },
              { step: '04', title: 'Correlation AI', sub: 'Temporal & Attack Graph GNN', color: 'border-amber-500/30 bg-amber-950/20 text-amber-400' },
              { step: '05', title: 'Incident Generator', sub: 'Risk Scoring & SOAR', color: 'border-emerald-500/30 bg-emerald-950/20 text-emerald-400' },
            ].map((item, idx) => (
              <div key={idx} className={`p-4 rounded-2xl border ${item.color} space-y-2 backdrop-blur-md`}>
                <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                  <span>STEP {item.step}</span>
                  <CheckCircle2 size={12} />
                </div>
                <h4 className="text-sm font-bold text-slate-100">{item.title}</h4>
                <p className="text-[10px] text-slate-400 font-light">{item.sub}</p>
              </div>
            ))}
          </div>

          {/* Core Modules Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {MOCK_SENTINEL_CORE_COMPONENTS.map((comp, idx) => (
              <Card glass key={idx} className="p-1">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <span className="text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-900 text-cyan-400 border border-slate-800">
                      {comp.category}
                    </span>
                    <span className="text-[9px] font-mono font-bold text-emerald-400">
                      {comp.status}
                    </span>
                  </div>
                  <CardTitle className="text-sm font-bold text-slate-100 mt-2">{comp.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-xs text-slate-400 font-light leading-relaxed">{comp.description}</p>
                  {comp.heliosIntegration && (
                    <div className="pt-2 border-t border-slate-900 flex items-center justify-between text-[10px] text-purple-400 font-mono font-semibold">
                      <span className="flex items-center gap-1"><Cpu size={12} /> {comp.heliosIntegration}</span>
                      <span>14ms</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* View Tab 3: Helios Model Catalogue Grid Matrix */}
      {activeTab === 'helios' && (
        <div className="space-y-6 animate-fade-in">
          {/* Banner */}
          <div className="border border-purple-500/20 bg-gradient-to-r from-purple-950/30 via-slate-950 to-cyan-950/20 rounded-2xl p-5 space-y-2 backdrop-blur-md">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-purple-300 flex items-center gap-2">
                  <Cpu className="text-purple-400" size={18} /> Helios Models Catalogue Matrix (`configs/models.yaml`)
                </h3>
                <p className="text-xs text-slate-400 font-light leading-relaxed mt-1">
                  Helios manages 32 AI models across 8 security domains: Detection (Sentinel Core), Correlation (GNNs), Prediction (Prism), Investigation (Self-hosted LLMs), Remediation (Forge Coders), Embeddings (Watchtower RAG), Reranking, and Oracle Agent Runtimes.
                </p>
              </div>
              <Button
                onClick={() => setActiveTab('yaml')}
                variant="outline"
                size="sm"
                className="border-purple-500/30 bg-purple-950/40 text-purple-300 hover:bg-purple-900/50 text-xs font-mono font-bold shrink-0"
              >
                <FileCode size={14} className="mr-1.5" /> View YAML Spec
              </Button>
            </div>
          </div>

          {/* Controls & Domain Pills */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              <span className="text-xs font-mono font-bold text-slate-500 uppercase shrink-0 mr-1 flex items-center gap-1">
                <Filter size={12} /> Domain:
              </span>
              {[
                { key: 'all', label: `All Domains (${HELIOS_MODELS_CATALOGUE.length})` },
                { key: 'detection', label: 'Detection (10)' },
                { key: 'correlation', label: 'Correlation (6)' },
                { key: 'prediction', label: 'Prediction (4)' },
                { key: 'investigation', label: 'Investigation (5)' },
                { key: 'remediation', label: 'Remediation (2)' },
                { key: 'embeddings', label: 'Embeddings (3)' },
                { key: 'reranking', label: 'Reranking (2)' },
                { key: 'agent', label: 'Agent Runtimes (3)' },
              ].map((d) => (
                <button
                  key={d.key}
                  onClick={() => setDomainFilter(d.key as any)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all ${
                    domainFilter === d.key
                      ? 'bg-purple-500 text-slate-950 shadow-md shadow-purple-500/20'
                      : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>

            {/* Filter Bar */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <div className="relative">
                <Search size={14} className="absolute left-3 top-3 text-slate-500" />
                <Input
                  placeholder="Search model, capability, HuggingFace ID..."
                  value={modelSearch}
                  onChange={(e) => setModelSearch(e.target.value)}
                  className="pl-9 bg-slate-950/80 border-slate-900 text-slate-100 placeholder-slate-500 rounded-xl text-xs"
                />
              </div>

              <select
                value={runtimeFilter}
                onChange={(e) => setRuntimeFilter(e.target.value)}
                aria-label="Filter by execution runtime"
                className="h-10 rounded-xl border border-slate-900 bg-slate-950/80 px-3 text-xs font-bold uppercase tracking-wider text-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="all">All Runtimes</option>
                <option value="sklearn">sklearn (Classical ML)</option>
                <option value="pytorch">pytorch (Deep Neural Net)</option>
                <option value="pytorch_geometric">pytorch_geometric (GNN / Graph)</option>
                <option value="vllm/transformers">vllm / transformers (LLM)</option>
                <option value="networkx/torch">networkx / torch</option>
                <option value="agent_runtime">agent_runtime (Oracle)</option>
              </select>

              <select
                value={statusModelFilter}
                onChange={(e) => setStatusModelFilter(e.target.value)}
                aria-label="Filter by status"
                className="h-10 rounded-xl border border-slate-900 bg-slate-950/80 px-3 text-xs font-bold uppercase tracking-wider text-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="all">All Model Statuses</option>
                <option value="production">Production</option>
                <option value="experimental">Experimental</option>
                <option value="benchmark_candidate">Benchmark Candidate</option>
              </select>

              <div className="flex items-center justify-end text-xs font-mono text-slate-400 px-2">
                Showing <strong className="text-purple-400 mx-1">{filteredModels.length}</strong> of {HELIOS_MODELS_CATALOGUE.length} models
              </div>
            </div>
          </div>

          {/* Model Cards Grid */}
          {filteredModels.length === 0 ? (
            <EmptyState
              icon={Box}
              title="No models found"
              description="No Helios model matched your current domain and runtime search filters."
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredModels.map((model) => (
                <Card glass key={model.id} className="p-1 hover:border-purple-500/40 transition-all group">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start gap-2">
                      <span className={`text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${moduleColors[model.aegisModule]}`}>
                        {model.aegisModule} • {model.domainLabel}
                      </span>
                      <span className={`text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded ${
                        model.status === 'production'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : model.status === 'experimental'
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          : 'bg-sky-500/10 text-sky-400 border border-sky-500/20'
                      }`}>
                        {model.status}
                      </span>
                    </div>

                    <CardTitle className="text-sm font-bold text-slate-100 mt-2 flex items-center justify-between">
                      <span>{model.name}</span>
                      {model.confirmed && (
                        <span className="text-[10px] text-emerald-400 font-mono font-semibold flex items-center gap-1">
                          <CheckCircle2 size={12} /> Confirmed
                        </span>
                      )}
                    </CardTitle>

                    {/* HuggingFace / Version identifier */}
                    {model.hf_id ? (
                      <div className="text-[10px] font-mono text-purple-300 flex items-center gap-1 truncate mt-0.5">
                        <ExternalLink size={10} /> {model.hf_id}
                      </div>
                    ) : model.backed_by ? (
                      <div className="text-[10px] font-mono text-amber-300 flex items-center gap-1 truncate mt-0.5">
                        <Sparkles size={10} /> Backed by: {model.backed_by}
                      </div>
                    ) : (
                      <div className="text-[10px] font-mono text-slate-500 mt-0.5">
                        Aegis Version: <span className="text-cyan-400 font-bold">{model.aegis_version}</span>
                      </div>
                    )}
                  </CardHeader>

                  <CardContent className="space-y-3">
                    {/* Capability badge */}
                    <div className="bg-slate-950 border border-slate-900 rounded-lg p-2 font-mono text-[10px] text-cyan-300 truncate">
                      <span className="text-slate-500">capability: </span>{model.capability}
                    </div>

                    <p className="text-xs text-slate-400 font-light leading-relaxed min-h-[36px]">
                      {model.description}
                    </p>

                    {/* Metrics Grid */}
                    <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-900 text-center font-mono text-[10px]">
                      <div className="bg-slate-950/60 p-1.5 rounded-lg border border-slate-900/60">
                        <div className="text-slate-500 text-[8px] uppercase">Runtime</div>
                        <div className="text-slate-300 font-semibold truncate mt-0.5">{model.runtime}</div>
                      </div>
                      <div className="bg-slate-950/60 p-1.5 rounded-lg border border-slate-900/60">
                        <div className="text-slate-500 text-[8px] uppercase">Latency</div>
                        <div className="text-cyan-400 font-bold mt-0.5">{model.avgLatency}</div>
                      </div>
                      <div className="bg-slate-950/60 p-1.5 rounded-lg border border-slate-900/60">
                        <div className="text-slate-500 text-[8px] uppercase">Throughput</div>
                        <div className="text-emerald-400 font-bold mt-0.5">{model.throughput}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {/* View Tab 4: YAML Config Inspector */}
      {activeTab === 'yaml' && (
        <div className="space-y-4 animate-fade-in">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-950/80 border border-slate-900 rounded-2xl p-4 backdrop-blur-md">
            <div>
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                <FileCode className="text-emerald-400" size={16} /> HELIOS_ROOT/configs/models.yaml
              </h3>
              <p className="text-xs text-slate-400 font-light mt-0.5">
                Exact YAML output dumped from <code className="text-cyan-400 font-mono">import yaml; yaml.dump(MODELS_CATALOGUE)</code>
              </p>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={handleCopyYaml}
                variant="outline"
                size="sm"
                className="h-8 border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800 text-xs font-mono font-bold"
              >
                {copiedYaml ? (
                  <>
                    <Check size={14} className="mr-1 text-emerald-400" /> Copied!
                  </>
                ) : (
                  <>
                    <Copy size={14} className="mr-1" /> Copy YAML
                  </>
                )}
              </Button>
              <Button
                onClick={handleDownloadYaml}
                variant="outline"
                size="sm"
                className="h-8 border-emerald-500/30 bg-emerald-950/40 text-emerald-400 hover:bg-emerald-900/50 text-xs font-mono font-bold"
              >
                <Download size={14} className="mr-1" /> Download models.yaml
              </Button>
            </div>
          </div>

          <div className="relative border border-slate-900 rounded-2xl overflow-hidden bg-slate-950 font-mono text-xs p-4 text-slate-300 backdrop-blur-md shadow-2xl">
            <div className="absolute right-4 top-4 text-[10px] text-slate-600 font-mono">
              YAML Syntax • UTF-8 • 32 Models Registered
            </div>
            <pre className="overflow-x-auto leading-relaxed text-slate-300 max-h-[600px] scrollbar-thin">
              {HELIOS_RAW_YAML_CONFIG}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
