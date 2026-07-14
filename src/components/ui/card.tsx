'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  glass?: boolean;
  glow?: boolean;
  glowColor?: 'cyan' | 'purple' | 'emerald' | 'rose' | 'amber' | 'blue';
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, glass = false, glow = false, glowColor = 'cyan', style, ...props }, ref) => {
    const glowColors = {
      cyan: 'hover:border-cyan-500/35 hover:shadow-[0_0_30px_rgba(0,229,255,0.06)]',
      purple: 'hover:border-purple-500/35 hover:shadow-[0_0_30px_rgba(139,92,246,0.06)]',
      emerald: 'hover:border-emerald-500/35 hover:shadow-[0_0_30px_rgba(16,185,129,0.06)]',
      rose: 'hover:border-rose-500/35 hover:shadow-[0_0_30px_rgba(239,68,68,0.06)]',
      amber: 'hover:border-amber-500/35 hover:shadow-[0_0_30px_rgba(245,158,11,0.06)]',
      blue: 'hover:border-blue-500/35 hover:shadow-[0_0_30px_rgba(59,130,246,0.06)]',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-2xl border transition-all duration-300',
          glass 
            ? 'glass-card' 
            : 'border-slate-800 bg-slate-900/40 backdrop-blur-md text-slate-100 shadow-xl',
          glow && glowColors[glowColor],
          className
        )}
        style={style}
        {...props}
      />
    );
  }
);
Card.displayName = 'Card';

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 p-6', className)}
    {...props}
  />
));
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      'text-xl font-bold leading-none tracking-tight text-slate-100',
      className
    )}
    {...props}
  />
));
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-slate-400 font-light', className)}
    {...props}
  />
));
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
));
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center p-6 pt-0', className)}
    {...props}
  />
));
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
