'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';
import { Sparkles, Cpu, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const AboutPillars: React.FC = () => {
  const { t, locale } = useLanguage();

  const pillars = [
    {
      badge: t('about_mission_badge'),
      icon: Sparkles,
      title: t('about_mission_title'),
      body: t('about_mission_body'),
      accentColor: '#00A3FF',
      gradient: 'from-cyan-500/20 to-blue-600/5',
      border: 'border-cyan-500/30 hover:border-cyan-400',
      bullets: [
        locale === 'ka' ? 'ხელით რუტინის 100% ელიმინაცია' : locale === 'ru' ? '100% устранение рутинного труда' : '100% manual routine elimination',
        locale === 'ka' ? 'საოპერაციო მოგების მაქსიმიზაცია' : locale === 'ru' ? 'Максимизация операционной прибыли' : 'Operational margin maximization',
      ],
    },
    {
      badge: t('about_who_badge'),
      icon: Cpu,
      title: t('about_who_title'),
      body: t('about_who_body'),
      accentColor: '#00D2FF',
      gradient: 'from-blue-600/20 to-purple-600/5',
      border: 'border-blue-500/30 hover:border-blue-400',
      bullets: [
        locale === 'ka' ? 'საკუთარი წარმოების IoT რელეები' : locale === 'ru' ? 'Собственные аппаратные IoT-реле' : 'In-house proprietary IoT relays',
        locale === 'ka' ? 'ავტონომიური Offline ბუფერი' : locale === 'ru' ? 'Автономный Offline буфер' : 'Autonomous Offline buffer',
      ],
    },
    {
      badge: t('about_compliance_badge'),
      icon: ShieldCheck,
      title: t('about_compliance_title'),
      body: t('about_compliance_body'),
      accentColor: '#10B981',
      gradient: 'from-emerald-500/20 to-teal-600/5',
      border: 'border-emerald-500/30 hover:border-emerald-400',
      bullets: [
        locale === 'ka' ? 'შრომის ინსპექციის №01-15/ნ ტაბელები' : locale === 'ru' ? 'Табели инспекции труда №01-15/н' : 'Order №01-15/ნ labor timesheets',
        locale === 'ka' ? '24/7 ადგილობრივი ქართული მხარდაჭერა' : locale === 'ru' ? 'Круглосуточная локальная поддержка' : '24/7 localized expert support',
      ],
    },
  ];

  return (
    <div className="mb-16 sm:mb-24">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {pillars.map((p, idx) => {
          const Icon = p.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.6 }}
              className={`relative p-6 sm:p-8 rounded-3xl bg-[#0F141C]/80 backdrop-blur-2xl border ${p.border} shadow-[0_20px_50px_rgba(0,0,0,0.4)] hover:shadow-[0_0_40px_rgba(0,163,255,0.15)] transition-all duration-300 flex flex-col justify-between group overflow-hidden`}
            >
              {/* Corner ambient glow */}
              <div className={`absolute top-0 right-0 w-36 h-36 bg-gradient-to-br ${p.gradient} rounded-full blur-2xl pointer-events-none -z-10 group-hover:scale-150 transition-transform duration-500`} />

              <div>
                {/* Badge & Icon */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.1] flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-inner">
                    <Icon className="w-6 h-6" style={{ color: p.accentColor }} />
                  </div>
                  <span className="font-mono text-[10px] font-bold tracking-wider text-cyan-400 bg-cyan-950/40 border border-cyan-500/20 px-3 py-1 rounded-full">
                    {p.badge}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 group-hover:text-cyan-200 transition-colors">
                  {p.title}
                </h3>

                {/* Body */}
                <p className="text-sm sm:text-base leading-relaxed text-slate-300 font-light mb-6">
                  {p.body}
                </p>
              </div>

              {/* Bullet Highlights */}
              <div className="pt-4 border-t border-white/[0.06] space-y-2">
                {p.bullets.map((b, bIdx) => (
                  <div key={bIdx} className="flex items-center gap-2 text-xs font-medium text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" style={{ color: p.accentColor }} />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
