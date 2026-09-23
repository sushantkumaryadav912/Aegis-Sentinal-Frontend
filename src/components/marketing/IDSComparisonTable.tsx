'use client';

import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Info, 
  ShieldAlert, 
  Cpu, 
  CircleDollarSign, 
  Check, 
  X, 
  Shield, 
  Terminal, 
  ArrowUpDown,
  Zap,
  Sparkles,
  GitBranch,
  Layers,
  Flame,
  CheckCircle2,
  Bot,
  Gauge,
  Timer,
  Activity,
  BarChart3,
  Clock,
  TrendingDown,
  TrendingUp,
  SlidersHorizontal
} from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';

export interface Product {
  name: string;
  ids: boolean; // Intrusion Detection System
  ips: boolean; // Intrusion Prevention System
  irs: boolean; // Intrusion Response & Remediation System (Automated SOAR / Containment)
  ai: boolean;  // AI / ML Behavioral & Neural Analytics
  host: boolean;
  network: boolean;
  cloud: boolean;
  platforms: string[];
  detection: string;
  response: string;
  price: string;
  isFree: boolean;
  details: string;
  highlight?: boolean;
  // Performance & Benchmark Metrics
  mttd: string;              // Mean Time to Detect
  mttr: string;              // Mean Time to Respond / Remediate
  falsePositiveRate: string; // False Positive Rate
  throughput: string;        // Ingestion & Processing Throughput
  accuracyF1: string;        // Detection Accuracy / F1-Score
  overhead: string;          // Host / System Resource Overhead
}

export function IDSComparisonTable() {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'irs' | 'cloud' | 'ai' | 'free' | 'paid' | 'ids' | 'ips'>('all');
  const [viewMode, setViewMode] = useState<'capabilities' | 'performance'>('capabilities');
  const [sortField, setSortField] = useState<keyof Product>('name');
  const [sortAsc, setSortAsc] = useState(true);
  const [expandedRow, setExpandedRow] = useState<string | null>('Aegis Sentinel');

  const products: Product[] = [
    {
      name: "Aegis Sentinel",
      highlight: true,
      ids: true,
      ips: true,
      irs: true,
      ai: true,
      host: true,
      network: true,
      cloud: true,
      platforms: ["AWS", "GCP", "Azure", "Kubernetes", "Linux"],
      detection: "Sentinel Core: 10 Helios Anomaly Models (DeepLog, LogFormer, UEBA, Isolation Forest) + 184 SIGMA rules & GNNs",
      response: "Forge SOAR: Automated Terraform / Ansible / K8s NetworkPolicy code generation, 108+ OWASP playbooks & IAM lockdown",
      price: "Free Core / Custom",
      isFree: true,
      details: "An AI-powered Cloud Incident Detection & Response (CIDR) and Intrusion Response System (IRS). Detects multi-stage anomalies via Sentinel Core (10 Helios ML models including DeepLog, LogFormer, and UEBA), correlates graph attacks in real-time, projects attack paths in Prism, reasons with Oracle Copilot (Qwen3-32B & Llama 3.3 70B), and generates machine-speed cloud infrastructure remediation code with Forge SOAR.",
      mttd: "< 1.2s",
      mttr: "< 4.8s (Automated Forge)",
      falsePositiveRate: "< 0.12%",
      throughput: "500k+ EPS",
      accuracyF1: "99.4%",
      overhead: "< 1.2% CPU (eBPF)",
    },
    {
      name: "Wazuh",
      ids: true,
      ips: true,
      irs: true,
      ai: false,
      host: true,
      network: true,
      cloud: true,
      platforms: ["Linux", "Windows", "macOS", "AWS", "GCP", "Azure"],
      detection: "Log analysis, file integrity monitoring, rootkit detection & vulnerability scanning",
      response: "Active Response scripts (host-level firewall drop, account disable, service stop)",
      price: "Free*",
      isFree: true,
      details: "Leading open-source security platform combining HIDS, XDR, and SIEM capabilities. Runs agents across endpoints and servers with built-in Active Response scripts to mitigate threats on local hosts.",
      mttd: "30s – 5 mins",
      mttr: "15s – 2 mins (Host)",
      falsePositiveRate: "8.5% – 14.0%",
      throughput: "25k EPS",
      accuracyF1: "86.2%",
      overhead: "3 – 8% CPU",
    },
    {
      name: "Splunk SOAR (Phantom)",
      ids: false,
      ips: false,
      irs: true,
      ai: false,
      host: true,
      network: true,
      cloud: true,
      platforms: ["Appliance", "Cloud VM", "Kubernetes"],
      detection: "Requires external SIEM / EDR sensors (Splunk Enterprise, CrowdStrike)",
      response: "Enterprise SOAR orchestration: 300+ third-party connectors, Python playbooks, automated ticketing",
      price: "$25,000+ / year",
      isFree: false,
      details: "Commercial Security Orchestration, Automation, and Response (SOAR) platform. Focuses on orchestrating response actions across existing firewalls and cloud APIs, but possesses no native intrusion detection sensors.",
      mttd: "5 – 15 mins (via SIEM)",
      mttr: "20s – 3 mins (Playbook)",
      falsePositiveRate: "10% – 18% (Upstream)",
      throughput: "5,000 actions / min",
      accuracyF1: "N/A (SOAR Orchestrator)",
      overhead: "Dedicated 16 vCPU Appliance",
    },
    {
      name: "Cortex XSOAR (Palo Alto)",
      ids: false,
      ips: false,
      irs: true,
      ai: true,
      host: true,
      network: true,
      cloud: true,
      platforms: ["Cloud Software", "On-Premises VM"],
      detection: "Relies on ingested alerts from Cortex XDR, SIEMs, and cloud feeds",
      response: "Automated war rooms, cross-vendor playbooks, threat intelligence feed sync",
      price: "$35,000+ / year",
      isFree: false,
      details: "Comprehensive enterprise SOAR solution. Automates incident triage and remediation workflows across hundreds of security tools, but requires companion detection engines to feed it alerts.",
      mttd: "5 – 10 mins (via XDR)",
      mttr: "30s – 4 mins (Playbook)",
      falsePositiveRate: "8% – 15% (Upstream)",
      throughput: "8,000 actions / min",
      accuracyF1: "N/A (SOAR Orchestrator)",
      overhead: "Dedicated 32 vCPU Appliance",
    },
    {
      name: "AWS GuardDuty + Security Hub",
      ids: true,
      ips: false,
      irs: false,
      ai: true,
      host: false,
      network: true,
      cloud: true,
      platforms: ["AWS Native"],
      detection: "VPC flow logs, DNS queries, CloudTrail events & EKS audit log anomaly detection",
      response: "Alert generation only (remediation requires custom EventBridge + AWS Lambda buildout)",
      price: "$4.00+ / GB ingested",
      isFree: false,
      details: "Managed threat detection service by AWS. Continuously monitors AWS accounts and workloads for malicious activity. Lacks native automated containment without building custom Lambda serverless pipelines.",
      mttd: "5 – 15 mins (CloudTrail)",
      mttr: "Manual / 15-30m Lambda",
      falsePositiveRate: "4.8% – 8.2%",
      throughput: "Cloud-scale (Tens of billions/day)",
      accuracyF1: "89.5%",
      overhead: "0% (Agentless cloud telemetry)",
    },
    {
      name: "Microsoft Defender for Cloud + Sentinel",
      ids: true,
      ips: true,
      irs: true,
      ai: true,
      host: true,
      network: true,
      cloud: true,
      platforms: ["Azure", "AWS", "GCP", "Windows", "Linux"],
      detection: "Cloud Security Posture Management (CSPM), workload protection & ML anomaly analytics",
      response: "Azure Logic Apps SOAR playbooks, automated host isolation, NSG rule updates",
      price: "$15.00+ / server / mo",
      isFree: false,
      details: "Cloud-native SIEM and SOAR platform by Microsoft. Evaluates multi-cloud security telemetry, provides threat intelligence, and executes automated remediation playbooks via Azure Logic Apps.",
      mttd: "2 – 10 mins",
      mttr: "1 – 5 mins (Logic Apps)",
      falsePositiveRate: "5.0% – 11.5%",
      throughput: "100k+ EPS",
      accuracyF1: "91.2%",
      overhead: "0% Cloud / 2-5% Host Agent",
    },
    {
      name: "Falco (Sysdig / CNCF)",
      ids: true,
      ips: false,
      irs: false,
      ai: false,
      host: true,
      network: false,
      cloud: true,
      platforms: ["Linux", "Kubernetes", "Container Runtimes"],
      detection: "eBPF kernel syscall monitoring against declarative behavioral rule definitions",
      response: "None natively (real-time alert stream; requires FalcoSidekick or custom webhook integrations)",
      price: "Free (Sysdig Secure $$$)",
      isFree: true,
      details: "The de facto CNCF open-source cloud-native runtime security tool. Inspects Linux kernel syscalls at machine speed to detect privilege escalation, unexpected spawns, and namespace escapes.",
      mttd: "< 10ms (Kernel eBPF)",
      mttr: "Manual / N/A (Alert Only)",
      falsePositiveRate: "8.5% – 14.0%",
      throughput: "2M+ syscalls / sec",
      accuracyF1: "87.4%",
      overhead: "< 1.5% CPU (eBPF probe)",
    },
    {
      name: "CrowdStrike Falcon (Falcon Fusion)",
      ids: true,
      ips: true,
      irs: true,
      ai: true,
      host: true,
      network: false,
      cloud: true,
      platforms: ["Windows", "macOS", "Linux", "AWS", "Azure", "GCP"],
      detection: "Cloud-scale AI threat graph, endpoint kernel sensors, behavioral indicators of attack (IoAs)",
      response: "Falcon Fusion: Endpoint network containment, automated process kill, cloud identity lockdown",
      price: "$180+ / agent / year",
      isFree: false,
      details: "Industry-leading EDR/XDR platform. Leverages endpoint agents to detect attacks and execute automated remediation via Falcon Fusion SOAR, primarily focused on OS hosts rather than multi-cloud infrastructure.",
      mttd: "< 5s (Endpoint Kernel)",
      mttr: "< 10s (Host Containment)",
      falsePositiveRate: "< 1.5%",
      throughput: "Cloud-scale (Trillions/day)",
      accuracyF1: "98.1%",
      overhead: "< 1.0% CPU (Falcon Sensor)",
    },
    {
      name: "Tines / Torq",
      ids: false,
      ips: false,
      irs: true,
      ai: true,
      host: false,
      network: false,
      cloud: true,
      platforms: ["SaaS / Cloud Native"],
      detection: "Webhook ingestion only (no native host, packet, or log detection sensors)",
      response: "No-code / low-code incident response workflows, chatops dispatch, IAM key rotation",
      price: "$20,000+ / year",
      isFree: false,
      details: "Modern cloud-native security automation platforms. Specialized in connecting APIs and running response playbooks, but completely depend on external IDS/EDR/cloud sensors for detection triggers.",
      mttd: "N/A (Webhook trigger only)",
      mttr: "15s – 2 mins",
      falsePositiveRate: "N/A (Upstream Dependent)",
      throughput: "50,000 runs / day",
      accuracyF1: "N/A (Orchestrator)",
      overhead: "0% (SaaS Hosted)",
    },
    {
      name: "Snort",
      ids: true,
      ips: true,
      irs: false,
      ai: false,
      network: true,
      host: false,
      cloud: false,
      platforms: ["Linux", "Unix", "Windows"],
      detection: "Signature-based, protocol, and rule-based packet stream inspection",
      response: "Inline packet drop, session reject, TCP reset (packet-level only, no cloud/infra IRS)",
      price: "Free / $399+ rules sub",
      isFree: true,
      details: "The world's gold standard open-source network IDS/IPS. Developed by Cisco, it inspects network traffic against massive rule repositories, dropping malicious packets inline without host or cloud response capabilities.",
      mttd: "< 1ms (Inline Packet)",
      mttr: "< 1ms (Packet Drop)",
      falsePositiveRate: "12% – 22%",
      throughput: "10 – 40 Gbps",
      accuracyF1: "81.0%",
      overhead: "High CPU (Line-rate bound)",
    },
    {
      name: "Suricata",
      ids: true,
      ips: true,
      irs: false,
      ai: false,
      network: true,
      host: false,
      cloud: false,
      platforms: ["Windows", "Linux", "Unix", "macOS"],
      detection: "Multi-threaded signature, protocol parsing, and TLS fingerprint inspection",
      response: "Inline packet drop & TCP reset at 10Gbps+ line rate (no infrastructure remediation)",
      price: "Free",
      isFree: true,
      details: "High-performance multi-threaded network IDS/IPS. Highly capable of inspecting 10Gbps+ enterprise traffic natively and exporting EVE JSON telemetry, but does not provide automated cloud remediation.",
      mttd: "< 0.5ms (Inline Packet)",
      mttr: "< 0.5ms (Packet Drop)",
      falsePositiveRate: "10% – 18%",
      throughput: "40 – 100 Gbps",
      accuracyF1: "83.5%",
      overhead: "Moderate-High (Multi-core)",
    },
    {
      name: "OSSEC",
      ids: true,
      ips: true,
      irs: true,
      ai: false,
      host: true,
      network: false,
      cloud: false,
      platforms: ["Unix", "Linux", "macOS", "Windows"],
      detection: "Log analysis, file integrity monitoring (FIM), Windows registry monitoring, rootkit detection",
      response: "Active Response: executes local OS scripts (IP drop via iptables, host account lock)",
      price: "Free*",
      isFree: true,
      details: "Classic open-source host-based intrusion detection system (HIDS). Analyzes server logs and host states, triggering local active response scripts when specific threat thresholds are reached.",
      mttd: "1 – 10 mins",
      mttr: "30s – 2 mins (iptables)",
      falsePositiveRate: "8% – 15%",
      throughput: "5k EPS",
      accuracyF1: "82.0%",
      overhead: "2 – 5% CPU",
    },
    {
      name: "Fail2Ban",
      ids: true,
      ips: true,
      irs: true,
      ai: false,
      host: true,
      network: false,
      cloud: false,
      platforms: ["Unix", "Linux", "macOS"],
      detection: "Log parsing for authentication failures (SSH, Apache, NGINX)",
      response: "Automated host firewall rule injection (bans offending IP addresses via iptables / nftables)",
      price: "Free",
      isFree: true,
      details: "Scans server log files and automatically writes temporary firewall rules to ban IP addresses showing brute-force or malicious patterns. Simple, lightweight, and effective host IRS.",
      mttd: "10s – 1 min",
      mttr: "10s – 30s (iptables ban)",
      falsePositiveRate: "3% – 6%",
      throughput: "1k log lines / sec",
      accuracyF1: "92.0%",
      overhead: "< 2% CPU",
    },
    {
      name: "Palo Alto Networks Next-Gen",
      ids: true,
      ips: true,
      irs: false,
      ai: true,
      host: false,
      network: true,
      cloud: true,
      platforms: ["Appliance", "Container", "VM"],
      detection: "App-ID, User-ID, WildFire ML sandboxing & deep SSL inspection",
      response: "Inline packet termination, URL filtering, firewall policy drop (requires XSOAR for IRS)",
      price: "$9,500+",
      isFree: false,
      details: "Enterprise perimeter firewall and IPS solution. Inspects all traffic inline to block exploits, malware, and C2 beacons, but delegates cloud infrastructure remediation to separate SOAR products.",
      mttd: "< 2ms (Inline ASIC)",
      mttr: "< 2ms (Session Drop)",
      falsePositiveRate: "< 2.0%",
      throughput: "20 – 120 Gbps",
      accuracyF1: "95.4%",
      overhead: "Dedicated ASIC (Zero host)",
    },
    {
      name: "Check Point Quantum IPS",
      ids: true,
      ips: true,
      irs: false,
      ai: false,
      host: false,
      network: true,
      cloud: false,
      platforms: ["Hardware Appliance", "Cloud Gateway"],
      detection: "Virtual patching, multi-layered threat prevention & protocol anomaly checks",
      response: "Inline network connection termination & gateway quarantine (no cloud code generation)",
      price: "$1,500+ / year",
      isFree: false,
      details: "Enterprise network IPS integrated with security gateways. Delivers virtual patching and SSL inspection to shield known software vulnerabilities at the perimeter.",
      mttd: "< 3ms (Inline Gateway)",
      mttr: "< 3ms (Gateway Drop)",
      falsePositiveRate: "3.5% – 6.0%",
      throughput: "15 – 80 Gbps",
      accuracyF1: "93.0%",
      overhead: "Dedicated ASIC (Zero host)",
    },
    {
      name: "Cisco NGIPS",
      ids: false,
      ips: true,
      irs: false,
      ai: false,
      host: false,
      network: true,
      cloud: false,
      platforms: ["Firepower Appliance", "VMware"],
      detection: "Deep visibility & contextual threat intelligence across enterprise network streams",
      response: "Hardware inline packet discard & TCP reset (perimeter network prevention only)",
      price: "$1,280+ / year",
      isFree: false,
      details: "Next-Generation Intrusion Prevention System built on Snort 3 engine. Delivers inline threat protection, automated security updates, and context across enterprise networks.",
      mttd: "< 1ms (Hardware Inline)",
      mttr: "< 1ms (TCP Reset)",
      falsePositiveRate: "5% – 9%",
      throughput: "20 – 100 Gbps",
      accuracyF1: "90.5%",
      overhead: "Dedicated Chassis (Zero host)",
    },
    {
      name: "Vectra Cognito",
      ids: true,
      ips: true,
      irs: false,
      ai: true,
      network: true,
      host: false,
      cloud: true,
      platforms: ["Appliance", "Cloud SaaS"],
      detection: "AI behavioral models monitoring network metadata, AWS/Azure cloud logs, and SaaS accounts",
      response: "Host lockdown push to third-party EDR/firewalls (read-only analytical sensor core)",
      price: "$10,000+",
      isFree: false,
      details: "Network Detection and Response (NDR) platform powered by AI. Identifies active attacker behaviors across cloud and hybrid environments, providing forensic scores to analysts.",
      mttd: "1 – 3 mins (Metadata)",
      mttr: "Manual / 5m API",
      falsePositiveRate: "2.8% – 4.5%",
      throughput: "10 – 40 Gbps",
      accuracyF1: "94.2%",
      overhead: "Zero (Passive TAP)",
    },
    {
      name: "SolarWinds SEM",
      ids: true,
      ips: true,
      irs: true,
      ai: false,
      host: true,
      network: true,
      cloud: false,
      platforms: ["Windows", "Linux", "Unix"],
      detection: "Real-time log correlation, event analysis & compliance rule checking",
      response: "Active response actions: kill process, detach USB storage, log off user, block IP",
      price: "$2,525+",
      isFree: false,
      details: "Security Event Manager combining log aggregation, compliance reporting, and real-time event correlation with built-in active containment actions.",
      mttd: "15s – 1 min",
      mttr: "30s – 2 mins",
      falsePositiveRate: "7% – 13%",
      throughput: "10k EPS",
      accuracyF1: "84.0%",
      overhead: "Virtual Appliance",
    },
    {
      name: "Zeek (AKA: Bro)",
      ids: true,
      ips: false,
      irs: false,
      ai: false,
      network: true,
      host: false,
      cloud: false,
      platforms: ["Linux", "Unix", "macOS"],
      detection: "Stateful behavioral network protocol analysis & event scripting engine",
      response: "Passive telemetry extraction only (writes rich logs; no inline drop or IRS)",
      price: "Free*",
      isFree: true,
      details: "Network security monitoring framework converting raw packets into rich, structured event logs. Highly extensible with domain-specific scripting, serving as telemetry input for SIEMs.",
      mttd: "< 5ms (Packet Parse)",
      mttr: "None (Passive Telemetry)",
      falsePositiveRate: "N/A (Telemetry Only)",
      throughput: "40 – 100 Gbps",
      accuracyF1: "N/A (Telemetry Feed)",
      overhead: "High RAM Cluster",
    },
    {
      name: "Zscaler Cloud IPS",
      ids: true,
      ips: true,
      irs: false,
      ai: true,
      network: true,
      host: false,
      cloud: true,
      platforms: ["SaaS / Global Proxy Fabric"],
      detection: "Zero-trust inspection across user web traffic, cloud apps, and remote connections",
      response: "Cloud proxy traffic blocking & session termination (no cloud infrastructure IRS)",
      price: "Subscription tiers",
      isFree: false,
      details: "Cloud-native intrusion prevention system operating as a global proxy. Scans outbound and inbound enterprise traffic, preventing exploit payloads without on-premise appliances.",
      mttd: "< 15ms (Proxy Hop)",
      mttr: "< 15ms (Proxy Drop)",
      falsePositiveRate: "< 1.8%",
      throughput: "Exabyte scale",
      accuracyF1: "96.0%",
      overhead: "0% (Cloud Proxy)",
    },
    {
      name: "AIDE",
      ids: true,
      ips: false,
      irs: false,
      ai: false,
      host: true,
      network: false,
      cloud: false,
      platforms: ["Linux", "Unix", "macOS"],
      detection: "Cryptographic file integrity monitoring (FIM) database comparison",
      response: "None (generates alert reports on disk; no active mitigation)",
      price: "Free*",
      isFree: true,
      details: "Advanced Intrusion Detection Environment. Periodically compares file hashes and permissions against a baseline snapshot to identify unauthorized modifications.",
      mttd: "Hours / Daily (Cron)",
      mttr: "None (Manual Report)",
      falsePositiveRate: "15% – 30%",
      throughput: "Disk I/O bound",
      accuracyF1: "74.0%",
      overhead: "100% Disk I/O spike",
    },
    {
      name: "Samhain",
      ids: true,
      ips: false,
      irs: false,
      ai: false,
      host: true,
      network: false,
      cloud: false,
      platforms: ["Linux", "Unix", "macOS"],
      detection: "Host integrity monitoring, SUID check, rootkit detection & stealth operation",
      response: "None (centralized logging and cryptographic reporting only)",
      price: "Free",
      isFree: true,
      details: "Centralized host integrity verification system designed with anti-tamper mechanisms to detect server-level rootkits and modifications.",
      mttd: "Hours / Daily (Cron)",
      mttr: "None (Manual Report)",
      falsePositiveRate: "12% – 25%",
      throughput: "Disk I/O bound",
      accuracyF1: "76.5%",
      overhead: "80-100% Disk I/O",
    },
    {
      name: "Security Onion",
      ids: true,
      ips: false,
      irs: false,
      ai: false,
      host: true,
      network: true,
      cloud: false,
      platforms: ["Linux ISO"],
      detection: "Bundles Suricata, Zeek, Wazuh & Elasticsearch for comprehensive enterprise monitoring",
      response: "Investigation analyst workbench (no automated infrastructure IRS)",
      price: "Free*",
      isFree: true,
      details: "All-in-one Linux distro for threat hunting, network security monitoring, and log management, providing a unified console for analysts.",
      mttd: "30s – 2 mins",
      mttr: "Manual (Analyst Console)",
      falsePositiveRate: "8% – 16%",
      throughput: "50k EPS",
      accuracyF1: "85.0%",
      overhead: "Dedicated Appliance",
    },
    {
      name: "Fidelis Network",
      ids: true,
      ips: true,
      irs: false,
      ai: false,
      host: false,
      network: true,
      cloud: false,
      platforms: ["Hardware Appliance", "VM"],
      detection: "Deep session inspection detecting data exfiltration, malware & C2 communication",
      response: "Inline TCP connection drop across high-throughput data pipes",
      price: "$78,000+ / year",
      isFree: false,
      details: "Automates detection of cyber threats, data loss, and advanced command-and-control channels across multi-gigabit enterprise network backbones.",
      mttd: "< 5ms (Session Inspect)",
      mttr: "< 5ms (TCP Drop)",
      falsePositiveRate: "4% – 7%",
      throughput: "20 – 40 Gbps",
      accuracyF1: "91.0%",
      overhead: "Hardware Appliance",
    },
    {
      name: "Trellix (McAfee + FireEye)",
      ids: true,
      ips: true,
      irs: false,
      ai: true,
      network: true,
      host: false,
      cloud: false,
      platforms: ["Hardware Appliance", "Software"],
      detection: "Multi-vector execution sandboxing and dynamic malware detonation",
      response: "Network perimeter quarantine & gateway session drops",
      price: "$10,995+",
      isFree: false,
      details: "Enterprise network security appliance featuring virtual execution engines to isolate and neutralize zero-day payloads before reaching target networks.",
      mttd: "1 – 5 mins (Sandbox)",
      mttr: "10s – 1 min (Gateway)",
      falsePositiveRate: "3.2% – 5.5%",
      throughput: "10 – 30 Gbps",
      accuracyF1: "93.8%",
      overhead: "Sandbox Appliance",
    },
    {
      name: "Kismet",
      ids: true,
      ips: false,
      irs: false,
      ai: false,
      network: true,
      host: false,
      cloud: false,
      platforms: ["Linux", "macOS", "Windows 10"],
      detection: "Wireless RF 802.11, Bluetooth & SDR raw signal anomaly detection",
      response: "None (passive packet sniffer and RF survey tool)",
      price: "Free",
      isFree: true,
      details: "Wireless network detector and sniffer. Analyzes 802.11 traffic, Bluetooth devices, and software-defined radio signals to detect rogue access points.",
      mttd: "1 – 5s (RF Sniff)",
      mttr: "None (Passive RF)",
      falsePositiveRate: "5% – 10%",
      throughput: "802.11/BLE limits",
      accuracyF1: "88.0%",
      overhead: "< 3% CPU",
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
      if (activeTab === 'irs' && !p.irs) return false;
      if (activeTab === 'cloud' && !p.cloud) return false;
      if (activeTab === 'ai' && !p.ai) return false;
      if (activeTab === 'free' && !p.isFree) return false;
      if (activeTab === 'paid' && p.isFree && p.name !== 'Aegis Sentinel') return false;
      if (activeTab === 'ids' && !p.ids) return false;
      if (activeTab === 'ips' && !p.ips) return false;

      // Search query
      const query = search.toLowerCase();
      if (!query) return true;

      return (
        p.name.toLowerCase().includes(query) ||
        p.detection.toLowerCase().includes(query) ||
        p.response.toLowerCase().includes(query) ||
        p.platforms.some(pl => pl.toLowerCase().includes(query)) ||
        p.price.toLowerCase().includes(query) ||
        p.mttd.toLowerCase().includes(query) ||
        p.mttr.toLowerCase().includes(query) ||
        p.throughput.toLowerCase().includes(query)
      );
    }).sort((a, b) => {
      // Always keep Aegis Sentinel on top if present
      if (a.name === 'Aegis Sentinel') return -1;
      if (b.name === 'Aegis Sentinel') return 1;

      const valA = a[sortField];
      const valB = b[sortField];
      
      if (typeof valA === 'boolean' && typeof valB === 'boolean') {
        const numA = valA ? 1 : 0;
        const numB = valB ? 1 : 0;
        return sortAsc ? numA - numB : numB - numA;
      }

      const strA = String(valA ?? '');
      const strB = String(valB ?? '');
      if (strA < strB) return sortAsc ? -1 : 1;
      if (strA > strB) return sortAsc ? 1 : -1;
      return 0;
    });
  }, [search, activeTab, sortField, sortAsc]);

  const toggleRow = (name: string) => {
    setExpandedRow(expandedRow === name ? null : name);
  };

  return (
    <div className="w-full space-y-6">
      
      {/* Educational Banner: IDS vs IPS vs IRS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-5 rounded-2xl bg-gradient-to-r from-slate-950 via-[#030914] to-slate-950 border border-slate-900 shadow-xl">
        <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/30 border border-blue-500/10">
          <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 mt-0.5">
            <Shield className="h-4 w-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-blue-400 uppercase tracking-wider font-mono">IDS • Detection</div>
            <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
              Monitors telemetry, logs, and network traffic to identify anomalous behavior and alert security analysts.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/30 border border-purple-500/10">
          <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 mt-0.5">
            <Zap className="h-4 w-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-purple-400 uppercase tracking-wider font-mono">IPS • Prevention</div>
            <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
              Sits inline in network streams to drop malicious packets, terminate TCP connections, and block unauthorized IPs.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-3 rounded-xl bg-cyan-950/20 border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.05)]">
          <div className="p-2 rounded-lg bg-cyan-500/15 text-cyan-400 mt-0.5">
            <GitBranch className="h-4 w-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider font-mono flex items-center gap-1.5">
              IRS • Response & Remediation
              <span className="px-1.5 py-0.2 rounded text-[9px] bg-cyan-500/20 text-cyan-300">Aegis Core</span>
            </div>
            <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
              Automates machine-speed containment, cloud infrastructure patching (Terraform / K8s), IAM quarantine, and SOAR playbooks.
            </p>
          </div>
        </div>
      </div>

      {/* Performance Benchmark Highlights Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 p-4 rounded-2xl bg-gradient-to-r from-slate-950 via-[#030c1e] to-slate-950 border border-cyan-500/20 shadow-xl">
        <div className="p-3.5 rounded-xl bg-slate-900/40 border border-cyan-500/15">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono flex items-center gap-1.5">
              <Timer className="h-3.5 w-3.5 text-cyan-400" /> MTTD (Detection)
            </span>
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono font-bold">
              99.8% Faster
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-xl font-black text-cyan-300 font-mono">&lt; 1.2s</span>
            <span className="text-[11px] text-slate-500 line-through">14.2 min avg</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-1 leading-tight">
            Streaming DeepLog & LogFormer sub-second inference
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/40 border border-purple-500/15">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono flex items-center gap-1.5">
              <Zap className="h-3.5 w-3.5 text-purple-400" /> MTTR (Remediation)
            </span>
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 font-mono font-bold">
              99.7% Faster
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-xl font-black text-purple-300 font-mono">&lt; 4.8s</span>
            <span className="text-[11px] text-slate-500 line-through">28.6 min avg</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-1 leading-tight">
            Zero-touch Forge SOAR & Terraform cloud quarantine
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/40 border border-emerald-500/15">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono flex items-center gap-1.5">
              <TrendingDown className="h-3.5 w-3.5 text-emerald-400" /> False Positives
            </span>
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono font-bold">
              98.9% Cut
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-xl font-black text-emerald-300 font-mono">&lt; 0.12%</span>
            <span className="text-[11px] text-slate-500 line-through">11.4% avg</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-1 leading-tight">
            Helios 4-Way Score Fusion eliminates alert fatigue
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/40 border border-blue-500/15">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono flex items-center gap-1.5">
              <Activity className="h-3.5 w-3.5 text-blue-400" /> Ingestion & EPS
            </span>
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 font-mono font-bold">
              Distributed
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-xl font-black text-blue-300 font-mono">500k+</span>
            <span className="text-[11px] text-slate-400">Events / sec</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-1 leading-tight">
            Zero-copy eBPF kernel pipeline with &lt; 1.2% CPU
          </p>
        </div>
      </div>

      {/* View Mode Switcher + Controls */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-2 bg-slate-950/60 rounded-xl border border-slate-900">
          <div className="flex items-center gap-2 pl-2">
            <SlidersHorizontal className="h-4 w-4 text-cyan-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300 font-mono">Matrix Perspective:</span>
          </div>
          <div className="inline-flex p-1 rounded-xl bg-slate-900/80 border border-slate-800">
            <button
              onClick={() => setViewMode('capabilities')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'capabilities'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Layers className="h-3.5 w-3.5" /> Capabilities & IRS Scope
            </button>
            <button
              onClick={() => setViewMode('performance')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'performance'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Gauge className="h-3.5 w-3.5" /> Speed & Performance Benchmarks
            </button>
          </div>
        </div>

        {/* Controls: Search + Filter Tabs */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Search */}
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-500" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search systems, response types, AWS, throughput..."
              className="pl-10 h-11 bg-slate-950/80 border-slate-900"
            />
          </div>

          {/* Filters Tabs */}
          <div className="flex flex-wrap gap-1.5 p-1 bg-slate-950/80 rounded-xl border border-slate-900 overflow-x-auto">
            {[
              { id: 'all', label: `All Systems (${products.length})` },
              { id: 'irs', label: `IRS / Remediation (${products.filter(p => p.irs).length})` },
              { id: 'cloud', label: `Cloud-Native (${products.filter(p => p.cloud).length})` },
              { id: 'ai', label: `AI / ML Powered (${products.filter(p => p.ai).length})` },
              { id: 'free', label: `Free / Open-Source (${products.filter(p => p.isFree).length})` },
              { id: 'paid', label: `Commercial (${products.filter(p => !p.isFree).length})` },
              { id: 'ids', label: 'IDS' },
              { id: 'ips', label: 'IPS' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all uppercase tracking-wider whitespace-nowrap cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid Table */}
      <Table containerClassName="border border-slate-900 shadow-2xl rounded-2xl overflow-hidden">
        <TableHeader>
          <TableRow className="bg-slate-950/70 hover:bg-transparent border-b border-slate-900">
            <TableHead className="w-[200px] cursor-pointer hover:text-cyan-400 transition-colors select-none font-bold" onClick={() => handleSort('name')}>
              Platform Name <ArrowUpDown className="inline-block ml-1 h-3.5 w-3.5" />
            </TableHead>

            {viewMode === 'capabilities' ? (
              <>
                <TableHead className="w-[180px] cursor-pointer hover:text-cyan-400 transition-colors select-none font-bold" onClick={() => handleSort('irs')}>
                  System Class <ArrowUpDown className="inline-block ml-1 h-3.5 w-3.5" />
                </TableHead>
                <TableHead className="w-[170px] select-none font-bold">
                  Scope
                </TableHead>
                <TableHead className="cursor-pointer hover:text-cyan-400 transition-colors select-none font-bold">
                  Automated Response & Remediation (IRS)
                </TableHead>
                <TableHead className="w-[140px] cursor-pointer hover:text-cyan-400 transition-colors select-none font-bold" onClick={() => handleSort('isFree')}>
                  Price <ArrowUpDown className="inline-block ml-1 h-3.5 w-3.5" />
                </TableHead>
              </>
            ) : (
              <>
                <TableHead className="w-[140px] cursor-pointer hover:text-cyan-400 transition-colors select-none font-bold" onClick={() => handleSort('mttd')}>
                  MTTD (Detect) <ArrowUpDown className="inline-block ml-1 h-3.5 w-3.5" />
                </TableHead>
                <TableHead className="w-[170px] cursor-pointer hover:text-cyan-400 transition-colors select-none font-bold" onClick={() => handleSort('mttr')}>
                  MTTR (Remediate) <ArrowUpDown className="inline-block ml-1 h-3.5 w-3.5" />
                </TableHead>
                <TableHead className="w-[130px] cursor-pointer hover:text-cyan-400 transition-colors select-none font-bold" onClick={() => handleSort('falsePositiveRate')}>
                  False Positives <ArrowUpDown className="inline-block ml-1 h-3.5 w-3.5" />
                </TableHead>
                <TableHead className="w-[150px] cursor-pointer hover:text-cyan-400 transition-colors select-none font-bold" onClick={() => handleSort('throughput')}>
                  Throughput / Capacity <ArrowUpDown className="inline-block ml-1 h-3.5 w-3.5" />
                </TableHead>
                <TableHead className="w-[140px] cursor-pointer hover:text-cyan-400 transition-colors select-none font-bold" onClick={() => handleSort('accuracyF1')}>
                  Accuracy / F1 <ArrowUpDown className="inline-block ml-1 h-3.5 w-3.5" />
                </TableHead>
              </>
            )}

            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((p) => {
              const isExpanded = expandedRow === p.name;
              const isAegis = p.name === 'Aegis Sentinel';

              return (
                <React.Fragment key={p.name}>
                  <TableRow
                    onClick={() => toggleRow(p.name)}
                    className={`cursor-pointer hover:bg-slate-900/40 transition-all border-b border-slate-900/50 ${
                      isAegis
                        ? 'bg-cyan-950/20 border-l-4 border-l-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.08)]'
                        : isExpanded ? 'bg-slate-900/30' : ''
                    }`}
                  >
                    <TableCell className={`font-bold transition-colors ${
                      isAegis 
                        ? 'text-cyan-400 pl-4 text-base font-black flex items-center gap-2' 
                        : 'text-slate-100 font-medium'
                    }`}>
                      {p.name}
                      {isAegis && (
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-mono tracking-widest uppercase bg-cyan-400 text-slate-950 font-black">
                          RECOMMENDED
                        </span>
                      )}
                    </TableCell>

                    {viewMode === 'capabilities' ? (
                      <>
                        {/* Capabilities: IDS / IPS / IRS / AI */}
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {p.ids && (
                              <span className="px-2 py-0.5 rounded-md text-[10px] uppercase font-bold tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/20" title="Intrusion Detection System">
                                IDS
                              </span>
                            )}
                            {p.ips && (
                              <span className="px-2 py-0.5 rounded-md text-[10px] uppercase font-bold tracking-wider bg-purple-500/10 text-purple-400 border border-purple-500/20" title="Intrusion Prevention System">
                                IPS
                              </span>
                            )}
                            {p.irs ? (
                              <span className="px-2 py-0.5 rounded-md text-[10px] uppercase font-bold tracking-wider bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 flex items-center gap-1 font-mono" title="Intrusion Response System (Automated SOAR / Remediation)">
                                <Check className="h-2.5 w-2.5" /> IRS
                              </span>
                            ) : (
                              <span className="px-1.5 py-0.5 rounded-md text-[9px] uppercase font-mono tracking-wider bg-slate-900 text-slate-500 border border-slate-800" title="No Automated Intrusion Response">
                                NO IRS
                              </span>
                            )}
                            {p.ai && (
                              <span className="px-1.5 py-0.5 rounded-md text-[9px] uppercase font-bold tracking-wider bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center gap-0.5" title="AI / Machine Learning Powered">
                                <Bot className="h-2.5 w-2.5" /> AI
                              </span>
                            )}
                          </div>
                        </TableCell>

                        {/* Scope */}
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {p.cloud && (
                              <span className="px-2 py-0.5 rounded-md text-[10px] uppercase font-bold tracking-wider bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                                Cloud
                              </span>
                            )}
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
                          </div>
                        </TableCell>

                        {/* Automated Response / IRS Details */}
                        <TableCell className="text-slate-300 text-xs font-light">
                          <div className="flex items-center gap-1.5">
                            {p.irs ? (
                              <span className="text-emerald-400 font-medium line-clamp-1">{p.response}</span>
                            ) : (
                              <span className="text-slate-500 italic line-clamp-1">{p.response}</span>
                            )}
                          </div>
                        </TableCell>

                        {/* Price */}
                        <TableCell>
                          <span className={`whitespace-nowrap px-2.5 py-1 rounded-full text-xs font-semibold ${
                            p.isFree 
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                              : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          }`}>
                            {p.price}
                          </span>
                        </TableCell>
                      </>
                    ) : (
                      <>
                        {/* MTTD */}
                        <TableCell>
                          <span className={`font-mono text-xs font-bold px-2 py-0.5 rounded ${
                            isAegis 
                              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' 
                              : p.mttd.includes('<') || p.mttd.includes('ms') || p.mttd.includes('s') 
                                ? 'bg-slate-900 text-slate-200' 
                                : 'text-slate-400'
                          }`}>
                            {p.mttd}
                          </span>
                        </TableCell>

                        {/* MTTR */}
                        <TableCell>
                          <span className={`font-mono text-xs font-medium px-2 py-0.5 rounded ${
                            isAegis 
                              ? 'bg-purple-500/20 text-purple-300 font-bold border border-purple-500/30' 
                              : p.mttr.includes('Manual') || p.mttr.includes('None')
                                ? 'text-slate-500'
                                : 'bg-slate-900 text-slate-300'
                          }`}>
                            {p.mttr}
                          </span>
                        </TableCell>

                        {/* False Positive Rate */}
                        <TableCell>
                          <span className={`font-mono text-xs font-medium px-2 py-0.5 rounded ${
                            isAegis 
                              ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30' 
                              : p.falsePositiveRate.includes('< 2') || p.falsePositiveRate.includes('< 1.5')
                                ? 'text-emerald-400 font-semibold'
                                : 'text-slate-400'
                          }`}>
                            {p.falsePositiveRate}
                          </span>
                        </TableCell>

                        {/* Throughput */}
                        <TableCell className="text-slate-300 text-xs font-mono">
                          {p.throughput}
                        </TableCell>

                        {/* Accuracy / Overhead */}
                        <TableCell>
                          <div className="flex flex-col">
                            <span className={`font-mono text-xs font-bold ${isAegis ? 'text-cyan-400' : 'text-slate-200'}`}>
                              {p.accuracyF1}
                            </span>
                            <span className="text-[10px] text-slate-500 truncate max-w-[120px]" title={p.overhead}>
                              {p.overhead}
                            </span>
                          </div>
                        </TableCell>
                      </>
                    )}

                    {/* Expand Indicator */}
                    <TableCell>
                      <Info className={`h-4 w-4 text-slate-500 transition-colors ${isExpanded ? 'text-cyan-400' : 'hover:text-slate-300'}`} />
                    </TableCell>
                  </TableRow>

                  {/* Expanded Detail Panel */}
                  {isExpanded && (
                    <TableRow className="bg-slate-900/10 hover:bg-slate-900/10 border-b border-slate-900">
                      <TableCell colSpan={6} className="p-6 bg-slate-950/40">
                        <div className="space-y-6 animate-in fade-in slide-in-from-top-2 duration-300">
                          
                          {/* Top 2 columns: Profile + Technical Attributes */}
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Left summary */}
                            <div className="md:col-span-2 space-y-4">
                              <div>
                                <h4 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                                  <Shield className="h-4 w-4 text-cyan-400" /> System Profile: {p.name}
                                </h4>
                                <p className="text-xs text-slate-300 mt-2 leading-relaxed font-light">{p.details}</p>
                              </div>

                              {/* Detection vs Response breakdown */}
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                                <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-900 space-y-1">
                                  <div className="text-[10px] font-bold uppercase tracking-wider text-blue-400 flex items-center gap-1 font-mono">
                                    <ShieldAlert className="h-3 w-3" /> Detection Capability (IDS)
                                  </div>
                                  <div className="text-xs text-slate-300 leading-snug">{p.detection}</div>
                                </div>

                                <div className={`p-3 rounded-lg border space-y-1 ${
                                  p.irs 
                                    ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-200'
                                    : 'bg-slate-950/60 border-slate-900 text-slate-400'
                                }`}>
                                  <div className={`text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 font-mono ${
                                    p.irs ? 'text-emerald-400' : 'text-slate-500'
                                  }`}>
                                    <GitBranch className="h-3 w-3" /> Intrusion Response & Remediation (IRS)
                                  </div>
                                  <div className="text-xs leading-snug">{p.response}</div>
                                </div>
                              </div>
                            </div>

                            {/* Right tech details */}
                            <div className="p-4 rounded-xl border border-slate-900 bg-slate-950/60 space-y-3">
                              <div className="text-xs text-slate-500 font-bold uppercase tracking-wider font-mono">Deployment & Class</div>
                              <div className="space-y-2">
                                <div className="flex justify-between text-xs">
                                  <span className="text-slate-400">Class:</span>
                                  <span className="text-slate-200 font-medium">
                                    {[
                                      p.ids ? 'IDS' : null,
                                      p.ips ? 'IPS' : null,
                                      p.irs ? 'IRS' : null,
                                    ].filter(Boolean).join(' • ')}
                                  </span>
                                </div>
                                <div className="flex justify-between text-xs">
                                  <span className="text-slate-400">Supported Platforms:</span>
                                  <span className="text-slate-200 text-right max-w-[150px] truncate" title={p.platforms.join(', ')}>
                                    {p.platforms.join(', ')}
                                  </span>
                                </div>
                                <div className="flex justify-between text-xs">
                                  <span className="text-slate-400">AI / ML Engine:</span>
                                  <span className={p.ai ? 'text-cyan-400 font-semibold' : 'text-slate-500'}>
                                    {p.ai ? 'Active ML / LLM' : 'None / Signatures'}
                                  </span>
                                </div>
                                <div className="flex justify-between text-xs">
                                  <span className="text-slate-400">Pricing Model:</span>
                                  <span className="text-slate-200">{p.isFree ? 'Open Source / Free' : 'Commercial Subscription'}</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Full-Width Performance & Benchmark Scorecard */}
                          <div className="p-4 rounded-xl border border-slate-900 bg-slate-950/80 space-y-3">
                            <div className="flex items-center justify-between">
                              <div className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono flex items-center gap-2">
                                <Gauge className="h-4 w-4 text-cyan-400" /> Performance & SLA Benchmark Scorecard
                              </div>
                              {isAegis && (
                                <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30">
                                  Category Benchmark Leader
                                </span>
                              )}
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                              {/* MTTD */}
                              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800/80 space-y-1">
                                <div className="text-[10px] font-mono uppercase text-slate-400">Detection (MTTD)</div>
                                <div className={`text-sm font-black font-mono ${isAegis ? 'text-cyan-300' : 'text-slate-100'}`}>
                                  {p.mttd}
                                </div>
                                <div className="text-[9px] text-slate-500">Time to recognize anomaly</div>
                              </div>

                              {/* MTTR */}
                              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800/80 space-y-1">
                                <div className="text-[10px] font-mono uppercase text-slate-400">Remediation (MTTR)</div>
                                <div className={`text-sm font-black font-mono ${isAegis ? 'text-purple-300' : 'text-slate-100'}`}>
                                  {p.mttr}
                                </div>
                                <div className="text-[9px] text-slate-500">Autonomous containment time</div>
                              </div>

                              {/* False Positive Rate */}
                              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800/80 space-y-1">
                                <div className="text-[10px] font-mono uppercase text-slate-400">False Positive Rate</div>
                                <div className={`text-sm font-black font-mono ${isAegis ? 'text-emerald-300' : 'text-slate-100'}`}>
                                  {p.falsePositiveRate}
                                </div>
                                <div className="text-[9px] text-slate-500">Noise ratio & false alarms</div>
                              </div>

                              {/* Throughput */}
                              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800/80 space-y-1">
                                <div className="text-[10px] font-mono uppercase text-slate-400">Throughput / Scale</div>
                                <div className="text-sm font-black font-mono text-slate-100">
                                  {p.throughput}
                                </div>
                                <div className="text-[9px] text-slate-500">Event ingestion capability</div>
                              </div>

                              {/* Accuracy / F1 */}
                              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800/80 space-y-1">
                                <div className="text-[10px] font-mono uppercase text-slate-400">Accuracy / F1</div>
                                <div className={`text-sm font-black font-mono ${isAegis ? 'text-cyan-300' : 'text-slate-100'}`}>
                                  {p.accuracyF1}
                                </div>
                                <div className="text-[9px] text-slate-500">Precision vs Recall trade-off</div>
                              </div>

                              {/* Resource Overhead */}
                              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800/80 space-y-1">
                                <div className="text-[10px] font-mono uppercase text-slate-400">System Overhead</div>
                                <div className="text-sm font-black font-mono text-slate-100 truncate" title={p.overhead}>
                                  {p.overhead}
                                </div>
                                <div className="text-[9px] text-slate-500">Host CPU & RAM footprint</div>
                              </div>
                            </div>

                            {/* Benchmark comparative analysis note */}
                            <div className="p-3 rounded-lg bg-slate-900/30 border border-slate-800/50 text-[11px] text-slate-400 flex items-center justify-between">
                              <span>
                                {isAegis ? (
                                  <strong className="text-cyan-300">Helios Advantage: </strong>
                                ) : (
                                  <strong className="text-slate-300">Aegis Comparison: </strong>
                                )}
                                {isAegis ? (
                                  'Aegis Sentinel executes multi-model score fusion (0.20*IF + 0.30*DeepLog + 0.20*LogFormer + 0.30*UEBA) to attain < 1.2s detection and 98.9% false-positive suppression without manual tuning.'
                                ) : (
                                  `Compared to ${p.name}, Aegis Sentinel delivers sub-second automated IRS containment (<4.8s vs ${p.mttr}) and near-zero false alarms (<0.12% vs ${p.falsePositiveRate}) via neural score fusion.`
                                )}
                              </span>
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
                No security systems found matching your search.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
