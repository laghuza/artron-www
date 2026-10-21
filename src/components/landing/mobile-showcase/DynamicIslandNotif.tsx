'use client';

import React from 'react';
import { DynamicNotifData } from './types';
import { SHOWCASE_RGB, SHOWCASE_PALE, SHOWCASE_ACCENTS } from './mobileShowcaseConfig';

interface DynamicIslandNotifProps {
  notif: DynamicNotifData | null;
}

export const DynamicIslandNotif: React.FC<DynamicIslandNotifProps> = ({ notif }) => {
  if (!notif) return null;

  const { i, key, tag, t, s, g, gs, ml, mr } = notif;
  const rgb = SHOWCASE_RGB[i];
  const pale = SHOWCASE_PALE[i];
  const accent = SHOWCASE_ACCENTS[i];

  return (
    <div
      key={`notif-${key}`}
      className="absolute left-0 top-0 w-[300px] h-[620px] pointer-events-none [transform-style:preserve-3d] z-40"
    >
      {/* Dynamic Island Aura Ring */}
      <div
        className="absolute left-1/2 top-[22px] w-[92px] h-[27px] rounded-2xl animate-[arNRing_4.6s_ease-out_both]"
        style={{
          boxShadow: `0 0 0 1px ${pale}, 0 0 16px rgba(${rgb}, 0.85)`,
          transformOrigin: '50% 50%',
        }}
      />

      {/* Screen Glow Spill */}
      <div
        className="absolute left-3.5 right-3.5 top-10 h-[120px] rounded-[30px] filter blur-md animate-[arNSpill_4.6s_both]"
        style={{
          background: `radial-gradient(ellipse 60% 55% at 50% 40%, rgba(${rgb},0.35) 0%, rgba(${rgb},0) 72%)`,
          transform: 'translateZ(1px)',
        }}
      />

      {/* 3D Floating Notification Card (Popping out in Z-space) */}
      <div
        className="absolute left-1/2 top-[22px] w-[336px] -ml-[168px] [transform-origin:50%_0] [transform-style:preserve-3d] animate-[arNCard_4.6s_cubic-bezier(0.2,0.8,0.2,1)_both]"
        style={{
          ['--z' as any]: '90px',
        }}
      >
        {/* Layer -10px */}
        <div
          className="absolute inset-0 rounded-[22px] bg-gradient-to-b from-[#0B0F16] to-[#05070B]"
          style={{
            transform: 'translateZ(-10px)',
            boxShadow: `0 0 0 1px rgba(${rgb}, 0.15)`,
          }}
        />
        {/* Layer -5px */}
        <div
          className="absolute inset-0 rounded-[22px] bg-gradient-to-b from-[#0B0F16] to-[#05070B]"
          style={{
            transform: 'translateZ(-5px)',
            boxShadow: `0 0 0 1px rgba(${rgb}, 0.3)`,
          }}
        />

        {/* Foreground Glass Card */}
        <div
          className="relative rounded-[22px] p-3.5 overflow-hidden border border-white/20 shadow-2xl"
          style={{
            background: `radial-gradient(90% 150% at 0% 0%, rgba(${rgb},0.26) 0%, transparent 55%), radial-gradient(60% 120% at 100% 100%, rgba(255,255,255,0.06) 0%, transparent 70%), linear-gradient(180deg, rgba(26,34,48,0.98), rgba(9,12,18,0.99))`,
            boxShadow: `inset 0 1px 0 rgba(255,255,255,0.35), inset 0 -1px 0 rgba(0,0,0,0.6), 0 0 0 1px rgba(0,0,0,0.85), 0 0 45px rgba(${rgb},0.3)`,
          }}
        >
          {/* Card Border Specular */}
          <span
            className="absolute inset-0 rounded-[22px] p-[1px] pointer-events-none opacity-80"
            style={{
              background: `conic-gradient(from 200deg, rgba(${rgb},0.9) 0deg, rgba(255,255,255,0.85) 50deg, rgba(${rgb},0.2) 140deg, rgba(${rgb},0.1) 250deg, rgba(${rgb},0.9) 360deg)`,
              WebkitMask:
                'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
              WebkitMaskComposite: 'xor',
              mask: 'linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0)',
            }}
          />

          {/* Light Glint */}
          <span
            className="absolute -top-[40%] -bottom-[40%] left-0 w-[26%] pointer-events-none animate-[arNGlint_4.6s_ease-in-out_both]"
            style={{
              background:
                'linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.18), rgba(255,255,255,0))',
            }}
          />

          <div className="relative flex flex-col gap-2.5 animate-[arNIn_4.6s_cubic-bezier(0.2,0.8,0.2,1)_both]">
            <div className="flex gap-3 items-center">
              {/* Left Metallic Badge */}
              <div
                className="shrink-0 w-11 h-11 rounded-[13px] p-[1.5px] shadow-lg"
                style={{
                  background:
                    'conic-gradient(from 180deg, #64748B 0%, #E2E8F0 25%, #475569 50%, #F8FAFC 75%, #64748B 100%)',
                }}
              >
                <div
                  className="w-full h-full rounded-[11.5px] flex flex-col items-center justify-center"
                  style={{
                    background: `radial-gradient(circle at 40% 25%, rgba(${rgb},0.4), #0A1018 75%)`,
                  }}
                >
                  <span className="text-[15px] font-light leading-none text-white tabular-nums tracking-tight">
                    {g}
                  </span>
                  <span className="text-[7px] text-slate-300 font-mono">
                    {gs}
                  </span>
                </div>
              </div>

              {/* Center Text */}
              <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                <div className="flex justify-between items-center gap-2">
                  <span
                    className="flex items-center gap-1.5 font-mono text-[9px] tracking-wider uppercase font-semibold"
                    style={{ color: accent }}
                  >
                    <span
                      className="w-1 h-1 rounded-full"
                      style={{
                        background: pale,
                        boxShadow: `0 0 6px rgba(${rgb}, 0.9)`,
                      }}
                    />
                    ARTRON · {tag}
                  </span>
                  <span className="text-[9px] text-slate-400">ახლა</span>
                </div>
                <span className="text-xs font-bold text-white tracking-tight leading-tight">
                  {t}
                </span>
                <span className="text-[10px] text-slate-300 truncate tabular-nums">
                  {s}
                </span>
              </div>
            </div>

            {/* Bottom Row */}
            <div className="flex justify-between items-center gap-2 pt-2 border-t border-slate-700/40 text-[9px] font-mono">
              <span className="text-slate-400 tracking-wider">{ml}</span>
              <span style={{ color: pale }}>{mr}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
