'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Terminal, ShieldCheck, Radio, Download, Sparkles, UserCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { LaborComplianceModal } from './LaborComplianceModal';

interface TelemetryLog {
  id: string;
  time: string;
  user: string;
  type: string; // 'IN' | 'OUT'
  role: string; // 'Employee' | 'Member' | 'Trainer' | 'Guest'
  status: string; // 'Granted' | 'Denied'
}

interface HeroTelemetryLogsProps {
  logs: TelemetryLog[];
}

export const HeroTelemetryLogs: React.FC<HeroTelemetryLogsProps> = ({ logs }) => {
  const { t, locale } = useLanguage();
  const [isLaborModalOpen, setIsLaborModalOpen] = useState(false);

  return (
    <>
      <div className="bg-[#05070a]/90 backdrop-blur-xl border border-cyan-500/20 rounded-xl p-3.5 shadow-[0_0_20px_rgba(0,163,255,0.05)] relative overflow-hidden">
        {/* Top Scan Line Glow */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />

        {/* Header with Labor Order №01-15/ნ Compliance Badge */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
          <h5 className="text-[10px] font-mono font-bold text-[#E2E8F0] tracking-wider uppercase flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ff87] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00ff87]" />
            </span>
            <Terminal className="w-3.5 h-3.5 text-[#00ff87] drop-shadow-[0_0_8px_#00ff87]" />
            <span>{t('db_logs_title')}</span>
          </h5>

          {/* Compliance & Export Button */}
          <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
            <button
              data-testid="hero-labor-export-btn"
              onClick={(e) => {
                e.stopPropagation();
                setIsLaborModalOpen(true);
              }}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[8px] font-mono font-bold uppercase transition-all duration-200 cursor-pointer hover:shadow-[0_0_10px_rgba(0,255,135,0.2)]"
              title="ბრძანება №01-15/ნ შრომის დროის ელექტრონული აღრიცხვა"
            >
              <ShieldCheck className="w-2.5 h-2.5 text-emerald-400" />
              <span>№01-15/ნ ტაბელი</span>
              <Download className="w-2.5 h-2.5 ml-0.5 opacity-70" />
            </button>
          </div>
        </div>

        {/* Logs Feed */}
        <div className="space-y-1.5 font-mono text-[9px] max-h-[140px] overflow-y-auto pr-0.5">
          <AnimatePresence initial={false}>
            {logs.map((log, index) => {
              const isGranted = log.status === 'Granted';
              const isIn = log.type === 'IN';

              return (
                <motion.div
                  key={log.id || `log-${index}`}
                  initial={{ opacity: 0, x: -10, scale: 0.98 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center justify-between p-1.5 bg-white/[0.02] hover:bg-white/5 rounded-lg border border-white/[0.04] hover:border-cyan-500/30 transition-all group"
                >
                  {/* Left user info */}
                  <div className="flex items-center gap-1.5 min-w-0">
                    {/* RFID Pulse dot */}
                    <div className="relative flex items-center justify-center shrink-0">
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          isGranted ? 'bg-[#00ff87] shadow-[0_0_6px_#00ff87]' : 'bg-rose-500 shadow-[0_0_6px_#f43f5e]'
                        }`}
                      />
                    </div>

                    <span className="text-[#94A3B8] text-[8.5px] shrink-0">{log.time}</span>
                    <span className="text-white font-semibold truncate max-w-[90px]">{log.user}</span>
                    
                    <span
                      className={`px-1 py-0.2 rounded text-[7.5px] font-mono font-bold shrink-0 ${
                        log.role === 'Employee'
                          ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/20'
                          : log.role === 'Trainer'
                          ? 'bg-[#00ff87]/15 text-[#00ff87] border border-[#00ff87]/20 drop-shadow-[0_0_6px_#00ff87]'
                          : 'bg-indigo-500/10 text-indigo-300 border border-indigo-500/20'
                      }`}
                    >
                      {log.role}
                    </span>
                  </div>

                  {/* Right Direction & Status */}
                  <div className="flex items-center gap-1.5 shrink-0 text-[8.5px]">
                    <div className="flex items-center gap-1 font-bold">
                      <Radio className="w-2.5 h-2.5 text-cyan-400/70 animate-pulse hidden sm:inline-block" />
                      <span className={isIn ? 'text-[#00ff87]' : 'text-rose-400'}>
                        {log.type}
                      </span>
                    </div>

                    <span className="text-slate-700">|</span>

                    <span
                      className={`px-1 py-0.2 rounded text-[7.5px] font-bold ${
                        isGranted
                          ? 'text-[#00ff87] bg-[#00ff87]/10'
                          : 'text-rose-400 bg-rose-500/10'
                      }`}
                    >
                      {isGranted ? 'PASS' : 'DENY'}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Georgian Labor Order №01-15/n Audit Modal */}
      <LaborComplianceModal
        isOpen={isLaborModalOpen}
        onClose={() => setIsLaborModalOpen(false)}
      />
    </>
  );
};
