'use client';

import React, { useState, useMemo } from 'react';
import { Search, Info, ShieldAlert, Cpu, CircleDollarSign, Check, X, Shield, Terminal, ArrowUpDown } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';

interface Product {
  name: string;
  ids: boolean;
  ips: boolean;
  host: boolean;
  network: boolean;
  cloud: boolean;
  platforms: string[];
  detection: string;
  price: string;
  isFree: boolean;
  details: string;
}

export function IDSComparisonTable() {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'free' | 'paid' | 'ids' | 'ips' | 'host' | 'network'>('all');
  const [sortField, setSortField] = useState<keyof Product>('name');
  const [sortAsc, setSortAsc] = useState(true);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const products: Product[] = [
    {
      name: "Aegis Sentinel",
      ids: true,
      ips: true,
      host: true,
      network: true,
      cloud: true,
      platforms: ["AWS", "GCP", "Azure", "Kubernetes", "Linux"],
      detection: "Behavioral anomaly detection (Isolation Forests) & active SOAR response",
      price: "Free / Custom",
      isFree: true,
      details: "An AI-powered Cloud Incident Detection & Response (CIDR) platform. Continuously collects cloud logs and telemetry (Pulse), executes stateful behavioral ML anomaly detection (Sentinel Core), provides incident visualizations (Prism), incorporates an AI Security Copilot (Oracle), and automates playbooks (Forge) at machine speeds."
    },
    {
      name: "AIDE",
      ids: true,
      ips: false,
      host: true,
      network: false,
      cloud: false,
      platforms: ["Unix", "Linux", "Mac OS"],
      detection: "File integrity check (only)",
      price: "Free*",
      isFree: true,
      details: "Advanced Intrusion Detection Environment. It builds a database of system files and checks them against live files to detect unauthorized changes. Standard tool for server integrity auditing."
    },
    {
      name: "BluVector",
      ids: true,
      ips: false,
      host: false,
      network: true,
      cloud: false,
      platforms: ["Custom Appliance"],
      detection: "Broad threat detection",
      price: "Not available",
      isFree: false,
      details: "Uses machine learning and automated playbooks to detect advanced malware and zero-day threats in real-time at the network boundary."
    },
    {
      name: "Check Point Quantum IPS",
      ids: true,
      ips: true,
      host: false,
      network: true,
      cloud: false,
      platforms: ["Appliance"],
      detection: "Broad threat detection",
      price: "$1,500+ / year",
      isFree: false,
      details: "Enterprise network IPS integrated with security gateways. Offers virtual patching, SSL inspection, and multi-layered threat prevention."
    },
    {
      name: "Cisco NGIPS",
      ids: false,
      ips: true,
      host: false,
      network: true,
      cloud: false,
      platforms: ["Appliance", "VMware"],
      detection: "Broad threat detection",
      price: "$1,280+ / year",
      isFree: false,
      details: "Next-Generation Intrusion Prevention System. Provides deep visibility, automated protection, and security context across enterprise networks."
    },
    {
      name: "Fail2Ban",
      ids: true,
      ips: true,
      host: true,
      network: false,
      cloud: false,
      platforms: ["Unix", "Linux", "Mac OS"],
      detection: "Detects potentially malicious IP addresses",
      price: "Free",
      isFree: true,
      details: "Scans log files (e.g. SSH, Apache) and bans IPs that show malicious signs like too many password failures. Simple yet extremely effective automated shield."
    },
    {
      name: "Fidelis Network",
      ids: true,
      ips: true,
      host: false,
      network: true,
      cloud: false,
      platforms: ["Custom Hardware", "VM"],
      detection: "Broad threat detection",
      price: "$78,000+ / year",
      isFree: false,
      details: "Deploys deep session inspection to detect and prevent data loss, cyber threats, and command-and-control communication across gigabit bandwidths."
    },
    {
      name: "Hillstone Networks",
      ids: true,
      ips: true,
      host: false,
      network: true,
      cloud: false,
      platforms: ["Appliance"],
      detection: "Broad threat detection",
      price: "Perpetual License",
      isFree: false,
      details: "Provides comprehensive perimeter defenses with behavioral threat detection, application control, and automated mitigation capabilities."
    },
    {
      name: "Kismet",
      ids: true,
      ips: false,
      host: false,
      network: true,
      cloud: false,
      platforms: ["Linux", "OSX", "Windows 10"],
      detection: "Wireless IDS only",
      price: "Free",
      isFree: true,
      details: "A wireless network detector, sniffer, and intrusion detection system. It works with raw WiFi traffic, Bluetooth signals, and software-defined radio protocols."
    },
    {
      name: "NSFOCUS",
      ids: true,
      ips: true,
      host: false,
      network: true,
      cloud: false,
      platforms: ["Appliance", "Cloud"],
      detection: "Broad threat detection",
      price: "Not available",
      isFree: false,
      details: "Next-generation network IPS focused on protecting vulnerability exploits, web attacks, malware infections, and evasion techniques."
    },
    {
      name: "OpenWIPS-NG",
      ids: true,
      ips: true,
      host: false,
      network: true,
      cloud: false,
      platforms: ["Linux"],
      detection: "Wireless Networks",
      price: "Free",
      isFree: true,
      details: "Free and open-source Wireless Intrusion Prevention System. Consists of a sensor to capture wireless raw packets, a server to analyze threats, and a GUI."
    },
    {
      name: "OSSEC",
      ids: true,
      ips: true,
      host: true,
      network: false,
      cloud: false,
      platforms: ["Unix", "Linux", "MacOS", "Windows"],
      detection: "System file monitoring",
      price: "Free*",
      isFree: true,
      details: "A leading open-source host-based intrusion detection system (HIDS). Performs log analysis, integrity checking, registry monitoring, rootkit detection, and active response."
    },
    {
      name: "Palo Alto Networks",
      ids: true,
      ips: true,
      host: false,
      network: true,
      cloud: true,
      platforms: ["Appliance", "Container", "VM"],
      detection: "Broad threat detection",
      price: "$9,509.50+",
      isFree: false,
      details: "Industry-leading inline network protection blocking known and unknown threats. Integrates seamlessly with cloud postures, firewalls, and sandboxing architectures."
    },
    {
      name: "Sagan",
      ids: true,
      ips: true,
      host: true,
      network: false,
      cloud: false,
      platforms: ["Unix", "Linux", "MacOS"],
      detection: "Log file analysis, IP blocking",
      price: "Free",
      isFree: true,
      details: "Multi-threaded, real-time log analysis engine. Designed to act like Snort but parses system logs and blocks threats automatically via firewall integrations."
    },
    {
      name: "Samhain",
      ids: true,
      ips: false,
      host: true,
      network: false,
      cloud: false,
      platforms: ["Linux", "Unix", "MacOS"],
      detection: "File integrity checking, log analysis, rootkit detection",
      price: "Free",
      isFree: true,
      details: "Designed to monitor host integrity. Provides centralized management, encrypted databases, and stealth techniques to run covertly on hosts."
    },
    {
      name: "Security Onion",
      ids: true,
      ips: false,
      host: true,
      network: true,
      cloud: false,
      platforms: ["Linux only"],
      detection: "Broad threat detection",
      price: "Free*",
      isFree: true,
      details: "A powerful free Linux distro for threat hunting, enterprise security monitoring, and log management. Packages Elasticsearch, Suricata, Zeek, and Wazuh together."
    },
    {
      name: "Snort",
      ids: true,
      ips: true,
      network: true,
      host: false,
      cloud: false,
      platforms: ["Linux", "Unix", "MacOS"],
      detection: "Broad threat detection",
      price: "Free / $399+ rules sub",
      isFree: true,
      details: "The world's gold standard open-source network IDS/IPS. Developed by Cisco, it uses signature, protocol, and anomaly-based inspection methods to block traffic."
    },
    {
      name: "SolarWinds SEM",
      ids: true,
      ips: true,
      host: true,
      network: true,
      cloud: false,
      platforms: ["Windows", "Linux", "Unix", "MacOS"],
      detection: "Broad threat detection",
      price: "$2,525+",
      isFree: false,
      details: "Security Event Manager. Combines log aggregation, compliance reporting, and real-time network/host event correlation for rapid containment."
    },
    {
      name: "Suricata",
      ids: true,
      ips: true,
      network: true,
      host: false,
      cloud: false,
      platforms: ["Windows", "Linux", "Unix", "MacOS"],
      detection: "Broad threat detection",
      price: "Free",
      isFree: true,
      details: "High-performance, multi-threaded network IDS/IPS and network security monitoring engine. Extremely fast, capable of inspect 10Gbps+ traffic natively."
    },
    {
      name: "Trellix (McAfee + FireEye)",
      ids: true,
      ips: true,
      network: true,
      host: false,
      cloud: false,
      platforms: ["Appliance", "Software"],
      detection: "Broad threat detection",
      price: "$10,995+",
      isFree: false,
      details: "Enterprise Network Security platform featuring advanced sandboxing, behavior modeling, and unified policy management against zero-day exploits."
    },
    {
      name: "Trend Micro",
      ids: true,
      ips: true,
      network: true,
      host: false,
      cloud: false,
      platforms: ["Appliance", "Software"],
      detection: "Broad threat detection",
      price: "Not available",
      isFree: false,
      details: "Provides host and network level security prevention systems, filtering network streams for vulnerabilities and known malware families."
    },
    {
      name: "Vectra Cognito",
      ids: true,
      ips: true,
      network: true,
      host: false,
      cloud: true,
      platforms: ["Appliance", "Cloud Software"],
      detection: "Broad threat detection",
      price: "$10,000+",
      isFree: false,
      details: "AI-driven threat detection that monitors network metadata, cloud logs, and SaaS accounts to track attacker behaviors in real-time."
    },
    {
      name: "Zeek (AKA: Bro)",
      ids: true,
      ips: false,
      network: true,
      host: false,
      cloud: false,
      platforms: ["Windows", "Linux", "Unix", "MacOS"],
      detection: "Broad threat detection",
      price: "Free*",
      isFree: true,
      details: "A powerful network analysis framework that is much more than a traditional IDS. It translates raw packets into structured logs and supports scripting."
    },
    {
      name: "ZScalar Cloud IPS",
      ids: true,
      ips: true,
      network: true,
      host: false,
      cloud: true,
      platforms: ["Windows", "MacOS", "Linux", "Android", "iOS"],
      detection: "Broad threat detection",
      price: "Subscription levels",
      isFree: false,
      details: "Cloud-native intrusion prevention system that scales to scan all user traffic across endpoints, networks, and remote locations with threat intelligence."
    }
  ];

  const handleSort = (field: keyof Product) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Tab filters
      if (activeTab === 'free' && !p.isFree) return false;
      if (activeTab === 'paid' && p.isFree && p.name !== 'Aegis Sentinel') return false;
      if (activeTab === 'ids' && !p.ids) return false;
      if (activeTab === 'ips' && !p.ips) return false;
      if (activeTab === 'host' && !p.host) return false;
      if (activeTab === 'network' && !p.network) return false;

      // Search query
      const query = search.toLowerCase();
      if (!query) return true;

      return (
        p.name.toLowerCase().includes(query) ||
        p.detection.toLowerCase().includes(query) ||
        p.platforms.some(pl => pl.toLowerCase().includes(query)) ||
        p.price.toLowerCase().includes(query)
      );
    }).sort((a, b) => {
      const valA = a[sortField];
      const valB = b[sortField];
      
      if (typeof valA === 'boolean' && typeof valB === 'boolean') {
        const numA = valA ? 1 : 0;
        const numB = valB ? 1 : 0;
        return sortAsc ? numA - numB : numB - numA;
      }

      if (valA < valB) return sortAsc ? -1 : 1;
      if (valA > valB) return sortAsc ? 1 : -1;
      return 0;
    });
  }, [search, activeTab, sortField, sortAsc]);

  const toggleRow = (name: string) => {
    setExpandedRow(expandedRow === name ? null : name);
  };

  return (
    <div className="w-full space-y-6">
      
      {/* Controls: Search + Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative max-w-md w-full">
          <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-500" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search systems (e.g. Suricata, Linux, free)..."
            className="pl-10 h-11"
          />
        </div>

        {/* Filters Tabs */}
        <div className="flex flex-wrap gap-1.5 p-1 bg-slate-950/80 rounded-xl border border-slate-900 overflow-x-auto">
          {(['all', 'free', 'paid', 'ids', 'ips', 'host', 'network'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all uppercase tracking-wider whitespace-nowrap cursor-pointer ${
                activeTab === tab
                  ? 'bg-cyan-500 text-slate-950 shadow-lg'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Table */}
      <Table containerClassName="border border-slate-900 shadow-2xl">
        <TableHeader>
          <TableRow className="bg-slate-950/40 hover:bg-transparent">
            <TableHead className="w-[180px] cursor-pointer hover:text-cyan-400 transition-colors select-none" onClick={() => handleSort('name')}>
              Name <ArrowUpDown className="inline-block ml-1.5 h-3.5 w-3.5" />
            </TableHead>
            <TableHead className="w-[160px] cursor-pointer hover:text-cyan-400 transition-colors select-none" onClick={() => handleSort('ids')}>
              Capabilities <ArrowUpDown className="inline-block ml-1.5 h-3.5 w-3.5" />
            </TableHead>
            <TableHead className="w-[200px] cursor-pointer hover:text-cyan-400 transition-colors select-none">
              Scope
            </TableHead>
            <TableHead className="cursor-pointer hover:text-cyan-400 transition-colors select-none">
              Detection Type
            </TableHead>
            <TableHead className="w-[150px] cursor-pointer hover:text-cyan-400 transition-colors select-none" onClick={() => handleSort('isFree')}>
              Price <ArrowUpDown className="inline-block ml-1.5 h-3.5 w-3.5" />
            </TableHead>
            <TableHead className="w-[60px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((p) => {
              const isExpanded = expandedRow === p.name;
              return (
                <React.Fragment key={p.name}>
                  <TableRow
                    onClick={() => toggleRow(p.name)}
                    className={`cursor-pointer hover:bg-slate-900/30 transition-all border-b border-slate-900/50 ${
                      p.name === 'Aegis Sentinel'
                        ? 'bg-cyan-950/15 border-l-2 border-l-cyan-500 border-y-cyan-500/25 border-r-cyan-500/25 shadow-[0_0_15px_rgba(6,182,212,0.05)]'
                        : isExpanded ? 'bg-slate-900/20' : ''
                    }`}
                  >
                    <TableCell className={`font-bold transition-colors ${
                      p.name === 'Aegis Sentinel' 
                        ? 'text-cyan-400 bg-cyan-500/10 border-l-4 border-l-cyan-500 pl-4 font-black' 
                        : 'text-slate-100'
                    }`}>
                      {p.name}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1.5">
                        {p.ids && (
                          <span className="px-2 py-0.5 rounded-md text-[10px] uppercase font-bold tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/20">
                            IDS
                          </span>
                        )}
                        {p.ips && (
                          <span className="px-2 py-0.5 rounded-md text-[10px] uppercase font-bold tracking-wider bg-purple-500/10 text-purple-400 border border-purple-500/20">
                            IPS
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {p.host && (
                          <span className="px-2 py-0.5 rounded-md text-[10px] uppercase font-bold tracking-wider bg-slate-800 text-slate-300">
                            Host
                          </span>
                        )}
                        {p.network && (
                          <span className="px-2 py-0.5 rounded-md text-[10px] uppercase font-bold tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            Network
                          </span>
                        )}
                        {p.cloud && (
                          <span className="px-2 py-0.5 rounded-md text-[10px] uppercase font-bold tracking-wider bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                            Cloud
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-slate-400 text-xs font-light">{p.detection}</TableCell>
                    <TableCell>
                      <span className={`whitespace-nowrap px-2.5 py-1 rounded-full text-xs font-semibold ${
                        p.isFree 
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      }`}>
                        {p.price}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Info className={`h-4 w-4 text-slate-500 transition-colors ${isExpanded ? 'text-cyan-400' : 'hover:text-slate-300'}`} />
                    </TableCell>
                  </TableRow>

                  {/* Expanded Detail Panel */}
                  {isExpanded && (
                    <TableRow className="bg-slate-900/10 hover:bg-slate-900/10 border-b border-slate-900">
                      <TableCell colSpan={6} className="p-6 bg-slate-950/30">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-top-2 duration-300">
                          {/* Left summary */}
                          <div className="md:col-span-2 space-y-3">
                            <h4 className="text-sm font-semibold text-slate-100 flex items-center gap-2">
                              <Shield className="h-4 w-4 text-cyan-400" /> System Profile: {p.name}
                            </h4>
                            <p className="text-sm text-slate-400 leading-relaxed font-light">{p.details}</p>
                          </div>
                          {/* Right tech details */}
                          <div className="p-4 rounded-xl border border-slate-900 bg-slate-950/50 space-y-3">
                            <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">Infrastructure</div>
                            <div className="space-y-2">
                              <div className="flex justify-between text-xs">
                                <span className="text-slate-400">Supported Platforms:</span>
                                <span className="text-slate-200 text-right max-w-[150px] truncate" title={p.platforms.join(', ')}>
                                  {p.platforms.join(', ')}
                                </span>
                              </div>
                              <div className="flex justify-between text-xs">
                                <span className="text-slate-400">Class:</span>
                                <span className="text-slate-200">
                                  {p.host ? 'HIDS' : ''}{p.host && p.network ? ' / ' : ''}{p.network ? 'NIDS' : ''}
                                </span>
                              </div>
                              <div className="flex justify-between text-xs">
                                <span className="text-slate-400">Billing:</span>
                                <span className="text-slate-200">{p.isFree ? 'Open Source / Free' : 'Commercial License'}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="h-32 text-center text-slate-500">
                No intrusion systems found matching your search.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
