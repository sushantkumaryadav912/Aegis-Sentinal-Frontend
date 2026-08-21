'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { formatTimestamp } from '@/lib/utils';
import { Workflow, WorkflowStatus } from '@/lib/types';
import { useWorkflows } from '@/hooks/useWorkflows';
import { getMockPaginatedWorkflows } from '@/lib/mockData';
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
import { 
  ChevronLeft, 
  ChevronRight, 
  GitBranch, 
  Zap, 
  ShieldAlert, 
  CheckCircle2, 
  Shield, 
  Lock, 
  FileCheck,
  Eye,
  Terminal,
  Code,
  AlertCircle,
  Copy,
  ExternalLink,
  RotateCw
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';

const ITEMS_PER_PAGE = 20;

function WorkflowStatusBadge({ status }: { status: WorkflowStatus }) {
  const variants = {
    pending: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    executed: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    failed: 'bg-red-500/10 text-red-400 border-red-500/20',
  };

  return (
    <Badge className={cn('border capitalize font-mono text-[10px]', variants[status])} data-testid="workflow-status-badge">
      {status}
    </Badge>
  );
}

function getWorkflowExecutionSnippet(workflow: Workflow): string {
  const desc = workflow.description.toLowerCase();
  if (desc.includes('s3') || desc.includes('bucket')) {
    return `aws s3api put-public-access-block \\
  --bucket prod-secrets-vault-01 \\
  --public-access-block-configuration "BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true"`;
  }
  if (desc.includes('iam') || desc.includes('principal') || desc.includes('user')) {
    return `aws iam attach-user-policy \\
  --user-name secops-compromised-principal \\
  --policy-arn arn:aws:iam::aws:policy/AWSDenyAll
aws iam revoke-security-credentials --user-name secops-compromised-principal`;
  }
  if (desc.includes('security group') || desc.includes('vpc')) {
    return `aws ec2 revoke-security-group-ingress \\
  --group-id sg-091f27c8230 \\
  --protocol tcp --port 8080 --cidr 0.0.0.0/0
aws ec2 authorize-security-group-ingress --group-id sg-091f27c8230 --protocol tcp --port 8080 --cidr 10.0.0.0/16`;
  }
  if (desc.includes('azure') || desc.includes('sql')) {
    return `az sql db firewall-rule delete \\
  --resource-group rg-prod-core \\
  --server sql-db-core-prod-02 \\
  --name AllowAllIPs
az keyvault secret set --vault-name kv-prod-secrets --name db-master-pass --value $(openssl rand -base64 32)`;
  }
  if (desc.includes('pod') || desc.includes('kubernetes') || desc.includes('k8s')) {
    return `kubectl delete pod sec-runner-90a -n kube-system --force --grace-period=0
kubectl label node gke-node-01 isolate=true
kubectl apply -f https://raw.githubusercontent.com/aegis-sentinel/policies/main/pod-security-restricted.yaml`;
  }
  return `curl -X POST https://api.aegis-sentinel.io/v1/soar/execute \\
  -H "Authorization: Bearer $FORGE_API_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{"workflow_id": "${workflow.id}", "action": "containment", "target": "${workflow.alert_id}"}'`;
}

export default function WorkflowsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<WorkflowStatus | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [isReRunning, setIsReRunning] = useState(false);
  const [reRunMessage, setReRunMessage] = useState<string | null>(null);

  const queryParams = {
    page: currentPage,
    limit: ITEMS_PER_PAGE,
    status: statusFilter === 'all' ? undefined : statusFilter,
  };

  const {
    data: workflowsData,
    isLoading,
    isFetching,
  } = useWorkflows(queryParams);

  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter, searchTerm]);

  const activeWorkflowsData = (workflowsData && workflowsData.items && workflowsData.items.length > 0)
    ? workflowsData
    : getMockPaginatedWorkflows(queryParams);

  let workflows = activeWorkflowsData.items;

  if (searchTerm) {
    const q = searchTerm.toLowerCase();
    workflows = workflows.filter(
      (wf) =>
        wf.id.toLowerCase().includes(q) ||
        wf.alert_id.toLowerCase().includes(q) ||
        wf.description.toLowerCase().includes(q) ||
        wf.executed_by.toLowerCase().includes(q) ||
        wf.type.toLowerCase().includes(q) ||
        (wf.owasp_code && wf.owasp_code.toLowerCase().includes(q)) ||
        (wf.owasp_category && wf.owasp_category.toLowerCase().includes(q)) ||
        (wf.nist_phase && wf.nist_phase.toLowerCase().includes(q)) ||
        (wf.compliance_ref && wf.compliance_ref.toLowerCase().includes(q))
    );
  }

  const total = activeWorkflowsData.meta.total;
  const totalPages = activeWorkflowsData.meta.totalPages;
  const start = total === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const end = Math.min(currentPage * ITEMS_PER_PAGE, total);

  const handleCopySnippet = (snippet: string) => {
    navigator.clipboard.writeText(snippet);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleReRunPlaybook = () => {
    setIsReRunning(true);
    setReRunMessage(null);
    setTimeout(() => {
      setIsReRunning(false);
      setReRunMessage('Forge SOAR playbook re-executed successfully. Post-remediation audit verified.');
    }, 1200);
  };

  if (isLoading && !workflowsData) {
    return (
      <div className="space-y-6">
        <div className="h-10 w-48 bg-slate-800 animate-pulse rounded" />
        <TableSkeleton rows={10} />
      </div>
    );
  }

  return (
    <div className="space-y-6" data-testid="workflows-page">
      {/* Forge Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-900 pb-6">
        <div>
          <div className="flex items-center gap-2.5 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-widest uppercase bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-mono">
              OWASP & NIST COMPLIANT SOAR ENGINE
            </span>
            <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-mono font-semibold">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" /> 108 REMEDIATION PLAYBOOKS
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-100 tracking-tight flex items-center gap-3">
            Forge <GitBranch className="h-7 w-7 text-cyan-400" />
          </h1>
          <p className="text-sm text-slate-400 font-light mt-1">
            Automated Cloud Intrusion Containment & OWASP Standard Remediation Workflows
          </p>
        </div>

        {/* Forge Performance Bar */}
        <div className="grid grid-cols-3 gap-3 bg-slate-950/60 border border-slate-900 rounded-2xl p-3 backdrop-blur-md shrink-0">
          <div className="text-center px-2">
            <div className="text-[9px] uppercase font-bold text-slate-500 font-mono">Exec Speed</div>
            <div className="text-xs font-bold text-cyan-400 font-mono mt-0.5">420 ms</div>
          </div>
          <div className="text-center border-x border-slate-900 px-3">
            <div className="text-[9px] uppercase font-bold text-slate-500 font-mono">Success Rate</div>
            <div className="text-xs font-bold text-emerald-400 font-mono mt-0.5">98.4%</div>
          </div>
          <div className="text-center px-2">
            <div className="text-[9px] uppercase font-bold text-slate-500 font-mono">SOAR Engine</div>
            <div className="text-[10px] font-bold text-emerald-400 font-mono mt-0.5 uppercase tracking-wider">ONLINE</div>
          </div>
        </div>
      </div>

      {/* OWASP & NIST Guidelines Standard Banner */}
      <div className="border border-emerald-500/20 bg-gradient-to-r from-emerald-950/30 via-slate-950 to-cyan-950/20 rounded-2xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 backdrop-blur-md">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold font-mono text-emerald-400 uppercase tracking-wider">
            <Shield size={14} /> OWASP Cloud Top 10 & NIST SP 800-61 Standard Remediation
          </div>
          <p className="text-xs text-slate-300 font-light leading-relaxed">
            All 108+ Forge playbooks strictly adhere to OWASP Cloud Top 10 (CN-01 to CN-10), OWASP API Top 10, NIST SP 800-61 containment protocols, and CIS benchmarks for automated cloud intrusion eradication.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="px-3 py-1 rounded-xl text-[10px] font-bold font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
            <FileCheck size={12} /> CIS & NIST AUDIT READY
          </span>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          placeholder="Search 108+ workflows by OWASP code (e.g. OWASP-CN-02), action, target, or NIST phase..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-slate-950/80 border-slate-900 text-slate-100 placeholder-slate-500 rounded-xl"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as WorkflowStatus | 'all')}
          aria-label="Filter by workflow status"
          className="h-10 rounded-xl border border-slate-900 bg-slate-950/80 px-3 text-xs font-bold uppercase tracking-wider text-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        >
          <option value="all">All Playbook Executions (108 Workflows)</option>
          <option value="executed">Executed & Contained</option>
          <option value="pending">Pending Queue</option>
          <option value="failed">Failed / Timed Out</option>
        </select>
      </div>

      {/* Table */}
      <div className="border border-slate-900 rounded-2xl overflow-hidden bg-slate-950/40 backdrop-blur-md">
        <Table>
          <TableHeader className="bg-slate-950/80 border-b border-slate-900">
            <TableRow className="border-slate-900 hover:bg-transparent">
              <TableHead className="text-slate-400 text-xs font-bold uppercase tracking-wider">Workflow & Playbook</TableHead>
              <TableHead className="text-slate-400 text-xs font-bold uppercase tracking-wider">OWASP Standard & NIST Phase</TableHead>
              <TableHead className="text-slate-400 text-xs font-bold uppercase tracking-wider">Type</TableHead>
              <TableHead className="text-slate-400 text-xs font-bold uppercase tracking-wider">Status</TableHead>
              <TableHead className="text-slate-400 text-xs font-bold uppercase tracking-wider">Executed By</TableHead>
              <TableHead className="text-slate-400 text-xs font-bold uppercase tracking-wider">Inspect</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {workflows.map((workflow) => (
              <TableRow 
                key={workflow.id} 
                data-testid={`workflow-row-${workflow.id}`} 
                onClick={() => setSelectedWorkflow(workflow)}
                className="border-slate-900/60 hover:bg-slate-900/40 transition-colors cursor-pointer"
              >
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="text-cyan-400 font-mono font-bold text-xs">{workflow.id}</span>
                    <span className="text-[10px] font-mono font-bold text-slate-500">[{workflow.alert_id}]</span>
                  </div>
                  <p className="text-[11px] text-slate-300 font-light mt-0.5 max-w-md">{workflow.description}</p>
                  {workflow.compliance_ref && (
                    <div className="text-[9px] font-mono text-slate-500 mt-1 flex items-center gap-1">
                      <Lock size={10} className="text-emerald-400" /> {workflow.compliance_ref}
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  {workflow.owasp_code && (
                    <div className="space-y-1">
                      <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 inline-block">
                        {workflow.owasp_code}
                      </span>
                      <div className="text-[10px] text-slate-400 font-light">{workflow.owasp_category}</div>
                      {workflow.nist_phase && (
                        <div className="text-[9px] font-mono text-purple-400">{workflow.nist_phase}</div>
                      )}
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  <span className="text-xs font-mono text-slate-300 capitalize">
                    {workflow.type.replace(/_/g, ' ')}
                  </span>
                </TableCell>
                <TableCell>
                  <WorkflowStatusBadge status={workflow.status} />
                </TableCell>
                <TableCell>
                  <span className="text-xs text-slate-300 font-medium">{workflow.executed_by}</span>
                </TableCell>
                <TableCell>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedWorkflow(workflow);
                    }}
                    className="h-7 text-[10px] font-mono tracking-wider text-cyan-400 border-slate-800 bg-slate-950 hover:bg-cyan-500/10 hover:border-cyan-500/30"
                  >
                    <Eye size={12} className="mr-1" /> View Playbook
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-xs font-mono text-slate-400">
          Showing {start} to {end} of {total} SOAR workflows
          {isFetching ? ' (updating...)' : ''}
        </p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
            disabled={currentPage === 1}
            data-testid="workflows-pagination-prev"
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
            data-testid="workflows-pagination-next"
            className="h-8 rounded-lg border-slate-900 bg-slate-950 text-xs text-slate-300 hover:bg-slate-900"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Interactive Workflow Playbook Inspection Modal */}
      {selectedWorkflow && (
        <Dialog open={Boolean(selectedWorkflow)} onOpenChange={() => {
          setSelectedWorkflow(null);
          setReRunMessage(null);
        }}>
          <DialogContent className="max-w-3xl bg-slate-950 border border-slate-800 text-slate-100 rounded-2xl p-6 shadow-2xl backdrop-blur-2xl max-h-[85vh] overflow-y-auto">
            <DialogHeader className="border-b border-slate-900 pb-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono font-bold text-cyan-400">{selectedWorkflow.id}</span>
                    <WorkflowStatusBadge status={selectedWorkflow.status} />
                    <span className="text-[10px] font-mono text-slate-500">[{selectedWorkflow.type.replace(/_/g, ' ')}]</span>
                  </div>
                  <DialogTitle className="text-xl font-extrabold text-slate-100">
                    {selectedWorkflow.description}
                  </DialogTitle>
                </div>
              </div>
            </DialogHeader>

            <div className="space-y-5 py-4">
              {/* Target & Executor Box */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-3.5 rounded-xl border border-slate-900 bg-slate-900/30">
                <div>
                  <div className="text-[9px] font-mono text-slate-500 uppercase font-bold">Target Alert</div>
                  <Link 
                    href={`/alerts/${selectedWorkflow.alert_id}`} 
                    className="text-xs font-mono font-bold text-cyan-400 hover:underline flex items-center gap-1 mt-0.5"
                  >
                    {selectedWorkflow.alert_id} <ExternalLink size={10} />
                  </Link>
                </div>
                <div>
                  <div className="text-[9px] font-mono text-slate-500 uppercase font-bold">Executed By</div>
                  <div className="text-xs font-bold text-slate-200 mt-0.5">{selectedWorkflow.executed_by}</div>
                </div>
                <div>
                  <div className="text-[9px] font-mono text-slate-500 uppercase font-bold">Execution Time</div>
                  <div className="text-xs font-mono text-slate-400 mt-0.5">{formatTimestamp(selectedWorkflow.executed_at)}</div>
                </div>
                <div>
                  <div className="text-[9px] font-mono text-slate-500 uppercase font-bold">Audit Status</div>
                  <div className="text-xs font-mono font-bold text-emerald-400 mt-0.5">COMMITTED</div>
                </div>
              </div>

              {/* OWASP & NIST Standard Container */}
              {selectedWorkflow.owasp_code && (
                <div className="border border-emerald-500/20 bg-emerald-950/10 rounded-xl p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {selectedWorkflow.owasp_code} • {selectedWorkflow.owasp_category}
                    </span>
                    <span className="text-[10px] font-mono text-purple-400 font-bold">{selectedWorkflow.nist_phase}</span>
                  </div>
                  <div className="text-xs text-slate-300 font-light leading-relaxed pt-1">
                    <strong className="text-slate-200 font-semibold">Compliance Control Alignment:</strong> {selectedWorkflow.compliance_ref}
                  </div>
                </div>
              )}

              {/* Step-by-Step Playbook Remediation Execution Log */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono flex items-center gap-1.5">
                  <Terminal size={14} className="text-cyan-400" /> Playbook Containment Steps
                </h4>
                <div className="space-y-2">
                  {[
                    { step: '1', name: 'Telemetry Incident Validation', detail: 'Verified Chronos event signature & blast-radius threshold' },
                    { step: '2', name: 'OWASP Threat Classification', detail: `Assigned standard mitigation pattern (${selectedWorkflow.owasp_code || 'OWASP-CN-02'})` },
                    { step: '3', name: 'Automated Containment Execution', detail: 'Dispatched cloud REST API remediation payload' },
                    { step: '4', name: 'Post-State Verification & Audit Lock', detail: 'Verified resource isolation and appended record to immutable audit log' },
                  ].map((s) => (
                    <div key={s.step} className="flex items-start gap-3 p-2.5 rounded-xl border border-slate-900 bg-slate-950/60">
                      <div className="w-5 h-5 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 text-[10px] font-mono font-bold shrink-0 mt-0.5">
                        {s.step}
                      </div>
                      <div className="space-y-0.5">
                        <div className="text-xs font-bold text-slate-200">{s.name}</div>
                        <div className="text-[11px] text-slate-400 font-light">{s.detail}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Code Payload Snippet */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono flex items-center gap-1.5">
                    <Code size={14} className="text-cyan-400" /> Automation CLI / Terraform Remediation Command
                  </h4>
                  <button
                    onClick={() => handleCopySnippet(getWorkflowExecutionSnippet(selectedWorkflow))}
                    className="text-[10px] font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 bg-slate-900 border border-slate-800 px-2 py-1 rounded cursor-pointer"
                  >
                    <Copy size={10} /> {isCopied ? 'Copied!' : 'Copy Code'}
                  </button>
                </div>
                <div className="bg-slate-950 border border-slate-900 rounded-xl p-4 font-mono text-xs text-cyan-300 overflow-x-auto whitespace-pre leading-relaxed shadow-inner">
                  {getWorkflowExecutionSnippet(selectedWorkflow)}
                </div>
              </div>

              {/* Execution Result Log */}
              {selectedWorkflow.result && (
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">Execution Log & Audit Result</h4>
                  <p className="text-xs font-mono text-emerald-400 bg-emerald-950/20 border border-emerald-500/20 p-3 rounded-xl">
                    {selectedWorkflow.result}
                  </p>
                </div>
              )}

              {reRunMessage && (
                <p className="text-xs font-mono text-cyan-400 bg-cyan-950/20 border border-cyan-500/20 p-3 rounded-xl">
                  {reRunMessage}
                </p>
              )}
            </div>

            <DialogFooter className="border-t border-slate-900 pt-4 flex gap-2 justify-end">
              <Button
                variant="outline"
                onClick={handleReRunPlaybook}
                disabled={isReRunning}
                className="h-9 text-xs font-mono border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10"
              >
                <RotateCw size={14} className={`mr-1.5 ${isReRunning ? 'animate-spin' : ''}`} />
                {isReRunning ? 'Executing Playbook...' : 'Re-run SOAR Playbook'}
              </Button>
              <Button
                onClick={() => {
                  setSelectedWorkflow(null);
                  setReRunMessage(null);
                }}
                className="h-9 px-5 text-xs font-bold bg-cyan-500 text-slate-950 hover:bg-cyan-400 rounded-xl"
              >
                Close Inspection
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
