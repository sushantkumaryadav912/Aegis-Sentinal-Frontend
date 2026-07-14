'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Network, Search, ArrowRight, Settings2, ShieldCheck, RefreshCw, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Integration {
  id: string;
  name: string;
  category: 'Cloud' | 'Alerting' | 'Ticketing' | 'SIEM';
  status: 'CONNECTED' | 'INACTIVE' | 'PENDING';
  desc: string;
  latency?: string;
  lastSync?: string;
}

export default function NexusPage() {
  const [integrations, setIntegrations] = useState<Integration[]>([
    { id: 'aws', name: 'Amazon Web Services', category: 'Cloud', status: 'CONNECTED', desc: 'Ingests CloudTrail, GuardDuty, and VPC flow logs in real-time.', latency: '120ms', lastSync: '10s ago' },
    { id: 'gcp', name: 'Google Cloud Platform', category: 'Cloud', status: 'CONNECTED', desc: 'Streams audit events, Pub/Sub channels, and firewall telemetry.', latency: '190ms', lastSync: '1 min ago' },
    { id: 'slack', name: 'Slack Bot', category: 'Alerting', status: 'CONNECTED', desc: 'Dispatches high-priority alert cards to custom response channels.', latency: '40ms', lastSync: '12s ago' },
    { id: 'pagerduty', name: 'PagerDuty Escalation', category: 'Alerting', status: 'PENDING', desc: 'Creates service incidents and pages engineers during critical outbreaks.' },
    { id: 'jira', name: 'Atlassian Jira', category: 'Ticketing', status: 'CONNECTED', desc: 'Generates tracking tickets in support queues for new security incidents.', latency: '340ms', lastSync: '5 mins ago' },
    { id: 'azure', name: 'Microsoft Azure', category: 'Cloud', status: 'INACTIVE', desc: 'Polls Activity Logs, Security Center warnings, and Cosmos telemetry.' },
    { id: 'splunk', name: 'Splunk HEC Node', category: 'SIEM', status: 'INACTIVE', desc: 'Forwards resolved security events and logs to Splunk indexes.' }
  ]);

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const toggleStatus = (id: string) => {
    setIntegrations(prev => prev.map(item => {
      if (item.id === id) {
        const nextStatus = item.status === 'CONNECTED' ? 'INACTIVE' : 'CONNECTED';
        return {
          ...item,
          status: nextStatus,
          latency: nextStatus === 'CONNECTED' ? '210ms' : undefined,
          lastSync: nextStatus === 'CONNECTED' ? 'Just now' : undefined
        };
      }
      return item;
    }));
  };

  const filteredIntegrations = integrations.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category.toLowerCase() === activeCategory.toLowerCase();
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8" data-testid="nexus-page">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-100 tracking-tight mb-2">Nexus</h1>
          <p className="text-sm text-slate-400 font-light">Cloud and third-party SaaS integrations for alerts ingestion and threat dispatching</p>
        </div>
      </div>

      {/* Categories and Search bar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center border-b border-slate-900 pb-4">
        <div className="flex gap-2 w-full md:w-auto overflow-x-auto scrollbar-none pb-1 md:pb-0">
          {['all', 'Cloud', 'Alerting', 'Ticketing', 'SIEM'].map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                activeCategory === cat
                  ? 'bg-slate-900 text-cyan-400 border border-slate-800'
                  : 'text-slate-500 hover:text-slate-200'
              }`}
            >
              {cat === 'all' ? 'All Modules' : cat}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
          <Input
            placeholder="Search integrations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-9 bg-slate-950/80 border-slate-900 text-xs focus:border-cyan-500 text-slate-100 placeholder-slate-500 rounded-lg"
          />
        </div>
      </div>

      {/* Grid of integrations */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredIntegrations.map((item) => (
          <Card 
            key={item.id} 
            glass 
            className={`p-1 flex flex-col justify-between transition-all duration-300 ${
              item.status === 'CONNECTED' ? 'border-cyan-500/10' : 'border-slate-900'
            }`}
          >
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-900 flex items-center justify-center text-slate-400">
                    <Layers size={18} className={item.status === 'CONNECTED' ? 'text-cyan-400' : 'text-slate-500'} />
                  </div>
                  <div>
                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest font-mono">{item.category}</span>
                    <CardTitle className="text-sm font-bold text-slate-200 mt-0.5">{item.name}</CardTitle>
                  </div>
                </div>

                {/* Connection switch */}
                <button 
                  onClick={() => toggleStatus(item.id)}
                  className={`w-9 h-5 rounded-full p-0.5 transition-colors cursor-pointer relative ${
                    item.status === 'CONNECTED' ? 'bg-cyan-500' : 'bg-slate-900 border border-slate-800'
                  }`}
                >
                  <div className={`w-3.5 h-3.5 rounded-full bg-slate-950 shadow-md transition-transform duration-300 ${
                    item.status === 'CONNECTED' ? 'translate-x-4' : 'translate-x-0'
                  }`} />
                </button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 pt-0">
              <p className="text-xs text-slate-400 font-light leading-relaxed">
                {item.desc}
              </p>

              {/* Status details bar */}
              <div className="border-t border-slate-900/60 pt-3 flex justify-between items-center text-[10px] text-slate-500 font-mono">
                {item.status === 'CONNECTED' ? (
                  <>
                    <span className="flex items-center gap-1.5 text-cyan-400 font-bold">
                      <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
                      ACTIVE ({item.latency})
                    </span>
                    <span>Synced {item.lastSync}</span>
                  </>
                ) : item.status === 'PENDING' ? (
                  <>
                    <span className="flex items-center gap-1.5 text-amber-400 font-bold">
                      <RefreshCw size={10} className="animate-spin" />
                      PENDING SETUP
                    </span>
                    <Button variant="link" className="p-0 h-auto text-[10px] text-cyan-400 font-bold uppercase tracking-wider flex items-center gap-0.5 hover:no-underline">
                      Configure <ArrowRight size={10} />
                    </Button>
                  </>
                ) : (
                  <>
                    <span className="flex items-center gap-1.5 text-slate-600 font-bold">
                      <span className="h-1.5 w-1.5 rounded-full bg-slate-800" />
                      DISABLED
                    </span>
                    <Button 
                      onClick={() => toggleStatus(item.id)}
                      variant="link" 
                      className="p-0 h-auto text-[10px] text-cyan-400 font-bold uppercase tracking-wider flex items-center gap-0.5 hover:no-underline"
                    >
                      Connect <ArrowRight size={10} />
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredIntegrations.length === 0 && (
          <div className="col-span-3 text-center py-20 border border-dashed border-slate-900 rounded-2xl">
            <Network className="mx-auto h-8 w-8 text-slate-600 mb-3 animate-pulse" />
            <h3 className="text-sm font-bold text-slate-300">No Integrations Found</h3>
            <p className="text-xs text-slate-500 font-light mt-1">Try resetting your category filter or search keywords.</p>
          </div>
        )}
      </div>
    </div>
  );
}
