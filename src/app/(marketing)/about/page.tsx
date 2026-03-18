import Link from 'next/link';
import { Users, Target, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-slate-950 via-slate-900 to-slate-950">
      

      {/* About Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-100 mb-4">About CIDR</h1>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Building the future of cloud security operations
            </p>
          </div>

          {/* Mission */}
          <div className="mb-16">
            <Card className="bg-slate-900/50 border-slate-800">
              <CardContent className="p-12">
                <h2 className="text-3xl font-bold text-slate-100 mb-6 text-center">Our Mission</h2>
                <p className="text-lg text-slate-300 text-center max-w-4xl mx-auto leading-relaxed">
                  We're on a mission to make cloud security accessible and effective for organizations of all sizes. 
                  By combining AI-powered automation with intuitive design, we help security teams detect, investigate, 
                  and respond to threats faster than ever before.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Values */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-slate-100 mb-8 text-center">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="bg-slate-900/50 border-slate-800">
                <CardContent className="p-8 text-center">
                  <div className="h-16 w-16 rounded-full bg-blue-500/10 flex items-center justify-center mx-auto mb-4">
                    <Target className="h-8 w-8 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-100 mb-3">Security First</h3>
                  <p className="text-slate-400">
                    We prioritize security in everything we do, from our product design to our internal practices.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-slate-900/50 border-slate-800">
                <CardContent className="p-8 text-center">
                  <div className="h-16 w-16 rounded-full bg-amber-500/10 flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-amber-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-100 mb-3">Customer-Centric</h3>
                  <p className="text-slate-400">
                    Our customers' success drives our innovation. We listen, learn, and build solutions that matter.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-slate-900/50 border-slate-800">
                <CardContent className="p-8 text-center">
                  <div className="h-16 w-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                    <Heart className="h-8 w-8 text-green-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-100 mb-3">Continuous Innovation</h3>
                  <p className="text-slate-400">
                    We're constantly evolving, staying ahead of emerging threats and technological advancements.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Story */}
          <div className="mb-16">
            <Card className="bg-slate-900/50 border-slate-800">
              <CardContent className="p-12">
                <h2 className="text-3xl font-bold text-slate-100 mb-6 text-center">Our Story</h2>
                <div className="max-w-4xl mx-auto space-y-4 text-slate-300 leading-relaxed">
                  <p>
                    CIDR was founded in 2023 by a team of security engineers and cloud architects who experienced 
                    firsthand the challenges of managing security across multi-cloud environments. Traditional 
                    security tools were complex, siloed, and slow to adapt to cloud-native threats.
                  </p>
                  <p>
                    We set out to build something better—a platform that combines the power of AI with the 
                    simplicity of modern design. Today, CIDR protects hundreds of organizations worldwide, 
                    processing millions of security events daily and helping teams respond to threats in seconds, 
                    not hours.
                  </p>
                  <p>
                    Our platform is built by security professionals, for security professionals. We understand 
                    the pressure of protecting critical infrastructure, and we're committed to making your job 
                    easier every single day.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* CTA */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-100 mb-6">Join Us on Our Mission</h2>
            <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto">
              Whether you're looking to protect your organization or join our team, we'd love to hear from you.
            </p>
            <Link href="/login">
              <Button size="lg" data-testid="about-get-started">
                Get Started Today
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
