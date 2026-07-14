'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface BentoGridProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function BentoGrid({ className, children, ...props }: BentoGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto auto-rows-[18rem]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export interface BentoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function BentoCard({ className, children, ...props }: BentoCardProps) {
  return (
    <div
      className={cn(
        "row-span-1 rounded-3xl border border-slate-800/80 bg-slate-900/40 backdrop-blur-md overflow-hidden relative group transition-all duration-300 hover:border-cyan-500/25 hover:shadow-[0_0_30px_rgba(0,229,255,0.05)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
