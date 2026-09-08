"use client";

import React, { useState } from 'react';
import { 
  Fingerprint, 
  ShieldAlert, 
  Lock, 
  Building2, 
  Sparkles,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { soundEngine } from '@/core';
import { PasskeySecurityStage } from '../gateway/widgets/live/passkey/PasskeySecurityStage';
import { DynamicRbacSecurityStage } from '../gateway/widgets/live/rbac/DynamicRbacSecurityStage';

export type StaffSecurityTab = 'passkey' | 'rbac';

export const StaffAccessRolesShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<StaffSecurityTab>('passkey');

  const handleTabChange = (tab: StaffSecurityTab) => {
    soundEngine.playPulseNode();
    setActiveTab(tab);
  };

  return (
    <section 
      id="staff-access-roles" 
      className="relative w-full py-20 lg:py-28 bg-[#080B10] text-white overflow-hidden border-t border-b border-white/10 select-none scroll-mt-20"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#00A3FF]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#00ff87]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#8B5CF6]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl space-y-12">
        {/* Unified Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00A3FF]/10 border border-[#00A3FF]/30 font-mono text-[11px] text-[#00A3FF] uppercase tracking-[0.2em] shadow-[0_0_15px_rgba(0,163,255,0.15)]">
            <span className="w-2 h-2 rounded-full bg-[#00A3FF] animate-pulse shadow-[0_0_8px_#00A3FF]" />
            STAFF SECURITY // FIDO2 WEBAUTHN &amp; CASL RBAC
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            თანამშრომელთა ბიომეტრიული წვდომა &amp; <br className="hidden sm:inline" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00ff87] via-[#00B0FF] to-cyan-400">
              100% დინამიური როლები
            </span>
          </h2>

          <p className="text-sm sm:text-base lg:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
            შესვლა 1 წამში Face ID-ით და Touch ID-ით, ნულოვანი დავიწყებული პაროლები და უფლებების მკაცრი კონტროლი —
            სალაროს ჩეკების წაშლის ბლოკირებითა და ფილიალების სრული იზოლაციით.
          </p>
        </div>

        {/* 4 Unified Value Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Pillar 1 */}
          <div className="p-5 rounded-2xl bg-[#0D121B]/90 border border-white/10 hover:border-[#00ff87]/40 transition-all duration-300 shadow-lg group backdrop-blur-md">
            <div className="w-10 h-10 rounded-xl bg-[#00ff87]/10 border border-[#00ff87]/30 flex items-center justify-center text-[#00ff87] mb-3 group-hover:scale-110 transition-transform">
              <Fingerprint className="w-5 h-5" />
            </div>
            <h3 className="font-mono text-sm font-bold text-white mb-1.5 flex items-center justify-between">
              <span>1-წამიანი Passkey</span>
              <span className="text-[10px] bg-[#00ff87]/20 text-[#00ff87] px-1.5 py-0.5 rounded">FIDO2</span>
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Touch ID &amp; Face ID ბრაუზერში. ნულოვანი ფიშინგის რისკი და თანამშრომლებს შორის პაროლების გაცვლის სრული აღკვეთა.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="p-5 rounded-2xl bg-[#0D121B]/90 border border-white/10 hover:border-rose-500/40 transition-all duration-300 shadow-lg group backdrop-blur-md">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 mb-3 group-hover:scale-110 transition-transform">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <h3 className="font-mono text-sm font-bold text-white mb-1.5 flex items-center justify-between">
              <span>0% შიდა თაღლითობა</span>
              <span className="text-[10px] bg-rose-500/20 text-rose-300 px-1.5 py-0.5 rounded">NO DELETE</span>
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              მოლარეს აქვს გაყიდვის უფლება, მაგრამ DELETE მკაცრად დაბლოკილია — გამოირიცხება ჩეკების თვითნებური წაშლა და ფულის მითვისება.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="p-5 rounded-2xl bg-[#0D121B]/90 border border-white/10 hover:border-emerald-500/40 transition-all duration-300 shadow-lg group backdrop-blur-md">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-3 group-hover:scale-110 transition-transform">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="font-mono text-sm font-bold text-white mb-1.5 flex items-center justify-between">
              <span>Field-Level დაცვა</span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded">FILTER</span>
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              კლიენტის პირადი ნომერი, ტელეფონი და ხელფასები სერვერიდანვე იფილტრება (ExcludedFields), რაც გამორიცხავს ბაზის მოპარვას.
            </p>
          </div>

          {/* Pillar 4 */}
          <div className="p-5 rounded-2xl bg-[#0D121B]/90 border border-white/10 hover:border-purple-500/40 transition-all duration-300 shadow-lg group backdrop-blur-md">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-3 group-hover:scale-110 transition-transform">
              <Building2 className="w-5 h-5" />
            </div>
            <h3 className="font-mono text-sm font-bold text-white mb-1.5 flex items-center justify-between">
              <span>Vault &amp; ფილიალები</span>
              <span className="text-[10px] bg-purple-500/20 text-purple-300 px-1.5 py-0.5 rounded">ISOLATED</span>
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              მოწყობილობების 1-კლიკით Revoke გაუქმება და ფილიალების იზოლაცია — საბურთალო ვერასდროს ხედავს ვაკის კლიენტებს.
            </p>
          </div>
        </div>

        {/* Master Interactive Console Hub */}
        <div className="rounded-3xl bg-[#0A0E17]/95 border border-white/15 p-4 sm:p-7 shadow-[0_20px_70px_rgba(0,0,0,0.85)] space-y-6">
          {/* Top Switcher Navigation */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00A3FF] animate-ping" />
              <span className="font-mono text-xs text-gray-300 font-bold uppercase tracking-wider">
                ინტერაქტიული სიმულატორი // აირჩიეთ მოდული:
              </span>
            </div>

            {/* Dual Mode Switcher */}
            <div className="flex items-center gap-2 bg-[#05080E] p-1.5 rounded-2xl border border-white/10 w-full sm:w-auto overflow-x-auto">
              <button
                type="button"
                onClick={() => handleTabChange('passkey')}
                className={`flex-1 sm:flex-none px-4 py-2 rounded-xl font-sans text-xs font-bold transition-all flex items-center justify-center gap-2 whitespace-nowrap ${
                  activeTab === 'passkey'
                    ? 'bg-gradient-to-r from-[#00ff87] to-[#00B0FF] text-black shadow-[0_0_20px_rgba(0,255,135,0.3)]'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Fingerprint className="w-4 h-4" />
                1. უპაროლო ბიომეტრია (Passkeys)
              </button>

              <button
                type="button"
                onClick={() => handleTabChange('rbac')}
                className={`flex-1 sm:flex-none px-4 py-2 rounded-xl font-sans text-xs font-bold transition-all flex items-center justify-center gap-2 whitespace-nowrap ${
                  activeTab === 'rbac'
                    ? 'bg-gradient-to-r from-[#00A3FF] to-[#8B5CF6] text-white shadow-[0_0_20px_rgba(0,163,255,0.4)]'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Zap className="w-4 h-4" />
                2. დინამიური როლები &amp; CASL (RBAC)
              </button>
            </div>
          </div>

          {/* Render Active Stage */}
          <div className="transition-all duration-300">
            {activeTab === 'passkey' ? (
              <PasskeySecurityStage />
            ) : (
              <DynamicRbacSecurityStage />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
