'use client';

import React, { useEffect, useState, useRef } from 'react';

interface CountUpStatProps {
  value: string;
  label: string;
}

export function CountUpStat({ value, label }: CountUpStatProps) {
  const [displayValue, setDisplayValue] = useState('0');
  const [inView, setInView] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.1 }
    );

    const el = elementRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  useEffect(() => {
    if (!inView) return;

    // Parse value (e.g. "100k+", "2.4M", "500")
    const match = value.match(/^([<>]?)([\d.]+)([kM]?)([+ms]*)$/);
    if (!match) {
      setDisplayValue(value);
      return;
    }

    const prefix = match[1];
    const numValue = parseFloat(match[2]);
    const suffix = match[3] + match[4];

    let start = 0;
    const duration = 1200; // ms
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out quad
      const easeProgress = progress * (2 - progress);
      const current = start + easeProgress * (numValue - start);

      const isFloat = match[2].includes('.');
      const formattedNum = isFloat ? current.toFixed(1) : Math.floor(current).toString();

      setDisplayValue(`${prefix}${formattedNum}${suffix}`);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(value); // Ensure exact final value is set
      }
    };

    requestAnimationFrame(animate);
  }, [inView, value]);

  return (
    <div ref={elementRef} className="flex flex-col items-center p-4">
      <span className="text-3xl md:text-4xl font-extrabold text-slate-100 mb-1 tracking-tight font-mono">
        {displayValue}
      </span>
      <span className="text-xs text-slate-500 font-semibold uppercase tracking-widest text-center">
        {label}
      </span>
    </div>
  );
}
