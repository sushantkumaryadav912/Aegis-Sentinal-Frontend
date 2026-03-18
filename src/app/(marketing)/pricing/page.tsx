import Link from 'next/link';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-slate-950 via-slate-900 to-slate-950">
      

      {/* Pricing Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-100 mb-4">Simple, Transparent Pricing</h1>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Choose the plan that fits your organization's needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Starter Plan */}
            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <CardTitle className="text-2xl">Starter</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-slate-100">$299</span>
                  <span className="text-slate-400 ml-2">/month</span>
                </div>
                <p className="text-sm text-slate-400 mt-2">Perfect for small teams</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-blue-400 mr-2 mt-0.5" />
                    <span className="text-slate-300">Up to 10 cloud accounts</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-blue-400 mr-2 mt-0.5" />
                    <span className="text-slate-300">1,000 alerts per month</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-blue-400 mr-2 mt-0.5" />
                    <span className="text-slate-300">30 days log retention</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-blue-400 mr-2 mt-0.5" />
                    <span className="text-slate-300">Email support</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-blue-400 mr-2 mt-0.5" />
                    <span className="text-slate-300">Basic automation</span>
                  </li>
                </ul>
                <Link href="/login">
                  <Button variant="outline" className="w-full" data-testid="pricing-starter">
                    Get Started
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Professional Plan */}
            <Card className="bg-linear-to-b from-blue-900/30 to-cyan-900/30 border-blue-500/50 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  POPULAR
                </span>
              </div>
              <CardHeader>
                <CardTitle className="text-2xl">Professional</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-slate-100">$899</span>
                  <span className="text-slate-400 ml-2">/month</span>
                </div>
                <p className="text-sm text-slate-400 mt-2">For growing organizations</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-blue-400 mr-2 mt-0.5" />
                    <span className="text-slate-300">Up to 50 cloud accounts</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-blue-400 mr-2 mt-0.5" />
                    <span className="text-slate-300">10,000 alerts per month</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-blue-400 mr-2 mt-0.5" />
                    <span className="text-slate-300">90 days log retention</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-blue-400 mr-2 mt-0.5" />
                    <span className="text-slate-300">Priority support (24/7)</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-blue-400 mr-2 mt-0.5" />
                    <span className="text-slate-300">Advanced automation</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-blue-400 mr-2 mt-0.5" />
                    <span className="text-slate-300">Custom playbooks</span>
                  </li>
                </ul>
                <Link href="/login">
                  <Button className="w-full" data-testid="pricing-professional">
                    Get Started
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Enterprise Plan */}
            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <CardTitle className="text-2xl">Enterprise</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-slate-100">Custom</span>
                </div>
                <p className="text-sm text-slate-400 mt-2">For large enterprises</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-blue-400 mr-2 mt-0.5" />
                    <span className="text-slate-300">Unlimited cloud accounts</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-blue-400 mr-2 mt-0.5" />
                    <span className="text-slate-300">Unlimited alerts</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-blue-400 mr-2 mt-0.5" />
                    <span className="text-slate-300">Custom log retention</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-blue-400 mr-2 mt-0.5" />
                    <span className="text-slate-300">Dedicated support team</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-blue-400 mr-2 mt-0.5" />
                    <span className="text-slate-300">Custom integrations</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-blue-400 mr-2 mt-0.5" />
                    <span className="text-slate-300">SLA guarantees</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full" data-testid="pricing-enterprise">
                  Contact Sales
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
