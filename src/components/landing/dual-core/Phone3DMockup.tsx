'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  QrCode,
  Wifi,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Smartphone,
  Sparkles,
  Download,
  Flame,
} from 'lucide-react';
import { TiltCard } from './TiltCard';

interface Phone3DMockupProps {
  qrCodeVal: string;
  isScanning: boolean;
  scanSuccess: boolean;
  onSimulateScan: () => void;
  locale: string;
}

export const Phone3DMockup: React.FC<Phone3DMockupProps> = ({
  qrCodeVal,
  isScanning,
  scanSuccess,
  onSimulateScan,
  locale,
}) => {
  const [activeScreenTab, setActiveScreenTab] = useState<'download' | 'pass'>('download');
  const [copiedLink, setCopiedLink] = useState(false);

  const handleCopyLink = () => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard?.writeText?.('https://artron.ge');
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <div className="relative flex flex-col items-center select-none">
      {/* Ambient background aura */}
      <div className="absolute -inset-4 bg-gradient-to-tr from-[#0066FF]/25 via-[#00A3FF]/15 to-[#00ff87]/15 rounded-[60px] blur-2xl opacity-60 pointer-events-none" />

      {/* 3D Tilt Wrapper with Realistic Smartphone Proportions (~19.5:9 ratio) */}
      <TiltCard className="w-[285px] sm:w-[295px]" maxDeg={12}>
        {/* Physical Smartphone Chassis (Titanium Frame & Edge Buttons) */}
        <div className="relative rounded-[50px] p-[9px] bg-gradient-to-b from-[#2A3441] via-[#151D28] to-[#0A0E17] shadow-[0_30px_90px_rgba(0,163,255,0.35),0_0_0_1px_rgba(255,255,255,0.18),inset_0_1px_2px_rgba(255,255,255,0.4)]">
          {/* Left Physical Buttons (Action + Volume) */}
          <div className="absolute -left-[5px] top-[90px] w-[5px] h-5 bg-gradient-to-r from-slate-600 to-slate-800 rounded-l-sm" />
          <div className="absolute -left-[5px] top-[125px] w-[5px] h-9 bg-gradient-to-r from-slate-600 to-slate-800 rounded-l-sm" />
          <div className="absolute -left-[5px] top-[170px] w-[5px] h-9 bg-gradient-to-r from-slate-600 to-slate-800 rounded-l-sm" />

          {/* Right Physical Power Button */}
          <div className="absolute -right-[5px] top-[135px] w-[5px] h-12 bg-gradient-to-l from-slate-600 to-slate-800 rounded-r-sm" />

          {/* Inner Display Bezel */}
          <div className="relative rounded-[42px] bg-[#07090F] overflow-hidden border border-white/[0.08] p-3.5 flex flex-col justify-between min-h-[580px] shadow-[inset_0_0_24px_rgba(0,0,0,0.9)]">
            
            {/* Realistic Glass Reflection Sheen */}
            <div className="absolute -top-[120%] -left-[100%] w-[300%] h-[300%] bg-gradient-to-br from-white/[0.08] via-transparent to-transparent rotate-[32deg] pointer-events-none z-30" />

            {/* Dynamic Island / Notch */}
            <div className="relative z-20 w-24 h-4 bg-[#000000] rounded-full mx-auto mb-1.5 flex items-center justify-between px-2 shadow-md border border-white/[0.05]">
              <div className="w-2 h-2 rounded-full bg-[#050B14] border border-cyan-500/30 flex items-center justify-center">
                <div className="w-0.5 h-0.5 rounded-full bg-[#00A3FF] opacity-80" />
              </div>
              <div className="w-1 h-1 rounded-full bg-slate-900 border border-slate-700" />
            </div>

            {/* Phone Status Bar */}
            <div className="relative z-20 flex items-center justify-between px-2 mb-2 text-[10px] font-mono text-slate-400">
              <span className="font-bold text-white tracking-wider">ARTRON 5G</span>
              <div className="flex items-center gap-1.5">
                <Wifi className="w-3 h-3 text-[#00A3FF]" />
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                <span className="text-[9px] text-slate-300 font-sans font-bold">100%</span>
              </div>
            </div>

            {/* In-Phone Screen Navigation Switcher */}
            <div className="relative z-20 grid grid-cols-2 p-1 rounded-xl bg-white/[0.05] border border-white/[0.08] mb-2.5">
              <button
                type="button"
                onClick={() => setActiveScreenTab('download')}
                className={`py-1 text-[10px] font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeScreenTab === 'download'
                    ? 'bg-[#00A3FF] text-white shadow-[0_0_12px_rgba(0,163,255,0.5)]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Download className="w-3 h-3" />
                <span>{locale === 'ka' ? 'ჩამოტვირთვა' : locale === 'ru' ? 'Скачать' : 'Download'}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveScreenTab('pass')}
                className={`py-1 text-[10px] font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeScreenTab === 'pass'
                    ? 'bg-gradient-to-r from-[#0066FF] to-[#00D2FF] text-white shadow-[0_0_12px_rgba(0,102,255,0.5)]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <QrCode className="w-3 h-3" />
                <span>{locale === 'ka' ? 'QR საშვი' : locale === 'ru' ? 'QR Пропуск' : 'Artron Pass'}</span>
              </button>
            </div>

            {/* Main Interactive Screen Content */}
            <div className="relative z-20 flex-1 flex flex-col justify-between">
              <AnimatePresence mode="wait">
                {/* ── TAB 1: App Download QR Mode ── */}
                {activeScreenTab === 'download' ? (
                  <motion.div
                    key="tab-download"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-2.5"
                  >
                    {/* QR Code Container Card */}
                    <div className="relative p-3.5 rounded-2xl bg-gradient-to-br from-[#0B1424] via-[#0D1829] to-[#08101E] border border-cyan-500/30 shadow-[0_8px_30px_rgba(0,163,255,0.2)] text-center overflow-hidden">
                      {/* Top status */}
                      <div className="flex items-center justify-between text-[9px] font-mono text-cyan-400 mb-1.5">
                        <span className="flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-[#00ff87]" />
                          <span>OFFICIAL APP</span>
                        </span>
                        <span className="bg-cyan-950/80 px-2 py-0.5 rounded-full border border-cyan-500/30 text-[8px] font-bold text-[#00ff87]">
                          v2.4 LIVE
                        </span>
                      </div>

                      {/* The QR Code with corner brackets & scanning laser */}
                      <div className="relative w-32 h-32 mx-auto bg-white rounded-xl p-2 flex items-center justify-center shadow-[0_12px_32px_rgba(0,0,0,0.8)] overflow-hidden group">
                        {/* QR Code Icon / Vector pattern */}
                        <div className="relative w-full h-full">
                          <QrCode className="w-full h-full text-[#080B10]" />
                          
                          {/* Artron Logo Center Emblem inside QR */}
                          <div className="absolute inset-0 m-auto w-7 h-7 rounded-lg bg-[#080B10] border border-[#00A3FF] flex items-center justify-center shadow-lg">
                            <span className="text-[7px] font-black tracking-tighter text-[#00A3FF]">AR</span>
                          </div>

                          {/* Dynamic Laser Scanning Beam */}
                          <motion.div
                            className="absolute left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#00A3FF] to-transparent shadow-[0_0_12px_#00A3FF]"
                            animate={{ top: ['4%', '92%', '4%'] }}
                            transition={{ duration: 2.4, repeat: Infinity, ease: 'linear' }}
                          />
                        </div>

                        {/* Scanner Corner Accents */}
                        <div className="absolute top-1 left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-[#00A3FF]" />
                        <div className="absolute top-1 right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-[#00A3FF]" />
                        <div className="absolute bottom-1 left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-[#00A3FF]" />
                        <div className="absolute bottom-1 right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-[#00A3FF]" />
                      </div>

                      {/* Instructions */}
                      <div className="mt-3">
                        <div className="text-[11px] font-bold text-white flex items-center justify-center gap-1.5">
                          <Smartphone className="w-3.5 h-3.5 text-[#00ff87]" />
                          <span>
                            {locale === 'ka'
                              ? 'დაასკანერეთ კამერით'
                              : locale === 'ru'
                              ? 'Сканируйте камерой'
                              : 'Scan with Camera'}
                          </span>
                        </div>
                        <p className="text-[9px] text-slate-400 mt-1 leading-tight">
                          {locale === 'ka'
                            ? 'პირდაპირი გადმოწერა iOS & Android-ზე'
                            : locale === 'ru'
                            ? 'Прямая загрузка на iOS и Android'
                            : 'Direct download on iOS & Android'}
                        </p>
                      </div>
                    </div>

                    {/* Fast info chip */}
                    <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between text-[10px]">
                      <span className="text-slate-400 font-mono">iOS 16+ · Android 12+</span>
                      <button
                        type="button"
                        onClick={handleCopyLink}
                        className="text-[#00A3FF] hover:text-[#00ff87] font-bold font-mono text-[9px] underline cursor-pointer transition-colors"
                      >
                        {copiedLink ? (locale === 'ka' ? 'დაკოპირდა!' : 'Copied!') : (locale === 'ka' ? 'ბმულის კოპირება' : 'Copy link')}
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  /* ── TAB 2: Artron Pass Simulator Mode ── */
                  <motion.div
                    key="tab-pass"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-3"
                  >
                    {/* Digital Pass Card */}
                    <div className="relative rounded-2xl bg-gradient-to-br from-[#0066FF] via-[#0044CC] to-[#001A80] p-4 text-white shadow-[0_12px_36px_rgba(0,102,255,0.4)] overflow-hidden">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-black tracking-widest uppercase">ARTRON PASS</span>
                        <div className="flex items-center gap-1 text-[9px] text-cyan-200">
                          <Flame className="w-3 h-3 text-[#00ff87]" />
                          <span>PRO</span>
                        </div>
                      </div>

                      {/* Pass QR */}
                      <div className="w-28 h-28 bg-white rounded-xl mx-auto p-2 flex items-center justify-center relative overflow-hidden shadow-inner my-1">
                        <QrCode className="w-full h-full text-[#001A80]" />
                        <motion.div
                          className="absolute left-0 right-0 h-[2px] bg-[#00A3FF]"
                          animate={{ top: ['8%', '88%', '8%'] }}
                          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                        />
                      </div>

                      <div className="text-center mt-2 font-mono text-[10px] tracking-wider text-cyan-200">
                        {qrCodeVal}
                      </div>
                      <div className="text-center text-[8px] text-white/60">
                        {locale === 'ka' ? 'ავტომატური განახლება 8 წმ' : 'Auto-refresh in 8s'}
                      </div>

                      <div className="mt-2 pt-2 border-t border-white/20 flex justify-between text-[10px]">
                        <span>Nino K.</span>
                        <span className="font-bold text-[#00ff87]">ACTIVE</span>
                      </div>
                    </div>

                    {/* Turnstile Telemetry Status */}
                    <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-white/[0.04] border border-cyan-500/15 text-[11px]">
                      <div className="flex items-center gap-2">
                        <Zap className="w-3.5 h-3.5 text-cyan-400" />
                        <span className="text-slate-300 font-mono">TURNIKET_01</span>
                      </div>
                      <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse inline-block" />
                        READY
                      </span>
                    </div>

                    {/* Interactive Scan Simulation Trigger */}
                    <button
                      type="button"
                      onClick={onSimulateScan}
                      disabled={isScanning}
                      className="relative w-full py-2.5 rounded-xl font-bold text-xs text-white overflow-hidden group transition-all duration-300 cursor-pointer disabled:opacity-60 min-h-[44px]"
                      style={{ background: 'linear-gradient(135deg, #0066FF, #00D2FF)' }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                      <span className="relative flex items-center justify-center gap-2">
                        {isScanning ? (
                          <>
                            <motion.div
                              className="w-3.5 h-3.5 rounded-full border-2 border-white/40 border-t-white"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                            />
                            {locale === 'ka' ? 'სკანირება...' : 'Scanning...'}
                          </>
                        ) : scanSuccess ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                            {locale === 'ka' ? 'კარი გაიღო!' : 'Gate Opened!'}
                          </>
                        ) : (
                          <>
                            <QrCode className="w-3.5 h-3.5" />
                            {locale === 'ka' ? 'საშვის გამოცდა' : 'Test Gate Unlock'}
                          </>
                        )}
                      </span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Bottom Home Indicator Bar */}
            <div className="relative z-20 mt-3 pt-2">
              <div className="w-24 h-1 bg-slate-700/80 rounded-full mx-auto" />
            </div>
          </div>
        </div>
      </TiltCard>
    </div>
  );
};
