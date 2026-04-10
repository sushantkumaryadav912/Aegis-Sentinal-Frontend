'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar } from '@/components/layout/sidebar';
import { getAccessToken, hasRefreshToken } from '@/lib/auth-tokens';
import { apiClient } from '@/lib/api/client';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [canRender, setCanRender] = useState(false);

  useEffect(() => {
    const ensureSession = async () => {
      const hasClientAuth =
        Boolean(getAccessToken()) ||
        hasRefreshToken();

      if (hasClientAuth) {
        setCanRender(true);
        return;
      }

      try {
        await apiClient.request('/auth/refresh', {
          method: 'POST',
          body: {},
        });
        setCanRender(true);
      } catch {
        router.replace('/login');
      }
    };

    void ensureSession();
  }, [router]);

  if (!canRender) {
    return (
      <div className="min-h-screen bg-slate-950" aria-busy="true" />
    );
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <Sidebar />
      <main className="lg:pl-64">
        <div className="px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </main>
    </div>
  );
}
