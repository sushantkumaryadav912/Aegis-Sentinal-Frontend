'use client';

import React from 'react';
import { SectionWrapper } from '@/components/marketing/SectionWrapper';
import { AnimatedContainer } from '@/components/marketing/AnimatedContainer';
import { BentoCard } from '@/components/marketing/BentoGrid';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { 
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
  ArrowRight 
} from 'lucide-react';

export default function ProductsPage() {
  const products = [
    {
      slug: "sentinel-core",
      name: "Sentinel Core",
      subtitle: "Detection Engine",
      tagline: "Cloud Defense Beyond Signatures.",
      icon: <BrainCircuit className="h-6 w-6 text-cyan-400" />,
      desc: "Uses stateful Isolation Forests to identify raw AWS, GCP, and Kubernetes console logins, privilege changes, and exfiltration patterns without signature rules.",
      bgGlow: "rgba(6, 182, 212, 0.03)"
    },
    {
      slug: "watchtower",
      name: "Watchtower",
      subtitle: "Threat Intelligence",
      tagline: "See More. Respond Faster.",
      icon: <Eye className="h-6 w-6 text-red-400" />,
      desc: "Synchronizes threat databases, active CVE alerts, and blacklisted IP hosts with your ingress pipelines to prevent attacks before they breach your assets.",
      bgGlow: "rgba(239, 68, 68, 0.03)"
    },
    {
      slug: "forge",
      name: "Forge",
      subtitle: "SOAR Automation",
      tagline: "From Telemetry to Containment.",
      icon: <GitBranch className="h-6 w-6 text-rose-400" />,
      desc: "Runs logic-based playbooks to quarantine instances, revoke credentials, and block anomalous networks automatically at machine speeds.",
      bgGlow: "rgba(244, 63, 94, 0.03)"
    },
    {
      slug: "pulse",
      name: "Pulse",
      subtitle: "Monitoring & Telemetry",
      tagline: "Behavior-Driven Cloud Security.",
      icon: <Terminal className="h-6 w-6 text-purple-400" />,
      desc: "High-throughput log collector indexing millions of logs per second to provide sub-second hot query times for active security operations teams.",
      bgGlow: "rgba(168, 85, 247, 0.03)"
    },
    {
      slug: "prism",
      name: "Prism",
      subtitle: "Investigation",
      tagline: "Intelligent Detection. Instant Response.",
      icon: <Search className="h-6 w-6 text-blue-400" />,
      desc: "Forensic visualizer mapping structural connection trees between compromised IAM roles, source IPs, targets, and chronological event timelines.",
      bgGlow: "rgba(59, 130, 246, 0.03)"
    },
    {
      slug: "oracle",
      name: "Oracle",
      subtitle: "AI Copilot",
      tagline: "Where AI Meets Cloud Security.",
      icon: <Sparkles className="h-6 w-6 text-cyan-400" />,
      desc: "AI assistant responding to operations queries, summarizing cloud alerts, suggesting Terraform remediations, and writing Forge playbook scripts.",
      bgGlow: "rgba(6, 182, 212, 0.03)"
    },
    {
      slug: "atlas",
      name: "Atlas",
      subtitle: "Executive Dashboard",
      tagline: "Executive Cloud Security Overview",
      icon: <LayoutDashboard className="h-6 w-6 text-emerald-400" />,
      desc: "Single pane of glass summarizing multi-cloud posture, active vulnerabilities, threat mitigation stats, and overall organizational risk distribution.",
      bgGlow: "rgba(16, 185, 129, 0.03)"
    },
    {
      slug: "vault",
      name: "Vault",
      subtitle: "Case Management",
      tagline: "Audit-Ready Forensic Records",
      icon: <FolderLock className="h-6 w-6 text-amber-400" />,
      desc: "Auditable case filing board aggregating multiple alerts into unified incident tickets, documenting assignees, tasks, and historical records.",
      bgGlow: "rgba(245, 158, 11, 0.03)"
    },
    {
      slug: "nexus",
      name: "Nexus",
      subtitle: "Integrations",
      tagline: "Unified Cloud Connection Ecosystem",
      icon: <Network className="h-6 w-6 text-indigo-400" />,
      desc: "Central connector mapping incoming logs and outgoing notifications to AWS, GCP, Slack, JIRA, and PagerDuty in a single dashboard.",
      bgGlow: "rgba(99, 102, 241, 0.03)"
    },
    {
      slug: "command",
      name: "Command",
      subtitle: "Administration",
      tagline: "Global Policy and Access Control",
      icon: <Settings className="h-6 w-6 text-slate-400" />,
      desc: "Global administrator portal managing workspace permissions, log archive retention limits, API authentication keys, and user access policies.",
      bgGlow: "rgba(148, 163, 184, 0.03)"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen relative bg-grid-pattern">
      
      {/* Header */}
      <section className="relative pt-36 pb-16 overflow-hidden max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />
        
        <AnimatedContainer animation="fade-up">
          <span className="text-xs font-bold tracking-widest text-cyan-400 uppercase font-mono">PRODUCT SUITE</span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-100 mt-2 mb-6 tracking-tight">
            Aegis Sentinel Modules
          </h1>
          <p className="text-base text-slate-400 font-light leading-relaxed max-w-2xl mx-auto">
            Consolidate your security logs. Aegis Sentinel bundles next-generation SIEM, AI threat mapping, and active orchestration into a unified security mesh.
          </p>
        </AnimatedContainer>
      </section>

      {/* Grid of 10 Products */}
      <SectionWrapper className="pt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {products.map((prod, idx) => (
            <AnimatedContainer 
              key={prod.slug} 
              animation="fade-up" 
              delay={0.05 * (idx + 1)}
            >
              <BentoCard 
                className="p-6 md:p-8 flex flex-col justify-between h-full hover:border-slate-800 transition-all duration-300"
                style={{
                  boxShadow: `0 0 30px rgba(0, 0, 0, 0.2), inset 0 0 15px ${prod.bgGlow}`,
                }}
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-900 shadow-md">
                      {prod.icon}
                    </div>
                    <div>
                      <span className="text-[9px] font-bold text-cyan-400 tracking-widest uppercase font-mono">{prod.subtitle}</span>
                      <h2 className="text-base font-bold text-slate-100">{prod.name}</h2>
                    </div>
                  </div>
                  
                  <div className="text-[11px] font-semibold text-slate-300 font-mono tracking-wide py-0.5 border-b border-slate-900/60 w-fit">
                    {prod.tagline}
                  </div>

                  <p className="text-xs text-slate-400 font-light leading-relaxed">
                    {prod.desc}
                  </p>
                </div>

                <div className="pt-6">
                  <Link href={`/products/${prod.slug}`}>
                    <Button variant="outline" className="w-full h-10 text-xs tracking-wider uppercase font-bold border-slate-850 text-slate-300 hover:text-white flex items-center justify-center gap-1.5 rounded-xl cursor-pointer">
                      Learn More <ArrowRight size={12} />
                    </Button>
                  </Link>
                </div>
              </BentoCard>
            </AnimatedContainer>
          ))}
        </div>
      </SectionWrapper>
      
      {/* Dynamic comparison callout */}
      <SectionWrapper className="py-20 border-t border-slate-900 bg-slate-950/40 text-center">
         <AnimatedContainer animation="scale-up">
           <h3 className="text-xl md:text-2xl font-bold text-slate-100 mb-4">Compare with Legacy Intrusion Systems</h3>
           <p className="text-sm text-slate-400 mb-8 max-w-xl mx-auto font-light">
             Curious how Aegis Sentinel holds up against standard products like Snort, Suricata, and Palo Alto? Review our live comparison matrix.
           </p>
           <Link href="/#comparison">
             <Button variant="glow" className="text-slate-950 font-extrabold uppercase tracking-wider text-xs px-6 py-2.5 rounded-full">
               View Intrusion Matrix <ArrowRight size={14} className="inline ml-1" />
             </Button>
           </Link>
         </AnimatedContainer>
      </SectionWrapper>

    </div>
  );
}
