'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FolderLock, Plus, Filter, User2, AlertCircle, CheckCircle2, Clock, PlayCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function VaultPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'open' | 'resolved'>('all');

  const cases = [
    { id: 'CASE-2026-081', title: 'Data exfiltration attempt on S3 secret bucket', severity: 'CRITICAL', status: 'INVESTIGATING', assignee: 'Sushant Kumar', created: '20 mins ago', alerts: 4 },
    { id: 'CASE-2026-079', title: 'ConsoleLogin from anomalous proxy IP', severity: 'HIGH', status: 'TRIAGED', assignee: 'Jane Doe', created: '1 hour ago', alerts: 1 },
    { id: 'CASE-2026-075', title: 'Unusual volume of IAM key creation calls', severity: 'MEDIUM', status: 'OPEN', assignee: 'Unassigned', created: '3 hours ago', alerts: 3 },
    { id: 'CASE-2026-068', title: 'Kubernetes container breakout warning', severity: 'CRITICAL', status: 'RESOLVED', assignee: 'Sushant Kumar', created: '1 day ago', alerts: 7 },
    { id: 'CASE-2026-059', title: 'Database connection spike from developer instance', severity: 'LOW', status: 'RESOLVED', assignee: 'John Smith', created: '3 days ago', alerts: 2 }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'OPEN': return <AlertCircle size={14} className="text-amber-400" />;
      case 'TRIAGED': return <PlayCircle size={14} className="text-blue-400" />;
      case 'INVESTIGATING': return <Clock size={14} className="text-purple-400" />;
      case 'RESOLVED': return <CheckCircle2 size={14} className="text-emerald-400" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'OPEN': return 'bg-amber-500/10 text-amber-400 border border-amber-500/20';
      case 'TRIAGED': return 'bg-blue-500/10 text-blue-400 border border-blue-500/20';
      case 'INVESTIGATING': return 'bg-purple-500/10 text-purple-400 border border-purple-500/20';
      case 'RESOLVED': return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20';
      default: return 'bg-slate-900 text-slate-400';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'CRITICAL': return 'bg-red-500/15 text-red-400 border border-red-500/25';
      case 'HIGH': return 'bg-rose-500/10 text-rose-400 border border-rose-500/20';
      case 'MEDIUM': return 'bg-amber-500/10 text-amber-400 border border-amber-500/20';
      case 'LOW': return 'bg-slate-800 text-slate-400';
      default: return 'bg-slate-900 text-slate-400';
    }
  };

  const filteredCases = cases.filter(c => {
    if (activeTab === 'open') return c.status !== 'RESOLVED';
    if (activeTab === 'resolved') return c.status === 'RESOLVED';
    return true;
  });

  return (
    <div className="space-y-8" data-testid="vault-page">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-100 tracking-tight mb-2">Vault</h1>
          <p className="text-sm text-slate-400 font-light">Case Management, incident tracking, and audit-ready records</p>
        </div>
        <Button className="h-10 px-5 bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400 transition-all rounded-xl cursor-pointer">
          <Plus size={16} className="mr-1.5" /> New Case
        </Button>
      </div>

      <div className="flex flex-col gap-6">
        
        {/* Navigation Tabs and Filter */}
        <div className="flex justify-between items-center border-b border-slate-900 pb-3">
          <div className="flex gap-2">
            {[
              { id: 'all', label: 'All Cases' },
              { id: 'open', label: 'Active Cases' },
              { id: 'resolved', label: 'Resolved Cases' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-slate-900 text-cyan-400 border border-slate-800'
                    : 'text-slate-500 hover:text-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <Button variant="outline" className="h-9 text-xs tracking-wider border-slate-900 text-slate-400 bg-transparent flex items-center gap-1.5 rounded-lg">
            <Filter size={12} /> Filter Cases
          </Button>
        </div>

        {/* Kanban Board Mock Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          
          {/* Columns */}
          {[
            { title: 'Open / New', status: 'OPEN', count: 1 },
            { title: 'Triaged', status: 'TRIAGED', count: 1 },
            { title: 'Investigating', status: 'INVESTIGATING', count: 1 },
            { title: 'Resolved', status: 'RESOLVED', count: 2 }
          ].map(col => (
            <div key={col.title} className="space-y-4">
              <div className="flex items-center justify-between px-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{col.title}</span>
                <span className="text-[10px] font-mono font-bold bg-slate-950/60 border border-slate-900 px-2 py-0.5 rounded-md text-slate-500">
                  {col.count}
                </span>
              </div>

              <div className="space-y-3 min-h-[300px] p-2 bg-slate-950/20 border border-slate-900/60 rounded-2xl">
                {cases
                  .filter(c => c.status === col.status)
                  .map(c => (
                    <div 
                      key={c.id} 
                      className="p-4 border border-slate-900 bg-slate-950/50 hover:bg-slate-950/90 rounded-xl space-y-3 cursor-pointer transition-all hover:border-slate-800 hover:shadow-[0_0_15px_rgba(0,0,0,0.4)]"
                    >
                      <div className="flex justify-between items-start">
                        <span className="text-[9px] font-bold font-mono text-slate-500">{c.id}</span>
                        <span className={`px-2 py-0.5 rounded text-[8px] font-bold font-mono ${getSeverityColor(c.severity)}`}>
                          {c.severity}
                        </span>
                      </div>
                      
                      <h4 className="text-xs font-bold text-slate-200 leading-normal line-clamp-2">{c.title}</h4>
                      
                      <div className="border-t border-slate-900/60 pt-2.5 flex items-center justify-between text-[10px] text-slate-500 font-light">
                        <span className="flex items-center gap-1"><User2 size={11} /> {c.assignee}</span>
                        <span>{c.created}</span>
                      </div>
                    </div>
                  ))}

                {cases.filter(c => c.status === col.status).length === 0 && (
                  <div className="h-40 flex items-center justify-center border border-dashed border-slate-900 rounded-xl text-[10px] text-slate-600 uppercase font-mono tracking-wider">
                    Empty column
                  </div>
                )}
              </div>
            </div>
          ))}

        </div>

      </div>
    </div>
  );
}
