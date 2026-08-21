// Core Types for CIDR Frontend

export type Severity = 'critical' | 'high' | 'medium' | 'low';
export type AlertStatus = 'open' | 'investigating' | 'resolved' | 'false_positive';
export type CloudProvider = 'aws' | 'azure' | 'gcp' | 'multi-cloud';
export type WorkflowType = 'auto_remediation' | 'manual_review' | 'escalation' | 'notification';
export type WorkflowStatus = 'pending' | 'executed' | 'failed';
export type AuditResult = 'success' | 'failure' | 'partial';

export interface Alert {
  id: string;
  title: string;
  description: string;
  severity: Severity;
  risk_score: number;
  status: AlertStatus;
  cloud_provider: CloudProvider;
  resource_type: string;
  resource_id: string;
  created_at: string;
  updated_at: string;
  retry_attempts: number;
  affected_services: string[];
  recommendation: string;
}

export interface Log {
  id: string;
  event_type: string;
  user: string;
  source_ip: string;
  destination: string;
  action: string;
  resource: string;
  timestamp: string;
  risk_score: number;
  details: string;
}

export interface Workflow {
  id: string;
  alert_id: string;
  type: WorkflowType;
  status: WorkflowStatus;
  executed_at: string;
  executed_by: string;
  description: string;
  result?: string;
  owasp_category?: string;
  owasp_code?: string;
  nist_phase?: string;
  compliance_ref?: string;
}

export interface AuditLog {
  id: string;
  actor: string;
  action: string;
  resource: string;
  resource_type: string;
  result: AuditResult;
  timestamp: string;
  ip_address: string;
  details: string;
}

export interface DashboardMetrics {
  total_alerts: number;
  critical_alerts: number;
  open_alerts: number;
  resolved_alerts: number;
  avg_risk_score: number;
  alerts_today: number;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  meta: PaginationMeta;
}

export interface DashboardSettingsProfile {
  full_name: string;
  email: string;
}

export interface DashboardSettingsNotifications {
  email_notifications: boolean;
  slack_notifications: boolean;
  critical_alerts_only: boolean;
}

export interface DashboardSettingsSecurity {
  two_factor_enabled: boolean;
  session_timeout_minutes: number | null;
}

export interface DashboardSettingsApiKeys {
  active_key: string;
  last_rotated_at: string;
}

export interface DashboardSettings {
  profile: DashboardSettingsProfile;
  notifications: DashboardSettingsNotifications;
  security: DashboardSettingsSecurity;
  api_keys: DashboardSettingsApiKeys;
  updated_at: string;
}

export interface DashboardSettingsUpdate {
  profile?: Partial<DashboardSettingsProfile>;
  notifications?: Partial<DashboardSettingsNotifications>;
  security?: Partial<DashboardSettingsSecurity>;
}
