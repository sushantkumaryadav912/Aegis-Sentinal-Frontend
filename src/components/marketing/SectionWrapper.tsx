import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  id?: string;
}

export function SectionWrapper({ children, className, containerClassName, id }: SectionWrapperProps) {
  return (
    <section id={id} className={cn("py-20 md:py-32 relative overflow-hidden", className)}>
      <div className={cn("max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10", containerClassName)}>
        {children}
      </div>
    </section>
  );
}
