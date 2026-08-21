'use client';

import React from 'react';
import { motion, MotionValue, useReducedMotion } from 'framer-motion';
import { LayoutDashboard, Smartphone, Cpu, Activity, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

interface KineticPillarCardsProps {
  cardsY: MotionValue<string>;
  cardsOpacity: MotionValue<number>;
  locale: string;
}

export const KineticPillarCards: React.FC<KineticPillarCardsProps> = ({
  cardsY,
  cardsOpacity,
  locale
}) => {
  const shouldReduceMotion = useReducedMotion();

  const pillars = [
    {
      id: 'b2b-erp',
      code: 'MOD_01',
      icon: LayoutDashboard,
      badge: locale === 'ka' ? 'ბრძანება №01-15/ნ' : locale === 'ru' ? 'Приказ №01-15/н' : 'Order №01-15/N',
      title: locale === 'ka' ? 'B2B სამართავი პანელი' : locale === 'ru' ? 'B2B Панель Управления' : 'B2B Enterprise Cloud',
      desc: locale === 'ka' 
        ? 'სამუშაო დროის ელექტრონული ტაბელი, აბონემენტების მართვა, ფინანსური რეპორტინგი და პერსონალი.' 
        : locale === 'ru'
        ? 'Табель учета рабочего времени, управление абонементами, финансовая отчетность и персонал.'
        : 'Automated staff timesheets, subscription lifecycles, ledger analytics, and multi-tenant control.',
      link: '#features',
      accent: '#00A3FF'
    },
    {
      id: 'b2c-mobile',
      code: 'MOD_02',
      icon: Smartphone,
      badge: locale === 'ka' ? '1-წამიანი Pass' : locale === 'ru' ? '1-сек QR Пропуск' : '1-Sec Dynamic QR',
      title: locale === 'ka' ? 'B2C მობილური აპლიკაცია' : locale === 'ru' ? 'B2C Мобильное Приложение' : 'B2C Mobile Experience',
      desc: locale === 'ka' 
        ? 'დინამიური QR საშვი ტურნიკეტზე, ონლაინ გადახდები 14-დღიანი გარანტიით და ვიზიტების ისტორია.' 
        : locale === 'ru'
        ? 'Динамический QR-пропуск на турникете, онлайн-оплата и персональная история тренировок.'
        : 'Instant contactless turnstile entry, Apple Pay subscriptions, workout schedules & biometrics.',
      link: '#mobile-app',
      accent: '#10B981'
    },
    {
      id: 'iot-relays',
      code: 'MOD_03',
      icon: Cpu,
      badge: 'TCP / MQTT EDGE',
      title: locale === 'ka' ? 'IoT ტურნიკეტების კონტროლი' : locale === 'ru' ? 'IoT Контроль Турникетов' : 'IoT Hardware Relays',
      desc: locale === 'ka' 
        ? 'პირდაპირი TCP ბუფერული კავშირი ტურნიკეტებთან, ბარიერებთან და Anti-Passback უსაფრთხოება.' 
        : locale === 'ru'
        ? 'Прямое TCP буферное соединение с контроллерами, турникетами и система Anti-Passback.'
        : 'Zero-latency direct socket relays, RFID/NFC biometric gates, and anti-passback enforcement.',
      link: '#hardware',
      accent: '#F59E0B'
    },
    {
      id: 'ai-predictive',
      code: 'MOD_04',
      icon: Activity,
      badge: 'ML CHURN PROJECTION',
      title: locale === 'ka' ? 'AI პროგნოზირება & KPI' : locale === 'ru' ? 'AI Прогнозирование & KPI' : 'AI Churn & KPI Engine',
      desc: locale === 'ka' 
        ? 'გადინების რისკის ამოცნობა 15–30 დღით ადრე და პასიური წევრების ავტომატური რეაქტივაცია.' 
        : locale === 'ru'
        ? 'Прогнозирование оттока клиентов за 15–30 дней и автоматическая реактивация Win-back.'
        : 'Proactive 15–30 day churn risk scores, automated Win-back SMS triggers & cohort analytics.',
      link: '#analytics',
      accent: '#8B5CF6'
    }
  ];

  return (
    <motion.div 
      style={{ 
        y: shouldReduceMotion ? '0vh' : cardsY, 
        opacity: shouldReduceMotion ? 1 : cardsOpacity 
      }}
      className="absolute bottom-3 sm:bottom-6 lg:bottom-8 inset-x-0 z-30 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto gpu-accelerated max-w-full"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3.5 lg:gap-4 max-w-full">
        {pillars.map((pillar) => {
          const Icon = pillar.icon;
          return (
            <Link
              key={pillar.id}
              href={pillar.link}
              className="group relative p-3.5 sm:p-4 lg:p-5 rounded-2xl bg-[#0F141C]/90 border border-white/[0.08] backdrop-blur-xl hover:border-cyan-500/40 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,163,255,0.12)] hover:-translate-y-1 block will-change-transform"
            >
              {/* Top Meta Line */}
              <div className="flex items-center justify-between mb-2 sm:mb-3 text-[9px] sm:text-[10px] font-mono">
                <span className="text-slate-500">{pillar.code}</span>
                <span className="px-2 py-0.5 rounded-full bg-white/5 text-slate-300 border border-white/5 font-medium">
                  {pillar.badge}
                </span>
              </div>

              {/* Icon & Title */}
              <div className="flex items-center gap-2.5 sm:gap-3 mb-1.5 sm:mb-2">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform shrink-0">
                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <h2 className="text-xs sm:text-sm lg:text-base font-bold text-white group-hover:text-cyan-300 transition-colors truncate">
                  {pillar.title}
                </h2>
              </div>

              {/* Description */}
              <p className="text-[11px] sm:text-xs text-slate-400 font-light leading-relaxed mb-2.5 sm:mb-3 line-clamp-2">
                {pillar.desc}
              </p>

              {/* Explore Link */}
              <div className="flex items-center gap-1 text-[10px] sm:text-[11px] font-mono text-cyan-400 font-medium group-hover:translate-x-0.5 transition-transform">
                <span>{locale === 'ka' ? 'დეტალურად' : locale === 'ru' ? 'Подробнее' : 'Explore'}</span>
                <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </div>
            </Link>
          );
        })}
      </div>
    </motion.div>
  );
};
