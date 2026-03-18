'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'About', path: '/about' }
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <>
      <header className="fixed top-0 left-0 z-50 w-full">
        <nav className="w-full bg-white/60 text-neutral-900 backdrop-blur-md px-4 md:px-6 py-3 shadow-lg border-b border-neutral-200">
          <div className="mx-auto flex max-w-7xl items-center justify-between">
            {/* Logo/Brand */}
            <Link
              href="/"
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              aria-label="Go to home"
            >
              <Shield className="h-8 w-8 text-blue-500" />
              <span className="hidden sm:inline text-lg font-bold text-neutral-900">CIDR</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`text-sm font-medium transition-colors relative ${
                    isActive(item.path)
                      ? 'text-neutral-900 after:absolute after:-bottom-1 after:left-0 after:right-0 after:h-0.5 after:bg-neutral-900'
                      : 'text-neutral-700 hover:text-neutral-900'
                  }`}
                  data-testid={`nav-${item.name.toLowerCase()}`}
                >
                  {item.name}
                </Link>
              ))}

              <Link href="/login">
                <Button
                  size="sm"
                  className="px-4 py-2 rounded-full bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-700 hover:shadow-md transform hover:-translate-y-0.5 transition-all"
                  data-testid="nav-login"
                >
                  Sign In
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-neutral-900 hover:text-neutral-500 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white/80 md:hidden">
          <div className="flex flex-col items-center justify-center min-h-screen px-6 py-20">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-4xl font-medium mb-8 transition-colors ${
                  isActive(item.path)
                    ? 'text-neutral-900'
                    : 'text-neutral-500 hover:text-neutral-900'
                }`}
              >
                {item.name}
              </Link>
            ))}

            <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
              <Button
                size="lg"
                className="mt-6 px-6 py-3 rounded-full bg-neutral-900 text-white text-base font-medium hover:bg-neutral-700 hover:shadow-lg transform hover:scale-105 transition-all"
              >
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
