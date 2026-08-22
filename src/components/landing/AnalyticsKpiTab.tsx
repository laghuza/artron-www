import React, { useState, useMemo } from 'react';
import { TrendingUp, Users, DollarSign, Target, Award, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { TiltSpotlightCard } from '@/components/ui/TiltSpotlightCard';

interface AnalyticsKpiTabProps {
  t: (key: string) => string;
  locale: string;
}

export const AnalyticsKpiTab: React.FC<AnalyticsKpiTabProps> = ({ t, locale }) => {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('monthly');

  // Memoized premium KPI metrics calculations
  const multiplier = billingPeriod === 'annual' ? 12 : 1;
  const currencySymbol = useMemo(() => (locale === 'ru' ? '₽' : locale === 'ka' ? '₾' : '$'), [locale]);
  
  const mrrValue = useMemo(() => (locale === 'ru' ? 1200000 : locale === 'ka' ? 36000 : 15000), [locale]);
  const cacValue = useMemo(() => (locale === 'ru' ? 4500 : locale === 'ka' ? 120 : 50), [locale]);
  const ltvValue = useMemo(() => (locale === 'ru' ? 48000 : locale === 'ka' ? 1440 : 600), [locale]);

  const formatValue = useMemo(() => {
    return (val: number) => val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }, []);

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.06
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        type: 'spring' as const, 
        stiffness: 180, 
        damping: 18 
      } 
    }
  };

  return (
    <div className="space-y-8 flex-grow">
      {/* Top Header Row with Monthly/Annual toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
            <Target className="w-5 h-5 text-[#00e5ff]" />
            {t('analytics_kpi_title') || (locale === 'ka' ? '📊 KPI Dashboard (ბიზნესის ჯანმრთელობის კონტროლი)' : locale === 'ru' ? '📊 Панель KPI (Контроль здоровья бизнеса)' : '📊 KPI Dashboard (Business Health Control)')}
          </h3>
          <p className="text-xs text-[#94A3B8]">
            {t('analytics_kpi_subtitle') || (locale === 'ka' ? 'რეალურ დროში ფინანსური და საოპერაციო მდგომარეობა' : locale === 'ru' ? 'Финансовые и операционные метрики в реальном времени' : 'Real-time financial and operational metrics')}
          </p>
        </div>

        {/* Toggle billing period */}
        <div className="flex p-0.5 bg-[#121722] border border-white/5 rounded-xl self-start sm:self-auto">
          <button
            onClick={() => setBillingPeriod('monthly')}
            className={`px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold tracking-wider uppercase transition cursor-pointer relative overflow-hidden ${
              billingPeriod === 'monthly' ? 'text-[#00e5ff]' : 'text-[#64748B] hover:text-white'
            }`}
            style={{ minHeight: '32px' }}
          >
            <span className="relative z-10">{locale === 'ka' ? 'ყოველთვიური' : locale === 'ru' ? 'Ежемесячно' : 'Monthly'}</span>
            {billingPeriod === 'monthly' && (
              <motion.div
                layoutId="billingToggleBg"
                className="absolute inset-0 bg-[#00e5ff]/20 border border-[#00e5ff]/30 rounded-lg -z-0"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
          </button>
          <button
            onClick={() => setBillingPeriod('annual')}
            className={`px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold tracking-wider uppercase transition cursor-pointer relative overflow-hidden ${
              billingPeriod === 'annual' ? 'text-[#00e5ff]' : 'text-[#64748B] hover:text-white'
            }`}
            style={{ minHeight: '32px' }}
          >
            <span className="relative z-10">{locale === 'ka' ? 'წლიური' : locale === 'ru' ? 'Ежегодно' : 'Annual'}</span>
            {billingPeriod === 'annual' && (
              <motion.div
                layoutId="billingToggleBg"
                className="absolute inset-0 bg-[#00e5ff]/20 border border-[#00e5ff]/30 rounded-lg -z-0"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* MRR Card */}
        <TiltSpotlightCard maxTilt={8} spotlightColor="rgba(0, 229, 255, 0.22)">
          <div className="bg-[#05070a]/85 border border-[#8a99ad]/10 backdrop-blur-xl p-5 rounded-2xl relative overflow-hidden transition-colors duration-300 group hover:border-[#00e5ff]/40 h-full flex flex-col justify-between">
            <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#00e5ff]/30" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-[#00e5ff]/30" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-[#00e5ff]/30" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#00e5ff]/30" />

            <div>
              <div className="flex justify-between items-start mb-3">
                <span className="text-[10px] font-mono text-[#64748B] uppercase tracking-wider">
                  {billingPeriod === 'monthly' ? 'MRR' : 'ARR'}
                </span>
                <span className="text-[10px] font-mono font-bold text-[#00ff87] bg-[#00ff87]/10 px-2 py-0.5 rounded flex items-center gap-0.5">
                  +14.2% <TrendingUp className="w-3 h-3" />
                </span>
              </div>
              <div className="text-2xl font-black text-white font-mono mb-1">
                {formatValue(mrrValue * multiplier)} {currencySymbol}
              </div>
            </div>
            <div className="text-[10px] text-[#94A3B8]">
              {billingPeriod === 'monthly' ? 'Monthly Recurring Revenue' : 'Annual Recurring Revenue'}
            </div>
          </div>
        </TiltSpotlightCard>

        {/* LTV Card */}
        <TiltSpotlightCard maxTilt={8} spotlightColor="rgba(0, 255, 135, 0.22)">
          <div className="bg-[#05070a]/85 border border-[#8a99ad]/10 backdrop-blur-xl p-5 rounded-2xl relative overflow-hidden transition-colors duration-300 group hover:border-[#00ff87]/40 h-full flex flex-col justify-between">
            <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#00ff87]/30" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-[#00ff87]/30" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-[#00ff87]/30" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#00ff87]/30" />

            <div>
              <div className="flex justify-between items-start mb-3">
                <span className="text-[10px] font-mono text-[#64748B] uppercase tracking-wider">LTV</span>
                <span className="text-[10px] font-mono font-bold text-[#00ff87] bg-[#00ff87]/10 px-2 py-0.5 rounded flex items-center gap-0.5">
                  +8.5% <TrendingUp className="w-3 h-3" />
                </span>
              </div>
              <div className="text-2xl font-black text-white font-mono mb-1">
                {formatValue(ltvValue)} {currencySymbol}
              </div>
            </div>
            <div className="text-[10px] text-[#94A3B8]">Customer Lifetime Value</div>
          </div>
        </TiltSpotlightCard>

        {/* CAC Card */}
        <TiltSpotlightCard maxTilt={8} spotlightColor="rgba(255, 74, 90, 0.2)">
          <div className="bg-[#05070a]/85 border border-[#8a99ad]/10 backdrop-blur-xl p-5 rounded-2xl relative overflow-hidden transition-colors duration-300 group hover:border-[#FF4A5A]/40 h-full flex flex-col justify-between">
            <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#FF4A5A]/30" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-[#FF4A5A]/30" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-[#FF4A5A]/30" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#FF4A5A]/30" />

            <div>
              <div className="flex justify-between items-start mb-3">
                <span className="text-[10px] font-mono text-[#64748B] uppercase tracking-wider">CAC</span>
                <span className="text-[10px] font-mono font-bold text-[#FF4A5A] bg-[#FF4A5A]/10 px-2 py-0.5 rounded">
                  -12.4% Optimal
                </span>
              </div>
              <div className="text-2xl font-black text-white font-mono mb-1">
                {formatValue(cacValue)} {currencySymbol}
              </div>
            </div>
            <div className="text-[10px] text-[#94A3B8]">Customer Acquisition Cost</div>
          </div>
        </TiltSpotlightCard>

        {/* Active Members Card */}
        <TiltSpotlightCard maxTilt={8} spotlightColor="rgba(0, 229, 255, 0.22)">
          <div className="bg-[#05070a]/85 border border-[#8a99ad]/10 backdrop-blur-xl p-5 rounded-2xl relative overflow-hidden transition-colors duration-300 group hover:border-[#00e5ff]/40 h-full flex flex-col justify-between">
            <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#00e5ff]/30" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-[#00e5ff]/30" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-[#00e5ff]/30" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#00e5ff]/30" />

            <div>
              <div className="flex justify-between items-start mb-3">
                <span className="text-[10px] font-mono text-[#64748B] uppercase tracking-wider">Active Members</span>
                <span className="text-[10px] font-mono font-bold text-[#00ff87] bg-[#00ff87]/10 px-2 py-0.5 rounded flex items-center gap-0.5">
                  +3.2% <TrendingUp className="w-3 h-3" />
                </span>
              </div>
              <div className="text-2xl font-black text-white font-mono mb-1">1,240</div>
            </div>
            <div className="text-[10px] text-[#94A3B8]">Net Member Growth this month</div>
          </div>
        </TiltSpotlightCard>
      </div>

      {/* Target vs. Actual Progress Meter */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, type: 'spring', stiffness: 180, damping: 20 }}
        className="p-6 rounded-2xl bg-[#05070a] border border-[#8a99ad]/10 relative overflow-hidden"
      >
        <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-[#00ff87]/5 rounded-full filter blur-xl pointer-events-none"></div>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-4">
          <div className="space-y-1">
            <div className="text-[10px] font-mono text-[#00ff87] uppercase font-bold">[ TARGET_ACHIEVEMENT_METRIC ]</div>
            <div className="text-sm font-bold text-white">
              {locale === 'ka' ? 'თვის გაყიდვების გეგმა: ₾45,000 / ₾50,000' : locale === 'ru' ? 'План продаж на месяц: 1.35М ₽ / 1.5М ₽' : 'Monthly Sales Goal: $13,500 / $15,000'}
            </div>
            <p className="text-xs text-[#94A3B8]">
              {locale === 'ka' ? 'დარჩენილია ₾5,000 მიზნის 100% შესრულებამდე (90% დასრულებულია).' : locale === 'ru' ? 'Осталось 150,000 ₽ до 100% выполнения цели (выполнено 90%).' : 'Remaining $1,500 to hit the 100% goal milestone (90% completed).'}
            </p>
          </div>
          <div className="text-[10px] font-mono font-semibold px-3 py-1 rounded bg-[#00ff87]/10 border border-[#00ff87]/20 text-[#00ff87] uppercase tracking-wider">
            90% Goal Achieved
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: '0%' }}
            animate={{ width: '90%' }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.5 }}
            className="bg-gradient-to-r from-[#00e5ff] to-[#00ff87] h-full rounded-full shadow-[0_0_8px_rgba(0,255,135,0.4)]" 
          />
        </div>
      </motion.div>
    </div>
  );
};
