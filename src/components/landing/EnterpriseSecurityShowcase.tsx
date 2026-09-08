'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Lock, CreditCard, Network, ChevronRight } from 'lucide-react';
import { soundEngine } from '@/core';
import { SECURITY_STANDARDS_BADGES } from '@/data/enterpriseSecurityData';
import { SecurityScoreSimulator } from './security/SecurityScoreSimulator';
import { FinancialSovereigntyCard } from './security/FinancialSovereigntyCard';
import { ThreatDefenseConsole } from './security/ThreatDefenseConsole';
import { IpWhitelistSubPanel } from './security/IpWhitelistSubPanel';

type SecurityTab = 'FINANCE' | 'IP_GUARD' | 'SCORE' | 'THREATS';

export const EnterpriseSecurityShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SecurityTab>('FINANCE');

  const handleTabChange = (tab: SecurityTab) => {
    soundEngine.playPulseNode();
    setActiveTab(tab);
  };

  return (
    <section
      id="enterprise-security"
      className="relative py-20 lg:py-28 bg-[#080B10] text-white overflow-hidden border-t border-b border-white/5 select-none scroll-mt-20"
    >
      {/* Background ambient glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#00A3FF]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[300px] bg-[#00ff87]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl space-y-10 sm:space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00A3FF]/10 border border-[#00A3FF]/30 font-mono text-[11px] text-[#00A3FF] uppercase tracking-[0.2em] shadow-[0_0_15px_rgba(0,163,255,0.15)]">
            <span className="w-2 h-2 rounded-full bg-[#00A3FF] animate-pulse shadow-[0_0_8px_#00A3FF]" />
            ENTERPRISE SECURITY &amp; ZERO-TRUST GOVERNANCE
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            შეუვალი კიბერუსაფრთხოება &amp; <br className="hidden sm:inline" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00A3FF] via-[#00ff87] to-cyan-300">
              ბიზნესის სრული სუვერენიტეტი
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
            ნულოვანი შუამავლობა, პირდაპირი საბანკო ნაკადები და Zero-Trust ლოკალური მართვა.
            თანამშრომელთა წვდომა შეზღუდულია მხოლოდ დარბაზის LAN-იდან, ხოლო ბაზები დაცულია
            AES-256-GCM სამხედრო შიფრაციითა და 24/7 კიბერ-პატრულით.
          </p>

          {/* Compliance & Standards Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {SECURITY_STANDARDS_BADGES.map((badge, idx) => (
              <div
                key={idx}
                className="px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs font-mono flex items-center gap-2 text-gray-300 hover:border-white/30 hover:bg-white/[0.06] transition-all duration-300 shadow-sm"
              >
                <span
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ backgroundColor: badge.color, boxShadow: `0 0 8px ${badge.color}` }}
                />
                <span className="text-white font-bold">{badge.name}</span>
                <span className="text-gray-400 hidden sm:inline">| {badge.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 3 Core Value Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-[#0B0F17]/80 border border-white/10 hover:border-[#00A3FF]/40 transition-all space-y-2 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
            <div className="w-10 h-10 rounded-xl bg-[#00A3FF]/10 border border-[#00A3FF]/30 flex items-center justify-center text-lg text-[#00A3FF]">
              💳
            </div>
            <h3 className="font-mono text-sm font-bold text-white uppercase tracking-wider">
              1. ფინანსური სუვერენიტეტი
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              გადახდები პირდაპირ თქვენს TBC/BOG ანგარიშზე ჯდება. 0% შუამავალი, ნულოვანი საკომისიო და გაყინვის რისკი.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#0B0F17]/80 border border-white/10 hover:border-[#00ff87]/40 transition-all space-y-2 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
            <div className="w-10 h-10 rounded-xl bg-[#00ff87]/10 border border-[#00ff87]/30 flex items-center justify-center text-lg text-[#00ff87]">
              🛡️
            </div>
            <h3 className="font-mono text-sm font-bold text-white uppercase tracking-wider">
              2. მხოლოდ დარბაზიდან მართვა
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              პერსონალის წვდომა შეზღუდულია ობიექტის ოფიციალური LAN/Wi-Fi ქსელით. სახლიდან ბაზების გაჟონვა აღკვეთილია.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#0B0F17]/80 border border-white/10 hover:border-purple-500/40 transition-all space-y-2 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-lg text-purple-400">
              🔒
            </div>
            <h3 className="font-mono text-sm font-bold text-white uppercase tracking-wider">
              3. სამხედრო შიფრაცია (№01-15/ნ)
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              AES-256-GCM სამხედრო შიფრაცია, FIDO2 ბიომეტრია და შრომის უსაფრთხოების რეგულაციებთან სრული თავსებადობა.
            </p>
          </div>
        </div>

        {/* Interactive Center Hub Box */}
        <div className="p-5 sm:p-8 lg:p-10 rounded-3xl bg-[#0B0F17]/95 border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.8)] backdrop-blur-2xl space-y-8 relative overflow-hidden">
          {/* Subtle glow inside card */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#00A3FF]/5 rounded-full blur-3xl pointer-events-none" />

          {/* Main Navigation Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-black/60 rounded-2xl border border-white/10 max-w-3xl mx-auto relative z-10">
            <button
              type="button"
              onClick={() => handleTabChange('FINANCE')}
              className={`flex-1 min-w-[150px] sm:min-w-[170px] py-2.5 px-3.5 rounded-xl text-xs font-sans font-bold transition-all flex items-center justify-center gap-2 ${
                activeTab === 'FINANCE'
                  ? 'bg-[#00A3FF]/20 text-[#00A3FF] border border-[#00A3FF] shadow-[0_0_20px_rgba(0,163,255,0.3)]'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <CreditCard className="w-4 h-4 text-[#00A3FF]" />
              <span>ფინანსური ნაკადები</span>
            </button>

            <button
              type="button"
              onClick={() => handleTabChange('IP_GUARD')}
              className={`flex-1 min-w-[150px] sm:min-w-[170px] py-2.5 px-3.5 rounded-xl text-xs font-sans font-bold transition-all flex items-center justify-center gap-2 ${
                activeTab === 'IP_GUARD'
                  ? 'bg-[#00ff87]/20 text-[#00ff87] border border-[#00ff87] shadow-[0_0_20px_rgba(0,255,135,0.3)]'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Network className="w-4 h-4 text-[#00ff87]" />
              <span>დარბაზიდან მართვა (IP)</span>
            </button>

            <button
              type="button"
              onClick={() => handleTabChange('SCORE')}
              className={`flex-1 min-w-[150px] sm:min-w-[170px] py-2.5 px-3.5 rounded-xl text-xs font-sans font-bold transition-all flex items-center justify-center gap-2 ${
                activeTab === 'SCORE'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.3)]'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Security Score (0-100%)</span>
            </button>

            <button
              type="button"
              onClick={() => handleTabChange('THREATS')}
              className={`flex-1 min-w-[150px] sm:min-w-[170px] py-2.5 px-3.5 rounded-xl text-xs font-sans font-bold transition-all flex items-center justify-center gap-2 ${
                activeTab === 'THREATS'
                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.3)]'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Lock className="w-4 h-4 text-purple-400" />
              <span>კიბერ-პატრული (Threats)</span>
            </button>
          </div>

          {/* Active Tab Content Area */}
          <div className="pt-2">
            <AnimatePresence mode="wait">
              {activeTab === 'FINANCE' && (
                <motion.div
                  key="FINANCE"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                >
                  <FinancialSovereigntyCard />
                </motion.div>
              )}

              {activeTab === 'IP_GUARD' && (
                <motion.div
                  key="IP_GUARD"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                >
                  <IpWhitelistSubPanel />
                </motion.div>
              )}

              {activeTab === 'SCORE' && (
                <motion.div
                  key="SCORE"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                >
                  <SecurityScoreSimulator />
                </motion.div>
              )}

              {activeTab === 'THREATS' && (
                <motion.div
                  key="THREATS"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                >
                  <ThreatDefenseConsole />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom Trust & Owner Advantage Banner */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-[#0D121B] to-cyan-950/40 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-[#00ff87]/10 border border-[#00ff87]/30 flex items-center justify-center text-[#00ff87] shadow-[0_0_20px_rgba(0,255,135,0.2)] shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-bold text-white flex items-center gap-2">
                მფლობელის უპირატესობა &amp; 100% იურიდიული გარანტია
                <span className="text-[10px] bg-[#00ff87]/20 text-[#00ff87] px-2 py-0.5 rounded font-mono font-bold">
                  VERIFIED ZERO-TRUST
                </span>
              </div>
              <p className="text-xs text-gray-300 mt-0.5">
                მართეთ მსოფლიოს ნებისმიერი წერტილიდან, ხოლო პერსონალი შეზღუდეთ მხოლოდ დარბაზის ოფიციალური LAN-ით.
                მონაცემები დაცულია NDA ხელშეკრულებითა და მკაცრი Zero-Knowledge არქიტექტურით.
              </p>
            </div>
          </div>

          <div className="text-right shrink-0">
            <span className="font-mono text-xs text-[#00A3FF] uppercase font-bold tracking-wider">
              ARTRON SECURITY CORE v3.0
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
