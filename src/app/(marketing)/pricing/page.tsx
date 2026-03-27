import { SectionWrapper } from '@/components/marketing/SectionWrapper';
import { AnimatedContainer } from '@/components/marketing/AnimatedContainer';
import { PricingCard } from '@/components/marketing/PricingCard';

export const metadata = {
  title: 'Pricing | CIDR Platform',
  description: 'Transparent scaling for cloud security operations.',
};

export default function PricingPage() {
  const tiers = [
    {
      name: "Starter",
      price: "Free",
      description: "Perfect for personal prototypes and evaluating the platform.",
      features: [
        "1 Cloud Account (AWS/GCP/Azure)",
        "Up to 10,000 logs ingested per month",
        "7 days log retention",
        "Basic rule-based signatures",
        "Community support"
      ],
      ctaText: "Get Started Free",
      ctaHref: "/register",
      isPopular: false
    },
    {
      name: "Pro",
      price: "₹49,999",
      description: "Comprehensive security for growing cloud-native teams.",
      features: [
        "Up to 25 Cloud Accounts",
        "10 Million logs ingested per month",
        "90 days hot log retention",
        "Full Python Isolation Forest ML Engine",
        "Automated Playbooks & Webhooks",
        "Priority Email & Slack Support",
        "API Access for CI/CD"
      ],
      ctaText: "Start 14-Day Trial",
      ctaHref: "/register",
      isPopular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For large organizations with complex compliance needs.",
      features: [
        "Unlimited Cloud Accounts",
        "Custom Log Ingestion quotas",
        "1-Year cold storage & compliance archives",
        "Dedicated VPC deployment available",
        "Custom Regex & ML Engine tuning",
        "24/7 Dedicated Support Engineer",
        "SLA 99.99% Uptime Guarantee"
      ],
      ctaText: "Contact Sales",
      ctaHref: "/contact",
      isPopular: false
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Header Section */}
      <section className="relative pt-32 pb-16 overflow-hidden mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        {/* Glow Effects */}
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-blue-900/10 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="text-center relative z-10 max-w-3xl mx-auto">
          <AnimatedContainer animation="fade-up">
            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-100 tracking-tight mb-6">
              Simple, transparent pricing
            </h1>
            <p className="text-xl text-slate-400 font-light leading-relaxed">
              No hidden fees. No surprise overages. Choose the plan that aligns with your cloud data gravity.
            </p>
          </AnimatedContainer>
        </div>
      </section>

      {/* Pricing Cards */}
      <SectionWrapper className="pt-0 border-none">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier, idx) => (
             <AnimatedContainer key={idx} animation="fade-up" delay={0.1 * (idx + 1)}>
               <PricingCard tier={tier} />
             </AnimatedContainer>
          ))}
        </div>
      </SectionWrapper>
      
      {/* FAQ Snippet */}
      <SectionWrapper className="py-20 bg-slate-900/20 border-t border-slate-800/30">
        <AnimatedContainer animation="fade-up" className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-slate-100 mb-8">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
               <div>
                  <h4 className="text-slate-100 font-semibold mb-2">How is log ingestion measured?</h4>
                   <p className="text-slate-400 text-sm leading-relaxed">We calculate ingestion based on the sheer number of log events sent via our APIs or collectors, not data volume strictly, ensuring predictable billing.</p>
               </div>
               <div>
                  <h4 className="text-slate-100 font-semibold mb-2">Can I cancel anytime?</h4>
                   <p className="text-slate-400 text-sm leading-relaxed">Yes. We believe in providing value, not lock-in. You can transition back to the Starter tier or export your data at any billing cycle end.</p>
               </div>
               <div>
                  <h4 className="text-slate-100 font-semibold mb-2">Do you offer on-premise deployments?</h4>
                   <p className="text-slate-400 text-sm leading-relaxed">On-premise or managed VPC installations are strictly reserved for our Enterprise plan customers due to dedicated infrastructure setup requirements.</p>
               </div>
               <div>
                  <h4 className="text-slate-100 font-semibold mb-2">Is the Python engine included in all plans?</h4>
                   <p className="text-slate-400 text-sm leading-relaxed">The ML Isolation Forest detection engine is compute-heavy. It is only fully enabled in the Pro and Enterprise plans.</p>
               </div>
            </div>
        </AnimatedContainer>
      </SectionWrapper>

    </div>
  );
}
