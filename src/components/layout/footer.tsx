import Link from 'next/link';
import Image from 'next/image';
import { Github, Twitter, Linkedin, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-[#03060f] border-t border-slate-900 pt-20 pb-10 px-4 sm:px-6 lg:px-8 overflow-hidden bg-grid-pattern">
      {/* Glow Effect */}
      <div className="absolute -bottom-48 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16 border-b border-slate-900 pb-16">
          
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="inline-flex items-center gap-3 mb-6 group">
              <Image 
                src="/logo2.png" 
                alt="Aegis Sentinel Logo" 
                width={36} 
                height={36} 
                className="h-9 w-9 object-contain rounded-lg border border-cyan-500/20 bg-cyan-500/5 p-1.5 transition-transform duration-300 group-hover:scale-105 group-hover:border-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.1)]" 
              />
              <span className="text-sm font-black tracking-[0.18em] uppercase text-slate-100 font-mono transition-colors group-hover:text-cyan-400 duration-300">
                AEGIS <span className="text-cyan-400">SENTINEL</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs mb-6 font-light">
              Autonomous Cloud Incident Detection and Response operations. Secure your multi-cloud architecture from behavioral anomalies.
            </p>
            <div className="flex gap-4">
              <a href="#" aria-label="GitHub" className="w-8 h-8 rounded-full border border-slate-900 bg-slate-950 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/20 transition-all">
                <Github size={16} />
              </a>
              <a href="#" aria-label="Twitter" className="w-8 h-8 rounded-full border border-slate-900 bg-slate-950 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/20 transition-all">
                <Twitter size={16} />
              </a>
              <a href="#" aria-label="LinkedIn" className="w-8 h-8 rounded-full border border-slate-900 bg-slate-950 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/20 transition-all">
                <Linkedin size={16} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-5">Product</h3>
            <ul className="space-y-3.5">
              <li><Link href="/products/sentinel-core" className="text-slate-400 hover:text-cyan-400 text-sm font-light transition-colors">Sentinel Core</Link></li>
              <li><Link href="/products/watchtower" className="text-slate-400 hover:text-cyan-400 text-sm font-light transition-colors">Watchtower</Link></li>
              <li><Link href="/products/forge" className="text-slate-400 hover:text-cyan-400 text-sm font-light transition-colors">Forge</Link></li>
              <li><Link href="/products/pulse" className="text-slate-400 hover:text-cyan-400 text-sm font-light transition-colors">Pulse</Link></li>
              <li><Link href="/pricing" className="text-slate-400 hover:text-cyan-400 text-sm font-light transition-colors">Pricing Tiers</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-5">Company</h3>
            <ul className="space-y-3.5">
              <li><Link href="/about" className="text-slate-400 hover:text-cyan-400 text-sm font-light transition-colors">About Us</Link></li>
              <li><Link href="/careers" className="text-slate-400 hover:text-cyan-400 text-sm font-light transition-colors">Careers</Link></li>
              <li><Link href="/contact" className="text-slate-400 hover:text-cyan-400 text-sm font-light transition-colors">Contact</Link></li>
              <li><a href="#" className="text-slate-400 hover:text-cyan-400 text-sm font-light transition-colors">Global Partners</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-5">Security</h3>
            <ul className="space-y-3.5">
              <li><Link href="/privacy" className="text-slate-400 hover:text-cyan-400 text-sm font-light transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-slate-400 hover:text-cyan-400 text-sm font-light transition-colors">Terms of Service</Link></li>
              <li><Link href="/cookies" className="text-slate-400 hover:text-cyan-400 text-sm font-light transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>

        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col gap-1.5 text-center md:text-left">
            <p className="text-xs text-slate-500 font-light">
              © {new Date().getFullYear()} Aegis Sentinel. All rights reserved.
            </p>
            <p className="text-[11px] text-slate-600 font-light flex items-center gap-1 justify-center md:justify-start">
              Incubated at Symbiosis Centre for Entrepreneurship & Innovation • Pune, India
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/5 border border-emerald-500/10 text-emerald-400 text-[11px] font-mono tracking-wider font-semibold">
               <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
               99.98% CORE PLATFORM UPTIME
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
