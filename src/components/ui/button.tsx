'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'ghost' | 'link' | 'glow' | 'glass';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-full font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] cursor-pointer';

    const variants = {
      default: 'bg-cyan-400 text-slate-950 font-semibold hover:bg-cyan-300 hover:shadow-[0_0_20px_rgba(0,229,255,0.4)]',
      destructive: 'bg-red-500 text-white font-semibold hover:bg-red-600 hover:shadow-[0_0_20px_rgba(239,68,68,0.4)]',
      outline: 'border border-slate-800 bg-transparent text-slate-300 hover:bg-slate-900/50 hover:text-white hover:border-slate-700',
      ghost: 'text-slate-400 hover:bg-slate-900/50 hover:text-slate-100',
      link: 'text-cyan-400 underline-offset-4 hover:underline hover:text-cyan-300',
      glow: 'bg-linear-to-r from-cyan-400 via-indigo-500 to-purple-600 text-slate-950 font-bold hover:shadow-[0_0_25px_rgba(0,229,255,0.55)] transition-shadow duration-300',
      glass: 'glass-panel text-slate-200 hover:bg-white/5 hover:text-white hover:border-cyan-500/30'
    };

    const sizes = {
      default: 'h-11 px-6 py-2 text-sm',
      sm: 'h-9 px-4 text-xs',
      lg: 'h-13 px-8 text-base',
      icon: 'h-11 w-11',
    };

    return (
      <button
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export { Button };