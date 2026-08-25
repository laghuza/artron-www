'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { soundEngine } from '@/core';
import { 
  Terminal, 
  Globe, 
  Lock, 
  Dumbbell, 
  Waves, 
  Activity, 
  Trophy, 
  ArrowRight, 
  Play, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2,
  Building2 
} from 'lucide-react';
import { BookingRadarMap } from './booking/BookingRadarMap';

export const BookingEngine: React.FC = () => {
  const { t } = useLanguage();
  const [facilityType, setFacilityType] = useState<string>('gym');
  const [detectedTimezone, setDetectedTimezone] = useState('Europe/Tbilisi');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
        setDetectedTimezone(tz || 'Europe/Tbilisi');
      } catch {
        setDetectedTimezone('Europe/Tbilisi');
      }
    }
  }, []);

  const facilityOptions = [
    { id: 'gym', icon: Dumbbell, name: t('booking_type_gym'), desc: t('booking_type_gym_desc') },
    { id: 'pool', icon: Waves, name: t('booking_type_pool'), desc: t('booking_type_pool_desc') },
    { id: 'studio', icon: Activity, name: t('booking_type_studio'), desc: t('booking_type_studio_desc') },
  ];

  return (
    <section id="booking-engine" className="py-20 md:py-28 relative overflow-hidden bg-[#080B10] border-y border-white/5 studio-grain">
      {/* Background Decor */}
      <div className="absolute top-1/4 right-1/4 w-[450px] h-[450px] bg-[#00A3FF]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[450px] h-[450px] bg-[#00ff87]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#00ff87]/10 border border-[#00ff87]/20 text-xs font-mono font-bold text-[#00ff87] mb-4 tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" /> [SYS: SPORTS_OS // GATEWAY_ROUTING]
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            {t('booking_title')}
          </h2>
          <p className="mt-4 text-sm md:text-base text-[#94A3B8] font-medium leading-relaxed">
            {t('booking_subtitle')}
          </p>
        </div>

        {/* Outer Grid: Dual-Core Interactive Hub + Cyber Radar Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Block (7 Cols): Facility Selector + Direct Action Cards */}
          <div className="lg:col-span-7 bg-[#05070a]/95 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-xl relative overflow-hidden flex flex-col justify-between p-6 sm:p-8">
            {/* L-Shape Corner Brackets */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#00ff87]/40" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#00ff87]/40" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#00ff87]/40" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#00ff87]/40" />

            <div className="flex flex-col h-full space-y-6">
              {/* Header Status Bar */}
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 bg-[#121722] border border-white/10 px-3 py-1 rounded-lg">
                    <Terminal className="w-3.5 h-3.5 text-[#00ff87]" />
                    <span className="text-[11px] font-mono font-bold text-white uppercase tracking-wider">
                      {t('booking_select_facility')}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-[10px] font-mono text-[#94A3B8] bg-[#121722]/60 px-2.5 py-1 rounded-lg border border-white/5">
                  <Globe className="w-3.5 h-3.5 text-[#00A3FF] animate-pulse" />
                  <span className="truncate max-w-[110px] sm:max-w-none">{detectedTimezone}</span>
                </div>
              </div>

              {/* Facility Discipline Grid - 3 Facilities */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
                {facilityOptions.map((opt) => {
                  const Icon = opt.icon;
                  const isSelected = facilityType === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => {
                        soundEngine.playPulseNode();
                        setFacilityType(opt.id);
                      }}
                      className={`p-3 sm:p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-start gap-2.5 sm:gap-3 relative overflow-hidden group ${
                        isSelected
                          ? 'bg-[#00A3FF]/15 border-[#00A3FF] shadow-[0_0_15px_rgba(0,163,255,0.25)]'
                          : 'bg-[#05070a]/85 border-white/10 hover:border-[#00A3FF]/40 hover:bg-[#0E1420]'
                      }`}
                    >
                      <div className={`p-2 rounded-lg shrink-0 transition-all ${
                        isSelected 
                          ? 'bg-[#00A3FF] text-white shadow-[0_0_10px_rgba(0,163,255,0.4)]' 
                          : 'bg-white/5 text-gray-400 group-hover:text-[#00A3FF]'
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs sm:text-sm font-bold text-white truncate">{opt.name}</div>
                        <div className="text-[10px] text-gray-400 mt-0.5 truncate">{opt.desc}</div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Two High-Impact Cyber Action Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                {/* Action Card 1: Sports OS Demo */}
                <div className="relative group/card rounded-2xl p-5 sm:p-6 bg-gradient-to-b from-[#0A101D] via-[#070B12] to-[#04060A] border border-[#00A3FF]/25 hover:border-[#00A3FF]/60 shadow-[0_10px_30px_rgba(0,0,0,0.5),0_0_20px_rgba(0,163,255,0.06)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.6),0_0_30px_rgba(0,163,255,0.18)] transition-all duration-300 flex flex-col justify-between overflow-hidden">
                  {/* Ambient Glow */}
                  <div className="absolute top-0 right-0 w-36 h-36 bg-[#00A3FF]/15 rounded-full blur-3xl pointer-events-none group-hover/card:bg-[#00A3FF]/25 transition-all duration-500" />
                  
                  <div className="relative z-10 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#00A3FF]/10 border border-[#00A3FF]/30 text-[10px] font-mono font-bold text-[#00D2FF] tracking-wider uppercase">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00A3FF] animate-pulse" />
                        {t('booking_action_demo_badge')}
                      </div>
                      <div className="w-8 h-8 rounded-xl bg-[#00A3FF]/10 border border-[#00A3FF]/25 flex items-center justify-center text-[#00A3FF] group-hover/card:scale-110 group-hover/card:bg-[#00A3FF]/20 transition-all duration-300">
                        <Play className="w-3.5 h-3.5 fill-[#00A3FF]/30 text-[#00A3FF]" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white tracking-tight">
                        {t('booking_action_demo_title')}
                      </h4>
                      <p className="text-xs text-[#94A3B8] font-normal leading-relaxed mt-1.5">
                        {t('booking_action_demo_desc')}
                      </p>
                    </div>
                  </div>

                  <div className="relative z-10 pt-5 mt-auto">
                    <Link
                      href={`/get-started?mode=demo&facility=${facilityType}`}
                      onClick={() => soundEngine.playSystemAccess()}
                      className="relative group/btn w-full min-h-[48px] px-3 sm:px-4 py-3 rounded-xl bg-gradient-to-r from-[#00A3FF] via-[#0085FF] to-[#0066FF] text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,163,255,0.25)] hover:shadow-[0_0_30px_rgba(0,163,255,0.5)] border border-[#00D2FF]/40 hover:border-white/60 transition-all duration-200 overflow-hidden cursor-pointer active:scale-[0.98]"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 pointer-events-none" />
                      <Play className="w-3.5 h-3.5 fill-white text-white shrink-0" />
                      <span className="whitespace-nowrap">{t('booking_action_demo_btn')}</span>
                      <ArrowRight className="w-4 h-4 shrink-0 transition-transform duration-200 group-hover/btn:translate-x-1" />
                    </Link>
                  </div>
                </div>

                {/* Action Card 2: Direct B2B Registration */}
                <div className="relative group/card rounded-2xl p-5 sm:p-6 bg-gradient-to-b from-[#091510] via-[#060E0B] to-[#04060A] border border-[#00ff87]/25 hover:border-[#00ff87]/60 shadow-[0_10px_30px_rgba(0,0,0,0.5),0_0_20px_rgba(0,255,135,0.06)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.6),0_0_30px_rgba(0,255,135,0.18)] transition-all duration-300 flex flex-col justify-between overflow-hidden">
                  {/* Ambient Glow */}
                  <div className="absolute top-0 right-0 w-36 h-36 bg-[#00ff87]/15 rounded-full blur-3xl pointer-events-none group-hover/card:bg-[#00ff87]/25 transition-all duration-500" />
                  
                  <div className="relative z-10 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#00ff87]/10 border border-[#00ff87]/30 text-[10px] font-mono font-bold text-[#00ff87] tracking-wider uppercase">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00ff87] animate-pulse" />
                        {t('booking_action_reg_badge')}
                      </div>
                      <div className="w-8 h-8 rounded-xl bg-[#00ff87]/10 border border-[#00ff87]/25 flex items-center justify-center text-[#00ff87] group-hover/card:scale-110 group-hover/card:bg-[#00ff87]/20 transition-all duration-300">
                        <ShieldCheck className="w-4 h-4 text-[#00ff87]" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white tracking-tight">
                        {t('booking_action_reg_title')}
                      </h4>
                      <p className="text-xs text-[#94A3B8] font-normal leading-relaxed mt-1.5">
                        {t('booking_action_reg_desc')}
                      </p>
                    </div>
                  </div>

                  <div className="relative z-10 pt-5 mt-auto">
                    <Link
                      href={`/get-started?mode=register&facility=${facilityType}`}
                      onClick={() => soundEngine.playPulseNode()}
                      className="relative group/btn w-full min-h-[48px] px-3 sm:px-4 py-3 rounded-xl bg-gradient-to-r from-[#00ff87] via-[#00eb7b] to-[#00cc66] text-[#070A0F] font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,255,135,0.25)] hover:shadow-[0_0_30px_rgba(0,255,135,0.5)] border border-[#00ff87]/50 hover:border-white/80 transition-all duration-200 overflow-hidden cursor-pointer active:scale-[0.98]"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 pointer-events-none" />
                      <Building2 className="w-4 h-4 shrink-0 text-[#070A0F]" />
                      <span className="whitespace-nowrap">{t('booking_action_reg_btn')}</span>
                      <ArrowRight className="w-4 h-4 shrink-0 transition-transform duration-200 group-hover/btn:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Security & Regulatory Telemetry */}
              <div className="flex items-center justify-between text-[9px] font-mono text-[#94A3B8]/60 pt-2 border-t border-white/5">
                <div className="flex items-center gap-1.5 text-[#00ff87]/70">
                  <Lock className="w-3 h-3" />
                  <span>AES-256-GCM SSL ENCRYPTED GATEWAY</span>
                </div>
                <span>ORDER №01-15/ნ COMPLIANT</span>
              </div>
            </div>
          </div>

          {/* Right Block (5 Cols): Cyber Radar Map */}
          <BookingRadarMap />
        </div>
      </div>
    </section>
  );
};
