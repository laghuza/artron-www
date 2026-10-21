'use client';

import React from 'react';
import { SHOWCASE_RGB, SHOWCASE_PALE } from './mobileShowcaseConfig';
import { MobileBeamEngine } from './MobileBeamEngine';
import { DynamicIslandNotif } from './DynamicIslandNotif';
import { InnerBeamCoords, DynamicNotifData } from './types';

interface MobilePhoneChassisProps {
  activeId: number;
  shownId: number;
  phoneRef: React.RefObject<HTMLDivElement | null>;
  phoneColRef?: React.RefObject<HTMLDivElement | null>;
  rx: number;
  ry: number;
  onTilt: (e: React.MouseEvent<HTMLDivElement>) => void;
  onTiltLeave: () => void;
  inner: InnerBeamCoords | null;
  notif: DynamicNotifData | null;
  notifTilt: boolean;
  visits: number;
  streak?: number;
  frzDays?: number;
  guestsLeft?: number;
  occupancy?: number;
  pickedSlot?: number;
  renewStage?: 'idle' | 'scan' | 'done';
  selectedPlan?: number;
  children: React.ReactNode;
}

export const MobilePhoneChassis: React.FC<MobilePhoneChassisProps> = ({
  activeId,
  shownId,
  phoneRef,
  rx,
  ry,
  onTilt,
  onTiltLeave,
  inner,
  notif,
  notifTilt,
  visits,
  streak = 5,
  frzDays = 0,
  guestsLeft = 2,
  occupancy = 48,
  pickedSlot = 2,
  renewStage = 'idle',
  selectedPlan = 0,
  children,
}) => {
  const rgb = SHOWCASE_RGB[activeId];
  const pale = SHOWCASE_PALE[activeId];
  const amp = 8;
  const phoneTransform = `rotateX(${rx * amp}deg) rotateY(${ry * amp}deg)`;

  // Specular lighting angle A based on mouse coordinates
  const A = (Math.atan2(ry, -rx) * 180) / Math.PI;

  const rim = (a: number, hi: number, lo: number, base: string) =>
    `conic-gradient(from ${a - 32}deg, rgba(255,255,255,0) 0deg, rgba(255,255,255,${hi}) 32deg, rgba(255,255,255,0) 64deg, rgba(255,255,255,0) 172deg, rgba(255,255,255,${lo}) 212deg, rgba(255,255,255,0) 252deg), ${base}`;

  const rimOuter = rim(
    A,
    0.9,
    0.3,
    `conic-gradient(from ${A + 180}deg, #64748B 0%, #E2E8F0 25%, #475569 50%, #F8FAFC 75%, #64748B 100%)`
  );
  const rimInner = rim(A, 0.6, 0.18, '#1C2430');

  // Dynamic multi-layer floor & atmospheric drop shadows
  const backSh = `0 2px 4px rgba(0,0,0,.6), ${Math.round(8 - ry * 14)}px 26px 40px -8px rgba(0,0,0,.7), ${Math.round(26 - ry * 30)}px 64px 90px -10px rgba(14,8,2,.6), ${Math.round(50 - ry * 50)}px 120px 160px -20px rgba(0,0,0,.5)`;
  const castSh = `radial-gradient(ellipse at ${40 - ry * 12}% 50%, rgba(0,0,0,.6) 0%, rgba(10,6,2,.25) 45%, rgba(0,0,0,0) 72%)`;
  const floorGlow = `radial-gradient(ellipse at center, rgba(${rgb},.38) 0%, rgba(${rgb},.12) 40%, rgba(${rgb},0) 70%)`;
  const halo = `radial-gradient(ellipse at center, rgba(${rgb},.14) 0%, rgba(${rgb},.05) 30%, rgba(14,34,61,.45) 48%, rgba(4,6,10,0) 72%)`;

  // Photorealistic glass reflections
  const sheen = `repeating-linear-gradient(${125 + ry * 10}deg, rgba(255,255,255,.01) 0 1px, rgba(255,255,255,0) 1px 4px), linear-gradient(${118 + ry * 30}deg, rgba(224,242,254,0) ${22 + ry * 10}%, rgba(224,242,254,.04) ${34 + ry * 10}%, rgba(224,242,254,0) ${48 + ry * 10}%)`;
  const sfumato = `radial-gradient(ellipse 70% 38% at ${22 + ry * 14}% ${-4 - rx * 10}%, rgba(255,232,200,.07), rgba(255,232,200,0) 70%), radial-gradient(ellipse 120% 92% at ${36 + ry * 12}% ${24 - rx * 12}%, rgba(0,0,0,0) 50%, rgba(2,3,6,.26) 84%, rgba(0,0,0,.5) 100%)`;

  // Screen-specific status bar info
  const slotTimes = ['08:30', '11:00', '14:00', '17:30', '19:00', '20:15'];
  const curSlotTime = slotTimes[pickedSlot] || '14:00';
  const [ph, pm] = curSlotTime.split(':').map(Number);

  const planEnds = ['16.10', '16.12', '16.09.26'];
  const planEnd = planEnds[selectedPlan] || '16.10';

  const hdList: [string, string, number][] = [
    ['დარჩენილი', `${visits} / 12`, visits / 12],
    ['შემდეგი', curSlotTime, (ph * 60 + pm) / 1440],
    ['გარანტია', '14 დღე', 1],
    ['ვადა', renewStage === 'done' ? planEnd : '3 დღე', renewStage === 'done' ? 1 : 0.1],
    ['სერია', `${streak} კვ.`, Math.min(1, streak / 21)],
    ['დარჩა', `${14 - frzDays} / 14 დღე`, (14 - frzDays) / 14],
    ['სტუმარი', `${guestsLeft} / 3`, guestsLeft / 3],
    ['LIVE', `${occupancy}%`, occupancy / 100],
  ];

  const currentHd = hdList[shownId] || ['სტატუსი', 'აქტიური', 1];
  const [hdrLabel, hdrVal, hdrRatio] = currentHd;
  const hdrDeg = hdrRatio * 360;

  return (
    <div
      onMouseMove={onTilt}
      onMouseLeave={onTiltLeave}
      className="relative w-full flex justify-center py-6 sm:py-8 [perspective:1600px] select-none"
    >
      {/* Geometric Blueprint Grid Behind Smartphone */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 w-[640px] h-[860px] -mt-[430px] -ml-[320px] pointer-events-none text-slate-400/20 transition-transform duration-1000 ease-out"
        style={{
          transform: `translate3d(${(ry * 10).toFixed(1)}px, ${(-rx * 8).toFixed(1)}px, 0)`,
        }}
      >
        <svg viewBox="0 0 640 860" className="w-full h-full overflow-visible">
          <g fill="none" stroke="currentColor" strokeWidth="1">
            <circle cx="320" cy="430" r="300" strokeDasharray="2 6" opacity="0.7" />
            <circle cx="320" cy="430" r="185.4" opacity="0.35" />
            <rect x="20" y="130" width="600" height="600" opacity="0.4" />
            <line x1="20" y1="130" x2="620" y2="730" opacity="0.22" />
            <line x1="620" y1="130" x2="20" y2="730" opacity="0.22" />
            <line x1="320" y1="20" x2="320" y2="840" strokeDasharray="1 5" opacity="0.5" />
            <line x1="40" y1="341" x2="600" y2="341" strokeDasharray="1 5" opacity="0.7" />
            <line x1="40" y1="519" x2="600" y2="519" strokeDasharray="1 5" opacity="0.7" />
            <rect x="316" y="126" width="8" height="8" transform="rotate(45 320 130)" />
            <rect x="316" y="726" width="8" height="8" transform="rotate(45 320 730)" />
          </g>
          <g fill="currentColor" className="font-mono text-[10px] tracking-widest opacity-40">
            <text x="604" y="337">0.382 h</text>
            <text x="604" y="515">0.618 h</text>
            <text x="326" y="122">r = 300</text>
            <text x="326" y="256">r · φ⁻¹</text>
            <text x="24" y="748">1 : 1.618</text>
          </g>
        </svg>
      </div>

      {/* Ambient Halo & Floor Reflection Glows */}
      <div
        className="absolute left-1/2 top-1/2 w-[620px] h-[820px] -translate-x-1/2 -translate-y-1/2 pointer-events-none filter blur-[34px] transition-all duration-700"
        style={{ background: halo }}
      />
      <div
        className="absolute left-1/2 bottom-1 w-[380px] h-[64px] -translate-x-1/2 rounded-full pointer-events-none filter blur-[16px] transition-all duration-700"
        style={{ background: floorGlow }}
      />
      <div
        className="absolute left-1/2 bottom-6 w-[270px] h-[18px] -translate-x-1/2 rounded-full pointer-events-none filter blur-[4px]"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 45%, rgba(0,0,0,0) 72%)',
        }}
      />
      <div
        className="absolute left-1/2 bottom-3 w-[460px] h-[84px] -translate-x-[22%] -skew-x-[40deg] rounded-full pointer-events-none filter blur-[24px]"
        style={{ background: castSh }}
      />

      {/* PHYSICAL SMARTPHONE CONTAINER (300px x 620px with zoom: 1.22 for prominent 3D presence) */}
      <div
        ref={phoneRef}
        className="relative w-[300px] h-[620px] [transform-style:preserve-3d] transition-transform"
        style={{
          zoom: 1.22,
          transform: phoneTransform,
          transitionDuration: notifTilt ? '1100ms' : '250ms',
          transitionTimingFunction: notifTilt
            ? 'cubic-bezier(0.2,0.8,0.2,1)'
            : 'ease-out',
        }}
      >
        {/* Layer 0a: Atmospheric Depth Far Light */}
        <div
          className="absolute -inset-x-[90px] -inset-y-[80px] rounded-[120px] pointer-events-none filter blur-[22px]"
          style={{
            transform: 'translateZ(-190px) translate(36px,-30px)',
            background:
              'radial-gradient(ellipse 55% 50% at 30% 30%,rgba(156,195,193,.14),rgba(156,195,193,0) 72%),radial-gradient(ellipse 45% 40% at 75% 80%,rgba(226,192,109,.10),rgba(226,192,109,0) 72%)',
          }}
        />

        {/* Layer 0b: Atmospheric Depth Mid Light */}
        <div
          className="absolute -inset-x-[60px] -inset-y-[50px] rounded-[90px] pointer-events-none filter blur-[16px]"
          style={{
            transform: 'translateZ(-120px) translate(-28px,22px)',
            background:
              'radial-gradient(ellipse 60% 55% at 70% 70%,rgba(232,180,176,.16),rgba(232,180,176,0) 72%)',
          }}
        />

        {/* Layer 0c: Aura Veil */}
        <div
          className="absolute -inset-[26px] rounded-[70px] pointer-events-none filter blur-[10px] transition-all duration-700"
          style={{
            transform: 'translateZ(-60px)',
            background: `radial-gradient(ellipse 70% 60% at 30% 25%, rgba(${rgb},.24) 0%, rgba(${rgb},0) 70%)`,
          }}
        />

        {/* Layer 0d: Blueprint Frame Line */}
        <div
          className="absolute -inset-[14px] rounded-[64px] pointer-events-none"
          style={{
            transform: 'translateZ(-36px)',
            boxShadow: '0 0 0 1px rgba(226,232,240,.08)',
          }}
        />

        {/* Deep Chassis Backplate with Dynamic Drop Shadow */}
        <div
          className="absolute inset-1 rounded-[50px] bg-[#0A0D12]"
          style={{
            transform: 'translateZ(-16px)',
            boxShadow: backSh,
          }}
        />

        {/* Left Physical Hardware Buttons */}
        <div className="absolute -left-[2.5px] top-[118px] w-[3px] h-[30px] rounded-l-[2px] bg-gradient-to-r from-[#475569] via-[#E2E8F0] to-[#64748B]" />
        <div className="absolute -left-[2.5px] top-[172px] w-[3px] h-[56px] rounded-l-[2px] bg-gradient-to-r from-[#475569] via-[#E2E8F0] to-[#64748B]" />
        <div className="absolute -left-[2.5px] top-[240px] w-[3px] h-[56px] rounded-l-[2px] bg-gradient-to-r from-[#475569] via-[#E2E8F0] to-[#64748B]" />

        {/* Right Power Button */}
        <div className="absolute -right-[2.5px] top-[196px] w-[3px] h-[92px] rounded-r-[2px] bg-gradient-to-l from-[#475569] via-[#E2E8F0] to-[#64748B]" />

        {/* 1. Outer Titanium Metallic Rim with Dynamic Specular Highlight */}
        <div
          className="absolute inset-0 rounded-[52px]"
          style={{
            background: rimOuter,
          }}
        />

        {/* 2. Brushed Titanium Micro-Grooves Layer with Light Refraction */}
        <div
          className="absolute inset-[1px] rounded-[51px]"
          style={{
            background:
              'repeating-linear-gradient(90deg,rgba(255,255,255,.04) 0 1px,rgba(0,0,0,.03) 1px 2px,rgba(255,255,255,0) 2px 3px),linear-gradient(158deg,#E2E8F0 0%,#A3AFBF 16%,#64748B 42%,#7B8899 62%,#CBD5E1 84%,#8794A6 100%)',
            boxShadow:
              'inset 0 0 0 1px rgba(0,0,0,.2),inset 0 2px 3px rgba(255,255,255,.35),inset 0 -2px 4px rgba(0,0,0,.35)',
          }}
        />

        {/* 3. Inner Rim Bevel */}
        <div
          className="absolute inset-[8px] rounded-[44px]"
          style={{
            background: rimInner,
          }}
        />

        {/* 4. Display Bezel Container */}
        <div className="absolute inset-[9px] rounded-[43px] bg-[#020305] p-[3px] box-border">
          {/* Screen Glass Surface */}
          <div className="relative w-full h-full rounded-[40px] bg-gradient-to-b from-[#0B1626] via-[#04060A] to-[#04060A] overflow-hidden flex flex-col justify-between p-3.5">
            {/* Dynamic Island */}
            <div
              className="absolute left-1/2 top-2.5 w-[92px] h-[27px] -translate-x-1/2 bg-black rounded-2xl z-30 flex items-center justify-end px-2.5 transition-all duration-500"
              style={{
                boxShadow: notif
                  ? `0 0 0 1px rgba(${rgb},0.55), 0 0 18px rgba(${rgb},0.55)`
                  : '0 0 0 1px #0B0B0B',
              }}
            >
              <div className="w-2 h-2 rounded-full bg-slate-900 border border-cyan-500/30 shadow-inner" />
            </div>

            {/* Status Bar */}
            <div className="flex justify-between items-center px-4 pt-1 text-[11px] font-semibold text-white tracking-wider z-20">
              <span>11:24</span>
              <div className="flex items-center gap-1.5">
                <span className="flex items-end gap-[1.5px] h-2.5">
                  <span className="w-[2.5px] h-1 bg-white rounded-[0.5px]" />
                  <span className="w-[2.5px] h-1.5 bg-white rounded-[0.5px]" />
                  <span className="w-[2.5px] h-2 bg-white rounded-[0.5px]" />
                  <span className="w-[2.5px] h-2.5 bg-white rounded-[0.5px]" />
                </span>
                <div className="w-5 h-2.5 rounded-[3px] border border-white/50 p-[1px]">
                  <div className="w-[80%] h-full bg-white rounded-[1.5px]" />
                </div>
              </div>
            </div>

            {/* Phone App Header with Dynamic Circular Progress Telemetry */}
            <div className="flex justify-between items-center px-2 pt-5 pb-1 z-20">
              <span className="font-mono text-xs font-bold tracking-[0.28em] text-white">
                ARTRON
              </span>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-slate-400">
                  {hdrLabel}
                </span>
                <span className="font-mono text-[10px] font-medium text-white tabular-nums">
                  {hdrVal}
                </span>
                <span
                  className="w-3.5 h-3.5 rounded-full"
                  style={{
                    background: `conic-gradient(from 0deg, ${pale} 0deg, rgba(${rgb},1) ${hdrDeg}deg, rgba(226,232,240,0.15) ${hdrDeg}deg 360deg)`,
                    WebkitMask:
                      'radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 2px))',
                    mask: 'radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 2px))',
                  }}
                />
              </div>
            </div>

            {/* Active Screen Slot */}
            <div className="relative flex-1 min-h-0 flex flex-col justify-between py-1 z-20">
              {children}
            </div>

            {/* Bottom Home Indicator */}
            <div className="w-24 h-1 bg-white/60 rounded-full mx-auto mt-1 z-20" />

            {/* Glass Sheen & Sfumato Reflections */}
            <div
              className="absolute inset-0 rounded-[40px] pointer-events-none z-20"
              style={{ background: sheen }}
            />
            <div
              className="absolute inset-0 rounded-[40px] pointer-events-none mix-blend-screen z-20"
              style={{ background: sfumato }}
            />
          </div>
        </div>

        {/* SVG Inner Laser Beam Engine Overlay */}
        <MobileBeamEngine activeId={activeId} inner={inner} />

        {/* Dynamic Island 3D Notification Overlay */}
        <DynamicIslandNotif notif={notif} />
      </div>
    </div>
  );
};
