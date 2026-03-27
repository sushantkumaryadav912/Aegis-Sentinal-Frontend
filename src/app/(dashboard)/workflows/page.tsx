'use client';

import { useState } from 'react';
import { formatTimestamp } from '@/lib/utils';
import { WorkflowStatus } from '@/lib/types';
import { useWorkflows } from '@/hooks/useWorkflows';
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
import { ChevronLeft, ChevronRight, Workflow as WorkflowIcon } from 'lucide-react';

const ITEMS_PER_PAGE = 20;

function WorkflowStatusBadge({ status }: { status: WorkflowStatus }) {
  const variants = {
    pending: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    executed: 'bg-green-500/10 text-green-400 border-green-500/20',
    failed: 'bg-red-500/10 text-red-400 border-red-500/20',
  };

  return (
    <Badge className={cn('border capitalize', variants[status])} data-testid="workflow-status-badge">
      {status}
    </Badge>
  );
}

export default function WorkflowsPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: workflowsData,
    isLoading,
    isError,
    error,
    isFetching,
    refetch,
  } = useWorkflows({
    page: currentPage,
    limit: ITEMS_PER_PAGE,
  });

  const workflows = workflowsData?.items ?? [];
  const total = workflowsData?.meta.total ?? 0;
  const totalPages = workflowsData?.meta.totalPages ?? 1;
  const start = total === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const end = Math.min(currentPage * ITEMS_PER_PAGE, total);

  if (isLoading && !workflowsData) {
    return (
      <div className="space-y-6">
        <div className="h-10 w-48 bg-slate-800 animate-pulse rounded" />
        <TableSkeleton rows={6} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="space-y-6" data-testid="workflows-error-state">
        <div>
          <h1 className="text-3xl font-bold text-slate-100 mb-2">Automated Workflows</h1>
          <p className="text-slate-400">Track automated remediation and notification workflows</p>
        </div>
        <div className="border border-slate-800 rounded-lg p-6 text-center space-y-4">
          <WorkflowIcon className="h-10 w-10 text-red-400 mx-auto" />
          <div>
            <h2 className="text-lg font-semibold text-slate-100">Unable to load workflows</h2>
            <p className="text-sm text-slate-400 mt-1">
              {error instanceof Error
                ? error.message
                : 'An unexpected error occurred while fetching workflows.'}
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
    <div className="space-y-6" data-testid="workflows-page">
      <div>
        <h1 className="text-3xl font-bold text-slate-100 mb-2">Automated Workflows</h1>
        <p className="text-slate-400">Track automated remediation and notification workflows</p>
      </div>

      {/* Table */}
      <div className="border border-slate-800 rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Workflow ID</TableHead>
              <TableHead>Alert ID</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Executed By</TableHead>
              <TableHead>Execution Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {workflows.map((workflow) => (
              <TableRow key={workflow.id} data-testid={`workflow-row-${workflow.id}`}>
                <TableCell>
                  <span className="text-slate-300 font-medium">{workflow.id}</span>
                </TableCell>
                <TableCell>
                  <span className="text-blue-400">{workflow.alert_id}</span>
                </TableCell>
                <TableCell>
                  <span className="text-slate-300 capitalize">
                    {workflow.type.replace('_', ' ')}
                  </span>
                </TableCell>
                <TableCell>
                  <WorkflowStatusBadge status={workflow.status} />
                </TableCell>
                <TableCell>
                  <span className="text-slate-300">{workflow.executed_by}</span>
                </TableCell>
                <TableCell>
                  <span className="text-slate-400 text-sm">{formatTimestamp(workflow.executed_at)}</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-400">
          Showing {start} to {end} of {total} workflows
          {isFetching ? ' (updating...)' : ''}
        </p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
            disabled={currentPage === 1}
            data-testid="workflows-pagination-prev"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
            disabled={currentPage >= totalPages}
            data-testid="workflows-pagination-next"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
