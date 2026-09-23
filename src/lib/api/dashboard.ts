import { Alert, AuditLog, DashboardMetrics, PaginatedResponse } from '@/lib/types';
import { MOCK_ALERTS } from '@/lib/mockData';
import { simulateNetworkDelay } from './delay';

export interface AuditLogsQueryParams {
  page?: number;
  limit?: number;
}

export const MOCK_AUDIT_LOGS_LIST: AuditLog[] = [
  {
    id: 'AUD-901',
    actor: 'sushant.kumar@aegissentinel.io',
    action: 'POLICY_MODIFICATION',
    resource: 'prod-secrets-vault-01',
    resource_type: 'AWS::S3::BucketPolicy',
    result: 'success',
    timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
    ip_address: '198.51.100.42',
    details: 'Enforced aws_s3_bucket_public_access_block on vault storage following ALT-2026-001.',
  },
  {
    id: 'AUD-902',
    actor: 'forge-soar-engine@aegis',
    action: 'SESSION_REVOCATION',
    resource: 'arn:aws:iam::123456789012:role/DevSecOpsRole',
    resource_type: 'AWS::IAM::RoleSession',
    result: 'success',
    timestamp: new Date(Date.now() - 32 * 60 * 1000).toISOString(),
    ip_address: '10.244.0.15',
    details: 'Automated revocation of cross-account STS tokens without MFA challenge.',
  },
  {
    id: 'AUD-903',
    actor: 'admin-console-user',
    action: 'POD_TERMINATION',
    resource: 'gke-cluster-prod/kube-system/sec-runner-90a',
    resource_type: 'GKE::Pod',
    result: 'success',
    timestamp: new Date(Date.now() - 75 * 60 * 1000).toISOString(),
    ip_address: '203.0.113.88',
    details: 'Pod isolation and node quarantine after kernel SYS_ADMIN escape detection.',
  },
  {
    id: 'AUD-904',
    actor: 'db_readonly_svc',
    action: 'EXFILTRATION_PREVENTION',
    resource: 'sql-db-core-prod-02',
    resource_type: 'Azure::SQL::Database',
    result: 'partial',
    timestamp: new Date(Date.now() - 140 * 60 * 1000).toISOString(),
    ip_address: '198.51.100.42',
    details: 'Client IP blocked by Azure Network Security Group after 54,200 row export anomaly.',
  },
  {
    id: 'AUD-905',
    actor: 'secops-bot@corp',
    action: 'SECURITY_GROUP_UPDATE',
    resource: 'sg-091f27c8230',
    resource_type: 'AWS::EC2::SecurityGroup',
    result: 'success',
    timestamp: new Date(Date.now() - 280 * 60 * 1000).toISOString(),
    ip_address: '172.31.0.1',
    details: 'Revoked 0.0.0.0/0 ingress on port 8080 and restricted to internal load balancers.',
  },
  {
    id: 'AUD-906',
    actor: 'devsecops-bot@corp',
    action: 'KEY_ROTATION',
    resource: 'arn:aws:kms:us-east-1:123456789012:key/cmk-09a8f',
    resource_type: 'AWS::KMS::Key',
    result: 'success',
    timestamp: new Date(Date.now() - 400 * 60 * 1000).toISOString(),
    ip_address: '52.95.110.12',
    details: 'Customer master key rotated and unauthorized grants cleaned up.',
  },
  {
    id: 'AUD-907',
    actor: 'system:sentinel-agent',
    action: 'HELIOS_FUSION_CALIBRATION',
    resource: 'helios-model-router-prod',
    resource_type: 'Helios::ModelRouter',
    result: 'success',
    timestamp: new Date(Date.now() - 500 * 60 * 1000).toISOString(),
    ip_address: '10.0.0.8',
    details: 'Updated score fusion weights: 0.20*IF + 0.30*DeepLog + 0.20*LogFormer + 0.30*UEBA.',
  },
];

export async function getDashboardMetrics(): Promise<DashboardMetrics> {
  await simulateNetworkDelay(400, 800);
  const total = MOCK_ALERTS.length;
  const critical = MOCK_ALERTS.filter((a) => a.severity === 'critical').length;
  const open = MOCK_ALERTS.filter((a) => a.status === 'open' || a.status === 'investigating').length;
  const resolved = MOCK_ALERTS.filter((a) => a.status === 'resolved' || a.status === 'false_positive').length;
  const avg = Math.round((MOCK_ALERTS.reduce((sum, a) => sum + a.risk_score, 0) / (total || 1)) * 10) / 10;

  return {
    total_alerts: 1428 + total,
    critical_alerts: 14 + critical,
    open_alerts: 42 + open,
    resolved_alerts: 1386 + resolved,
    avg_risk_score: avg,
    alerts_today: 18,
  };
}

export async function getRecentAlerts(limit: number = 5): Promise<Alert[]> {
  await simulateNetworkDelay(350, 750);
  return MOCK_ALERTS.slice(0, limit);
}

export async function getAuditLogs(
  params: AuditLogsQueryParams = {}
): Promise<PaginatedResponse<AuditLog>> {
  await simulateNetworkDelay(450, 900);
  const page = params.page ?? 1;
  const limit = params.limit ?? 50;

  const start = (page - 1) * limit;
  const items = MOCK_AUDIT_LOGS_LIST.slice(start, start + limit);
  const total = MOCK_AUDIT_LOGS_LIST.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));

  return {
    items,
    meta: {
      page,
      limit,
      total,
      totalPages,
    },
  };
}
