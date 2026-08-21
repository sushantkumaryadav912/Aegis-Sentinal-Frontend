import { Alert, DashboardMetrics, Log, PaginatedResponse, Workflow } from '@/lib/types';
import { AlertsQueryParams } from '@/lib/api/alerts';
import { LogsQueryParams } from '@/lib/api/logs';
import { WorkflowsQueryParams } from '@/lib/api/workflows';

export const MOCK_ALERTS: Alert[] = [
  {
    id: 'ALT-2026-001',
    title: 'Unrestricted S3 Bucket Public Access Enabled',
    description: 'CloudTrail event detected S3 PutBucketPolicy API call granting wildcard principal s3:GetObject permission on production secrets storage.',
    severity: 'critical',
    risk_score: 96,
    status: 'open',
    cloud_provider: 'aws',
    resource_type: 'AWS::S3::Bucket',
    resource_id: 'prod-secrets-vault-01',
    created_at: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    retry_attempts: 1,
    affected_services: ['S3', 'IAM', 'CloudTrail'],
    recommendation: 'Enforce aws_s3_bucket_public_access_block immediately and revoke anonymous read permissions.',
  },
  {
    id: 'ALT-2026-002',
    title: 'Anomalous IAM Privilege Escalation Pattern',
    description: 'IAM user assumes role with AdministratorAccess without requiring Multi-Factor Authentication from an un-whitelisted IP subnet.',
    severity: 'critical',
    risk_score: 92,
    status: 'investigating',
    cloud_provider: 'aws',
    resource_type: 'AWS::IAM::Role',
    resource_id: 'arn:aws:iam::123456789012:role/DevSecOpsRole',
    created_at: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 12 * 60 * 1000).toISOString(),
    retry_attempts: 2,
    affected_services: ['IAM', 'STS', 'CloudTrail'],
    recommendation: 'Attach aws:MultiFactorAuthPresent condition to the role policy and restrict source IP ranges.',
  },
  {
    id: 'ALT-2026-003',
    title: 'Kubernetes Pod Container Escape Indicator',
    description: 'Kernel telemetry signaled suspicious SYS_ADMIN capability invocation and root filesystem access from GKE workload pod.',
    severity: 'high',
    risk_score: 88,
    status: 'open',
    cloud_provider: 'gcp',
    resource_type: 'GKE::Pod',
    resource_id: 'gke-cluster-prod/kube-system/sec-runner-90a',
    created_at: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    retry_attempts: 0,
    affected_services: ['GKE', 'Compute Engine', 'Container Registry'],
    recommendation: 'Quarantine node pool, terminate compromised pod, and enforce PodSecurityAdmission baseline profile.',
  },
  {
    id: 'ALT-2026-004',
    title: 'Suspicious Database Bulk Export & Exfiltration',
    description: 'Abnormal query volume (over 50,000 rows exported) detected on customer PII database originating from proxy IP 198.51.100.42.',
    severity: 'high',
    risk_score: 85,
    status: 'investigating',
    cloud_provider: 'azure',
    resource_type: 'Azure::SQL::Database',
    resource_id: 'sql-db-core-prod-02',
    created_at: new Date(Date.now() - 4 * 3600 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 1 * 3600 * 1000).toISOString(),
    retry_attempts: 0,
    affected_services: ['Azure SQL', 'Key Vault', 'Virtual Network'],
    recommendation: 'Block client IP on Azure Network Security Group and rotate database connection credentials.',
  },
  {
    id: 'ALT-2026-005',
    title: 'Brute-Force SSH Ingress Scan on Public Instance',
    description: 'Over 1,200 failed SSH authentication attempts recorded against EC2 bastion host within a 10-minute window.',
    severity: 'medium',
    risk_score: 74,
    status: 'open',
    cloud_provider: 'aws',
    resource_type: 'AWS::EC2::Instance',
    resource_id: 'i-0a892bc13f7e911a2',
    created_at: new Date(Date.now() - 6 * 3600 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
    retry_attempts: 0,
    affected_services: ['EC2', 'VPC', 'GuardDuty'],
    recommendation: 'Close port 22 to 0.0.0.0/0 in Security Group and require AWS Systems Manager Session Manager.',
  },
  {
    id: 'ALT-2026-006',
    title: 'Unauthorized IAM Long-Term Access Key Generation',
    description: 'New access key pair created for service account without associated change ticket in ITSM integration.',
    severity: 'medium',
    risk_score: 68,
    status: 'open',
    cloud_provider: 'aws',
    resource_type: 'AWS::IAM::User',
    resource_id: 'iam-user-svc-deployment',
    created_at: new Date(Date.now() - 8 * 3600 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 3 * 3600 * 1000).toISOString(),
    retry_attempts: 0,
    affected_services: ['IAM', 'CloudTrail'],
    recommendation: 'Deactivate newly generated access key and verify request legitimacy with service owner.',
  },
  {
    id: 'ALT-2026-007',
    title: 'Outdated Security Group Rule (Wide Open Ingress)',
    description: 'Security group rule allows all traffic on port 8080 from 0.0.0.0/0 to internal microservices cluster.',
    severity: 'low',
    risk_score: 45,
    status: 'resolved',
    cloud_provider: 'multi-cloud',
    resource_type: 'Network::SecurityGroup',
    resource_id: 'sg-091f27c8230',
    created_at: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 12 * 3600 * 1000).toISOString(),
    retry_attempts: 0,
    affected_services: ['VPC', 'Security Groups'],
    recommendation: 'Restrict ingress source CIDR to internal load balancer subnets.',
  },
  {
    id: 'ALT-2026-008',
    title: 'Anomalous CloudTrail Event Signature Detected',
    description: 'Automated deployment process generated non-standard CloudTrail API calls during off-hours maintenance window.',
    severity: 'low',
    risk_score: 32,
    status: 'false_positive',
    cloud_provider: 'aws',
    resource_type: 'AWS::CloudTrail',
    resource_id: 'cloudtrail-event-logs-prod',
    created_at: new Date(Date.now() - 36 * 3600 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 20 * 3600 * 1000).toISOString(),
    retry_attempts: 0,
    affected_services: ['CloudTrail'],
    recommendation: 'Update baseline deployment schedule profile in Aegis Sentinel heuristic anomaly engine.',
  },
];

const LOG_EVENT_CATALOG = [
  { type: 's3_policy_modification', user: 'devsecops-bot@corp', action: 'PutBucketPolicy', dest: 's3.us-east-1.amazonaws.com', res: 'arn:aws:s3:::prod-secrets-vault-01', risk: 96, details: 'Modified S3 bucket policy allowing wildcard principal s3:GetObject access.' },
  { type: 'iam_assume_role', user: 'admin-console-user', action: 'AssumeRole', dest: 'sts.us-west-2.amazonaws.com', res: 'arn:aws:iam::123456789012:role/DevSecOpsRole', risk: 92, details: 'Cross-account role assumption requested without MFA requirement.' },
  { type: 'gke_pod_exec', user: 'system:serviceaccount:kube-system', action: 'container_escape_attempt', dest: 'gke-control-plane.internal', res: 'gke-cluster-prod/kube-system/sec-runner-90a', risk: 88, details: 'Kernel SYS_ADMIN capability invoked inside container namespace.' },
  { type: 'database_export', user: 'db_readonly_svc', action: 'SELECT * INTO OUTFILE', dest: 'sql-db-core-prod-02.database.windows.net', res: 'dbo.CustomerPersonalIdentifiableInformation', risk: 85, details: 'Bulk exfiltration query exported 54,200 sensitive records.' },
  { type: 'ssh_auth_failure', user: 'root', action: 'FailedPassword', dest: 'ec2-bastion-prod.aws.com', res: 'i-0a892bc13f7e911a2:22', risk: 74, details: '1,200 failed SSH login attempts recorded within a 10 minute window.' },
  { type: 'iam_create_key', user: 'deploy-agent-01', action: 'CreateAccessKey', dest: 'iam.amazonaws.com', res: 'iam-user-svc-deployment', risk: 68, details: 'New long-term access key pair created for service user.' },
  { type: 'security_group_ingress', user: 'infra-automation', action: 'AuthorizeSecurityGroupIngress', dest: 'ec2.us-east-1.amazonaws.com', res: 'sg-091f27c8230', risk: 45, details: 'Opened port 8080 ingress to 0.0.0.0/0 on application security group.' },
  { type: 'cloudtrail_digest_verify', user: 'cloudtrail-integrity-job', action: 'VerifyDigestHeader', dest: 'cloudtrail.us-east-1.amazonaws.com', res: 'cloudtrail-event-logs-prod', risk: 15, details: 'Routine automated CloudTrail digest validation check.' },
  { type: 'kms_grant_created', user: 'unauthorized-app-role', action: 'CreateGrant', dest: 'kms.us-east-1.amazonaws.com', res: 'arn:aws:kms:us-east-1:123456789012:key/cmk-09a8f', risk: 82, details: 'Unauthorized KMS grant created allowing Decrypt API on customer master key.' },
  { type: 'lambda_layer_modified', user: 'ci-pipeline-bot', action: 'UpdateFunctionCode', dest: 'lambda.us-west-2.amazonaws.com', res: 'arn:aws:lambda:us-west-2:123456789012:function:auth-handler', risk: 78, details: 'Lambda binary artifact updated with unverified external zip archive.' },
  { type: 'azure_entra_mfa_bypass', user: 'legacy-app-service', action: 'UserSessionRefresh', dest: 'login.microsoftonline.com', res: 'EntraID::Tenant::Production', risk: 89, details: 'Legacy basic authentication endpoint bypassed conditional access MFA policy.' },
  { type: 'gcp_audit_policy_change', user: 'gcp-admin@corp.io', action: 'SetIamPolicy', dest: 'storage.googleapis.com', res: 'projects/prod-corp/buckets/prod-customer-backups', risk: 91, details: 'Granted allUsers allAuthenticatedUsers Storage Object Viewer role on backup bucket.' },
  { type: 'k8s_secret_enumeration', user: 'system:serviceaccount:default:guest-sa', action: 'LIST Secrets', dest: 'kubernetes.default.svc', res: 'kube-system/all-secrets', risk: 86, details: 'Service account attempted unauthorized cluster-wide secret reading call.' },
];

function generate52TelemetryLogs(): Log[] {
  const logs: Log[] = [];
  const ipList = ['198.51.100.42', '203.0.113.88', '10.244.0.15', '52.95.110.12', '172.31.0.1', '185.220.101.5', '45.33.32.156', '194.26.29.112'];

  for (let i = 1; i <= 52; i++) {
    const catalogItem = LOG_EVENT_CATALOG[(i - 1) % LOG_EVENT_CATALOG.length];
    const padId = String(900 + i).padStart(3, '0');
    logs.push({
      id: `LOG-2026-${padId}`,
      event_type: catalogItem.type,
      user: catalogItem.user,
      source_ip: ipList[i % ipList.length],
      destination: catalogItem.dest,
      action: catalogItem.action,
      resource: catalogItem.res,
      timestamp: new Date(Date.now() - i * 6 * 60 * 1000).toISOString(),
      risk_score: Math.max(10, Math.min(99, catalogItem.risk + (i % 7) - 3)),
      details: `[Telemetry Event #${padId}] ${catalogItem.details}`,
    });
  }

  return logs;
}

export const MOCK_LOGS: Log[] = generate52TelemetryLogs();

export const MOCK_DASHBOARD_METRICS: DashboardMetrics = {
  total_alerts: 1482,
  critical_alerts: 14,
  open_alerts: 42,
  resolved_alerts: 1426,
  avg_risk_score: 74.2,
  alerts_today: 18,
};

export const MOCK_RISK_DISTRIBUTION = {
  low: MOCK_ALERTS.filter((a) => a.risk_score < 60).length || 2,
  medium: MOCK_ALERTS.filter((a) => a.risk_score >= 60 && a.risk_score < 85).length || 2,
  high: MOCK_ALERTS.filter((a) => a.risk_score >= 85).length || 4,
};

export function getMockPaginatedAlerts(params: AlertsQueryParams = {}): PaginatedResponse<Alert> {
  const page = params.page ?? 1;
  const limit = params.limit ?? 20;
  let filtered = [...MOCK_ALERTS];

  if (params.search) {
    const q = params.search.toLowerCase();
    filtered = filtered.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.resource_id.toLowerCase().includes(q) ||
        item.id.toLowerCase().includes(q)
    );
  }

  if (params.severity && params.severity !== ('all' as any)) {
    filtered = filtered.filter((item) => item.severity === params.severity);
  }

  if (params.status && params.status !== ('all' as any)) {
    filtered = filtered.filter((item) => item.status === params.status);
  }

  const start = (page - 1) * limit;
  const items = filtered.slice(start, start + limit);
  const total = filtered.length;
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

export function getMockPaginatedLogs(params: LogsQueryParams = {}): PaginatedResponse<Log> {
  const page = params.page ?? 1;
  const limit = params.limit ?? 20;
  let filtered = [...MOCK_LOGS];

  if (params.search) {
    const q = params.search.toLowerCase();
    filtered = filtered.filter(
      (item) =>
        item.event_type.toLowerCase().includes(q) ||
        item.user.toLowerCase().includes(q) ||
        item.source_ip.toLowerCase().includes(q) ||
        item.action.toLowerCase().includes(q) ||
        item.resource.toLowerCase().includes(q) ||
        item.details.toLowerCase().includes(q) ||
        item.id.toLowerCase().includes(q)
    );
  }

  const start = (page - 1) * limit;
  const items = filtered.slice(start, start + limit);
  const total = filtered.length;
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

export interface SentinelCoreComponent {
  name: string;
  category: 'Ingestion' | 'Detection' | 'Correlation' | 'Risk' | 'Output';
  description: string;
  heliosIntegration?: string;
  status: 'ACTIVE' | 'ONLINE' | 'OPTIMAL';
}

export const MOCK_SENTINEL_CORE_COMPONENTS: SentinelCoreComponent[] = [
  {
    name: 'Event Consumer & Validator',
    category: 'Ingestion',
    description: 'Consumes Chronos Kafka event stream, validates schemas & checks field normalization',
    status: 'ACTIVE',
  },
  {
    name: 'Feature Extraction Engine',
    category: 'Ingestion',
    description: 'Calculates user baseline deviation, event frequency, and IP reputation vectors',
    status: 'OPTIMAL',
  },
  {
    name: 'Rule Engine (Deterministic)',
    category: 'Detection',
    description: 'Executes 184 SIGMA rules against incoming CloudTrail, Syslog, and K8s telemetry',
    status: 'ACTIVE',
  },
  {
    name: 'Detection Orchestrator & Aggregator',
    category: 'Detection',
    description: 'Dispatches AI requests to Helios models and aggregates rule matches + AI anomaly scores',
    heliosIntegration: 'Helios Model Router API',
    status: 'OPTIMAL',
  },
  {
    name: 'Correlation Engine (Temporal & Graph)',
    category: 'Correlation',
    description: 'Correlates multi-stage events via 15m sliding windows, entity resolution, and attack graphs',
    heliosIntegration: 'Helios Correlation AI (Graph Model)',
    status: 'ACTIVE',
  },
  {
    name: 'Risk Calculator & Severity Engine',
    category: 'Risk',
    description: 'Calculates composite risk score (0-100) based on confidence, blast radius, and asset criticality',
    status: 'OPTIMAL',
  },
  {
    name: 'Alert Engine & Incident Generator',
    category: 'Output',
    description: 'Generates security incidents and dispatches alerts to Chronos & Forge SOAR playbooks',
    status: 'ACTIVE',
  },
];

export const MOCK_HELIOS_RUNTIMES = [
  {
    model: 'Isolation Forest v4',
    type: 'Classical ML',
    runtime: 'CPU Heterogeneous Runtime',
    latency: '12ms',
    confidence: 0.93,
    useCase: 'Feature vector anomaly scoring',
    status: 'ONLINE',
  },
  {
    model: 'DeepLog v2',
    type: 'Sequential LSTM',
    runtime: 'ONNX Runtime (CPU/GPU)',
    latency: '18ms',
    confidence: 0.87,
    useCase: 'Log key sequence anomaly detection',
    status: 'ONLINE',
  },
  {
    model: 'LogBERT v3',
    type: 'Transformer Model',
    runtime: 'Helios GPU Scheduler',
    latency: '24ms',
    confidence: 0.94,
    useCase: 'Log semantic anomaly embedding',
    status: 'ONLINE',
  },
  {
    model: 'LogFormer',
    type: 'Attention Model',
    runtime: 'Helios GPU Scheduler',
    latency: '15ms',
    confidence: 0.91,
    useCase: 'Time-series log volume anomaly',
    status: 'ONLINE',
  },
  {
    model: 'UEBA Behavioral Model',
    type: 'User Analytics',
    runtime: 'CPU Heterogeneous Runtime',
    latency: '22ms',
    confidence: 0.95,
    useCase: 'Principal access baseline deviation',
    status: 'ONLINE',
  },
];

const SOAR_ACTIONS_CATALOG = [
  {
    action: 'Block Public S3 Access Policy',
    type: 'auto_remediation',
    desc: 'Enforces PutBucketPublicAccessBlock API call across S3 buckets & revokes wildcard getObject permissions',
    target: 'AWS S3',
    owasp_category: 'Insecure Cloud Storage & Public Bucket Access',
    owasp_code: 'OWASP-CN-02',
    nist_phase: 'Containment & Perimeter Lockdown',
    compliance_ref: 'CIS-AWS-2.1.1 | NIST-800-53-AC-3 | PCI-DSS-3.4',
  },
  {
    action: 'Quarantine Compromised IAM Principal',
    type: 'auto_remediation',
    desc: 'Attaches DenyAll inline policy, revokes active STS tokens, and flags identity for SecOps investigation',
    target: 'AWS IAM',
    owasp_category: 'Excessive Entitlements & Identity Over-Privilege',
    owasp_code: 'OWASP-CN-03',
    nist_phase: 'Identity Quarantine & Blast Radius Isolation',
    compliance_ref: 'CIS-AWS-1.16 | NIST-800-53-AC-6 | ISO-27001-A.9.2.6',
  },
  {
    action: 'Isolate Host Security Group Ingress',
    type: 'auto_remediation',
    desc: 'Replaces active security group rules with strict isolation group (block all 0.0.0.0/0 ingress)',
    target: 'AWS VPC',
    owasp_category: 'Cloud Infrastructure Misconfiguration',
    owasp_code: 'OWASP-CN-01',
    nist_phase: 'Network Subnet Isolation',
    compliance_ref: 'CIS-AWS-5.2 | NIST-800-53-SC-7 | SOC2-CC6.6',
  },
  {
    action: 'Azure SQL Database Firewall Lockdown',
    type: 'auto_remediation',
    desc: 'Deletes 0.0.0.0/0 firewall rule, forces TLS 1.3 encryption, and rotates database master key in Key Vault',
    target: 'Azure SQL',
    owasp_category: 'Insecure Data Transfer & Storage at Rest',
    owasp_code: 'OWASP-CN-06',
    nist_phase: 'Data Loss Prevention & Quarantine',
    compliance_ref: 'CIS-Azure-4.1 | PCI-DSS-8.2 | HIPAA-164.312',
  },
  {
    action: 'Evict Compromised Kubernetes Pod',
    type: 'auto_remediation',
    desc: 'Sends SIGKILL to suspicious container process, drains pod, and enforces PodSecurityAdmission profile',
    target: 'Kubernetes',
    owasp_category: 'Microservice & Container Escape Boundary',
    owasp_code: 'OWASP-CN-05',
    nist_phase: 'Workload Isolation & Eradication',
    compliance_ref: 'CIS-K8s-5.2 | NIST-800-190 | SOC2-CC6.8',
  },
  {
    action: 'Deactivate AWS Long-Term Access Key',
    type: 'auto_remediation',
    desc: 'Deactivates compromised long-term IAM access key pair and generates security alert',
    target: 'AWS IAM',
    owasp_category: 'Broken Credential & API Authentication',
    owasp_code: 'OWASP-API2:2023',
    nist_phase: 'Identity Hardening & Key Revocation',
    compliance_ref: 'CIS-AWS-1.4 | NIST-800-53-IA-5 | ISO-27001-A.9.4.3',
  },
  {
    action: 'Trigger Forensic Memory Snapshot',
    type: 'manual_review',
    desc: 'Creates EBS volume snapshot & captures container memory dump for root cause investigation',
    target: 'AWS EC2',
    owasp_category: 'Insufficient Logging, Monitoring & Audit Integrity',
    owasp_code: 'OWASP-CN-07',
    nist_phase: 'Digital Evidence Preservation & Forensics',
    compliance_ref: 'NIST-800-86 | ISO-27001-A.12.4.1 | PCI-DSS-10.7',
  },
  {
    action: 'Inject WAF IP Rate Limiting Rule',
    type: 'auto_remediation',
    desc: 'Injects attacking IP into Cloudflare / AWS WAF ip_set rate-limiting filter',
    target: 'Cloud WAF',
    owasp_category: 'Unrestricted Resource Consumption & DDoS',
    owasp_code: 'OWASP-API4:2023',
    nist_phase: 'Active Traffic Throttling & Ingress Block',
    compliance_ref: 'NIST-800-53-SC-5 | PCI-DSS-6.6 | SOC2-CC6.6',
  },
  {
    action: 'Invalidate Entra ID Session Tokens',
    type: 'escalation',
    desc: 'Revokes Azure AD refresh tokens and enforces immediate MFA re-authentication',
    target: 'Entra ID',
    owasp_category: 'Weak Authentication & Credential Abuse',
    owasp_code: 'OWASP-CN-09',
    nist_phase: 'Session Termination & MFA Challenge',
    compliance_ref: 'NIST-800-63B-AAL3 | ISO-27001-A.9.4.2 | SOC2-CC6.1',
  },
  {
    action: 'Revoke Unauthorized KMS Grants',
    type: 'auto_remediation',
    desc: 'Revokes unauthorized KMS grant permissions on sensitive customer master encryption keys',
    target: 'AWS KMS',
    owasp_category: 'Insecure Key Token & Secrets Exposure',
    owasp_code: 'OWASP-CN-04',
    nist_phase: 'Cryptographic Key Protection & Eradication',
    compliance_ref: 'NIST-800-57 | FIPS-140-3 | PCI-DSS-3.6',
  },
  {
    action: 'Disable GCP Service Account Key',
    type: 'auto_remediation',
    desc: 'Disables compromised GCP service account key pair and restricts project IAM roles',
    target: 'GCP IAM',
    owasp_category: 'Insecure Cloud Supply Chain & SA Token Exposure',
    owasp_code: 'OWASP-CN-08',
    nist_phase: 'Access Removal & Token Revocation',
    compliance_ref: 'CIS-GCP-1.5 | NIST-800-53-AC-2 | SOC2-CC6.3',
  },
  {
    action: 'PagerDuty High-Priority Escalation',
    type: 'notification',
    desc: 'Dispatches high severity PagerDuty alert to SecOps incident response team',
    target: 'PagerDuty',
    owasp_category: 'Incident Response & Operational Readiness',
    owasp_code: 'OWASP-IR-01',
    nist_phase: 'Notification & Incident Commander Dispatch',
    compliance_ref: 'ISO-27001-A.16.1.1 | SOC2-CC7.3 | NIST-800-61',
  },
  {
    action: 'Slack War-Room Channel Creation',
    type: 'notification',
    desc: 'Creates #inc-containment channel and invites incident commander & SecOps leads',
    target: 'Slack SOAR',
    owasp_category: 'Incident Response & Collaboration Protocol',
    owasp_code: 'OWASP-IR-02',
    nist_phase: 'Stakeholder Escalation & Communication',
    compliance_ref: 'SOC2-CC7.4 | ISO-27001-A.16.1.2',
  },
  {
    action: 'Container Forensic Artifact Freeze',
    type: 'manual_review',
    desc: 'Captures GKE container file-system diff and uploads encrypted archive to audit vault',
    target: 'GKE Pod',
    owasp_category: 'Microservice Forensics & Artifact Tampering',
    owasp_code: 'OWASP-CN-07',
    nist_phase: 'Forensic Vault Freeze',
    compliance_ref: 'NIST-800-86 | ISO-27001-A.12.4.3',
  },
  {
    action: 'CloudTrail Cryptographic Integrity Check',
    type: 'manual_review',
    desc: 'Runs cryptographic hash verification check on CloudTrail log digest files',
    target: 'CloudTrail',
    owasp_category: 'Audit Log Non-Repudiation & Integrity',
    owasp_code: 'OWASP-CN-07',
    nist_phase: 'Post-Incident Audit Validation',
    compliance_ref: 'CIS-AWS-3.2 | NIST-800-53-AU-9 | PCI-DSS-10.5',
  },
];

function generateCloudWorkflows(): Workflow[] {
  const workflows: Workflow[] = [];
  const statusList: ('executed' | 'pending' | 'failed')[] = ['executed', 'executed', 'executed', 'pending', 'failed'];
  const userList = [
    'Forge SOAR Engine',
    'Automated Containment Bot',
    'Sushant Kumar (SecOps Lead)',
    'Jane Doe (Incident Commander)',
    'Sentinel Auto-Remediator',
  ];

  for (let i = 1; i <= 108; i++) {
    const padId = String(i).padStart(3, '0');
    const catalogItem = SOAR_ACTIONS_CATALOG[(i - 1) % SOAR_ACTIONS_CATALOG.length];
    const status = statusList[i % statusList.length];
    const alertNum = String((i % 8) + 1).padStart(3, '0');

    workflows.push({
      id: `WF-2026-${padId}`,
      alert_id: `ALT-2026-${alertNum}`,
      type: catalogItem.type as any,
      status: status as any,
      executed_at: new Date(Date.now() - i * 14 * 60 * 1000).toISOString(),
      executed_by: userList[i % userList.length],
      description: `[Forge Playbook #${padId}] ${catalogItem.action}: ${catalogItem.desc} (Target: ${catalogItem.target}).`,
      result:
        status === 'executed'
          ? 'Threat contained successfully; OWASP remediation standard applied & audit record emitted to Chronos'
          : status === 'pending'
          ? 'Queued in Forge SOAR execution queue awaiting analyst confirmation'
          : 'Execution failed: IAM session lock timed out waiting for approval',
      owasp_category: catalogItem.owasp_category,
      owasp_code: catalogItem.owasp_code,
      nist_phase: catalogItem.nist_phase,
      compliance_ref: catalogItem.compliance_ref,
    });
  }

  return workflows;
}

export const MOCK_WORKFLOWS: Workflow[] = generateCloudWorkflows();

export function getMockPaginatedWorkflows(
  params: WorkflowsQueryParams = {}
): PaginatedResponse<Workflow> {
  const page = params.page ?? 1;
  const limit = params.limit ?? 20;
  let filtered = [...MOCK_WORKFLOWS];

  if (params.alertId) {
    filtered = filtered.filter((item) => item.alert_id === params.alertId);
  }

  if (params.status) {
    filtered = filtered.filter((item) => item.status === params.status);
  }

  const start = (page - 1) * limit;
  const items = filtered.slice(start, start + limit);
  const total = filtered.length;
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

export type HeliosCatalogueDomainKey =
  | 'detection'
  | 'correlation'
  | 'prediction'
  | 'investigation'
  | 'remediation'
  | 'embeddings'
  | 'reranking'
  | 'agent';

export interface HeliosModelItem {
  id: string;
  name: string;
  domain: HeliosCatalogueDomainKey;
  domainLabel: string;
  aegisModule: 'Sentinel Core' | 'Prism' | 'Oracle' | 'Forge' | 'Watchtower';
  capability: string;
  runtime: string;
  aegis_version?: string;
  hf_id?: string;
  backed_by?: string;
  role?: string;
  status: 'production' | 'experimental' | 'benchmark_candidate';
  confirmed?: boolean;
  avgLatency: string;
  confidenceScore: number;
  memoryFootprint: string;
  throughput: string;
  description: string;
}

export const HELIOS_MODELS_CATALOGUE: HeliosModelItem[] = [
  // Detection (Sentinel Core)
  {
    id: 'isolation_forest',
    name: 'Isolation Forest',
    domain: 'detection',
    domainLabel: 'Detection Engine',
    aegisModule: 'Sentinel Core',
    capability: 'anomaly_detection',
    runtime: 'sklearn',
    aegis_version: '4.0.0',
    status: 'production',
    avgLatency: '12ms',
    confidenceScore: 0.94,
    memoryFootprint: '256 MB',
    throughput: '14,200 req/s',
    description: 'Tree-based high-dimensional anomaly detection for user activity and network telemetry features.',
  },
  {
    id: 'lof',
    name: 'Local Outlier Factor (LOF)',
    domain: 'detection',
    domainLabel: 'Detection Engine',
    aegisModule: 'Sentinel Core',
    capability: 'local_density_anomaly_detection',
    runtime: 'sklearn',
    aegis_version: '1.0.0',
    status: 'experimental',
    avgLatency: '16ms',
    confidenceScore: 0.81,
    memoryFootprint: '512 MB',
    throughput: '8,400 req/s',
    description: 'Local density-based spatial distance scoring for detecting clusters of unauthorized cloud API calls.',
  },
  {
    id: 'hbos',
    name: 'Histogram-Based Outlier Score (HBOS)',
    domain: 'detection',
    domainLabel: 'Detection Engine',
    aegisModule: 'Sentinel Core',
    capability: 'fast_statistical_anomaly_detection',
    runtime: 'sklearn',
    aegis_version: '1.0.0',
    status: 'experimental',
    avgLatency: '4ms',
    confidenceScore: 0.79,
    memoryFootprint: '128 MB',
    throughput: '42,000 req/s',
    description: 'Ultra-fast statistical histogram independent feature scoring for real-time edge log streams.',
  },
  {
    id: 'one_class_svm',
    name: 'One-Class SVM',
    domain: 'detection',
    domainLabel: 'Detection Engine',
    aegisModule: 'Sentinel Core',
    capability: 'novelty_detection',
    runtime: 'sklearn',
    aegis_version: '1.0.0',
    status: 'experimental',
    avgLatency: '22ms',
    confidenceScore: 0.85,
    memoryFootprint: '768 MB',
    throughput: '5,100 req/s',
    description: 'Non-linear support vector kernel boundaries for zero-day cloud credential novelty detection.',
  },
  {
    id: 'autoencoder',
    name: 'Deep Autoencoder',
    domain: 'detection',
    domainLabel: 'Detection Engine',
    aegisModule: 'Sentinel Core',
    capability: 'reconstruction_anomaly_detection',
    runtime: 'pytorch',
    aegis_version: '1.0.0',
    status: 'experimental',
    avgLatency: '15ms',
    confidenceScore: 0.88,
    memoryFootprint: '1.2 GB',
    throughput: '9,800 req/s',
    description: 'Deep neural network reconstruction error scoring for complex multi-attribute cloud events.',
  },
  {
    id: 'vae',
    name: 'Variational Autoencoder (VAE)',
    domain: 'detection',
    domainLabel: 'Detection Engine',
    aegisModule: 'Sentinel Core',
    capability: 'probabilistic_anomaly_detection',
    runtime: 'pytorch',
    aegis_version: '1.0.0',
    status: 'experimental',
    avgLatency: '19ms',
    confidenceScore: 0.89,
    memoryFootprint: '1.4 GB',
    throughput: '7,600 req/s',
    description: 'Latent space probabilistic distribution modeling for complex security event streams.',
  },
  {
    id: 'deeplog',
    name: 'DeepLog',
    domain: 'detection',
    domainLabel: 'Detection Engine',
    aegisModule: 'Sentinel Core',
    capability: 'sequence_anomaly_detection',
    runtime: 'pytorch',
    aegis_version: '2.0.0',
    status: 'production',
    confirmed: true,
    avgLatency: '18ms',
    confidenceScore: 0.92,
    memoryFootprint: '1.1 GB',
    throughput: '11,500 req/s',
    description: 'Sequential LSTM execution pattern validation for Syslog and CloudTrail event sequences.',
  },
  {
    id: 'logbert',
    name: 'LogBERT',
    domain: 'detection',
    domainLabel: 'Detection Engine',
    aegisModule: 'Sentinel Core',
    capability: 'log_anomaly_detection',
    runtime: 'pytorch',
    aegis_version: '3.0.0',
    status: 'experimental',
    avgLatency: '24ms',
    confidenceScore: 0.95,
    memoryFootprint: '2.4 GB',
    throughput: '4,800 req/s',
    description: 'Transformer bidirectional log sequence embedding & contextual anomaly classification.',
  },
  {
    id: 'logformer',
    name: 'LogFormer',
    domain: 'detection',
    domainLabel: 'Detection Engine',
    aegisModule: 'Sentinel Core',
    capability: 'contextual_log_anomaly_detection',
    runtime: 'pytorch',
    aegis_version: '1.0.0',
    status: 'production',
    confirmed: true,
    avgLatency: '21ms',
    confidenceScore: 0.96,
    memoryFootprint: '2.1 GB',
    throughput: '6,200 req/s',
    description: 'Sparse-attention long-context log transformer for enterprise cloud environment telemetry.',
  },
  {
    id: 'ueba_behavioral',
    name: 'UEBA Behavioral Engine',
    domain: 'detection',
    domainLabel: 'Detection Engine',
    aegisModule: 'Sentinel Core',
    capability: 'behavioral_anomaly_detection',
    runtime: 'pytorch',
    aegis_version: '1.0.0',
    status: 'production',
    confirmed: true,
    avgLatency: '14ms',
    confidenceScore: 0.97,
    memoryFootprint: '1.8 GB',
    throughput: '13,000 req/s',
    description: 'User & Entity Behavior Analytics engine tracking privilege escalation & anomalous access patterns.',
  },

  // Correlation (Sentinel Core — Correlation)
  {
    id: 'node2vec',
    name: 'Node2Vec',
    domain: 'correlation',
    domainLabel: 'Correlation Engine',
    aegisModule: 'Sentinel Core',
    capability: 'entity_relationship_embedding',
    runtime: 'networkx/torch',
    aegis_version: '1.0.0',
    status: 'production',
    avgLatency: '28ms',
    confidenceScore: 0.91,
    memoryFootprint: '890 MB',
    throughput: '3,200 req/s',
    description: 'Random-walk graph representation learning for IAM role & VPC network entity relationship embeddings.',
  },
  {
    id: 'graphsage',
    name: 'GraphSAGE',
    domain: 'correlation',
    domainLabel: 'Correlation Engine',
    aegisModule: 'Sentinel Core',
    capability: 'graph_entity_representation',
    runtime: 'pytorch_geometric',
    aegis_version: '1.0.0',
    status: 'production',
    avgLatency: '32ms',
    confidenceScore: 0.93,
    memoryFootprint: '1.6 GB',
    throughput: '2,900 req/s',
    description: 'Inductive representation learning on dynamic infrastructure topology graphs.',
  },
  {
    id: 'gcn',
    name: 'Graph Convolutional Network (GCN)',
    domain: 'correlation',
    domainLabel: 'Correlation Engine',
    aegisModule: 'Sentinel Core',
    capability: 'graph_convolution',
    runtime: 'pytorch_geometric',
    aegis_version: '1.0.0',
    status: 'production',
    avgLatency: '26ms',
    confidenceScore: 0.90,
    memoryFootprint: '1.3 GB',
    throughput: '3,800 req/s',
    description: 'Spectral graph convolutions aggregating lateral movement signals across cloud subnets.',
  },
  {
    id: 'gat',
    name: 'Graph Attention Network (GAT)',
    domain: 'correlation',
    domainLabel: 'Correlation Engine',
    aegisModule: 'Sentinel Core',
    capability: 'attention_graph_reasoning',
    runtime: 'pytorch_geometric',
    aegis_version: '1.0.0',
    status: 'production',
    avgLatency: '35ms',
    confidenceScore: 0.95,
    memoryFootprint: '1.9 GB',
    throughput: '2,400 req/s',
    description: 'Self-attention mechanism assigning weights to suspicious inter-entity cloud edges.',
  },
  {
    id: 'temporal_gnn',
    name: 'Temporal GNN',
    domain: 'correlation',
    domainLabel: 'Correlation Engine',
    aegisModule: 'Sentinel Core',
    capability: 'time_aware_attack_correlation',
    runtime: 'pytorch_geometric',
    aegis_version: '1.0.0',
    status: 'production',
    avgLatency: '38ms',
    confidenceScore: 0.96,
    memoryFootprint: '2.2 GB',
    throughput: '2,100 req/s',
    description: 'Time-decay dynamic graph neural net tracking multi-stage Kill-Chain progression across 15m windows.',
  },
  {
    id: 'graph_transformer',
    name: 'Graph Transformer',
    domain: 'correlation',
    domainLabel: 'Correlation Engine',
    aegisModule: 'Sentinel Core',
    capability: 'advanced_attack_graph_reasoning',
    runtime: 'pytorch_geometric',
    aegis_version: '1.0.0',
    status: 'production',
    avgLatency: '42ms',
    confidenceScore: 0.98,
    memoryFootprint: '2.8 GB',
    throughput: '1,800 req/s',
    description: 'Global graph self-attention reasoning over enterprise-scale cloud attack graphs.',
  },

  // Prediction (Prism)
  {
    id: 'temporal_transformer',
    name: 'Temporal Transformer',
    domain: 'prediction',
    domainLabel: 'Predictive Analytics',
    aegisModule: 'Prism',
    capability: 'future_event_prediction',
    runtime: 'pytorch',
    aegis_version: '1.0.0',
    status: 'production',
    avgLatency: '29ms',
    confidenceScore: 0.91,
    memoryFootprint: '2.0 GB',
    throughput: '3,500 req/s',
    description: 'Predicts imminent security breach events based on preceding cloud telemetry patterns.',
  },
  {
    id: 'lstm_gru_predictor',
    name: 'LSTM / GRU Predictor',
    domain: 'prediction',
    domainLabel: 'Predictive Analytics',
    aegisModule: 'Prism',
    capability: 'temporal_forecasting_baseline',
    runtime: 'pytorch',
    aegis_version: '1.0.0',
    status: 'production',
    avgLatency: '16ms',
    confidenceScore: 0.86,
    memoryFootprint: '950 MB',
    throughput: '7,200 req/s',
    description: 'Recurrent baseline forecaster estimating resource access volume and payload anomalies.',
  },
  {
    id: 'timeseries_forecaster',
    name: 'Timeseries Forecaster',
    domain: 'prediction',
    domainLabel: 'Predictive Analytics',
    aegisModule: 'Prism',
    capability: 'risk_event_forecasting',
    runtime: 'pytorch',
    aegis_version: '1.0.0',
    status: 'production',
    avgLatency: '18ms',
    confidenceScore: 0.88,
    memoryFootprint: '1.1 GB',
    throughput: '6,800 req/s',
    description: 'Multivariate time-series forecasting for tenant risk trajectory over 1h-24h horizons.',
  },
  {
    id: 'temporal_gnn_prism',
    name: 'Temporal GNN (Prism)',
    domain: 'prediction',
    domainLabel: 'Predictive Analytics',
    aegisModule: 'Prism',
    capability: 'attack_path_evolution_prediction',
    runtime: 'pytorch_geometric',
    aegis_version: '1.0.0',
    status: 'production',
    avgLatency: '44ms',
    confidenceScore: 0.94,
    memoryFootprint: '2.5 GB',
    throughput: '1,700 req/s',
    description: 'Predictive attack path forecasting showing next probable compromised targets in Prism visualizer.',
  },

  // Investigation (Prism + Oracle)
  {
    id: 'qwen_fast',
    name: 'Qwen 3 4B Instruct',
    domain: 'investigation',
    domainLabel: 'LLM Reasoning',
    aegisModule: 'Oracle',
    capability: 'small_fast_reasoning',
    runtime: 'vllm/transformers',
    hf_id: 'Qwen/Qwen3-4B-Instruct-2507',
    role: 'small_fast_reasoning',
    status: 'benchmark_candidate',
    avgLatency: '110ms',
    confidenceScore: 0.92,
    memoryFootprint: '8.0 GB',
    throughput: '120 tok/s',
    description: 'Ultra-fast lightweight self-hosted LLM candidate for initial log triage & alert parsing.',
  },
  {
    id: 'qwen_reasoning',
    name: 'Qwen 3 32B',
    domain: 'investigation',
    domainLabel: 'LLM Reasoning',
    aegisModule: 'Oracle',
    capability: 'large_reasoning',
    runtime: 'vllm/transformers',
    hf_id: 'Qwen/Qwen3-32B',
    role: 'large_reasoning',
    status: 'benchmark_candidate',
    avgLatency: '340ms',
    confidenceScore: 0.97,
    memoryFootprint: '64.0 GB',
    throughput: '45 tok/s',
    description: 'High-parameter self-hosted LLM powering Oracle deep incident root-cause synthesis.',
  },
  {
    id: 'llama',
    name: 'Llama 3.3 70B Instruct',
    domain: 'investigation',
    domainLabel: 'LLM Reasoning',
    aegisModule: 'Oracle',
    capability: 'general_reasoning',
    runtime: 'vllm/transformers',
    hf_id: 'meta-llama/Llama-3.3-70B-Instruct',
    role: 'general_reasoning',
    status: 'benchmark_candidate',
    avgLatency: '520ms',
    confidenceScore: 0.98,
    memoryFootprint: '140.0 GB',
    throughput: '32 tok/s',
    description: 'Flagship open-weights model candidate for complex cross-cloud attack chain explanations.',
  },
  {
    id: 'mistral',
    name: 'Mistral Small 24B',
    domain: 'investigation',
    domainLabel: 'LLM Reasoning',
    aegisModule: 'Oracle',
    capability: 'reasoning_summarization',
    runtime: 'vllm/transformers',
    hf_id: 'mistralai/Mistral-Small-24B-Instruct-2501',
    role: 'reasoning_summarization',
    status: 'benchmark_candidate',
    avgLatency: '260ms',
    confidenceScore: 0.94,
    memoryFootprint: '48.0 GB',
    throughput: '58 tok/s',
    description: 'Optimized reasoning & executive incident summary generator for analyst reports.',
  },
  {
    id: 'gemma',
    name: 'Gemma 3 27B IT',
    domain: 'investigation',
    domainLabel: 'LLM Reasoning',
    aegisModule: 'Oracle',
    capability: 'lightweight_reasoning',
    runtime: 'vllm/transformers',
    hf_id: 'google/gemma-3-27b-it',
    role: 'lightweight_reasoning',
    status: 'benchmark_candidate',
    avgLatency: '290ms',
    confidenceScore: 0.93,
    memoryFootprint: '54.0 GB',
    throughput: '52 tok/s',
    description: 'Google Gemma 3 architecture candidate for fast interactive analyst Q&A.',
  },

  // Remediation (Forge)
  {
    id: 'qwen_code',
    name: 'Qwen 2.5 Coder 32B',
    domain: 'remediation',
    domainLabel: 'SOAR Code Generation',
    aegisModule: 'Forge',
    capability: 'terraform_k8s_code_remediation',
    runtime: 'vllm/transformers',
    hf_id: 'Qwen/Qwen2.5-Coder-32B-Instruct',
    status: 'benchmark_candidate',
    avgLatency: '380ms',
    confidenceScore: 0.96,
    memoryFootprint: '64.0 GB',
    throughput: '42 tok/s',
    description: 'Generates syntactically valid Terraform diffs, Ansible playbooks & K8s NetworkPolicies.',
  },
  {
    id: 'deepseek_coder',
    name: 'DeepSeek Coder V2',
    domain: 'remediation',
    domainLabel: 'SOAR Code Generation',
    aegisModule: 'Forge',
    capability: 'code_infra_generation',
    runtime: 'vllm/transformers',
    hf_id: 'deepseek-ai/DeepSeek-Coder-V2-Instruct',
    status: 'benchmark_candidate',
    avgLatency: '410ms',
    confidenceScore: 0.97,
    memoryFootprint: '72.0 GB',
    throughput: '38 tok/s',
    description: 'Specialized code generation LLM for complex IAM policy remediation & cloud security patches.',
  },

  // Embeddings (Watchtower)
  {
    id: 'bge',
    name: 'BAAI BGE Large EN v1.5',
    domain: 'embeddings',
    domainLabel: 'Knowledge Embedding',
    aegisModule: 'Watchtower',
    capability: 'security_knowledge_embedding',
    runtime: 'vllm/transformers',
    hf_id: 'BAAI/bge-large-en-v1.5',
    status: 'benchmark_candidate',
    avgLatency: '14ms',
    confidenceScore: 0.95,
    memoryFootprint: '1.3 GB',
    throughput: '8,500 doc/s',
    description: '1024-dim dense embeddings for MITRE ATT&CK, NIST standards & SIGMA rule indexing in Watchtower.',
  },
  {
    id: 'e5',
    name: 'Intfloat E5 Large v2',
    domain: 'embeddings',
    domainLabel: 'Knowledge Embedding',
    aegisModule: 'Watchtower',
    capability: 'semantic_retrieval_embedding',
    runtime: 'vllm/transformers',
    hf_id: 'intfloat/e5-large-v2',
    status: 'benchmark_candidate',
    avgLatency: '16ms',
    confidenceScore: 0.94,
    memoryFootprint: '1.3 GB',
    throughput: '7,800 doc/s',
    description: 'Asymmetric semantic retrieval embedding model for CVE & IoC intelligence lookup.',
  },
  {
    id: 'nomic',
    name: 'Nomic Embed Text v1.5',
    domain: 'embeddings',
    domainLabel: 'Knowledge Embedding',
    aegisModule: 'Watchtower',
    capability: 'general_domain_embedding',
    runtime: 'vllm/transformers',
    hf_id: 'nomic-ai/nomic-embed-text-v1.5',
    status: 'benchmark_candidate',
    avgLatency: '12ms',
    confidenceScore: 0.92,
    memoryFootprint: '550 MB',
    throughput: '12,000 doc/s',
    description: 'Long-context (8192 token window) open-weights embedding model for multi-page PDF security reports.',
  },

  // Reranking (Watchtower)
  {
    id: 'bge_reranker',
    name: 'BGE Reranker v2 M3',
    domain: 'reranking',
    domainLabel: 'Cross-Encoder Reranking',
    aegisModule: 'Watchtower',
    capability: 'cross_encoder_reranking',
    runtime: 'vllm/transformers',
    hf_id: 'BAAI/bge-reranker-v2-m3',
    status: 'benchmark_candidate',
    avgLatency: '24ms',
    confidenceScore: 0.97,
    memoryFootprint: '2.2 GB',
    throughput: '3,400 req/s',
    description: 'Cross-encoder relevance scorer for Watchtower threat intel retrieval precision.',
  },
  {
    id: 'cross_encoder',
    name: 'MS-MARCO MiniLM L6 v2',
    domain: 'reranking',
    domainLabel: 'Cross-Encoder Reranking',
    aegisModule: 'Watchtower',
    capability: 'semantic_reranking',
    runtime: 'vllm/transformers',
    hf_id: 'cross-encoder/ms-marco-MiniLM-L-6-v2',
    status: 'benchmark_candidate',
    avgLatency: '10ms',
    confidenceScore: 0.91,
    memoryFootprint: '90 MB',
    throughput: '18,000 req/s',
    description: 'Ultra-lightweight baseline cross-encoder for fast threat knowledge filtering.',
  },

  // Agent (Oracle)
  {
    id: 'oracle_reasoning',
    name: 'Oracle Deep Security Agent',
    domain: 'agent',
    domainLabel: 'Agentic AI Runtime',
    aegisModule: 'Oracle',
    capability: 'deep_security_reasoning',
    runtime: 'agent_runtime',
    backed_by: 'investigation.qwen_reasoning',
    status: 'production',
    avgLatency: '650ms',
    confidenceScore: 0.98,
    memoryFootprint: 'Dynamic',
    throughput: 'Multi-turn',
    description: 'Multi-step autonomous agent environment executing deep attack tree investigation & root cause analysis.',
  },
  {
    id: 'oracle_fast',
    name: 'Oracle Fast Triage Agent',
    domain: 'agent',
    domainLabel: 'Agentic AI Runtime',
    aegisModule: 'Oracle',
    capability: 'fast_triage',
    runtime: 'agent_runtime',
    backed_by: 'investigation.qwen_fast',
    status: 'production',
    avgLatency: '180ms',
    confidenceScore: 0.93,
    memoryFootprint: 'Dynamic',
    throughput: 'Sub-second',
    description: 'Low-latency agent loop performing immediate alert severity assessment and duplicate suppression.',
  },
  {
    id: 'oracle_tool_calling',
    name: 'Oracle Structured Tool Agent',
    domain: 'agent',
    domainLabel: 'Agentic AI Runtime',
    aegisModule: 'Oracle',
    capability: 'structured_tool_calling',
    runtime: 'agent_runtime',
    backed_by: 'investigation.qwen_reasoning',
    status: 'production',
    avgLatency: '420ms',
    confidenceScore: 0.96,
    memoryFootprint: 'Dynamic',
    throughput: 'JSON Schema',
    description: 'Strict JSON-schema tool dispatch agent interfacing with Chronos, Vault, Forge, and cloud APIs.',
  },
];

export const HELIOS_RAW_YAML_CONFIG = `MODELS_CATALOGUE = {
    "detection": {  # Sentinel Core
        "isolation_forest": {"aegis_version": "4.0.0", "capability": "anomaly_detection",
                              "runtime": "sklearn", "status": "production"},
        "lof": {"aegis_version": "1.0.0", "capability": "local_density_anomaly_detection",
                "runtime": "sklearn", "status": "experimental"},
        "hbos": {"aegis_version": "1.0.0", "capability": "fast_statistical_anomaly_detection",
                 "runtime": "sklearn", "status": "experimental"},
        "one_class_svm": {"aegis_version": "1.0.0", "capability": "novelty_detection",
                           "runtime": "sklearn", "status": "experimental"},
        "autoencoder": {"aegis_version": "1.0.0", "capability": "reconstruction_anomaly_detection",
                         "runtime": "pytorch", "status": "experimental"},
        "vae": {"aegis_version": "1.0.0", "capability": "probabilistic_anomaly_detection",
                "runtime": "pytorch", "status": "experimental"},
        "deeplog": {"aegis_version": "2.0.0", "capability": "sequence_anomaly_detection",
                    "runtime": "pytorch", "status": "production", "confirmed": True},
        "logbert": {"aegis_version": "3.0.0", "capability": "log_anomaly_detection",
                    "runtime": "pytorch", "status": "experimental"},
        "logformer": {"aegis_version": "1.0.0", "capability": "contextual_log_anomaly_detection",
                      "runtime": "pytorch", "status": "production", "confirmed": True},
        "ueba_behavioral": {"aegis_version": "1.0.0", "capability": "behavioral_anomaly_detection",
                             "runtime": "pytorch", "status": "production", "confirmed": True},
    },
    "correlation": {  # Sentinel Core — Correlation
        "node2vec": {"aegis_version": "1.0.0", "capability": "entity_relationship_embedding", "runtime": "networkx/torch"},
        "graphsage": {"aegis_version": "1.0.0", "capability": "graph_entity_representation", "runtime": "pytorch_geometric"},
        "gcn": {"aegis_version": "1.0.0", "capability": "graph_convolution", "runtime": "pytorch_geometric"},
        "gat": {"aegis_version": "1.0.0", "capability": "attention_graph_reasoning", "runtime": "pytorch_geometric"},
        "temporal_gnn": {"aegis_version": "1.0.0", "capability": "time_aware_attack_correlation", "runtime": "pytorch_geometric"},
        "graph_transformer": {"aegis_version": "1.0.0", "capability": "advanced_attack_graph_reasoning", "runtime": "pytorch_geometric"},
    },
    "prediction": {  # Prism
        "temporal_transformer": {"aegis_version": "1.0.0", "capability": "future_event_prediction", "runtime": "pytorch"},
        "lstm_gru_predictor": {"aegis_version": "1.0.0", "capability": "temporal_forecasting_baseline", "runtime": "pytorch"},
        "timeseries_forecaster": {"aegis_version": "1.0.0", "capability": "risk_event_forecasting", "runtime": "pytorch"},
        "temporal_gnn_prism": {"aegis_version": "1.0.0", "capability": "attack_path_evolution_prediction", "runtime": "pytorch_geometric"},
    },
    "investigation": {  # Prism + Oracle — self-hosted LLM reasoning
        "qwen_fast": {"hf_id": "Qwen/Qwen3-4B-Instruct-2507", "role": "small_fast_reasoning", "runtime": "vllm/transformers", "status": "benchmark_candidate"},
        "qwen_reasoning": {"hf_id": "Qwen/Qwen3-32B", "role": "large_reasoning", "runtime": "vllm/transformers", "status": "benchmark_candidate"},
        "llama": {"hf_id": "meta-llama/Llama-3.3-70B-Instruct", "role": "general_reasoning", "runtime": "vllm/transformers", "status": "benchmark_candidate"},
        "mistral": {"hf_id": "mistralai/Mistral-Small-24B-Instruct-2501", "role": "reasoning_summarization", "runtime": "vllm/transformers", "status": "benchmark_candidate"},
        "gemma": {"hf_id": "google/gemma-3-27b-it", "role": "lightweight_reasoning", "runtime": "vllm/transformers", "status": "benchmark_candidate"},
    },
    "remediation": {  # Forge — Helios generates, Forge validates/approves/executes
        "qwen_code": {"hf_id": "Qwen/Qwen2.5-Coder-32B-Instruct", "capability": "terraform_k8s_code_remediation", "runtime": "vllm/transformers", "status": "benchmark_candidate"},
        "deepseek_coder": {"hf_id": "deepseek-ai/DeepSeek-Coder-V2-Instruct", "capability": "code_infra_generation", "runtime": "vllm/transformers", "status": "benchmark_candidate"},
    },
    "embeddings": {  # Watchtower — Helios provides capability, Watchtower owns knowledge
        "bge": {"hf_id": "BAAI/bge-large-en-v1.5", "capability": "security_knowledge_embedding", "status": "benchmark_candidate"},
        "e5": {"hf_id": "intfloat/e5-large-v2", "capability": "semantic_retrieval_embedding", "status": "benchmark_candidate"},
        "nomic": {"hf_id": "nomic-ai/nomic-embed-text-v1.5", "capability": "general_domain_embedding", "status": "benchmark_candidate"},
    },
    "reranking": {  # Watchtower
        "bge_reranker": {"hf_id": "BAAI/bge-reranker-v2-m3", "capability": "cross_encoder_reranking", "status": "benchmark_candidate"},
        "cross_encoder": {"hf_id": "cross-encoder/ms-marco-MiniLM-L-6-v2", "capability": "semantic_reranking", "status": "benchmark_candidate"},
    },
    "agent": {  # Oracle — not a single model, an agent runtime backed by the selected LLM
        "oracle_reasoning": {"backed_by": "investigation.qwen_reasoning", "capability": "deep_security_reasoning"},
        "oracle_fast": {"backed_by": "investigation.qwen_fast", "capability": "fast_triage"},
        "oracle_tool_calling": {"backed_by": "investigation.qwen_reasoning", "capability": "structured_tool_calling"},
    },
}

# Exported to configs/models.yaml
detection:
  isolation_forest:
    aegis_version: 4.0.0
    capability: anomaly_detection
    runtime: sklearn
    status: production
  lof:
    aegis_version: 1.0.0
    capability: local_density_anomaly_detection
    runtime: sklearn
    status: experimental
  hbos:
    aegis_version: 1.0.0
    capability: fast_statistical_anomaly_detection
    runtime: sklearn
    status: experimental
  one_class_svm:
    aegis_version: 1.0.0
    capability: novelty_detection
    runtime: sklearn
    status: experimental
  autoencoder:
    aegis_version: 1.0.0
    capability: reconstruction_anomaly_detection
    runtime: pytorch
    status: experimental
  vae:
    aegis_version: 1.0.0
    capability: probabilistic_anomaly_detection
    runtime: pytorch
    status: experimental
  deeplog:
    aegis_version: 2.0.0
    capability: sequence_anomaly_detection
    runtime: pytorch
    status: production
    confirmed: true
  logbert:
    aegis_version: 3.0.0
    capability: log_anomaly_detection
    runtime: pytorch
    status: experimental
  logformer:
    aegis_version: 1.0.0
    capability: contextual_log_anomaly_detection
    runtime: pytorch
    status: production
    confirmed: true
  ueba_behavioral:
    aegis_version: 1.0.0
    capability: behavioral_anomaly_detection
    runtime: pytorch
    status: production
    confirmed: true
correlation:
  node2vec:
    aegis_version: 1.0.0
    capability: entity_relationship_embedding
    runtime: networkx/torch
  graphsage:
    aegis_version: 1.0.0
    capability: graph_entity_representation
    runtime: pytorch_geometric
  gcn:
    aegis_version: 1.0.0
    capability: graph_convolution
    runtime: pytorch_geometric
  gat:
    aegis_version: 1.0.0
    capability: attention_graph_reasoning
    runtime: pytorch_geometric
  temporal_gnn:
    aegis_version: 1.0.0
    capability: time_aware_attack_correlation
    runtime: pytorch_geometric
  graph_transformer:
    aegis_version: 1.0.0
    capability: advanced_attack_graph_reasoning
    runtime: pytorch_geometric
prediction:
  temporal_transformer:
    aegis_version: 1.0.0
    capability: future_event_prediction
    runtime: pytorch
  lstm_gru_predictor:
    aegis_version: 1.0.0
    capability: temporal_forecasting_baseline
    runtime: pytorch
  timeseries_forecaster:
    aegis_version: 1.0.0
    capability: risk_event_forecasting
    runtime: pytorch
  temporal_gnn_prism:
    aegis_version: 1.0.0
    capability: attack_path_evolution_prediction
    runtime: pytorch_geometric
investigation:
  qwen_fast:
    hf_id: Qwen/Qwen3-4B-Instruct-2507
    role: small_fast_reasoning
    runtime: vllm/transformers
    status: benchmark_candidate
  qwen_reasoning:
    hf_id: Qwen/Qwen3-32B
    role: large_reasoning
    runtime: vllm/transformers
    status: benchmark_candidate
  llama:
    hf_id: meta-llama/Llama-3.3-70B-Instruct
    role: general_reasoning
    runtime: vllm/transformers
    status: benchmark_candidate
  mistral:
    hf_id: mistralai/Mistral-Small-24B-Instruct-2501
    role: reasoning_summarization
    runtime: vllm/transformers
    status: benchmark_candidate
  gemma:
    hf_id: google/gemma-3-27b-it
    role: lightweight_reasoning
    runtime: vllm/transformers
    status: benchmark_candidate
remediation:
  qwen_code:
    hf_id: Qwen/Qwen2.5-Coder-32B-Instruct
    capability: terraform_k8s_code_remediation
    runtime: vllm/transformers
    status: benchmark_candidate
  deepseek_coder:
    hf_id: deepseek-ai/DeepSeek-Coder-V2-Instruct
    capability: code_infra_generation
    runtime: vllm/transformers
    status: benchmark_candidate
embeddings:
  bge:
    hf_id: BAAI/bge-large-en-v1.5
    capability: security_knowledge_embedding
    status: benchmark_candidate
  e5:
    hf_id: intfloat/e5-large-v2
    capability: semantic_retrieval_embedding
    status: benchmark_candidate
  nomic:
    hf_id: nomic-ai/nomic-embed-text-v1.5
    capability: general_domain_embedding
    status: benchmark_candidate
reranking:
  bge_reranker:
    hf_id: BAAI/bge-reranker-v2-m3
    capability: cross_encoder_reranking
    status: benchmark_candidate
  cross_encoder:
    hf_id: cross-encoder/ms-marco-MiniLM-L-6-v2
    capability: semantic_reranking
    status: benchmark_candidate
agent:
  oracle_reasoning:
    backed_by: investigation.qwen_reasoning
    capability: deep_security_reasoning
  oracle_fast:
    backed_by: investigation.qwen_fast
    capability: fast_triage
  oracle_tool_calling:
    backed_by: investigation.qwen_reasoning
    capability: structured_tool_calling
`;





