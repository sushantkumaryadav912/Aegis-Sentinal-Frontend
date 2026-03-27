import { Database, ShieldCheck, Activity, BrainCircuit } from 'lucide-react';
import { SectionWrapper } from '@/components/marketing/SectionWrapper';
import { AnimatedContainer } from '@/components/marketing/AnimatedContainer';
import { FeatureCard } from '@/components/marketing/FeatureCard';

export const metadata = {
  title: 'Products | CIDR Platform',
  description: 'Comprehensive threat detection, SIEM, and posture management tools.',
};

export default function ProductsPage() {
  const products = [
    {
      icon: <BrainCircuit className="h-8 w-8 text-purple-400" />,
      title: "AI Threat Detection",
      description: "Our Python-based anomaly engine uses Isolation Forests to identify outliers in your cloud access logs, spotting zero-day threats that bypass traditional regex signatures.",
      iconClassName: "bg-purple-500/10 border-purple-500/20 w-16 h-16"
    },
    {
      icon: <Database className="h-8 w-8 text-blue-400" />,
      title: "Cloud-Native SIEM",
      description: "Centralized log aggregation handling high-throughput AWS CloudTrail and GCP Audit pipelines. Analyze terabytes of logs in seconds with comprehensive filtering.",
      iconClassName: "bg-blue-500/10 border-blue-500/20 w-16 h-16"
    },
    {
      icon: <ShieldCheck className="h-8 w-8 text-green-400" />,
      title: "Posture Management (CSPM)",
      description: "Continuously scan your infrastructure for misconfigurations, open IAM permissions, and exposed buckets. Stay SOC 2 and ISO 27001 compliant automatically.",
      iconClassName: "bg-green-500/10 border-green-500/20 w-16 h-16"
    },
    {
      icon: <Activity className="h-8 w-8 text-cyan-400" />,
      title: "Automated SOAR",
      description: "Build logic-driven playbooks utilizing our execution orchestrator. Isolate rogue EC2 instances or suspend compromised AWS roles instantly upon verified alert.",
      iconClassName: "bg-cyan-500/10 border-cyan-500/20 w-16 h-16"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Header */}
      <section className="relative pt-32 pb-16 overflow-hidden mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        {/* Glow */}
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-purple-900/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="text-center relative z-10 max-w-4xl mx-auto">
          <AnimatedContainer animation="fade-up">
            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-100 tracking-tight mb-6">
              Our Products
            </h1>
            <p className="text-xl text-slate-400 font-light leading-relaxed">
              De-silo your security operations. CIDR bundles next-gen SIEM, Threat Detection, and Response Automation into a single, cohesive engine.
            </p>
          </AnimatedContainer>
        </div>
      </section>

      {/* Bento Grid */}
      <SectionWrapper className="pt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
           {products.map((product, idx) => (
              <AnimatedContainer key={idx} animation="scale-up" delay={idx * 0.1}>
                 <FeatureCard 
                    {...product} 
                    className="p-4"
                 />
              </AnimatedContainer>
           ))}
        </div>
      </SectionWrapper>
      
      {/* Footer text */}
      <SectionWrapper className="py-20 border-t border-slate-900 bg-slate-900/10 text-center">
         <AnimatedContainer animation="fade-in">
           <p className="text-slate-400 font-medium">All products are natively integrated into the core dashboard.</p>
         </AnimatedContainer>
      </SectionWrapper>

    </div>
  );
}
