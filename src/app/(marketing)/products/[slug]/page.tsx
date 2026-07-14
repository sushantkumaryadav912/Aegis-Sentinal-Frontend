'use client';

import React, { use, useState } from 'react';
import { SectionWrapper } from '@/components/marketing/SectionWrapper';
import { AnimatedContainer } from '@/components/marketing/AnimatedContainer';
import { BentoCard } from '@/components/marketing/BentoGrid';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ArrowLeft, 
  BrainCircuit, 
  Eye, 
  GitBranch, 
  Terminal, 
  Search, 
  Sparkles, 
  LayoutDashboard, 
  FolderLock, 
  Network, 
  Settings, 
  Cpu, 
  Globe, 
  Lock, 
  Play, 
  CheckCircle,
  FileText
} from 'lucide-react';

interface ProductData {
  name: string;
  subtitle: string;
  tagline: string;
  icon: React.ReactNode;
  desc: string;
  features: string[];
  techSpecs: Record<string, string>;
  bgGlow: string;
}

const productsInfo: Record<string, ProductData> = {
  'sentinel-core': {
    name: "Sentinel Core",
    subtitle: "Detection Engine",
    tagline: "Cloud Defense Beyond Signatures.",
    icon: <BrainCircuit className="h-10 w-10 text-cyan-400" />,
    desc: "Uses stateful Isolation Forests to identify raw AWS, GCP, and Kubernetes console logins, privilege changes, and exfiltration patterns without signature rules.",
    features: [
      "Multi-dimensional anomaly detection",
      "Isolation Forest clustering algorithms",
      "IAM privilege escalation warning",
      "High-throughput raw event mapping",
      "Zero-day credential abuse defense"
    ],
    techSpecs: {
      "Model Type": "Isolation Forest (IForest)",
      "Log Sources": "AWS CloudTrail, GCP Admin, K8s Audit",
      "Latency": "Real-time (<1.2s analysis window)",
      "Confidence Scores": "Stateful dynamic classification"
    },
    bgGlow: "rgba(6, 182, 212, 0.05)"
  },
  'watchtower': {
    name: "Watchtower",
    subtitle: "Threat Intelligence",
    tagline: "See More. Respond Faster.",
    icon: <Eye className="h-10 w-10 text-red-400" />,
    desc: "Synchronizes threat databases, active CVE alerts, and blacklisted IP hosts with your ingress pipelines to prevent attacks before they breach your assets.",
    features: [
      "AlienVault OTX feed integration",
      "Real-time IP reputation checks",
      "MITRE ATT&CK framework mapping",
      "Active cloud honeypot streams",
      "CVE indicator monitoring"
    ],
    techSpecs: {
      "Feed Sync Rate": "Every 60 seconds",
      "Indicators Cached": "Over 2.4 Million active IoCs",
      "GeoIP Mapping": "Built-in MaxMind DB correlation",
      "API Ingestion": "HTTPS REST endpoints"
    },
    bgGlow: "rgba(239, 68, 68, 0.05)"
  },
  'forge': {
    name: "Forge",
    subtitle: "SOAR Automation",
    tagline: "From Telemetry to Containment.",
    icon: <GitBranch className="h-10 w-10 text-rose-400" />,
    desc: "Runs logic-based playbooks to quarantine instances, revoke credentials, and block anomalous networks automatically at machine speeds.",
    features: [
      "Logic-based visual containment workflows",
      "One-click AWS IAM credentials revocation",
      "EC2 VPC subnet isolation playbooks",
      "Webhook and Slack dispatch triggers",
      "Incident containment SLA dashboard"
    ],
    techSpecs: {
      "Trigger Latency": "<300ms from alert validation",
      "API Hooks": "AWS Lambda, GCP Cloud Run, Webhooks",
      "Format": "YAML/JSON playbook configurations",
      "Audit Trail": "Immutable Forge history records"
    },
    bgGlow: "rgba(244, 63, 94, 0.05)"
  },
  'pulse': {
    name: "Pulse",
    subtitle: "Monitoring & Telemetry",
    tagline: "Behavior-Driven Cloud Security.",
    icon: <Terminal className="h-10 w-10 text-purple-400" />,
    desc: "High-throughput log collector indexing millions of logs per second to provide sub-second hot query times for active security operations teams.",
    features: [
      "High-velocity hot query log stream",
      "Structured SQL-like search syntax",
      "Real-time chart metric telemetry",
      "Automatic index retention settings",
      "Cloud agentless log shipping"
    ],
    techSpecs: {
      "Ingestion Capacity": "Up to 500,000 EPS per cluster",
      "Query Speeds": "Sub-200ms across 10M log records",
      "Hot Storage": "90-day active hot log index",
      "Compression": "Adaptive schema-less storage format"
    },
    bgGlow: "rgba(168, 85, 247, 0.05)"
  },
  'prism': {
    name: "Prism",
    subtitle: "Investigation",
    tagline: "Intelligent Detection. Instant Response.",
    icon: <Search className="h-10 w-10 text-blue-400" />,
    desc: "Forensic visualizer mapping structural connection trees between compromised IAM roles, source IPs, targets, and chronological event timelines.",
    features: [
      "Interactive SVG connection graphs",
      "Node-based threat trail mapping",
      "Timeline event trace analyzer",
      "Evidence case documentation attachment",
      "Impact analysis visual overlays"
    ],
    techSpecs: {
      "Render Engine": "Framer Motion SVG layouts",
      "Correlation Depth": "Up to 6 hops of user activities",
      "Logs Linkage": "Automatic UUID trace tracking",
      "Export formats": "SVG Graph, JSON forensic reports"
    },
    bgGlow: "rgba(59, 130, 246, 0.05)"
  },
  'oracle': {
    name: "Oracle",
    subtitle: "AI Copilot",
    tagline: "Where AI Meets Cloud Security.",
    icon: <Sparkles className="h-10 w-10 text-cyan-400" />,
    desc: "AI assistant responding to operations queries, summarizing cloud alerts, suggesting Terraform remediations, and writing Forge playbook scripts.",
    features: [
      "Alert summarization & analysis",
      "Playbook generation from natural language",
      "Terraform remediation script builder",
      "Interactive command chat interface",
      "Multi-cloud security compliance suggestions"
    ],
    techSpecs: {
      "LLM Model": "Aegis Security LLM v1.2",
      "Context Window": "128,000 tokens",
      "Inference Speed": "~1.2 seconds response latency",
      "Integration": "Direct Sentinel telemetry linkage"
    },
    bgGlow: "rgba(6, 182, 212, 0.05)"
  },
  'atlas': {
    name: "Atlas",
    subtitle: "Executive Dashboard",
    tagline: "Executive Cloud Security Overview",
    icon: <LayoutDashboard className="h-10 w-10 text-emerald-400" />,
    desc: "Single pane of glass summarizing multi-cloud posture, active vulnerabilities, threat mitigation stats, and overall organizational risk distribution.",
    features: [
      "Unified multi-cloud threat widgets",
      "Global compliance index charts",
      "Incident count metrics telemetry",
      "Risk distribution bar progress gauges",
      "Executive report generator"
    ],
    techSpecs: {
      "Update Rate": "Real-time SSE pipelines",
      "Supported Clouds": "AWS, GCP, Azure, K8s Grids",
      "Frameworks": "SOC2, ISO 27001, CIS Benchmarks",
      "Data Feeds": "Aggregated Sentinel telemetry metrics"
    },
    bgGlow: "rgba(16, 185, 129, 0.05)"
  },
  'vault': {
    name: "Vault",
    subtitle: "Case Management",
    tagline: "Audit-Ready Forensic Records",
    icon: <FolderLock className="h-10 w-10 text-amber-400" />,
    desc: "Auditable case filing board aggregating multiple alerts into unified incident tickets, documenting assignees, tasks, and historical records.",
    features: [
      "Kanban incident board workflow state",
      "Evidence logging file repositories",
      "Task delegation checklist progress",
      "Immutable operations audit logs",
      "Post-incident review documents"
    ],
    techSpecs: {
      "Compliance": "SOC2 Audit-ready logging rules",
      "Database": "Encrypted case metadata registry",
      "Access Control": "RBAC user permission limits",
      "Encryption": "AES-256 for case attachments"
    },
    bgGlow: "rgba(245, 158, 11, 0.05)"
  },
  'nexus': {
    name: "Nexus",
    subtitle: "Integrations",
    tagline: "Unified Cloud Connection Ecosystem",
    icon: <Network className="h-10 w-10 text-indigo-400" />,
    desc: "Central connector mapping incoming logs and outgoing notifications to AWS, GCP, Slack, JIRA, and PagerDuty in a single dashboard.",
    features: [
      "One-click OAuth service connections",
      "Incoming cloud log subscription setup",
      "Outgoing alert notifier channels",
      "Service heartbeat telemetry diagnostics",
      "Credentials key manager"
    ],
    techSpecs: {
      "OAuth Version": "OAuth 2.0 with PKCE",
      "Log Collectors": "AWS Kinesis, GCP PubSub, Webhooks",
      "Reliability": "99.99% connector uptime",
      "Encryption": "KMS-backed credential secrets"
    },
    bgGlow: "rgba(99, 102, 241, 0.05)"
  },
  'command': {
    name: "Command",
    subtitle: "Administration",
    tagline: "Global Policy and Access Control",
    icon: <Settings className="h-10 w-10 text-slate-400" />,
    desc: "Global administrator portal managing workspace permissions, log archive retention limits, API authentication keys, and user access policies.",
    features: [
      "Granular RBAC analyst permission configurations",
      "Log archive retention limit thresholds",
      "API authentication token management",
      "KMS encryption key selection controls",
      "Corporate authentication configuration"
    ],
    techSpecs: {
      "Access Engine": "Policy-based Access Control (PBAC)",
      "MFA Enforcements": "TOTP, WebAuthn keys supported",
      "Auditing": "Global actions record mapping",
      "Encryption": "Key Rotation policies"
    },
    bgGlow: "rgba(148, 163, 184, 0.05)"
  }
};

interface DetailPageProps {
  params: Promise<{ slug: string }>;
}

export default function ProductDetailPage({ params }: DetailPageProps) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  const product = productsInfo[slug];

  const [interactiveState, setInteractiveState] = useState<string>('idle');
  const [logsInput, setLogsInput] = useState<string>('SELECT * FROM telemetry WHERE severity = "HIGH"');

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center p-8 bg-slate-950">
        <h1 className="text-2xl font-bold text-slate-100">Product Not Found</h1>
        <p className="text-slate-400 mt-2">The module you requested does not exist or has been relocated.</p>
        <Link href="/products" className="mt-6">
          <Button variant="outline">Back to Products</Button>
        </Link>
      </div>
    );
  }

  // Render a specific mockup widget based on the product slug
  const renderProductMockup = () => {
    switch (slug) {
      case 'sentinel-core':
        return (
          <div className="bg-slate-950 border border-slate-900 rounded-2xl p-5 space-y-4 font-mono text-left shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-900 pb-2.5">
              <span className="text-[10px] font-bold text-cyan-400 tracking-wider">Stateful Isolation Forest Simulator</span>
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse"></span>
            </div>
            <div className="text-[11px] space-y-1.5 text-slate-400">
              <div>$ aegis-sentinel --scan --source=AWSCloudTrail</div>
              <div>[+] Parsing raw logs: 1,480 events...</div>
              <div>[+] Running Isolation Forest anomaly isolation...</div>
              {interactiveState === 'scanned' ? (
                <div className="text-red-400 animate-pulse">
                  [!] ALERT: High anomaly confidence score detected on event ID: console-login-f42 (Score: 0.89)
                  <br />Reason: ConsoleLogin without MFA from St. Petersburg IP (Proxy subnet).
                </div>
              ) : (
                <div className="text-slate-500">// Click Run Scan below to initiate clustering analysis</div>
              )}
            </div>
            <Button 
              onClick={() => setInteractiveState('scanned')}
              className="w-full h-9 bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold rounded-xl cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Play size={12} /> Run Anomaly Scan
            </Button>
          </div>
        );
      case 'watchtower':
        return (
          <div className="bg-slate-950 border border-slate-900 rounded-2xl p-5 space-y-4 text-left shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-900 pb-2.5">
              <span className="text-[10px] font-bold text-red-400 font-mono tracking-wider">IoC Reputation Lookup</span>
              <span className="w-2.5 h-2.5 rounded-full bg-red-400 animate-pulse"></span>
            </div>
            <div className="space-y-3">
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value="198.51.100.42" 
                  readOnly 
                  className="flex-1 bg-slate-900/60 border border-slate-800 text-xs p-2 rounded-lg font-mono text-slate-300"
                />
                <Button 
                  onClick={() => setInteractiveState('reputation')}
                  className="bg-red-500 hover:bg-red-400 text-slate-950 text-xs font-bold px-4 rounded-lg cursor-pointer"
                >
                  Verify
                </Button>
              </div>
              {interactiveState === 'reputation' && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-xs space-y-1 font-mono text-red-400 animate-fade-in">
                  <div>Status: MALICIOUS</div>
                  <div>Category: Tor Exit Node / SSH Brute-Force Bot</div>
                  <div>Recommended: Deny Ingress traffic in Security Groups.</div>
                </div>
              )}
            </div>
          </div>
        );
      case 'forge':
        return (
          <div className="bg-slate-950 border border-slate-900 rounded-2xl p-5 space-y-4 text-left shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-900 pb-2.5">
              <span className="text-[10px] font-bold text-rose-400 font-mono tracking-wider">AWS Anomaly Containment Playbook</span>
              <span className="w-2.5 h-2.5 rounded-full bg-rose-400"></span>
            </div>
            <div className="space-y-3 text-[11px] font-mono text-slate-400">
              <div className="flex items-center gap-2 text-rose-400 font-bold">
                <span>[Trigger]</span> <span>Confidence &gt; 0.85</span>
              </div>
              <div className="pl-4 border-l border-slate-900 py-1 space-y-2">
                <div className="flex items-center gap-2 text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                  <span>1. Revoke IAM Credentials session</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                  <span>2. Quarantining Source EC2 instance</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                  <span>3. Dispatch Slack notification card</span>
                </div>
              </div>
              {interactiveState === 'playbook' ? (
                <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-400 text-center font-bold flex items-center justify-center gap-1.5 animate-pulse">
                  <CheckCircle size={14} /> PLAYBOOK EXECUTED SUCCESSFUL
                </div>
              ) : (
                <Button 
                  onClick={() => setInteractiveState('playbook')}
                  className="w-full h-8 bg-rose-500 hover:bg-rose-400 text-slate-950 font-bold rounded-lg cursor-pointer text-xs uppercase"
                >
                  Simulate Incident Playbook
                </Button>
              )}
            </div>
          </div>
        );
      case 'pulse':
        return (
          <div className="bg-slate-950 border border-slate-900 rounded-2xl p-5 space-y-4 text-left shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-900 pb-2.5">
              <span className="text-[10px] font-bold text-purple-400 font-mono tracking-wider">Pulse High-speed Query Console</span>
              <span className="w-2.5 h-2.5 rounded-full bg-purple-400 animate-pulse"></span>
            </div>
            <div className="space-y-3">
              <div className="relative">
                <input 
                  type="text" 
                  value={logsInput} 
                  onChange={(e) => setLogsInput(e.target.value)}
                  className="w-full bg-slate-900/60 border border-slate-800 text-xs p-2.5 rounded-lg font-mono text-slate-300 focus:outline-none focus:border-purple-500"
                />
              </div>
              <Button 
                onClick={() => setInteractiveState('query')}
                className="w-full h-8 bg-purple-500 hover:bg-purple-400 text-slate-950 text-xs font-bold rounded-lg cursor-pointer flex items-center justify-center gap-1"
              >
                Execute Query
              </Button>
              {interactiveState === 'query' && (
                <div className="p-3 bg-slate-900/60 border border-slate-900 rounded-lg max-h-[120px] overflow-y-auto font-mono text-[10px] text-slate-300 space-y-2 animate-fade-in">
                  <div>[18:42:01] AWS: ConsoleLogin anomaly from 198.51.100.42</div>
                  <div>[18:41:40] GCP: RolePermission modified for user-service</div>
                  <div>[18:40:15] K8s: Pod privileged escalation alert in namespace: prod</div>
                </div>
              )}
            </div>
          </div>
        );
      default:
        return (
          <div className="bg-slate-950 border border-slate-900 rounded-2xl p-8 text-center space-y-4 shadow-2xl">
            <Cpu className="h-10 w-10 text-cyan-400 mx-auto animate-pulse" />
            <div>
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-widest">Interactive Sandbox</h4>
              <p className="text-[11px] text-slate-500 font-light mt-1.5 leading-relaxed">
                Connect this component to your live Aegis Sentinel dashboard instance to monitor operations telemetry.
              </p>
            </div>
            <Link href="/register">
              <Button variant="outline" className="h-9 text-xs tracking-wider uppercase font-bold border-slate-900 text-slate-300 hover:text-white rounded-lg cursor-pointer">
                Deploy module
              </Button>
            </Link>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col min-h-screen relative bg-grid-pattern">
      
      {/* Header Back Button */}
      <section className="relative pt-36 pb-8 overflow-hidden max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <Link href="/products" className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-cyan-400 transition-colors">
          <ArrowLeft size={14} /> Back to Product Suite
        </Link>
      </section>

      {/* Main product presentation */}
      <SectionWrapper className="pt-0 pb-16 max-w-5xl mx-auto px-4 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Col: Core Product details */}
          <AnimatedContainer animation="slide-in-left" className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-900 shadow-xl">
                {product.icon}
              </div>
              <div>
                <span className="text-xs font-bold text-cyan-400 tracking-widest uppercase font-mono">{product.subtitle}</span>
                <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-100 mt-1 tracking-tight">{product.name}</h1>
              </div>
            </div>

            <div className="text-base font-semibold text-slate-300 font-mono tracking-wide py-1 border-y border-slate-900/60 w-fit">
              {product.tagline}
            </div>

            <p className="text-sm text-slate-400 font-light leading-relaxed">
              {product.desc}
            </p>

            {/* Features Checklist */}
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-widest">Key Capabilities</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300 font-light">
                    <span className="w-5 h-5 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-[10px] text-cyan-400 font-bold shrink-0">✓</span>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Deployment CTA */}
            <div className="pt-4 flex gap-4">
              <Link href="/register">
                <Button variant="glow" className="h-11 px-8 text-xs tracking-wider uppercase font-bold text-slate-950 rounded-xl cursor-pointer">
                  Deploy {product.name}
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="h-11 px-6 text-xs tracking-wider uppercase font-bold border-slate-850 text-slate-350 hover:text-white rounded-xl cursor-pointer bg-transparent">
                  Consult Analyst
                </Button>
              </Link>
            </div>
          </AnimatedContainer>

          {/* Right Col: Interactive Mock Sandbox and Specs */}
          <AnimatedContainer animation="slide-in-right" className="space-y-6">
            {renderProductMockup()}

            {/* Technical Specifications */}
            <Card glass className="p-1">
              <CardHeader className="pb-2">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono">Module Configuration</span>
                <CardTitle className="text-xs font-bold text-slate-300 uppercase tracking-wider mt-0.5">Technical Specifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="divide-y divide-slate-900/60 text-xs font-light">
                  {Object.entries(product.techSpecs).map(([key, val]) => (
                    <div key={key} className="flex justify-between py-2.5 font-mono">
                      <span className="text-slate-500">{key}</span>
                      <span className="text-slate-355 text-slate-200 font-semibold text-right truncate max-w-[240px]">{val}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </AnimatedContainer>

        </div>
      </SectionWrapper>

    </div>
  );
}
