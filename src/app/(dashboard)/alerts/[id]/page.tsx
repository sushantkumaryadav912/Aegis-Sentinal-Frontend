'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { getAlertById, getWorkflowsForAlert } from '@/lib/mock-data';
import { simulateDelay, formatTimestamp, cn } from '@/lib/utils';
import { Alert, Workflow } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RiskBadge, SeverityBadge, StatusBadge } from '@/components/alerts/badges';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  ArrowLeft,
  Shield,
  Cloud,
  Server,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Zap,
  RefreshCw,
  ExternalLink,
  Target,
  Activity,
  FileText,
} from 'lucide-react';

export default function AlertDetailPage() {
  const params = useParams();
  const router = useRouter();
  const alertId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState<Alert | null>(null);
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [remediationDialogOpen, setRemediationDialogOpen] = useState(false);
  const [remediationLoading, setRemediationLoading] = useState(false);
  const [statusChangeLoading, setStatusChangeLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await simulateDelay(500);
      const foundAlert = getAlertById(alertId);
      if (foundAlert) {
        setAlert(foundAlert);
        const relatedWorkflows = getWorkflowsForAlert(alertId);
        setWorkflows(relatedWorkflows);
      }
      setLoading(false);
    };
    loadData();
  }, [alertId]);

  const handleRemediationAction = async () => {
    setRemediationLoading(true);
    await simulateDelay(2000);
    setRemediationLoading(false);
    setRemediationDialogOpen(false);
    window.alert('Remediation workflow initiated successfully! Check the Related Workflows section below.');
  };

  const handleStatusChange = async (newStatus: 'investigating' | 'resolved' | 'false_positive') => {
    if (!alert) return;
    setStatusChangeLoading(true);
    await simulateDelay(1000);
    setAlert({ ...alert, status: newStatus });
    setStatusChangeLoading(false);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-64" />
        <Skeleton className="h-48" />
      </div>
    );
  }

  if (!alert) {
    return (
      <div className="space-y-6">
        <Button variant="outline" onClick={() => router.push('/alerts')} data-testid="back-to-alerts">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Alerts
        </Button>
        <Card className="bg-slate-900/50 border-slate-800">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <AlertTriangle className="h-12 w-12 text-amber-400 mb-4" />
            <h2 className="text-xl font-semibold text-slate-100 mb-2">Alert Not Found</h2>
            <p className="text-slate-400">The alert you're looking for doesn't exist.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6" data-testid="alert-detail-page">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={() => router.push('/alerts')} data-testid="back-to-alerts-btn">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Alerts
        </Button>
        <Badge className="bg-slate-800 text-slate-300 border-slate-700">ID: {alert.id}</Badge>
      </div>

      {/* Alert Overview */}
      <Card className="bg-slate-900/50 border-slate-800">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <Shield className="h-6 w-6 text-blue-400" />
                <CardTitle className="text-2xl" data-testid="alert-title">
                  {alert.title}
                </CardTitle>
              </div>
              <CardDescription className="text-base" data-testid="alert-description">
                {alert.description}
              </CardDescription>
            </div>
            <RiskBadge score={alert.risk_score} />
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-wrap gap-2">
            <SeverityBadge severity={alert.severity} />
            <StatusBadge status={alert.status} />
            <Badge className="bg-slate-800 border-slate-700 text-slate-300">
              <Cloud className="h-3 w-3 mr-1" />
              {alert.cloud_provider.toUpperCase()}
            </Badge>
            <Badge className="bg-slate-800 border-slate-700 text-slate-300">
              <Server className="h-3 w-3 mr-1" />
              {alert.resource_type}
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-800">
            <div>
              <p className="text-sm text-slate-400 mb-1">Resource ID</p>
              <p className="text-slate-100 font-mono text-sm" data-testid="alert-resource-id">
                {alert.resource_id}
              </p>
            </div>
            <div>
              <p className="text-sm text-slate-400 mb-1">Created At</p>
              <p className="text-slate-100 text-sm">{formatTimestamp(alert.created_at)}</p>
            </div>
            <div>
              <p className="text-sm text-slate-400 mb-1">Last Updated</p>
              <p className="text-slate-100 text-sm">{formatTimestamp(alert.updated_at)}</p>
            </div>
            <div>
              <p className="text-sm text-slate-400 mb-1">Retry Attempts</p>
              <p className="text-slate-100 text-sm">{alert.retry_attempts}</p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800">
            <p className="text-sm text-slate-400 mb-2">Affected Services</p>
            <div className="flex flex-wrap gap-2">
              {alert.affected_services.map((service) => (
                <Badge key={service} className="bg-blue-500/10 text-blue-400 border-blue-500/20">
                  <Activity className="h-3 w-3 mr-1" />
                  {service}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Remediation Recommendation */}
      <Card className="bg-linear-to-br from-blue-500/5 to-purple-500/5 border-blue-500/20">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Target className="h-5 w-5 text-blue-400" />
            <CardTitle>Remediation Recommendation</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-slate-300" data-testid="remediation-recommendation">
            {alert.recommendation}
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Button
              onClick={() => setRemediationDialogOpen(true)}
              className="bg-blue-600 hover:bg-blue-700"
              data-testid="trigger-remediation-btn"
            >
              <Zap className="h-4 w-4 mr-2" />
              Trigger Auto-Remediation
            </Button>
            <Button
              variant="outline"
              onClick={() => handleStatusChange('investigating')}
              disabled={statusChangeLoading || alert.status === 'investigating'}
              data-testid="mark-investigating-btn"
            >
              <RefreshCw className={cn('h-4 w-4 mr-2', statusChangeLoading && 'animate-spin')} />
              Mark as Investigating
            </Button>
            <Button
              variant="outline"
              onClick={() => handleStatusChange('resolved')}
              disabled={statusChangeLoading || alert.status === 'resolved'}
              className="border-green-500/50 text-green-400 hover:bg-green-500/10"
              data-testid="mark-resolved-btn"
            >
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Mark as Resolved
            </Button>
            <Button
              variant="outline"
              onClick={() => handleStatusChange('false_positive')}
              disabled={statusChangeLoading || alert.status === 'false_positive'}
              className="border-slate-600 text-slate-400 hover:bg-slate-800"
              data-testid="mark-false-positive-btn"
            >
              <FileText className="h-4 w-4 mr-2" />
              Mark as False Positive
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Related Workflows */}
      <Card className="bg-slate-900/50 border-slate-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-purple-400" />
              <CardTitle>Related Workflows</CardTitle>
            </div>
            <Link href="/workflows" className="text-sm text-blue-400 hover:text-blue-300">
              View All Workflows <ExternalLink className="h-3 w-3 inline ml-1" />
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          {workflows.length === 0 ? (
            <div className="text-center py-8">
              <Activity className="h-12 w-12 text-slate-600 mx-auto mb-3" />
              <p className="text-slate-400">No workflows have been executed for this alert yet.</p>
              <p className="text-sm text-slate-500 mt-1">Trigger auto-remediation to create a workflow.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {workflows.map((workflow) => (
                <div
                  key={workflow.id}
                  className="border border-slate-800 rounded-lg p-4 hover:border-slate-700 transition-colors"
                  data-testid={`workflow-${workflow.id}`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-slate-100 font-medium">{workflow.id}</span>
                        <Badge
                          className={cn(
                            'border text-xs capitalize',
                            workflow.status === 'executed' &&
                              'bg-green-500/10 text-green-400 border-green-500/20',
                            workflow.status === 'pending' &&
                              'bg-amber-500/10 text-amber-400 border-amber-500/20',
                            workflow.status === 'failed' &&
                              'bg-red-500/10 text-red-400 border-red-500/20'
                          )}
                        >
                          {workflow.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-400">{workflow.description}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-3 pt-3 border-t border-slate-800">
                    <div>
                      <p className="text-xs text-slate-500">Type</p>
                      <p className="text-sm text-slate-300 capitalize">{workflow.type.replace('_', ' ')}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Executed By</p>
                      <p className="text-sm text-slate-300">{workflow.executed_by}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Executed At</p>
                      <p className="text-sm text-slate-300">{formatTimestamp(workflow.executed_at)}</p>
                    </div>
                    {workflow.result && (
                      <div>
                        <p className="text-xs text-slate-500">Result</p>
                        <p className="text-sm text-slate-300">{workflow.result}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Remediation Confirmation Dialog */}
      <Dialog open={remediationDialogOpen} onOpenChange={setRemediationDialogOpen}>
        <DialogContent className="bg-slate-900 border-slate-800">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-blue-400" />
              Trigger Auto-Remediation
            </DialogTitle>
            <DialogDescription>
              This will initiate an automated workflow to remediate the security issue.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mb-4">
              <p className="text-sm text-slate-300 mb-2">
                <strong>Remediation Action:</strong>
              </p>
              <p className="text-sm text-slate-400">{alert.recommendation}</p>
            </div>
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
              <p className="text-sm text-amber-400">
                <AlertTriangle className="h-4 w-4 inline mr-1" />
                This action may modify your cloud resources. Please review the recommendation carefully.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setRemediationDialogOpen(false)}
              disabled={remediationLoading}
              data-testid="cancel-remediation-btn"
            >
              Cancel
            </Button>
            <Button
              onClick={handleRemediationAction}
              disabled={remediationLoading}
              className="bg-blue-600 hover:bg-blue-700"
              data-testid="confirm-remediation-btn"
            >
              {remediationLoading ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Initiating...
                </>
              ) : (
                <>
                  <Zap className="h-4 w-4 mr-2" />
                  Confirm & Execute
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
