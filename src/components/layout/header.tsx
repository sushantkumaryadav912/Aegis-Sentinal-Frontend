'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'About', path: '/about' },
    { name: 'Careers', path: '/careers' },
    { name: 'Contact', path: '/contact' }
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <>
      <header 
        className={cn(
          "fixed top-0 left-0 z-50 w-full transition-all duration-300 border-b",
          scrolled 
            ? "bg-slate-950/80 backdrop-blur-xl border-slate-800/80 shadow-lg" 
            : "bg-transparent border-transparent"
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 h-20">
          {/* Logo/Brand */}
          <Link
            href="/"
            className="flex items-center gap-2 group"
            aria-label="Go to home"
          >
            <Image src="/logo.png" alt="CIDR Logo" width={180} height={60} priority className="h-10 md:h-12 w-auto object-contain group-hover:opacity-80 transition-opacity" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex flex-1 items-center justify-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-slate-200 relative",
                  isActive(item.path) ? "text-slate-100" : "text-slate-400"
                )}
              >
                {item.name}
                {isActive(item.path) && (
                  <motion.div 
                    layoutId="navbar-indicator"
                    className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-blue-500 rounded-full"
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
              Sign In
            </Link>
            <Link href="/register">
              <Button
                size="sm"
                className="rounded-full bg-slate-100 text-slate-900 hover:bg-white hover:scale-105 transition-all font-semibold px-5"
              >
                Start Free Trial
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-slate-300 hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-slate-950/95 backdrop-blur-3xl md:hidden pt-24"
          >
            <div className="flex flex-col px-6">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "text-2xl font-bold py-4 border-b border-slate-800/50 transition-colors",
                    isActive(item.path) ? "text-blue-400" : "text-slate-300 hover:text-white"
                  )}
                >
                  {item.name}
                </Link>
              ))}

              <div className="flex flex-col gap-4 mt-8">
                <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full h-12 border-slate-700 bg-transparent text-slate-200">
                    Sign In
                  </Button>
                </Link>
                <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full h-12 bg-blue-600 text-white hover:bg-blue-700">
                    Start Free Trial
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
