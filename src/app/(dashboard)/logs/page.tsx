'use client';

import { useEffect, useState } from 'react';
import { formatTimestamp } from '@/lib/utils';
import { useLogs } from '@/hooks/useLogs';
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
import { ChevronLeft, ChevronRight, FileText } from 'lucide-react';

const ITEMS_PER_PAGE = 20;

export default function LogsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const {
    data: logsData,
    isLoading,
    isError,
    error,
    isFetching,
    refetch,
  } = useLogs({
    page: currentPage,
    limit: ITEMS_PER_PAGE,
    search: searchTerm || undefined,
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const logs = logsData?.items ?? [];
  const total = logsData?.meta.total ?? 0;
  const totalPages = logsData?.meta.totalPages ?? 1;
  const start = total === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const end = Math.min(currentPage * ITEMS_PER_PAGE, total);

  if (isLoading && !logsData) {
    return (
      <div className="space-y-6">
        <div className="h-10 w-48 bg-slate-800 animate-pulse rounded" />
        <TableSkeleton rows={10} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="space-y-6" data-testid="logs-error-state">
        <div>
          <h1 className="text-3xl font-bold text-slate-100 mb-2">Security Logs</h1>
          <p className="text-slate-400">View and search security events across your infrastructure</p>
        </div>
        <div className="border border-slate-800 rounded-lg p-6 text-center space-y-4">
          <FileText className="h-10 w-10 text-red-400 mx-auto" />
          <div>
            <h2 className="text-lg font-semibold text-slate-100">Unable to load logs</h2>
            <p className="text-sm text-slate-400 mt-1">
              {error instanceof Error ? error.message : 'An unexpected error occurred while fetching logs.'}
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
    <div className="space-y-6" data-testid="logs-page">
      <div>
        <h1 className="text-3xl font-bold text-slate-100 mb-2">Security Logs</h1>
        <p className="text-slate-400">View and search security events across your infrastructure</p>
      </div>

      {/* Search */}
      <div className="max-w-md">
        <Input
          placeholder="Search logs by event type, user, IP, or action..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          data-testid="logs-search-input"
        />
      </div>

      {/* Table */}
      {logs.length === 0 ? (
        <EmptyState
          icon={FileText}
          title="No logs found"
          description="Try adjusting your search criteria"
        />
      ) : (
        <div className="border border-slate-800 rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Event Type</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Source IP</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Resource</TableHead>
                <TableHead>Risk Score</TableHead>
                <TableHead>Timestamp</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.map((log) => (
                <TableRow key={log.id} data-testid={`log-row-${log.id}`}>
                  <TableCell>
                    <span className="text-slate-300 capitalize">
                      {log.event_type.replace('_', ' ')}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-slate-300">{log.user}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-slate-400 font-mono text-sm">{log.source_ip}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-slate-300 font-medium">{log.action}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-slate-400 text-sm">{log.resource}</span>
                  </TableCell>
                  <TableCell>
                    <RiskBadge score={log.risk_score} />
                  </TableCell>
                  <TableCell>
                    <span className="text-slate-400 text-sm">{formatTimestamp(log.timestamp)}</span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-400">
          Showing {start} to {end} of {total} logs
          {isFetching ? ' (updating...)' : ''}
        </p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
            disabled={currentPage === 1}
            data-testid="logs-pagination-prev"
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
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
