'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  CreditCard, 
  Network, 
  Fingerprint, 
  ShieldAlert, 
  Lock, 
  Building2 
} from 'lucide-react';
import { soundEngine } from '@/core';
import { FinancialSovereigntyCard } from './security/FinancialSovereigntyCard';
import { IpWhitelistSubPanel } from './security/IpWhitelistSubPanel';
import { PasskeySecurityStage } from '../gateway/widgets/live/passkey/PasskeySecurityStage';
import { DynamicRbacSecurityStage } from '../gateway/widgets/live/rbac/DynamicRbacSecurityStage';

export type UnifiedSecurityTab = 'finance' | 'rbac' | 'ip_guard' | 'passkey';

export const ControlPanelSecurityShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<UnifiedSecurityTab>('finance');

  const handleTabChange = (tab: UnifiedSecurityTab) => {
    soundEngine.playPulseNode();
    setActiveTab(tab);
  };

  return (
    <section
      id="enterprise-security"
      className="relative py-20 lg:py-28 bg-[#080B10] text-white overflow-hidden border-t border-b border-white/5 select-none scroll-mt-20"
    >
      {/* Invisible anchor for backward compatibility with staff-access-roles links */}
      <span id="staff-access-roles" className="absolute -top-24 left-0 pointer-events-none" />

      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[850px] h-[420px] bg-[#00A3FF]/6 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[550px] h-[320px] bg-[#00ff87]/6 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-10 w-[400px] h-[300px] bg-purple-500/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00A3FF]/10 border border-[#00A3FF]/30 font-mono text-[11px] text-[#00A3FF] uppercase tracking-[0.2em] shadow-[0_0_15px_rgba(0,163,255,0.15)]">
            <span className="w-2 h-2 rounded-full bg-[#00A3FF] animate-pulse shadow-[0_0_8px_#00A3FF]" />
            სამართავი პანელის თავდაცვა // CONTROL PANEL DEFENSE
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            სამართავი პანელის სრული თავდაცვა &amp; <br className="hidden sm:inline" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00A3FF] via-[#00ff87] to-cyan-300">
              0% შიდა თაღლითობა
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
            დარბაზის მფლობელის სრული სიმშვიდე: თანხები პირდაპირ თქვენს საბანკო ანგარიშზე ჯდება, 
            მოლარეები ვერ წაშლიან ჩეკებს, თანამშრომლები ვერ გააპარებენ კლიენტების ბაზას და 
            პანელზე წვდომა აქვთ მხოლოდ დარბაზის ტერიტორიიდან.
          </p>
        </div>

        {/* 6 Clear, High-Readability Benefit Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Pillar 1 */}
          <div className="p-5 rounded-2xl bg-[#0D121B]/80 border border-white/10 hover:border-[#00A3FF]/40 transition-all duration-300 space-y-2.5 backdrop-blur-md shadow-lg group">
            <div className="w-10 h-10 rounded-xl bg-[#00A3FF]/10 border border-[#00A3FF]/30 flex items-center justify-center text-[#00A3FF] group-hover:scale-110 transition-transform">
              <CreditCard className="w-5 h-5" />
            </div>
            <div className="flex items-center justify-between">
              <h3 className="font-mono text-sm font-bold text-white uppercase tracking-wide">
                1. პირდაპირი ბანკი
              </h3>
              <span className="text-[10px] font-mono bg-[#00A3FF]/20 text-[#00A3FF] px-2 py-0.5 rounded font-bold">
                0% შუამავალი
              </span>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">
              TBC / BOG პირდაპირი API. თანხა მომენტალურად თქვენს IBAN-ზე ჯდება. ართრონი არ ინახავს და არ აკავებს თქვენს ფულს.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="p-5 rounded-2xl bg-[#0D121B]/80 border border-white/10 hover:border-rose-500/40 transition-all duration-300 space-y-2.5 backdrop-blur-md shadow-lg group">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 group-hover:scale-110 transition-transform">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div className="flex items-center justify-between">
              <h3 className="font-mono text-sm font-bold text-white uppercase tracking-wide">
                2. 0% შიდა თაღლითობა
              </h3>
              <span className="text-[10px] font-mono bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded font-bold">
                NO DELETE
              </span>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">
              მოლარეს აქვს მხოლოდ გაყიდვის უფლება. ჩეკის წაშლა (DELETE) სისტემურად დაბლოკილია — სალარო მუდამ 100% ზუსტია.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="p-5 rounded-2xl bg-[#0D121B]/80 border border-white/10 hover:border-emerald-500/40 transition-all duration-300 space-y-2.5 backdrop-blur-md shadow-lg group">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
              <Lock className="w-5 h-5" />
            </div>
            <div className="flex items-center justify-between">
              <h3 className="font-mono text-sm font-bold text-white uppercase tracking-wide">
                3. კლიენტთა ბაზის დაცვა
              </h3>
              <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-bold">
                FIELD SHIELD
              </span>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">
              კლიენტების პირადი ნომრები და ტელეფონები პერსონალისთვის დაფარულია. ბაზის ჩამოტვირთვა ან მოპარვა შეუძლებელია.
            </p>
          </div>

          {/* Pillar 4 */}
          <div className="p-5 rounded-2xl bg-[#0D121B]/80 border border-white/10 hover:border-[#00ff87]/40 transition-all duration-300 space-y-2.5 backdrop-blur-md shadow-lg group">
            <div className="w-10 h-10 rounded-xl bg-[#00ff87]/10 border border-[#00ff87]/30 flex items-center justify-center text-[#00ff87] group-hover:scale-110 transition-transform">
              <Network className="w-5 h-5" />
            </div>
            <div className="flex items-center justify-between">
              <h3 className="font-mono text-sm font-bold text-white uppercase tracking-wide">
                4. მხოლოდ დარბაზიდან
              </h3>
              <span className="text-[10px] font-mono bg-[#00ff87]/20 text-[#00ff87] px-2 py-0.5 rounded font-bold">
                IP GUARD
              </span>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">
              პერსონალი სისტემაში შედის მხოლოდ დარბაზის LAN/Wi-Fi-დან. სახლიდან ბაზებზე წვდომა ავტომატურად დაბლოკილია.
            </p>
          </div>

          {/* Pillar 5 */}
          <div className="p-5 rounded-2xl bg-[#0D121B]/80 border border-white/10 hover:border-cyan-400/40 transition-all duration-300 space-y-2.5 backdrop-blur-md shadow-lg group">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
              <Fingerprint className="w-5 h-5" />
            </div>
            <div className="flex items-center justify-between">
              <h3 className="font-mono text-sm font-bold text-white uppercase tracking-wide">
                5. უპაროლო Passkey
              </h3>
              <span className="text-[10px] font-mono bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded font-bold">
                1 წამში
              </span>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">
              Touch ID &amp; Face ID ბრაუზერში. ნულოვანი დავიწყებული პაროლები და თანამშრომლებს შორის პაროლების გადაცემის აღკვეთა.
            </p>
          </div>

          {/* Pillar 6 */}
          <div className="p-5 rounded-2xl bg-[#0D121B]/80 border border-white/10 hover:border-purple-500/40 transition-all duration-300 space-y-2.5 backdrop-blur-md shadow-lg group">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
              <Building2 className="w-5 h-5" />
            </div>
            <div className="flex items-center justify-between">
              <h3 className="font-mono text-sm font-bold text-white uppercase tracking-wide">
                6. ფილიალების იზოლაცია
              </h3>
              <span className="text-[10px] font-mono bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded font-bold">
                ISOLATED
              </span>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">
              ფილიალების სრული დამოუკიდებლობა: საბურთალოს თანამშრომელი ვერასდროს ხედავს ვაკის კლიენტებს ან შემოსავლებს.
            </p>
          </div>
        </div>

        {/* Master Interactive Console Hub */}
        <div className="p-4 sm:p-7 lg:p-8 rounded-3xl bg-[#0A0E17]/95 border border-white/10 shadow-[0_20px_70px_rgba(0,0,0,0.85)] backdrop-blur-2xl space-y-6">
          {/* Main Navigation Tabs */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00A3FF] animate-ping" />
              <span className="font-mono text-xs text-gray-300 font-bold uppercase tracking-wider">
                გამოსცადეთ თავდაცვის სისტემა რეალურ დროში:
              </span>
            </div>

            {/* 4 Clean Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 bg-[#05080E] p-1.5 rounded-2xl border border-white/10 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => handleTabChange('finance')}
                className={`flex-1 sm:flex-none px-3.5 py-2 rounded-xl text-xs font-sans font-bold transition-all flex items-center justify-center gap-1.5 whitespace-nowrap min-h-[44px] ${
                  activeTab === 'finance'
                    ? 'bg-[#00A3FF]/20 text-[#00A3FF] border border-[#00A3FF] shadow-[0_0_15px_rgba(0,163,255,0.3)]'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <CreditCard className="w-4 h-4 text-[#00A3FF]" />
                <span>1. ფინანსური ნაკადები</span>
              </button>

              <button
                type="button"
                onClick={() => handleTabChange('rbac')}
                className={`flex-1 sm:flex-none px-3.5 py-2 rounded-xl text-xs font-sans font-bold transition-all flex items-center justify-center gap-1.5 whitespace-nowrap min-h-[44px] ${
                  activeTab === 'rbac'
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.3)]'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <ShieldAlert className="w-4 h-4 text-rose-400" />
                <span>2. როლები &amp; სალარო</span>
              </button>

              <button
                type="button"
                onClick={() => handleTabChange('ip_guard')}
                className={`flex-1 sm:flex-none px-3.5 py-2 rounded-xl text-xs font-sans font-bold transition-all flex items-center justify-center gap-1.5 whitespace-nowrap min-h-[44px] ${
                  activeTab === 'ip_guard'
                    ? 'bg-[#00ff87]/20 text-[#00ff87] border border-[#00ff87] shadow-[0_0_15px_rgba(0,255,135,0.3)]'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Network className="w-4 h-4 text-[#00ff87]" />
                <span>3. დარბაზის LAN (IP)</span>
              </button>

              <button
                type="button"
                onClick={() => handleTabChange('passkey')}
                className={`flex-1 sm:flex-none px-3.5 py-2 rounded-xl text-xs font-sans font-bold transition-all flex items-center justify-center gap-1.5 whitespace-nowrap min-h-[44px] ${
                  activeTab === 'passkey'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Fingerprint className="w-4 h-4 text-cyan-400" />
                <span>4. უპაროლო Passkey</span>
              </button>
            </div>
          </div>

          {/* Active Tab Content Area */}
          <div className="pt-2">
            <AnimatePresence mode="wait">
              {activeTab === 'finance' && (
                <motion.div
                  key="finance"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                >
                  <FinancialSovereigntyCard />
                </motion.div>
              )}

              {activeTab === 'rbac' && (
                <motion.div
                  key="rbac"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                >
                  <DynamicRbacSecurityStage />
                </motion.div>
              )}

              {activeTab === 'ip_guard' && (
                <motion.div
                  key="ip_guard"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                >
                  <IpWhitelistSubPanel />
                </motion.div>
              )}

              {activeTab === 'passkey' && (
                <motion.div
                  key="passkey"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                >
                  <PasskeySecurityStage />
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
                თქვენ მართავთ მსოფლიოს ნებისმიერი წერტილიდან, ხოლო პერსონალი შეზღუდულია მხოლოდ დარბაზის ოფიციალური LAN-ით.
                მონაცემები დაცულია მკაცრი Zero-Knowledge არქიტექტურითა და საქართველოს კანონმდებლობით.
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
