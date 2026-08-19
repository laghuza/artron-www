'use client';

import React from 'react';
import Link from 'next/link';

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
  const planDisplayName = 
    selectedPlan.toLowerCase() === 'starter' ? 'STARTER STUDIO (₾350/თვე)' :
    selectedPlan.toLowerCase() === 'enterprise' ? 'ENTERPRISE OS (₾950/თვე)' :
    'PRO FITNESS (₾565/თვე)';

  const cycleDisplayName = billingCycle.toLowerCase() === 'annual' ? 'წლიური (-20%)' : 'ყოველთვიური';

  return (
    <div className="w-full flex flex-col items-center text-center py-6 animate-fadeIn">
      {/* PS5 Style Pulsing Core Ring */}
      <div className="relative mb-8 flex items-center justify-center">
        {/* Outer Laser Pulse Wave */}
        <div className="absolute w-36 h-36 rounded-full bg-[#00A3FF]/20 animate-ping" style={{ animationDuration: '3s' }} />
        
        {/* Rotating Cyan Ring */}
        <div className="absolute w-28 h-28 rounded-full border-2 border-dashed border-[#00E5FF]/60 animate-spin" style={{ animationDuration: '10s' }} />
        
        {/* Inner Glowing Orb */}
        <div className="relative w-20 h-20 rounded-full bg-gradient-to-tr from-[#0055FF] via-[#00A3FF] to-[#00E5FF] flex items-center justify-center shadow-[0_0_50px_rgba(0,163,255,0.8)]">
          <span className="text-3xl font-bold text-black">✓</span>
        </div>
      </div>

      {/* Main Title */}
      <div className="space-y-2 mb-6">
        <span className="text-xs font-mono tracking-widest text-[#00E5FF] uppercase">
          🚀 ობიექტი წარმატებით დარეგისტრირდა
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          გილოცავთ! თქვენი სამართავი პანელი მზად არის
        </h2>
        <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
          თქვენ წარმატებით გაიარეთ რეგისტრაცია (<span className="text-[#00E5FF] font-semibold">{facilityName || 'თქვენი ობიექტი'}</span>). სისტემა მზად არის მუშაობის დასაწყებად.
        </p>
      </div>

      {/* Cyber Diagnostics Card */}
      <div className="w-full max-w-md p-4 rounded-2xl bg-white/[0.03] border border-white/[0.1] backdrop-blur-xl text-left font-mono text-xs space-y-2 mb-8 shadow-2xl">
        <div className="flex items-center justify-between text-slate-400 pb-2 border-b border-white/[0.08]">
          <span>DEPLOYMENT_KEY:</span>
          <span className="text-[#00E5FF] font-bold">{deploymentKey || 'ART-CLB-108XX'}</span>
        </div>
        <div className="flex items-center justify-between text-slate-400 pb-2 border-b border-white/[0.08]">
          <span>SELECTED_TIER:</span>
          <span className="text-[#00E5FF] font-bold">{planDisplayName}</span>
        </div>
        <div className="flex items-center justify-between text-slate-400 pb-2 border-b border-white/[0.08]">
          <span>BILLING_CYCLE:</span>
          <span className="text-slate-200 font-bold">{cycleDisplayName}</span>
        </div>
        <div className="flex items-center justify-between text-slate-400 pb-2 border-b border-white/[0.08]">
          <span>TENANT_SECURITY:</span>
          <span className="text-emerald-400 font-bold">ISOLATED & ENCRYPTED</span>
        </div>
        <div className="flex items-center justify-between text-slate-400 pb-2 border-b border-white/[0.08]">
          <span>LICENSE_STATUS:</span>
          <span className="text-emerald-400 font-bold">ACTIVE & UNLOCKED</span>
        </div>
        <div className="pt-2 text-[11px] text-slate-300 font-sans leading-relaxed">
          საგადახდო ინვოისი, ვერიფიკაციის პროტოკოლი და ადმინისტრატორის ინსტრუქცია გაგზავნილია:
          <div className="text-white font-mono font-bold mt-1 text-xs">
            {email || 'admin@facility.ge'}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
        <Link
          href="/sports-os"
          className="flex-1 py-3.5 px-6 rounded-xl font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-[#00A3FF] to-[#0055FF] text-white shadow-[0_0_25px_rgba(0,163,255,0.4)] hover:shadow-[0_0_35px_rgba(0,163,255,0.6)] hover:scale-[1.02] transition-all duration-300 text-center cursor-pointer"
        >
          🚀 მართვის პანელში შესვლა
        </Link>
        <button
          type="button"
          onClick={onReset}
          className="py-3.5 px-5 rounded-xl border border-white/10 text-slate-400 hover:text-white hover:bg-white/5 text-xs font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer"
        >
          ← მთავარ გვერდზე
        </button>
      </div>
    </div>
  );
};
