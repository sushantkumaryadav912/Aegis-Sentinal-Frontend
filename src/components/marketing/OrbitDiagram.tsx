'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Cloud, Lock, Server, Shield, Terminal, Database, MessageSquare } from 'lucide-react';

export function OrbitDiagram() {
  const innerOrbitIcons = [
    { icon: <Cloud className="h-5 w-5 text-cyan-400" />, label: "AWS", color: "from-cyan-400/20 to-transparent" },
    { icon: <Cloud className="h-5 w-5 text-purple-400" />, label: "GCP", color: "from-purple-400/20 to-transparent" },
    { icon: <Cloud className="h-5 w-5 text-blue-400" />, label: "Azure", color: "from-blue-400/20 to-transparent" },
  ];

  const outerOrbitIcons = [
    { icon: <Server className="h-4 w-4 text-emerald-400" />, label: "K8s" },
    { icon: <Lock className="h-4 w-4 text-amber-400" />, label: "Okta" },
    { icon: <Terminal className="h-4 w-4 text-slate-300" />, label: "OSSEC" },
    { icon: <Shield className="h-4 w-4 text-rose-400" />, label: "Snort" },
    { icon: <Database className="h-4 w-4 text-indigo-400" />, label: "Logs" },
    { icon: <MessageSquare className="h-4 w-4 text-pink-400" />, label: "Slack" },
  ];

  return (
    <div className="relative h-[400px] w-full max-w-[400px] mx-auto flex items-center justify-center overflow-hidden">
      
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-radial-gradient-glow pointer-events-none" />

      {/* Central Node */}
      <div className="relative z-10 flex flex-col items-center justify-center w-24 h-24 rounded-full border border-cyan-500/30 bg-slate-950 shadow-[0_0_50px_rgba(0,229,255,0.25)]">
        <div className="absolute inset-0.5 rounded-full border border-dashed border-cyan-500/20 animate-spin" style={{ animationDuration: '30s' }} />
        <span className="text-xs font-black tracking-widest text-cyan-400 uppercase">AEGIS</span>
        <span className="text-[9px] text-slate-500 font-semibold tracking-wider mt-1">CORE</span>
      </div>

      {/* Orbit Track 1 (Inner) */}
      <div className="absolute w-[220px] h-[220px] rounded-full border border-slate-800/40" />

      {/* Orbit 1 Rotating Wrapper */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
        className="absolute w-[220px] h-[220px] flex items-center justify-center"
      >
        {innerOrbitIcons.map((item, idx) => {
          const angle = (idx * 360) / innerOrbitIcons.length;
          const radius = 110; // Half of width
          const x = Math.round(radius * Math.cos((angle * Math.PI) / 180));
          const y = Math.round(radius * Math.sin((angle * Math.PI) / 180));

          return (
            <motion.div
              key={idx}
              style={{ x, y }}
              className="absolute"
            >
              {/* Undo rotating so icons stay upright */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
                className="flex flex-col items-center group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shadow-lg group-hover:border-cyan-500/50 transition-colors">
                  {item.icon}
                </div>
                <span className="text-[10px] text-slate-500 font-bold tracking-wider mt-1 group-hover:text-slate-300 transition-colors">
                  {item.label}
                </span>
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Orbit Track 2 (Outer) */}
      <div className="absolute w-[340px] h-[340px] rounded-full border border-slate-900/30" />

      {/* Orbit 2 Rotating Wrapper */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ repeat: Infinity, duration: 45, ease: "linear" }}
        className="absolute w-[340px] h-[340px] flex items-center justify-center"
      >
        {outerOrbitIcons.map((item, idx) => {
          const angle = (idx * 360) / outerOrbitIcons.length;
          const radius = 170;
          const x = Math.round(radius * Math.cos((angle * Math.PI) / 180));
          const y = Math.round(radius * Math.sin((angle * Math.PI) / 180));

          return (
            <motion.div
              key={idx}
              style={{ x, y }}
              className="absolute"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 45, ease: "linear" }}
                className="flex flex-col items-center group cursor-pointer"
              >
                <div className="w-8 h-8 rounded-lg bg-slate-950 border border-slate-900 flex items-center justify-center shadow-md group-hover:border-purple-500/50 transition-colors">
                  {item.icon}
                </div>
                <span className="text-[9px] text-slate-600 font-semibold tracking-wider mt-1 group-hover:text-slate-400 transition-colors">
                  {item.label}
                </span>
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>

    </div>
  );
}
