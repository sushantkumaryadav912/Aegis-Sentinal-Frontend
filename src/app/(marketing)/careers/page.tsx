import { Briefcase, MapPin, Code2, ShieldAlert } from 'lucide-react';
import { SectionWrapper } from '@/components/marketing/SectionWrapper';
import { AnimatedContainer } from '@/components/marketing/AnimatedContainer';
import { CTAButton } from '@/components/marketing/CTAButton';

export const metadata = {
  title: 'Careers | CIDR Platform',
  description: 'Join our team to build next-generation cloud security.',
};

export default function CareersPage() {
  const roles = [
    {
      title: "Senior Python ML Engineer",
      department: "Data Science & Detection",
      location: "San Francisco, CA / Remote",
      type: "Full-time",
      icon: <Code2 className="h-6 w-6 text-purple-400" />
    },
    {
      title: "Cloud Infrastructure Specialist",
      department: "Platoform Engineering",
      location: "New York, NY / Remote",
      type: "Full-time",
      icon: <Briefcase className="h-6 w-6 text-blue-400" />
    },
    {
      title: "Security Threat Researcher",
      department: "Cyber Operations",
      location: "London, UK / Remote",
      type: "Full-time",
      icon: <ShieldAlert className="h-6 w-6 text-amber-400" />
    },
    {
      title: "Senior Product Designer (UI/UX)",
      department: "Product",
      location: "Remote (Global)",
      type: "Full-time",
      icon: <MapPin className="h-6 w-6 text-cyan-400" />
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Header Section */}
      <section className="relative pt-32 pb-16 overflow-hidden mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full border-b border-slate-900">
        {/* Glow Effects */}
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-emerald-900/10 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="text-center relative z-10 max-w-3xl mx-auto">
          <AnimatedContainer animation="fade-up">
            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-100 tracking-tight mb-6">
              Join the CIDR team
            </h1>
            <p className="text-xl text-slate-400 font-light leading-relaxed mb-6">
              We're building an autonomous security backbone for the cloud-native world. Help us design and scale an engine protecting millions of compute resources.
            </p>
            <div className="inline-flex items-center px-4 py-2 rounded-full border border-emerald-800/60 bg-emerald-900/20 text-emerald-300 text-sm font-medium">
               <span className="flex h-2 w-2 rounded-full bg-emerald-400 mr-2 animate-pulse"></span>
               We are actively hiring
            </div>
          </AnimatedContainer>
        </div>
      </section>

      {/* Main Content */}
      <SectionWrapper className="pt-20 bg-slate-950">
        <AnimatedContainer animation="fade-in" className="mb-12">
           <h2 className="text-2xl font-bold text-slate-100 border-l-4 border-blue-500 pl-4">Open Positions</h2>
        </AnimatedContainer>

        <div className="flex flex-col gap-6 max-w-5xl mx-auto">
          {roles.map((role, idx) => (
             <AnimatedContainer key={idx} animation="fade-up" delay={0.1 * (idx + 1)}>
                <div className="group relative flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 rounded-2xl border border-slate-800/60 bg-slate-900/40 hover:bg-slate-900/80 hover:border-blue-500/30 transition-all duration-300">
                   <div className="flex items-start sm:items-center gap-6 mb-4 sm:mb-0">
                      <div className="h-12 w-12 rounded-xl bg-slate-800/60 flex items-center justify-center shrink-0 border border-slate-700/50 group-hover:bg-slate-800 transition-colors">
                        {role.icon}
                      </div>
                      <div>
                         <h3 className="text-xl font-semibold text-slate-200 group-hover:text-blue-400 transition-colors mb-2 cursor-pointer">{role.title}</h3>
                         <div className="flex flex-wrap items-center gap-3 text-sm text-slate-400">
                            <span className="px-2.5 py-1 rounded-md bg-slate-800/50 border border-slate-700/50">{role.department}</span>
                            <span className="flex items-center"><MapPin className="h-3 w-3 mr-1"/> {role.location}</span>
                            <span className="text-slate-600">•</span>
                            <span>{role.type}</span>
                         </div>
                      </div>
                   </div>
                   <CTAButton href={`/contact`} variant="outline" className="shrink-0 bg-transparent border-slate-700 hover:bg-slate-800">
                     Apply Now
                   </CTAButton>
                </div>
             </AnimatedContainer>
          ))}
        </div>
        
        {/* Can't find a role block */}
        <AnimatedContainer animation="fade-up" delay={0.6} className="mt-16 text-center max-w-2xl mx-auto p-8 rounded-2xl border border-dashed border-slate-800 bg-slate-900/20">
            <h3 className="text-lg font-semibold text-slate-200 mb-2">Don't see a fit?</h3>
            <p className="text-slate-400 mb-6 text-sm">We're always looking for exceptional talent in security and engineering. Send us your resume anyway.</p>
            <CTAButton href="/contact" variant="link" className="text-blue-400 hover:text-blue-300">
               careers@cidr.security
            </CTAButton>
        </AnimatedContainer>
      </SectionWrapper>

    </div>
  );
}
