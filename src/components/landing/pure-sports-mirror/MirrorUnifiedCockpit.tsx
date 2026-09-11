'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MasterDimensionId,
  MIRROR_DIMENSIONS,
} from './mirrorDataMatrix';
import { MirrorMasterDock } from './MirrorMasterDock';
import { MirrorUnifiedStage } from './MirrorUnifiedStage';
import { MirrorIcon } from './MirrorIcon';
import { useTactileAudio } from './useTactileAudio';

const MASTER_TABS: { id: MasterDimensionId; label: string; icon: string; shortLabel: string }[] = [
  { id: 'venues', label: 'I. სპორტული სივრცეები', icon: 'landmark', shortLabel: 'I. სივრცეები' },
  { id: 'workforce', label: 'II. ადამიანური კაპიტალი', icon: 'users', shortLabel: 'II. კაპიტალი' },
  { id: 'mastery', label: 'III. ოსტატობა & ტიტულები', icon: 'trophy', shortLabel: 'III. ოსტატობა' },
];

// ── Floating Ambient Particles (CSS/motion lightweight) ───────────────
interface ParticleProps { x: number; y: number; size: number; duration: number; delay: number }
function FloatingParticle({ x, y, size, duration, delay }: ParticleProps) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        background: 'radial-gradient(circle, rgba(0,229,255,0.7) 0%, rgba(0,163,255,0.3) 60%, transparent 100%)',
        filter: `blur(${size * 0.5}px)`,
      }}
      animate={{
        y: [-12, 12, -12],
        x: [-6, 6, -6],
        opacity: [0.15, 0.45, 0.15],
        scale: [0.85, 1.15, 0.85],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}

const PARTICLES: ParticleProps[] = [
  { x: 8,  y: 15, size: 4,  duration: 6.5, delay: 0 },
  { x: 22, y: 65, size: 3,  duration: 8.0, delay: 1.2 },
  { x: 45, y: 8,  size: 5,  duration: 7.2, delay: 0.5 },
  { x: 68, y: 50, size: 3,  duration: 9.0, delay: 2.0 },
  { x: 85, y: 20, size: 4,  duration: 6.8, delay: 0.8 },
  { x: 92, y: 75, size: 3,  duration: 7.5, delay: 1.5 },
  { x: 15, y: 80, size: 2,  duration: 8.5, delay: 3.0 },
  { x: 55, y: 88, size: 4,  duration: 6.2, delay: 0.3 },
  { x: 78, y: 42, size: 2,  duration: 9.5, delay: 2.5 },
  { x: 35, y: 30, size: 3,  duration: 7.8, delay: 1.0 },
];

export const MirrorUnifiedCockpit: React.FC = () => {
  const [activeDimensionId, setActiveDimensionId] = useState<MasterDimensionId>('venues');
  const activeDimension = MIRROR_DIMENSIONS[activeDimensionId];

  const [activePillId, setActivePillId] = useState<string>(activeDimension.subPills[0].id);
  const [isAutoTour, setIsAutoTour] = useState<boolean>(false);

  const { isMuted, toggleMute, playTactileClick, playTactileThud } = useTactileAudio();

  const handleDimensionChange = (tabId: MasterDimensionId) => {
    if (tabId !== activeDimensionId) {
      playTactileThud();
      setActiveDimensionId(tabId);
      setActivePillId(MIRROR_DIMENSIONS[tabId].subPills[0].id);
    }
  };

  // Auto-tour rotation across modules and dimensions
  useEffect(() => {
    if (!isAutoTour) return;
    const interval = setInterval(() => {
      const pills = activeDimension.subPills;
      const currentIndex = pills.findIndex((p) => p.id === activePillId);
      if (currentIndex < pills.length - 1) {
        setActivePillId(pills[currentIndex + 1].id);
      } else {
        const tabKeys: MasterDimensionId[] = ['venues', 'workforce', 'mastery'];
        const nextTabIndex = (tabKeys.indexOf(activeDimensionId) + 1) % tabKeys.length;
        const nextTabId = tabKeys[nextTabIndex];
        setActiveDimensionId(nextTabId);
        setActivePillId(MIRROR_DIMENSIONS[nextTabId].subPills[0].id);
      }
    }, 4500);
    return () => clearInterval(interval);
  }, [isAutoTour, activeDimension, activePillId, activeDimensionId]);

  return (
    <div
      className="w-full relative rounded-3xl overflow-hidden select-none"
      style={{
        background: '#060910',
        border: '1px solid rgba(0, 163, 255, 0.25)',
        boxShadow: '0 20px 70px rgba(0, 0, 0, 0.85), 0 0 50px rgba(0, 163, 255, 0.12)',
      }}
    >
      {/* ── PS5 Ambient Background Layers ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(0, 163, 255, 0.12) 0%, transparent 70%)',
        }}
      />

      {/* Micro-Dot Matrix & Soft Fog */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(0, 229, 255, 0.12) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          opacity: 0.6,
        }}
      />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {PARTICLES.map((p, i) => (
          <FloatingParticle key={i} {...p} />
        ))}
      </div>

      {/* Top window reflection line */}
      <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#00E5FF]/60 to-transparent pointer-events-none z-10" />

      {/* ── [●●●] SPORT-OS CONSOLE v3.3 TOP BAR ── */}
      <div
        className="relative z-10 flex flex-row items-center justify-between gap-3 px-4 sm:px-6 lg:px-8 py-3.5 border-b border-white/[0.08]"
        style={{ background: 'rgba(6, 9, 16, 0.9)', backdropFilter: 'blur(12px)' }}
      >
        {/* Left: Traffic Dots + Version */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#EF4444]/80 shadow-[0_0_6px_#EF4444]" />
            <span className="w-3 h-3 rounded-full bg-[#F59E0B]/80 shadow-[0_0_6px_#F59E0B]" />
            <span className="w-3 h-3 rounded-full bg-[#10B981]/80 shadow-[0_0_6px_#10B981]" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs sm:text-sm font-mono font-bold tracking-wider text-[#00E5FF] uppercase">
              SPORT-OS CONSOLE
            </span>
            <span
              className="hidden sm:inline text-[10px] font-mono px-2 py-0.5 rounded text-slate-400"
              style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.08)' }}
            >
              v3.3 SYSTEMIC MIRROR
            </span>
          </div>
        </div>

        {/* Right: Auto Tour + Audio Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => { playTactileClick(); setIsAutoTour((p) => !p); }}
            aria-label={isAutoTour ? 'ავტო-ტურის შეჩერება' : 'ავტო-ტურის ჩართვა'}
            className={`flex items-center gap-1.5 px-3 py-1.5 min-h-[38px] rounded-lg text-xs font-mono transition-colors duration-200 border focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5FF] ${
              isAutoTour
                ? 'border-[#00E5FF] text-[#00E5FF]'
                : 'border-white/10 text-slate-300 hover:border-white/20'
            }`}
            style={isAutoTour
              ? { background: 'rgba(0, 163, 255, 0.18)', boxShadow: '0 0 14px rgba(0, 229, 255, 0.3)' }
              : { background: 'rgba(255, 255, 255, 0.03)' }
            }
          >
            <span className="text-xs">{isAutoTour ? '⏸' : '▶'}</span>
            <span className="tracking-wider">{isAutoTour ? 'AUTO TOUR ON' : 'AUTO TOUR'}</span>
          </button>

          <button
            type="button"
            onClick={toggleMute}
            aria-label={isMuted ? 'ხმის ჩართვა' : 'ხმის გათიშვა'}
            className="flex items-center gap-1 px-2.5 py-1.5 min-h-[38px] rounded-lg text-xs font-mono text-slate-300 hover:text-white transition-colors duration-200 border border-white/10 hover:border-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5FF]"
            style={{ background: 'rgba(255, 255, 255, 0.03)' }}
          >
            <span>{isMuted ? '🔇' : '🔊'}</span>
          </button>
        </div>
      </div>

      {/* ── 1️⃣ MASTER SWITCHER (მთავარი 3 განზომილება - გამოკვეთილი, დიდი) ── */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 pt-5 pb-1">
        <div
          role="tablist"
          aria-label="Master Dimension Selector"
          className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 p-1.5 rounded-2xl"
          style={{ background: '#040608', border: '1px solid rgba(255, 255, 255, 0.08)' }}
        >
          {MASTER_TABS.map((tab) => {
            const isActive = activeDimensionId === tab.id;
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => handleDimensionChange(tab.id)}
                className={`relative px-4 py-3 min-h-[50px] sm:min-h-[54px] rounded-xl text-xs sm:text-sm lg:text-base font-bold transition-all duration-200 flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5FF] ${
                  isActive ? 'text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeMasterDimensionSwitcher"
                    transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                    className="absolute inset-0 rounded-xl"
                    style={{
                      background:
                        'linear-gradient(135deg, rgba(0, 85, 255, 0.35) 0%, rgba(0, 163, 255, 0.28) 50%, rgba(0, 229, 255, 0.22) 100%)',
                      border: '1.5px solid rgba(0, 229, 255, 0.7)',
                      boxShadow: '0 0 25px rgba(0, 163, 255, 0.4), inset 0 1px 0 rgba(0, 229, 255, 0.3)',
                    }}
                  />
                )}
                <MirrorIcon
                  name={tab.icon}
                  isActive={isActive}
                  size={18}
                  className="relative z-10"
                />
                <span className="relative z-10 tracking-tight">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── 2️⃣ HERO MODULE CARDS (დიდი, პრესტიჟული PS5 აიქონ-ბარათები) ── */}
      <div className="relative z-10">
        <MirrorMasterDock
          pills={activeDimension.subPills}
          activePillId={activePillId}
          onSelectPill={setActivePillId}
          playTactileClick={playTactileClick}
        />
      </div>

      {/* ── 3️⃣ THE UNIFIED STAGE (ერთიანი, გაუყოფელი ფანჯარა - NO SPLIT BOXES!) ── */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 pb-6 pt-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeDimensionId}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="w-full"
          >
            <MirrorUnifiedStage
              pills={activeDimension.subPills}
              activePillId={activePillId}
              dimensionId={activeDimensionId}
              playTactileClick={playTactileClick}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
