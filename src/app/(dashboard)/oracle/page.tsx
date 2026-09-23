'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  CornerDownLeft, 
  AlertCircle, 
  ShieldAlert, 
  ShieldCheck, 
  GitBranch, 
  Terminal, 
  Eye, 
  Search, 
  FolderLock, 
  Network, 
  CheckCircle2,
  Code,
  Lock,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

interface Message {
  id: number;
  role: 'assistant' | 'user';
  content: string;
  moduleTag?: string;
  alert?: {
    title: string;
    severity: string;
    time: string;
    category: string;
    id?: string;
  } | null;
  codeSnippet?: string;
}

const moduleCapabilities = [
  { module: 'Sentinel Core', desc: 'Queries 184 SIGMA rules & 32 Helios AI models (Detection, Correlation GNNs, LLM Investigation & Agent Runtimes)' },
  { module: 'Forge SOAR', desc: 'Executes 108+ OWASP Cloud Top 10 playbooks & generates Terraform / AWS CLI remediation code' },
  { module: 'Pulse Telemetry', desc: 'Inspects real-time event logs at 4,250 events/sec & CloudTrail API telemetry' },
  { module: 'Watchtower Intel', desc: 'Performs IoC reputation lookups, CVE exploit scans, AlienVault OTX & MITRE ATT&CK mapping' },
  { module: 'Prism Investigation', desc: 'Executes blast-radius attack graph queries & predicts lateral movement paths' },
  { module: 'Nexus Connectors', desc: 'Verifies active API integrations across 22 AWS, Azure, GCP & Okta cloud connectors' },
  { module: 'Vault Cases', desc: 'Tracks audit-ready incident cases (e.g. CASE-2026-081) and cryptographic evidence' },
];

export default function OraclePage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: 'assistant',
      moduleTag: 'ORACLE CORE ENGINE',
      content: `Hello! I am Oracle, your AI Security Copilot connected to all 7 Aegis Sentinel engines:

• **Sentinel Core**: 184 SIGMA Detection Rules & Helios AI Anomaly Models
• **Forge**: 108+ OWASP Cloud & API Top 10 Automated Remediation Playbooks
• **Pulse**: Live Telemetry Stream (4,250 events/sec) & CloudTrail API Logs
• **Watchtower**: Global IoC Database & MITRE ATT&CK v14 Threat Intel
• **Prism**: Attack Graph & Blast-Radius Prediction Engine
• **Nexus**: 22 Multi-Cloud Connectors (AWS, Azure, GCP, K8s, Okta)
• **Vault**: Audit-Ready Incident Case Management

Ask me about active alerts, threat IoCs, OWASP remediation scripts, or incident cases.`,
      alert: null
    },
    {
      id: 2,
      role: 'user',
      content: 'Summarize the active critical incident and show the Forge SOAR remediation playbook.'
    },
    {
      id: 3,
      role: 'assistant',
      moduleTag: 'SENTINEL CORE + FORGE SOAR',
      content: `I analyzed the active incident across **Sentinel Core**, **Pulse**, and **Forge**:

**1. Detection (Sentinel Core):**
Alert **ALT-2026-001**: *Unrestricted S3 Bucket Public Access Enabled* on resource \`prod-secrets-vault-01\`.
- **Trigger**: CloudTrail \`PutBucketPolicy\` API call granting wildcard \`s3:GetObject\` access.
- **Helios AI Model Score**: Isolation Forest anomaly score \`0.96\` (Confidence: 94%).
- **Pulse Telemetry**: Ingested from source IP \`198.51.100.42\` (Tor Exit Node identified by Watchtower).

**2. Automated Remediation Playbook (Forge - OWASP-CN-02):**
Executing Forge SOAR Playbook \`WF-2026-001\` adhering to **OWASP Cloud Top 10 CN-02** & CIS AWS Benchmark 2.1.1.`,
      alert: {
        id: 'ALT-2026-001',
        title: 'Unrestricted S3 Bucket Public Access Enabled',
        severity: 'CRITICAL',
        time: '15 mins ago',
        category: 'OWASP-CN-02 • Insecure Cloud Storage'
      },
      codeSnippet: `aws s3api put-public-access-block \\
  --bucket prod-secrets-vault-01 \\
  --public-access-block-configuration "BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true"`
    }
  ]);

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestionPills = [
    'Sentinel Core: Check Helios AI anomaly scores & SIGMA rules',
    'Forge: Show OWASP-CN-02 S3 remediation playbook & Terraform',
    'Pulse: Query live CloudTrail logs for IP 198.51.100.42',
    'Watchtower: IoC reputation scan for CVE-2026-2819',
    'Prism: Run blast-radius investigation on IAM role',
    'Vault: Summarize active incident CASE-2026-081',
    'Nexus: Check AWS, Azure & GCP connector health'
  ];

  const handleSend = (textToSend: string) => {
    if (!textToSend.trim()) return;

    const newUserMessage: Message = {
      id: Date.now(),
      role: 'user',
      content: textToSend
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInput('');
    setIsTyping(true);

    const randomDelay = Math.floor(Math.random() * 600) + 700;
    setTimeout(() => {
      const q = textToSend.toLowerCase();
      let responseContent = '';
      let moduleTag = 'SENTINEL ENGINE SYNTHESIS';
      let alertAttachment = null;
      let snippet = undefined;

      if (q.includes('routing') || q.includes('fusion') || q.includes('matrix') || q.includes('03:15') || q.includes('capability') || q.includes('shadow')) {
        moduleTag = 'HELIOS MODEL ROUTING & SCORE FUSION';
        responseContent = `**Helios AI/ML Model Routing & Fusion Engine Analysis:**
• **Routing Principle**: "Helios detects. Correlation connects. Prism predicts. Oracle investigates. Watchtower retrieves knowledge. Forge generates remediation."
• **Capability Resolution**: The Model Router evaluates event telemetry features (event_type, has_log_sequence, has_behavioral_context, numeric_feature_vector) against the registry (\`models.yaml\`).
• **Active Scenario Analysis (03:15 UTC Credential Anomaly)**:
  - Input: Authentication log + User behavior + Device info + S3 access telemetry.
  - Resolved Production Models:
    1. **DeepLog v2**: 0.82 (Ordered log sequence anomaly)
    2. **LogFormer**: 0.88 (Context-heavy log reasoning)
    3. **UEBA Behavioral**: 0.96 (Unusual 3 AM login & unknown device)
    4. **Isolation Forest v4**: 0.79 (Baseline numerical feature spike)
    5. **LogBERT v3**: 0.84 [SHADOW MODE - evaluated in background]
• **Calibrated Score Fusion Formula**:
  \`Final Risk = 0.20 × IF (0.79) + 0.30 × DeepLog (0.82) + 0.20 × LogFormer (0.88) + 0.30 × UEBA (0.96) = 0.89\`
• **Decision**: 0.89 / HIGH ALERT generated -> Dispatched to Oracle Agent Runtime for forensic triage -> Forge generates Terraform containment.`;
        alertAttachment = {
          id: 'ALT-2026-000',
          title: 'Anomalous 03:15 Credential Login & Mass File Access',
          severity: 'CRITICAL',
          time: '5 mins ago',
          category: 'Helios Model Fusion • Risk 0.89'
        };
      } else if (q.includes('watchtower') || q.includes('ioc') || q.includes('cve') || q.includes('intel') || q.includes('reputation') || q.includes('tor') || q.includes('198.51.100.42')) {
        moduleTag = 'WATCHTOWER THREAT INTEL (30+ IOCs)';
        responseContent = `**Watchtower Threat Intelligence Query:**
• **IoC Database Index**: 1.48M IoCs active | AlienVault OTX & CISA KEV synced
• **Target Indicator**: \`198.51.100.42\` (Score: 88/100 **MALICIOUS**)
  - *Threat Classification*: Known Tor Exit Node & Distributed Botnet C2 Node
  - *Action*: Ingress block rule injected into AWS Security Groups & Azure NSG.
• **CVE Vulnerability Intel**: \`CVE-2026-2819\` (Severity: **CRITICAL**)
  - *Vector*: AWS IAM Privilege Escalation exploit scan targeting AssumeRole API.
  - *MITRE ATT&CK Mapping*: T1078 (Valid Accounts), T1098 (Account Manipulation), T1190 (Exploit Public App)`;
      } else if (q.includes('vault') || q.includes('case') || q.includes('incident') || q.includes('audit') || q.includes('081')) {
        moduleTag = 'VAULT CASE MANAGEMENT (24 CASES)';
        responseContent = `**Vault Incident Case Management Summary:**
• **Active Case**: \`CASE-2026-081\` (*Data exfiltration attempt on S3 secret bucket*)
  - *Severity*: **CRITICAL** | *Status*: **INVESTIGATING**
  - *Assigned Lead*: Sushant Kumar (SecOps Lead)
  - *Correlated Alerts*: 4 alerts linked (\`ALT-2026-001\`, \`ALT-2026-002\`, \`ALT-2026-004\`)
  - *OWASP Alignment*: **OWASP-CN-02** (Insecure Cloud Storage)
  - *Cryptographic Evidence Digest*: \`0x8f9a2b4c5d6e7f1a3b5c8a901f2e3d4c5b6a7f8e9d0c\` (Audit-Locked)`;
      } else if (q.includes('pulse') || q.includes('log') || q.includes('telemetry') || q.includes('cloudtrail') || q.includes('52')) {
        moduleTag = 'PULSE TELEMETRY STREAM (52 LOGS)';
        responseContent = `**Pulse Telemetry Log Stream Query:**
• **Live Ingestion**: 4,250 events/sec | Real-Time Auto-Streaming Active
• **Total Ingested Log Dataset**: 52+ Correlated Telemetry Logs

**Sample Recent Ingested Telemetry Events:**
1. \`LOG-2026-901\`: \`PutBucketPolicy\` on \`arn:aws:s3:::prod-secrets-vault-01\` by \`devsecops-bot@corp\` (Risk Score: 96)
2. \`LOG-2026-902\`: \`AssumeRole\` without MFA on \`role/DevSecOpsRole\` by \`admin-console-user\` (Risk Score: 92)
3. \`LOG-2026-903\`: Container escape attempt \`SYS_ADMIN\` in \`kube-system/sec-runner-90a\` (Risk Score: 88)
4. \`LOG-2026-904\`: Bulk \`SELECT * INTO OUTFILE\` exfiltration of 54,200 PII records (Risk Score: 85)`;
      } else if (q.includes('forge') || q.includes('workflow') || q.includes('soar') || q.includes('playbook') || q.includes('owasp') || q.includes('terraform') || q.includes('remediation')) {
        moduleTag = 'FORGE SOAR AUTOMATION (108 PLAYBOOKS)';
        responseContent = `**Forge SOAR Engine (108 OWASP Playbooks Active):**
All 108+ Forge playbooks strictly enforce **OWASP Cloud Top 10 (CN-01 to CN-10)**, **OWASP API Top 10**, and **NIST SP 800-61** containment phases with a **98.4%** success rate.

*Active Remediation Playbook:* **OWASP-CN-02 (Insecure Cloud Storage Block)**
- **Target Alert**: \`ALT-2026-001\` | **Exec Speed**: 420 ms
- **Compliance Ref**: CIS-AWS-2.1.1 | NIST-800-53-AC-3 | PCI-DSS-3.4`;
        snippet = `aws s3api put-public-access-block \\
  --bucket prod-secrets-vault-01 \\
  --public-access-block-configuration "BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true"`;
      } else if (q.includes('sentinel') || q.includes('detection') || q.includes('helios') || q.includes('sigma') || q.includes('rule') || q.includes('catalogue')) {
        moduleTag = 'SENTINEL CORE & HELIOS MODELS CATALOGUE';
        responseContent = `**Sentinel Core Detection & Correlation Engine:**
• **Architectural Boundary**: Sentinel Core owns Detection & Rule Correlation (184 SIGMA rules); Helios owns AI Model Runtime execution across 8 security domains (\`configs/models.yaml\`).
• **Helios AI Models Catalogue (32 Active Models)**:
  - **Detection (Sentinel Core)**: Isolation Forest v4 (0.96), DeepLog v2 (0.92, confirmed), LogFormer v1 (0.96, confirmed), UEBA Behavioral (0.97, confirmed).
  - **Correlation GNNs**: Node2Vec, GraphSAGE, GCN, GAT, Temporal GNN, Graph Transformer.
  - **Investigation LLMs**: Qwen 3 4B, Qwen 3 32B, Llama 3.3 70B, Mistral Small 24B, Gemma 3 27B.
  - **Remediation Coders**: Qwen 2.5 Coder 32B, DeepSeek Coder V2.
  - **Embeddings & Rerankers**: BGE Large v1.5, E5 Large v2, Nomic Embed, BGE Reranker v2 m3.
  - **Oracle Agent Runtimes**: Deep Security Agent, Fast Triage Agent, Structured Tool Agent.`;
        alertAttachment = {
          id: 'ALT-2026-001',
          title: 'Unrestricted S3 Bucket Public Access Enabled',
          severity: 'CRITICAL',
          time: '15 mins ago',
          category: 'OWASP-CN-02 • Sentinel Core Alert'
        };
      } else if (q.includes('prism') || q.includes('investigation') || q.includes('blast') || q.includes('graph')) {
        moduleTag = 'PRISM INVESTIGATION ENGINE';
        responseContent = `**Prism Threat Investigation & Blast-Radius Query:**
• **Target Entity**: \`arn:aws:iam::123456789012:role/DevSecOpsRole\`
• **Attack Topology Graph**:
  - Node 1: Anomalous Console Login without MFA (\`203.0.113.88\`)
  - Node 2: AssumeRole call to \`DevSecOpsRole\` (Privilege Escalation)
  - Node 3: S3 Bucket Policy Alteration (\`prod-secrets-vault-01\`)
• **Blast Radius Impact**: 12 AWS Accounts, 2 S3 Buckets, 1 RDS Instance affected.
• **Predicted Lateral Movement Path**: AWS Secrets Manager read access within next 30 minutes.`;
      } else if (q.includes('nexus') || q.includes('connector') || q.includes('integration') || q.includes('aws') || q.includes('azure') || q.includes('gcp') || q.includes('okta')) {
        moduleTag = 'NEXUS INTEGRATIONS HUB';
        responseContent = `**Nexus Integration Connectors Status:**
• **AWS Infrastructure**: 12 Accounts connected via IAM Cross-Account Role (**ONLINE**)
• **Azure Subscriptions**: 4 Subscriptions connected via Service Principal (**ONLINE**)
• **GCP Projects**: 6 Projects connected via Service Account Keys (**ONLINE**)
• **Kubernetes Workloads**: 32 Clusters connected via Aegis DaemonSet Agent (**ONLINE**)
• **Identity Providers**: Okta SSO & Entra ID Connectors (**HEALTHY**)
• **Notification Services**: Slack SOAR Bot & PagerDuty Dispatcher (**ACTIVE**)`;
      } else {
        moduleTag = 'AEGIS SENTINEL SYNTHESIS';
        responseContent = `I cross-referenced your query with all 7 Aegis Sentinel engines:

• **Sentinel Core**: 184 SIGMA rules & Helios AI models active (Risk Score: **94/100**).
• **Forge SOAR**: 108 OWASP Cloud Top 10 playbooks active for automated containment.
• **Pulse**: 52+ telemetry logs streaming live at 4,250 events/sec.
• **Watchtower**: 1.48M IoCs & 30+ threat indicators synced (AlienVault OTX & MITRE ATT&CK v14).
• **Vault**: 24 cases tracked with SHA-256 cryptographic evidence lock.
• **Prism**: Attack topology graph ready for blast-radius prediction.
• **Nexus**: All 22 multi-cloud connectors reporting healthy status.`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: 'assistant',
          moduleTag,
          content: responseContent,
          alert: alertAttachment,
          codeSnippet: snippet
        }
      ]);
      setIsTyping(false);
    }, randomDelay);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <div className="flex flex-col h-[calc(100vh-130px)] space-y-4" data-testid="oracle-page">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-widest uppercase bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-mono">
            AI SECURITY COPILOT
          </span>
          <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-mono font-semibold">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" /> CONNECTED TO ALL 7 MODULES
          </span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-100 tracking-tight flex items-center gap-3">
          Oracle <Sparkles className="text-cyan-400 h-7 w-7" />
        </h1>
        <p className="text-sm text-slate-400 font-light mt-1">
          AI Copilot synthesizing Sentinel Core, Forge, Pulse, Watchtower, Prism, Nexus & Vault
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1 min-h-0">
        
        {/* Chat Area (3 Cols) */}
        <div className="lg:col-span-3 flex flex-col h-full bg-slate-950/40 border border-slate-900 rounded-2xl relative overflow-hidden backdrop-blur-md">
          {/* Suggestion Pills */}
          <div className="flex gap-2 p-3 overflow-x-auto border-b border-slate-900 bg-slate-950/60 scrollbar-none shrink-0">
            {suggestionPills.map((pill, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(pill)}
                className="px-3 py-1.5 rounded-xl border border-slate-900 hover:border-cyan-500/30 bg-slate-950 hover:bg-cyan-500/5 text-slate-400 hover:text-cyan-400 text-[10px] font-mono tracking-wider font-bold transition-all whitespace-nowrap cursor-pointer"
              >
                {pill}
              </button>
            ))}
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role !== 'user' && (
                  <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                    <Bot size={16} />
                  </div>
                )}
                
                <div className={`space-y-3 max-w-[85%] ${msg.role === 'user' ? 'order-1' : 'order-2'}`}>
                  {msg.moduleTag && msg.role !== 'user' && (
                    <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase bg-slate-900 text-cyan-400 border border-slate-800 inline-block">
                      {msg.moduleTag}
                    </span>
                  )}

                  <div
                    className={`rounded-2xl px-4 py-3 text-xs leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-cyan-500 text-slate-950 font-bold rounded-tr-none'
                        : 'bg-slate-900/60 border border-slate-900 text-slate-200 rounded-tl-none font-light'
                    }`}
                  >
                    <div className="whitespace-pre-line font-mono leading-relaxed">{msg.content}</div>
                  </div>

                  {/* Render Code Snippet if present */}
                  {msg.codeSnippet && (
                    <div className="space-y-1">
                      <div className="text-[10px] font-mono text-slate-500 uppercase font-bold flex items-center gap-1">
                        <Code size={12} className="text-cyan-400" /> Automated OWASP Remediation Payload
                      </div>
                      <pre className="bg-slate-950 border border-slate-900 p-3 rounded-xl font-mono text-[11px] text-cyan-300 overflow-x-auto whitespace-pre">
                        {msg.codeSnippet}
                      </pre>
                    </div>
                  )}

                  {/* Render Alert attachment if present */}
                  {msg.alert && (
                    <div className="border border-slate-900 bg-slate-950/80 p-3 rounded-xl flex gap-3 items-center">
                      <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 shrink-0">
                        <ShieldAlert size={16} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider font-mono">{msg.alert.category} • {msg.alert.time}</div>
                        <div className="text-xs font-bold text-slate-200 truncate">{msg.alert.title}</div>
                      </div>
                      {msg.alert.id && (
                        <Link 
                          href={`/alerts/${msg.alert.id}`} 
                          className="px-2.5 py-1 rounded text-[10px] font-mono font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 hover:bg-cyan-500/20 flex items-center gap-1"
                        >
                          View <ArrowRight size={10} />
                        </Link>
                      )}
                    </div>
                  )}
                </div>

                {msg.role === 'user' && (
                  <div className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 shrink-0 order-3">
                    <User size={16} />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-4 justify-start">
                <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                  <Bot size={16} />
                </div>
                <div className="bg-slate-900/60 border border-slate-900 rounded-2xl rounded-tl-none px-4 py-3 flex gap-1.5 items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                  <span className="text-[10px] font-mono text-slate-500 ml-2">Cross-referencing Aegis Sentinel engines...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Form input */}
          <div className="p-4 border-t border-slate-900 bg-slate-950/60 shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(input);
              }}
              className="flex gap-2 bg-slate-950 border border-slate-900 rounded-xl p-1.5"
            >
              <Input
                placeholder="Ask Oracle about Sentinel Core rules, Forge playbooks, Pulse logs, Watchtower IoCs, Prism graphs, Nexus or Vault..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 border-0 focus-visible:ring-0 bg-transparent text-slate-100 placeholder-slate-500 text-xs shadow-none"
              />
              <Button
                type="submit"
                size="icon"
                disabled={!input.trim()}
                className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-lg cursor-pointer h-8 w-8 shrink-0"
              >
                <Send size={14} />
              </Button>
            </form>
            <div className="flex items-center justify-between text-[9px] text-slate-600 mt-2 px-1">
              <span className="flex items-center gap-1"><CornerDownLeft size={10} /> Enter to submit query</span>
              <span>Oracle Security Copilot v2.4 • Multi-Engine Knowledge Base</span>
            </div>
          </div>
        </div>

        {/* Right Sidebar: AI Context Panel (1 Col) */}
        <div className="space-y-6 hidden lg:block">
          <Card glass className="p-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">Module Knowledge Synthesis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-xs text-slate-400 font-light leading-relaxed">
              <p className="text-[10px] text-slate-500 font-mono tracking-wide uppercase mb-1">Oracle queries live engines:</p>
              <div className="space-y-2.5 max-h-[320px] overflow-y-auto pr-1 scrollbar-thin">
                {moduleCapabilities.map((cap, idx) => (
                  <div key={idx} className="p-2 rounded-xl bg-slate-950/40 border border-slate-900 space-y-0.5">
                    <div className="text-[10px] font-bold text-cyan-400 font-mono">{cap.module}</div>
                    <div className="text-[10px] text-slate-400 font-light leading-snug">{cap.desc}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card glass className="p-1">
            <CardHeader>
              <CardTitle className="text-sm font-bold text-slate-300 uppercase tracking-wider">Oracle Agent Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Context Window</span>
                <span className="font-mono text-cyan-400 font-semibold">128k tokens</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Model Latency</span>
                <span className="font-mono text-slate-300 font-semibold">~1.2s</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Connected Modules</span>
                <span className="font-mono text-emerald-400 font-bold">7 / 7 ONLINE</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
