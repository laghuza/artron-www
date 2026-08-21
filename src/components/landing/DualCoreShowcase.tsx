'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';
import {
  QrCode,
  LayoutDashboard,
  CheckCircle2,
  Wifi,
  ShieldCheck,
  ArrowRight,
  TrendingUp,
  Users,
  CreditCard,
  Zap,
  Activity,
  Download,
} from 'lucide-react';
import Link from 'next/link';
import { LaborComplianceModal } from './LaborComplianceModal';
import { WalletCard } from './dual-core/WalletCard';
import { TiltCard } from './dual-core/TiltCard';
import { SparkLine } from './dual-core/SparkLine';

const LiveCounter: React.FC<{ target: number; prefix?: string; suffix?: string; color: string }> = ({
  target,
  prefix = '',
  suffix = '',
  color,
}) => {
  const [val, setVal] = useState(Math.floor(target * 0.82));
  useEffect(() => {
    const step = Math.ceil((target - val) / 20);
    if (val >= target) return;
    const t = setTimeout(() => setVal((v) => Math.min(v + step, target)), 60);
    return () => clearTimeout(t);
  }, [val, target]);
  return (
    <span className="font-bold text-xl tabular-nums" style={{ color }}>
      {prefix}
      {val.toLocaleString()}
      {suffix}
    </span>
  );
};

const MiniBarChart: React.FC = () => {
  const days = ['ო', 'ხ', 'პ', 'შ', 'კ', 'კვ', 'კვ'];
  const base = [42, 58, 51, 73, 65, 89, 72];
  return (
    <div className="flex items-end gap-1.5 h-10">
      {days.map((d, i) => (
        <div key={i} className="flex flex-col items-center gap-1 flex-1">
          <motion.div
            className="w-full rounded-sm"
            style={{ background: i === 5 ? '#00A3FF' : 'rgba(0,163,255,0.25)' }}
            initial={{ height: 0 }}
            animate={{ height: `${(base[i] / 89) * 36}px` }}
            transition={{ delay: i * 0.07 + 0.3, duration: 0.5, ease: 'easeOut' }}
          />
          <span className="text-[8px] text-slate-600">{d}</span>
        </div>
      ))}
    </div>
  );
};

export const DualCoreShowcase: React.FC = () => {
  const { locale } = useLanguage();
  const [qrCodeVal, setQrCodeVal] = useState<string>('ART-88301-GCM');
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanSuccess, setScanSuccess] = useState<boolean>(false);
  const [isLaborModalOpen, setIsLaborModalOpen] = useState<boolean>(false);
  const [sparkData] = useState<number[]>([28, 42, 35, 58, 51, 66, 72, 63, 78, 84, 71, 89]);

  useEffect(() => {
    const interval = setInterval(() => {
      setQrCodeVal('ART-' + Math.floor(10000 + Math.random() * 90000) + '-GCM');
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

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  } as const;
  const itemVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: 'easeOut' } },
  } as const;

  return (
    <section
      id="dual-core"
      className="relative pt-12 sm:pt-16 pb-24 sm:pb-32 bg-[#080B10] border-t border-white/[0.06] overflow-hidden studio-grain"
    >
      {/* Ambient glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#00A3FF]/[0.07] rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[300px] bg-[#0066FF]/[0.05] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[300px] h-[200px] bg-purple-600/[0.04] rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        {/* Section header */}
        <motion.div variants={itemVariants} className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-950/30 text-cyan-400 font-mono text-[11px] mb-5 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>DUAL-CORE ARCHITECTURE · LIVE SYNC</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4 leading-tight">
            {locale === 'ka'
              ? 'სინქრონული მართვა: ადმინი და ათლეტი'
              : locale === 'ru'
              ? 'Синхронное управление: Админ и Атлет'
              : 'Synchronized Control: Admin & Athlete'}
          </h2>
          <p className="text-sm sm:text-base text-slate-400 font-light leading-relaxed max-w-2xl mx-auto">
            {locale === 'ka'
              ? 'ერთიანი ეკოსისტემა, სადაც მობილური 1-კლიკი მყისიერად ასახულია B2B სამართავ პანელში და IoT ტურნიკეტის კონტროლერში.'
              : locale === 'ru'
              ? 'Единая экосистема, где 1 клик в приложении мгновенно отображается в B2B панели и контроллере турникета.'
              : 'Unified ecosystem where an athlete 1-tap pass instantly syncs to the B2B cloud and IoT barrier.'}
          </p>
        </motion.div>

        {/* Dual-Core Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* ── Left: B2B Web Console ── */}
          <motion.div variants={itemVariants} className="lg:col-span-7">
            <TiltCard className="rounded-3xl" maxDeg={5}>
              <div className="relative bg-[#0F141C]/90 backdrop-blur-2xl border border-white/[0.09] rounded-3xl p-5 sm:p-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_32px_80px_rgba(0,163,255,0.12)]">
                {/* Window chrome */}
                <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/[0.06] flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                    <span className="ml-2.5 font-mono text-[11px] text-slate-400 flex items-center gap-1.5">
                      <LayoutDashboard className="w-3.5 h-3.5 text-[#00A3FF]" />
                      admin.artron.ge/live-telemetry
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      data-testid="hero-labor-export-btn"
                      onClick={() => setIsLaborModalOpen(true)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[9px] font-mono font-bold uppercase transition-all duration-200 cursor-pointer hover:shadow-[0_0_10px_rgba(0,255,135,0.2)]"
                      title="ბრძანება №01-15/ნ შრომის დროის ელექტრონული აღრიცხვა"
                    >
                      <ShieldCheck className="w-3 h-3 text-emerald-400" />
                      <span>№01-15/ნ ტაბელი</span>
                      <Download className="w-3 h-3 ml-0.5 opacity-70" />
                    </button>
                    <span className="font-mono text-[10px] text-emerald-400 bg-emerald-950/50 border border-emerald-500/20 px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
                      LIVE
                    </span>
                  </div>
                </div>

                {/* KPI cards */}
                <div className="grid grid-cols-3 gap-3 mb-5">
                  {[
                    { label: locale === 'ka' ? 'აქტიური წევრები' : 'Active Members', value: 1248, suffix: '', color: '#00A3FF', trend: '+4.2%', spark: sparkData },
                    { label: locale === 'ka' ? 'დღიური ვიზიტი' : 'Daily Check-ins', value: 384, suffix: '', color: '#10B981', trend: '+11%', spark: sparkData.slice().reverse() },
                    { label: locale === 'ka' ? 'Win-back ზრდა' : 'Win-back Rate', value: 18, suffix: '%', color: '#8B5CF6', trend: '+3pp', spark: sparkData.map((v, i) => v * (i % 2 === 0 ? 0.9 : 1.1)) },
                  ].map((m, i) => (
                    <div key={i} className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.12] transition-colors">
                      <span className="text-[10px] text-slate-500 block mb-1.5 truncate">{m.label}</span>
                      <LiveCounter target={m.value} suffix={m.suffix} color={m.color} />
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-[9px] font-mono text-emerald-400 flex items-center gap-0.5">
                          <TrendingUp className="w-2.5 h-2.5" />{m.trend}
                        </span>
                        <SparkLine values={m.spark} color={m.color} />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Weekly bar chart */}
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] mb-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-mono text-slate-400">
                      {locale === 'ka' ? 'კვირის ვიზიტები' : 'Weekly Check-ins'}
                    </span>
                    <Activity className="w-3.5 h-3.5 text-cyan-500/60" />
                  </div>
                  <MiniBarChart />
                </div>

                {/* Live telemetry feed */}
                <div className="space-y-2.5 font-mono text-xs">
                  <div className="text-[10px] text-slate-600 uppercase tracking-widest mb-1">
                    {locale === 'ka' ? '↳ ცოცხალი ჟურნალი' : '↳ Live Feed'}
                  </div>
                  {[
                    { name: 'David T. [TRAINER]', time: '18:42:01', status: 'PASS: GRANTED', statusColor: 'text-emerald-400', dot: 'bg-emerald-400' },
                    { name: 'Alex M. [MEMBER]', time: '18:43:15', status: 'TURNIKET_01', statusColor: 'text-cyan-400', dot: 'bg-cyan-400' },
                  ].map((row, i) => (
                    <div key={i} className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:border-white/[0.08] transition-colors">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-2 h-2 rounded-full ${row.dot} animate-pulse`} />
                        <span className="text-white font-medium text-[11px]">{row.name}</span>
                      </div>
                      <div className="flex items-center gap-3 text-slate-500 text-[11px]">
                        <span>CHECK-IN {row.time}</span>
                        <span className={`font-semibold ${row.statusColor}`}>{row.status}</span>
                      </div>
                    </div>
                  ))}

                  {scanSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30"
                    >
                      <div className="flex items-center gap-2.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-300 font-semibold text-[11px]">Nino K. [MOBILE PASS]</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-[11px]">
                        <span className="text-slate-400 font-mono">{qrCodeVal}</span>
                        <span className="text-[10px] bg-emerald-500/20 px-2 py-0.5 rounded-full font-bold text-emerald-300">RELAY OPEN (5s)</span>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </TiltCard>
          </motion.div>

          {/* ── Right: B2C Mobile App ── */}
          <motion.div variants={itemVariants} className="lg:col-span-5 flex flex-col items-center">
            <TiltCard className="w-[280px] sm:w-[300px]" maxDeg={10}>
              <div className="relative rounded-[44px] bg-[#08090F] border-[3.5px] border-slate-700/70 p-5 shadow-[0_48px_96px_rgba(0,102,255,0.3),0_0_0_1px_rgba(0,163,255,0.12)]">
                {/* Notch */}
                <div className="w-24 h-4 bg-slate-800/80 rounded-full mx-auto mb-5 flex items-center justify-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                  <div className="w-6 h-1.5 bg-slate-600 rounded-full" />
                </div>
                {/* Status bar */}
                <div className="flex items-center justify-between px-1 mb-4">
                  <span className="text-[10px] font-bold text-white tracking-wider">ARTRON</span>
                  <div className="flex items-center gap-1">
                    <Wifi className="w-3 h-3 text-cyan-400" />
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  </div>
                </div>

                <WalletCard qrVal={qrCodeVal} locale={locale} />

                {/* IoT status */}
                <motion.div
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="mt-4 flex items-center justify-between px-3 py-2.5 rounded-xl bg-white/[0.04] border border-cyan-500/15"
                >
                  <div className="flex items-center gap-2">
                    <Zap className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="text-[11px] text-slate-300 font-mono">TURNIKET_01</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse inline-block" />
                    READY
                  </span>
                </motion.div>

                {/* Scan CTA */}
                <button
                  onClick={handleSimulateScan}
                  disabled={isScanning}
                  className="relative w-full mt-3 py-3 rounded-2xl font-bold text-xs text-white overflow-hidden group transition-all duration-300 cursor-pointer disabled:opacity-60 min-h-[44px]"
                  style={{ background: 'linear-gradient(135deg, #0066FF, #00D2FF)' }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
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
                        {locale === 'ka' ? 'QR საშვი (Simulate)' : 'Test QR Pass'}
                      </>
                    )}
                  </span>
                </button>

                <div className="mt-4 w-20 h-1 bg-slate-700/60 rounded-full mx-auto" />
              </div>
            </TiltCard>

            {/* Floating badges */}
            <div className="mt-6 flex flex-wrap justify-center gap-2.5">
              {[
                { icon: Users, label: locale === 'ka' ? 'B2C მომხმარებელი' : 'B2C Athlete', color: 'text-cyan-400' },
                { icon: CreditCard, label: locale === 'ka' ? '14-დღე გარანტია' : '14-Day Return', color: 'text-emerald-400' },
                { icon: ShieldCheck, label: 'AES-256', color: 'text-purple-400' },
              ].map((b, i) => {
                const Icon = b.icon;
                return (
                  <div
                    key={i}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-[10px] font-mono ${b.color}`}
                  >
                    <Icon className="w-3 h-3" />
                    {b.label}
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA strip */}
        <motion.div variants={itemVariants} className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/get-started"
            className="group relative inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-bold text-sm text-white overflow-hidden transition-all duration-300 hover:scale-[1.03] min-h-[44px]"
            style={{ background: 'linear-gradient(135deg, #0066FF, #00D2FF)' }}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-600" />
            <span className="relative">
              {locale === 'ka' ? 'დემო მოითხოვეთ' : locale === 'ru' ? 'Запросить демо' : 'Request a Demo'}
            </span>
            <ArrowRight className="relative w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <Link
            href="#features"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-medium text-slate-300 border border-white/[0.10] hover:border-cyan-500/40 hover:text-white hover:bg-cyan-950/20 transition-all duration-300 min-h-[44px]"
          >
            {locale === 'ka' ? 'ყველა ფუნქცია' : locale === 'ru' ? 'Все функции' : 'Explore Features'}
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </motion.div>
      </motion.div>

      {/* Labor Compliance Order №01-15/n Audit Modal */}
      <LaborComplianceModal isOpen={isLaborModalOpen} onClose={() => setIsLaborModalOpen(false)} />
    </section>
  );
};
