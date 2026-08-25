'use client';

import React, { useState, useMemo } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Users, Coins, Clock, TrendingUp, ShieldAlert, ArrowRight, Zap, Sparkles } from 'lucide-react';
import { RoiSliderControl } from './roi/RoiSliderControl';
import { RoiMetricResultCard } from './roi/RoiMetricResultCard';
import { RoiChart } from './RoiChart';
import { AnimatedNumber } from '@/components/ui/AnimatedNumber';
import Link from 'next/link';
import { soundEngine } from '@/core';

export const RoiCalculator: React.FC = () => {
  const { locale, t } = useLanguage();
  const [members, setMembers] = useState<number>(850);
  const [staff, setStaff] = useState<number>(18);

  const currency = useMemo(() => {
    switch (locale) {
      case 'ka':
        return { symbol: '₾', rate: 120, formatBefore: false, step: 5, min: 30, max: 500, laborRate: 10, cardSavings: 0.25 };
      case 'ru':
        return { symbol: '₽', rate: 4000, formatBefore: false, step: 100, min: 1000, max: 15000, laborRate: 350, cardSavings: 12 };
      case 'en':
      default:
        return { symbol: '$', rate: 50, formatBefore: true, step: 5, min: 10, max: 200, laborRate: 15, cardSavings: 0.15 };
    }
  }, [locale]);

  const [price, setPrice] = useState<number>(currency.rate);

  // Financial ROI Calculations
  const monthlyRevenue = members * price;
  const churnRecoveredGain = Math.round(monthlyRevenue * 0.14); // 14% win-back / churn recovery
  const monthlyLaborHoursSaved = Math.round(staff * 14); // 14 hrs saved per staff via Order №01-15/n automation
  const laborCostSavings = Math.round(monthlyLaborHoursSaved * currency.laborRate);
  const physicalCardSavings = Math.round(members * currency.cardSavings);
  const totalMonthlyGain = churnRecoveredGain + laborCostSavings + physicalCardSavings;
  const growthAmplitudePct = Math.round((totalMonthlyGain / (monthlyRevenue || 1)) * 100);

  const formatCurrency = (val: number) => {
    const formatted = val.toLocaleString();
    return currency.formatBefore ? `${currency.symbol}${formatted}` : `${formatted} ${currency.symbol}`;
  };

  return (
    <section id="roi" className="py-24 sm:py-32 bg-[#080B10] border-t border-white/[0.06] relative overflow-hidden">
      {/* Studio Radial Background */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-950/30 text-cyan-400 font-mono text-xs mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>ROI FINANCIAL SIMULATOR</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            {locale === 'ka' ? 'ინვესტიციის უკუგების კალკულატორი' : locale === 'ru' ? 'Калькулятор окупаемости ROI' : 'Interactive ROI Calculator'}
          </h2>
          <p className="text-sm sm:text-base text-slate-400 font-light">
            {locale === 'ka'
              ? 'დათვალეთ, რამდენ ლარს და დროს დაუზოგავს ARTRON-ის ავტომატიზაცია თქვენს სპორტულ ობიექტს ყოველთვიურად.'
              : locale === 'ru'
              ? 'Рассчитайте, сколько средств и рабочих часов сэкономит автоматизация ARTRON вашему клубу ежемесячно.'
              : 'Estimate exact monthly financial return and operational hours saved by automating with ARTRON.'}
          </p>
        </div>

        {/* 2-Column Grid: Sliders Left, Calculated Results Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Sliders (6 Cols) */}
          <div className="lg:col-span-6 space-y-4">
            <RoiSliderControl
              id="members-slider"
              icon={Users}
              label={locale === 'ka' ? 'აქტიური წევრების რაოდენობა' : locale === 'ru' ? 'Количество активных членов' : 'Active Members'}
              valueText={`${members.toLocaleString()}`}
              min={50}
              max={5000}
              step={50}
              value={members}
              onChange={setMembers}
              accentColor="#00A3FF"
            />

            <RoiSliderControl
              id="price-slider"
              icon={Coins}
              label={locale === 'ka' ? 'საშუალო აბონემენტის ფასი / თვე' : locale === 'ru' ? 'Средняя цена абонемента / мес' : 'Average Membership / Month'}
              valueText={formatCurrency(price)}
              min={currency.min}
              max={currency.max}
              step={currency.step}
              value={price}
              onChange={setPrice}
              accentColor="#00A3FF"
            />

            <RoiSliderControl
              id="staff-slider"
              icon={Clock}
              label={locale === 'ka' ? 'პერსონალის რაოდენობა (მწვრთნელები/ადმინი)' : locale === 'ru' ? 'Штат сотрудников (тренеры/админ)' : 'Staff & Trainers Count'}
              valueText={`${staff}`}
              min={2}
              max={150}
              step={1}
              value={staff}
              onChange={setStaff}
              accentColor="#00A3FF"
            />

            {/* Monthly Net ROI Highlight Box */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-cyan-950/40 via-[#05070a] to-[#0E1726] border border-cyan-500/30 shadow-[0_0_30px_rgba(0,163,255,0.1)] relative overflow-hidden backdrop-blur-xl">
              {/* L-Shape Corner Brackets */}
              <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-cyan-400/40" />
              <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-cyan-400/40" />
              <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 border-cyan-400/40" />
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-cyan-400/40" />

              <div className="flex items-center justify-between text-xs font-mono text-cyan-400 mb-2">
                <span className="flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-cyan-400" />
                  <span>ESTIMATED NET MONTHLY GAIN</span>
                </span>
                <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30 text-[10px]">
                  +{growthAmplitudePct}% GROWTH
                </span>
              </div>
              <div data-testid="roi-total-gain" className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight mb-2 flex items-baseline gap-1">
                <span>+</span>
                <AnimatedNumber
                  value={totalMonthlyGain}
                  prefix={currency.formatBefore ? currency.symbol : ''}
                  suffix={currency.formatBefore ? '' : ` ${currency.symbol}`}
                  duration={600}
                />
                <span className="text-xs text-slate-400 font-normal font-sans ml-1">/ თვეში</span>
              </div>
              <p className="text-xs text-slate-400 font-light flex items-center gap-1">
                <span>{locale === 'ka' ? 'წლიური დამატებითი მოგება:' : locale === 'ru' ? 'Годовая выгода:' : 'Projected annual value:'}</span>
                <span className="text-cyan-300 font-bold font-mono">
                  +<AnimatedNumber
                    value={totalMonthlyGain * 12}
                    prefix={currency.formatBefore ? currency.symbol : ''}
                    suffix={currency.formatBefore ? '' : ` ${currency.symbol}`}
                    duration={600}
                  />
                </span>
              </p>
            </div>
          </div>

          {/* Right Column: Breakdown Cards & Visual Chart (6 Cols) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <RoiMetricResultCard
                icon={TrendingUp}
                code="METRIC_01"
                label={locale === 'ka' ? 'Win-back & Churn მოგება' : locale === 'ru' ? 'Доход от Win-back и оттока' : 'Win-Back Recovery'}
                numericValue={churnRecoveredGain}
                prefix={currency.formatBefore ? `+${currency.symbol}` : '+'}
                suffix={currency.formatBefore ? '' : ` ${currency.symbol}`}
                growthAmplitude="+14% LTV"
                subtext={locale === 'ka' ? 'დაკარგული და პასიური წევრების დაბრუნებით' : locale === 'ru' ? 'За счет реактивации ушедших клиентов' : 'From AI automated member retention'}
                accent="#10B981"
              />

              <RoiMetricResultCard
                icon={Clock}
                code="METRIC_02"
                label={locale === 'ka' ? 'შრომის დროის დაზოგვა' : locale === 'ru' ? 'Экономия рабочего времени' : 'Labor Time Saved'}
                numericValue={monthlyLaborHoursSaved}
                suffix=" სთ"
                growthAmplitude="№01-15/ნ"
                subtext={locale === 'ka' ? `დაზოგილი ხელფასის ექვივალენტი: ${formatCurrency(laborCostSavings)}` : locale === 'ru' ? `Эквивалент экономии: ${formatCurrency(laborCostSavings)}` : `Labor cost equivalent: ${formatCurrency(laborCostSavings)}`}
                accent="#00A3FF"
              />
            </div>

            {/* Embedded Visual Chart */}
            <div className="p-6 rounded-2xl bg-[#05070a]/90 border border-[#8a99ad]/10 backdrop-blur-xl relative overflow-hidden">
              {/* L-Shape Corner Brackets */}
              <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-cyan-500/30" />
              <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-cyan-500/30" />
              <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 border-cyan-500/30" />
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-cyan-500/30" />

              <RoiChart
                revenueIncrease={totalMonthlyGain * 12}
                maxRev={monthlyRevenue * 12 || 100000}
                locale={locale}
              />
            </div>

            {/* CTA Link to Financial Audit Studio */}
            <Link
              href={`/financial-audit?members=${members}&price=${price}&staff=${staff}`}
              onClick={() => soundEngine.playSystemAccess()}
              className="relative group block w-full p-[1.5px] rounded-2xl bg-gradient-to-r from-[#00A3FF] via-[#00E5FF] to-[#0066FF] shadow-[0_0_25px_rgba(0,163,255,0.35)] hover:shadow-[0_0_40px_rgba(0,210,255,0.6)] hover:scale-[1.015] active:scale-[0.985] transition-all duration-300 cursor-pointer overflow-hidden"
            >
              {/* Animated Light Sweep Effect */}
              <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-[350%] transition-transform duration-1000 ease-out pointer-events-none" />

              <div className="relative flex items-center justify-between gap-3 px-4 sm:px-6 py-3.5 sm:py-4 rounded-[14.5px] bg-gradient-to-r from-[#0077EE] via-[#0095FF] to-[#00B4FF] text-white">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0 border border-white/40 shadow-inner group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white animate-pulse" />
                  </div>
                  <div className="flex flex-col text-left truncate">
                    <span className="text-white font-extrabold text-xs sm:text-sm md:text-[15px] leading-snug drop-shadow-sm tracking-tight truncate">
                      {locale === 'ka' ? 'მოითხოვეთ პერსონალური ფინანსური აუდიტი' : locale === 'ru' ? 'Запросить персональный финансовый аудит' : 'Request Custom Financial Audit'}
                    </span>
                    <span className="text-cyan-100 text-[10px] sm:text-xs font-medium opacity-90 truncate">
                      {locale === 'ka' ? 'P&L დიაგნოსტიკა და სრული ფინანსური მოდელირება' : locale === 'ru' ? 'P&L диагностика и финансовое моделирование' : 'Full P&L Diagnostics & Financial Modeling'}
                    </span>
                  </div>
                </div>

                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white text-slate-950 flex items-center justify-center shrink-0 shadow-md group-hover:translate-x-1 group-hover:bg-cyan-50 group-hover:shadow-[0_0_15px_rgba(255,255,255,0.8)] transition-all duration-200">
                  <ArrowRight className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-slate-950 font-bold" />
                </div>
              </div>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};
