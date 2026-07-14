'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldAlert, Search, Eye, AlertTriangle, Globe, RefreshCw, Terminal, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function WatchtowerPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<any>(null);

  const mockThreatFeed = [
    { id: 1, type: 'IP Reputation', indicator: '198.51.100.42', threat: 'Known Tor Exit Node / Botnet Command Server', severity: 'HIGH', country: 'RU', timestamp: '2 mins ago' },
    { id: 2, type: 'CVE exploit', indicator: 'CVE-2026-2819', threat: 'AWS IAM Privilege Escalation exploit scan', severity: 'CRITICAL', country: 'CN', timestamp: '12 mins ago' },
    { id: 3, type: 'Domain Threat', indicator: 'malicious-auth-portal.com', threat: 'Phishing domain mimicking Okta portal', severity: 'HIGH', country: 'UA', timestamp: '45 mins ago' },
    { id: 4, type: 'Malware Hash', indicator: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', threat: 'Ransomware loader payload', severity: 'CRITICAL', country: 'KP', timestamp: '1 hour ago' },
    { id: 5, type: 'IP Reputation', indicator: '203.0.113.111', threat: 'Active brute-force attempt against SSH grids', severity: 'MEDIUM', country: 'NL', timestamp: '2 hours ago' },
  ];

  const handleScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery) return;
    setIsScanning(true);
    setScanResult(null);

    setTimeout(() => {
      setIsScanning(false);
      // Generate clean results based on input
      const isIP = /^[0-9.]+$/.test(searchQuery);
      if (isIP) {
        setScanResult({
          type: 'IP Address',
          query: searchQuery,
          score: 84,
          status: 'MALICIOUS',
          details: 'Associated with distributed brute-force attacks against cloud SSH endpoints. Found on 3 blocklists.',
          recommendation: 'Block all ingress traffic from this IP in AWS Security Groups immediately.'
        });
      } else {
        setScanResult({
          type: 'Indicator',
          query: searchQuery,
          score: 12,
          status: 'SUSPICIOUS',
          details: 'No direct malicious signature detected, but hosting provider has high risk profile.',
          recommendation: 'Monitor traffic to this host; enforce strict rate-limiting.'
        });
      }
    }, 1500);
  };

  return (
    <div className="space-y-8" data-testid="watchtower-page">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-100 tracking-tight mb-2">Watchtower</h1>
        <p className="text-sm text-slate-400 font-light">Global Threat Intelligence and Indicator of Compromise (IoC) database</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: IoC Search and Threat Feed */}
        <div className="lg:col-span-2 space-y-6">
          <Card glass className="p-1">
            <CardHeader>
              <CardTitle className="text-sm font-bold text-slate-300 uppercase tracking-wider">IoC Reputation Lookup</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleScan} className="flex gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                  <Input
                    placeholder="Enter IP address, domain name, or file hash..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-11 bg-slate-950/80 border-slate-900 focus:border-cyan-500 text-slate-100 placeholder-slate-500 rounded-xl"
                  />
                </div>
                <Button type="submit" disabled={isScanning} className="h-11 px-6 bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400 transition-all rounded-xl">
                  {isScanning ? <RefreshCw className="animate-spin mr-2" size={16} /> : <Eye size={16} className="mr-2" />}
                  Check IoC
                </Button>
              </form>

              {/* Scan Result */}
              {scanResult && (
                <div className="mt-6 border border-slate-900 bg-slate-950/50 rounded-xl p-5 space-y-4 animate-fade-in">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider font-mono">{scanResult.type} Scan Result</span>
                      <h3 className="text-lg font-bold text-slate-200 mt-0.5">{scanResult.query}</h3>
                    </div>
                    <span className={`px-2.5 py-1 rounded text-[10px] font-bold tracking-widest font-mono ${
                      scanResult.status === 'MALICIOUS' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}>
                      {scanResult.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-4 py-2 border-y border-slate-900/60">
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase tracking-wider">Threat Score</span>
                      <div className="text-xl font-bold text-slate-200 font-mono mt-0.5">{scanResult.score} / 100</div>
                    </div>
                    <div className="col-span-2">
                      <span className="text-[10px] text-slate-500 uppercase tracking-wider">Classification</span>
                      <div className="text-xs text-slate-300 mt-1">{scanResult.details}</div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider">Action Plan</span>
                    <p className="text-xs text-cyan-400 leading-relaxed font-light">{scanResult.recommendation}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Active Global Threat Feed */}
          <Card glass className="p-1">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-bold text-slate-300 uppercase tracking-wider">Real-time Threat Intelligence Feed</CardTitle>
              <Globe className="h-4 w-4 text-cyan-400 animate-pulse" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockThreatFeed.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3.5 border border-slate-900 bg-slate-950/20 hover:bg-slate-950/40 rounded-xl transition-all">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] px-1.5 py-0.5 rounded font-mono font-bold bg-slate-900 text-slate-400 border border-slate-800">
                          {item.type}
                        </span>
                        <span className="text-xs font-bold text-slate-200 font-mono">{item.indicator}</span>
                      </div>
                      <p className="text-xs text-slate-400 font-light">{item.threat}</p>
                    </div>
                    <div className="text-right space-y-1 shrink-0">
                      <span className={`px-2 py-0.5 rounded text-[8px] font-bold font-mono ${
                        item.severity === 'CRITICAL' ? 'bg-red-500/10 text-red-400' : 'bg-amber-500/10 text-amber-400'
                      }`}>
                        {item.severity}
                      </span>
                      <div className="text-[10px] text-slate-500 font-mono">{item.timestamp}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Col: Threat Radar Index */}
        <div className="space-y-6">
          <Card glass className="p-1">
            <CardHeader>
              <CardTitle className="text-sm font-bold text-slate-300 uppercase tracking-wider">Global Risk Level</CardTitle>
            </CardHeader>
            <CardContent className="text-center py-6 space-y-4">
              <div className="relative inline-flex items-center justify-center">
                <div className="w-36 h-36 rounded-full border-4 border-slate-900 border-t-red-500 flex items-center justify-center animate-[spin_3s_linear_infinite]" />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-extrabold text-red-400 font-mono">HIGH</span>
                  <span className="text-[9px] text-slate-500 uppercase font-semibold mt-1">Global Alert Index</span>
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-400 font-light leading-relaxed px-2">
                <p>
                  Active exploit indicators targeting cloud endpoints are elevated by <strong className="text-red-400">14%</strong> today. Most attacks originate from compromised proxy pools.
                </p>
                <div className="flex gap-2 justify-center pt-2">
                  <span className="flex items-center gap-1 text-[10px] font-mono text-slate-500"><Terminal size={10} /> Active Scans: 1,489</span>
                  <span className="flex items-center gap-1 text-[10px] font-mono text-slate-500"><AlertTriangle size={10} /> Alerts Today: 24</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card glass className="p-1">
            <CardHeader>
              <CardTitle className="text-sm font-bold text-slate-300 uppercase tracking-wider">Threat Intel Sources</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3.5">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-emerald-400 h-4 w-4 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-slate-200">AlienVault OTX Feed</div>
                  <span className="text-[9px] text-slate-500 font-mono">Synchronized 1 min ago</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-emerald-400 h-4 w-4 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-slate-200">MITRE Att&ck Mapping</div>
                  <span className="text-[9px] text-slate-500 font-mono">Synced v14 framework</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-emerald-400 h-4 w-4 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-slate-200">Aegis Intelligence Hub</div>
                  <span className="text-[9px] text-slate-500 font-mono">Proprietary Honeypots Feed</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
