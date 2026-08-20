'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';
import { 
  QrCode, 
  Smartphone, 
  LayoutDashboard, 
  CheckCircle2, 
  Wifi, 
  ShieldCheck, 
  ArrowRight, 
  Clock, 
  Users, 
  CreditCard 
} from 'lucide-react';
import Link from 'next/link';

export const DualCoreShowcase: React.FC = () => {
  const { locale } = useLanguage();
  const [qrCodeVal, setQrCodeVal] = useState<string>('ART-88301-GCM');
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanSuccess, setScanSuccess] = useState<boolean>(false);

  // Auto-regenerate dynamic QR every 8 seconds for real-time demonstration
  useEffect(() => {
    const interval = setInterval(() => {
      const randomCode = 'ART-' + Math.floor(10000 + Math.random() * 90000) + '-GCM';
      setQrCodeVal(randomCode);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleSimulateScan = () => {
    if (isScanning) return;
    setIsScanning(true);
    setScanSuccess(false);
    setTimeout(() => {
      setIsScanning(false);
      setScanSuccess(true);
      setTimeout(() => setScanSuccess(false), 3500);
    }, 900);
  };

  return (
    <section id="dual-core" className="relative py-24 sm:py-32 bg-[#080B10] border-t border-white/[0.06] overflow-hidden studio-grain">
      {/* Background Studio Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-950/30 text-cyan-400 font-mono text-xs mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>DUAL-CORE ARCHITECTURE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            {locale === 'ka' 
              ? 'სინქრონული მართვა: ადმინი და ათლეტი' 
              : locale === 'ru' 
              ? 'Синхронное управление: Админ и Атлет' 
              : 'Synchronized Control: Admin & Athlete'}
          </h2>
          <p className="text-sm sm:text-base text-slate-400 font-light">
            {locale === 'ka'
              ? 'ერთიანი ეკოსისტემა, სადაც მობილური აპლიკაციის 1 კლიკი მყისიერად ასახულია B2B სამართავ პანელში და ტურნიკეტის კონტროლერში.'
              : locale === 'ru'
              ? 'Единая экосистема, где 1 клик в приложении мгновенно отображается в B2B панели и контроллере турникета.'
              : 'Unified ecosystem where an athlete 1-tap pass instantly relays to the B2B cloud and IoT barrier.'}
          </p>
        </div>

        {/* Dual-Core Split Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: B2B Enterprise Web Console (7 Cols) */}
          <div className="lg:col-span-7 rounded-3xl bg-[#0F141C] border border-white/[0.08] p-6 sm:p-8 relative overflow-hidden shadow-2xl">
            {/* Top Window Bar */}
            <div className="flex items-center justify-between pb-5 mb-6 border-b border-white/[0.06]">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="ml-2 font-mono text-xs text-slate-400 flex items-center gap-1.5">
                  <LayoutDashboard className="w-3.5 h-3.5 text-cyan-400" />
                  admin.artron.ge/live-telemetry
                </span>
              </div>
              <span className="font-mono text-[11px] text-emerald-400 bg-emerald-950/40 border border-emerald-500/20 px-2 py-0.5 rounded">
                ORDER №01-15/N COMPLIANT
              </span>
            </div>

            {/* Live Telemetry Feed Rows */}
            <div className="space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="text-white font-medium">David T. [TRAINER]</span>
                </div>
                <div className="flex items-center gap-4 text-slate-400">
                  <span>CHECK-IN 18:42:01</span>
                  <span className="text-emerald-400 font-semibold">PASS: GRANTED</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-cyan-400" />
                  <span className="text-white font-medium">Alex M. [MEMBER]</span>
                </div>
                <div className="flex items-center gap-4 text-slate-400">
                  <span>CHECK-IN 18:43:15</span>
                  <span className="text-cyan-400 font-semibold">TURNIKET_01</span>
                </div>
              </div>

              {/* Dynamic Scan Trigger Row */}
              {scanSuccess && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-between p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300"
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span className="font-semibold">Nino K. [MOBILE PASS]</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span>CODE: {qrCodeVal}</span>
                    <span className="text-xs bg-emerald-500/20 px-2 py-0.5 rounded font-bold">RELAY OPEN (5s)</span>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Quick Metrics Cards */}
            <div className="grid grid-cols-3 gap-3 mt-6 pt-6 border-t border-white/[0.06]">
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <span className="text-[10px] text-slate-500 block mb-1">აქტიური წევრები</span>
                <span className="text-lg font-bold text-white">1,248</span>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <span className="text-[10px] text-slate-500 block mb-1">დღიური ვიზიტი</span>
                <span className="text-lg font-bold text-cyan-400">384</span>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <span className="text-[10px] text-slate-500 block mb-1">Win-back ზრდა</span>
                <span className="text-lg font-bold text-emerald-400">+18%</span>
              </div>
            </div>
          </div>

          {/* Right: B2C Mobile Frame Simulator (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            {/* 3D Perspective Wrapper */}
            <div style={{ perspective: '1400px', perspectiveOrigin: '60% 50%' }} className="w-full flex justify-center">
              <div className="w-[280px] sm:w-[310px] rounded-[40px] bg-[#0A0D14] border-[4px] border-slate-700/60 p-4 relative shadow-[0_40px_80px_rgba(0,163,255,0.20),0_0_0_1px_rgba(0,163,255,0.10),0_20px_40px_rgba(0,0,0,0.6)] phone-tilt-3d">
              {/* Phone Speaker Notch */}
              <div className="w-20 h-4 bg-slate-800 rounded-full mx-auto mb-4" />

              {/* In-App Header */}
              <div className="flex items-center justify-between mb-4 px-1">
                <span className="text-xs font-bold text-white tracking-wider">ARTRON PASS</span>
                <Wifi className="w-3.5 h-3.5 text-cyan-400" />
              </div>

              {/* Dynamic QR Code Card */}
              <div className="p-4 rounded-2xl bg-gradient-to-b from-slate-900 to-black border border-cyan-500/30 text-center relative overflow-hidden">
                <div className="w-36 h-36 mx-auto bg-white p-2.5 rounded-xl mb-3 shadow-inner flex items-center justify-center">
                  <QrCode className="w-full h-full text-slate-900" />
                </div>
                <span className="font-mono text-[11px] text-cyan-400 tracking-wider block font-semibold">
                  {qrCodeVal}
                </span>
                <span className="text-[10px] text-slate-500 block mt-1">
                  ავტომატური განახლება 8 წამში
                </span>
              </div>

              {/* Trigger Interactive Pass Action */}
              <button
                onClick={handleSimulateScan}
                disabled={isScanning}
                className="w-full mt-4 py-3 rounded-xl bg-gradient-to-r from-[#0066FF] to-[#00D2FF] text-white font-bold text-xs shadow-lg hover:shadow-cyan-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                {isScanning ? (
                  <span className="animate-pulse">სკანირება მიმდინარეობს...</span>
                ) : scanSuccess ? (
                  <span className="text-white flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-300" /> კარი გაიღო!
                  </span>
                ) : (
                  <span>გამოსცადეთ QR საშვი (Simulate)</span>
                )}
              </button>
            </div>
            </div> {/* end perspective wrapper */}
          </div>

        </div>
      </div>
    </section>
  );
};
