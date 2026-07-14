'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { logoutUser } from '@/lib/auth-client';
import { 
  LayoutDashboard, 
  ShieldAlert, 
  Terminal, 
  GitBranch, 
  Settings, 
  LogOut, 
  ChevronLeft, 
  ChevronRight, 
  ShieldCheck,
  Eye,
  Search,
  Sparkles,
  FolderLock,
  Network
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isCollapsed?: boolean;
  setIsCollapsed?: (collapsed: boolean) => void;
}

export function Sidebar({ isCollapsed: controlledCollapsed, setIsCollapsed: setControlledCollapsed }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();
  
  // Local fallback state if not controlled
  const [localCollapsed, setLocalCollapsed] = useState(false);
  
  const isCollapsed = controlledCollapsed ?? localCollapsed;
  const setIsCollapsed = setControlledCollapsed ?? setLocalCollapsed;

  const handleLogout = async () => {
    try {
      await logoutUser();
    } finally {
      queryClient.clear();
      router.replace('/login');
    }
  };

  const navItems = [
    { name: 'Atlas', desc: 'Executive Dashboard', path: '/overview', icon: <LayoutDashboard size={16} /> },
    { name: 'Sentinel Core', desc: 'Detection Engine', path: '/alerts', icon: <ShieldCheck size={16} /> },
    { name: 'Watchtower', desc: 'Threat Intel', path: '/watchtower', icon: <Eye size={16} /> },
    { name: 'Pulse', desc: 'Monitoring & Telemetry', path: '/logs', icon: <Terminal size={16} /> },
    { name: 'Forge', desc: 'SOAR Automation', path: '/workflows', icon: <GitBranch size={16} /> },
    { name: 'Prism', desc: 'Investigation', path: '/prism', icon: <Search size={16} /> },
    { name: 'Oracle', desc: 'AI Copilot', path: '/oracle', icon: <Sparkles size={16} /> },
    { name: 'Vault', desc: 'Case Management', path: '/vault', icon: <FolderLock size={16} /> },
    { name: 'Nexus', desc: 'Integrations', path: '/nexus', icon: <Network size={16} /> },
  ];

  const isActive = (path: string) => {
    if (path === '/overview') {
      return pathname === '/overview';
    }
    return pathname.startsWith(path);
  };

  return (
    <div 
      className={cn(
        "fixed inset-y-0 left-0 z-40 hidden flex-col border-r border-slate-900 bg-slate-950/80 backdrop-blur-2xl transition-all duration-300 lg:flex",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      {/* Header Logo */}
      <div className="flex h-16 shrink-0 items-center justify-between px-5 border-b border-slate-900">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:border-cyan-400 transition-colors">
            <ShieldAlert size={18} className="animate-pulse" />
          </div>
          {!isCollapsed && (
            <span className="text-xs font-bold text-slate-100 uppercase tracking-widest">
              AEGIS <span className="text-cyan-400">SENTINEL</span>
            </span>
          )}
        </Link>
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 rounded-md border border-slate-900 bg-slate-950 text-slate-500 hover:text-slate-200 hover:border-slate-800 transition-all cursor-pointer"
        >
          {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </div>

      {/* Nav List */}
      <div className="flex flex-1 flex-col overflow-y-auto">
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navItems.map((item) => {
            const active = isActive(item.path);
            return (
              <Link 
                key={item.path} 
                href={item.path} 
                title={isCollapsed ? `${item.name} (${item.desc})` : undefined}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 text-[11px] font-bold uppercase tracking-wider rounded-xl transition-all duration-200 relative group",
                  active 
                    ? "text-cyan-400 bg-cyan-500/5 border border-cyan-500/15" 
                    : "text-slate-400 hover:text-slate-100 hover:bg-slate-900/40 border border-transparent"
                )}
              >
                <div className={cn("transition-colors shrink-0", active ? "text-cyan-400" : "text-slate-400 group-hover:text-slate-200")}>
                  {item.icon}
                </div>
                {!isCollapsed && (
                  <div className="flex flex-col">
                    <span>{item.name}</span>
                    <span className="text-[8px] text-slate-500 lowercase tracking-normal font-normal mt-0.5">{item.desc}</span>
                  </div>
                )}
                
                {/* Collapsed Tooltip fallback indicator */}
                {isCollapsed && (
                  <div className="absolute left-full ml-2 px-2.5 py-1.5 bg-slate-950 border border-slate-900 text-[10px] text-slate-300 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                    {item.name} <span className="text-slate-500 text-[8px] ml-1">({item.desc})</span>
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer Area */}
        <div className="border-t border-slate-900 px-3 py-3 space-y-1">
          <Link 
            href="/settings" 
            title={isCollapsed ? "Command (Admin Settings)" : undefined}
            className={cn(
              "flex items-center gap-3 px-3 py-2 text-[11px] font-bold uppercase tracking-wider rounded-xl transition-all relative group",
              isActive('/settings')
                ? "text-cyan-400 bg-cyan-500/5 border border-cyan-500/15"
                : "text-slate-400 hover:text-slate-100 hover:bg-slate-900/40 border border-transparent"
            )}
          >
            <Settings size={16} className="shrink-0" />
            {!isCollapsed && (
              <div className="flex flex-col">
                <span>Command</span>
                <span className="text-[8px] text-slate-500 lowercase tracking-normal font-normal mt-0.5">Administration</span>
              </div>
            )}
            {isCollapsed && (
              <div className="absolute left-full ml-2 px-2.5 py-1.5 bg-slate-950 border border-slate-900 text-[10px] text-slate-300 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                Command (Admin)
              </div>
            )}
          </Link>
          
          <button 
            onClick={handleLogout} 
            title={isCollapsed ? "Logout" : undefined}
            className="flex items-center gap-3 w-full px-3 py-2 text-[11px] font-bold uppercase tracking-wider rounded-xl text-red-400 hover:bg-red-500/5 hover:text-red-300 border border-transparent transition-all relative group cursor-pointer"
          >
            <LogOut size={16} className="shrink-0" />
            {!isCollapsed && <span>Logout</span>}
            {isCollapsed && (
              <div className="absolute left-full ml-2 px-2.5 py-1.5 bg-slate-950 border border-slate-900 text-[10px] text-red-300 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                Logout
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
