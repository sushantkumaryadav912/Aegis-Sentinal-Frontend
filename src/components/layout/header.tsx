'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, Terminal, BrainCircuit, Eye, GitBranch } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
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
    { name: 'Products', path: '/products', hasDropdown: true },
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
          "fixed top-4 left-1/2 z-50 w-[95%] max-w-6xl -translate-x-1/2 transition-all duration-500 rounded-full border",
          scrolled 
            ? "bg-slate-950/95 backdrop-blur-md border-slate-800/80 shadow-[0_0_50px_rgba(0,0,0,0.5)] py-3 px-6" 
            : "bg-slate-950/85 backdrop-blur-md border-slate-900/40 py-5 px-6"
        )}
      >
        <div className="flex items-center justify-between h-12">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group shrink-0" aria-label="Go to home">
            <Image 
              src="/logo2.png" 
              alt="Aegis Sentinel Logo" 
              width={36} 
              height={36} 
              priority 
              className="h-9 w-9 object-contain rounded-lg border border-cyan-500/30 bg-cyan-500/5 p-1.5 transition-transform duration-300 group-hover:scale-105 group-hover:border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.15)]" 
            />
            <span className="text-sm font-black tracking-[0.18em] uppercase text-slate-100 font-mono transition-colors group-hover:text-cyan-400 duration-300">
              AEGIS <span className="text-cyan-400">SENTINEL</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <div 
                key={item.path} 
                className="relative"
                onMouseEnter={() => item.hasDropdown && setProductsOpen(true)}
                onMouseLeave={() => item.hasDropdown && setProductsOpen(false)}
              >
                {item.hasDropdown ? (
                  <Link
                    href={item.path}
                    className={cn(
                      "flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider transition-colors hover:text-cyan-400 cursor-pointer py-2",
                      isActive(item.path) ? "text-cyan-400" : "text-slate-400"
                    )}
                  >
                    {item.name}
                    <ChevronDown size={14} className={cn("transition-transform duration-300", productsOpen ? "rotate-180 text-cyan-400" : "")} />
                  </Link>
                ) : (
                  <Link
                    href={item.path}
                    className={cn(
                      "text-xs font-semibold uppercase tracking-wider transition-colors hover:text-cyan-400 relative py-2",
                      isActive(item.path) ? "text-cyan-400" : "text-slate-400"
                    )}
                  >
                    {item.name}
                    {isActive(item.path) && (
                      <motion.div 
                        layoutId="navbar-indicator"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-linear-to-r from-cyan-400 to-indigo-500 rounded-full"
                      />
                    )}
                  </Link>
                )}

                {/* Dropdown megamenu */}
                {item.hasDropdown && (
                  <AnimatePresence>
                    {productsOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full -left-20 pt-4 w-[280px]"
                      >
                        <div className="bg-slate-950/95 backdrop-blur-md rounded-2xl p-4 shadow-2xl border border-slate-800/80">
                          <div className="space-y-1">
                            <Link href="/products/sentinel-core" className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-900/60 transition-colors">
                              <BrainCircuit className="h-4.5 w-4.5 text-cyan-400 mt-0.5 shrink-0" />
                              <div>
                                <div className="text-xs font-bold text-slate-200">Sentinel Core</div>
                                <div className="text-[10px] text-slate-500 mt-0.5">Detection Engine</div>
                              </div>
                            </Link>
                            <Link href="/products/watchtower" className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-900/60 transition-colors">
                              <Eye className="h-4.5 w-4.5 text-red-400 mt-0.5 shrink-0" />
                              <div>
                                <div className="text-xs font-bold text-slate-200">Watchtower</div>
                                <div className="text-[10px] text-slate-500 mt-0.5">Threat Intelligence</div>
                              </div>
                            </Link>
                            <Link href="/products/forge" className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-900/60 transition-colors">
                              <GitBranch className="h-4.5 w-4.5 text-rose-400 mt-0.5 shrink-0" />
                              <div>
                                <div className="text-xs font-bold text-slate-200">Forge</div>
                                <div className="text-[10px] text-slate-500 mt-0.5">SOAR Automation</div>
                              </div>
                            </Link>
                            <Link href="/products/pulse" className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-900/60 transition-colors">
                              <Terminal className="h-4.5 w-4.5 text-purple-400 mt-0.5 shrink-0" />
                              <div>
                                <div className="text-xs font-bold text-slate-200">Pulse</div>
                                <div className="text-[10px] text-slate-500 mt-0.5">Monitoring & Telemetry</div>
                              </div>
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/login" className="text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-slate-200 transition-colors">
              Sign In
            </Link>
            <Link href="/register">
              <Button size="sm" variant="glow" className="rounded-full shadow-lg h-9 px-4 text-xs tracking-wider uppercase font-extrabold">
                Start Trial
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-slate-950/95 backdrop-blur-3xl md:hidden pt-28 flex flex-col justify-between pb-12"
          >
            <div className="flex flex-col px-8">
              {navItems.map((item, idx) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Link
                    href={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "text-xl font-bold py-4 block border-b border-slate-900 transition-colors",
                      isActive(item.path) ? "text-cyan-400" : "text-slate-300 hover:text-cyan-400"
                    )}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col gap-4 px-8 mt-auto"
            >
              <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full h-12 text-sm tracking-wider uppercase font-bold border-slate-800 bg-transparent text-slate-300">
                  Sign In
                </Button>
              </Link>
              <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="glow" className="w-full h-12 text-sm tracking-wider uppercase font-extrabold text-slate-950">
                  Start Trial
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
