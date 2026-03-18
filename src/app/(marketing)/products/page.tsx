import Link from 'next/link';
import { Cloud, Database, Network, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-slate-950 via-slate-900 to-slate-950">
      

      {/* Products Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-100 mb-4">Our Products</h1>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Comprehensive security solutions designed for modern cloud infrastructure
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4">
                  <Cloud className="h-6 w-6 text-blue-400" />
                </div>
                <CardTitle className="text-2xl">Cloud Security Posture Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-400 mb-4">
                  Continuously monitor and assess your cloud security posture across AWS, Azure, and GCP.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    <span className="text-slate-300">Automated compliance checks</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    <span className="text-slate-300">Misconfiguration detection</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    <span className="text-slate-300">Security best practices enforcement</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-amber-500/10 flex items-center justify-center mb-4">
                  <Lock className="h-6 w-6 text-amber-400" />
                </div>
                <CardTitle className="text-2xl">Threat Detection & Response</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-400 mb-4">
                  AI-powered threat detection with automated response capabilities.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-amber-400 mr-2">•</span>
                    <span className="text-slate-300">Real-time anomaly detection</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-400 mr-2">•</span>
                    <span className="text-slate-300">Intelligent alert prioritization</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-400 mr-2">•</span>
                    <span className="text-slate-300">Automated remediation playbooks</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-green-500/10 flex items-center justify-center mb-4">
                  <Database className="h-6 w-6 text-green-400" />
                </div>
                <CardTitle className="text-2xl">Security Information & Event Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-400 mb-4">
                  Centralized log management and security event correlation.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">•</span>
                    <span className="text-slate-300">Multi-source log aggregation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">•</span>
                    <span className="text-slate-300">Advanced search and filtering</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">•</span>
                    <span className="text-slate-300">Forensic investigation tools</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4">
                  <Network className="h-6 w-6 text-purple-400" />
                </div>
                <CardTitle className="text-2xl">Network Security Monitoring</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-400 mb-4">
                  Monitor network traffic and detect suspicious activities in real-time.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-purple-400 mr-2">•</span>
                    <span className="text-slate-300">Traffic analysis and visualization</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-400 mr-2">•</span>
                    <span className="text-slate-300">DDoS detection and mitigation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-400 mr-2">•</span>
                    <span className="text-slate-300">Zero-trust network access</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
