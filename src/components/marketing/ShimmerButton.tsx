'use client';

import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface ShimmerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  children: React.ReactNode;
  className?: string;
}

export function ShimmerButton({ href, children, className, ...props }: ShimmerButtonProps) {
  const content = (
    <span className="relative z-10 flex items-center justify-center gap-2">
      {children}
    </span>
  );

  const classes = cn(
    "relative group overflow-hidden rounded-full px-6 py-3 text-sm font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-all duration-300 shadow-[0_0_20px_rgba(0,229,255,0.3)] hover:shadow-[0_0_30px_rgba(0,229,255,0.65)] hover:scale-[1.02] cursor-pointer",
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {/* Shimmer sweep */}
        <span className="absolute inset-0 w-[200%] h-full bg-linear-to-r from-transparent via-white/40 to-transparent -skew-x-12 translate-x-[-100%] group-hover:animate-[shimmer_1.2s_ease-in-out]" />
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      <span className="absolute inset-0 w-[200%] h-full bg-linear-to-r from-transparent via-white/40 to-transparent -skew-x-12 translate-x-[-100%] group-hover:animate-[shimmer_1.2s_ease-in-out]" />
      {content}
    </button>
  );
}

// Add CSS animation helper for shimmer in standard tailwind config or custom inline styles
// Let's add style tag to guarantee shimmer works without extra config
export function ShimmerStyles() {
  return (
    <style dangerouslySetInnerHTML={{__html: `
      @keyframes shimmer {
        0% {
          transform: translateX(-150%) skewX(-12deg);
        }
        100% {
          transform: translateX(150%) skewX(-12deg);
        }
      }
    `}} />
  );
}
