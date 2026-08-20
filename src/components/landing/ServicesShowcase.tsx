'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { 
  Cpu, 
  Clock, 
  Users, 
  Smartphone, 
  QrCode, 
  Activity,
  CheckCircle2,
  Zap,
  Wifi,
  Shield
} from 'lucide-react';
import { AppStoreBadges } from '@/components/ui/AppStoreBadges';

export const ServicesShowcase: React.FC = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'b2b' | 'b2c'>('b2b');

  const b2bServices = [
    {
      icon: <Cpu className="w-6 h-6 text-[#00A3FF]" />,
      titleKey: 'service_iot_title',
      descKey: 'service_iot_desc',
      badge: 'IoT Control',
      features: ['TCP/Socket Direct Connect', 'Instant Door Relays', 'Anti-Passback Verification'],
      size: 'hero',         // col-span-7 — large
      liveStatus: true,
    },
    {
      icon: <Clock className="w-6 h-6 text-[#00A3FF]" />,
      titleKey: 'service_worktime_title',
      descKey: 'service_worktime_desc',
      badge: 'Order №01-15/ნ',
      features: ['Biometric Face/NFC Tracking', 'Automated Work Hour Sheets', 'Labor Inspection Compliant'],
      size: 'compact',      // col-span-5
      liveStatus: false,
    },
    {
      icon: <Users className="w-6 h-6 text-[#00A3FF]" />,
      titleKey: 'service_federation_title',
      descKey: 'service_federation_desc',
      badge: 'Federations',
      features: ['Athlete License Registry', 'Central Tournament Grids', 'Multi-tenant Club Nodes'],
      size: 'mini',         // col-span-4
      liveStatus: false,
    }
  ];

  const b2cServices = [
    {
      icon: <Smartphone className="w-6 h-6 text-[#00A3FF]" />,
      titleKey: 'service_marketplace_title',
      descKey: 'service_marketplace_desc',
      badge: 'Subscriptions',
      features: ['Dynamic Card Processing', '14-Day Statutory Refunds', 'One-Click Access Renewals'],
      size: 'hero',
      liveStatus: false,
    },
    {
      icon: <QrCode className="w-6 h-6 text-[#00A3FF]" />,
      titleKey: 'service_passbook_title',
      descKey: 'service_passbook_desc',
      badge: 'Dynamic pass',
      features: ['Self-Regenerating QR Codes', 'In-App NFC Integration', 'Fraud-Proof Entry Keys'],
      size: 'compact',
      liveStatus: true,
    },
    {
      icon: <Activity className="w-6 h-6 text-[#00A3FF]" />,
      titleKey: 'service_metrics_title',
      descKey: 'service_metrics_desc',
      badge: 'Athletes',
      features: ['Dual-Month Attendance History', 'Interactive Progress Widgets', 'Trainer Review Systems'],
      size: 'mini',
      liveStatus: false,
    }
  ];

  const services = activeTab === 'b2b' ? b2bServices : b2cServices;
  const [hero, compact, mini] = services;

  return (
    <section id="services" className="py-20 px-4 md:px-8 bg-[#0B0F17] relative overflow-hidden border-b border-white/5 studio-grain">
      {/* Glow Backdrops */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00A3FF]/5 rounded-full filter blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#0066FF]/5 rounded-full filter blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00A3FF]/10 border border-[#00A3FF]/20 text-xs font-mono font-bold text-[#00A3FF] mb-4 tracking-wider uppercase">
            <Zap className="w-3.5 h-3.5 text-[#00A3FF]" /> {t('logo_text')} Ecosystem
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-4">
            {t('services_section_title')}
          </h2>
          <p className="text-[#94A3B8] text-base md:text-lg font-medium">
            {t('services_section_subtitle')}
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1 bg-[#121722] border border-white/10 rounded-2xl backdrop-blur-md">
            <button
              onClick={() => setActiveTab('b2b')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 cursor-pointer ${
                activeTab === 'b2b'
                  ? 'bg-gradient-to-r from-[#0066FF] to-[#00D2FF] text-white shadow-lg shadow-[#00A3FF]/25'
                  : 'text-[#94A3B8] hover:text-white'
              }`}
              style={{ minHeight: '48px' }}
            >
              <Cpu className="w-4 h-4" />
              {t('services_tab_b2b')}
            </button>
            <button
              onClick={() => setActiveTab('b2c')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 cursor-pointer ${
                activeTab === 'b2c'
                  ? 'bg-gradient-to-r from-[#0066FF] to-[#00D2FF] text-white shadow-lg shadow-[#00A3FF]/25'
                  : 'text-[#94A3B8] hover:text-white'
              }`}
              style={{ minHeight: '48px' }}
            >
              <Smartphone className="w-4 h-4" />
              {t('services_tab_b2c')}
            </button>
          </div>
        </div>

        {/* ─── BENTO GRID LAYOUT ─── */}
        {/* Row 1: Hero (7/12) + Compact (5/12) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-5">

          {/* HERO CARD — col-span-7 */}
          <div className="lg:col-span-7 bg-[#0D1420]/90 border border-[#00A3FF]/15 backdrop-blur-xl rounded-3xl p-8 relative overflow-hidden group hover:border-[#00A3FF]/40 hover:shadow-[0_0_40px_rgba(0,163,255,0.12)] transition-all duration-500">
            {/* Animated top accent line */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#00A3FF]/60 to-transparent" />
            {/* Ambient glow core */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-48 bg-[#00A3FF]/6 rounded-full blur-[60px] pointer-events-none group-hover:bg-[#00A3FF]/10 transition-all duration-500" />

            <div className="relative z-10">
              {/* Mono indicator */}
              <div className="text-[9px] font-mono text-[#00A3FF]/60 uppercase tracking-widest mb-5 select-none">
                [ NODE_REF: 0x01 // HERO_MODULE ]
              </div>

              {/* Icon + badge row */}
              <div className="flex items-start justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-[#00A3FF]/10 border border-[#00A3FF]/25 flex items-center justify-center shadow-[0_0_20px_rgba(0,163,255,0.15)] group-hover:shadow-[0_0_30px_rgba(0,163,255,0.25)] transition-all duration-300">
                  {hero.icon}
                </div>
                <div className="flex items-center gap-2">
                  {hero.liveStatus && (
                    <span className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/50 border border-emerald-500/25 px-2 py-0.5 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      LIVE
                    </span>
                  )}
                  <span className="text-[10px] uppercase font-mono font-bold text-[#00A3FF] tracking-wider px-2.5 py-1 rounded-lg bg-[#00A3FF]/10 border border-[#00A3FF]/20">
                    {hero.badge}
                  </span>
                </div>
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#00A3FF] transition-colors duration-300">
                {t(hero.titleKey)}
              </h3>
              <p className="text-[#94A3B8] text-sm leading-relaxed mb-8 max-w-lg">
                {t(hero.descKey)}
              </p>

              {/* Feature pills — horizontal for hero */}
              <div className="flex flex-wrap gap-2.5">
                {hero.features.map((feat, fIdx) => (
                  <span key={fIdx} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#00A3FF]/8 border border-[#00A3FF]/15 text-xs text-[#94A3B8] font-mono">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    {feat}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* COMPACT CARD — col-span-5 */}
          <div className="lg:col-span-5 bg-[#0D1420]/80 border border-white/[0.07] backdrop-blur-xl rounded-3xl p-7 relative overflow-hidden group hover:border-[#00A3FF]/30 hover:shadow-[0_0_25px_rgba(0,163,255,0.08)] transition-all duration-500 flex flex-col justify-between">
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <div>
              {/* Mono indicator */}
              <div className="text-[9px] font-mono text-[#94A3B8]/40 uppercase tracking-widest mb-5 select-none">
                [ NODE_REF: 0x02 ]
              </div>

              <div className="flex items-center justify-between mb-6">
                <div className="w-11 h-11 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center">
                  {compact.icon}
                </div>
                {compact.liveStatus && (
                  <span className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/50 border border-emerald-500/25 px-2 py-0.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    LIVE
                  </span>
                )}
              </div>

              <span className="text-[10px] uppercase font-mono font-bold text-[#64748B] tracking-wider block mb-2">
                {compact.badge}
              </span>
              <h3 className="text-xl font-bold text-white mb-2.5 group-hover:text-[#00A3FF] transition-colors duration-300">
                {t(compact.titleKey)}
              </h3>
              <p className="text-[#94A3B8] text-sm leading-relaxed mb-6">
                {t(compact.descKey)}
              </p>
            </div>

            {/* Feature list */}
            <div className="border-t border-white/5 pt-5">
              <ul className="space-y-2.5">
                {compact.features.map((feat, fIdx) => (
                  <li key={fIdx} className="flex items-center gap-2.5 text-xs text-[#94A3B8]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Row 2: Mini (4/12) + Wide (8/12) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

          {/* MINI CARD — col-span-4 */}
          <div className="lg:col-span-4 bg-[#0A1018]/80 border border-white/[0.06] backdrop-blur-xl rounded-3xl p-7 relative overflow-hidden group hover:border-[#00A3FF]/25 transition-all duration-500 flex flex-col justify-between min-h-[220px]">
            <div>
              <div className="text-[9px] font-mono text-[#94A3B8]/30 uppercase tracking-widest mb-4 select-none">
                [ NODE_REF: 0x03 ]
              </div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.07] flex items-center justify-center">
                  {mini.icon}
                </div>
                <span className="text-[10px] uppercase font-mono font-bold text-[#64748B] tracking-wider">
                  {mini.badge}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#00A3FF] transition-colors duration-300">
                {t(mini.titleKey)}
              </h3>
              <p className="text-[#94A3B8] text-xs leading-relaxed">
                {t(mini.descKey)}
              </p>
            </div>

            {/* Shield indicator */}
            <div className="mt-5 flex items-center gap-2 text-[10px] font-mono text-[#64748B]">
              <Shield className="w-3.5 h-3.5 text-[#00A3FF]/60" />
              <span>MULTI-TENANT ISOLATION</span>
            </div>
          </div>

          {/* WIDE FEATURE STRIP — col-span-8 */}
          <div className="lg:col-span-8 bg-[#0D1420]/70 border border-white/[0.06] backdrop-blur-xl rounded-3xl p-7 relative overflow-hidden group hover:border-[#00A3FF]/20 transition-all duration-500">
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-[#00A3FF]/4 rounded-full blur-[60px] pointer-events-none" />

            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="text-[9px] font-mono text-[#94A3B8]/40 uppercase tracking-widest select-none">
                    [ ECOSYSTEM // ALL MODULES ACTIVE ]
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Wifi className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-[10px] font-mono text-emerald-400">ONLINE</span>
                  </div>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {[
                    { label: activeTab === 'b2b' ? 'Turnstile Uptime' : 'App Sessions', value: '99.97%', color: 'text-[#00A3FF]' },
                    { label: activeTab === 'b2b' ? 'Active Tenants' : 'Daily Passes', value: activeTab === 'b2b' ? '240+' : '8,400+', color: 'text-white' },
                    { label: activeTab === 'b2b' ? 'IoT Response' : 'Avg Scan Time', value: '<50ms', color: 'text-emerald-400' },
                  ].map((stat, i) => (
                    <div key={i} className="bg-white/[0.03] border border-white/[0.05] rounded-2xl p-4">
                      <div className={`text-2xl font-black font-mono mb-1 ${stat.color}`}>{stat.value}</div>
                      <div className="text-[10px] text-[#64748B] font-mono uppercase tracking-wider">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* All features combined */}
              <div className="grid grid-cols-3 gap-2">
                {[...services[0].features, ...services[1].features, ...services[2].features].slice(0, 6).map((feat, fIdx) => (
                  <div key={fIdx} className="flex items-center gap-1.5 text-[11px] text-[#94A3B8] bg-white/[0.025] border border-white/[0.04] rounded-xl px-2.5 py-2">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                    <span className="truncate">{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* B2C App Store Badges Integration */}
        {activeTab === 'b2c' && (
          <div className="mt-14 pt-10 border-t border-white/10 flex flex-col items-center justify-center text-center space-y-4 animate-fadeIn">
            <div className="max-w-lg">
              <span className="text-[10px] font-mono font-bold text-[#00A3FF] tracking-wider uppercase block mb-1">
                [ B2C // ATHLETE MOBILE OS DISTRIBUTION ]
              </span>
              <h4 className="text-xl font-bold text-white tracking-tight">
                {t('store_b2c_desc')}
              </h4>
            </div>
            <AppStoreBadges align="center" className="pt-2" />
          </div>
        )}

      </div>
    </section>
  );
};
