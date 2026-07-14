'use client';

import React, { useState } from 'react';
import { SectionWrapper } from '@/components/marketing/SectionWrapper';
import { AnimatedContainer } from '@/components/marketing/AnimatedContainer';
import { BentoCard } from '@/components/marketing/BentoGrid';
import { Button } from '@/components/ui/button';
import { ChevronDown, HelpCircle, Check, X } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function PricingPage() {
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  const tiers = [
    {
      name: "Starter",
      price: "Free",
      description: "Perfect for testing and lightweight personal pipelines.",
      features: [
        "1 Connected Cloud Account",
        "Up to 10,000 log events/month",
        "7 days hot log storage",
        "Basic signature-based anomalies",
        "Community Slack Support"
      ],
      notIncluded: [
        "Python ML Isolation Forest Engine",
        "Automated SOAR response playbooks",
        "Custom API configurations"
      ],
      ctaText: "Deploy Free Sensor",
      ctaHref: "/register",
      popular: false,
      glow: "rgba(255, 255, 255, 0.02)"
    },
    {
      name: "Pro Operations",
      price: "₹49,999",
      period: "/ mo",
      description: "Comprehensive operational cloud defense for scaling teams.",
      features: [
        "Up to 25 Connected Cloud Accounts",
        "10 Million log events/month",
        "90 days hot log storage",
        "Full Python Isolation Forest ML Engine",
        "Automated Playbooks & Containment SOAR",
        "API access for automated deployments",
        "Priority Email & Slack Support (4h SLA)"
      ],
      notIncluded: [
        "Private VPC deployment",
        "Custom ML hyperparameter tuning"
      ],
      ctaText: "Start 14-Day Free Trial",
      ctaHref: "/register",
      popular: true,
      glow: "rgba(0, 229, 255, 0.08)"
    },
    {
      name: "Enterprise Control",
      price: "Custom",
      description: "For large compliance operations requiring private VPC nodes.",
      features: [
        "Unlimited Cloud Accounts",
        "Custom log events ingestion quota",
        "1-Year cold compliance file logs storage",
        "VPC private hosting (AWS / GCP)",
        "Custom Regex & ML hyperparameter tuning",
        "24/7 dedicated security operations engineer",
        "99.99% core platform SLA guarantee"
      ],
      notIncluded: [],
      ctaText: "Contact Security Analyst",
      ctaHref: "/contact",
      popular: false,
      glow: "rgba(139, 92, 246, 0.05)"
    }
  ];

  const faqs = [
    {
      q: "How is telemetry ingestion calculated?",
      a: "Ingestion quotas are based on individual log events sent to our HTTP collectors or polled from your CloudTrail APIs. We don't charge by storage weight or bandwidth volume, offering predictable security billing."
    },
    {
      q: "Can I cancel or downgrade anytime?",
      a: "Yes. All operational subscriptions are month-to-month. If you decide to cancel, you can downgrade back to the Starter plan or export your audit logs in standard JSON format at the end of your billing cycle."
    },
    {
      q: "Why is the Python ML Engine restricted to Pro and Enterprise?",
      a: "Behavioral isolation profiles and clustering calculations require significant stateful memory and compute cycles. The Starter plan provides signature rules, while the full ML isolation forest is unlocked on Pro/Enterprise."
    },
    {
      q: "Is there a setup fee for private VPC deployments?",
      a: "Private VPC setup is handled by our systems engineers alongside your infrastructure team. We don't charge flat setup fees; instead, it is included in our annual Enterprise contract agreements."
    }
  ];

  const toggleFaq = (idx: number) => {
    setFaqOpen(faqOpen === idx ? null : idx);
  };

  return (
    <div className="flex flex-col min-h-screen relative bg-grid-pattern">
      
      {/* Header Section */}
      <section className="relative pt-36 pb-16 overflow-hidden max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />
        
        <AnimatedContainer animation="fade-up">
          <span className="text-xs font-bold tracking-widest text-cyan-400 uppercase font-mono">BILLING NODES</span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-100 mt-2 mb-6 tracking-tight">
            Transparent Pricing
          </h1>
          <p className="text-lg text-slate-400 font-light leading-relaxed max-w-2xl mx-auto">
            Choose the subscription that fits your cloud metadata velocity. No hidden logs charges, no surprise fees.
          </p>
        </AnimatedContainer>
      </section>

      {/* Cards */}
      <SectionWrapper className="pt-0 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {tiers.map((tier, idx) => (
            <AnimatedContainer key={idx} animation="fade-up" delay={0.1 * (idx + 1)}>
              <BentoCard 
                className={`p-8 flex flex-col justify-between h-full relative ${
                  tier.popular ? 'border-cyan-500/25 bg-slate-900/30' : 'border-slate-900 bg-slate-950/20'
                }`}
                style={{
                  boxShadow: `0 0 45px rgba(0,0,0,0.35), inset 0 0 20px ${tier.glow}`,
                }}
              >
                {tier.popular && (
                  <span className="absolute top-4 right-4 px-2 py-0.5 rounded-md text-[9px] uppercase font-black tracking-widest bg-cyan-500 text-slate-950">
                    RECOMMENDED
                  </span>
                )}
                
                <div className="space-y-6">
                  <div>
                    <span className={`text-xs font-mono font-bold tracking-widest uppercase ${
                      tier.popular ? 'text-cyan-400' : 'text-slate-400'
                    }`}>
                      {tier.name}
                    </span>
                    <div className="text-4xl font-black text-slate-100 mt-2 flex items-baseline gap-1">
                      {tier.price}
                      {tier.period && <span className="text-xs text-slate-500 font-light">{tier.period}</span>}
                    </div>
                    <p className="text-xs text-slate-400 font-light mt-3 leading-relaxed">
                      {tier.description}
                    </p>
                  </div>

                  <div className="border-t border-slate-900 pt-6">
                    <ul className="space-y-3">
                      {tier.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-300 font-light">
                          <Check className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                      {tier.notIncluded.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-600 font-light">
                          <X className="h-4 w-4 text-slate-800 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-8">
                  <Link href={tier.ctaHref}>
                    <Button 
                      variant={tier.popular ? 'glow' : 'outline'} 
                      className={`w-full text-xs tracking-wider uppercase font-bold ${
                        tier.popular ? 'text-slate-950' : 'border-slate-800 text-slate-300'
                      }`}
                    >
                      {tier.ctaText}
                    </Button>
                  </Link>
                </div>
              </BentoCard>
            </AnimatedContainer>
          ))}
        </div>
      </SectionWrapper>

      {/* Accordion FAQs */}
      <SectionWrapper className="py-24 border-t border-slate-900 bg-slate-950/20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-xs font-bold tracking-widest text-cyan-400 uppercase font-mono">SUPPORT BASE</span>
            <h2 className="text-3xl font-bold text-slate-100 mt-2 tracking-tight">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = faqOpen === idx;
              return (
                <div 
                  key={idx} 
                  className="rounded-2xl border border-slate-900 bg-slate-950/50 overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between p-6 text-left cursor-pointer hover:bg-slate-900/10 transition-colors"
                  >
                    <span className="text-sm font-semibold text-slate-200 flex items-center gap-3">
                      <HelpCircle className="h-4 w-4 text-cyan-400 shrink-0" />
                      {faq.q}
                    </span>
                    <ChevronDown size={16} className={`text-slate-500 transition-transform duration-300 ${isOpen ? 'rotate-180 text-cyan-400' : ''}`} />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        className="border-t border-slate-900/60 bg-slate-950/20 px-6 py-5 overflow-hidden"
                      >
                        <p className="text-xs text-slate-400 font-light leading-relaxed">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </SectionWrapper>

    </div>
  );
}
