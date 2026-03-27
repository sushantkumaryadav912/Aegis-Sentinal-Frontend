import Link from 'next/link';
import Image from 'next/image';
import { Github, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 pt-16 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12 border-b border-slate-800/50 pb-12">
          
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2 mb-4 group">
              <Image src="/logo.png" alt="CIDR Logo" width={180} height={60} className="h-10 md:h-12 w-auto object-contain group-hover:opacity-80 transition-opacity mb-2" />
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs mb-6 inline-block">
              Intelligent Cloud Security Operations Platform. Detect, investigate, and respond to threats across multi-cloud environments seamlessly.
            </p>
            <div className="flex gap-4">
              <a href="#" title="GitHub" aria-label="GitHub" className="text-slate-400 hover:text-slate-200 transition-colors">
                <Github size={20} />
              </a>
              <a href="#" title="Twitter" aria-label="Twitter" className="text-slate-400 hover:text-slate-200 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" title="LinkedIn" aria-label="LinkedIn" className="text-slate-400 hover:text-slate-200 transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div className="col-span-1">
            <h3 className="font-semibold text-slate-100 mb-4 tracking-wide uppercase text-xs">Product</h3>
            <ul className="space-y-3">
              <li><Link href="/products" className="text-slate-400 hover:text-blue-400 text-sm transition-colors">Threat Detection</Link></li>
              <li><Link href="/products" className="text-slate-400 hover:text-blue-400 text-sm transition-colors">Cloud SIEM</Link></li>
              <li><Link href="/products" className="text-slate-400 hover:text-blue-400 text-sm transition-colors">Posture Management</Link></li>
              <li><Link href="/pricing" className="text-slate-400 hover:text-blue-400 text-sm transition-colors">Pricing</Link></li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="font-semibold text-slate-100 mb-4 tracking-wide uppercase text-xs">Company</h3>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-slate-400 hover:text-blue-400 text-sm transition-colors">About</Link></li>
              <li><Link href="/careers" className="text-slate-400 hover:text-blue-400 text-sm transition-colors">Careers</Link></li>
              <li><Link href="/contact" className="text-slate-400 hover:text-blue-400 text-sm transition-colors">Contact</Link></li>
              <li><Link href="#" className="text-slate-400 hover:text-blue-400 text-sm transition-colors">Partners</Link></li>
            </ul>
          </div>

          <div className="col-span-2 md:col-span-1 border-t md:border-none border-slate-800/50 pt-8 md:pt-0">
            <h3 className="font-semibold text-slate-100 mb-4 tracking-wide uppercase text-xs">Legal</h3>
            <ul className="space-y-3">
              <li><Link href="/privacy" className="text-slate-400 hover:text-slate-200 text-sm transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-slate-400 hover:text-slate-200 text-sm transition-colors">Terms of Service</Link></li>
              <li><Link href="/cookies" className="text-slate-400 hover:text-slate-200 text-sm transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>

        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col gap-2">
            <p className="text-sm text-slate-500">
              © {new Date().getFullYear()} CIDR Security. All rights reserved.
            </p>
            <p className="text-xs text-slate-600">
              Symbiosis Centre for Entrepreneurship & Innovation • Pune, Maharashtra
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
               <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
               All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
