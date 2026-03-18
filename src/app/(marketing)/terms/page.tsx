import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-slate-950 via-slate-900 to-slate-950 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-100">Terms of Service</h1>
          <p className="mt-3 text-slate-400">Last updated: March 18, 2026</p>
        </div>

        <Card className="border-slate-800 bg-slate-900/50">
          <CardHeader>
            <CardTitle>Agreement to Terms</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-slate-300">
            <p>
              By accessing and using CIDR, you agree to comply with these terms and all applicable laws and
              regulations.
            </p>
            <p>
              You are responsible for maintaining account security, protecting credentials, and ensuring
              authorized usage within your organization.
            </p>
          </CardContent>
        </Card>

        <Card className="border-slate-800 bg-slate-900/50">
          <CardHeader>
            <CardTitle>Use of Service</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-slate-300">
            <p>
              CIDR is provided for cloud security operations, monitoring, and remediation workflow management.
            </p>
            <p>
              Misuse, unauthorized access attempts, or interference with system integrity may result in account
              suspension.
            </p>
          </CardContent>
        </Card>

        <Card className="border-slate-800 bg-slate-900/50">
          <CardHeader>
            <CardTitle>Limitation of Liability</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-slate-300">
            <p>
              CIDR is provided on an &quot;as is&quot; basis. We do not guarantee uninterrupted operation or error-free
              results in all environments.
            </p>
            <p>
              To the maximum extent permitted by law, CIDR Security is not liable for indirect, incidental, or
              consequential damages.
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
