'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { 
  Calendar, 
  Building2, 
  Play,
  ArrowRight, 
  Server, 
  Zap, 
  ShieldCheck, 
  Activity,
  CheckCircle2
} from 'lucide-react';
import { AppStoreBadges } from '@/components/ui/AppStoreBadges';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { IgnitionButton } from '@/components/ui/IgnitionButton';

export const SaaSGatewayCTA: React.FC = () => {
  const { t } = useLanguage();

  const slaMetrics = [
    {
      id: 1,
      val: t('gateway_sla_metric1_val') || '99.9%',
      title: t('gateway_sla_metric1_title') || 'Cloud Uptime SLA',
      desc: t('gateway_sla_metric1_desc') || 'უწყვეტი სერვერული მუშაობა',
      icon: <Server className="w-4 h-4 text-[#00A3FF]" />,
      accent: 'border-[#00A3FF]/30 text-[#00A3FF] bg-[#00A3FF]/10'
    },
    {
      id: 2,
      val: t('gateway_sla_metric2_val') || '< 0.1s',
      title: t('gateway_sla_metric2_title') || 'IoT Relay Sync',
      desc: t('gateway_sla_metric2_desc') || 'ტურნიკეტის მყისიერი იმპულსი',
      icon: <Zap className="w-4 h-4 text-[#00ff87]" />,
      accent: 'border-[#00ff87]/30 text-[#00ff87] bg-[#00ff87]/10'
    },
    {
      id: 3,
      val: t('gateway_sla_metric3_val') || '100%',
      title: t('gateway_sla_metric3_title') || 'ბრძანება №01-15/ნ',
      desc: t('gateway_sla_metric3_desc') || 'შრომის აღრიცხვის სტანდარტი',
      icon: <ShieldCheck className="w-4 h-4 text-[#00D2FF]" />,
      accent: 'border-[#00D2FF]/30 text-[#00D2FF] bg-[#00D2FF]/10'
    },
    {
      id: 4,
      val: t('gateway_sla_metric4_val') || '24/7',
      title: t('gateway_sla_metric4_title') || 'Auto Telemetry',
      desc: t('gateway_sla_metric4_desc') || 'ცოცხალი დიაგნოსტიკა & ალერტები',
      icon: <Activity className="w-4 h-4 text-emerald-400" />,
      accent: 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10'
    }
  ];

  return (
    <section
      id="saas-gateway-cta"
      className="relative overflow-hidden bg-[#070A0F] border-t border-white/5 studio-grain"
    >
      {/* ── Radial burst from bottom-left ── */}
      <div className="absolute bottom-0 left-0 w-[800px] h-[600px] bg-[#00A3FF]/8 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#0066FF]/5 rounded-full blur-[120px] pointer-events-none" />

      {/* ── Top accent line ── */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#00A3FF]/50 to-transparent" />

      {/* ── Mono system tag ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="pt-8 pb-3">
          <span className="text-[9px] font-mono font-bold text-[#00A3FF]/60 tracking-[0.25em] uppercase select-none">
            [ SYS: ENTERPRISE_SLA // LIVE_TELEMETRY_GATEWAY ]
          </span>
        </div>
      </div>

      {/* ── Asymmetric Layout ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pb-20 pt-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">

          {/* LEFT: Live SLA & Hardware Telemetry Matrix */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="bg-[#0A1018]/90 border border-white/10 rounded-2xl p-6 sm:p-7 backdrop-blur-xl shadow-[0_0_50px_rgba(0,163,255,0.05)] relative overflow-hidden">
              
              {/* Top Matrix Status Bar */}
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                  <span className="text-[11px] font-mono font-bold text-[#00ff87] tracking-wider uppercase">
                    SYSTEM HEALTH: 100% OPTIMAL
                  </span>
                </div>
                <div className="text-[9px] font-mono text-[#94A3B8] uppercase">
                  ENTERPRISE CLUSTER
                </div>
              </div>

              {/* 2x2 High-Tech Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {slaMetrics.map((m) => (
                  <div
                    key={m.id}
                    className="p-4 rounded-xl bg-[#070C14]/80 border border-white/[0.08] hover:border-[#00A3FF]/40 transition-all duration-300 group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xl sm:text-2xl font-black font-mono text-white tracking-tight group-hover:text-[#00A3FF] transition-colors">
                        {m.val}
                      </span>
                      <div className={`p-1.5 rounded-lg border ${m.accent}`}>
                        {m.icon}
                      </div>
                    </div>
                    <div className="text-xs font-bold text-[#F8FAFC] tracking-wide mb-0.5">
                      {m.title}
                    </div>
                    <div className="text-[11px] text-[#94A3B8] font-mono">
                      {m.desc}
                    </div>
                  </div>
                ))}
              </div>

              {/* Terminal status baseline */}
              <div className="mt-5 pt-3.5 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-[#64748B]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>ENNEACORE 9-NODE ENGINE ACTIVE</span>
                </div>
                <span>LATENCY: ~12ms</span>
              </div>
            </div>
          </div>

          {/* RIGHT: Content panel */}
          <div className="lg:col-span-6 flex flex-col justify-center lg:pl-6">

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-black text-white leading-[1.12] tracking-tight mb-5">
              {t('gateway_cta_title')}
            </h2>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-[#94A3B8] font-medium leading-relaxed mb-8 max-w-lg">
              {t('gateway_cta_subtitle')}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-8">

              {/* Primary — Register */}
              <IgnitionButton
                href="/get-started?mode=register"
                variant="cyan"
                size="lg"
                className="px-7 py-4 text-sm font-extrabold justify-center"
                aria-label="B2B Registration Ignition"
              >
                <Building2 className="w-4.5 h-4.5 shrink-0" />
                <span>{t('cta_btn_register')}</span>
                <ArrowRight className="w-4 h-4 shrink-0 transition-transform duration-200" />
              </IgnitionButton>

              {/* Secondary — Book Demo */}
              <MagneticButton
                href="/get-started?mode=demo"
                variant="secondary"
                shockwaveColor="rgba(0, 163, 255, 0.6)"
                className="px-7 py-4 text-sm font-bold justify-center"
                style={{ minHeight: '52px' }}
              >
                <Play className="w-4.5 h-4.5 fill-[#00A3FF]/30 text-[#00A3FF] shrink-0" />
                <span>{t('cta_btn_book')}</span>
              </MagneticButton>
            </div>

            {/* App Store badges */}
            <div className="pt-6 border-t border-white/[0.06]">
              <AppStoreBadges align="left" />
            </div>
          </div>

        </div>
      </div>

      {/* ── Bottom fade ── */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#070A0F] to-transparent pointer-events-none" />
    </section>
  );
};
