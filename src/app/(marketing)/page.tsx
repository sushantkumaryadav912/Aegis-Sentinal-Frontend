import Link from 'next/link';
import { Shield, AlertTriangle, Workflow, Lock, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function MarketingHome() {
  return (
    <div className="min-h-screen bg-linear-to-b from-slate-950 via-slate-900 to-slate-950">

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm mb-6">
            <Lock className="h-4 w-4 mr-2" />
            Enterprise-Grade Security Operations
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-slate-100 mb-6">
            Intelligent Cloud Security
            <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-400">
              Operations Platform
            </span>
          </h1>
          <p className="text-xl text-slate-400 mb-8 max-w-3xl mx-auto">
            Detect, investigate, and respond to security threats across AWS, Azure, and GCP with AI-powered automation and real-time monitoring.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/login">
              <Button size="lg" className="group" data-testid="hero-get-started">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/products">
              <Button size="lg" variant="outline" data-testid="hero-learn-more">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-100 mb-4">Why Choose CIDR?</h2>
            <p className="text-lg text-slate-400">Comprehensive security operations in one unified platform</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-slate-900/50 border-slate-800">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4">
                  <AlertTriangle className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-100 mb-2">Real-time Alerts</h3>
                <p className="text-sm text-slate-400">
                  Get instant notifications for security threats with intelligent risk scoring
                </p>
              </CardContent>
            </Card>
            <Card className="bg-slate-900/50 border-slate-800">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-lg bg-amber-500/10 flex items-center justify-center mb-4">
                  <Workflow className="h-6 w-6 text-amber-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-100 mb-2">Automated Workflows</h3>
                <p className="text-sm text-slate-400">
                  Automate remediation with customizable playbooks and escalation rules
                </p>
              </CardContent>
            </Card>
            <Card className="bg-slate-900/50 border-slate-800">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-lg bg-green-500/10 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-green-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-100 mb-2">Multi-Cloud Support</h3>
                <p className="text-sm text-slate-400">
                  Unified visibility across AWS, Azure, GCP, and hybrid environments
                </p>
              </CardContent>
            </Card>
            <Card className="bg-slate-900/50 border-slate-800">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4">
                  <CheckCircle className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-100 mb-2">Compliance Ready</h3>
                <p className="text-sm text-slate-400">
                  Meet SOC 2, ISO 27001, and GDPR requirements with comprehensive audit logs
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-linear-to-r from-blue-900/30 to-cyan-900/30 border-blue-500/20">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-bold text-slate-100 mb-4">
                Ready to Secure Your Cloud?
              </h2>
              <p className="text-lg text-slate-300 mb-8">
                Join hundreds of security teams protecting their infrastructure with CIDR
              </p>
              <Link href="/login">
                <Button size="lg" data-testid="cta-start-trial">
                  Start Free Trial
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <Shield className="h-6 w-6 text-blue-500" />
              <span className="ml-2 text-lg font-bold text-slate-100">CIDR</span>
            </div>
            <p className="text-sm text-slate-400">
              © 2025 CIDR Security. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
