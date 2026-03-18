import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-slate-950 via-slate-900 to-slate-950 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-100">Privacy Policy</h1>
          <p className="mt-3 text-slate-400">Last updated: March 18, 2026</p>
        </div>

        <Card className="border-slate-800 bg-slate-900/50">
          <CardHeader>
            <CardTitle>Information We Collect</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-slate-300">
            <p>
              We collect account data, security telemetry, audit logs, and operational metadata required to
              provide core CIDR functionality.
            </p>
            <p>
              We do not sell personal information. Data access is restricted to authorized personnel and systems.
            </p>
          </CardContent>
        </Card>

        <Card className="border-slate-800 bg-slate-900/50">
          <CardHeader>
            <CardTitle>How We Use Data</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-slate-300">
            <p>
              Data is used to detect threats, generate alerts, support remediation workflows, and improve platform
              reliability and security outcomes.
            </p>
            <p>
              We may process anonymized or aggregated data for analytics and service improvement.
            </p>
          </CardContent>
        </Card>

        <Card className="border-slate-800 bg-slate-900/50">
          <CardHeader>
            <CardTitle>Your Rights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-slate-300">
            <p>
              Depending on your jurisdiction, you may request access, correction, deletion, or export of personal
              data associated with your account.
            </p>
            <p>
              For privacy requests, contact your organization administrator or support through official channels.
            </p>
          </CardContent>
        </Card>

        <div className="flex justify-center">
          <Link href="/register">
            <Button variant="outline">Back to Register</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
