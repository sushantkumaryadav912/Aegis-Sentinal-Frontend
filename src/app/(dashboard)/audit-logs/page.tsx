'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { formatISOTimestamp } from '@/lib/utils';
import { AuditResult } from '@/lib/types';
import { getAuditLogs } from '@/lib/api/dashboard';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { TableSkeleton } from '@/components/layout/skeletons';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, ShieldAlert } from 'lucide-react';

const ITEMS_PER_PAGE = 50;

function ResultBadge({ result }: { result: AuditResult }) {
  const variants = {
    success: 'bg-green-500/10 text-green-400 border-green-500/20',
    failure: 'bg-red-500/10 text-red-400 border-red-500/20',
    partial: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  };

  return (
    <Badge className={cn('border capitalize', variants[result])} data-testid="result-badge">
      {result}
    </Badge>
  );
}

export default function AuditLogsPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: auditLogsData,
    isLoading,
    isError,
    error,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ['audit-logs', currentPage],
    queryFn: () =>
      getAuditLogs({
        page: currentPage,
        limit: ITEMS_PER_PAGE,
      }),
    placeholderData: (previousData) => previousData,
  });

  const paginatedLogs = auditLogsData?.items ?? [];
  const total = auditLogsData?.meta.total ?? 0;
  const totalPages = auditLogsData?.meta.totalPages ?? 1;
  const start = total === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const end = Math.min(currentPage * ITEMS_PER_PAGE, total);

  if (isLoading && !auditLogsData) {
    return (
      <div className="space-y-6">
        <div className="h-10 w-48 bg-slate-800 animate-pulse rounded" />
        <TableSkeleton rows={10} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="space-y-6" data-testid="audit-logs-error-state">
        <div>
          <h1 className="text-3xl font-bold text-slate-100 mb-2">Audit Logs</h1>
          <p className="text-slate-400">Immutable record of all system activities for compliance</p>
        </div>
        <div className="border border-slate-800 rounded-lg p-6 text-center space-y-4">
          <ShieldAlert className="h-10 w-10 text-red-400 mx-auto" />
          <div>
            <h2 className="text-lg font-semibold text-slate-100">Unable to load audit logs</h2>
            <p className="text-sm text-slate-400 mt-1">
              {error instanceof Error
                ? error.message
                : 'An unexpected error occurred while fetching audit logs.'}
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
    <div className="space-y-6" data-testid="audit-logs-page">
      <div>
        <h1 className="text-3xl font-bold text-slate-100 mb-2">Audit Logs</h1>
        <p className="text-slate-400">Immutable record of all system activities for compliance</p>
      </div>

      {/* Table */}
      <div className="border border-slate-800 rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Timestamp (ISO)</TableHead>
              <TableHead>Actor</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Resource</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Result</TableHead>
              <TableHead>IP Address</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedLogs.map((log) => (
              <TableRow key={log.id} data-testid={`audit-log-row-${log.id}`}>
                <TableCell>
                  <span className="text-slate-400 text-sm font-mono">
                    {formatISOTimestamp(log.timestamp)}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="text-slate-300">{log.actor}</span>
                </TableCell>
                <TableCell>
                  <span className="text-slate-300 font-medium capitalize">{log.action}</span>
                </TableCell>
                <TableCell>
                  <span className="text-slate-400">{log.resource}</span>
                </TableCell>
                <TableCell>
                  <span className="text-slate-400 capitalize">{log.resource_type}</span>
                </TableCell>
                <TableCell>
                  <ResultBadge result={log.result} />
                </TableCell>
                <TableCell>
                  <span className="text-slate-400 text-sm font-mono">{log.ip_address}</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-400">
          Showing {start} to {end} of {total} audit logs
          {isFetching ? ' (updating...)' : ''}
        </p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            data-testid="pagination-prev"
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
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
