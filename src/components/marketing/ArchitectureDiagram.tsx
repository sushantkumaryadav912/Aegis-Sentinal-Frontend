'use client';

import { motion } from 'framer-motion';
import { Server, Database, Activity, ShieldAlert, Cpu } from 'lucide-react';

export function ArchitectureDiagram() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring' as const, stiffness: 50 },
    },
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-8 rounded-2xl border border-slate-800/60 bg-slate-900/40 backdrop-blur-3xl shadow-2xl relative overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-10% 0px' }}
        className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 py-12"
      >
        {/* Step 1: Ingestion */}
        <motion.div variants={itemVariants} className="flex flex-col items-center flex-1">
          <div className="w-20 h-20 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(59,130,246,0.1)] relative">
            <Server className="h-10 w-10 text-blue-400" />
            <motion.div 
               animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }} 
               transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
               className="absolute -inset-1 rounded-2xl border border-blue-500/20"
            />
          </div>
          <h4 className="text-slate-100 font-semibold mb-1">Multi-Cloud Ingestion</h4>
          <p className="text-sm text-slate-400 text-center max-w-[180px]">AWS, GCP, Azure log streaming</p>
        </motion.div>

        {/* Arrow 1 */}
        <motion.div variants={itemVariants} className="hidden md:flex text-slate-700">
           <svg width="60" height="24" viewBox="0 0 60 24" fill="none" xmlns="http://www.w3.org/2000/svg">
             <path d="M0 12h58m-8-8l8 8-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
             <motion.path 
               initial={{ pathLength: 0, opacity: 0 }}
               animate={{ pathLength: 1, opacity: 1 }}
               transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
               d="M0 12h58m-8-8l8 8-8 8" 
               stroke="#3b82f6" 
               strokeWidth="2" 
               strokeLinecap="round" 
               strokeLinejoin="round" 
             />
           </svg>
        </motion.div>

        {/* Step 2: Processing */}
        <motion.div variants={itemVariants} className="flex flex-col items-center flex-1">
          <div className="w-24 h-24 rounded-3xl bg-purple-500/10 border border-purple-500/40 flex items-center justify-center mb-4 shadow-[0_0_40px_rgba(168,85,247,0.15)] relative">
            <Cpu className="h-12 w-12 text-purple-400" />
            <motion.div 
               animate={{ rotate: 360 }} 
               transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
               className="absolute -inset-2 rounded-3xl border border-dashed border-purple-500/30"
            />
          </div>
          <h4 className="text-slate-100 font-semibold mb-1 text-center">Python Detection Engine</h4>
          <p className="text-sm text-slate-400 text-center max-w-[180px]">Anomaly & threat modeling</p>
        </motion.div>

        {/* Arrow 2 */}
        <motion.div variants={itemVariants} className="hidden md:flex text-slate-700">
           <svg width="60" height="24" viewBox="0 0 60 24" fill="none" xmlns="http://www.w3.org/2000/svg">
             <path d="M0 12h58m-8-8l8 8-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
             <motion.path 
               initial={{ pathLength: 0, opacity: 0 }}
               animate={{ pathLength: 1, opacity: 1 }}
               transition={{ repeat: Infinity, duration: 1.5, ease: "linear", delay: 0.5 }}
               d="M0 12h58m-8-8l8 8-8 8" 
               stroke="#a855f7" 
               strokeWidth="2" 
               strokeLinecap="round" 
               strokeLinejoin="round" 
             />
           </svg>
        </motion.div>

        {/* Step 3: Action */}
        <motion.div variants={itemVariants} className="flex flex-col items-center flex-1">
          <div className="flex gap-4 mb-4">
             <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shadow-[0_0_30px_rgba(245,158,11,0.1)]">
               <ShieldAlert className="h-8 w-8 text-amber-400" />
             </div>
             <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.1)]">
               <Activity className="h-8 w-8 text-cyan-400" />
             </div>
          </div>
          <h4 className="text-slate-100 font-semibold mb-1">Automated Response</h4>
          <p className="text-sm text-slate-400 text-center max-w-[200px]">Alerting & workflow remediation</p>
        </motion.div>

      </motion.div>
    </div>
  );
}
