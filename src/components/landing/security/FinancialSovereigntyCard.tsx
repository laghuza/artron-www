'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  ArrowRight, 
  Lock, 
  CheckCircle2, 
  Building2, 
  User, 
  CreditCard,
  Landmark,
  FileCheck2,
  Sparkles
} from 'lucide-react';
import { FINANCIAL_SOVEREIGNTY_PILLARS } from '@/data/enterpriseSecurityData';
import { GlowCard } from '@/components/ui/GlowCard';

const getPillarIcon = (idx: number) => {
  switch (idx) {
    case 0:
      return <Landmark className="w-5 h-5 text-[#00A3FF]" />;
    case 1:
      return <ShieldCheck className="w-5 h-5 text-[#00ff87]" />;
    case 2:
      return <FileCheck2 className="w-5 h-5 text-purple-400" />;
    default:
      return <Lock className="w-5 h-5 text-[#00A3FF]" />;
  }
};

const getPillarColors = (idx: number) => {
  switch (idx) {
    case 0:
      return { 
        glow: 'rgba(0, 163, 255, 0.22)', 
        border: 'rgba(0, 163, 255, 0.5)',
        iconBg: 'bg-[#00A3FF]/10 border-[#00A3FF]/30 shadow-[0_0_15px_rgba(0,163,255,0.2)]'
      };
    case 1:
      return { 
        glow: 'rgba(0, 255, 135, 0.22)', 
        border: 'rgba(0, 255, 135, 0.5)',
        iconBg: 'bg-[#00ff87]/10 border-[#00ff87]/30 shadow-[0_0_15px_rgba(0,255,135,0.2)]'
      };
    case 2:
      return { 
        glow: 'rgba(168, 85, 247, 0.22)', 
        border: 'rgba(168, 85, 247, 0.5)',
        iconBg: 'bg-purple-500/10 border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.2)]'
      };
    default:
      return { 
        glow: 'rgba(0, 163, 255, 0.22)', 
        border: 'rgba(0, 163, 255, 0.5)',
        iconBg: 'bg-[#00A3FF]/10 border-[#00A3FF]/30'
      };
  }
};

export const FinancialSovereigntyCard: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Visual Transaction Architecture Flow */}
      <div className="bg-[#090D14] border border-[#00A3FF]/30 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#00A3FF]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="text-center max-w-xl mx-auto mb-8 space-y-2">
          <span className="text-[11px] font-mono text-[#00A3FF] uppercase tracking-widest bg-[#00A3FF]/10 border border-[#00A3FF]/30 px-3 py-1 rounded-full inline-flex items-center gap-1.5 shadow-[0_0_12px_rgba(0,163,255,0.15)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00A3FF] animate-ping" />
            ZERO-PEEKING &amp; DIRECT BANK SETTLEMENT
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            ფინანსური ნაკადების გამჭვირვალე არქიტექტურა
          </h3>
          <p className="text-xs sm:text-sm text-gray-300">
            როგორ მუშაობს თქვენი გადახდები Artron-ში — 100% პირდაპირ თქვენს ანგარიშზე, ნულოვანი შუამავლობით.
          </p>
        </div>

        {/* 3-Step Flow Diagram with GlowCards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10 items-stretch">
          {/* Step 1: Member */}
          <GlowCard 
            glowColor="rgba(6, 182, 212, 0.22)" 
            borderColor="rgba(6, 182, 212, 0.45)"
            className="p-5 flex flex-col items-center text-center space-y-3 shadow-lg"
          >
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
              <User className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-bold text-white uppercase font-mono tracking-wider">
                1. კლიენტი იხდის
              </div>
              <div className="text-[11px] text-gray-300 mt-1">
                აპლიკაციით ან სალაროში ყიდულობს აბონემენტს
              </div>
            </div>
            <span className="text-[10px] text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-0.5 rounded-full font-mono font-semibold">
              APPLE PAY / VISA / MC
            </span>
          </GlowCard>

          {/* Step 2: Direct Gateway Bridge */}
          <GlowCard 
            glowColor="rgba(0, 255, 135, 0.25)" 
            borderColor="rgba(0, 255, 135, 0.55)"
            className="p-5 flex flex-col items-center text-center space-y-3 shadow-lg relative border-[#00ff87]/30"
          >
            <div className="w-12 h-12 rounded-xl bg-[#00ff87]/10 border border-[#00ff87]/30 flex items-center justify-center text-[#00ff87] shadow-[0_0_15px_rgba(0,255,135,0.25)]">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-bold text-white uppercase font-mono tracking-wider">
                2. პირდაპირი ბანკი (PCI-DSS)
              </div>
              <div className="text-[11px] text-gray-300 mt-1">
                TBC Bank / Bank of Georgia / Stripe API
              </div>
            </div>
            <span className="text-[10px] text-[#00ff87] bg-[#00ff87]/15 border border-[#00ff87]/30 px-2.5 py-0.5 rounded-full font-mono font-bold shadow-[0_0_10px_rgba(0,255,135,0.15)]">
              0% შუამავალი საფულე
            </span>
          </GlowCard>

          {/* Step 3: Gym Bank Account */}
          <GlowCard 
            glowColor="rgba(168, 85, 247, 0.22)" 
            borderColor="rgba(168, 85, 247, 0.45)"
            className="p-5 flex flex-col items-center text-center space-y-3 shadow-lg"
          >
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-bold text-white uppercase font-mono tracking-wider">
                3. თქვენი ანგარიში
              </div>
              <div className="text-[11px] text-gray-300 mt-1">
                თანხა 100% მომენტალურად ჯდება დარბაზის IBAN-ზე
              </div>
            </div>
            <span className="text-[10px] text-purple-300 bg-purple-500/10 border border-purple-500/20 px-2.5 py-0.5 rounded-full font-mono font-semibold">
              100% SOVEREIGN FUNDS
            </span>
          </GlowCard>
        </div>

        {/* Security Banner under flow */}
        <div className="mt-6 p-4 rounded-xl bg-black/40 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5 text-gray-300">
            <Lock className="w-4 h-4 text-[#00ff87] shrink-0" />
            <span>
              <strong className="text-white">Zero-Peeking პოლიტიკა:</strong> ართრონი არ ინახავს ბარათის ნომრებს, არ აკავებს პროცენტებს და არ აქვს წვდომა თქვენს პირად საბანკო ბალანსზე.
            </span>
          </div>
          <span className="text-[#00A3FF] font-mono font-bold shrink-0 text-[11px] bg-[#00A3FF]/10 px-2.5 py-1 rounded-md border border-[#00A3FF]/20">
            BANK-GRADE ISOLATION
          </span>
        </div>
      </div>

      {/* 3 Detailed Value Pillars with GlowCards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {FINANCIAL_SOVEREIGNTY_PILLARS.map((pillar, idx) => {
          const colors = getPillarColors(idx);
          return (
            <GlowCard
              key={idx}
              glowColor={colors.glow}
              borderColor={colors.border}
              className="p-6 space-y-3.5 shadow-lg group transition-transform duration-300 hover:-translate-y-1"
            >
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 duration-300 ${colors.iconBg}`}>
                {getPillarIcon(idx)}
              </div>
              <h4 className="text-sm font-bold text-white group-hover:text-[#00A3FF] transition-colors">
                {pillar.title}
              </h4>
              <div className="text-[11px] font-mono text-[#00ff87] font-semibold">
                {pillar.subtitle}
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                {pillar.description}
              </p>
            </GlowCard>
          );
        })}
      </div>
    </div>
  );
};
