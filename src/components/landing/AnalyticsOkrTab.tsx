'use client';

import React, { useState, useMemo } from 'react';
import { Target, TrendingUp, ShieldAlert, RotateCcw, BarChart3, CheckCircle2, AlertTriangle, ArrowUpRight, Zap, Award, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { TiltSpotlightCard } from '@/components/ui/TiltSpotlightCard';

interface AnalyticsOkrTabProps {
  t: (key: string) => string;
  locale: string;
}

type RoleType = 'director' | 'manager' | 'coach';

export const AnalyticsOkrTab: React.FC<AnalyticsOkrTabProps> = ({ t, locale }) => {
  const [selectedRole, setSelectedRole] = useState<RoleType>('director');

  const currencySymbol = useMemo(() => (locale === 'ru' ? '₽' : locale === 'ka' ? '₾' : '$'), [locale]);

  const okrData = useMemo(() => {
    return {
      director: {
        title: locale === 'ka' ? 'Q3 მასშტაბირება და ფინანსური ზრდა' : locale === 'ru' ? 'Масштабирование Q3 и финансовый рост' : 'Q3 Scaling & Financial Growth',
        quarter: 'Q3 2026',
        daysLeft: 28,
        overallProgress: 86,
        status: 'ON_TRACK',
        krs: [
          {
            id: 'kr-1',
            title: locale === 'ka' ? 'MRR-ის გაზრდა 36,000₾-მდე' : locale === 'ru' ? 'Рост MRR до 1,200,000₽' : 'Scale MRR to $15,000',
            source: 'KPI Dashboard',
            sourceIcon: TrendingUp,
            sourceColor: '#00A3FF',
            current: locale === 'ka' ? '31,200₾' : locale === 'ru' ? '1,050,000₽' : '$13,200',
            target: locale === 'ka' ? '36,000₾' : locale === 'ru' ? '1,200,000₽' : '$15,000',
            progress: 87,
            status: 'ON_TRACK'
          },
          {
            id: 'kr-2',
            title: locale === 'ka' ? 'კლიენტების გადინების (Churn) დაწევა < 4.0%-მდე' : locale === 'ru' ? 'Снижение оттока (Churn) < 4.0%' : 'Reduce Churn Rate < 4.0%',
            source: 'Churn AI Engine',
            sourceIcon: ShieldAlert,
            sourceColor: '#FF5757',
            current: '4.4%',
            target: '< 4.0%',
            progress: 78,
            status: 'AT_RISK'
          },
          {
            id: 'kr-3',
            title: locale === 'ka' ? 'დარბაზის საშუალო დატვირთვის გაზრდა 75%-მდე' : locale === 'ru' ? 'Средняя загрузка залов до 75%' : 'Increase Facility Capacity to 75%',
            source: 'Market Heatmap',
            sourceIcon: BarChart3,
            sourceColor: '#00ff87',
            current: '71%',
            target: '75%',
            progress: 94,
            status: 'ON_TRACK'
          }
        ]
      },
      manager: {
        title: locale === 'ka' ? 'საოპერაციო ეფექტურობა & წევრების რეაქტივაცია' : locale === 'ru' ? 'Операционная эффективность и возврат клиентов' : 'Operational Efficiency & Member Win-Back',
        quarter: 'Q3 2026',
        daysLeft: 28,
        overallProgress: 82,
        status: 'ON_TRACK',
        krs: [
          {
            id: 'kr-m1',
            title: locale === 'ka' ? '25 ვადაგასული წევრის დაბრუნება (Win-Back)' : locale === 'ru' ? 'Возврат 25 ушедших членов (Win-Back)' : 'Reactivate 25 Lapsed Members',
            source: 'Win-back Analytics',
            sourceIcon: RotateCcw,
            sourceColor: '#00ff87',
            current: '21',
            target: '25',
            progress: 84,
            status: 'ON_TRACK'
          },
          {
            id: 'kr-m2',
            title: locale === 'ka' ? 'არაპიკური (08:00-12:00) საათების ავსება 60%-მდე' : locale === 'ru' ? 'Заполнение утренних часов (08:00-12:00) до 60%' : 'Fill Off-Peak Morning Hours to 60%',
            source: 'Market Analytics',
            sourceIcon: BarChart3,
            sourceColor: '#00A3FF',
            current: '54%',
            target: '60%',
            progress: 90,
            status: 'ON_TRACK'
          },
          {
            id: 'kr-m3',
            title: locale === 'ka' ? 'შრომის ტაბელის (№01-15/ნ) 100% ავტო-ვალიდაცია' : locale === 'ru' ? '100% авто-валидация табелей труда' : '100% Turnstile Labor Compliance',
            source: 'IoT Socket Stream',
            sourceIcon: Zap,
            sourceColor: '#00e5ff',
            current: '100%',
            target: '100%',
            progress: 100,
            status: 'ON_TRACK'
          }
        ]
      },
      coach: {
        title: locale === 'ka' ? 'პერსონალური ტრენინგები & რისკების პრევენცია' : locale === 'ru' ? 'Персональные тренировки и удержание клиентов' : 'Personal Training Quotas & At-Risk Retention',
        quarter: 'Q3 2026',
        daysLeft: 28,
        overallProgress: 76,
        status: 'AT_RISK',
        krs: [
          {
            id: 'kr-c1',
            title: locale === 'ka' ? 'High-Risk კლიენტების 80%-თან პირდაპირი კონტაქტი' : locale === 'ru' ? 'Контакт с 80% клиентов из группы риска' : 'Engage 80% High-Risk Members',
            source: 'Churn AI Engine',
            sourceIcon: ShieldAlert,
            sourceColor: '#FF5757',
            current: '64%',
            target: '80%',
            progress: 80,
            status: 'ON_TRACK'
          },
          {
            id: 'kr-c2',
            title: locale === 'ka' ? 'პერსონალური ვარჯიშების პაკეტების გაყიდვა (+30%)' : locale === 'ru' ? 'Продажи пакетов тренировок (+30%)' : 'Personal Training Sales (+30%)',
            source: 'Sales Engine',
            sourceIcon: TrendingUp,
            sourceColor: '#00A3FF',
            current: '+22%',
            target: '+30%',
            progress: 73,
            status: 'AT_RISK'
          },
          {
            id: 'kr-c3',
            title: locale === 'ka' ? 'კლიენტთა კმაყოფილების რეიტინგი > 4.9/5.0' : locale === 'ru' ? 'Рейтинг удовлетворенности клиентов > 4.9/5.0' : 'Client Satisfaction Rating > 4.9/5.0',
            source: 'Athlete App Feedback',
            sourceIcon: Award,
            sourceColor: '#00ff87',
            current: '4.92',
            target: '4.90',
            progress: 100,
            status: 'ON_TRACK'
          }
        ]
      }
    };
  }, [locale]);

  const currentOkr = okrData[selectedRole];

  return (
    <div className="space-y-8 flex-grow">
      {/* Top Header Row with Role Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
            <Target className="w-5 h-5 text-[#00A3FF]" />
            {t('analytics_okr_title') || '🎯 OKR Engine (მიზნებისა და საკვანძო შედეგების მართვა)'}
          </h3>
          <p className="text-xs text-[#94A3B8]">
            {t('analytics_okr_subtitle') || 'გარდაქმენით ანალიტიკური მონაცემები გუნდის გაზომვად მიზნებად და რეალურ შედეგებად'}
          </p>
        </div>

        {/* Role Selector Tabs */}
        <div className="flex p-0.5 bg-[#121722] border border-white/5 rounded-xl self-start sm:self-auto">
          {(['director', 'manager', 'coach'] as const).map((role) => {
            const isSelected = selectedRole === role;
            let roleLabel = '';
            if (role === 'director') roleLabel = locale === 'ka' ? '👑 დირექტორი' : locale === 'ru' ? '👑 Директор' : '👑 Director';
            if (role === 'manager') roleLabel = locale === 'ka' ? '📋 მენეჯერი' : locale === 'ru' ? '📋 Менеджер' : '📋 Manager';
            if (role === 'coach') roleLabel = locale === 'ka' ? '🏋️‍♂️ მწვრთნელი' : locale === 'ru' ? '🏋️‍♂️ Тренер' : '🏋️‍♂️ Coach';

            return (
              <button
                key={role}
                onClick={() => setSelectedRole(role)}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold tracking-wider uppercase transition cursor-pointer relative overflow-hidden ${
                  isSelected ? 'text-white' : 'text-[#64748B] hover:text-white'
                }`}
                style={{ minHeight: '32px' }}
              >
                <span className="relative z-10">{roleLabel}</span>
                {isSelected && (
                  <motion.div
                    layoutId="okrRoleToggleBg"
                    className="absolute inset-0 bg-[#00A3FF]/20 border border-[#00A3FF]/40 rounded-lg -z-0"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Objective Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedRole}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="space-y-6"
        >
          {/* Top Objective Progress Banner */}
          <div className="p-5 rounded-2xl bg-[#0d121d]/80 border border-white/10 backdrop-blur-md relative overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#00A3FF]/20 text-[#00A3FF] border border-[#00A3FF]/30 uppercase">
                    Objective • {currentOkr.quarter}
                  </span>
                  <span className="text-[10px] font-mono text-[#94A3B8]">
                    ⏳ {currentOkr.daysLeft} {locale === 'ka' ? 'დღე დარჩენილი' : locale === 'ru' ? 'дней осталось' : 'days left'}
                  </span>
                </div>
                <h4 className="text-base md:text-lg font-bold text-white tracking-wide">
                  {currentOkr.title}
                </h4>
              </div>

              <div className="flex items-center gap-3 self-start md:self-auto">
                <div className="text-right">
                  <div className="text-xs text-[#94A3B8] font-mono uppercase">
                    {locale === 'ka' ? 'საერთო პროგრესი' : locale === 'ru' ? 'Общий прогресс' : 'Overall Goal'}
                  </div>
                  <div className="text-xl font-black text-white font-mono flex items-center gap-1 justify-end">
                    <span className="text-[#00A3FF]">{currentOkr.overallProgress}%</span>
                  </div>
                </div>
                <span className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold uppercase border ${
                  currentOkr.status === 'ON_TRACK'
                    ? 'bg-[#00ff87]/15 text-[#00ff87] border-[#00ff87]/30'
                    : 'bg-amber-400/15 text-amber-400 border-amber-400/30'
                }`}>
                  {currentOkr.status === 'ON_TRACK' ? '🟢 ON TRACK' : '🟡 AT RISK'}
                </span>
              </div>
            </div>

            {/* Global Progress Bar */}
            <div className="w-full bg-[#121722] rounded-full h-2.5 overflow-hidden border border-white/5">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${currentOkr.overallProgress}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="h-full rounded-full bg-gradient-to-r from-[#00A3FF] via-[#00e5ff] to-[#00ff87]"
              />
            </div>
          </div>

          {/* Key Results Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {currentOkr.krs.map((kr, idx) => {
              const SourceIcon = kr.sourceIcon;
              return (
                <TiltSpotlightCard
                  key={kr.id}
                  className="p-5 rounded-2xl bg-[#090D14]/90 border border-white/5 hover:border-white/15 transition-all flex flex-col justify-between"
                  spotlightColor={`${kr.sourceColor}15`}
                >
                  <div>
                    {/* Source Badge */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span 
                        className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase border"
                        style={{
                          backgroundColor: `${kr.sourceColor}15`,
                          borderColor: `${kr.sourceColor}30`,
                          color: kr.sourceColor
                        }}
                      >
                        <SourceIcon className="w-3 h-3" />
                        {kr.source}
                      </span>
                      <span className="text-[10px] font-mono text-[#64748B]">KR #{idx + 1}</span>
                    </div>

                    <p className="text-xs font-semibold text-white/90 mb-4 line-clamp-2 leading-relaxed">
                      {kr.title}
                    </p>
                  </div>

                  <div>
                    {/* Current vs Target */}
                    <div className="flex items-baseline justify-between text-xs mb-2">
                      <span className="text-[#94A3B8] font-mono">
                        {locale === 'ka' ? 'მიმდინარე:' : locale === 'ru' ? 'Факт:' : 'Current:'} <strong className="text-white font-bold">{kr.current}</strong>
                      </span>
                      <span className="text-[#64748B] font-mono">
                        {locale === 'ka' ? 'მიზანი:' : locale === 'ru' ? 'Цель:' : 'Target:'} <span className="text-[#00A3FF]">{kr.target}</span>
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-[#121722] rounded-full h-1.5 overflow-hidden border border-white/5 mb-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${kr.progress}%` }}
                        transition={{ duration: 0.6, delay: idx * 0.1 }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: kr.sourceColor }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-[10px] font-mono">
                      <span className="text-[#64748B]">{kr.progress}% {locale === 'ka' ? 'შესრულება' : locale === 'ru' ? 'выполнено' : 'achieved'}</span>
                      <span className={kr.status === 'ON_TRACK' ? 'text-[#00ff87]' : 'text-amber-400'}>
                        {kr.status === 'ON_TRACK' ? '✓ On Track' : '⚠️ Action Req.'}
                      </span>
                    </div>
                  </div>
                </TiltSpotlightCard>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Strategic Synergy Footer Note */}
      <div className="p-4 rounded-xl bg-[#00A3FF]/5 border border-[#00A3FF]/15 text-xs text-[#94A3B8] flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#00A3FF] shrink-0" />
          <span>
            {t('analytics_okr_bullet2') || 'Key Results პროგრესი რეალურ დროში ითვლება KPI, Churn, Win-back და Market ანალიტიკიდან.'}
          </span>
        </div>
        <span className="text-[10px] font-mono text-[#00A3FF] bg-[#00A3FF]/10 px-2 py-1 rounded-md border border-[#00A3FF]/20 shrink-0">
          ● REAL-TIME TELEMETRY SYNC
        </span>
      </div>
    </div>
  );
};
