'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { TrendingUp } from 'lucide-react';

export const MultiBranchCrm: React.FC = () => {
  const { t } = useLanguage();
  const [currency, setCurrency] = useState<'GEL' | 'USD' | 'EUR'>('GEL');

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

  return (
    <div className="space-y-4 flex-grow flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <div className="text-xs font-bold text-white flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-[#00FF87]" />
          <span>{t('dashboardFeatures_fin_revenue')}</span>
        </div>
        
        {/* Currency Swapper */}
        <div className="flex bg-white/5 border border-white/10 p-0.5 rounded-lg">
          {(['GEL', 'USD', 'EUR'] as const).map((curr) => (
            <button
              key={curr}
              onClick={() => setCurrency(curr)}
              className={`text-[9px] font-mono font-bold px-2.5 py-1 rounded cursor-pointer ${
                currency === curr 
                  ? 'bg-gradient-to-r from-[#00C853] to-[#00ff87] text-white' 
                  : 'text-[#94A3B8] hover:text-white'
              }`}
              style={{ minHeight: '24px' }}
            >
              {curr === 'GEL' ? '₾' : curr === 'USD' ? '$' : '€'}
            </button>
          ))}
        </div>
      </div>

      {/* Chart & Split view */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch flex-grow">
        
        {/* Left: SVG Revenue mini wave */}
        <div className="bg-black/30 border border-white/5 rounded-xl p-4 md:col-span-7 flex flex-col justify-between relative overflow-hidden">
          <div>
            <div className="text-[10px] text-[#94A3B8] uppercase font-bold tracking-wider">{t('dashboardFeatures_fin_revenue')}</div>
            <div className="text-xl font-black text-white mt-1">
              {getCurrencySymbol()} {convertValue(24850).toLocaleString()}
            </div>
          </div>

          {/* SVG Chart Wave */}
          <div className="h-24 w-full relative mt-3">
            <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
              <defs>
                <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00ff87" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#00ff87" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <path
                d="M 0 40 L 0 25 Q 15 28 30 18 T 60 10 T 80 15 T 100 8 L 100 40 Z"
                fill="url(#chartGlow)"
              />
              <path
                d="M 0 25 Q 15 28 30 18 T 60 10 T 80 15 T 100 8"
                fill="none"
                stroke="#00ff87"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        {/* Right: Branches Split list */}
        <div className="bg-black/30 border border-white/5 rounded-xl p-4 md:col-span-5 flex flex-col justify-between">
          <div className="text-[10px] text-[#94A3B8] uppercase font-bold tracking-wider mb-2">{t('dashboardFeatures_fin_branches')}</div>
          
          <div className="space-y-2 text-[10px] md:text-xs">
            <div className="flex flex-col gap-1">
              <div className="flex justify-between text-white font-semibold">
                <span>{t('dashboardFeatures_fin_branch_tb')}</span>
                <span>{getCurrencySymbol()} {convertValue(13667).toLocaleString()}</span>
              </div>
              <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#00ff87] h-full" style={{ width: '55%' }}></div>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex justify-between text-white font-semibold">
                <span>{t('dashboardFeatures_fin_branch_bt')}</span>
                <span>{getCurrencySymbol()} {convertValue(6212).toLocaleString()}</span>
              </div>
              <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#00FF87] h-full" style={{ width: '25%' }}></div>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex justify-between text-white font-semibold">
                <span>{t('dashboardFeatures_fin_branch_kt')}</span>
                <span>{getCurrencySymbol()} {convertValue(4970).toLocaleString()}</span>
              </div>
              <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#00C853] h-full" style={{ width: '20%' }}></div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
