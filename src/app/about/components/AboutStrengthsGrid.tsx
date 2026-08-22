'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';
import { PhoneCall, Cpu, Lock, CheckCircle2, TrendingUp, Sparkles } from 'lucide-react';

export const AboutStrengthsGrid: React.FC = () => {
  const { t, locale } = useLanguage();

  const features = [
    {
      icon: PhoneCall,
      title: t('about_feat_support_title'),
      desc: t('about_feat_support_desc'),
      tag: '24/7 SLA',
      color: '#00A3FF',
      badgeBg: 'bg-cyan-500/10 text-cyan-400',
    },
    {
      icon: Cpu,
      title: t('about_feat_iot_title'),
      desc: t('about_feat_iot_desc'),
      tag: 'OFFLINE BUFFER',
      color: '#00D2FF',
      badgeBg: 'bg-blue-500/10 text-blue-400',
    },
    {
      icon: Lock,
      title: t('about_feat_privacy_title'),
      desc: t('about_feat_privacy_desc'),
      tag: 'AES-256-GCM',
      color: '#8B5CF6',
      badgeBg: 'bg-purple-500/10 text-purple-400',
    },
    {
      icon: CheckCircle2,
      title: t('about_feat_legal_title'),
      desc: t('about_feat_legal_desc'),
      tag: '№01-15/ნ COMPLIANT',
      color: '#10B981',
      badgeBg: 'bg-emerald-500/10 text-emerald-400',
    },
    {
      icon: TrendingUp,
      title: t('about_feat_winback_title'),
      desc: t('about_feat_winback_desc'),
      tag: 'AI RETENTION',
      color: '#F59E0B',
      badgeBg: 'bg-amber-500/10 text-amber-400',
    },
    {
      icon: Sparkles,
      title: t('about_feat_innovation_title'),
      desc: t('about_feat_innovation_desc'),
      tag: 'LOCAL INNOVATION',
      color: '#EC4899',
      badgeBg: 'bg-pink-500/10 text-pink-400',
    },
  ];

  return (
    <div className="mb-16 sm:mb-24">
      <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-4">
          {locale === 'ka' ? 'რატომ ართრონი?' : locale === 'ru' ? 'Почему Artron?' : 'Why Choose Artron?'}
        </h2>
        <p className="text-sm sm:text-base text-slate-300 font-light">
          {locale === 'ka'
            ? 'სისტემის ძირითადი ტექნოლოგიური უპირატესობები და საოპერაციო სტანდარტები'
            : locale === 'ru'
            ? 'Ключевые технологические преимущества и стандарты нашей платформы'
            : 'Key technological advantages and enterprise standards of our ecosystem'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.5 }}
              className="group relative p-6 rounded-2xl bg-[#0F141C]/80 backdrop-blur-xl border border-white/[0.08] hover:border-cyan-500/40 hover:shadow-[0_0_30px_rgba(0,163,255,0.12)] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-11 h-11 rounded-xl ${item.badgeBg} border border-white/[0.08] flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-5 h-5" style={{ color: item.color }} />
                  </div>
                  <span className="font-mono text-[10px] font-bold text-slate-400 bg-white/[0.03] px-2.5 py-0.5 rounded-full border border-white/[0.05]">
                    {item.tag}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
