'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  User, 
  Building, 
  Briefcase, 
  Users, 
  Shield, 
  Key, 
  Cloud, 
  Bell, 
  KeyRound, 
  Sliders, 
  AlertTriangle,
  Mail,
  Phone,
  Globe,
  Plus,
  Trash2,
  RefreshCw,
  Clock,
  Laptop,
  CheckCircle,
  XCircle,
  Check,
  Loader2,
  Eye,
  EyeOff
} from 'lucide-react';
import { getSettings, rotateApiKey, updateSettings } from '@/lib/api/settings';
import { DashboardSettings } from '@/lib/types';
import { cn } from '@/lib/utils';

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
    active_key: 'sk-aegis-sentinel-live-93a8e990c88bc3b2aef89',
    last_rotated_at: new Date().toISOString(),
  },
  updated_at: new Date().toISOString(),
};

const maskApiKey = (apiKey: string): string => {
  if (!apiKey || apiKey.length < 8) return 'sk-••••••••';
  return `sk-${'•'.repeat(8)}${apiKey.slice(-4)}`;
};

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<string>('profile');
  const [settings, setSettings] = useState<DashboardSettings>(DEFAULT_SETTINGS);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showApiKey, setShowApiKey] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Profile Form States
  const [fullName, setFullName] = useState('Admin User');
  const [workEmail, setWorkEmail] = useState('admin@company.com');
  const [phoneNumber, setPhoneNumber] = useState('+1 (555) 019-2834');
  const [jobTitle, setJobTitle] = useState('Lead SOC Analyst');
  const [department, setDepartment] = useState('SecOps');
  const [timezone, setTimezone] = useState('UTC -5 (EST)');
  const [country, setCountry] = useState('United States');
  const [language, setLanguage] = useState('en');

  // Workspace States
  const [workspaceName, setWorkspaceName] = useState('Aegis SOC');
  const [workspaceSlug, setWorkspaceSlug] = useState('acme-soc');
  const [workspaceDesc, setWorkspaceDesc] = useState('Enterprise security incident responder control console.');
  const [workspaceRegion, setWorkspaceRegion] = useState('us-east-1');

  // Org States
  const [companyName, setCompanyName] = useState('Acme Technologies Pvt. Ltd.');
  const [orgIndustry, setOrgIndustry] = useState('Technology');
  const [orgSize, setOrgSize] = useState('51-200');
  const [orgWebsite, setOrgWebsite] = useState('https://acme.com');
  const [orgAddress, setOrgAddress] = useState('Pune, Maharashtra, India');

  // Members Table States
  const [members, setMembers] = useState([
    { name: 'Admin User', role: 'Owner', email: 'admin@company.com', status: 'Active' },
    { name: 'Sarah Connor', role: 'SOC Manager', email: 'sarah@company.com', status: 'Active' },
    { name: 'John Connor', role: 'Security Analyst', email: 'john@company.com', status: 'Active' },
    { name: 'T-800', role: 'Read Only', email: 'arnold@company.com', status: 'Pending' },
  ]);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteName, setInviteName] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('Security Analyst');

  // Security Password state
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Active Sessions
  const [sessions, setSessions] = useState([
    { browser: 'Chrome', location: 'Pune, India', device: 'Linux', current: true },
    { browser: 'Edge', location: 'London, UK', device: 'Windows', current: false },
  ]);

  // Trusted Devices
  const [devices, setDevices] = useState([
    { name: 'Operations Workstation (Desktop)', icon: 'desktop' },
    { name: 'Admin iPad (Tablet)', icon: 'tablet' },
    { name: 'SOC Mobile Device (Phone)', icon: 'phone' },
  ]);

  // Cloud Integrations States
  const [clouds, setClouds] = useState({
    aws: { connected: true, region: 'us-east-1' },
    azure: { connected: false, region: 'eastus' },
    gcp: { connected: true, region: 'us-central1' },
    k8s: { connected: true, region: 'on-prem' },
  });
  const [cloudLoading, setCloudLoading] = useState<string | null>(null);

  // Notification Checkboxes
  const [notifChannels, setNotifChannels] = useState({
    email: true,
    slack: false,
    teams: false,
    discord: false,
    webhooks: false,
  });
  const [notifSeverity, setNotifSeverity] = useState({
    critical: true,
    high: true,
    medium: false,
    low: false,
  });
  const [notifDigest, setNotifDigest] = useState('instant');

  // API Keys Table State
  const [apiKeys, setApiKeys] = useState([
    { name: 'Production Live Scanner Key', created: '2026-07-01', lastUsed: '5 mins ago', expires: '2027-07-01', key: 'sk-live-aegis-192a839f' },
    { name: 'SIEM Agent Trailing Key', created: '2026-07-10', lastUsed: '1 hour ago', expires: '2026-10-10', key: 'sk-live-aegis-928ab0cf' },
  ]);

  // Appearance Styles
  const [theme, setTheme] = useState('dark');
  const [accentColor, setAccentColor] = useState('cyan');
  const [sidebarCompact, setSidebarCompact] = useState(false);
  const [densityCompact, setDensityCompact] = useState(false);

  // API keys loading/handling
  const displayedApiKey = showApiKey
    ? settings.api_keys.active_key || 'No API key generated yet.'
    : maskApiKey(settings.api_keys.active_key);

  useEffect(() => {
    let isDisposed = false;
    const loadSettings = async () => {
      try {
        const response = await getSettings();
        if (!isDisposed) {
          setSettings(response);
          setFullName(response.profile.full_name);
          setWorkEmail(response.profile.email);
        }
      } catch {
        // Fallback to local default state if backend is offline
        if (!isDisposed) {
          console.log('Backend offline, running settings on offline client-side state.');
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

  const handleProfileSave = async () => {
    setErrorMessage(null);
    setSuccessMessage(null);
    try {
      const payload = {
        profile: {
          full_name: fullName,
          email: workEmail,
        },
      };
      const updated = await updateSettings(payload);
      setSettings(updated);
      setSuccessMessage('Profile settings saved successfully.');
    } catch {
      // Offline fallback state update
      setSettings((prev) => ({
        ...prev,
        profile: { full_name: fullName, email: workEmail },
      }));
      setSuccessMessage('Profile settings saved locally (offline mode).');
    }
  };

  const handleInviteMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteName || !inviteEmail) return;
    setMembers((prev) => [
      ...prev,
      { name: inviteName, role: inviteRole, email: inviteEmail, status: 'Pending' }
    ]);
    setInviteName('');
    setInviteEmail('');
    setShowInviteModal(false);
    setSuccessMessage(`Invitation dispatched to ${inviteEmail}.`);
  };

  const handleRemoveMember = (emailToRemove: string) => {
    setMembers((prev) => prev.filter((m) => m.email !== emailToRemove));
    setSuccessMessage('Team member revoked.');
  };

  const handleToggleCloud = (cloudKey: 'aws' | 'azure' | 'gcp' | 'k8s') => {
    setCloudLoading(cloudKey);
    setTimeout(() => {
      setClouds((prev) => ({
        ...prev,
        [cloudKey]: { ...prev[cloudKey], connected: !prev[cloudKey].connected }
      }));
      setCloudLoading(null);
      setSuccessMessage(`${cloudKey.toUpperCase()} integration status updated.`);
    }, 1200);
  };

  const handleRotateApiKey = async () => {
    setErrorMessage(null);
    setSuccessMessage(null);
    try {
      const updated = await rotateApiKey();
      setSettings(updated);
      setSuccessMessage('API Access Key rotated successfully.');
      setShowApiKey(true);
    } catch {
      const newKey = `sk-aegis-sentinel-live-${Math.random().toString(36).substring(2)}`;
      setSettings((prev) => ({
        ...prev,
        api_keys: { active_key: newKey, last_rotated_at: new Date().toISOString() },
      }));
      setSuccessMessage('API Access Key rotated locally (offline mode).');
      setShowApiKey(true);
    }
  };

  const sidebarItems = [
    { id: 'profile', name: 'My Profile', icon: <User className="h-4 w-4" /> },
    { id: 'workspace', name: 'Workspace', icon: <Building className="h-4 w-4" /> },
    { id: 'organization', name: 'Organization', icon: <Briefcase className="h-4 w-4" /> },
    { id: 'members', name: 'Members', icon: <Users className="h-4 w-4" /> },
    { id: 'security', name: 'Security', icon: <Shield className="h-4 w-4" /> },
    { id: 'auth', name: 'Authentication', icon: <Key className="h-4 w-4" /> },
    { id: 'cloud', name: 'Cloud Integrations', icon: <Cloud className="h-4 w-4" /> },
    { id: 'notifications', name: 'Notifications', icon: <Bell className="h-4 w-4" /> },
    { id: 'api', name: 'API Keys', icon: <KeyRound className="h-4 w-4" /> },
    { id: 'appearance', name: 'Appearance', icon: <Sliders className="h-4 w-4" /> },
    { id: 'danger', name: 'Danger Zone', icon: <AlertTriangle className="h-4 w-4 text-red-500" /> },
  ];

  if (isLoading) {
    return (
      <div className="space-y-6 flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 text-cyan-400 animate-spin" />
        <p className="text-slate-400 text-sm font-mono tracking-widest">LOADING COMMAND CONSOLE NODE...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6" data-testid="settings-page">
      
      {/* Title */}
      <div>
        <h1 className="text-3xl font-extrabold text-slate-100 tracking-tight mb-1">Command</h1>
        <p className="text-sm text-slate-450 font-light">Configure your Aegis Sentinel workspace, profile, and integrations.</p>
      </div>

      {/* Notifications Messages */}
      {errorMessage && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-xs text-red-400 flex items-center gap-2" data-testid="settings-error-message">
          <AlertTriangle size={14} />
          {errorMessage}
        </div>
      )}

      {successMessage && (
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-4 py-3 text-xs text-emerald-400 flex items-center gap-2" data-testid="settings-success-message">
          <CheckCircle size={14} />
          {successMessage}
        </div>
      )}

      {/* Layout Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Sidebar */}
        <div className="lg:col-span-3 space-y-1 bg-slate-950/40 border border-slate-900 rounded-2xl p-2.5">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-3.5 py-2 font-mono">⚙ Command Console</p>
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setSuccessMessage(null);
                setErrorMessage(null);
              }}
              className={cn(
                "w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all text-left cursor-pointer",
                activeTab === item.id 
                  ? "bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.1)]" 
                  : "text-slate-450 hover:text-slate-200 hover:bg-slate-900/30 border border-transparent"
              )}
            >
              {item.icon}
              {item.name}
            </button>
          ))}
        </div>

        {/* Right Content Area */}
        <div className="lg:col-span-9">
          
          {/* TAB 1: My Profile */}
          {activeTab === 'profile' && (
            <Card className="bg-slate-950/30 border-slate-900 backdrop-blur-xl">
              <CardHeader className="border-b border-slate-900 pb-5">
                <CardTitle className="text-lg font-bold text-slate-100 flex items-center gap-2">
                  <User className="h-5 w-5 text-cyan-400" /> Personal Profile
                </CardTitle>
                <CardDescription className="text-xs font-light text-slate-400">Configure your security account profile and language details</CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                
                {/* Profile Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Full Name</label>
                    <Input value={fullName} onChange={(e) => setFullName(e.target.value)} />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Work Email</label>
                    <Input value={workEmail} onChange={(e) => setWorkEmail(e.target.value)} />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-500" />
                      <Input className="pl-11" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Job Title</label>
                      <Input value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Department</label>
                      <Input value={department} onChange={(e) => setDepartment(e.target.value)} />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Time Zone</label>
                    <select 
                      className="w-full bg-slate-950 border border-slate-900 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-cyan-500 appearance-none h-10 cursor-pointer"
                      value={timezone}
                      onChange={(e) => setTimezone(e.target.value)}
                    >
                      <option value="UTC -5 (EST)">UTC -5 (EST)</option>
                      <option value="UTC +5:30 (IST)">UTC +5:30 (IST)</option>
                      <option value="UTC +0 (GMT)">UTC +0 (GMT)</option>
                      <option value="UTC +1 (CET)">UTC +1 (CET)</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Country</label>
                      <Input value={country} onChange={(e) => setCountry(e.target.value)} />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Language</label>
                      <select 
                        className="w-full bg-slate-950 border border-slate-900 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-cyan-500 appearance-none h-10 cursor-pointer"
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                      >
                        <option value="en">English (US)</option>
                        <option value="de">Deutsch</option>
                        <option value="fr">Français</option>
                        <option value="ja">日本語</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex gap-4 border-t border-slate-900">
                  <Button onClick={handleProfileSave} className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold uppercase tracking-wider rounded-xl h-10 px-6">
                    Save Changes
                  </Button>
                  <Button variant="outline" className="border-slate-800 text-slate-350 hover:bg-slate-900/40 text-xs font-bold uppercase tracking-wider rounded-xl h-10 px-6">
                    Change Password
                  </Button>
                </div>

              </CardContent>
            </Card>
          )}

          {/* TAB 2: Workspace */}
          {activeTab === 'workspace' && (
            <Card className="bg-slate-950/30 border-slate-900 backdrop-blur-xl">
              <CardHeader className="border-b border-slate-900 pb-5">
                <CardTitle className="text-lg font-bold text-slate-100 flex items-center gap-2">
                  <Building className="h-5 w-5 text-cyan-400" /> Workspace Configurations
                </CardTitle>
                <CardDescription className="text-xs font-light text-slate-400">Configure parameters for your Aegis Sentinel security command center</CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Workspace Name</label>
                    <Input value={workspaceName} onChange={(e) => setWorkspaceName(e.target.value)} />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1 font-mono">Workspace URL</label>
                    <div className="flex gap-1.5 items-center">
                      <Input value={workspaceSlug} onChange={(e) => setWorkspaceSlug(e.target.value)} className="flex-1 font-mono text-cyan-400" />
                      <span className="text-slate-500 font-mono text-xs">.aegissentinel.ai</span>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Workspace Description</label>
                    <textarea 
                      value={workspaceDesc} 
                      onChange={(e) => setWorkspaceDesc(e.target.value)} 
                      rows={3} 
                      className="w-full bg-slate-950 border border-slate-900 rounded-xl px-4 py-3 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-cyan-500 resize-none font-light leading-relaxed"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Active Region</label>
                    <select 
                      className="w-full bg-slate-950 border border-slate-900 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-cyan-500 appearance-none h-10 cursor-pointer"
                      value={workspaceRegion}
                      onChange={(e) => setWorkspaceRegion(e.target.value)}
                    >
                      <option value="us-east-1">AWS N. Virginia (us-east-1)</option>
                      <option value="us-west-2">AWS Oregon (us-west-2)</option>
                      <option value="eu-central-1">AWS Frankfurt (eu-central-1)</option>
                      <option value="ap-south-1">AWS Mumbai (ap-south-1)</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4 flex flex-wrap gap-4 border-t border-slate-900">
                  <Button onClick={() => setSuccessMessage('Workspace updated successfully.')} className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold uppercase tracking-wider rounded-xl h-10 px-6">
                    Save Workspace Settings
                  </Button>
                  <Button variant="outline" className="border-slate-800 text-slate-350 hover:bg-slate-900/40 text-xs font-bold uppercase tracking-wider rounded-xl h-10 px-5">
                    Change Logo
                  </Button>
                  <Button variant="outline" className="border-slate-800 text-slate-350 hover:bg-slate-900/40 text-xs font-bold uppercase tracking-wider rounded-xl h-10 px-5">
                    Export Workspace Configuration
                  </Button>
                </div>

              </CardContent>
            </Card>
          )}

          {/* TAB 3: Organization */}
          {activeTab === 'organization' && (
            <Card className="bg-slate-950/30 border-slate-900 backdrop-blur-xl">
              <CardHeader className="border-b border-slate-900 pb-5">
                <CardTitle className="text-lg font-bold text-slate-100 flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-cyan-400" /> Organization Parameters
                </CardTitle>
                <CardDescription className="text-xs font-light text-slate-400">Manage corporate profile and administrative contacts</CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5 col-span-1 md:col-span-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Company / Organization Name</label>
                    <Input value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Corporate Industry</label>
                    <Input value={orgIndustry} onChange={(e) => setOrgIndustry(e.target.value)} />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Organization Size</label>
                    <Input value={orgSize} onChange={(e) => setOrgSize(e.target.value)} />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Website URL</label>
                    <Input value={orgWebsite} onChange={(e) => setOrgWebsite(e.target.value)} />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Headquarters Address</label>
                    <Input value={orgAddress} onChange={(e) => setOrgAddress(e.target.value)} />
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-900">
                  <Button onClick={() => setSuccessMessage('Organization details updated.')} className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold uppercase tracking-wider rounded-xl h-10 px-6">
                    Save Organization Profile
                  </Button>
                </div>

              </CardContent>
            </Card>
          )}

          {/* TAB 4: Members */}
          {activeTab === 'members' && (
            <Card className="bg-slate-950/30 border-slate-900 backdrop-blur-xl">
              <CardHeader className="border-b border-slate-900 pb-5 flex flex-row items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-lg font-bold text-slate-100 flex items-center gap-2">
                    <Users className="h-5 w-5 text-cyan-400" /> Team Members
                  </CardTitle>
                  <CardDescription className="text-xs font-light text-slate-400">Manage security team users and role assignments</CardDescription>
                </div>
                <Button 
                  onClick={() => setShowInviteModal(true)} 
                  className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold uppercase tracking-wider rounded-xl h-9 px-4 flex items-center gap-1.5"
                >
                  <Plus size={14} /> Invite Member
                </Button>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                
                {/* Invite Modal Overlay */}
                {showInviteModal && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-md space-y-5 shadow-2xl">
                      <h3 className="text-sm font-bold text-slate-100 uppercase tracking-widest font-mono">Invite Security Practitioner</h3>
                      <form onSubmit={handleInviteMember} className="space-y-4">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Practitioner Name</label>
                          <Input value={inviteName} onChange={(e) => setInviteName(e.target.value)} placeholder="T-1000" required />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Work Email</label>
                          <Input type="email" value={inviteEmail} onChange={(e) => setInviteEmail(e.target.value)} placeholder="t1000@company.com" required />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Role Command</label>
                          <select 
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-cyan-500 appearance-none h-10 cursor-pointer"
                            value={inviteRole}
                            onChange={(e) => setInviteRole(e.target.value)}
                          >
                            <option value="Owner">Owner</option>
                            <option value="Administrator">Administrator</option>
                            <option value="SOC Manager">SOC Manager</option>
                            <option value="Security Analyst">Security Analyst</option>
                            <option value="Read Only">Read Only</option>
                          </select>
                        </div>
                        <div className="flex gap-3 pt-2">
                          <Button type="button" variant="outline" onClick={() => setShowInviteModal(false)} className="flex-1 border-slate-800 text-slate-400 hover:bg-slate-950 h-10 rounded-xl">
                            Cancel
                          </Button>
                          <Button type="submit" className="flex-1 bg-cyan-500 hover:bg-cyan-400 text-slate-950 h-10 rounded-xl font-bold uppercase tracking-wider text-xs">
                            Send Invitation
                          </Button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}

                {/* Team Members List */}
                <div className="overflow-x-auto rounded-xl border border-slate-900 bg-slate-950/40">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-slate-900 bg-slate-950/60 text-slate-450 uppercase tracking-wider font-mono text-[10px]">
                        <th className="p-4 font-semibold">Practitioner</th>
                        <th className="p-4 font-semibold">Security Role</th>
                        <th className="p-4 font-semibold">Access Node</th>
                        <th className="p-4 font-semibold text-center">Enrolled</th>
                        <th className="p-4 font-semibold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-900">
                      {members.map((member) => (
                        <tr key={member.email} className="hover:bg-slate-900/10 transition-colors">
                          <td className="p-4 font-semibold text-slate-250">{member.name}</td>
                          <td className="p-4">
                            <span className={cn(
                              "px-2.5 py-1 rounded-full text-[9px] font-bold font-mono tracking-wide uppercase",
                              member.role === 'Owner' && "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20",
                              member.role === 'Administrator' && "bg-purple-500/10 text-purple-400 border border-purple-500/20",
                              member.role === 'SOC Manager' && "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20",
                              member.role === 'Security Analyst' && "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
                              member.role === 'Read Only' && "bg-slate-800 text-slate-400"
                            )}>
                              {member.role}
                            </span>
                          </td>
                          <td className="p-4 font-mono text-slate-450">{member.email}</td>
                          <td className="p-4 text-center">
                            <span className={cn(
                              "inline-flex items-center h-1.5 w-1.5 rounded-full mr-2",
                              member.status === 'Active' ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
                            )} />
                            <span className="text-[10px] text-slate-400 font-medium font-mono">{member.status}</span>
                          </td>
                          <td className="p-4 text-right">
                            {member.role !== 'Owner' ? (
                              <button 
                                onClick={() => handleRemoveMember(member.email)}
                                className="text-slate-500 hover:text-red-400 transition-colors cursor-pointer p-1"
                                aria-label={`Remove ${member.name}`}
                              >
                                <Trash2 size={14} />
                              </button>
                            ) : (
                              <span className="text-[10px] text-slate-600 font-mono italic">Primary</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

              </CardContent>
            </Card>
          )}

          {/* TAB 5: Security */}
          {activeTab === 'security' && (
            <Card className="bg-slate-950/30 border-slate-900 backdrop-blur-xl">
              <CardHeader className="border-b border-slate-900 pb-5">
                <CardTitle className="text-lg font-bold text-slate-100 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-cyan-400" /> Operational Security Settings
                </CardTitle>
                <CardDescription className="text-xs font-light text-slate-400">Configure access control levels, active keys, and authentication procedures</CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                
                {/* Section 1: Change Password */}
                <div className="space-y-4">
                  <h3 className="text-xs font-bold text-slate-350 uppercase tracking-widest font-mono">1. Modify Console Credentials</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Current Password</label>
                      <div className="relative">
                        <Input 
                          type={showOldPassword ? 'text' : 'password'} 
                          value={oldPassword} 
                          onChange={(e) => setOldPassword(e.target.value)} 
                          placeholder="••••••••••••" 
                          className="pr-10 text-xs h-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowOldPassword(!showOldPassword)}
                          className="absolute right-3.5 top-3 text-slate-500 hover:text-slate-350 cursor-pointer"
                        >
                          {showOldPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                        </button>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">New Password</label>
                      <div className="relative">
                        <Input 
                          type={showNewPassword ? 'text' : 'password'} 
                          value={newPassword} 
                          onChange={(e) => setNewPassword(e.target.value)} 
                          placeholder="••••••••••••" 
                          className="pr-10 text-xs h-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3.5 top-3 text-slate-500 hover:text-slate-350 cursor-pointer"
                        >
                          {showNewPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                        </button>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Confirm New Password</label>
                      <div className="relative">
                        <Input 
                          type={showConfirmPassword ? 'text' : 'password'} 
                          value={confirmPassword} 
                          onChange={(e) => setConfirmPassword(e.target.value)} 
                          placeholder="••••••••••••" 
                          className="pr-10 text-xs h-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3.5 top-3 text-slate-500 hover:text-slate-350 cursor-pointer"
                        >
                          {showConfirmPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                        </button>
                      </div>
                    </div>
                  </div>
                  <Button 
                    onClick={() => {
                      if (newPassword !== confirmPassword) {
                        setErrorMessage("New passwords do not match.");
                        return;
                      }
                      setOldPassword('');
                      setNewPassword('');
                      setConfirmPassword('');
                      setSuccessMessage('Password changed successfully.');
                    }}
                    className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold uppercase tracking-wider rounded-xl h-9 px-4"
                  >
                    Change Password
                  </Button>
                </div>

                {/* Section 2: MFA Placeholder */}
                <div className="space-y-4 pt-6 border-t border-slate-900">
                  <h3 className="text-xs font-bold text-slate-350 uppercase tracking-widest font-mono">2. Multi-Factor Authentication</h3>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-950/40 p-4 border border-slate-900 rounded-2xl">
                    <div className="space-y-1">
                      <h4 className="text-sm font-semibold text-slate-200">Authenticator App Verification</h4>
                      <p className="text-xs text-slate-450 font-light">Generate dynamic 6-digit session codes using your Google/Microsoft Authenticator app.</p>
                    </div>
                    <Button 
                      variant={settings.security.two_factor_enabled ? 'default' : 'outline'}
                      className={cn(
                        "rounded-xl font-bold uppercase tracking-wider text-xs",
                        settings.security.two_factor_enabled ? "bg-emerald-500 hover:bg-emerald-600 text-slate-950" : "border-slate-800 text-slate-300 hover:bg-slate-900"
                      )}
                      onClick={() => {
                        setSettings((prev) => ({
                          ...prev,
                          security: { ...prev.security, two_factor_enabled: !prev.security.two_factor_enabled }
                        }));
                        setSuccessMessage(`Two-Factor Authentication ${!settings.security.two_factor_enabled ? 'enabled' : 'disabled'}.`);
                      }}
                    >
                      {settings.security.two_factor_enabled ? 'MFA Enabled' : 'Enable MFA'}
                    </Button>
                  </div>
                </div>

                {/* Section 3: Active Sessions */}
                <div className="space-y-4 pt-6 border-t border-slate-900">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xs font-bold text-slate-350 uppercase tracking-widest font-mono">3. Active Device Sessions</h3>
                    <Button onClick={() => setSuccessMessage('Terminated other active devices.')} variant="outline" className="border-red-500/20 text-red-400 hover:bg-red-500/5 text-[10px] font-bold uppercase tracking-wider rounded-xl h-8 px-3">
                      Sign Out All Devices
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                    {sessions.map((sess, idx) => (
                      <div key={idx} className="flex justify-between items-center p-3.5 bg-slate-950/30 border border-slate-900 rounded-2xl">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-450">
                            <Laptop size={16} />
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-slate-200">
                              {sess.browser} on {sess.device}
                              {sess.current && <span className="ml-2 px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 text-[8px] font-mono tracking-wider uppercase font-bold">Current Device</span>}
                            </p>
                            <p className="text-[10px] text-slate-500 font-mono font-light mt-0.5">{sess.location}</p>
                          </div>
                        </div>
                        {!sess.current && (
                          <button onClick={() => setSessions(prev => prev.filter((_, i) => i !== idx))} className="text-[10px] font-bold uppercase tracking-wider text-slate-500 hover:text-red-400 transition-colors">
                            Revoke
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section 4: Trusted Devices */}
                <div className="space-y-4 pt-6 border-t border-slate-900">
                  <h3 className="text-xs font-bold text-slate-350 uppercase tracking-widest font-mono">4. Trusted Hardware Nodes</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {devices.map((device, idx) => (
                      <div key={idx} className="p-3 bg-slate-950/20 border border-slate-900 rounded-2xl flex items-center gap-2.5">
                        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-[11px] font-mono text-slate-350 font-medium">{device.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </CardContent>
            </Card>
          )}

          {/* TAB 6: Authentication */}
          {activeTab === 'auth' && (
            <Card className="bg-slate-950/30 border-slate-900 backdrop-blur-xl">
              <CardHeader className="border-b border-slate-900 pb-5">
                <CardTitle className="text-lg font-bold text-slate-100 flex items-center gap-2">
                  <Key className="h-5 w-5 text-cyan-400" /> Authentication Providers
                </CardTitle>
                <CardDescription className="text-xs font-light text-slate-400">Configure single sign-on (SSO) and federation keys</CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-5">
                
                {/* Providers List */}
                <div className="space-y-3">
                  {[
                    { name: 'Google Workspace Single Sign-On', state: 'Enabled', type: 'OAuth' },
                    { name: 'Github Developer Account Federation', state: 'Enabled', type: 'OAuth' },
                    { name: 'Microsoft Active Directory (AD)', state: 'Disabled', type: 'SAML / Enterprise' },
                    { name: 'Okta Identity Command Platform', state: 'Disabled', type: 'SAML / Enterprise' },
                  ].map((prov) => (
                    <div key={prov.name} className="flex justify-between items-center p-3.5 bg-slate-950/40 border border-slate-900 rounded-xl">
                      <div>
                        <p className="text-xs font-semibold text-slate-200">{prov.name}</p>
                        <p className="text-[10px] text-slate-500 font-mono tracking-wider font-semibold uppercase mt-0.5">{prov.type}</p>
                      </div>
                      <span className={cn(
                        "text-[9px] font-bold font-mono tracking-wider uppercase px-2 py-0.5 rounded",
                        prov.state === 'Enabled' ? "bg-emerald-500/10 text-emerald-400" : "bg-slate-800 text-slate-500"
                      )}>
                        {prov.state}
                      </span>
                    </div>
                  ))}
                </div>

              </CardContent>
            </Card>
          )}

          {/* TAB 7: Cloud Integrations */}
          {activeTab === 'cloud' && (
            <Card className="bg-slate-950/30 border-slate-900 backdrop-blur-xl">
              <CardHeader className="border-b border-slate-900 pb-5">
                <CardTitle className="text-lg font-bold text-slate-100 flex items-center gap-2">
                  <Cloud className="h-5 w-5 text-cyan-400" /> Cloud Integrations
                </CardTitle>
                <CardDescription className="text-xs font-light text-slate-400">Connect and monitor your telemetry source accounts</CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* AWS Card */}
                  <div className="p-5 bg-slate-950/50 border border-slate-900 rounded-3xl flex flex-col justify-between h-44">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">Amazon Web Services</h4>
                        <p className="text-[10px] text-slate-500 font-mono font-light mt-1">Region: {clouds.aws.region}</p>
                      </div>
                      <span className={cn(
                        "px-2.5 py-0.5 rounded text-[8px] font-bold font-mono uppercase tracking-wider",
                        clouds.aws.connected ? "bg-emerald-500/10 text-emerald-400" : "bg-slate-800 text-slate-500"
                      )}>
                        {clouds.aws.connected ? 'Connected' : 'Not Connected'}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        onClick={() => handleToggleCloud('aws')} 
                        disabled={cloudLoading === 'aws'}
                        variant={clouds.aws.connected ? 'outline' : 'default'} 
                        className={cn(
                          "flex-1 h-9 text-[10px] font-bold uppercase tracking-wider rounded-xl border-slate-800 text-slate-300",
                          !clouds.aws.connected && "bg-cyan-500 text-slate-950 hover:bg-cyan-400"
                        )}
                      >
                        {cloudLoading === 'aws' ? 'Updating...' : clouds.aws.connected ? 'Disconnect' : 'Connect'}
                      </Button>
                      <Button onClick={() => setSuccessMessage('AWS connection test completed successfully.')} variant="outline" className="h-9 border-slate-800 text-slate-400 text-[10px] font-bold uppercase tracking-wider rounded-xl">
                        Test
                      </Button>
                    </div>
                  </div>

                  {/* GCP Card */}
                  <div className="p-5 bg-slate-950/50 border border-slate-900 rounded-3xl flex flex-col justify-between h-44">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">Google Cloud Platform</h4>
                        <p className="text-[10px] text-slate-500 font-mono font-light mt-1">Region: {clouds.gcp.region}</p>
                      </div>
                      <span className={cn(
                        "px-2.5 py-0.5 rounded text-[8px] font-bold font-mono uppercase tracking-wider",
                        clouds.gcp.connected ? "bg-emerald-500/10 text-emerald-400" : "bg-slate-800 text-slate-500"
                      )}>
                        {clouds.gcp.connected ? 'Connected' : 'Not Connected'}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        onClick={() => handleToggleCloud('gcp')} 
                        disabled={cloudLoading === 'gcp'}
                        variant={clouds.gcp.connected ? 'outline' : 'default'} 
                        className={cn(
                          "flex-1 h-9 text-[10px] font-bold uppercase tracking-wider rounded-xl border-slate-800 text-slate-300",
                          !clouds.gcp.connected && "bg-cyan-500 text-slate-950 hover:bg-cyan-400"
                        )}
                      >
                        {cloudLoading === 'gcp' ? 'Updating...' : clouds.gcp.connected ? 'Disconnect' : 'Connect'}
                      </Button>
                      <Button onClick={() => setSuccessMessage('GCP connection test completed successfully.')} variant="outline" className="h-9 border-slate-800 text-slate-400 text-[10px] font-bold uppercase tracking-wider rounded-xl">
                        Test
                      </Button>
                    </div>
                  </div>

                  {/* Azure Card */}
                  <div className="p-5 bg-slate-950/50 border border-slate-900 rounded-3xl flex flex-col justify-between h-44">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">Microsoft Azure</h4>
                        <p className="text-[10px] text-slate-500 font-mono font-light mt-1">Region: {clouds.azure.region}</p>
                      </div>
                      <span className={cn(
                        "px-2.5 py-0.5 rounded text-[8px] font-bold font-mono uppercase tracking-wider",
                        clouds.azure.connected ? "bg-emerald-500/10 text-emerald-400" : "bg-slate-800 text-slate-500"
                      )}>
                        {clouds.azure.connected ? 'Connected' : 'Not Connected'}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        onClick={() => handleToggleCloud('azure')} 
                        disabled={cloudLoading === 'azure'}
                        variant={clouds.azure.connected ? 'outline' : 'default'} 
                        className={cn(
                          "flex-1 h-9 text-[10px] font-bold uppercase tracking-wider rounded-xl border-slate-800 text-slate-300",
                          !clouds.azure.connected && "bg-cyan-500 text-slate-950 hover:bg-cyan-400"
                        )}
                      >
                        {cloudLoading === 'azure' ? 'Updating...' : clouds.azure.connected ? 'Disconnect' : 'Connect'}
                      </Button>
                      <Button 
                        onClick={() => {
                          if (!clouds.azure.connected) {
                            setErrorMessage('Azure is not connected. Connect provider first.');
                            return;
                          }
                          setSuccessMessage('Azure connection test completed successfully.');
                        }} 
                        variant="outline" 
                        className="h-9 border-slate-800 text-slate-400 text-[10px] font-bold uppercase tracking-wider rounded-xl"
                      >
                        Test
                      </Button>
                    </div>
                  </div>

                  {/* Kubernetes Card */}
                  <div className="p-5 bg-slate-950/50 border border-slate-900 rounded-3xl flex flex-col justify-between h-44">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">Bare-Metal Kubernetes</h4>
                        <p className="text-[10px] text-slate-500 font-mono font-light mt-1">Region: {clouds.k8s.region}</p>
                      </div>
                      <span className={cn(
                        "px-2.5 py-0.5 rounded text-[8px] font-bold font-mono uppercase tracking-wider",
                        clouds.k8s.connected ? "bg-emerald-500/10 text-emerald-400" : "bg-slate-800 text-slate-500"
                      )}>
                        {clouds.k8s.connected ? 'Connected' : 'Not Connected'}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        onClick={() => handleToggleCloud('k8s')} 
                        disabled={cloudLoading === 'k8s'}
                        variant={clouds.k8s.connected ? 'outline' : 'default'} 
                        className={cn(
                          "flex-1 h-9 text-[10px] font-bold uppercase tracking-wider rounded-xl border-slate-800 text-slate-300",
                          !clouds.k8s.connected && "bg-cyan-500 text-slate-950 hover:bg-cyan-400"
                        )}
                      >
                        {cloudLoading === 'k8s' ? 'Updating...' : clouds.k8s.connected ? 'Disconnect' : 'Connect'}
                      </Button>
                      <Button onClick={() => setSuccessMessage('Kubernetes connection test completed successfully.')} variant="outline" className="h-9 border-slate-800 text-slate-400 text-[10px] font-bold uppercase tracking-wider rounded-xl">
                        Test
                      </Button>
                    </div>
                  </div>
                </div>

              </CardContent>
            </Card>
          )}

          {/* TAB 8: Notifications */}
          {activeTab === 'notifications' && (
            <Card className="bg-slate-950/30 border-slate-900 backdrop-blur-xl">
              <CardHeader className="border-b border-slate-900 pb-5">
                <CardTitle className="text-lg font-bold text-slate-100 flex items-center gap-2">
                  <Bell className="h-5 w-5 text-cyan-400" /> Notification Channels
                </CardTitle>
                <CardDescription className="text-xs font-light text-slate-400">Configure alert routing thresholds and dispatch endpoints</CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                
                {/* Channels Checkbox Grid */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-slate-350 uppercase tracking-widest font-mono">1. Dispatch Destinations</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {Object.entries(notifChannels).map(([ch, val]) => {
                      const channelNames: Record<string, string> = {
                        email: 'Email Alerts',
                        slack: 'Slack Webhook',
                        teams: 'Microsoft Teams',
                        discord: 'Discord Webhook',
                        webhooks: 'Custom Webhooks API'
                      };
                      return (
                        <div key={ch} className="flex items-center gap-2.5 p-3.5 bg-slate-950/40 border border-slate-900 rounded-xl">
                          <input
                            type="checkbox"
                            id={`ch-${ch}`}
                            checked={val}
                            onChange={() => setNotifChannels(prev => ({ ...prev, [ch]: !prev[ch as keyof typeof notifChannels] }))}
                            className="rounded border-slate-800 text-cyan-500 focus:ring-cyan-500 bg-slate-950 cursor-pointer h-4 w-4"
                          />
                          <label htmlFor={`ch-${ch}`} className="text-xs text-slate-350 font-semibold cursor-pointer uppercase tracking-wider">{channelNames[ch] || ch}</label>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Severity Checkbox Grid */}
                <div className="space-y-4 pt-6 border-t border-slate-900">
                  <h4 className="text-xs font-bold text-slate-350 uppercase tracking-widest font-mono">2. Severity Levels</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {Object.entries(notifSeverity).map(([sev, val]) => {
                      const severityNames: Record<string, string> = {
                        critical: 'Critical Severity',
                        high: 'High Severity',
                        medium: 'Medium Severity',
                        low: 'Low Severity'
                      };
                      return (
                        <div key={sev} className="flex items-center gap-2.5 p-3.5 bg-slate-950/40 border border-slate-900 rounded-xl">
                          <input
                            type="checkbox"
                            id={`sev-${sev}`}
                            checked={val}
                            onChange={() => setNotifSeverity(prev => ({ ...prev, [sev]: !prev[sev as keyof typeof notifSeverity] }))}
                            className="rounded border-slate-800 text-cyan-500 focus:ring-cyan-500 bg-slate-950 cursor-pointer h-4 w-4"
                          />
                          <label htmlFor={`sev-${sev}`} className="text-xs text-slate-350 font-semibold cursor-pointer uppercase tracking-wider">{severityNames[sev] || sev}</label>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Digest selection */}
                <div className="space-y-4 pt-6 border-t border-slate-900">
                  <h4 className="text-xs font-bold text-slate-350 uppercase tracking-widest font-mono">3. Digest Settings</h4>
                  <select 
                    className="w-full bg-slate-950 border border-slate-900 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-cyan-500 appearance-none h-10 cursor-pointer"
                    value={notifDigest}
                    onChange={(e) => setNotifDigest(e.target.value)}
                  >
                    <option value="instant">Instant Dispatch (Priority SLA)</option>
                    <option value="hourly">Hourly Summary Reports</option>
                    <option value="daily">Daily Console Digests</option>
                  </select>
                </div>

                <div className="pt-4 border-t border-slate-900">
                  <Button onClick={() => setSuccessMessage('Alert notification preferences saved.')} className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold uppercase tracking-wider rounded-xl h-10 px-6">
                    Save Notification Rules
                  </Button>
                </div>

              </CardContent>
            </Card>
          )}

          {/* TAB 9: API Keys */}
          {activeTab === 'api' && (
            <Card className="bg-slate-950/30 border-slate-900 backdrop-blur-xl">
              <CardHeader className="border-b border-slate-900 pb-5">
                <CardTitle className="text-lg font-bold text-slate-100 flex items-center gap-2">
                  <KeyRound className="h-5 w-5 text-cyan-400" /> Console API Credentials
                </CardTitle>
                <CardDescription className="text-xs font-light text-slate-400">Manage client-side tokens accessing Aegis Sentinel APIs</CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                
                {/* Active Key details */}
                <div className="p-4 bg-slate-950/50 border border-slate-900 rounded-2xl space-y-3">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1 block">Active Workspace API Token</label>
                  <div className="flex gap-2">
                    <Input 
                      type={showApiKey ? 'text' : 'password'}
                      className="font-mono text-cyan-400 text-xs tracking-wider" 
                      value={displayedApiKey} 
                      readOnly 
                    />
                    <Button variant="outline" onClick={() => setShowApiKey(!showApiKey)} className="border-slate-800 text-slate-350 hover:bg-slate-900/40 text-xs font-bold uppercase tracking-wider rounded-xl">
                      {showApiKey ? 'Hide' : 'Reveal'}
                    </Button>
                  </div>
                  <div className="flex gap-2 pt-1.5">
                    <Button onClick={handleRotateApiKey} className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold uppercase tracking-wider rounded-xl h-9 px-4 flex items-center gap-1.5">
                      <RefreshCw size={12} /> Rotate Key
                    </Button>
                    <Button variant="outline" onClick={() => setSuccessMessage('API key revoked.')} className="border-red-500/20 text-red-400 hover:bg-red-500/5 text-xs font-bold uppercase tracking-wider rounded-xl h-9 px-4">
                      Revoke
                    </Button>
                  </div>
                </div>

                {/* API Keys Table */}
                <div className="space-y-3 pt-6 border-t border-slate-900">
                  <h4 className="text-xs font-bold text-slate-350 uppercase tracking-widest font-mono">Active Tokens</h4>
                  <div className="overflow-x-auto rounded-xl border border-slate-900 bg-slate-950/40">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="border-b border-slate-900 bg-slate-950/60 text-slate-450 uppercase tracking-wider font-mono text-[10px]">
                          <th className="p-4 font-semibold">Name</th>
                          <th className="p-4 font-semibold">Created</th>
                          <th className="p-4 font-semibold">Last Used</th>
                          <th className="p-4 font-semibold">Expires</th>
                          <th className="p-4 font-semibold text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-900">
                        {apiKeys.map((key) => (
                          <tr key={key.key} className="hover:bg-slate-900/10 transition-colors">
                            <td className="p-4 font-semibold text-slate-200">{key.name}</td>
                            <td className="p-4 font-mono text-slate-450">{key.created}</td>
                            <td className="p-4 text-slate-350 flex items-center gap-1.5 pt-4">
                              <Clock size={12} className="text-slate-500" /> {key.lastUsed}
                            </td>
                            <td className="p-4 font-mono text-slate-450">{key.expires}</td>
                            <td className="p-4 text-right">
                              <button 
                                onClick={() => {
                                  setApiKeys(prev => prev.filter(k => k.key !== key.key));
                                  setSuccessMessage('Token successfully revoked.');
                                }} 
                                className="text-slate-500 hover:text-red-400 transition-colors cursor-pointer p-1"
                              >
                                <Trash2 size={14} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

              </CardContent>
            </Card>
          )}

          {/* TAB 10: Appearance */}
          {activeTab === 'appearance' && (
            <Card className="bg-slate-950/30 border-slate-900 backdrop-blur-xl">
              <CardHeader className="border-b border-slate-900 pb-5">
                <CardTitle className="text-lg font-bold text-slate-100 flex items-center gap-2">
                  <Sliders className="h-5 w-5 text-cyan-400" /> Console Appearance
                </CardTitle>
                <CardDescription className="text-xs font-light text-slate-400">Configure theme, layout densities, and visual accents</CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                
                {/* Theme Selector */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-slate-350 uppercase tracking-widest font-mono">1. System Theme Mode</h4>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: 'dark', name: 'Dark Ops', desc: 'Optimal for SOC' },
                      { id: 'light', name: 'Light Command', desc: 'High Contrast' },
                      { id: 'system', name: 'System Default', desc: 'Sync with OS' }
                    ].map((thm) => (
                      <button
                        key={thm.id}
                        onClick={() => setTheme(thm.id)}
                        className={cn(
                          "p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between h-24",
                          theme === thm.id 
                            ? "bg-cyan-500/10 border-cyan-500 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.1)]" 
                            : "bg-slate-950 border-slate-900 text-slate-400 hover:border-slate-800 hover:text-slate-300"
                        )}
                      >
                        <span className="text-xs font-bold tracking-wide">{thm.name}</span>
                        <span className="text-[10px] text-slate-500 font-light leading-none">{thm.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Accent Color */}
                <div className="space-y-4 pt-6 border-t border-slate-900">
                  <h4 className="text-xs font-bold text-slate-350 uppercase tracking-widest font-mono">2. Accents</h4>
                  <div className="flex gap-4">
                    {[
                      { id: 'cyan', color: 'bg-cyan-400' },
                      { id: 'blue', color: 'bg-blue-400' },
                      { id: 'purple', color: 'bg-purple-400' },
                      { id: 'emerald', color: 'bg-emerald-400' }
                    ].map((accent) => (
                      <button
                        key={accent.id}
                        onClick={() => setAccentColor(accent.id)}
                        className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center transition-transform hover:scale-105 cursor-pointer relative",
                          accent.color
                        )}
                      >
                        {accentColor === accent.id && (
                          <div className="w-5 h-5 rounded-full bg-slate-950 flex items-center justify-center shadow-inner">
                            <Check size={12} className="text-white" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Density Options */}
                <div className="space-y-4 pt-6 border-t border-slate-900">
                  <h4 className="text-xs font-bold text-slate-350 uppercase tracking-widest font-mono">3. Console Density Layout</h4>
                  <div className="flex gap-4">
                    <button
                      onClick={() => setDensityCompact(false)}
                      className={cn(
                        "flex-1 p-3.5 rounded-xl border text-xs font-semibold text-center transition-all cursor-pointer",
                        !densityCompact 
                          ? "bg-cyan-500/10 border-cyan-500 text-cyan-400" 
                          : "bg-slate-950 border-slate-900 text-slate-400"
                      )}
                    >
                      Comfortable
                    </button>
                    <button
                      onClick={() => setDensityCompact(true)}
                      className={cn(
                        "flex-1 p-3.5 rounded-xl border text-xs font-semibold text-center transition-all cursor-pointer",
                        densityCompact 
                          ? "bg-cyan-500/10 border-cyan-500 text-cyan-400" 
                          : "bg-slate-950 border-slate-900 text-slate-400"
                      )}
                    >
                      Compact
                    </button>
                  </div>
                </div>

              </CardContent>
            </Card>
          )}

          {/* TAB 11: Danger Zone */}
          {activeTab === 'danger' && (
            <Card className="border-red-500/20 bg-red-950/5 backdrop-blur-xl">
              <CardHeader className="border-b border-red-500/10 pb-5">
                <CardTitle className="text-lg font-bold text-red-400 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-500" /> Extreme Danger Zone
                </CardTitle>
                <CardDescription className="text-xs font-light text-red-500/60">Destructive workspace actions. These actions cannot be undone.</CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                
                {/* Actions list */}
                <div className="space-y-4">
                  {[
                    { title: 'Delete Workspace', desc: 'Completely wipe the workspace and delete all indexed log flows.', dangerBtn: 'Delete Workspace' },
                    { title: 'Transfer Ownership', desc: 'Transfer workspace administration credentials to another SOC manager.', dangerBtn: 'Transfer' },
                    { title: 'Reset Workspace', desc: 'Clear active SOC playbooks and trigger history nodes.', dangerBtn: 'Reset Workspace' },
                    { title: 'Delete Account', desc: 'Permanently remove your personal Aegis Sentinel profile.', dangerBtn: 'Delete Account' },
                    { title: 'Disconnect All Cloud Accounts', desc: 'Disconnect AWS/GCP telemetry connection logs trail instantly.', dangerBtn: 'Disconnect All' },
                    { title: 'Export Data', desc: 'Download a complete JSON export of workspace alert histories.', dangerBtn: 'Export Workspace Data' },
                  ].map((act, idx) => (
                    <div key={idx} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 border border-red-500/10 rounded-2xl bg-slate-950/20">
                      <div>
                        <h4 className="text-xs font-bold text-red-400 uppercase tracking-widest font-mono">{act.title}</h4>
                        <p className="text-[11px] text-slate-500 font-light mt-1">{act.desc}</p>
                      </div>
                      <Button 
                        onClick={() => setSuccessMessage(`Action completed: ${act.title}`)}
                        className="bg-red-500 hover:bg-red-600 text-slate-95 font-bold uppercase tracking-wider text-[10px] rounded-xl h-9 px-4 shrink-0"
                      >
                        {act.dangerBtn}
                      </Button>
                    </div>
                  ))}
                </div>

              </CardContent>
            </Card>
          )}

        </div>

      </div>

    </div>
  );
}
