'use client';

import React from 'react';
import { ShieldCheck, Download } from 'lucide-react';
import { DualCoreSyncState } from './types';

interface B2BConsoleCardProps {
  state: DualCoreSyncState;
  onOpenLaborModal: () => void;
}

export const B2BConsoleCard: React.FC<B2BConsoleCardProps> = ({ state, onOpenLaborModal }) => {
  const isFresh = state.phase === 'synced';
  const occPct = `${Math.round((state.inGym / state.capacityMax) * 100)}%`;

  // 24 Segments for LED Bar Gauges
  const renderSegments = (val: number, max: number, isRev = false) => {
    const total = 24;
    const litCount = Math.min(total, Math.round((val / max) * total));
    return Array.from({ length: total }, (_, i) => {
      const isLit = i < litCount;
      const isExtra = isFresh && i === litCount - 1;
      return (
        <span
          key={i}
          className="h-1.5 rounded-[1px] transition-all duration-300"
          style={{
            background: isExtra ? '#10B981' : isLit ? (isRev ? '#E0F2FE' : '#38BDF8') : '#111721',
            boxShadow: isExtra
              ? '0 0 8px rgba(16,185,129,0.9)'
              : isLit
              ? '0 0 4px rgba(224,242,254,0.3)'
              : 'none',
          }}
        />
      );
    });
  };

  const dspText = state.revOn
    ? 'AUTO-DISPATCH: TRANSMITTING -> ATHLETE_ID: 4471'
    : state.dispatch
    ? `AUTO-DISPATCH: SENT -> ATHLETE_ID: 4471 (ACK: ${state.ackMs}ms)`
    : 'AUTO-DISPATCH: STANDBY';

  return (
    <div
      className="flex-1 max-w-[560px] relative preserve-3d"
      style={{
        transformStyle: 'preserve-3d',
        transform: 'rotateY(7deg) translateZ(-24px)',
      }}
    >
      {/* Station Tag */}
      <div className="absolute left-1.5 -top-11 flex items-center gap-2.5 text-[10.5px] tracking-[0.18em] text-slate-400 whitespace-nowrap">
        <span
          className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold bg-[#05080C] border transition-all duration-400"
          style={{
            borderColor: isFresh ? '#10B981' : 'rgba(224,242,254,0.3)',
            color: isFresh ? '#10B981' : '#94A3B8',
            boxShadow: isFresh ? '0 0 14px -2px #10B981, inset 0 2px 4px rgba(0,0,0,0.9)' : 'inset 0 2px 4px rgba(0,0,0,0.9)',
          }}
        >
          03
        </span>
        <span className="font-sans font-medium text-slate-300">B2B · ბიზნესის პანელი</span>
      </div>

      {/* 3D Depth Shadow Backplates from Claude Spec */}
      <div
        className="absolute inset-0 rounded-[20px] bg-[#030406] pointer-events-none"
        style={{ transform: 'translateZ(-24px)', boxShadow: '0 60px 120px -20px rgba(0,0,0,1)' }}
      />
      <div
        className="absolute inset-0 rounded-[20px] bg-[#080B11] border border-sky-100/10 pointer-events-none"
        style={{ transform: 'translateZ(-16px)' }}
      />
      <div
        className="absolute inset-0 rounded-[20px] bg-[#0A0E15] border border-sky-100/[0.14] pointer-events-none"
        style={{ transform: 'translateZ(-8px)' }}
      />

      {/* 3D Window Frame with Top-Left Ambient Shine */}
      <div
        className="relative rounded-[20px] bg-[#0B1017] border border-sky-100/12 p-2 transition-shadow duration-500"
        style={{
          boxShadow: isFresh
            ? '0 0 45px rgba(16,185,129,0.35), 0 30px 60px -15px rgba(0,0,0,0.9)'
            : '0 30px 60px -15px rgba(0,0,0,0.9)',
        }}
      >
        <div
          className="absolute inset-0 rounded-[20px] pointer-events-none"
          style={{
            background:
              'linear-gradient(135deg, rgba(224,242,254,0.12) 0%, rgba(224,242,254,0.02) 22%, transparent 40%), linear-gradient(0deg, rgba(217,119,6,0.1) 0%, transparent 18%)',
          }}
        />

        {/* Egress Dispatch Connector Node on right border */}
        <div
          className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 w-3 h-18 rounded-md bg-gradient-to-l from-[#05080C] via-[#1B2330] to-[#3A4658] border border-sky-100/15 flex-col items-center py-2 z-10 shadow-[inset_0_2px_4px_rgba(0,0,0,0.95),0_6px_12px_rgba(0,0,0,0.8)]"
          title="Egress Dispatch Node"
        >
          <span
            className="w-1.5 h-1.5 rounded-full transition-all duration-300"
            style={{
              background: state.pktOn ? '#F59E0B' : '#94A3B8',
              boxShadow: state.pktOn ? '0 0 8px #F59E0B, 0 0 16px rgba(245,158,11,0.5)' : 'none',
            }}
          />
          <span className="flex-1 w-px my-1 bg-gradient-to-b from-amber-500/30 to-sky-400/30" />
          <span
            className="w-1.5 h-1.5 rounded-full transition-all duration-300"
            style={{
              background: state.revOn ? '#38BDF8' : '#1E293B',
              boxShadow: state.revOn ? '0 0 8px #38BDF8, 0 0 16px rgba(56,189,248,0.5)' : 'none',
            }}
          />
        </div>

        {/* Inner Window Box */}
        <div className="rounded-[14px] bg-[#0B1018] p-4 sm:p-5 flex flex-col gap-4 font-mono shadow-[inset_0_2px_6px_rgba(0,0,0,0.8),inset_0_0_0_1px_rgba(0,0,0,0.6)]">
          {/* OS Window Bar with Sleek Dark Metallic Controls */}
          <div className="flex items-center gap-3 text-[10.5px] text-slate-400">
            <div className="flex gap-2">
              <span
                className="w-2.5 h-2.5 sm:w-[11px] sm:h-[11px] rounded-full border transition-all duration-300"
                style={{
                  background: 'radial-gradient(circle at 35% 35%, #3A4454 0%, #202732 60%, #0F141C 100%)',
                  borderColor: 'rgba(255, 255, 255, 0.08)',
                  boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.22), inset 0 -1.5px 2px rgba(0,0,0,0.85), 0 2px 4px rgba(0,0,0,0.6)',
                }}
              />
              <span
                className="w-2.5 h-2.5 sm:w-[11px] sm:h-[11px] rounded-full border transition-all duration-300"
                style={{
                  background: 'radial-gradient(circle at 35% 35%, #3A4454 0%, #202732 60%, #0F141C 100%)',
                  borderColor: 'rgba(255, 255, 255, 0.08)',
                  boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.22), inset 0 -1.5px 2px rgba(0,0,0,0.85), 0 2px 4px rgba(0,0,0,0.6)',
                }}
              />
              <span
                className="w-2.5 h-2.5 sm:w-[11px] sm:h-[11px] rounded-full border transition-all duration-300"
                style={{
                  background: 'radial-gradient(circle at 35% 35%, #3A4454 0%, #202732 60%, #0F141C 100%)',
                  borderColor: 'rgba(255, 255, 255, 0.08)',
                  boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.22), inset 0 -1.5px 2px rgba(0,0,0,0.85), 0 2px 4px rgba(0,0,0,0.6)',
                }}
              />
            </div>
            <div className="flex-1 px-3 py-1.5 rounded-md bg-[#05080C] shadow-[inset_0_2px_6px_rgba(0,0,0,0.8)] border-b border-sky-100/10 text-slate-300 text-[11px] truncate tracking-wide">
              admin.artron.ge/ops
            </div>
            <div className="flex items-center gap-1.5 text-emerald-400 text-[11px] whitespace-nowrap font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] shadow-[0_0_8px_#10B981] animate-pulse" />
              <span>WS · 24ms</span>
            </div>
          </div>

          {/* Section Title */}
          <div className="flex justify-between items-baseline gap-2 flex-wrap">
            <div className="font-sans text-base sm:text-lg font-bold text-sky-100 tracking-tight">ოპერაციული მართვა</div>
            <div className="text-[10px] text-slate-400 tracking-[0.16em]">
              NODE B2B · {state.phase === 'transit' ? 'GATE OPEN' : 'QUEUE 0'}
            </div>
          </div>

          {/* 2x Metric Cards with 24 Segments */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Revenue Box */}
            <div className="relative overflow-hidden rounded-xl p-3.5 bg-[#05080C] border border-white/5 flex flex-col gap-2.5 shadow-[inset_0_2px_10px_rgba(0,0,0,0.7)]">
              {/* Shockwave on commit */}
              {state.waveId > 0 && (
                <div
                  key={`w-${state.waveId}`}
                  className="absolute inset-0 pointer-events-none border-2 border-emerald-400/80 rounded-xl animate-[shock_1100ms_cubic-bezier(0.2,0.7,0.3,1)_forwards]"
                />
              )}

              <div className="flex justify-between text-[10px] text-slate-400 tracking-wider">
                <span>სალარო · დღეს</span>
                <span
                  className="text-emerald-400 font-bold transition-all duration-400"
                  style={{
                    opacity: isFresh ? 1 : 0.85,
                    textShadow: '0 0 12px rgba(16,185,129,0.7)',
                  }}
                >
                  +50 ₾
                </span>
              </div>
              <div
                className="text-3xl sm:text-4xl font-normal tabular-nums leading-none tracking-tight transition-all duration-500"
                style={{
                  color: isFresh ? '#10B981' : '#E0F2FE',
                  textShadow: isFresh
                    ? '0 0 22px rgba(16,185,129,0.55), 0 1px 0 rgba(224,242,254,0.15)'
                    : '0 1px 0 rgba(224,242,254,0.14)',
                }}
              >
                {state.shownRev.toLocaleString('en-US')} ₾
              </div>
              <div className="grid grid-cols-24 gap-0.5">
                {renderSegments(state.shownRev, state.revenueTarget, true)}
              </div>
              <div className="text-[9.5px] text-slate-500 tracking-wider">TARGET 3,000 ₾</div>
            </div>

            {/* Visitors Box */}
            <div className="rounded-xl p-3.5 bg-[#05080C] border border-white/5 flex flex-col gap-2.5 shadow-[inset_0_2px_10px_rgba(0,0,0,0.7)]">
              <div className="flex justify-between text-[10px] text-slate-400 tracking-wider">
                <span>ვიზიტორები</span>
                <span className="text-emerald-400 font-bold" style={{ textShadow: '0 0 8px rgba(16,185,129,0.6)' }}>
                  LIVE
                </span>
              </div>
              <div className="text-3xl sm:text-4xl font-normal tabular-nums leading-none tracking-tight text-white" style={{ textShadow: '0 1px 0 rgba(224,242,254,0.14)' }}>
                {state.inGym} <span className="text-slate-400 text-lg font-light tracking-wide">/ {state.capacityMax}</span>
              </div>
              <div className="grid grid-cols-24 gap-0.5">
                {renderSegments(state.inGym, state.capacityMax, false)}
              </div>
              <div className="text-[9.5px] text-slate-500 tracking-wider">CAPACITY {occPct}</div>
            </div>
          </div>

          {/* Labor Inspection Official Banner with Modal Trigger */}
          <div className="flex items-center justify-between gap-2.5 rounded-xl px-3.5 py-2.5 bg-[#0C131D] border border-emerald-500/25 text-[11px] text-slate-300 font-sans shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)]">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] shadow-[0_0_12px_rgba(16,185,129,0.75)]" />
              <span className="text-[#CBD5E1] text-[11.5px]">შრომის ინსპექცია (№01-15/ნ) · ავტომატური ტაბელი დაცულია</span>
            </div>
            <button
              onClick={onOpenLaborModal}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/35 text-[10px] font-mono font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-[0_0_10px_rgba(16,185,129,0.15)] hover:shadow-[0_0_15px_rgba(16,185,129,0.3)]"
              title="ბრძანება №01-15/ნ შრომის დროის ელექტრონული აღრიცხვა"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>ტაბელი</span>
              <Download className="w-3 h-3 opacity-70" />
            </button>
          </div>

          {/* Activity Ledger Feed */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between text-[10px] text-slate-400 tracking-[0.16em]">
              <span>ACTIVITY LEDGER</span>
              <span>{state.logs.length} ROWS</span>
            </div>
            <div
              className="flex items-center gap-2 text-[9.5px] tracking-wider truncate transition-colors duration-400"
              style={{ color: state.revOn ? '#38BDF8' : '#94A3B8' }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                style={{
                  background: state.revOn ? '#38BDF8' : state.dispatch ? '#10B981' : '#64748B',
                  boxShadow: state.revOn ? '0 0 8px #38BDF8' : state.dispatch ? '0 0 8px #10B981' : 'none',
                }}
              />
              <span className="truncate">{dspText}</span>
            </div>

            <div className="flex flex-col gap-1.5 min-h-[170px]">
              {state.logs.map((log) => (
                <div
                  key={log.id}
                  className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-0.5 p-2 rounded-lg text-[11px] leading-snug border transition-all duration-500"
                  style={{
                    background: log.isFresh ? 'rgba(16,185,129,0.08)' : '#05080C',
                    borderColor: log.isFresh ? 'rgba(16,185,129,0.55)' : 'rgba(255,255,255,0.04)',
                    boxShadow: log.isFresh ? '0 0 20px rgba(16,185,129,0.25)' : 'none',
                  }}
                >
                  <span className="text-slate-400 tabular-nums">{log.t}</span>
                  <span className="text-sky-100 font-medium">
                    {log.name} · {log.court}
                  </span>
                  <span />
                  <span className="text-slate-400 text-[10px]">
                    გადახდილია: <span className="text-emerald-400 font-bold">{log.amount}</span> · დაშვება:{' '}
                    <span className="text-emerald-400 font-medium">{log.status}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
