'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { ps5Audio } from '../../core/ps5SoundEngine';
import { Trophy, ArrowRight, ShieldCheck, CheckCircle2, QrCode, Cpu, Sparkles } from 'lucide-react';

interface PS5ActivationSequenceProps {
  deploymentKey: string;
  email: string;
  facilityName: string;
  selectedPlan?: string;
  billingCycle?: string;
  onReset: () => void;
}

export const PS5ActivationSequence: React.FC<PS5ActivationSequenceProps> = ({
  deploymentKey,
  email,
  facilityName,
  selectedPlan = 'PRO',
  billingCycle = 'MONTHLY',
  onReset,
}) => {
  useEffect(() => {
    // Play PlayStation Trophy Fanfare upon activation
    ps5Audio.playTrophyUnlock();
  }, []);

  const planDisplayName =
    selectedPlan.toLowerCase() === 'starter'
      ? 'STARTER STUDIO (₾350/თვე)'
      : selectedPlan.toLowerCase() === 'enterprise'
      ? 'ENTERPRISE OS (₾950/თვე)'
      : 'PRO FITNESS (₾565/თვე)';

  const cycleDisplayName =
    billingCycle.toLowerCase() === 'annual' ? 'წლიური (-20%)' : 'ყოველთვიური';

  return (
    <div className="w-full flex flex-col items-center text-center py-6 px-2 animate-fadeIn max-w-2xl mx-auto">
      {/* PS5 Trophy & Core Ignition Ring */}
      <div className="relative mb-8 flex items-center justify-center">
        {/* Outer Laser Pulse Waves */}
        <div
          className="absolute w-44 h-44 rounded-full bg-[#00A3FF]/25 animate-ping"
          style={{ animationDuration: '3s' }}
        />
        <div
          className="absolute w-36 h-36 rounded-full border border-dashed border-[#00E5FF]/60 animate-spin"
          style={{ animationDuration: '12s' }}
        />

        {/* Inner Glowing Trophy Orb */}
        <div className="relative w-24 h-24 rounded-3xl bg-gradient-to-tr from-[#0055FF] via-[#00A3FF] to-[#00E5FF] flex items-center justify-center shadow-[0_0_60px_rgba(0,229,255,0.8)] border border-white/30">
          <Trophy className="w-11 h-11 text-black fill-current animate-bounce" style={{ animationDuration: '2s' }} />
        </div>
      </div>

      {/* Trophy Notification Banner (PS5 Style Popup) */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#00A3FF]/20 via-[#0055FF]/20 to-[#00E5FF]/20 border border-[#00E5FF]/40 shadow-[0_0_20px_rgba(0,163,255,0.3)] mb-4">
        <Sparkles className="w-3.5 h-3.5 text-[#00E5FF]" />
        <span className="text-[11px] font-mono tracking-widest text-[#00E5FF] uppercase font-bold">
          TROPHY UNLOCKED: ENTERPRISE CLUSTER ACTIVATED
        </span>
      </div>

      <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
        გილოცავთ! თქვენი ობიექტი გააქტიურებულია
      </h2>
      <p className="text-xs sm:text-sm text-slate-300 max-w-lg mb-8 leading-relaxed">
        ობიექტმა <span className="text-[#00E5FF] font-bold">{facilityName || 'თქვენი ორგანიზაცია'}</span> წარმატებით გაიარა რეგისტრაცია. სალიცენზიო კვანძი და სამართავი პანელი მზად არის.
      </p>

      {/* 3D Holographic Deployment Pass */}
      <div className="w-full p-6 rounded-3xl bg-gradient-to-b from-[#0C1222]/95 via-[#090E1A]/90 to-[#060913]/95 border border-[#00A3FF]/40 shadow-[0_0_40px_rgba(0,163,255,0.2)] backdrop-blur-2xl text-left font-mono text-xs space-y-3.5 mb-8 relative overflow-hidden">
        {/* Holographic Watermark */}
        <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
          <QrCode className="w-32 h-32 text-white" />
        </div>

        <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
          <span className="text-slate-400">DEPLOYMENT_KEY:</span>
          <span className="text-[#00E5FF] font-black text-sm tracking-wider">
            {deploymentKey || 'ART-CLB-108XX'}
          </span>
        </div>

        <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
          <span className="text-slate-400">SYSTEM_TIER:</span>
          <span className="text-white font-bold">{planDisplayName}</span>
        </div>

        <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
          <span className="text-slate-400">BILLING_CYCLE:</span>
          <span className="text-slate-200 font-bold">{cycleDisplayName}</span>
        </div>

        <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
          <span className="text-slate-400">SECURITY_ISOLATION:</span>
          <span className="text-emerald-400 font-bold flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            AES-256-GCM ACTIVE
          </span>
        </div>

        <div className="pt-2 text-[11px] text-slate-300 font-sans leading-relaxed">
          სრული ინსტრუქცია, სატესტო QR ბარათები და მართვის დოკუმენტაცია გაგზავნილია:
          <div className="text-white font-mono font-bold mt-1 text-xs">
            {email || 'admin@facility.ge'}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3.5 w-full">
        <Link
          href="/sports-os"
          onClick={() => ps5Audio.playSelect()}
          className="flex-1 py-4 px-8 rounded-2xl font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-[#00A3FF] via-[#0066FF] to-[#00D2FF] text-white shadow-[0_0_30px_rgba(0,163,255,0.5)] hover:shadow-[0_0_40px_rgba(0,163,255,0.8)] hover:scale-[1.02] transition-all duration-300 text-center flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>🚀 მართვის პანელში შესვლა</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
        <button
          type="button"
          onClick={() => {
            ps5Audio.playBack();
            onReset();
          }}
          className="py-4 px-6 rounded-2xl border border-white/10 text-slate-300 hover:text-white hover:bg-white/5 text-xs font-semibold tracking-wider uppercase transition-all duration-200 cursor-pointer"
        >
          ← მთავარ გვერდზე
        </button>
      </div>
    </div>
  );
};
