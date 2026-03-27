import { AlertTriangle, Workflow, BrainCircuit, Activity, LineChart, Lock } from 'lucide-react';
import Image from 'next/image';
import { SectionWrapper } from '@/components/marketing/SectionWrapper';
import { AnimatedContainer } from '@/components/marketing/AnimatedContainer';
import { FeatureCard } from '@/components/marketing/FeatureCard';
import { ArchitectureDiagram } from '@/components/marketing/ArchitectureDiagram';
import { CTAButton } from '@/components/marketing/CTAButton';
import { PricingCard } from '@/components/marketing/PricingCard';

export const metadata = {
  title: 'CIDR | Intelligent Cloud Security Operations',
  description: 'AI-powered cloud threat detection and response platform.',
};

export default function MarketingHome() {
  const features = [
    {
      icon: <BrainCircuit className="h-6 w-6 text-purple-400" />,
      title: "Python Anomaly Engine",
      description: "Detect zero-day threats and complex attack vectors using isolation forests, behavioral profiling, and time-series clustering.",
      iconClassName: "bg-purple-500/10 border-purple-500/20"
    },
    {
      icon: <Activity className="h-6 w-6 text-blue-400" />,
      title: "Real-time Multi-Cloud Logs",
      description: "Seamlessly ingest high-volume telemetry from AWS CloudTrail, GCP Audit Logs, and Azure Monitor with sub-second latency.",
      iconClassName: "bg-blue-500/10 border-blue-500/20"
    },
    {
      icon: <Workflow className="h-6 w-6 text-amber-400" />,
      title: "Automated Remediation",
      description: "Trigger customizable playbooks to block IPs, isolate instances, or revoke IAM privileges instantly upon high-risk alerts.",
      iconClassName: "bg-amber-500/10 border-amber-500/20"
    },
    {
      icon: <AlertTriangle className="h-6 w-6 text-rose-400" />,
      title: "Dynamic Risk Scoring",
      description: "Consolidate thousands of raw logs into high-fidelity, confidence-scored alerts with full forensic context.",
      iconClassName: "bg-rose-500/10 border-rose-500/20"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-150 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-blue-900/20 via-slate-950/0 to-transparent pointer-events-none" />
        <div className="absolute top-1/4 right-0 w-125 h-125 bg-cyan-900/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 left-0 w-100 h-100 bg-blue-900/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="text-center relative z-10 max-w-5xl mx-auto">
          <AnimatedContainer animation="fade-up" delay={0.1}>
            <div className="inline-flex items-center px-4 py-2 rounded-full border border-slate-800 bg-slate-900/50 backdrop-blur-md text-slate-300 text-sm mb-8 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></span>
              v1.0 is live • Started March 2026
            </div>
          </AnimatedContainer>

          <AnimatedContainer animation="fade-up" delay={0.2}>
            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-100 tracking-tight mb-8 leading-tight">
              Cloud Incident Detection & <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-cyan-400 to-blue-500">
                Response Platform
              </span>
            </h1>
          </AnimatedContainer>

          <AnimatedContainer animation="fade-up" delay={0.3}>
            <p className="text-xl md:text-2xl text-slate-400 mb-10 max-w-3xl mx-auto font-light leading-relaxed">
              Consolidate multi-cloud logs, detect anomalies with advanced machine learning, and automate security operations all from a unified dashboard.
            </p>
          </AnimatedContainer>

          <AnimatedContainer animation="fade-up" delay={0.4} className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6">
             <CTAButton href="/register" size="lg" className="w-full sm:w-auto h-14 px-8 text-lg" withArrow>
               Start Securing Now
             </CTAButton>
             <CTAButton href="/products" variant="outline" size="lg" className="w-full sm:w-auto h-14 px-8 border-slate-700 bg-transparent hover:bg-slate-800 text-slate-200 text-lg">
               Explore Architecture
             </CTAButton>
          </AnimatedContainer>

          {/* System Stats Preview */}
          <AnimatedContainer animation="fade-up" delay={0.6} className="mt-20 border-t border-slate-800/50 pt-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-in fade-in duration-700">
               {[
                 { label: "Logs Processed/sec", val: "100k+" },
                 { label: "Detection Latency", val: "<500ms" },
                 { label: "Threats Mitigated", val: "2.4M" },
                 { label: "Remediation Time", val: "Instant" }
               ].map((stat, i) => (
                 <div key={i} className="flex flex-col items-center">
                   <span className="text-3xl font-bold text-slate-100 mb-1 tracking-tight">{stat.val}</span>
                   <span className="text-sm text-slate-500 font-medium">{stat.label}</span>
                 </div>
               ))}
            </div>
          </AnimatedContainer>
        </div>
      </section>

      {/* Overview / Architecture Section */}
      <SectionWrapper className="bg-slate-950 border-t border-slate-900 overflow-visible">
        <AnimatedContainer animation="fade-in" delay={0.1} className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-100 mb-6 tracking-tight">How CIDR Works</h2>
          <p className="text-lg text-slate-400">
            An end-to-end pipeline designed for scale, speed, and accuracy. From raw cloud telemetry to automated incident resolution.
          </p>
        </AnimatedContainer>
        
        <ArchitectureDiagram />
      </SectionWrapper>

      {/* Features Grid */}
      <SectionWrapper className="bg-slate-950 relative z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-150 bg-slate-900/50 blur-[150px] rounded-full pointer-events-none -z-10" />
        
        <AnimatedContainer animation="fade-up" className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-100 mb-6 tracking-tight">Enterprise Defense Toolkit</h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            A complete suite of tools replacing fragmented legacy SIEMs with an AI-first approach.
          </p>
        </AnimatedContainer>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {features.map((feature, idx) => (
             <AnimatedContainer key={idx} animation="scale-up" delay={idx * 0.1}>
               <FeatureCard {...feature} />
             </AnimatedContainer>
          ))}
        </div>
      </SectionWrapper>

      {/* Integration Logos pseudo-section */}
      <SectionWrapper className="py-16 border-y border-slate-800/40 bg-slate-900/10">
        <div className="text-center">
           <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-8">Natively integrated with</p>
           <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12 mt-4">
              
              {/* Left Surroundings */}
              <div className="flex flex-col items-center gap-1 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                 <span className="text-lg font-bold text-slate-300">Microsoft Azure</span>
                 <span className="text-[8px] uppercase tracking-widest text-slate-400 font-bold bg-slate-800/80 px-1.5 py-px rounded-xs">Available Soon</span>
              </div>

              {/* Core Center */}
              <div className="flex items-center gap-8 md:gap-12 mx-2 md:mx-6">
                 <span className="text-3xl md:text-5xl font-extrabold text-slate-100 tracking-tight">AWS</span>
                 <span className="text-3xl md:text-5xl font-extrabold text-slate-100 tracking-tight">Google Cloud</span>
              </div>
              
              {/* Right Surroundings */}
              <div className="flex items-center gap-6 md:gap-10 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                 <div className="flex flex-col items-center gap-1">
                    <span className="text-lg font-bold text-slate-300">Kubernetes</span>
                    <span className="text-[8px] uppercase tracking-widest text-slate-400 font-bold bg-slate-800/80 px-1.5 py-px rounded-xs">Available Soon</span>
                 </div>
                 <div className="flex flex-col items-center gap-1">
                    <span className="text-lg font-bold text-slate-300">Okta</span>
                    <span className="text-[8px] uppercase tracking-widest text-slate-400 font-bold bg-slate-800/80 px-1.5 py-px rounded-xs">Available Soon</span>
                 </div>
              </div>

           </div>
        </div>
      </SectionWrapper>

      {/* Pricing Preview */}
      <SectionWrapper className="bg-slate-950">
        <AnimatedContainer animation="fade-up" className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-100 mb-6 tracking-tight">Transparent Scaling</h2>
          <p className="text-lg text-slate-400">
            Start protecting your environment today. Upgrade as your data gravity increases.
          </p>
        </AnimatedContainer>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <AnimatedContainer animation="slide-in-left" delay={0.2}>
            <PricingCard 
              tier={{
                name: "Developer Starter",
                price: "Free",
                description: "Perfect for personal projects and small prototypes.",
                features: ["1 Cloud Account", "1,000 logs/day", "7-day retention", "Basic rule-based alerts"],
                ctaText: "Start for Free",
                ctaHref: "/register",
                isPopular: false
              }}
            />
          </AnimatedContainer>
          <AnimatedContainer animation="slide-in-right" delay={0.3}>
            <PricingCard 
              tier={{
                name: "Pro Infrastructure",
                price: "₹49,999",
                description: "Full protection for growing startups and mid-market.",
                features: ["Up to 10 Cloud Accounts", "Unlimited ingestion", "90-day retention", "Python AI Engine enabled", "Automated Remediation"],
                ctaText: "Upgrade to Pro",
                ctaHref: "/pricing",
                isPopular: true
              }}
            />
          </AnimatedContainer>
        </div>
      </SectionWrapper>

      {/* Final CTA */}
      <SectionWrapper className="border-t border-slate-900 relative">
        <div className="absolute inset-0 bg-slate-900/20 mask-[linear-gradient(to_bottom,transparent,black)] pointer-events-none" />
        <AnimatedContainer animation="scale-up" className="max-w-4xl mx-auto">
          <div className="relative rounded-3xl border border-blue-500/20 bg-slate-900/60 p-10 md:p-16 text-center overflow-hidden shadow-2xl backdrop-blur-md">
             <div className="absolute inset-0 bg-linear-to-r from-blue-600/10 to-cyan-500/10 z-0" />
             <div className="relative z-10">
               <Image src="/logo.png" alt="CIDR Logo" width={64} height={64} className="h-16 w-16 object-contain mx-auto mb-6 opacity-80" />
               <h2 className="text-3xl md:text-5xl font-bold text-slate-100 mb-6 tracking-tight">
                 Ready to secure your cloud?
               </h2>
               <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto font-light">
                 Deploy the CIDR agent, connect your cloud APIs, and see your first automated risk assessment within minutes.
               </p>
               <CTAButton href="/register" size="lg" className="h-14 px-10 text-lg shadow-[0_0_40px_rgba(59,130,246,0.5)]">
                 Create Free Account
               </CTAButton>
             </div>
          </div>
        </AnimatedContainer>
      </SectionWrapper>

    </div>
  );
}
