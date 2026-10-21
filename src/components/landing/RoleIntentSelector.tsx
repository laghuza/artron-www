'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, Smartphone, ArrowRight, ShieldCheck, QrCode } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { audioManager } from '@/lib/audioManager';

interface RoleIntentSelectorProps {
  className?: string;
  onRoleSelect?: (role: 'b2b' | 'b2c') => void;
}

export const RoleIntentSelector: React.FC<RoleIntentSelectorProps> = ({
  className = '',
  onRoleSelect,
}) => {
  const { locale } = useLanguage();
  const [activeRole, setActiveRole] = useState<'b2b' | 'b2c'>('b2b');

  const handleSelect = (role: 'b2b' | 'b2c', targetId: string) => {
    audioManager.playClick();
    setActiveRole(role);
    if (onRoleSelect) onRoleSelect(role);

    if (typeof window !== 'undefined') {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const copy = {
    badge: locale === 'ka' 
      ? 'აირჩიეთ თქვენი მიზანი' 
      : locale === 'ru' 
      ? 'ВЫБЕРИТЕ ВАШУ ЦЕЛЬ' 
      : 'CHOOSE YOUR PATH',
    b2bTitle: locale === 'ka'
      ? 'დარბაზის მფლობელებისთვის'
      : locale === 'ru'
      ? 'Владельцам клубов'
      : 'For Facility Owners',
    b2bBadge: locale === 'ka' ? 'B2B მართვის ცენტრი' : locale === 'ru' ? 'B2B Центр управления' : 'B2B Control Hub',
    b2bDesc: locale === 'ka'
      ? 'IoT ტურნიკეტები, №01-15/ნ ტაბელები, ROI & Churn რადარი'
      : locale === 'ru'
      ? 'IoT турникеты, табели №01-15/н, ROI и AI Churn радар'
      : 'IoT turnstiles, labor timesheets, ROI & AI Churn radar',
    b2cTitle: locale === 'ka'
      ? 'სპორტსმენებისა & წევრებისთვის'
      : locale === 'ru'
      ? 'Спортсменам и резидентам'
      : 'For Athletes & Members',
    b2cBadge: locale === 'ka' ? 'B2C მობილური აპი' : locale === 'ru' ? 'B2C Мобильное приложение' : 'B2C Mobile App',
    b2cDesc: locale === 'ka'
      ? 'Dynamic QR საშვი (0.04წმ), 0 რიგი, Artron Coins ქეშბექი'
      : locale === 'ru'
      ? 'Dynamic QR пропуск (0.04с), 0 очередей, кешбэк Artron Coins'
      : 'Dynamic QR pass (0.04s), zero queues, Artron Coins cashback',
  };

  return (
    <div className={`w-full max-w-4xl mx-auto ${className}`}>
      {/* Top HUD Identifier */}
      <div className="flex items-center justify-center gap-2 mb-3">
        <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#00A3FF]/40" />
        <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#38BDF8] font-bold">
          [ {copy.badge} ]
        </span>
        <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#00A3FF]/40" />
      </div>

      {/* Dual Selector Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-1.5 rounded-2xl bg-[#080C14]/90 border border-white/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
        {/* B2B Path Card */}
        <button
          type="button"
          onClick={() => handleSelect('b2b', 'dashboard-features')}
          className={`relative group text-left p-3.5 sm:p-4 rounded-xl transition-all duration-300 cursor-pointer overflow-hidden border ${
            activeRole === 'b2b'
              ? 'border-[#00A3FF]/60 bg-[#00A3FF]/10 shadow-[0_0_24px_rgba(0,163,255,0.25)]'
              : 'border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/[0.15]'
          }`}
        >
          {activeRole === 'b2b' && (
            <motion.div
              layoutId="role-intent-glow"
              className="absolute inset-0 bg-gradient-to-r from-[#00A3FF]/15 via-transparent to-[#10B981]/15 pointer-events-none"
              transition={{ type: 'spring', stiffness: 350, damping: 30 }}
            />
          )}

          <div className="relative z-10 flex items-start gap-3">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border transition-all duration-300 ${
                activeRole === 'b2b'
                  ? 'bg-[#00A3FF]/20 border-[#00A3FF] text-[#00E5FF] shadow-[0_0_15px_rgba(0,163,255,0.4)]'
                  : 'bg-white/[0.04] border-white/[0.1] text-slate-400 group-hover:text-white'
              }`}
            >
              <Building2 className="w-5 h-5" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1.5 mb-1">
                <span className="text-xs sm:text-[13px] font-bold text-white tracking-tight truncate">
                  {copy.b2bTitle}
                </span>
                <span className="text-[8.5px] font-mono uppercase px-1.5 py-0.5 rounded font-bold text-[#00E5FF] bg-[#00E5FF]/10 border border-[#00E5FF]/20 shrink-0">
                  {copy.b2bBadge}
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-[#94A3B8] leading-relaxed line-clamp-2">
                {copy.b2bDesc}
              </p>
            </div>

            <div className="shrink-0 self-center text-slate-500 group-hover:text-[#00E5FF] transition-colors">
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        </button>

        {/* B2C Path Card */}
        <button
          type="button"
          onClick={() => handleSelect('b2c', 'mobile-app')}
          className={`relative group text-left p-3.5 sm:p-4 rounded-xl transition-all duration-300 cursor-pointer overflow-hidden border ${
            activeRole === 'b2c'
              ? 'border-[#10B981]/60 bg-[#10B981]/10 shadow-[0_0_24px_rgba(16,185,129,0.25)]'
              : 'border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/[0.15]'
          }`}
        >
          {activeRole === 'b2c' && (
            <motion.div
              layoutId="role-intent-glow"
              className="absolute inset-0 bg-gradient-to-r from-[#10B981]/15 via-transparent to-[#F59E0B]/15 pointer-events-none"
              transition={{ type: 'spring', stiffness: 350, damping: 30 }}
            />
          )}

          <div className="relative z-10 flex items-start gap-3">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border transition-all duration-300 ${
                activeRole === 'b2c'
                  ? 'bg-[#10B981]/20 border-[#10B981] text-[#34D399] shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                  : 'bg-white/[0.04] border-white/[0.1] text-slate-400 group-hover:text-white'
              }`}
            >
              <Smartphone className="w-5 h-5" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1.5 mb-1">
                <span className="text-xs sm:text-[13px] font-bold text-white tracking-tight truncate">
                  {copy.b2cTitle}
                </span>
                <span className="text-[8.5px] font-mono uppercase px-1.5 py-0.5 rounded font-bold text-[#34D399] bg-[#10B981]/10 border border-[#10B981]/20 shrink-0">
                  {copy.b2cBadge}
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-[#94A3B8] leading-relaxed line-clamp-2">
                {copy.b2cDesc}
              </p>
            </div>

            <div className="shrink-0 self-center text-slate-500 group-hover:text-[#34D399] transition-colors">
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};
