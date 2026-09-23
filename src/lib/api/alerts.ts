import { Alert, AlertStatus, PaginatedResponse, Severity } from '@/lib/types';
import { getMockPaginatedAlerts, MOCK_ALERTS } from '@/lib/mockData';
import { simulateNetworkDelay } from './delay';

export type RemediationAction = 'block_ip' | 'quarantine_user' | 'disable_service' | 'manual';

export interface ApproveAlertPayload {
  remediation_action?: RemediationAction;
  notes?: string;
}

export interface MarkFalsePositivePayload {
  reason: string;
}

export interface AlertsQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  severity?: Severity;
  status?: AlertStatus;
}

export async function getAlerts(params: AlertsQueryParams = {}): Promise<PaginatedResponse<Alert>> {
  await simulateNetworkDelay(400, 850);
  return getMockPaginatedAlerts(params);
}

export async function getAlertById(id: string): Promise<Alert> {
  await simulateNetworkDelay(300, 700);
  const found = MOCK_ALERTS.find((a) => a.id.toLowerCase() === id.toLowerCase());
  if (found) {
    return { ...found };
  }

  // Fallback realistic AI anomaly alert if ID not found
  return {
    id,
    title: `Telemetry Alert ${id}`,
    description: 'Anomalous security telemetry event flagged by Aegis Sentinel Real-Time Detection Engine.',
    severity: 'high',
    risk_score: 84,
    status: 'open',
    cloud_provider: 'aws',
    resource_type: 'AWS::Security::Incident',
    resource_id: `res-${id.toLowerCase()}`,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    retry_attempts: 0,
    affected_services: ['Sentinel Core', 'CloudTrail'],
    recommendation: 'Correlate with Helios Detection Matrix and initiate Forge SOAR containment playbook.',
  };
}

export async function approveAlert(id: string, payload: ApproveAlertPayload): Promise<Alert> {
  await simulateNetworkDelay(500, 950);
  const alert = await getAlertById(id);
  alert.status = 'investigating';
  alert.updated_at = new Date().toISOString();

  const idx = MOCK_ALERTS.findIndex((a) => a.id.toLowerCase() === id.toLowerCase());
  if (idx !== -1) {
    MOCK_ALERTS[idx] = { ...alert };
  }
  return alert;
}

export async function markAlertFalsePositive(
  id: string,
  payload: MarkFalsePositivePayload
): Promise<Alert> {
  await simulateNetworkDelay(450, 900);
  const alert = await getAlertById(id);
  alert.status = 'false_positive';
  alert.updated_at = new Date().toISOString();

  const idx = MOCK_ALERTS.findIndex((a) => a.id.toLowerCase() === id.toLowerCase());
  if (idx !== -1) {
    MOCK_ALERTS[idx] = { ...alert };
  }
  return alert;
}
