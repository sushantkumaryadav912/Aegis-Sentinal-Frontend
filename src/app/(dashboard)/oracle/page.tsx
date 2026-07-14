'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, Send, Bot, User, CornerDownLeft, AlertCircle, ShieldAlert, Key } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function OraclePage() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      content: `Hello! I am Oracle, your AI Security Copilot. I scan the Aegis Sentinel telemetry pipeline, cloud security postures, and active alerts to isolate anomalies.

Ask me about current alerts, remediation guidelines, or write custom playbooks.`,
      alert: null
    },
    {
      id: 2,
      role: 'user',
      content: 'Explain the high severity alert from earlier regarding the S3 Secrets Bucket.'
    },
    {
      id: 3,
      role: 'assistant',
      content: `I reviewed the alert: **S3 Bucket Object Exfiltration Attempt** on the bucket \`prod-secrets-bucket\` by IAM Role \`developer-role\`.

**Analysis:**
- **Trigger:** A console session without Multi-Factor Authentication (MFA) requested a \`GetObject\` call on sensitive database configuration files.
- **Anomalous Factor:** The request originated from an IP subnet (\`198.51.100.42\`) associated with active Tor relays and commercial proxy endpoints.
- **Action taken:** Aegis Sentinel Core blocked the action and triggered Forge SOAR playbook to lock the IAM session temporarily.`,
      alert: {
        title: 'Exfiltration Blocked',
        severity: 'HIGH',
        time: '10 mins ago',
        category: 'Exfiltration'
      }
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestionPills = [
    'Assess console login anomalies',
    'Generate Terraform remediation for public S3',
    'Review active Forge playbooks',
    'Check AWS CloudTrail API anomalies'
  ];

  const handleSend = (textToSend: string) => {
    if (!textToSend.trim()) return;

    const newUserMessage = {
      id: Date.now(),
      role: 'user',
      content: textToSend
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let aiResponseContent = '';
      if (textToSend.toLowerCase().includes('terraform') || textToSend.toLowerCase().includes('s3')) {
        aiResponseContent = `Here is the Terraform config to enforce S3 bucket private access, block public access, and enforce TLS encryption:

\`\`\`hcl
resource "aws_s3_bucket_public_access_block" "block_public" {
  bucket = aws_s3_bucket.secrets_bucket.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_policy" "enforce_ssl" {
  bucket = aws_s3_bucket.secrets_bucket.id
  policy = data.aws_iam_policy_document.deny_insecure_transport.json
}
\`\`\``;
      } else {
        aiResponseContent = `I am analyzing the Sentinel logs for references to "${textToSend}". No direct correlation found to any other open alerts in Vault. I recommend verifying your CloudTrail events or initiating a Prism investigation query.`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: 'assistant',
          content: aiResponseContent
        }
      ]);
      setIsTyping(false);
    }, 1500);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <div className="flex flex-col h-[calc(100vh-130px)] space-y-4" data-testid="oracle-page">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-100 tracking-tight mb-2 flex items-center gap-2">
          Oracle <Sparkles className="text-cyan-400 h-6 w-6" />
        </h1>
        <p className="text-sm text-slate-400 font-light">AI Copilot for cloud anomaly identification and automated security responses</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1 min-h-0">
        
        {/* Chat Area (3 Cols) */}
        <div className="lg:col-span-3 flex flex-col h-full bg-slate-950/40 border border-slate-900 rounded-2xl relative overflow-hidden backdrop-blur-md">
          {/* Suggestion Pills */}
          <div className="flex gap-2 p-4 overflow-x-auto border-b border-slate-900 bg-slate-950/60 scrollbar-none shrink-0">
            {suggestionPills.map((pill, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(pill)}
                className="px-3.5 py-1.5 rounded-full border border-slate-900 hover:border-cyan-500/30 bg-slate-950 hover:bg-cyan-500/5 text-slate-400 hover:text-cyan-400 text-[10px] font-mono tracking-wider font-bold transition-all whitespace-nowrap cursor-pointer"
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
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                    <Bot size={16} />
                  </div>
                )}
                
                <div className={`space-y-3 max-w-[80%] ${msg.role === 'user' ? 'order-1' : 'order-2'}`}>
                  <div
                    className={`rounded-2xl px-4 py-3 text-xs leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-cyan-500 text-slate-950 font-semibold rounded-tr-none'
                        : 'bg-slate-900/60 border border-slate-900 text-slate-300 rounded-tl-none font-light'
                    }`}
                  >
                    <div className="whitespace-pre-line font-mono">{msg.content}</div>
                  </div>

                  {/* Render Mock Alert Card attachment if present */}
                  {msg.alert && (
                    <div className="border border-slate-900 bg-slate-950/80 p-3 rounded-xl flex gap-3 items-center">
                      <div className="w-8 h-8 rounded bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
                        <ShieldAlert size={16} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider font-mono">{msg.alert.category} • {msg.alert.time}</div>
                        <div className="text-xs font-bold text-slate-200 truncate">{msg.alert.title}</div>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[8px] font-bold bg-red-500/10 text-red-400 font-mono">
                        {msg.alert.severity}
                      </span>
                    </div>
                  )}
                </div>

                {msg.role === 'user' && (
                  <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 shrink-0 order-3">
                    <User size={16} />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-4 justify-start">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                  <Bot size={16} />
                </div>
                <div className="bg-slate-900/60 border border-slate-900 rounded-2xl rounded-tl-none px-4 py-3 flex gap-1 items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '300ms' }} />
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
                placeholder="Ask Oracle a question (e.g. Write an AWS containment playbook)..."
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
              <span className="flex items-center gap-1"><CornerDownLeft size={10} /> Enter to submit</span>
              <span>Oracle v1.2 Security LLM model</span>
            </div>
          </div>
        </div>

        {/* Right Sidebar: AI Context Panel (1 Col) */}
        <div className="space-y-6 hidden lg:block">
          <Card glass className="p-1">
            <CardHeader>
              <CardTitle className="text-sm font-bold text-slate-300 uppercase tracking-wider">Oracle Capability</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-xs text-slate-400 leading-relaxed font-light">
              <div>
                <strong className="text-slate-200">Playbook Engine</strong>
                <p className="mt-0.5">Generate, audit, and troubleshoot Forge containment JSON/YAML playbooks automatically.</p>
              </div>
              <div>
                <strong className="text-slate-200">Exfiltration Detection</strong>
                <p className="mt-0.5">Identifies data egress patterns and correlates them with compromised credentials.</p>
              </div>
              <div className="p-3 border border-slate-900 bg-slate-950/60 rounded-xl flex gap-2.5 items-start">
                <Key className="text-cyan-400 h-4.5 w-4.5 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-300 uppercase font-mono">IAM Auditing</span>
                  <p className="text-[10px] text-slate-500 font-light">Oracle reads IAM policies to propose least-privilege configurations.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card glass className="p-1">
            <CardHeader>
              <CardTitle className="text-sm font-bold text-slate-300 uppercase tracking-wider">Agent Health</CardTitle>
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
                <span className="text-slate-400">Status</span>
                <span className="flex items-center gap-1 font-mono text-emerald-400 font-bold">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> ONLINE
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
