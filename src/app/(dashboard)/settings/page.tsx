'use client';

import { useEffect, useMemo, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Bell, Shield, User, Key } from 'lucide-react';
import { getSettings, rotateApiKey, updateSettings } from '@/lib/api/settings';
import { DashboardSettings } from '@/lib/types';

const DEFAULT_SETTINGS: DashboardSettings = {
  profile: {
    full_name: 'Admin User',
    email: 'admin@company.com',
  },
  notifications: {
    email_notifications: true,
    slack_notifications: false,
    critical_alerts_only: false,
  },
  security: {
    two_factor_enabled: false,
    session_timeout_minutes: 30,
  },
  api_keys: {
    active_key: '',
    last_rotated_at: new Date().toISOString(),
  },
  updated_at: new Date().toISOString(),
};

type SaveSection = 'profile' | 'notifications' | 'security' | 'api';

const INITIAL_SAVE_STATE: Record<SaveSection, boolean> = {
  profile: false,
  notifications: false,
  security: false,
  api: false,
};

const maskApiKey = (apiKey: string): string => {
  if (!apiKey || apiKey.length < 8) {
    return 'sk-••••••••';
  }

  const visibleTail = apiKey.slice(-4);
  return `sk-${'•'.repeat(Math.max(8, apiKey.length - 7))}${visibleTail}`;
};

const toErrorMessage = (error: unknown, fallback: string): string => {
  if (error instanceof Error && error.message.trim().length > 0) {
    return error.message;
  }

  return fallback;
};

export default function SettingsPage() {
  const [settings, setSettings] = useState<DashboardSettings>(DEFAULT_SETTINGS);
  const [isLoading, setIsLoading] = useState(true);
  const [saveState, setSaveState] = useState<Record<SaveSection, boolean>>(INITIAL_SAVE_STATE);
  const [showApiKey, setShowApiKey] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    let isDisposed = false;

    const loadSettings = async () => {
      try {
        const response = await getSettings();
        if (!isDisposed) {
          setSettings(response);
          setErrorMessage(null);
        }
      } catch (error) {
        if (!isDisposed) {
          setErrorMessage(toErrorMessage(error, 'Unable to load settings.'));
        }
      } finally {
        if (!isDisposed) {
          setIsLoading(false);
        }
      }
    };

    void loadSettings();

    return () => {
      isDisposed = true;
    };
  }, []);

  const sessionTimeoutValue = useMemo(() => {
    if (settings.security.session_timeout_minutes === null) {
      return 'never';
    }

    return String(settings.security.session_timeout_minutes);
  }, [settings.security.session_timeout_minutes]);

  const displayedApiKey = showApiKey
    ? settings.api_keys.active_key || 'No API key generated yet.'
    : maskApiKey(settings.api_keys.active_key);

  const saveSection = async (
    section: SaveSection,
    action: () => Promise<DashboardSettings>,
    successText: string
  ) => {
    setSaveState((previous) => ({ ...previous, [section]: true }));
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const updated = await action();
      setSettings(updated);
      setSuccessMessage(successText);
    } catch (error) {
      setErrorMessage(toErrorMessage(error, 'Unable to save settings.'));
    } finally {
      setSaveState((previous) => ({ ...previous, [section]: false }));
    }
  };

  const handleProfileSave = async () => {
    await saveSection(
      'profile',
      () =>
        updateSettings({
          profile: {
            full_name: settings.profile.full_name,
            email: settings.profile.email,
          },
        }),
      'Profile settings saved successfully.'
    );
  };

  const handleNotificationSave = async () => {
    await saveSection(
      'notifications',
      () =>
        updateSettings({
          notifications: {
            email_notifications: settings.notifications.email_notifications,
            slack_notifications: settings.notifications.slack_notifications,
            critical_alerts_only: settings.notifications.critical_alerts_only,
          },
        }),
      'Notification preferences saved successfully.'
    );
  };

  const handleSecuritySave = async () => {
    await saveSection(
      'security',
      () =>
        updateSettings({
          security: {
            two_factor_enabled: settings.security.two_factor_enabled,
            session_timeout_minutes: settings.security.session_timeout_minutes,
          },
        }),
      'Security settings saved successfully.'
    );
  };

  const handleRotateApiKey = async () => {
    await saveSection('api', rotateApiKey, 'API key rotated successfully.');
    setShowApiKey(true);
  };

  if (isLoading) {
    return (
      <div className="space-y-6" data-testid="settings-page">
        <div>
          <h1 className="text-3xl font-bold text-slate-100 mb-2">Settings</h1>
          <p className="text-slate-400">Loading your dashboard preferences...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6" data-testid="settings-page">
      <div>
        <h1 className="text-3xl font-bold text-slate-100 mb-2">Settings</h1>
        <p className="text-slate-400">Manage your security dashboard preferences</p>
      </div>

      {errorMessage ? (
        <div className="rounded-md border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300" data-testid="settings-error-message">
          {errorMessage}
        </div>
      ) : null}

      {successMessage ? (
        <div className="rounded-md border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300" data-testid="settings-success-message">
          {successMessage}
        </div>
      ) : null}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Settings */}
        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <User className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <CardTitle>Profile Settings</CardTitle>
                <CardDescription>Update your personal information</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
              <Input
                placeholder="Admin User"
                value={settings.profile.full_name}
                onChange={(event) => {
                  const nextValue = event.target.value;
                  setSettings((previous) => ({
                    ...previous,
                    profile: {
                      ...previous.profile,
                      full_name: nextValue,
                    },
                  }));
                }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
              <Input
                type="email"
                placeholder="admin@company.com"
                value={settings.profile.email}
                onChange={(event) => {
                  const nextValue = event.target.value;
                  setSettings((previous) => ({
                    ...previous,
                    profile: {
                      ...previous.profile,
                      email: nextValue,
                    },
                  }));
                }}
              />
            </div>
            <Button
              data-testid="save-profile-button"
              onClick={() => void handleProfileSave()}
              disabled={saveState.profile}
            >
              {saveState.profile ? 'Saving...' : 'Save Changes'}
            </Button>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                <Bell className="h-5 w-5 text-amber-400" />
              </div>
              <div>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>Configure alert notifications</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-300">Email Notifications</p>
                <p className="text-xs text-slate-500">Receive alerts via email</p>
              </div>
              <input
                type="checkbox"
                checked={settings.notifications.email_notifications}
                aria-label="Toggle email notifications"
                onChange={(event) => {
                  const checked = event.target.checked;
                  setSettings((previous) => ({
                    ...previous,
                    notifications: {
                      ...previous.notifications,
                      email_notifications: checked,
                    },
                  }));
                }}
                className="h-4 w-4"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-300">Slack Notifications</p>
                <p className="text-xs text-slate-500">Send alerts to Slack</p>
              </div>
              <input
                type="checkbox"
                checked={settings.notifications.slack_notifications}
                aria-label="Toggle Slack notifications"
                onChange={(event) => {
                  const checked = event.target.checked;
                  setSettings((previous) => ({
                    ...previous,
                    notifications: {
                      ...previous.notifications,
                      slack_notifications: checked,
                    },
                  }));
                }}
                className="h-4 w-4"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-300">Critical Alerts Only</p>
                <p className="text-xs text-slate-500">Only notify for critical severity</p>
              </div>
              <input
                type="checkbox"
                checked={settings.notifications.critical_alerts_only}
                aria-label="Toggle critical alerts only notifications"
                onChange={(event) => {
                  const checked = event.target.checked;
                  setSettings((previous) => ({
                    ...previous,
                    notifications: {
                      ...previous.notifications,
                      critical_alerts_only: checked,
                    },
                  }));
                }}
                className="h-4 w-4"
              />
            </div>
            <Button
              data-testid="save-notifications-button"
              onClick={() => void handleNotificationSave()}
              disabled={saveState.notifications}
            >
              {saveState.notifications ? 'Saving...' : 'Save Preferences'}
            </Button>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                <Shield className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <CardTitle>Security</CardTitle>
                <CardDescription>Manage security preferences</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-300">Two-Factor Authentication</p>
                <p className="text-xs text-slate-500">Add an extra layer of security</p>
              </div>
              <Button
                variant={settings.security.two_factor_enabled ? 'default' : 'outline'}
                size="sm"
                onClick={() => {
                  setSettings((previous) => ({
                    ...previous,
                    security: {
                      ...previous.security,
                      two_factor_enabled: !previous.security.two_factor_enabled,
                    },
                  }));
                }}
              >
                {settings.security.two_factor_enabled ? 'Disable' : 'Enable'}
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-300">Session Timeout</p>
                <p className="text-xs text-slate-500">Auto logout after inactivity</p>
              </div>
              <select
                className="h-8 rounded-md border border-slate-700 bg-slate-900 px-2 text-sm text-slate-100"
                value={sessionTimeoutValue}
                aria-label="Select session timeout"
                onChange={(event) => {
                  const selected = event.target.value;
                  setSettings((previous) => ({
                    ...previous,
                    security: {
                      ...previous.security,
                      session_timeout_minutes: selected === 'never' ? null : Number(selected),
                    },
                  }));
                }}
              >
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="60">1 hour</option>
                <option value="never">Never</option>
              </select>
            </div>
            <Button
              data-testid="save-security-button"
              onClick={() => void handleSecuritySave()}
              disabled={saveState.security}
            >
              {saveState.security ? 'Saving...' : 'Save Settings'}
            </Button>
          </CardContent>
        </Card>

        {/* API Keys */}
        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <Key className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                <CardTitle>API Keys</CardTitle>
                <CardDescription>Manage API access keys</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">API Key</label>
              <div className="flex gap-2">
                <Input
                  type={showApiKey ? 'text' : 'password'}
                  value={displayedApiKey}
                  readOnly
                  aria-label="API key value"
                  className="flex-1"
                />
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowApiKey((previous) => !previous);
                  }}
                >
                  {showApiKey ? 'Hide' : 'Reveal'}
                </Button>
              </div>
            </div>
            <div className="pt-2">
              <Button
                variant="outline"
                className="w-full"
                data-testid="generate-api-key-button"
                onClick={() => void handleRotateApiKey()}
                disabled={saveState.api}
              >
                {saveState.api ? 'Generating...' : 'Generate New Key'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
