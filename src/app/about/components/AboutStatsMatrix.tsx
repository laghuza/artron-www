'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';
import { Activity, Zap, ShieldCheck, Lock } from 'lucide-react';

export const AboutStatsMatrix: React.FC = () => {
  const { t } = useLanguage();

  const stats = [
    {
      icon: Activity,
      val: t('about_stats_uptime_val'),
      label: t('about_stats_uptime_label'),
      sub: t('about_stats_uptime_sub'),
      color: '#00A3FF',
      glow: 'shadow-[0_0_25px_rgba(0,163,255,0.15)]',
      border: 'border-cyan-500/20 group-hover:border-cyan-500/50',
      badgeBg: 'bg-cyan-500/10 text-cyan-400',
    },
    {
      icon: Zap,
      val: t('about_stats_speed_val'),
      label: t('about_stats_speed_label'),
      sub: t('about_stats_speed_sub'),
      color: '#10B981',
      glow: 'shadow-[0_0_25px_rgba(16,185,129,0.15)]',
      border: 'border-emerald-500/20 group-hover:border-emerald-500/50',
      badgeBg: 'bg-emerald-500/10 text-emerald-400',
    },
    {
      icon: ShieldCheck,
      val: t('about_stats_labor_val'),
      label: t('about_stats_labor_label'),
      sub: t('about_stats_labor_sub'),
      color: '#8B5CF6',
      glow: 'shadow-[0_0_25px_rgba(139,92,246,0.15)]',
      border: 'border-purple-500/20 group-hover:border-purple-500/50',
      badgeBg: 'bg-purple-500/10 text-purple-400',
    },
    {
      icon: Lock,
      val: t('about_stats_security_val'),
      label: t('about_stats_security_label'),
      sub: t('about_stats_security_sub'),
      color: '#00D2FF',
      glow: 'shadow-[0_0_25px_rgba(0,210,255,0.15)]',
      border: 'border-blue-500/20 group-hover:border-blue-500/50',
      badgeBg: 'bg-blue-500/10 text-blue-400',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16 sm:mb-24">
      {stats.map((item, idx) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
            className={`group relative p-5 sm:p-6 rounded-2xl bg-[#0F141C]/80 backdrop-blur-xl border ${item.border} ${item.glow} hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl ${item.badgeBg} border border-white/[0.08] flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-5 h-5" style={{ color: item.color }} />
                </div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-slate-500 bg-white/[0.03] px-2 py-0.5 rounded-full border border-white/[0.04]">
                  LIVE SYNC
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight mb-1" style={{ color: item.color }}>
                {item.val}
              </div>
              <div className="text-sm font-bold text-slate-200 mb-1">
                {item.label}
              </div>
            </div>
            <div className="text-xs text-slate-400 font-light mt-2 pt-2 border-t border-white/[0.05]">
              {item.sub}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
