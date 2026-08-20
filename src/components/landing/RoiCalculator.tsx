'use client';

import React, { useState, useMemo } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Users, Coins, Clock, TrendingUp, ShieldAlert, ArrowRight } from 'lucide-react';
import { RoiSliderControl } from './roi/RoiSliderControl';
import { RoiMetricResultCard } from './roi/RoiMetricResultCard';
import { RoiChart } from './RoiChart';
import Link from 'next/link';

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

  const formatCurrency = (val: number) => {
    const formatted = val.toLocaleString();
    return currency.formatBefore ? `${currency.symbol}${formatted}` : `${formatted} ${currency.symbol}`;
  };

  return (
    <section id="roi-calculator" className="py-24 sm:py-32 bg-[#080B10] border-t border-white/[0.06] relative overflow-hidden">
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
            <div className="p-6 rounded-2xl bg-gradient-to-br from-cyan-950/40 via-[#0F141C] to-slate-900 border border-cyan-500/30">
              <div className="flex items-center justify-between text-xs font-mono text-cyan-400 mb-2">
                <span>ESTIMATED NET MONTHLY GAIN</span>
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight mb-2">
                +{formatCurrency(totalMonthlyGain)} <span className="text-xs text-slate-400 font-normal font-sans">/ თვეში</span>
              </div>
              <p className="text-xs text-slate-400 font-light">
                {locale === 'ka'
                  ? `წლიური დამატებითი მოგება და დაზოგვა: +${formatCurrency(totalMonthlyGain * 12)}`
                  : locale === 'ru'
                  ? `Годовая дополнительная выгода и экономия: +${formatCurrency(totalMonthlyGain * 12)}`
                  : `Projected annual additional value: +${formatCurrency(totalMonthlyGain * 12)}`}
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
                value={`+${formatCurrency(churnRecoveredGain)}`}
                subtext={locale === 'ka' ? 'დაკარგული და პასიური წევრების დაბრუნებით' : locale === 'ru' ? 'За счет реактивации ушедших клиентов' : 'From AI automated member retention'}
                accent="#10B981"
              />

              <RoiMetricResultCard
                icon={Clock}
                code="METRIC_02"
                label={locale === 'ka' ? 'შრომის დროის დაზოგვა' : locale === 'ru' ? 'Экономия рабочего времени' : 'Labor Time Saved'}
                value={`${monthlyLaborHoursSaved} სთ`}
                subtext={locale === 'ka' ? `დაზოგილი ხელფასის ექვივალენტი: ${formatCurrency(laborCostSavings)}` : locale === 'ru' ? `Эквивалент экономии: ${formatCurrency(laborCostSavings)}` : `Labor cost equivalent: ${formatCurrency(laborCostSavings)}`}
                accent="#00A3FF"
              />
            </div>

            {/* Embedded Visual Chart */}
            <div className="p-6 rounded-2xl bg-[#0F141C] border border-white/[0.08]">
              <RoiChart
                revenueIncrease={totalMonthlyGain * 12}
                maxRev={monthlyRevenue * 12 || 100000}
                locale={locale}
              />
            </div>

            {/* CTA Link */}
            <Link
              href="#booking-engine"
              className="w-full py-4 rounded-xl bg-[#0F141C] border border-cyan-500/30 hover:border-cyan-400 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all hover:shadow-[0_0_25px_rgba(0,163,255,0.2)]"
            >
              <span>{locale === 'ka' ? 'მოითხოვეთ პერსონალური ფინანსური აუდიტი' : locale === 'ru' ? 'Запросить персональный финансовый аудит' : 'Request Custom Financial Audit'}</span>
              <ArrowRight className="w-4 h-4 text-cyan-400" />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};
