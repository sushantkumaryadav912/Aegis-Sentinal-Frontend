import { SectionWrapper } from '@/components/marketing/SectionWrapper';
import { AnimatedContainer } from '@/components/marketing/AnimatedContainer';

export const metadata = {
  title: 'Cookie Policy | CIDR Platform',
};

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-slate-950 pt-32 pb-20">
      <SectionWrapper>
        <div className="max-w-3xl mx-auto">
          <AnimatedContainer animation="fade-up">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-100 mb-8">Cookie Policy</h1>
            <p className="text-slate-400 mb-10">Last updated: March 2026</p>
            
            <div className="prose prose-invert prose-slate max-w-none">
              <h2 className="text-2xl font-semibold text-slate-200 mt-8 mb-4">1. Regulatory Compliance</h2>
              <p className="text-slate-400 mb-6 leading-relaxed">
                In alignment with the principles established by the Digital Personal Data Protection Act, 2023, and global standards, we provide complete transparency into the automated files (Cookies) temporarily stored on your device to maintain secure dashboard sessions.
              </p>
              
              <h2 className="text-2xl font-semibold text-slate-200 mt-8 mb-4">2. Essential Security Cookies</h2>
              <p className="text-slate-400 mb-6 leading-relaxed">
                Due to the sensitive nature of the CIDR platform, we strictly deploy <strong>First-Party HttpOnly Cookies</strong> to manage authenticated sessions. 
                These cookies are strictly necessary to enforce authorization checks and prevent Cross-Site Request Forgery (CSRF). They cannot be disabled without terminating access to the threat detection interfaces.
              </p>
              
              <h2 className="text-2xl font-semibold text-slate-200 mt-8 mb-4">3. Data Minimization</h2>
              <p className="text-slate-400 mb-6 leading-relaxed">
                Following the data minimization principles of the DPDPA, we do not deploy any third-party marketing, retargeting, or advertising trackers across your session. Our analytics are strictly restricted to anonymized Vercel Web Vitals to monitor service uptime and latency.
              </p>
            </div>
          </AnimatedContainer>
        </div>
      </SectionWrapper>
    </div>
  );
}
