import { Mail, MapPin, MessageSquare, Phone } from 'lucide-react';
import { SectionWrapper } from '@/components/marketing/SectionWrapper';
import { AnimatedContainer } from '@/components/marketing/AnimatedContainer';
import { CTAButton } from '@/components/marketing/CTAButton';
import { FeatureCard } from '@/components/marketing/FeatureCard';
import { Card, CardContent } from '@/components/ui/card';

export const metadata = {
  title: 'Contact Us | CIDR Platform',
  description: 'Get in touch with the CIDR sales and support team.',
};

export default function ContactPage() {
  const contactMethods = [
    {
      icon: <MessageSquare className="h-6 w-6 text-blue-400" />,
      title: "Talk to Sales",
      description: "Discuss enterprise pricing, custom deployments, and volume discounts.",
      iconClassName: "bg-blue-500/10 border-blue-500/20"
    },
    {
      icon: <Mail className="h-6 w-6 text-purple-400" />,
      title: "Technical Support",
      description: "Current customers get 24/7 priority support. (support@cidr.security)",
      iconClassName: "bg-purple-500/10 border-purple-500/20"
    },
    {
      icon: <MapPin className="h-6 w-6 text-amber-400" />,
      title: "Headquarters",
      description: "Symbiosis Centre for Entrepreneurship & Innovation\nPune, Maharashtra",
      iconClassName: "bg-amber-500/10 border-amber-500/20"
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
              Get in touch
            </h1>
            <p className="text-xl text-slate-400 font-light leading-relaxed">
              Whether you need a custom enterprise SLA, technical assistance with our Python engine, or just want to chat about cloud security—we're here.
            </p>
          </AnimatedContainer>
        </div>
      </section>

      {/* Main Content */}
      <SectionWrapper className="pt-10 border-none">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-start">
          
          {/* Left Column: Contact Methods */}
          <div className="space-y-6">
            <AnimatedContainer animation="slide-in-left">
              <h2 className="text-2xl font-semibold text-slate-100 mb-6">How can we help?</h2>
            </AnimatedContainer>
            
            {contactMethods.map((method, idx) => (
              <AnimatedContainer key={idx} animation="slide-in-left" delay={0.1 * (idx + 1)}>
                 <div className="flex flex-col h-full bg-slate-900/30 border border-slate-800/60 rounded-xl p-6 hover:bg-slate-900/50 transition-colors">
                    <div className="flex items-center gap-4 mb-2">
                      <div className={`h-12 w-12 rounded-xl flex items-center justify-center border ${method.iconClassName}`}>
                        {method.icon}
                      </div>
                      <h3 className="text-lg font-semibold text-slate-200">{method.title}</h3>
                    </div>
                    <p className="text-slate-400 text-sm whitespace-pre-line ml-16 mt-1">{method.description}</p>
                 </div>
              </AnimatedContainer>
            ))}
          </div>

          {/* Right Column: Contact Form */}
          <AnimatedContainer animation="slide-in-right" delay={0.2} className="relative">
             <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 via-transparent to-transparent opacity-50 rounded-2xl pointer-events-none" />
             <Card className="bg-slate-900/80 border-slate-700/60 backdrop-blur-xl shadow-2xl relative z-10">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-slate-100 mb-6">Send a Message</h3>
                  
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div className="space-y-2">
                         <label htmlFor="first_name" className="text-sm font-medium text-slate-300">First Name</label>
                         <input type="text" id="first_name" className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow" placeholder="Jane" />
                       </div>
                       <div className="space-y-2">
                         <label htmlFor="last_name" className="text-sm font-medium text-slate-300">Last Name</label>
                         <input type="text" id="last_name" className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow" placeholder="Doe" />
                       </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-slate-300">Work Email</label>
                      <input type="email" id="email" className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow" placeholder="jane@company.com" />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="inquiry_type" className="text-sm font-medium text-slate-300">How can we help?</label>
                      <select id="inquiry_type" className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow appearance-none">
                         <option value="sales">Sales Inquiry</option>
                         <option value="support">Technical Support</option>
                         <option value="press">Press / Media</option>
                         <option value="other">Other</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium text-slate-300">Message</label>
                      <textarea id="message" rows={4} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow resize-none" placeholder="Tell us about your infrastructure needs..." />
                    </div>

                    <CTAButton type="button" className="w-full py-6 text-md font-semibold" withArrow>
                      Send Message
                    </CTAButton>
                  </form>
                </CardContent>
             </Card>
          </AnimatedContainer>

        </div>
      </SectionWrapper>

    </div>
  );
}
