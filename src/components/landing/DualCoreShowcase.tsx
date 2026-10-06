'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';
import { LaborComplianceModal } from './LaborComplianceModal';
import { AppStoreBadges } from '@/components/ui/AppStoreBadges';
import { useDualCoreSync } from './dual-core/useDualCoreSync';
import { B2BConsoleCard } from './dual-core/B2BConsoleCard';
import { SyntaxBridgeCanvas } from './dual-core/SyntaxBridgeCanvas';
import { B2CMobilePass } from './dual-core/B2CMobilePass';
import { SyncStepsExplainer } from './dual-core/SyncStepsExplainer';

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
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-950/30 text-cyan-400 font-mono text-[11px] mb-4 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>DUAL-CORE ECOSYSTEM · LIVE SYNC</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4 leading-tight">
            {locale === 'ka'
              ? 'სინქრონული ეკოსისტემა: B2B პანელი & B2C აპლიკაცია'
              : locale === 'ru'
              ? 'Синхронная экосистема: B2B панель и B2C приложение'
              : 'Synchronized Ecosystem: B2B Dashboard & B2C App'}
          </h2>
          <p className="text-sm sm:text-base text-slate-400 font-light leading-relaxed max-w-2xl mx-auto">
            {locale === 'ka'
              ? 'ერთიანი ციფრული ბირთვი, სადაც სპორტსმენის მობილური აპლიკაცია, ადმინისტრაციის სამართავი პანელი და IoT ტურნიკეტები სინქრონულად მუშაობს რეალურ დროში.'
              : locale === 'ru'
              ? 'Единое цифровое ядро, где мобильное приложение атлета, панель администратора и IoT-турникеты работают синхронно в реальном времени.'
              : 'A unified digital core where the athlete mobile app, admin dashboard, and IoT turnstiles operate in real-time synchronicity.'}
          </p>
        </div>

        {/* 3D Perspective Stage Container */}
        <div
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
          className="relative pt-12 pb-16 sm:pb-24 preserve-3d"
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

          {/* 3D Perspective Floor Plane */}
          <div
            className="absolute left-[2%] right-[2%] bottom-12 h-[380px] rounded-t-xl overflow-hidden pointer-events-none font-mono text-sky-100/20"
            style={{
              transformOrigin: '50% 100%',
              transform: 'rotateX(74deg)',
              background:
                'radial-gradient(ellipse 55% 65% at 50% 70%, rgba(217,119,6,0.08) 0%, rgba(217,119,6,0) 72%), linear-gradient(180deg, #090D12 0%, #0C1118 55%, #0F141B 100%)',
              boxShadow: 'inset 0 1px 0 rgba(224,242,254,0.12)',
            }}
          >
            {/* Markers */}
            <span className="absolute left-[3%] top-[6%] text-xl">+</span>
            <span className="absolute right-[3%] top-[6%] text-xl">+</span>
            <span className="absolute left-[3%] bottom-[4%] text-xl">+</span>
            <span className="absolute right-[3%] bottom-[4%] text-xl">+</span>
            <span className="absolute inset-x-0 bottom-[12%] text-center text-lg tracking-[0.5em] text-slate-500/40">
              [03 // 02 // 01]
            </span>

            {/* Glowing Fiber Artery Channel */}
            <div className="absolute left-[5%] right-[5%] top-[58%] h-2.5 rounded-full bg-gradient-to-b from-black to-[#080B10] shadow-[inset_0_3px_4px_black] overflow-hidden">
              <div className="absolute inset-x-0 top-1 h-0.5 bg-amber-500/25" />
              <div className="absolute top-0.5 h-1 w-[22%] rounded bg-gradient-to-r from-transparent via-amber-500/80 to-transparent shadow-[0_0_12px_rgba(245,158,11,0.6)] animate-[fiber_4s_linear_infinite]" />
              {state.revOn && (
                <div className="absolute top-1 h-0.5 w-[18%] rounded bg-gradient-to-r from-transparent via-sky-400/80 to-transparent shadow-[0_0_10px_rgba(56,189,248,0.6)] animate-[fiberR_5s_linear_infinite]" />
              )}
            </div>
          </div>

          {/* 3D Pedestal Lip */}
          <div className="absolute left-[2%] right-[2%] bottom-6 h-6 rounded-b-xl bg-gradient-to-b from-[#141A22] via-[#090C11] to-[#040507] shadow-[inset_0_1px_0_rgba(224,242,254,0.12),0_40px_70px_rgba(0,0,0,0.95)] pointer-events-none" />

          {/* 3D Interactive Row with Stations */}
          <div
            className="relative preserve-3d z-10 flex flex-wrap justify-center items-center gap-8 sm:gap-11 transition-transform duration-300 ease-out"
            style={{ transform: rowTransform, transformStyle: 'preserve-3d' }}
          >
            {/* Station 03: B2B Business Console */}
            <B2BConsoleCard
              state={state}
              onOpenLaborModal={() => setIsLaborModalOpen(true)}
            />

            {/* Station 02: Software Synapse Bridge */}
            <SyntaxBridgeCanvas state={state} />

            {/* Station 01: B2C Mobile Pass */}
            <B2CMobilePass
              state={state}
              onRun={run}
              onBtnHover={setBtnHover}
              onBtnPress={setBtnPress}
            />
          </div>
        </div>

        {/* Step-by-Step Closed-Loop Explainer */}
        <SyncStepsExplainer phase={state.phase} locale={locale} />

        {/* App Store & Google Play Download Badges */}
        <div className="mt-10 sm:mt-14 w-full flex flex-col items-center">
          <AppStoreBadges
            variant="default"
            align="center"
            layout="horizontal"
            showIndicator={true}
            className="w-full max-w-lg"
          />
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
