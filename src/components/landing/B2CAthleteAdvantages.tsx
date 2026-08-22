'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { soundEngine } from '@/core';
import {
  QrCode,
  CreditCard,
  Calendar,
  ShieldCheck,
  Smartphone,
  CheckCircle2,
  Zap,
  Sparkles,
  ArrowRight,
  Wifi,
  Clock,
  RotateCcw,
  Check
} from 'lucide-react';
import Link from 'next/link';

export const B2CAthleteAdvantages: React.FC = () => {
  const { t, locale } = useLanguage();
  const [activeTab, setActiveTab] = useState<number>(0);

  const advantages = [
    {
      id: 'qr-pass',
      icon: QrCode,
      title: t('b2c_adv1_title'),
      desc: t('b2c_adv1_desc'),
      badge: t('b2c_adv1_badge'),
      color: '#00A3FF',
      accentBg: 'from-[#0066FF] to-[#00D2FF]',
    },
    {
      id: 'renewal',
      icon: CreditCard,
      title: t('b2c_adv2_title'),
      desc: t('b2c_adv2_desc'),
      badge: t('b2c_adv2_badge'),
      color: '#00ff87',
      accentBg: 'from-[#00ff87] to-[#00e5ff]',
    },
    {
      id: 'trainers',
      icon: Calendar,
      title: t('b2c_adv3_title'),
      desc: t('b2c_adv3_desc'),
      badge: t('b2c_adv3_badge'),
      color: '#A855F7',
      accentBg: 'from-[#8B5CF6] to-[#D946EF]',
    },
    {
      id: 'guarantee',
      icon: ShieldCheck,
      title: t('b2c_adv4_title'),
      desc: t('b2c_adv4_desc'),
      badge: t('b2c_adv4_badge'),
      color: '#F59E0B',
      accentBg: 'from-[#F59E0B] to-[#FBBF24]',
    },
  ];

  return (
    <section id="b2c-experience" className="py-20 md:py-28 relative overflow-hidden bg-[#07090E] border-t border-white/5 studio-grain">
      {/* Glow Backdrops */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[350px] bg-[#00A3FF]/10 blur-[140px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[300px] bg-[#00ff87]/8 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00A3FF]/10 border border-[#00A3FF]/20 text-[#00A3FF] text-xs font-mono tracking-wider uppercase mb-4">
            <Smartphone className="w-3.5 h-3.5" />
            <span>{t('b2c_badge')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            {t('b2c_title')}
          </h2>
          <p className="mt-4 text-sm sm:text-base text-gray-400 font-normal leading-relaxed">
            {t('b2c_subtitle')}
          </p>
        </div>

        {/* Interactive Dual Layout: Left 4 Advantage Cards, Right Dynamic Phone Mockup */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left: 4 Interactive Cards */}
          <div className="lg:col-span-7 space-y-4">
            {advantages.map((adv, idx) => {
              const Icon = adv.icon;
              const isActive = activeTab === idx;

              return (
                <motion.div
                  key={adv.id}
                  data-testid={`b2c-adv-card-${idx}`}
                  onClick={() => {
                    soundEngine.playPulseNode();
                    setActiveTab(idx);
                  }}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className={`p-5 sm:p-6 rounded-2xl border transition-all duration-300 cursor-pointer relative overflow-hidden ${
                    isActive
                      ? 'bg-gradient-to-r from-[#0F172A] to-[#131D33] border-[#00A3FF]/50 shadow-[0_0_30px_rgba(0,163,255,0.2)]'
                      : 'bg-[#0B0E17]/80 border-white/5 hover:border-white/15 hover:bg-[#0E1320]'
                  }`}
                >
                  {isActive && (
                    <div
                      className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b"
                      style={{ background: `linear-gradient(to bottom, ${adv.color}, #00D2FF)` }}
                    />
                  )}

                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div
                        className={`p-3 rounded-xl shrink-0 transition-colors ${
                          isActive ? 'bg-white/10 text-white shadow-inner' : 'bg-white/5 text-gray-400'
                        }`}
                        style={{ color: isActive ? adv.color : undefined }}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-base sm:text-lg font-black text-white tracking-wide">
                            {adv.title}
                          </h3>
                          <span
                            className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full uppercase"
                            style={{
                              backgroundColor: `${adv.color}20`,
                              color: adv.color,
                              border: `1px solid ${adv.color}40`,
                            }}
                          >
                            {adv.badge}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-400 mt-2 leading-relaxed font-normal">
                          {adv.desc}
                        </p>
                      </div>
                    </div>

                    <div className="hidden sm:flex items-center justify-center shrink-0 self-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                        isActive ? 'bg-[#00A3FF] text-white shadow-[0_0_15px_rgba(0,163,255,0.5)]' : 'text-gray-600'
                      }`}>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right: Dynamic Interactive Mobile Screen */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-[300px] sm:w-[320px] rounded-[48px] bg-[#05070B] border-[4px] border-slate-700/80 p-5 shadow-[0_30px_90px_rgba(0,163,255,0.25),0_0_0_1px_rgba(255,255,255,0.1)]">
              
              {/* Dynamic Island / Notch */}
              <div className="w-28 h-4 bg-slate-900 rounded-full mx-auto mb-4 flex items-center justify-center gap-2">
                <div className="w-2 h-2 rounded-full bg-slate-700" />
                <div className="w-8 h-1.5 bg-slate-800 rounded-full" />
              </div>

              {/* Status Header */}
              <div className="flex items-center justify-between px-2 mb-4 text-[10px] font-mono text-gray-400">
                <span className="font-bold text-white tracking-widest">ARTRON PASS</span>
                <div className="flex items-center gap-1.5">
                  <Wifi className="w-3 h-3 text-[#00A3FF]" />
                  <span className="text-emerald-400">5G</span>
                </div>
              </div>

              {/* Dynamic Screen Content Based on Active Tab */}
              <div className="min-h-[380px] flex flex-col justify-between">
                <AnimatePresence mode="wait">
                  {/* TAB 0: QR Pass Screen */}
                  {activeTab === 0 && (
                    <motion.div
                      key="qr"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-4"
                    >
                      <div className="p-4 rounded-2xl bg-gradient-to-br from-[#0066FF] to-[#002277] text-white text-center shadow-lg relative overflow-hidden">
                        <div className="flex justify-between items-center text-[9px] font-mono text-white/70 mb-2">
                          <span>DYNAMIC QR PASS</span>
                          <span className="flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-[#00ff87] rounded-full animate-ping" />
                            ONLINE
                          </span>
                        </div>
                        <div className="w-32 h-32 bg-white rounded-xl mx-auto p-2.5 flex items-center justify-center relative overflow-hidden shadow-2xl">
                          <QrCode className="w-full h-full text-slate-950" />
                          <div className="absolute left-0 right-0 h-[2px] bg-[#00A3FF] animate-[scan_2s_linear_infinite]" />
                        </div>
                        <div className="mt-3 font-mono text-[10px] tracking-widest text-white/90">
                          ART-88924-NFC
                        </div>
                        <div className="text-[8px] text-white/60 mt-0.5">
                          {locale === 'ka' ? 'ავტომატური განახლება: 8 წმ' : 'Auto-refreshes every 8s'}
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-white/[0.04] border border-white/5 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <Zap className="w-4 h-4 text-[#00A3FF]" />
                          <span className="font-bold text-white">TURNIKET_01</span>
                        </div>
                        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                          AUTO-READY
                        </span>
                      </div>
                    </motion.div>
                  )}

                  {/* TAB 1: 1-Click Renewal Screen */}
                  {activeTab === 1 && (
                    <motion.div
                      key="renewal"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-4"
                    >
                      <div className="p-4 rounded-2xl bg-[#121826] border border-white/10 space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-bold text-white">PRO 3-Month Plan</span>
                          <span className="text-xs font-mono font-black text-[#00ff87]">150 ₾</span>
                        </div>
                        <div className="text-[10px] text-gray-400">
                          {locale === 'ka' ? 'დარჩენილია: 2 დღე' : 'Expires in: 2 days'}
                        </div>
                        <div className="p-2.5 rounded-xl bg-white/5 flex items-center justify-between text-[11px] font-mono text-gray-300">
                          <span>💳 TBC •••• 4892</span>
                          <span className="text-[#00ff87]">DEFAULT</span>
                        </div>
                        <button
                          type="button"
                          className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#00ff87] to-[#00e5ff] text-slate-950 font-black text-xs uppercase flex items-center justify-center gap-1.5 shadow-lg"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>1-Click Renew</span>
                        </button>
                      </div>

                      <div className="p-3 rounded-xl bg-[#00ff87]/10 border border-[#00ff87]/20 flex items-center gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#00ff87]" />
                        <span className="text-[10px] font-mono text-white">
                          +15 ARTRON COINS CASHBACK
                        </span>
                      </div>
                    </motion.div>
                  )}

                  {/* TAB 2: Trainer Schedule Screen */}
                  {activeTab === 2 && (
                    <motion.div
                      key="trainers"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-3"
                    >
                      <div className="p-3 rounded-xl bg-[#121826] border border-white/10 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-purple-600/30 border border-purple-500/40 flex items-center justify-center text-sm font-bold text-purple-300">
                          DT
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white">Davit T. [PRO COACH]</div>
                          <div className="text-[10px] text-gray-400">CrossFit & Strength · ⭐ 4.98</div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        {[
                          { time: '16:00 - 17:00', status: 'AVAILABLE', bg: 'border-[#00ff87]/30 text-[#00ff87]' },
                          { time: '17:30 - 18:30', status: 'BOOKED', bg: 'border-white/10 text-gray-500 line-through' },
                          { time: '19:00 - 20:00', status: 'AVAILABLE', bg: 'border-[#00ff87]/30 text-[#00ff87]' },
                        ].map((slot, i) => (
                          <div key={i} className={`p-2.5 rounded-lg border bg-white/[0.02] flex items-center justify-between text-[11px] font-mono ${slot.bg}`}>
                            <div className="flex items-center gap-1.5">
                              <Clock className="w-3 h-3 text-purple-400" />
                              <span>{slot.time}</span>
                            </div>
                            <span className="text-[9px] font-bold">{slot.status}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* TAB 3: 14-Day Guarantee Screen */}
                  {activeTab === 3 && (
                    <motion.div
                      key="guarantee"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-4"
                    >
                      <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-center space-y-2">
                        <ShieldCheck className="w-10 h-10 text-amber-400 mx-auto" />
                        <div className="text-xs font-black text-white uppercase tracking-wide">
                          14-Day Money-Back Guarantee
                        </div>
                        <p className="text-[10px] text-gray-300 leading-snug">
                          {locale === 'ka'
                            ? 'საქართველოს კანონმდებლობის შესაბამისად, თანხის 100% დაბრუნება 1 კლიკით.'
                            : '100% statutory refund directly inside the app with zero hurdles.'}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-[10px] text-gray-300">
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>App Store & Google Play Compliant</span>
                        </div>
                        <div className="flex items-center gap-2 text-[10px] text-gray-300">
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Instant Bank Transfer Reversal</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Bottom Home Indicator */}
                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[9px] font-mono text-gray-500">
                  <span>IOS · ANDROID COMPLIANT</span>
                  <span className="text-[#00A3FF]">ARTRON V3.2</span>
                </div>
              </div>

              {/* Bottom Home Bar */}
              <div className="w-24 h-1 bg-slate-700/80 rounded-full mx-auto mt-4" />
            </div>
          </div>

        </div>

        {/* Action Link to Get Started or Booking */}
        <div className="mt-14 text-center">
          <Link
            href="#booking-engine"
            onClick={() => soundEngine.playPulseNode()}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#00A3FF]/10 border border-[#00A3FF]/30 text-[#00A3FF] hover:bg-[#00A3FF] hover:text-white font-mono text-xs uppercase tracking-wider transition-all cursor-pointer"
          >
            <span>{t('booking_title')} →</span>
          </Link>
        </div>

      </div>
    </section>
  );
};
