'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { formatTimestamp } from '@/lib/utils';
import { AlertStatus, Severity } from '@/lib/types';
import { useAlerts } from '@/hooks/useAlerts';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { RiskBadge, SeverityBadge, StatusBadge } from '@/components/alerts/badges';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TableSkeleton } from '@/components/layout/skeletons';
import { EmptyState } from '@/components/layout/empty-state';
import { AlertTriangle, ChevronLeft, ChevronRight } from 'lucide-react';

const ITEMS_PER_PAGE = 20;

export default function AlertsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [severityFilter, setSeverityFilter] = useState<Severity | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<AlertStatus | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const {
    data: alertsData,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useAlerts({
    page: currentPage,
    limit: ITEMS_PER_PAGE,
    search: searchTerm || undefined,
    severity: severityFilter === 'all' ? undefined : severityFilter,
    status: statusFilter === 'all' ? undefined : statusFilter,
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [severityFilter, statusFilter, searchTerm]);

  const alerts = alertsData?.items ?? [];
  const total = alertsData?.meta.total ?? 0;
  const totalPages = alertsData?.meta.totalPages ?? 1;
  const start = total === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const end = Math.min(currentPage * ITEMS_PER_PAGE, total);

  if (isLoading && !alertsData) {
    return (
      <div className="space-y-6">
        <div className="h-10 w-48 bg-slate-800 animate-pulse rounded" />
        <TableSkeleton rows={10} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="space-y-6" data-testid="alerts-error-state">
        <div>
          <h1 className="text-3xl font-bold text-slate-100 mb-2">Security Alerts</h1>
          <p className="text-slate-400">Monitor and manage security threats across your infrastructure</p>
        </div>
        <div className="border border-slate-800 rounded-lg p-6 text-center space-y-4">
          <AlertTriangle className="h-10 w-10 text-red-400 mx-auto" />
          <div>
            <h2 className="text-lg font-semibold text-slate-100">Unable to load alerts</h2>
            <p className="text-sm text-slate-400 mt-1">
              {error instanceof Error
                ? error.message
                : 'An unexpected error occurred while fetching alerts.'}
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
    <div className="space-y-6" data-testid="alerts-page">
      <div>
        <h1 className="text-3xl font-bold text-slate-100 mb-2">Security Alerts</h1>
        <p className="text-slate-400">Monitor and manage security threats across your infrastructure</p>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input
          placeholder="Search alerts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          data-testid="alerts-search-input"
        />
        <select
          value={severityFilter}
          onChange={(e) => setSeverityFilter(e.target.value as Severity | 'all')}
          aria-label="Filter by severity"
          className="h-10 rounded-md border border-slate-700 bg-slate-900 px-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          className="h-10 rounded-md border border-slate-700 bg-slate-900 px-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          <div className="border border-slate-800 rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Alert</TableHead>
                  <TableHead>Risk Score</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Cloud Provider</TableHead>
                  <TableHead>Created</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {alerts.map((alert) => (
                  <TableRow key={alert.id} data-testid={`alert-row-${alert.id}`}>
                    <TableCell>
                      <Link
                        href={`/alerts/${alert.id}`}
                        className="text-blue-400 hover:text-blue-300 font-medium"
                        data-testid={`alert-link-${alert.id}`}
                      >
                        {alert.title}
                      </Link>
                      <p className="text-sm text-slate-500 mt-1">{alert.resource_id}</p>
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
                      <span className="text-slate-300 capitalize">{alert.cloud_provider}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-slate-400 text-sm">{formatTimestamp(alert.created_at)}</span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-400">
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
        </>
      )}
    </div>
  );
}
