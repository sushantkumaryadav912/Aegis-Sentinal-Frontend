import { AlertTriangle, Workflow, BrainCircuit, Activity, LineChart, Lock, ChevronRight, Server, Shield, Terminal } from 'lucide-react';
import Image from 'next/image';
import { SectionWrapper } from '@/components/marketing/SectionWrapper';
import { AnimatedContainer } from '@/components/marketing/AnimatedContainer';
import { FeatureCard } from '@/components/marketing/FeatureCard';
import { ThreatRadar } from '@/components/marketing/ThreatRadar';
import { ScrollPipeline } from '@/components/marketing/ScrollPipeline';
import { BentoGrid, BentoCard } from '@/components/marketing/BentoGrid';
import { IDSComparisonTable } from '@/components/marketing/IDSComparisonTable';
import { OrbitDiagram } from '@/components/marketing/OrbitDiagram';
import { CountUpStat } from '@/components/marketing/CountUpStat';
import { ShimmerButton } from '@/components/marketing/ShimmerButton';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata = {
  title: 'Aegis Sentinel | Autonomous Cloud Security Operations Center',
  description: 'AI-powered cloud threat detection, intrusion comparison, and response pipeline.',
};

export default function MarketingHome() {
  return (
    <div className="flex flex-col min-h-screen relative bg-grid-pattern">
      
      {/* Hero Section */}
      <section className="relative pt-36 pb-20 md:pt-48 md:pb-28 overflow-hidden w-full min-h-[90vh] flex flex-col justify-center border-b border-slate-900 bg-radial-gradient-glow">
        <ThreatRadar />
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center relative z-10">
          
          <AnimatedContainer animation="fade-up" delay={0.1}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-950/20 text-cyan-400 text-xs font-mono font-bold tracking-wider mb-8 shadow-[0_0_15px_rgba(0,229,255,0.05)]">
              <span className="flex h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping"></span>
              SEC OPS RADAR ACTIVE • MARCH 2026 RELEASE
            </div>
          </AnimatedContainer>

          <AnimatedContainer animation="fade-up" delay={0.2}>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-slate-100 tracking-tight mb-8 leading-[1.1] max-w-5xl mx-auto">
              Autonomous Cloud Incident <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-500">
                Detection & Response
              </span>
            </h1>
          </AnimatedContainer>

          <AnimatedContainer animation="fade-up" delay={0.3}>
            <p className="text-lg md:text-xl text-slate-400 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
              Consolidate multi-cloud telemetry, isolate anomalies with stateful machine learning, and trigger automated response playbooks from a single, high-fidelity operations console.
            </p>
          </AnimatedContainer>

          <AnimatedContainer animation="fade-up" delay={0.4} className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6">
             <ShimmerButton href="/register" className="w-full sm:w-auto text-xs tracking-wider uppercase font-black px-8 h-12">
               Deploy Sensor Agent
             </ShimmerButton>
             <Link href="/products" className="w-full sm:w-auto">
               <Button variant="outline" className="w-full sm:w-auto h-12 px-8 text-xs font-bold tracking-wider uppercase border-slate-800 text-slate-300 hover:text-white">
                 Explore Product Suite
               </Button>
             </Link>
          </AnimatedContainer>

          {/* Stats Bar */}
          <AnimatedContainer animation="fade-up" delay={0.5} className="mt-20 border-t border-slate-900/60 pt-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
               <CountUpStat label="Telemetry Latency" value="<500ms" />
               <CountUpStat label="Daily Ingestion" value="100k+" />
               <CountUpStat label="Threats Quarantined" value="2.4M" />
               <CountUpStat label="Remediation Time" value="Instant" />
            </div>
          </AnimatedContainer>
        </div>
      </section>

      {/* Pipeline Workflow Section */}
      <SectionWrapper className="bg-slate-950/60 border-b border-slate-900 relative">
        <div className="absolute top-1/2 left-0 right-0 h-96 bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="text-center mb-16 max-w-3xl mx-auto relative z-10">
          <span className="text-xs font-bold tracking-widest text-cyan-400 uppercase font-mono">AUTOMATED PIPELINE</span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-100 mt-2 mb-6 tracking-tight">How Aegis Sentinel Secures You</h2>
          <p className="text-base text-slate-400 font-light leading-relaxed">
            From multi-cloud logs to live response scripts. A security operations cycle designed for machine-level speeds.
          </p>
        </div>
        
        <ScrollPipeline />
      </SectionWrapper>

      {/* Asymmetric Bento Grid Features */}
      <SectionWrapper className="bg-slate-950 border-b border-slate-900">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="text-xs font-bold tracking-widest text-cyan-400 uppercase font-mono">CORE DEFENSES</span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-100 mt-2 mb-6 tracking-tight">System Toolkit</h2>
          <p className="text-base text-slate-400 font-light">
            Modern, consolidated modules replacing fragmented legacy monitoring panels.
          </p>
        </div>

        <BentoGrid>
          {/* Large Main Bento Card */}
          <BentoCard className="md:col-span-2 md:row-span-2 p-8 flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-[80px] pointer-events-none" />
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                <BrainCircuit className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-100">Behavioral Python Anomaly Engine</h3>
              <p className="text-sm text-slate-400 font-light leading-relaxed max-w-lg">
                Detect advanced threats, privilege escalation vectors, and data exfiltration patterns. By clustering multi-dimensional user logs using stateful Isolation Forests, Aegis Sentinel points out true anomalies instead of static signature-matched warnings.
              </p>
            </div>

            {/* Anomaly Cluster Visualization */}
            <div className="relative h-48 w-full bg-slate-950/50 border border-slate-900/60 rounded-2xl overflow-hidden flex items-center justify-center my-6">
              <div className="absolute inset-0 bg-grid-pattern opacity-30" />
              <div className="absolute w-36 h-36 rounded-full border border-cyan-500/20 bg-cyan-500/5 animate-ping" style={{ animationDuration: '3s' }} />
              
              <svg className="w-full h-full relative z-10" viewBox="0 0 400 200">
                {/* Connection lines */}
                <line x1="120" y1="80" x2="150" y2="110" stroke="rgba(6, 182, 212, 0.2)" strokeWidth="1" />
                <line x1="150" y1="110" x2="180" y2="70" stroke="rgba(6, 182, 212, 0.2)" strokeWidth="1" />
                <line x1="180" y1="70" x2="130" y2="60" stroke="rgba(6, 182, 212, 0.2)" strokeWidth="1" />
                <line x1="130" y1="60" x2="120" y2="80" stroke="rgba(6, 182, 212, 0.2)" strokeWidth="1" />
                <line x1="150" y1="110" x2="130" y2="60" stroke="rgba(6, 182, 212, 0.2)" strokeWidth="1" />

                {/* Normal Inlier Nodes */}
                <circle cx="120" cy="80" r="4" className="fill-cyan-400 animate-pulse" />
                <circle cx="150" cy="110" r="5" className="fill-cyan-400" />
                <circle cx="180" cy="70" r="4.5" className="fill-cyan-500 animate-pulse" style={{ animationDelay: '0.5s' }} />
                <circle cx="130" cy="60" r="3.5" className="fill-cyan-400" />
                <circle cx="160" cy="90" r="4" className="fill-cyan-500 animate-pulse" style={{ animationDelay: '1s' }} />

                {/* Anomaly 1 */}
                <g className="animate-pulse">
                  <circle cx="310" cy="130" r="6" className="fill-rose-500" />
                  <circle cx="310" cy="130" r="12" className="stroke-rose-500/30 fill-none stroke-1 animate-ping" style={{ animationDuration: '2s' }} />
                  <line x1="310" y1="130" x2="180" y2="70" stroke="rgba(244, 63, 94, 0.15)" strokeWidth="1.5" strokeDasharray="3 3" />
                  <text x="325" y="134" className="fill-rose-400 font-mono text-[9px] font-bold">Anomaly (Score: 0.94)</text>
                </g>

                {/* Anomaly 2 */}
                <g className="animate-pulse" style={{ animationDelay: '0.8s' }}>
                  <circle cx="280" cy="40" r="5" className="fill-rose-500" />
                  <circle cx="280" cy="40" r="10" className="stroke-rose-500/30 fill-none stroke-1 animate-ping" style={{ animationDuration: '2.5s' }} />
                  <line x1="280" y1="40" x2="180" y2="70" stroke="rgba(244, 63, 94, 0.15)" strokeWidth="1.5" strokeDasharray="3 3" />
                  <text x="295" y="44" className="fill-rose-400 font-mono text-[9px] font-bold">Anomaly (Score: 0.88)</text>
                </g>
                
                {/* Label */}
                <text x="110" y="40" className="fill-cyan-400 font-mono text-[9px] font-bold tracking-wider">Inlier Cluster</text>
              </svg>
            </div>

            <div className="flex flex-wrap gap-2 pt-6">
              {["Isolation Forests", "Behavior Clusters", "Forensics context"].map((tag) => (
                <span key={tag} className="px-3 py-1 rounded-md text-[10px] uppercase font-bold tracking-wider font-mono bg-slate-950 text-slate-400 border border-slate-900">
                  {tag}
                </span>
              ))}
            </div>
          </BentoCard>

          {/* Bento Card 2 */}
          <BentoCard className="p-8 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <Workflow className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-100">Response Playbooks</h3>
              <p className="text-xs text-slate-400 font-light leading-relaxed">
                Connect logic-based containment workflows to quarantine servers, block IP addresses, or revoke API access.
              </p>
            </div>
            <span className="text-[10px] text-purple-400 font-mono font-bold tracking-widest uppercase">SOAR INTEGRATED</span>
          </BentoCard>

          {/* Bento Card 3 */}
          <BentoCard className="p-8 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-100">Dynamic Risk Profiles</h3>
              <p className="text-xs text-slate-400 font-light leading-relaxed">
                Automatically aggregate alerts into a single unified risk score. Focus on what is critical.
              </p>
            </div>
            <span className="text-[10px] text-rose-400 font-mono font-bold tracking-widest uppercase">DYNAMIC CONFIDENCE</span>
          </BentoCard>
        </BentoGrid>
      </SectionWrapper>

      {/* Integration Ecosystem Orbit */}
      <SectionWrapper className="bg-slate-950 border-b border-slate-900">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          <div className="space-y-6 text-left">
            <span className="text-xs font-bold tracking-widest text-cyan-400 uppercase font-mono">ECOSYSTEM CONNECT</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-100 tracking-tight leading-tight">
              Integrated Directly into your Cloud Node
            </h2>
            <p className="text-base text-slate-400 font-light leading-relaxed">
              Aegis Sentinel hooks directly to standard public APIs and container grids. No bulky agents, no performance lags, no complicated configurations.
            </p>
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <div className="w-5 h-5 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-[10px] text-cyan-400 font-bold">✓</div>
                <span>AWS CloudTrail log ingestion</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <div className="w-5 h-5 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-[10px] text-cyan-400 font-bold">✓</div>
                <span>Google Cloud Logging integrations</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <div className="w-5 h-5 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-[10px] text-cyan-400 font-bold">✓</div>
                <span>Docker & Kubernetes activity telemetry</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <OrbitDiagram />
          </div>
        </div>
      </SectionWrapper>

      {/* IDS/IPS/IRS Comparison Section */}
      <SectionWrapper className="bg-[#02050c] border-b border-slate-900" id="comparison">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="text-xs font-bold tracking-widest text-cyan-400 uppercase font-mono">INTELLIGENCE & RESPONSE MATRIX</span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-100 mt-2 mb-6 tracking-tight">IDS / IPS / IRS Comparison</h2>
          <p className="text-base text-slate-400 font-light leading-relaxed">
            Review capabilities, deployment scopes, automated intrusion response (IRS / SOAR), platforms, and pricing across 26 security systems compared directly with Aegis Sentinel.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <IDSComparisonTable />
        </div>
      </SectionWrapper>

      {/* Transparent Scaling Pricing */}
      <SectionWrapper className="bg-slate-950 border-b border-slate-900">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="text-xs font-bold tracking-widest text-cyan-400 uppercase font-mono">PRICING TIERS</span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-100 mt-2 mb-6 tracking-tight">Simple Pricing</h2>
          <p className="text-base text-slate-400 font-light leading-relaxed">
            Select the baseline that fits your cloud data volume. Start free, scale as resources expand.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Card 1 */}
          <BentoCard className="p-8 flex flex-col justify-between border-slate-900 bg-slate-950/20">
            <div className="space-y-4">
              <span className="text-xs font-mono font-bold tracking-widest text-slate-400 uppercase">Starter</span>
              <div className="text-3xl font-extrabold text-slate-100">Free</div>
              <p className="text-xs text-slate-400 font-light leading-relaxed">Evaluation and personal pipelines.</p>
              <ul className="space-y-2.5 pt-4 text-xs text-slate-300 font-light">
                <li className="flex items-center gap-2">✓ 1 Connected Cloud Account</li>
                <li className="flex items-center gap-2">✓ 10,000 log events/month</li>
                <li className="flex items-center gap-2">✓ 7-day log archives</li>
                <li className="flex items-center gap-2 text-slate-600">✗ Python ML Engine disabled</li>
              </ul>
            </div>
            <Link href="/register" className="pt-8 block">
              <Button variant="outline" className="w-full text-xs tracking-wider uppercase font-bold">Deploy Free</Button>
            </Link>
          </BentoCard>

          {/* Card 2 */}
          <BentoCard className="p-8 flex flex-col justify-between border-cyan-500/20 bg-slate-900/30 relative">
            <div className="absolute top-4 right-4 px-2 py-0.5 rounded-md text-[9px] uppercase font-black tracking-wider bg-cyan-500 text-slate-950">RECOMMENDED</div>
            <div className="space-y-4">
              <span className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase">Pro Operations</span>
              <div className="text-3xl font-extrabold text-slate-100">₹49,999<span className="text-xs text-slate-500 font-light"> / mo</span></div>
              <p className="text-xs text-slate-400 font-light leading-relaxed">Full scale security for growing operations.</p>
              <ul className="space-y-2.5 pt-4 text-xs text-slate-300 font-light">
                <li className="flex items-center gap-2">✓ Up to 25 Cloud Accounts</li>
                <li className="flex items-center gap-2">✓ 10M log events/month</li>
                <li className="flex items-center gap-2">✓ 90-day hot log analytics</li>
                <li className="flex items-center gap-2">✓ Python ML Anomaly Engine</li>
                <li className="flex items-center gap-2">✓ Automated SOAR actions</li>
              </ul>
            </div>
            <Link href="/register" className="pt-8 block">
              <Button variant="glow" className="w-full text-xs tracking-wider uppercase font-extrabold text-slate-950">Start 14-Day Trial</Button>
            </Link>
          </BentoCard>

          {/* Card 3 */}
          <BentoCard className="p-8 flex flex-col justify-between border-slate-900 bg-slate-950/20">
            <div className="space-y-4">
              <span className="text-xs font-mono font-bold tracking-widest text-slate-400 uppercase">Enterprise</span>
              <div className="text-3xl font-extrabold text-slate-100">Custom</div>
              <p className="text-xs text-slate-400 font-light leading-relaxed">Custom storage and custom quotas.</p>
              <ul className="space-y-2.5 pt-4 text-xs text-slate-300 font-light">
                <li className="flex items-center gap-2">✓ Unlimited Cloud Accounts</li>
                <li className="flex items-center gap-2">✓ Custom logs ingestion quota</li>
                <li className="flex items-center gap-2">✓ 1-Year cold compliance storage</li>
                <li className="flex items-center gap-2">✓ VPC Private Hosting</li>
                <li className="flex items-center gap-2">✓ 24/7 Dedicated Incident Engineer</li>
              </ul>
            </div>
            <Link href="/contact" className="pt-8 block">
              <Button variant="outline" className="w-full text-xs tracking-wider uppercase font-bold">Contact Sales</Button>
            </Link>
          </BentoCard>
        </div>
      </SectionWrapper>

      {/* Call To Action */}
      <SectionWrapper className="bg-[#03060f] relative overflow-hidden py-24 bg-dot-pattern">
        <div className="absolute inset-0 bg-radial-gradient-glow pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10 px-4">
          <Image src="/logo.png" alt="Aegis Sentinel Logo" width={64} height={64} className="h-16 w-16 object-contain mx-auto mb-8 opacity-80" />
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-100 mb-6 tracking-tight">
            Ready to secure your cloud node?
          </h2>
          <p className="text-base text-slate-400 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            Ingest your logs and let the Isolation Forest analyze anomalies. Create your free developer account in under 3 minutes.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <ShimmerButton href="/register" className="w-full sm:w-auto px-10 text-xs tracking-wider uppercase font-black">
              Start Free Trial
            </ShimmerButton>
            <Link href="/contact" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full sm:w-auto h-12 px-8 border-slate-800 text-slate-300 hover:text-white text-xs font-bold tracking-wider uppercase">
                Speak to Engineer
              </Button>
            </Link>
          </div>
        </div>
      </SectionWrapper>

    </div>
  );
}
