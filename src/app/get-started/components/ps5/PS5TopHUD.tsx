'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ps5Audio } from '../../core/ps5SoundEngine';
import { Volume2, VolumeX, Home, ArrowLeft, ShieldCheck, Wifi } from 'lucide-react';

interface PS5TopHUDProps {
  currentStep: number;
  totalSteps?: number;
  onBack?: () => void;
  activeMode: 'REGISTER' | 'DEMO';
}

const STEP_LABELS = ['ობიექტის იდენტობა', 'ტექნიკური მასშტაბი', 'ადმინისტრატორი'];

export const PS5TopHUD: React.FC<PS5TopHUDProps> = ({
  currentStep,
  totalSteps = 3,
  onBack,
  activeMode,
}) => {
  const [time, setTime] = useState<string>('');
  const [isMuted, setIsMuted] = useState<boolean>(false);

  useEffect(() => {
    const updateTime = () => {
      const d = new Date();
      setTime(
        d.toLocaleTimeString('ka-GE', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleToggleSound = () => {
    const muted = ps5Audio.toggleMute();
    setIsMuted(muted);
  };

  return (
    <header className="w-full h-16 sm:h-20 px-4 sm:px-8 border-b border-white/[0.08] bg-[#070B14]/80 backdrop-blur-2xl flex items-center justify-between z-30 sticky top-0">
      {/* Left: Console Logo & System Version */}
      <div className="flex items-center gap-4">
        {onBack && (
          <button
            type="button"
            onClick={() => {
              ps5Audio.playBack();
              onBack();
            }}
            className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/10 hover:border-[#00A3FF]/50 hover:bg-[#00A3FF]/10 text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer group"
            title="უკან დაბრუნება (Esc)"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
          </button>
        )}

        <Link
          href="/"
          onClick={() => ps5Audio.playSelect()}
          className="flex items-center gap-3 group"
        >
          {/* Dual-Node Glowing Symbol */}
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#00A3FF]/20 to-[#0055FF]/10 border border-[#00A3FF]/40 flex items-center justify-center relative shadow-[0_0_20px_rgba(0,163,255,0.3)]">
            <div className="w-3.5 h-3.5 rounded-sm bg-[#00A3FF] rotate-45 flex items-center justify-center shadow-[0_0_8px_#00E5FF]">
              <div className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
            </div>
            {/* Ambient PS5 Glyphs */}
            <span className="absolute -top-1 -right-1 text-[8px] text-[#00E5FF] font-mono opacity-80">▲</span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-black tracking-widest text-white uppercase font-mono">
                ARTRON
              </span>
              <span className="text-[9px] px-1.5 py-0.5 rounded-md bg-[#00A3FF]/15 border border-[#00A3FF]/30 text-[#00E5FF] font-mono font-bold tracking-wider">
                PS5 CORE
              </span>
            </div>
            <div className="text-[10px] text-slate-400 font-mono flex items-center gap-1.5">
              <Wifi className="w-3 h-3 text-emerald-400" />
              <span>EDGE NET // LOW LATENCY</span>
            </div>
          </div>
        </Link>
      </div>

      {/* Center: PS5 Cinematic Step Tracker */}
      <div className="hidden md:flex items-center gap-3 px-5 py-2 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-md">
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map((stepNum) => {
          const isActive = currentStep === stepNum;
          const isDone = currentStep > stepNum;
          const label = STEP_LABELS[stepNum - 1] || `ნაბიჯი ${stepNum}`;

          return (
            <div key={stepNum} className="flex items-center gap-2.5">
              <div
                className={`flex items-center gap-2 px-3 py-1 rounded-xl transition-all duration-300 ${
                  isActive
                    ? 'bg-[#00A3FF]/20 border border-[#00A3FF] text-white shadow-[0_0_15px_rgba(0,163,255,0.4)]'
                    : isDone
                    ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
                    : 'text-slate-400 border border-transparent'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-lg flex items-center justify-center text-[10px] font-bold font-mono ${
                    isActive
                      ? 'bg-[#00A3FF] text-black shadow-[0_0_8px_#00E5FF]'
                      : isDone
                      ? 'bg-emerald-500/20 text-emerald-300'
                      : 'bg-white/5 text-slate-400'
                  }`}
                >
                  {isDone ? '✓' : stepNum}
                </div>
                <span className="text-xs font-semibold tracking-wide">{label}</span>
              </div>

              {stepNum < totalSteps && (
                <div
                  className={`w-4 h-[1.5px] transition-all duration-300 ${
                    isDone ? 'bg-emerald-500/50' : 'bg-white/10'
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Right: Audio FX Toggle, Time, Mode */}
      <div className="flex items-center gap-3">
        {/* Sound Toggle */}
        <button
          type="button"
          onClick={handleToggleSound}
          className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
            isMuted
              ? 'bg-white/[0.02] border-white/10 text-slate-400 hover:text-slate-200'
              : 'bg-[#00A3FF]/15 border-[#00A3FF]/40 text-[#00E5FF] shadow-[0_0_12px_rgba(0,163,255,0.25)]'
          }`}
          title={isMuted ? 'ხმის ჩართვა (Web Audio)' : 'ხმის გათიშვა'}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>

        {/* Real-Time Digital Clock */}
        <div className="hidden sm:flex flex-col items-end">
          <span className="text-xs font-mono font-bold text-slate-200 tracking-wider">
            {time || '00:00:00'}
          </span>
          <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest flex items-center gap-1">
            <ShieldCheck className="w-2.5 h-2.5 text-emerald-400" />
            AES-256 GCM
          </span>
        </div>

        {/* Home Navigation */}
        <Link
          href="/"
          onClick={() => ps5Audio.playSelect()}
          className="px-3 py-1.5 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] hover:border-white/20 text-xs font-medium text-slate-300 hover:text-white flex items-center gap-1.5 transition-all cursor-pointer"
        >
          <Home className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">მთავარი</span>
        </Link>
      </div>
    </header>
  );
};
