'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function GithubAuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const params = new URLSearchParams(window.location.search);
    const success = params.get('success');

    if (success === 'true') {
      router.replace('/overview');
      return;
    }

    const error = params.get('error') || 'GitHub authentication failed. Please try again.';
    router.replace(`/login?error=${encodeURIComponent(error)}`);
  }, [router]);

  return <div className="min-h-screen bg-slate-950" aria-busy="true" />;
}
