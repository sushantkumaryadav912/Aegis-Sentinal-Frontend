import { Users, Target, Rocket, Shield, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { SectionWrapper } from '@/components/marketing/SectionWrapper';
import { AnimatedContainer } from '@/components/marketing/AnimatedContainer';
import { BentoCard } from '@/components/marketing/BentoGrid';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata = {
  title: 'About | Aegis Sentinel Operations',
  description: 'Learn about the cloud security operations team behind Aegis Sentinel.',
};

export default function AboutPage() {
  const values = [
    {
      icon: <Target className="h-6 w-6 text-cyan-400" />,
      title: "Precision Security",
      desc: "Security should not mean drowning in false alerts. We isolate actual behavioral anomalies using custom Isolation Forest pipelines."
    },
    {
      icon: <Rocket className="h-6 w-6 text-purple-400" />,
      title: "Machine Containment",
      desc: "Public infrastructure changes in milliseconds. Our SOAR automated playbooks act just as fast to defend your resources."
    },
    {
      icon: <Users className="h-6 w-6 text-emerald-400" />,
      title: "Security Ergonomics",
      desc: "Designed from first principles for security analysts. Clean APIs, CLI integrations, and structured data diagnostics."
    }
  ];

  const team = [
    { name: "Sushant Kumar Yadav", role: "Security Architect", institution: "SIT Pune", image: "https://ui-avatars.com/api/?name=Sushant+Kumar+Yadav&size=256&background=0D8ABC&color=fff", linkedin: "https://www.linkedin.com/in/sushantkumaryadav/" },
    { name: "Nihil Pandit", role: "Systems Engineer", institution: "SIT Pune", image: "https://ui-avatars.com/api/?name=Nihil+Pandit&size=256&background=10B981&color=fff", linkedin: "https://www.linkedin.com/in/nihil-pandit-321192305/" },
    { name: "Harsh Trivedi", role: "Infrastructure Architect", institution: "SIT Pune", image: "https://ui-avatars.com/api/?name=Harsh+Trivedi&size=256&background=F59E0B&color=fff", linkedin: "https://www.linkedin.com/in/harsh-trivedi-a59609216/" },
    { name: "Dev Vachhani", role: "Telemetry Architect", institution: "SIT Pune", image: "https://ui-avatars.com/api/?name=Dev+Vachhani&size=256&background=8B5CF6&color=fff", linkedin: "https://www.linkedin.com/in/dev-vachhani-21630931a/" }
  ];

  return (
    <div className="flex flex-col min-h-screen relative bg-grid-pattern">
      
      {/* Header */}
      <section className="relative pt-36 pb-20 overflow-hidden max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />
        
        <AnimatedContainer animation="fade-up">
          <span className="text-xs font-bold tracking-widest text-cyan-400 uppercase font-mono">OUR MISSION</span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-100 mt-2 mb-6 tracking-tight">
            Autonomous Cloud Ops
          </h1>
          <p className="text-lg text-slate-400 font-light leading-relaxed max-w-2xl mx-auto">
            Traditional SIEM is too slow, and legacy CSPM has no context. We build security tools to trace anomalies at the speed of scaling cloud containers.
          </p>
        </AnimatedContainer>
      </section>

      {/* Story */}
      <SectionWrapper className="bg-slate-950/40 border-t border-slate-900/60 py-24">
        <div className="max-w-3xl mx-auto text-left relative z-10 px-4">
          <AnimatedContainer animation="fade-in">
            <h2 className="text-2xl font-bold text-slate-100 mb-6 flex items-center gap-3">
              <Shield className="h-6 w-6 text-cyan-400" /> The Origin Story
            </h2>
            <div className="space-y-6 text-sm text-slate-400 font-light leading-relaxed">
              <p>
                As cloud telemetry expanded, security operations centers (SOC) faced alert fatigue. Analysts spent their hours writing repetitive regex indicators, missing actual compromises that bypassed static rules.
              </p>
              <p>
                Aegis Sentinel started as an internal research project. By feeding structured CloudTrail access logs into isolated clustering models, we found we could isolate unusual sessions with high confidence scores, bypassing signature rules.
              </p>
              <p>
                Today, Aegis Sentinel serves as an autonomous operations console, connecting high-throughput log collection to automatic threat isolation playbook engines.
              </p>
            </div>
          </AnimatedContainer>
        </div>
      </SectionWrapper>

      {/* Values */}
      <SectionWrapper className="bg-slate-950 border-t border-slate-900 py-24">
        <div className="text-center mb-16">
          <span className="text-xs font-bold tracking-widest text-cyan-400 uppercase font-mono">FIRST PRINCIPLES</span>
          <h2 className="text-3xl font-bold text-slate-100 mt-2 tracking-tight">Core Values</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {values.map((val, idx) => (
            <AnimatedContainer key={idx} animation="scale-up" delay={0.1 * (idx + 1)}>
              <BentoCard className="p-6 h-full flex flex-col gap-4 border-slate-900 bg-slate-950/20">
                <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-900 flex items-center justify-center">
                  {val.icon}
                </div>
                <h3 className="text-base font-bold text-slate-200">{val.title}</h3>
                <p className="text-xs text-slate-400 font-light leading-relaxed">{val.desc}</p>
              </BentoCard>
            </AnimatedContainer>
          ))}
        </div>
      </SectionWrapper>

      {/* Team */}
      <SectionWrapper className="bg-[#02050c] border-t border-slate-900 py-24">
        <div className="text-center mb-16">
          <span className="text-xs font-bold tracking-widest text-cyan-400 uppercase font-mono">ENGINEERING NODES</span>
          <h2 className="text-3xl font-bold text-slate-100 mt-2 tracking-tight">The Core Developers</h2>
          <p className="text-sm text-slate-400 mt-2 font-light">The systems research team from SIT Pune behind the Aegis Sentinel project.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {team.map((member, idx) => (
            <AnimatedContainer key={idx} animation="scale-up" delay={0.1 * (idx + 1)}>
              <div 
                className="group relative rounded-2xl border border-slate-900 bg-slate-950/60 p-6 flex flex-col items-center justify-between text-center overflow-hidden transition-all duration-300 hover:border-cyan-500/25 hover:shadow-[0_0_30px_rgba(0,229,255,0.04)]"
              >
                <div className="absolute inset-0 bg-linear-to-b from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                
                <div className="relative w-20 h-20 rounded-full border border-slate-800 p-1 mb-4 overflow-hidden group-hover:border-cyan-400 transition-colors duration-300">
                  <Image src={member.image} alt={member.name} width={80} height={80} className="rounded-full object-cover transition-transform duration-300 group-hover:scale-105" />
                </div>
                
                <div className="mb-6">
                  <h3 className="text-sm font-bold text-slate-200 group-hover:text-cyan-400 transition-colors duration-300">{member.name}</h3>
                  <p className="text-[11px] text-cyan-500/80 font-mono tracking-wider font-semibold uppercase mt-1">{member.role}</p>
                </div>
                
                <div className="w-full flex items-center justify-between pt-4 border-t border-slate-900/60 text-[10px] text-slate-500 font-mono">
                  <span>{member.institution}</span>
                  <a 
                    href={member.linkedin} 
                    target="_blank" 
                    rel="noreferrer"
                    aria-label={`LinkedIn profile for ${member.name}`}
                    className="flex items-center gap-1 text-slate-400 hover:text-cyan-400 transition-colors"
                  >
                    LinkedIn <ExternalLink size={10} />
                  </a>
                </div>
              </div>
            </AnimatedContainer>
          ))}
        </div>
      </SectionWrapper>

    </div>
  );
}
