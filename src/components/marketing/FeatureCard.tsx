'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  className?: string;
  iconClassName?: string;
}

export function FeatureCard({ icon, title, description, className, iconClassName }: FeatureCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="h-full"
    >
      <Card className={cn("h-full bg-slate-900/40 border-slate-800/60 backdrop-blur-md overflow-hidden relative group", className)}>
        {/* Subtle gradient hover background */}
        <div className="absolute inset-0 bg-linear-to-br from-blue-500/0 via-transparent to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
        
        <CardContent className="p-8 h-full flex flex-col relative z-10">
          <div className={cn("h-12 w-12 rounded-xl flex items-center justify-center mb-6 border border-slate-800", iconClassName)}>
            {icon}
          </div>
          <h3 className="text-xl font-semibold text-slate-100 mb-3">{title}</h3>
          <p className="text-slate-400 leading-relaxed text-sm flex-grow">
            {description}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
