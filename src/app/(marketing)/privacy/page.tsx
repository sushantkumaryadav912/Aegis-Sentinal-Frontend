import { SectionWrapper } from '@/components/marketing/SectionWrapper';
import { AnimatedContainer } from '@/components/marketing/AnimatedContainer';

export const metadata = {
  title: 'Privacy Policy | Aegis Sentinel',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-950 pt-32 pb-20">
      <SectionWrapper>
        <div className="max-w-3xl mx-auto">
          <AnimatedContainer animation="fade-up">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-100 mb-8">Privacy Policy</h1>
            <p className="text-slate-400 mb-10">Last updated: March 2026</p>
            
            <div className="prose prose-invert prose-slate max-w-none">
              <h2 className="text-2xl font-semibold text-slate-200 mt-8 mb-4">1. Introduction & Applicability</h2>
              <p className="text-slate-400 mb-6 leading-relaxed">
                Aegis Sentinel operates out of Symbiosis Centre for Entrepreneurship & Innovation, Pune, Maharashtra. 
                This Privacy Policy is published in accordance with the provisions of the <strong>Information Technology Act, 2000</strong> ("IT Act"), 
                the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011 ("SPDI Rules"), 
                and aligns with the core principles of the <strong>Digital Personal Data Protection Act, 2023</strong> ("DPDP Act").
              </p>
              
              <h2 className="text-2xl font-semibold text-slate-200 mt-8 mb-4">2. Lawful Processing & Consent</h2>
              <p className="text-slate-400 mb-6 leading-relaxed">
                We collect cloud telemetry and personal account information strictly on the basis of clear, informed consent or legitimate necessity to provide threat detection services. 
                Under the DPDP Act, you have the right to withdraw consent, seek correction of inaccurate data, and request the erasure of your personal data at any point.
              </p>
              
              <h2 className="text-2xl font-semibold text-slate-200 mt-8 mb-4">3. Data Security & Incident Reporting</h2>
              <p className="text-slate-400 mb-6 leading-relaxed">
                As a cybersecurity vendor, we maintain rigorous ISMS standards compliant with <strong>CERT-In</strong> (Indian Computer Emergency Response Team) guidelines. All data is encrypted using AES-256 for data at rest and TLS 1.3 for data in transit. In the unlikely event of a cyber incident, we are bound by CERT-In directions to report prescribed cybersecurity incidents within 6 hours.
              </p>

              <h2 className="text-2xl font-semibold text-slate-200 mt-8 mb-4">4. Grievance Officer</h2>
              <p className="text-slate-400 mb-6 leading-relaxed">
                In accordance with the IT Rules, the contact details of our Grievance Officer are specifically designated to address any discrepancies and grievances with respect to the processing of your personal data. You may contact us via our Contact page or at our administrative headquarters in Pune.
              </p>
            </div>
          </AnimatedContainer>
        </div>
      </SectionWrapper>
    </div>
  );
}
