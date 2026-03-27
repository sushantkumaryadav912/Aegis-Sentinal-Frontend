"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { logoutUser } from '@/lib/auth-client';

export function Sidebar() {
    const router = useRouter();
    const queryClient = useQueryClient();

    const handleLogout = async () => {
        try {
            await logoutUser();
        } finally {
            queryClient.clear();
            router.replace('/login');
        }
    };

    return (
        <div className="fixed inset-y-0 left-0 z-50 hidden w-64 flex-col border-r border-slate-800 bg-slate-900 lg:flex">
            <div className="flex h-16 shrink-0 items-center px-6 border-b border-slate-800">
                <span className="text-xl font-bold text-slate-100">CIDR Dashboard</span>
            </div>
            <div className="flex flex-1 flex-col overflow-y-auto">
                <nav className="flex-1 space-y-2 px-4 py-6">
                    <Link href="/overview" className="block px-3 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white rounded-md transition-colors">
                        Overview
                    </Link>
                    <Link href="/alerts" className="block px-3 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white rounded-md transition-colors">
                        Alerts
                    </Link>
                    <Link href="/audit-logs" className="block px-3 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white rounded-md transition-colors">
                        Audit Logs
                    </Link>
                    <Link href="/logs" className="block px-3 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white rounded-md transition-colors">
                        Logs
                    </Link>
                    <Link href="/workflows" className="block px-3 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white rounded-md transition-colors">
                        Workflows
                    </Link>
                </nav>

                <div className="border-t border-slate-800 px-4 py-4">
                    <Link href="/settings" className="mb-2 block rounded-md px-3 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-800 hover:text-white">
                        Settings
                    </Link>
                    <button onClick={handleLogout} className="block w-full rounded-md px-3 py-2 text-left text-sm font-medium text-red-300 transition-colors hover:bg-slate-800 hover:text-red-200">
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}
