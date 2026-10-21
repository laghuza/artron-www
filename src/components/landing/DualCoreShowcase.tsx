'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { LaborComplianceModal } from './LaborComplianceModal';
import { useDualCoreSync } from './dual-core/useDualCoreSync';
import { B2BConsoleCard } from './dual-core/B2BConsoleCard';
import { SyntaxBridgeCanvas } from './dual-core/SyntaxBridgeCanvas';
import { B2CMobilePass } from './dual-core/B2CMobilePass';
import { RoleIntentSelector } from './RoleIntentSelector';

export const DualCoreShowcase: React.FC = () => {
  const { locale } = useLanguage();
  const [isLaborModalOpen, setIsLaborModalOpen] = useState<boolean>(false);

  const {
    state,
    run,
    onMouseMove,
    onMouseLeave,
    setBtnHover,
    setBtnPress,
  } = useDualCoreSync();

  const tx = state.tilt.x;
  const ty = state.tilt.y;
  const rowTransform = `rotateX(${(-ty * 4).toFixed(2)}deg) rotateY(${(tx * 6).toFixed(2)}deg)`;

  return (
    <section
      id="ecosystem"
      className="relative pt-12 sm:pt-16 pb-16 sm:pb-24 bg-[#05070B] border-t border-white/[0.06] overflow-hidden"
    >
      {/* Background Radial Ambiance */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#00A3FF]/[0.07] rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[300px] bg-amber-500/[0.05] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-950/30 text-cyan-400 font-mono text-[11px] mb-4 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>
              {locale === 'ka'
                ? 'ორმხრივი სინქრონიზაცია · REAL-TIME CORE'
                : locale === 'ru'
                ? 'ДВУСТОРОННЯЯ СИНХРОНИЗАЦИЯ · REAL-TIME CORE'
                : 'DUAL-CORE SYNC · REAL-TIME CORE'}
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-3 sm:mb-4 leading-tight">
            {locale === 'ka'
              ? 'კლუბის მართვის პანელი და წევრის ციფრული საშვი'
              : locale === 'ru'
              ? 'Панель управления клубом и цифровой пропуск резидента'
              : 'Club Management Console & Athlete Digital Pass'}
          </h2>
          <p className="text-xs sm:text-base text-slate-400 font-light leading-relaxed max-w-2xl mx-auto">
            {locale === 'ka' ? (
              <>
                <span className="hidden sm:inline">მყისიერი კავშირი ადმინისტრაციასა და სპორტსმენს შორის: მობილურით შეძენილი აბონემენტი, ტურნიკეტის ავტომატური გახსნა და შემოსავლების ლაივ აღრიცხვა.</span>
                <span className="sm:hidden">მობილურით შეძენილი საშვი, ტურნიკეტის ავტომატური გახსნა და ლაივ აღრიცხვა.</span>
              </>
            ) : locale === 'ru' ? (
              <>
                <span className="hidden sm:inline">Мгновенная связь между администрацией и атлетом: покупка абонемента через приложение, автоматическое открытие турникета и учет доходов в реальном времени.</span>
                <span className="sm:hidden">Покупка абонемента через приложение, авто-открытие турникета и учет доходов.</span>
              </>
            ) : (
              <>
                <span className="hidden sm:inline">Instant synchronization between administration and member: mobile pass purchase, automated turnstile entry, and real-time revenue ledger.</span>
                <span className="sm:hidden">Mobile pass purchase, automated turnstile entry, and real-time ledger.</span>
              </>
            )}
          </p>
        </div>

        {/* B2B vs B2C Role Intent Selector */}
        <RoleIntentSelector className="mb-10 sm:mb-14" />

        {/* 3D Perspective Stage Container */}
        <div
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
          className="relative pt-6 sm:pt-8 pb-16 sm:pb-24 preserve-3d mobile-flat-3d"
          style={{ perspective: '1700px', perspectiveOrigin: '50% 40%', transformStyle: 'preserve-3d' }}
        >
          {/* Ambient Ground Glow */}
          <div
            className="absolute left-[-10%] right-[-10%] bottom-10 h-[360px] pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 50% 46% at 50% 78%, rgba(217,119,6,0.08) 0%, rgba(217,119,6,0.03) 45%, transparent 75%)',
              filter: 'blur(20px)',
            }}
          />

          {/* 3D Perspective Floor Plane (Desktop only: on mobile stacked cards intersect this plane) */}
          <div
            className="hidden lg:block absolute left-[1%] right-[1%] bottom-[50px] h-[380px] rounded-t-[12px] overflow-hidden pointer-events-none font-mono text-[#E0F2FE]/20"
            style={{
              transformOrigin: '50% 100%',
              transform: 'rotateX(74deg)',
              background:
                'radial-gradient(ellipse 55% 65% at 50% 70%, rgba(217,119,6,0.08) 0%, rgba(217,119,6,0) 72%), radial-gradient(ellipse 45% 60% at 10% 0%, rgba(224,242,254,0.05) 0%, rgba(224,242,254,0) 70%), linear-gradient(180deg, #090D12 0%, #0C1118 55%, #0F141B 100%)',
              boxShadow:
                'inset 0 1px 0 rgba(224,242,254,0.12), inset 1px 0 0 rgba(224,242,254,0.05), inset -1px 0 0 rgba(224,242,254,0.04)',
            }}
          >
            {/* Dynamic Dawn Radial Ambient Glow */}
            <div
              className="absolute left-[26%] right-[26%] top-0 h-[78%] pointer-events-none transition-opacity duration-800"
              style={{
                background:
                  'radial-gradient(ellipse 50% 60% at 50% 28%, rgba(234,179,8,0.22) 0%, rgba(217,119,6,0.07) 45%, rgba(217,119,6,0) 75%)',
                opacity: state.gateOpen ? 1 : state.phase === 'processing' ? 0.75 : 0.5,
              }}
            />

            {/* Dynamic Glacier Radial Ambient Glow */}
            <div
              className="absolute left-[16%] right-[16%] top-[6%] h-[84%] pointer-events-none transition-opacity duration-900"
              style={{
                background:
                  'radial-gradient(ellipse 50% 55% at 50% 40%, rgba(56,189,248,0.2) 0%, rgba(56,189,248,0.06) 45%, rgba(56,189,248,0) 75%)',
                opacity: state.revOn ? 1 : state.dispatch ? 0.6 : 0,
              }}
            />

            {/* Corner Markers */}
            <span className="absolute left-[3%] top-[6%] text-[22px] font-mono leading-none select-none">+</span>
            <span className="absolute right-[3%] top-[6%] text-[22px] font-mono leading-none select-none">+</span>
            <span className="absolute left-[3%] bottom-[4%] text-[22px] font-mono leading-none select-none">+</span>
            <span className="absolute right-[3%] bottom-[4%] text-[22px] font-mono leading-none select-none">+</span>

            {/* Midfield Track Markers */}
            <span className="absolute left-[12%] top-[30%] text-[20px] font-mono tracking-[0.4em] leading-none select-none">
              · · ·
            </span>
            <span className="absolute right-[12%] top-[30%] text-[20px] font-mono tracking-[0.4em] leading-none select-none">
              · · ·
            </span>

            {/* Center Station Sequence */}
            <span className="absolute inset-x-0 bottom-[12%] text-center font-mono text-[18px] sm:text-[20px] tracking-[0.5em] text-[#E0F2FE]/25 select-none">
              [01 // 02 // 03]
            </span>

            {/* Technological Tick Ruler / Scale */}
            <div
              className="absolute left-[6%] right-[6%] bottom-[3%] h-[14px]"
              style={{
                background:
                  'repeating-linear-gradient(90deg, rgba(224,242,254,0.16) 0 1px, transparent 1px 28px)',
              }}
            />

            {/* Glowing Fiber Artery Channel */}
            <div
              className="absolute left-[5%] right-[5%] top-[58%] h-[10px] rounded-[5px] overflow-hidden"
              style={{
                background: 'linear-gradient(180deg, #010203 0%, #080B10 100%)',
                boxShadow:
                  'inset 0 3px 4px rgba(0,0,0,1), 0 1px 0 rgba(224,242,254,0.12), 0 -1px 0 rgba(0,0,0,0.8)',
              }}
            >
              {/* Upper Rail Track */}
              <div
                className="absolute inset-x-0 top-[4px] h-[2px] transition-colors duration-400"
                style={{
                  background: 'rgba(245,158,11,0.22)',
                }}
              />
              {/* Lower Rail Track */}
              <div className="absolute inset-x-0 top-[7px] h-[1px] bg-sky-400/[0.22]" />

              {/* Dynamic Traveling Light Pulses */}
              <div className="absolute top-[3px] h-[4px] w-[22%] rounded-[2px] bg-gradient-to-r from-transparent via-amber-500/75 to-transparent shadow-[0_0_12px_rgba(245,158,11,0.5)] animate-[fiber_4s_linear_infinite]" />
              {state.revOn && (
                <div className="absolute top-[6px] h-[3px] w-[18%] rounded-[2px] bg-gradient-to-r from-transparent via-sky-400/75 to-transparent shadow-[0_0_10px_rgba(56,189,248,0.5)] animate-[fiberR_5s_linear_infinite]" />
              )}
            </div>
          </div>

          {/* 3D Pedestal Lip with Ambient Underside Glow (Desktop only) */}
          <div
            className="hidden lg:block absolute left-[1%] right-[1%] bottom-[26px] h-[24px] rounded-b-[10px] pointer-events-none"
            style={{
              background: 'linear-gradient(180deg, #141A22 0%, #090C11 45%, #040507 100%)',
              boxShadow:
                'inset 0 1px 0 rgba(224,242,254,0.12), inset 0 -8px 14px -8px rgba(217,119,6,0.16), 0 40px 70px -10px rgba(0,0,0,0.95)',
            }}
          />

          {/* 3D Interactive Row with Stations */}
          <div
            className="relative lg:preserve-3d z-10 flex flex-wrap justify-center items-center gap-8 sm:gap-11 transition-transform duration-300 ease-out mobile-flat-3d"
            style={{ transform: rowTransform, transformStyle: 'preserve-3d' }}
          >
            {/* Ambient Contact Shadow under Stations (Desktop only) */}
            <div
              className="hidden lg:block absolute left-[2%] right-[2%] -bottom-[110px] h-[200px] pointer-events-none"
              style={{
                background:
                  'radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.6) 35%, transparent 70%)',
                transform: 'translateZ(-140px) rotateX(72deg)',
              }}
            />
            {/* Station 01: B2B Business Console */}
            <B2BConsoleCard
              state={state}
              onOpenLaborModal={() => setIsLaborModalOpen(true)}
            />

            {/* Station 02: Software Synapse Bridge */}
            <SyntaxBridgeCanvas state={state} />

            {/* Station 03: B2C Mobile Pass */}
            <B2CMobilePass
              state={state}
              onRun={run}
              onBtnHover={setBtnHover}
              onBtnPress={setBtnPress}
            />
          </div>
        </div>

      </div>

      {/* Labor Compliance Order №01-15/n Audit Modal */}
      <LaborComplianceModal
        isOpen={isLaborModalOpen}
        onClose={() => setIsLaborModalOpen(false)}
      />
    </section>
  );
};
