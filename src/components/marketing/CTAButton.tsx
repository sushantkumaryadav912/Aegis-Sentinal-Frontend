'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Button, ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface CTAButtonProps extends ButtonProps {
  children: ReactNode;
  href?: string;
  withArrow?: boolean;
}

export function CTAButton({ children, href, className, withArrow = false, ...props }: CTAButtonProps) {
  const content = (
    <Button 
      className={cn(
        "relative group overflow-hidden rounded-full font-medium tracking-wide",
        className
      )}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center">
        {children}
        {withArrow && (
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
        )}
      </span>
      <div className="absolute inset-0 h-full w-full bg-linear-to-r from-blue-600 to-cyan-500 opacity-80 group-hover:opacity-100 transition-opacity duration-300 z-0" />
    </Button>
  );

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="inline-block"
    >
      {href ? (
        <Link href={href} className="inline-block">
          {content}
        </Link>
      ) : (
        content
      )}
    </motion.div>
  );
}
