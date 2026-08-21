'use client';

import { useEffect, useState } from 'react';
import { formatTimestamp } from '@/lib/utils';
import { Log } from '@/lib/types';
import { useLogs } from '@/hooks/useLogs';
import { getMockPaginatedLogs } from '@/lib/mockData';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { RiskBadge } from '@/components/alerts/badges';
import { Input } from '@/components/ui/input';
import { TableSkeleton } from '@/components/layout/skeletons';
import { EmptyState } from '@/components/layout/empty-state';
import { Button } from '@/components/ui/button';
import { 
  ChevronLeft, 
  ChevronRight, 
  Terminal, 
  Activity, 
  Wifi, 
  ShieldAlert, 
  Eye, 
  Filter, 
  Copy, 
  Code, 
  Radio, 
  Server
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';

const ITEMS_PER_PAGE = 20;

export default function LogsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [riskFilter, setRiskFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all');
  const [selectedLog, setSelectedLog] = useState<Log | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [isStreaming, setIsStreaming] = useState(true);

  const queryParams = {
    page: currentPage,
    limit: ITEMS_PER_PAGE,
    search: searchTerm || undefined,
  };

  const {
    data: logsData,
    isLoading,
    isFetching,
  } = useLogs(queryParams);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, riskFilter]);

  const activeLogsData = (logsData && logsData.items && logsData.items.length > 0)
    ? logsData
    : getMockPaginatedLogs(queryParams);

  let logs = activeLogsData.items;

  if (riskFilter !== 'all') {
    logs = logs.filter((log) => {
      if (riskFilter === 'high') return log.risk_score >= 75;
      if (riskFilter === 'medium') return log.risk_score >= 45 && log.risk_score < 75;
      if (riskFilter === 'low') return log.risk_score < 45;
      return true;
    });
  }

  const total = activeLogsData.meta.total;
  const totalPages = activeLogsData.meta.totalPages;
  const start = total === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const end = Math.min(currentPage * ITEMS_PER_PAGE, total);

  const handleCopyLog = (log: Log) => {
    navigator.clipboard.writeText(JSON.stringify(log, null, 2));
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  if (isLoading && !logsData) {
    return (
      <div className="space-y-6">
        <div className="h-10 w-48 bg-slate-800 animate-pulse rounded" />
        <TableSkeleton rows={10} />
      </div>
    );
  }

  return (
    <div className="space-y-6" data-testid="logs-page">
      {/* Pulse Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-900 pb-6">
        <div>
          <div className="flex items-center gap-2.5 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-widest uppercase bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-mono">
              TELEMETRY & LOG INGESTION STREAM
            </span>
            <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-mono font-semibold">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" /> 52+ REAL-TIME TELEMETRY LOGS
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-100 tracking-tight flex items-center gap-3">
            Pulse <Terminal className="h-7 w-7 text-cyan-400" />
          </h1>
          <p className="text-sm text-slate-400 font-light mt-1">
            Real-time security log stream, CloudTrail API telemetry, and raw event log inspection
          </p>
        </div>

        {/* Telemetry Stats Bar */}
        <div className="grid grid-cols-3 gap-3 bg-slate-950/60 border border-slate-900 rounded-2xl p-3 backdrop-blur-md shrink-0">
          <div className="text-center px-2">
            <div className="text-[9px] uppercase font-bold text-slate-500 font-mono">Ingestion Rate</div>
            <div className="text-xs font-bold text-cyan-400 font-mono mt-0.5">4,250 / sec</div>
          </div>
          <div className="text-center border-x border-slate-900 px-3">
            <div className="text-[9px] uppercase font-bold text-slate-500 font-mono">Buffer Delay</div>
            <div className="text-xs font-bold text-emerald-400 font-mono mt-0.5">&lt; 0.2s</div>
          </div>
          <div className="text-center px-2">
            <div className="text-[9px] uppercase font-bold text-slate-500 font-mono">Pipeline Status</div>
            <div className="text-[10px] font-bold text-emerald-400 font-mono mt-0.5 uppercase tracking-wider">HEALTHY</div>
          </div>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 flex gap-3">
          <Input
            placeholder="Search Pulse logs by event, user, IP, action, or resource..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            data-testid="logs-search-input"
            className="bg-slate-950/80 border-slate-900 text-slate-100 placeholder-slate-500 rounded-xl"
          />
          <select
            value={riskFilter}
            onChange={(e) => setRiskFilter(e.target.value as any)}
            aria-label="Filter by log risk score"
            className="h-10 rounded-xl border border-slate-900 bg-slate-950/80 px-3 text-xs font-bold uppercase tracking-wider text-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 shrink-0"
          >
            <option value="all">All Risk Scores</option>
            <option value="high">High Risk (75 - 100)</option>
            <option value="medium">Medium Risk (45 - 74)</option>
            <option value="low">Low Risk (0 - 44)</option>
          </select>
        </div>
        <div className="flex justify-end items-center">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsStreaming(!isStreaming)}
            className={`h-10 px-4 rounded-xl font-mono text-xs font-bold border-slate-900 transition-all ${
              isStreaming ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-slate-950 text-slate-400'
            }`}
          >
            <Radio size={14} className={`mr-2 ${isStreaming ? 'animate-pulse text-emerald-400' : ''}`} />
            {isStreaming ? 'LIVE AUTO-STREAMING' : 'PAUSED'}
          </Button>
        </div>
      </div>

      {/* Table */}
      {logs.length === 0 ? (
        <EmptyState
          icon={Terminal}
          title="No logs found"
          description="Try adjusting your search criteria"
        />
      ) : (
        <div className="border border-slate-900 rounded-2xl overflow-hidden bg-slate-950/40 backdrop-blur-md">
          <Table>
            <TableHeader className="bg-slate-950/80 border-b border-slate-900">
              <TableRow className="border-slate-900 hover:bg-transparent">
                <TableHead className="text-slate-400 text-xs font-bold uppercase tracking-wider">Event Type & Details</TableHead>
                <TableHead className="text-slate-400 text-xs font-bold uppercase tracking-wider">User</TableHead>
                <TableHead className="text-slate-400 text-xs font-bold uppercase tracking-wider">Source IP</TableHead>
                <TableHead className="text-slate-400 text-xs font-bold uppercase tracking-wider">Action</TableHead>
                <TableHead className="text-slate-400 text-xs font-bold uppercase tracking-wider">Resource</TableHead>
                <TableHead className="text-slate-400 text-xs font-bold uppercase tracking-wider">Risk Score</TableHead>
                <TableHead className="text-slate-400 text-xs font-bold uppercase tracking-wider">Inspect</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.map((log) => (
                <TableRow 
                  key={log.id} 
                  data-testid={`log-row-${log.id}`} 
                  onClick={() => setSelectedLog(log)}
                  className="border-slate-900/60 hover:bg-slate-900/40 transition-colors cursor-pointer"
                >
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="text-cyan-400 font-bold text-xs font-mono capitalize">
                        {log.event_type.replace(/_/g, ' ')}
                      </span>
                      <span className="text-[10px] font-mono text-slate-500">[{log.id}]</span>
                    </div>
                    <p className="text-[10px] text-slate-400 font-light mt-0.5 truncate max-w-md">{log.details}</p>
                  </TableCell>
                  <TableCell>
                    <span className="text-slate-300 text-xs font-medium">{log.user}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-slate-400 font-mono text-xs">{log.source_ip}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-slate-200 font-mono text-xs font-bold">{log.action}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-slate-400 font-mono text-xs truncate block max-w-xs">{log.resource}</span>
                  </TableCell>
                  <TableCell>
                    <RiskBadge score={log.risk_score} />
                  </TableCell>
                  <TableCell>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedLog(log);
                      }}
                      className="h-7 text-[10px] font-mono tracking-wider text-cyan-400 border-slate-800 bg-slate-950 hover:bg-cyan-500/10 hover:border-cyan-500/30 cursor-pointer"
                    >
                      <Eye size={12} className="mr-1" /> Inspect
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-xs font-mono text-slate-400">
          Showing {start} to {end} of {total} telemetry logs
          {isFetching ? ' (updating...)' : ''}
        </p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
            disabled={currentPage === 1}
            data-testid="logs-pagination-prev"
            className="h-8 rounded-lg border-slate-900 bg-slate-950 text-xs text-slate-300 hover:bg-slate-900"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
            disabled={currentPage >= totalPages}
            data-testid="logs-pagination-next"
            className="h-8 rounded-lg border-slate-900 bg-slate-950 text-xs text-slate-300 hover:bg-slate-900"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Log Inspection Modal */}
      {selectedLog && (
        <Dialog open={Boolean(selectedLog)} onOpenChange={() => setSelectedLog(null)}>
          <DialogContent className="max-w-2xl bg-slate-950 border border-slate-800 text-slate-100 rounded-2xl p-6 shadow-2xl backdrop-blur-2xl max-h-[85vh] overflow-y-auto">
            <DialogHeader className="border-b border-slate-900 pb-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono font-bold text-cyan-400">{selectedLog.id}</span>
                    <RiskBadge score={selectedLog.risk_score} />
                  </div>
                  <DialogTitle className="text-xl font-extrabold text-slate-100 capitalize">
                    {selectedLog.event_type.replace(/_/g, ' ')}
                  </DialogTitle>
                </div>
              </div>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl border border-slate-900 bg-slate-900/30 font-mono text-xs">
                <div>
                  <div className="text-[9px] text-slate-500 uppercase font-bold">User Principal</div>
                  <div className="text-slate-200 font-bold mt-0.5">{selectedLog.user}</div>
                </div>
                <div>
                  <div className="text-[9px] text-slate-500 uppercase font-bold">Source IP</div>
                  <div className="text-cyan-400 font-bold mt-0.5">{selectedLog.source_ip}</div>
                </div>
                <div>
                  <div className="text-[9px] text-slate-500 uppercase font-bold">API Action</div>
                  <div className="text-slate-200 font-bold mt-0.5">{selectedLog.action}</div>
                </div>
                <div>
                  <div className="text-[9px] text-slate-500 uppercase font-bold">Target Resource</div>
                  <div className="text-slate-400 truncate mt-0.5">{selectedLog.resource}</div>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono flex items-center gap-1.5">
                    <Code size={14} className="text-cyan-400" /> Raw JSON Event Payload
                  </h4>
                  <button
                    onClick={() => handleCopyLog(selectedLog)}
                    className="text-[10px] font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 bg-slate-900 border border-slate-800 px-2 py-1 rounded cursor-pointer"
                  >
                    <Copy size={10} /> {isCopied ? 'Copied!' : 'Copy JSON'}
                  </button>
                </div>
                <pre className="bg-slate-950 border border-slate-900 rounded-xl p-4 font-mono text-xs text-cyan-300 overflow-x-auto whitespace-pre leading-relaxed">
                  {JSON.stringify(selectedLog, null, 2)}
                </pre>
              </div>
            </div>

            <DialogFooter className="border-t border-slate-900 pt-4 flex justify-end">
              <Button
                onClick={() => setSelectedLog(null)}
                className="h-9 px-5 text-xs font-bold bg-cyan-500 text-slate-950 hover:bg-cyan-400 rounded-xl"
              >
                Close Log Inspection
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
