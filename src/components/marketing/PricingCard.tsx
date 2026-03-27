'use client';

import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: string[];
  ctaText: string;
  ctaHref: string;
  isPopular?: boolean;
}

interface PricingCardProps {
  tier: PricingTier;
  className?: string;
}

export function PricingCard({ tier, className }: PricingCardProps) {
  return (
    <Card 
      className={cn(
        "flex flex-col h-full transition-all duration-300 relative",
        tier.isPopular 
          ? "bg-slate-900/80 border-blue-500/50 shadow-lg shadow-blue-500/10 scale-105 z-10" 
          : "bg-slate-900/40 border-slate-800/60 hover:border-slate-700/80",
        className
      )}
    >
      {tier.isPopular && (
        <div className="absolute -top-4 left-0 right-0 flex justify-center">
          <span className="bg-linear-to-r from-blue-500 to-cyan-500 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
            Most Popular
          </span>
        </div>
      )}
      <CardHeader className="pt-8 pb-6">
        <CardTitle className="text-2xl font-bold text-slate-100">{tier.name}</CardTitle>
        <div className="mt-4 flex items-baseline">
          <span className="text-5xl font-extrabold tracking-tight text-white">{tier.price}</span>
          {tier.price !== 'Custom' && <span className="text-slate-400 ml-2 font-medium">/month</span>}
        </div>
        <p className="text-sm text-slate-400 mt-3">{tier.description}</p>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <ul className="space-y-4">
          {tier.features.map((feature, i) => (
            <li key={i} className="flex items-start">
              <Check className="h-5 w-5 text-blue-400 mr-3 shrink-0 mt-0.5" />
              <span className="text-slate-300 text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter className="pt-6 pb-8">
        <Link href={tier.ctaHref} className="w-full">
          <Button 
            className={cn("w-full py-6 text-md font-medium", tier.isPopular ? "bg-white text-slate-950 hover:bg-slate-200" : "")} 
            variant={tier.isPopular ? "default" : "outline"}
          >
            {tier.ctaText}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
