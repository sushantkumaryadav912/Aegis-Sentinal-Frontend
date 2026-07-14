'use client';

import React, { useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface GlowCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  glowColor?: string; // rgb value e.g. "0, 229, 255"
}

export function GlowCard({ children, className, glowColor = "0, 229, 255", ...props }: GlowCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isFocused, setIsFocused] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsFocused(true)}
      onMouseLeave={() => setIsFocused(false)}
      className={cn(
        "relative rounded-3xl border border-slate-900 bg-slate-950/40 backdrop-blur-md overflow-hidden p-8 transition-all duration-300 hover:border-slate-800",
        className
      )}
      {...props}
    >
      {/* Glow Effect */}
      {isFocused && (
        <div
          className="pointer-events-none absolute -inset-px transition-opacity duration-300"
          style={{
            background: `radial-gradient(400px circle at ${coords.x}px ${coords.y}px, rgba(${glowColor}, 0.12), transparent 80%)`,
          }}
        />
      )}
      
      {/* Light border glow */}
      {isFocused && (
        <div
          className="pointer-events-none absolute -inset-px rounded-3xl transition-opacity duration-300"
          style={{
            background: `radial-gradient(120px circle at ${coords.x}px ${coords.y}px, rgba(${glowColor}, 0.35), transparent 60%)`,
            maskImage: 'linear-gradient(black, black) content-box, linear-gradient(black, black)',
            WebkitMaskImage: 'linear-gradient(black, black) content-box, linear-gradient(black, black)',
            maskComposite: 'exclude',
            WebkitMaskComposite: 'xor',
            padding: '1px'
          }}
        />
      )}

      <div className="relative z-10">{children}</div>
    </div>
  );
}
