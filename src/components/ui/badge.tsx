'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline';
}

function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  const variants = {
    default: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    secondary: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
    destructive: 'bg-red-500/10 text-red-400 border-red-500/20',
    outline: 'text-slate-400 border-slate-700',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
        variants[variant],
        className
      )}
      {...props}
    />
  );
}

export { Badge };
