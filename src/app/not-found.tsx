'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-linear-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-slate-800 mb-4">404</h1>
        <h2 className="text-4xl font-bold text-slate-100 mb-4">Page Not Found</h2>
        <p className="text-lg text-slate-400 mb-8 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/">
            <Button data-testid="notfound-home-button">
              <Home className="mr-2 h-4 w-4" />
              Go Home
            </Button>
          </Link>
          <Button variant="outline" onClick={() => window.history.back()} data-testid="notfound-back-button">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
}
