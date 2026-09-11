'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { TrendingUp, Calculator, Building2, Users, Coins, Sparkles } from 'lucide-react';
import { soundEngine } from '@/core';

type SubView = 'branches' | 'roi';

export const CombinedFinancialRoiSimulator: React.FC = () => {
  const { t, locale } = useLanguage();
  const [subView, setSubView] = useState<SubView>('branches');
  const [currency, setCurrency] = useState<'GEL' | 'USD' | 'EUR'>('GEL');

  // ROI Calculator states
  const [members, setMembers] = useState<number>(650);
  const [subscriptionPrice, setSubscriptionPrice] = useState<number>(120);

  const getCurrencySymbol = () => {
    if (currency === 'GEL') return '₾';
    if (currency === 'USD') return '$';
    return '€';
  };

  const convertValue = (valGEL: number) => {
    if (currency === 'GEL') return valGEL;
    if (currency === 'USD') return Math.round(valGEL * 0.37);
    return Math.round(valGEL * 0.34);
  };

  // ROI calculation formulas
  const monthlyRevenue = members * subscriptionPrice;
  const churnRecoveredGain = Math.round(monthlyRevenue * 0.14); // 14% win-back
  const laborHoursSaved = Math.round((members / 40) * 12); // labor hours saved via automation
  const laborCostSavings = Math.round(laborHoursSaved * 12);
  const totalMonthlyGain = churnRecoveredGain + laborCostSavings;
  const growthAmplitudePct = Math.round((totalMonthlyGain / (monthlyRevenue || 1)) * 100);

  const handleSubViewChange = (view: SubView) => {
    soundEngine.playPulseNode();
    setSubView(view);
  };

  return (
    <div className="space-y-4 flex-grow flex flex-col justify-between select-none">
      {/* Top Header: Sub-view Switcher & Currency selector */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-white/10">
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-black/40 border border-white/10">
          <button
            type="button"
            onClick={() => handleSubViewChange('branches')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              subView === 'branches'
                ? 'bg-[#00ff87]/20 border border-[#00ff87]/40 text-[#00ff87] shadow-[0_0_12px_rgba(0,255,135,0.2)]'
                : 'text-[#94A3B8] hover:text-white'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>{locale === 'ka' ? 'ფილიალები & შემოსავალი' : locale === 'ru' ? 'Филиалы и выручка' : 'Branches & Revenue'}</span>
          </button>

          <button
            type="button"
            onClick={() => handleSubViewChange('roi')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              subView === 'roi'
                ? 'bg-[#00A3FF]/20 border border-[#00A3FF]/40 text-[#00A3FF] shadow-[0_0_12px_rgba(0,163,255,0.2)]'
                : 'text-[#94A3B8] hover:text-white'
            }`}
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>{locale === 'ka' ? 'ROI & დანაზოგის კალკულატორი' : locale === 'ru' ? 'Калькулятор ROI' : 'ROI & Savings Calculator'}</span>
          </button>
        </div>

        {/* Currency Switcher */}
        <div className="flex bg-white/5 border border-white/10 p-0.5 rounded-lg">
          {(['GEL', 'USD', 'EUR'] as const).map((curr) => (
            <button
              key={curr}
              onClick={() => {
                soundEngine.playPulseNode();
                setCurrency(curr);
              }}
              className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded cursor-pointer transition-colors ${
                currency === curr 
                  ? 'bg-gradient-to-r from-[#00C853] to-[#00ff87] text-white font-black' 
                  : 'text-[#94A3B8] hover:text-white'
              }`}
            >
              {curr === 'GEL' ? '₾' : curr === 'USD' ? '$' : '€'}
            </button>
          ))}
        </div>
      </div>

      {/* SubView 1: Branches & Multi-Branch Revenue */}
      {subView === 'branches' && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch flex-grow">
          {/* Left: SVG Revenue Wave */}
          <div className="bg-black/30 border border-white/5 rounded-xl p-4 md:col-span-7 flex flex-col justify-between relative overflow-hidden">
            <div>
              <div className="flex items-center justify-between text-[10px] text-[#94A3B8] uppercase font-bold tracking-wider">
                <span>{t('dashboardFeatures_fin_revenue')}</span>
                <span className="text-emerald-400 font-mono flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> +24.8%
                </span>
              </div>
              <div className="text-2xl font-black text-white mt-1">
                {getCurrencySymbol()} {convertValue(38450).toLocaleString()}
              </div>
            </div>

            {/* SVG Chart Wave */}
            <div className="h-24 w-full relative mt-3">
              <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="finChartGlow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00ff87" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#00ff87" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path 
                  d="M0,35 Q15,28 30,22 T60,18 T85,8 T100,5 L100,40 L0,40 Z" 
                  fill="url(#finChartGlow)" 
                />
                <path 
                  d="M0,35 Q15,28 30,22 T60,18 T85,8 T100,5" 
                  fill="none" 
                  stroke="#00ff87" 
                  strokeWidth="2.5" 
                />
                <circle cx="100" cy="5" r="3.5" fill="#00ff87" className="animate-pulse" />
              </svg>
            </div>

            <div className="flex justify-between text-[9px] text-[#94A3B8] font-mono mt-1 border-t border-white/5 pt-1">
              <span>ორშ</span>
              <span>სამ</span>
              <span>ოთხ</span>
              <span>ხუთ</span>
              <span>პარ</span>
              <span>შაბ</span>
              <span>კვი</span>
            </div>
          </div>

          {/* Right: Branch Cards */}
          <div className="md:col-span-5 flex flex-col justify-between space-y-2">
            <div className="text-[10px] text-[#94A3B8] font-bold uppercase tracking-wider">
              {t('dashboardFeatures_fin_branches')}
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-lg p-2.5 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-white">{t('dashboardFeatures_fin_branch_tb')}</div>
                <div className="text-[9px] text-emerald-400 font-mono">1,240 {locale === 'ka' ? 'აქტიური' : 'active'}</div>
              </div>
              <div className="text-xs font-mono font-bold text-white">
                {getCurrencySymbol()} {convertValue(18900).toLocaleString()}
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-2.5 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-white">{t('dashboardFeatures_fin_branch_bt')}</div>
                <div className="text-[9px] text-cyan-400 font-mono">820 {locale === 'ka' ? 'აქტიური' : 'active'}</div>
              </div>
              <div className="text-xs font-mono font-bold text-white">
                {getCurrencySymbol()} {convertValue(12350).toLocaleString()}
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-2.5 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-white">{t('dashboardFeatures_fin_branch_kt')}</div>
                <div className="text-[9px] text-purple-400 font-mono">510 {locale === 'ka' ? 'აქტიური' : 'active'}</div>
              </div>
              <div className="text-xs font-mono font-bold text-white">
                {getCurrencySymbol()} {convertValue(7200).toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SubView 2: ROI & Savings Calculator */}
      {subView === 'roi' && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch flex-grow">
          {/* Sliders Column */}
          <div className="md:col-span-6 space-y-3 bg-black/30 border border-white/5 rounded-xl p-4 flex flex-col justify-between">
            {/* Slider 1: Members */}
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-200 mb-1">
                <span className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-[#00A3FF]" />
                  {locale === 'ka' ? 'აქტიური წევრები' : locale === 'ru' ? 'Активные члены' : 'Active Members'}
                </span>
                <span className="font-mono text-[#00A3FF] text-sm">{members}</span>
              </div>
              <input
                type="range"
                min={50}
                max={2500}
                step={25}
                value={members}
                onChange={(e) => setMembers(Number(e.target.value))}
                className="w-full accent-[#00A3FF] h-1.5 bg-white/10 rounded-lg cursor-pointer"
              />
            </div>

            {/* Slider 2: Price */}
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-200 mb-1">
                <span className="flex items-center gap-1.5">
                  <Coins className="w-3.5 h-3.5 text-emerald-400" />
                  {locale === 'ka' ? 'საშუალო ტარიფი / თვე' : locale === 'ru' ? 'Тариф / месяц' : 'Avg Monthly Price'}
                </span>
                <span className="font-mono text-emerald-400 text-sm">
                  {getCurrencySymbol()} {convertValue(subscriptionPrice)}
                </span>
              </div>
              <input
                type="range"
                min={30}
                max={400}
                step={10}
                value={subscriptionPrice}
                onChange={(e) => setSubscriptionPrice(Number(e.target.value))}
                className="w-full accent-emerald-400 h-1.5 bg-white/10 rounded-lg cursor-pointer"
              />
            </div>

            {/* Mini Stat Summary */}
            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-gray-400 font-mono">
              <span>{locale === 'ka' ? 'თვიური ბრუნვა:' : 'Monthly GMV:'}</span>
              <span className="text-white font-bold">
                {getCurrencySymbol()} {convertValue(monthlyRevenue).toLocaleString()}
              </span>
            </div>
          </div>

          {/* Results Column */}
          <div className="md:col-span-6 flex flex-col justify-between space-y-2 bg-[#00ff87]/5 border border-[#00ff87]/20 rounded-xl p-4 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#00ff87] font-bold flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                {locale === 'ka' ? 'პროგნოზირებული სარგებელი' : 'Projected Value Gain'}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#00ff87]/20 border border-[#00ff87]/40 text-[#00ff87] font-mono text-[10px] font-black">
                +{growthAmplitudePct}% ROI
              </span>
            </div>

            <div className="my-1">
              <div className="text-2xl font-black text-white font-mono">
                +{getCurrencySymbol()} {convertValue(totalMonthlyGain).toLocaleString()}
                <span className="text-xs text-gray-400 font-normal"> / {locale === 'ka' ? 'თვეში' : 'mo'}</span>
              </div>
              <p className="text-[10px] text-gray-300 mt-0.5">
                {locale === 'ka' 
                  ? 'გადინების (Churn) 14%-იანი აღდგენა და შრომის 120+ საათის დაზოგვა.' 
                  : '14% Churn Win-Back + 120+ hours saved on labor timesheets.'}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10 text-[10px] font-mono">
              <div className="p-2 rounded bg-black/40 border border-white/5">
                <div className="text-gray-400">{locale === 'ka' ? 'Churn დაბრუნება' : 'Churn Saved'}</div>
                <div className="text-emerald-400 font-bold mt-0.5">+{getCurrencySymbol()} {convertValue(churnRecoveredGain).toLocaleString()}</div>
              </div>
              <div className="p-2 rounded bg-black/40 border border-white/5">
                <div className="text-gray-400">{locale === 'ka' ? 'შრომის ეკონომია' : 'Labor Saved'}</div>
                <div className="text-cyan-400 font-bold mt-0.5">+{laborHoursSaved} {locale === 'ka' ? 'სთ' : 'hrs'}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
