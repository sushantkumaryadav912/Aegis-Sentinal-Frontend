import { Users, Target, Rocket } from 'lucide-react';
import Image from 'next/image';
import { SectionWrapper } from '@/components/marketing/SectionWrapper';
import { AnimatedContainer } from '@/components/marketing/AnimatedContainer';
import { CTAButton } from '@/components/marketing/CTAButton';
import { FeatureCard } from '@/components/marketing/FeatureCard';

export const metadata = {
  title: 'About | CIDR Platform',
  description: 'Building the future of AI-driven cloud security operations.',
};

export default function AboutPage() {
  const values = [
    {
      icon: <Target className="h-8 w-8 text-blue-400" />,
      title: "Precision over Noise",
      description: "Security teams shouldn't be drowning in false positives. Our ML engine is built to maximize true positive detection precision.",
      iconClassName: "bg-blue-500/10 border-blue-500/20"
    },
    {
      icon: <Rocket className="h-8 w-8 text-amber-400" />,
      title: "Built for Velocity",
      description: "Cloud infrastructure scales in milliseconds. Our automated response playbooks are designed to act just as fast.",
      iconClassName: "bg-amber-500/10 border-amber-500/20"
    },
    {
      icon: <Users className="h-8 w-8 text-emerald-400" />,
      title: "Engineer Centric",
      description: "We build tools that security engineers actually want to use, focusing on developer ergonomics, API-first access, and dark-mode defaults.",
      iconClassName: "bg-emerald-500/10 border-emerald-500/20"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Header Section */}
      <section className="relative pt-32 pb-20 overflow-hidden mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full border-b border-slate-900">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-125 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-blue-900/10 via-slate-950/0 to-transparent pointer-events-none" />
        
        <div className="text-center relative z-10 max-w-4xl mx-auto">
          <AnimatedContainer animation="fade-up">
            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-100 tracking-tight mb-8">
              Securing the Cloud <br /> <span className="text-slate-400">At Machine Speed</span>
            </h1>
            <p className="text-xl text-slate-400 font-light leading-relaxed mb-10">
              CIDR was born out of frustration. Traditional SIEMs were too slow, and legacy CSPMs lacked context. We set out to build a unified detection engine powered by Python and Automation.
            </p>
          </AnimatedContainer>

          <AnimatedContainer animation="fade-up" delay={0.2}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 border-t border-slate-800/50">
               {[
                 { label: "Founded", val: "March 2026" },
                 { label: "Alerts Processed", val: "50M+" },
                 { label: "Global Customers", val: "100+" },
                 { label: "Uptime", val: "99.99%" }
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

      {/* The Story */}
      <SectionWrapper className="bg-slate-950 pt-20">
        <div className="max-w-4xl mx-auto">
          <AnimatedContainer animation="fade-in">
            <h2 className="text-3xl font-bold text-slate-100 mb-6 border-l-4 border-blue-500 pl-4">The Origin</h2>
            <div className="prose prose-invert prose-lg text-slate-400 font-light leading-relaxed">
              <p className="mb-6">
                Most security operations centers (SOC) are broken. Engineers spend 80% of their time writing SQL queries to comb through petabytes of CloudTrail logs, attempting to write regex signatures that inevitably get bypassed by novel attack vectors.
              </p>
              <p className="mb-6">
                CIDR started as an internal tool designed to solve this data-gravity problem. By hooking a distributed Java backend to a stateful Python anomaly detection engine, we realized we could score entities based on behavioral deviations rather than static rules. 
              </p>
              <p>
                Today, CIDR serves as the nerve center for forward-thinking cloud engineering teams, closing the loop between threat detection and infrastructure remediation.
              </p>
            </div>
          </AnimatedContainer>
        </div>
      </SectionWrapper>

      {/* Core Values */}
      <SectionWrapper className="bg-slate-900/20 border-y border-slate-800/30">
        <AnimatedContainer animation="fade-up" className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-100 mb-4 tracking-tight">Our Core Values</h2>
          <p className="text-lg text-slate-400">The first principles that guide our product engineering.</p>
        </AnimatedContainer>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {values.map((v, i) => (
            <AnimatedContainer key={i} animation="scale-up" delay={0.1 * (i + 1)}>
               <FeatureCard {...v} />
            </AnimatedContainer>
          ))}
        </div>
      </SectionWrapper>

      {/* Meet the Developers */}
      <SectionWrapper className="bg-slate-950 px-4">
        <AnimatedContainer animation="fade-up" className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-100 mb-4 tracking-tight">The Developers</h2>
          <p className="text-lg text-slate-400">Meet the engineering team from SIT Pune behind the CIDR platform.</p>
        </AnimatedContainer>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {[
            { name: "Sushant Kumar Yadav", role: "Software Engineer", institution: "SIT Pune", image: "https://ui-avatars.com/api/?name=Sushant+Kumar+Yadav&size=256&background=0D8ABC&color=fff", linkedin: "https://www.linkedin.com/in/sushantkumaryadav/" },
            { name: "Nihil Pandit", role: "Software Engineer", institution: "SIT Pune", image: "https://ui-avatars.com/api/?name=Nihil+Pandit&size=256&background=10B981&color=fff", linkedin: "https://www.linkedin.com/in/nihil-pandit-321192305/" },
            { name: "Harsh Trivedi", role: "Software Engineer", institution: "SIT Pune", image: "https://ui-avatars.com/api/?name=Harsh+Trivedi&size=256&background=F59E0B&color=fff", linkedin: "https://www.linkedin.com/in/harsh-trivedi-a59609216/" },
            { name: "Dev Vachhani", role: "Software Engineer", institution: "SIT Pune", image: "https://ui-avatars.com/api/?name=Dev+Vachhani&size=256&background=8B5CF6&color=fff", linkedin: "https://www.linkedin.com/in/dev-vachhani-21630931a/" }
          ].map((dev, i) => (
             <AnimatedContainer key={i} animation="fade-up" delay={0.1 * (i + 1)}>
                <div className="group flex flex-col items-center p-6 rounded-2xl border border-slate-800/60 bg-slate-900/40 hover:border-slate-700 hover:bg-slate-900/80 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute inset-0 bg-linear-to-b from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  
                  <a href={dev.linkedin} target="_blank" rel="noopener noreferrer" title={`Open LinkedIn profile for ${dev.name}`} aria-label={`Open LinkedIn profile for ${dev.name}`} className="relative h-24 w-24 rounded-full overflow-hidden mb-5 border-2 border-slate-700/80 group-hover:border-blue-500 transition-colors shadow-xl">
                    <Image src={dev.image} alt={dev.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  </a>
                  
                  <h3 className="text-lg font-bold text-slate-100 text-center mb-1 group-hover:text-blue-400 transition-colors">{dev.name}</h3>
                  <p className="text-sm font-medium text-blue-500/80 mb-4">{dev.role}</p>
                  
                  <div className="flex items-center gap-3 w-full border-t border-slate-800/50 pt-4 mt-auto">
                     <span className="px-3 py-1 bg-slate-950 rounded-full text-[10px] uppercase font-bold tracking-wider text-slate-400 border border-slate-800 flex-1 text-center">
                        {dev.institution}
                     </span>
                     <a href={dev.linkedin} target="_blank" rel="noopener noreferrer" className="h-7 w-7 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center hover:bg-blue-500 hover:text-white transition-colors border border-blue-500/20" aria-label={`LinkedIn for ${dev.name}`}>
                       <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                     </a>
                  </div>
                </div>
             </AnimatedContainer>
          ))}
        </div>
      </SectionWrapper>

      {/* Final CTA */}
      <SectionWrapper className="text-center">
        <AnimatedContainer animation="scale-up" className="max-w-3xl mx-auto">
          <Image src="/logo.png" alt="CIDR Logo" width={64} height={64} className="h-16 w-16 object-contain mx-auto mb-6 opacity-80" />
          <h2 className="text-3xl font-bold text-slate-100 mb-6">Join the Mission</h2>
          <p className="text-lg text-slate-400 mb-10 font-light">
            Whether you're looking to secure your infrastructure or join our engineering team, let's talk.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <CTAButton href="/register" size="lg" className="h-14 px-10 text-lg">
              Deploy CIDR
            </CTAButton>
            <CTAButton href="/careers" variant="outline" size="lg" className="h-14 px-8 text-lg bg-transparent border-slate-700 hover:bg-slate-800">
              View Open Roles
            </CTAButton>
          </div>
        </AnimatedContainer>
      </SectionWrapper>

    </div>
  );
}
