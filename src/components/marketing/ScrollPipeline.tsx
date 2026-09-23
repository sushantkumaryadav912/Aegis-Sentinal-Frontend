'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Database, ShieldAlert, Cpu, CheckCircle, Bell } from 'lucide-react';

interface Step {
  num: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
  color: string;
  glow: string;
}

export function ScrollPipeline() {
  const steps: Step[] = [
    {
      num: "01",
      title: "Telemetry Ingestion",
      desc: "Stream real-time access logs and config trails from AWS CloudTrail, Google Cloud Logging, and Azure Monitor.",
      icon: <Database className="h-6 w-6" />,
      color: "text-cyan-400 border-cyan-500/20 bg-cyan-500/5",
      glow: "rgba(0, 229, 255, 0.15)"
    },
    {
      num: "02",
      title: "Behavioral Analysis",
      desc: "Our Python engine clusters activities and runs Isolation Forests to map baseline behavior and isolate threat vectors.",
      icon: <Cpu className="h-6 w-6" />,
      color: "text-purple-400 border-purple-500/20 bg-purple-500/5",
      glow: "rgba(139, 92, 246, 0.15)"
    },
    {
      num: "03",
      title: "Anomalous Detection",
      desc: "High-risk deviations trigger confidence-scored alerts with localized forensics and full context indicators.",
      icon: <ShieldAlert className="h-6 w-6" />,
      color: "text-rose-400 border-rose-500/20 bg-rose-500/5",
      glow: "rgba(239, 68, 68, 0.15)"
    },
    {
      num: "04",
      title: "Automated Action",
      desc: "Kick off custom SOAR playbooks to automatically quarantine instances, rotate keys, or revoke IAM privileges.",
      icon: <CheckCircle className="h-6 w-6" />,
      color: "text-emerald-400 border-emerald-500/20 bg-emerald-500/5",
      glow: "rgba(16, 185, 129, 0.15)"
    }
  ];

  return (
    <div className="relative max-w-4xl mx-auto px-4 py-8">
      {/* Central Connective Line */}
      <div className="absolute left-[39px] md:left-1/2 top-8 bottom-8 w-0.5 bg-linear-to-b from-cyan-500 via-purple-500 to-emerald-500 opacity-20 pointer-events-none -translate-x-1/2" />

      <div className="space-y-16">
        {steps.map((step, idx) => {
          const isEven = idx % 2 === 0;

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15% 0px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className={`flex flex-col md:flex-row items-start md:items-center gap-8 ${
                isEven ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Left/Right Card */}
              <div className="flex-1 w-full md:w-auto">
                <div
                  className="glass-card p-6 rounded-2xl relative overflow-hidden group hover:scale-[1.01]"
                  style={{
                    boxShadow: `0 0 30px rgba(0, 0, 0, 0.2), inset 0 0 12px ${step.glow}`,
                  }}
                >
                  <div className="flex items-center gap-4 mb-3">
                    <span className={`text-xs font-mono font-bold tracking-widest px-2 py-0.5 rounded-md border ${step.color}`}>
                      {step.num}
                    </span>
                    <h3 className="text-lg font-bold text-slate-100">{step.title}</h3>
                  </div>
                  <p className="text-sm text-slate-400 font-light leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>

              {/* Central Node Badge */}
              <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full border border-slate-800 bg-slate-950 shrink-0 md:mx-auto">
                <div className={`p-2 rounded-full border ${step.color}`}>
                  {step.icon}
                </div>
              </div>

              {/* Empty Spacer for Desktop Layout alignment */}
              <div className="flex-1 hidden md:block" />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
