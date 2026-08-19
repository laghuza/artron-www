'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Clock, 
  Coins, 
  Sparkles, 
  Users,
  ChevronRight,
  Info
} from 'lucide-react';
import { RoiChart } from './RoiChart';

interface AnimatedNumberProps {
  value: number;
  format: (val: number) => string;
}

// 60 FPS dynamic numerical count-up helper component for real-time HUD slider feel
const AnimatedNumber: React.FC<AnimatedNumberProps> = ({ value, format }) => {
  const [displayValue, setDisplayValue] = useState(value);
  const prevValueRef = useRef(value);

  useEffect(() => {
    let start = prevValueRef.current;
    const end = value;
    if (start === end) {
      setDisplayValue(end);
      return;
    }

    const duration = 400; // ms
    const startTime = performance.now();
    let animationFrameId: number;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Easing: easeOutCubic
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const currentVal = Math.round(start + (end - start) * easedProgress);
      setDisplayValue(currentVal);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        prevValueRef.current = end;
      }
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [value]);

  return <>{format(displayValue)}</>;
};

export const RoiCalculator: React.FC = () => {
  const { locale, t } = useLanguage();
  const [members, setMembers] = useState<number>(1000);
  const [staff, setStaff] = useState<number>(20);

  // Currency configuration based on active locale - memoized to prevent recreation
  const currency = useMemo(() => {
    switch (locale) {
      case 'ka':
        return { symbol: '₾', rate: 120, formatBefore: false, step: 5, min: 30, max: 500, laborRate: 8, cardSavings: 0.2 };
      case 'ru':
        return { symbol: '₽', rate: 4000, formatBefore: false, step: 100, min: 1000, max: 15000, laborRate: 300, cardSavings: 10 };
      case 'en':
      default:
        return { symbol: '$', rate: 50, formatBefore: true, step: 5, min: 10, max: 200, laborRate: 15, cardSavings: 0.1 };
    }
  }, [locale]);

  const [price, setPrice] = useState<number>(currency.rate);
  const [prevLocale, setPrevLocale] = useState<string>(locale);

  // Reset price slider value when locale changes
  if (locale !== prevLocale) {
    setPrevLocale(locale);
    setPrice(currency.rate);
  }

  // Compute calculated metrics - memoized to ensure zero redundant performance cost
  const timeSaved = useMemo(() => {
    return Math.round((members * 0.25) + (staff * 4));
  }, [members, staff]);

  const revenueIncrease = useMemo(() => {
    return Math.round(members * 0.05 * price * 12);
  }, [members, price]);

  const overheadSavings = useMemo(() => {
    return Math.round((timeSaved * currency.laborRate) + (members * currency.cardSavings));
  }, [timeSaved, currency.laborRate, currency.cardSavings, members]);

  const formatNumber = useMemo(() => {
    return (num: number) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }, []);

  const formatCurrency = useMemo(() => {
    return (amount: number) => {
      const formatted = formatNumber(amount);
      return currency.formatBefore 
        ? `${currency.symbol}${formatted}` 
        : `${formatted} ${currency.symbol}`;
    };
  }, [currency]);

  return (
    <section id="roi" className="py-20 px-4 md:px-8 bg-[#0B0F17] bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-[#121b2d]/50 via-[#0B0F17] to-[#080b11] relative overflow-hidden border-b border-white/5">
      {/* Decorative background grid */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[linear-gradient(to_right,#00A3FF_1px,transparent_1px),linear-gradient(to_bottom,#00A3FF_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_100%,#000_70%,transparent_100%)]"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#00ff87]/10 border border-[#00ff87]/20 text-xs font-bold text-[#00ff87] mb-4 tracking-wide shadow-sm shadow-[#00ff87]/10">
            <Sparkles className="w-3.5 h-3.5" />
            <span>
              {locale === 'ka' ? 'ფინანსური კალკულატორი' : locale === 'ru' ? 'Калькулятор окупаемости' : 'Financial & ROI Calculator'}
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-4">
            {t('roi_title')}
          </h2>
          <p className="text-[#94A3B8] text-base md:text-lg font-medium">
            {t('roi_subtitle')}
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* Sliders Card (Left Column) */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
            className="lg:col-span-5 bg-[#05070a]/85 border border-[#8a99ad]/20 hover:border-[#00ff87]/30 backdrop-blur-xl rounded-3xl p-8 flex flex-col justify-between shadow-2xl hover:shadow-[0_0_50px_rgba(0,255,135,0.04)] relative overflow-hidden group transition-all duration-500"
          >
            {/* L-Shape Corner Brackets */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#00ff87]/30" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#00ff87]/30" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#00ff87]/30" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#00ff87]/30" />

            {/* Terminal corner brackets */}
            <div className="absolute top-2 left-2 text-[#00ff87]/30 font-mono text-[9px] pointer-events-none select-none">┌</div>
            <div className="absolute top-2 right-2 text-[#00ff87]/30 font-mono text-[9px] pointer-events-none select-none">┐</div>
            <div className="absolute bottom-2 left-2 text-[#00ff87]/30 font-mono text-[9px] pointer-events-none select-none">└</div>
            <div className="absolute bottom-2 right-2 text-[#00ff87]/30 font-mono text-[9px] pointer-events-none select-none">┘</div>
            
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#00ff87] to-[#00e5ff]"></div>
            
            <div className="space-y-10">
              <h3 className="text-xl font-bold text-white flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#00ff87]" />
                  {locale === 'ka' ? 'დარბაზის მონაცემები' : locale === 'ru' ? 'Параметры клуба' : 'Facility Metrics'}
                </span>
                <span className="text-xs text-[#64748B] font-normal">
                  {locale === 'ka' ? 'შეარჩიეთ მაჩვენებლები' : locale === 'ru' ? 'Выберите значения' : 'Adjust sliders'}
                </span>
              </h3>

              {/* Members Slider */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-[#94A3B8]">{t('roi_members_label')}</span>
                  <span className="text-lg font-black text-[#00ff87] bg-[#00ff87]/10 border border-[#00ff87]/20 px-3 py-1 rounded-xl">
                    {formatNumber(members)}
                  </span>
                </div>
                <div className="relative">
                  <input
                    type="range"
                    min="100"
                    max="5000"
                    step="50"
                    value={members}
                    onChange={(e) => setMembers(parseInt(e.target.value))}
                    className="w-full artron-range-input cursor-pointer outline-none"
                    style={{ minHeight: '44px' }}
                  />
                  <div className="flex justify-between text-[10px] text-[#556987] pt-1">
                    <span>100</span>
                    <span>2,500</span>
                    <span>5,000</span>
                  </div>
                </div>
              </div>

              {/* Average Price Slider */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-[#94A3B8]">{t('roi_price_label')}</span>
                  <span className="text-lg font-black text-[#00ff87] bg-[#00ff87]/10 border border-[#00ff87]/20 px-3 py-1 rounded-xl">
                    {formatCurrency(price)}
                  </span>
                </div>
                <div className="relative">
                  <input
                    type="range"
                    min={currency.min}
                    max={currency.max}
                    step={currency.step}
                    value={price}
                    onChange={(e) => setPrice(parseInt(e.target.value))}
                    className="w-full artron-range-input cursor-pointer outline-none"
                    style={{ minHeight: '44px' }}
                  />
                  <div className="flex justify-between text-[10px] text-[#556987] pt-1">
                    <span>{formatCurrency(currency.min)}</span>
                    <span>{formatCurrency(Math.round((currency.min + currency.max) / 2))}</span>
                    <span>{formatCurrency(currency.max)}</span>
                  </div>
                </div>
              </div>

              {/* Staff Slider */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-[#94A3B8]">{t('roi_staff_label')}</span>
                  <span className="text-lg font-black text-[#00ff87] bg-[#00ff87]/10 border border-[#00ff87]/20 px-3 py-1 rounded-xl">
                    {staff}
                  </span>
                </div>
                <div className="relative">
                  <input
                    type="range"
                    min="2"
                    max="100"
                    step="1"
                    value={staff}
                    onChange={(e) => setStaff(parseInt(e.target.value))}
                    className="w-full artron-range-input cursor-pointer outline-none"
                    style={{ minHeight: '44px' }}
                  />
                  <div className="flex justify-between text-[10px] text-[#556987] pt-1">
                    <span>2</span>
                    <span>50</span>
                    <span>100</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Hint Box */}
            <div className="mt-8 p-4 rounded-2xl bg-[#05070a]/80 border border-[#8a99ad]/10 text-xs text-[#94A3B8] leading-relaxed space-y-3">
              <div className="flex gap-2 items-start">
                <Info className="w-4 h-4 text-[#00ff87] drop-shadow-[0_0_6px_#00ff87] shrink-0 mt-0.5" />
                <p>
                  {locale === 'ka' 
                    ? 'გაანგარიშება ეფუძნება ტურნიკეტების ავტომატიზაციას, ადმინისტრაციული დროის განთავისუფლებასა და მობილური აპლიკაციით წევრთა შენარჩუნების 5%-იან ზრდას.' 
                    : locale === 'ru' 
                    ? 'Расчет основан на автоматизации турникетов, высвобождении времени персонала и росте удержания клиентов на 5% через мобильное приложение.' 
                    : 'Calculations are based on IoT turnstile automation, reduced front-desk labor, and a 5% boost in member retention via the mobile app.'}
                </p>
              </div>
              <div className="pt-2.5 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-[10px] text-[#64748B]">
                  {locale === 'ka' ? 'შრომის უსაფრთხოება, DPA & SLA:' : locale === 'ru' ? 'Безопасность труда, DPA и SLA:' : 'Labor Safety, DPA & SLA:'}
                </span>
                <Link
                  href="/b2b-agreement"
                  className="text-[10px] font-bold text-[#00ff87] hover:underline inline-flex items-center gap-0.5 self-start sm:self-auto focus:outline-none focus:ring-1 focus:ring-[#00ff87] rounded px-1 py-0.5"
                  style={{ minHeight: '32px' }}
                >
                  {t('b2b_agreement_title')}
                  <ChevronRight className="w-3 h-3 shrink-0" />
                </Link>
              </div>
            </div>

          </motion.div>

          {/* Calculations Cards (Right Column) */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
            className="lg:col-span-7 flex flex-col justify-between gap-6"
          >
            
            {/* Top Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Time Saved Card */}
              <div className="bg-[#05070a]/85 border border-[#8a99ad]/10 backdrop-blur-xl rounded-3xl p-6 relative overflow-hidden group hover:border-[#00ff87]/30 transition-all duration-300">
                {/* L-Shape Corner Brackets */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#00ff87]/25" />
                <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#00ff87]/25" />
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#00ff87]/25" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#00ff87]/25" />

                {/* Terminal corner brackets */}
                <div className="absolute top-2 left-2 text-[#00ff87]/25 font-mono text-[9px] pointer-events-none select-none">┌</div>
                <div className="absolute top-2 right-2 text-[#00ff87]/25 font-mono text-[9px] pointer-events-none select-none">┐</div>
                <div className="absolute bottom-2 left-2 text-[#00ff87]/25 font-mono text-[9px] pointer-events-none select-none">└</div>
                <div className="absolute bottom-2 right-2 text-[#00ff87]/25 font-mono text-[9px] pointer-events-none select-none">┘</div>

                <div className="absolute top-0 right-0 w-24 h-24 bg-[#00ff87]/5 rounded-full filter blur-xl pointer-events-none"></div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#00ff87]/10 flex items-center justify-center border border-[#00ff87]/20">
                    <Clock className="w-5 h-5 text-[#00ff87]" />
                  </div>
                  <h4 className="text-sm font-bold text-[#94A3B8]">{t('roi_time_saved_title')}</h4>
                </div>
                <div className="text-3xl md:text-4xl font-black text-white mb-2 font-mono">
                  <AnimatedNumber value={timeSaved} format={formatNumber} /> <span className="text-lg font-bold text-[#94A3B8] font-sans">Hrs</span>
                </div>
                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  {t('roi_time_saved_desc')}
                </p>
              </div>

              {/* Administrative Overhead Savings Card */}
              <div className="bg-[#05070a]/85 border border-[#8a99ad]/10 backdrop-blur-xl rounded-3xl p-6 relative overflow-hidden group hover:border-[#00ff87]/30 transition-all duration-300">
                {/* L-Shape Corner Brackets */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#00ff87]/25" />
                <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#00ff87]/25" />
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#00ff87]/25" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#00ff87]/25" />

                {/* Terminal corner brackets */}
                <div className="absolute top-2 left-2 text-[#00ff87]/25 font-mono text-[9px] pointer-events-none select-none">┌</div>
                <div className="absolute top-2 right-2 text-[#00ff87]/25 font-mono text-[9px] pointer-events-none select-none">┐</div>
                <div className="absolute bottom-2 left-2 text-[#00ff87]/25 font-mono text-[9px] pointer-events-none select-none">└</div>
                <div className="absolute bottom-2 right-2 text-[#00ff87]/25 font-mono text-[9px] pointer-events-none select-none">┘</div>

                <div className="absolute top-0 right-0 w-24 h-24 bg-[#00ff87]/5 rounded-full filter blur-xl pointer-events-none"></div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#00ff87]/10 flex items-center justify-center border border-[#00ff87]/20">
                    <Coins className="w-5 h-5 text-[#00ff87]" />
                  </div>
                  <h4 className="text-sm font-bold text-[#94A3B8]">{t('roi_overhead_title')}</h4>
                </div>
                <div className="text-3xl md:text-4xl font-black text-[#00ff87] mb-2 font-mono">
                  <AnimatedNumber value={overheadSavings} format={formatCurrency} />
                </div>
                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  {t('roi_overhead_desc')}
                </p>
              </div>

            </div>

            {/* Large Highlighted Revenue Card */}
            <div className="bg-[#05070a]/85 border border-[#8a99ad]/10 backdrop-blur-xl rounded-3xl p-8 relative overflow-hidden group hover:border-[#00ff87]/40 transition-all duration-300 shadow-2xl flex-grow flex flex-col justify-between">
              {/* L-Shape Corner Brackets */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#00ff87]/30" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#00ff87]/30" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#00ff87]/30" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#00ff87]/30" />

              {/* Terminal corner brackets */}
              <div className="absolute top-2 left-2 text-[#00ff87]/35 font-mono text-[9px] pointer-events-none select-none">┌</div>
              <div className="absolute top-2 right-2 text-[#00ff87]/35 font-mono text-[9px] pointer-events-none select-none">┐</div>
              <div className="absolute bottom-2 left-2 text-[#00ff87]/35 font-mono text-[9px] pointer-events-none select-none">└</div>
              <div className="absolute bottom-2 right-2 text-[#00ff87]/35 font-mono text-[9px] pointer-events-none select-none">┘</div>

              <div className="absolute -right-16 -top-16 w-48 h-48 bg-[#00ff87]/10 rounded-full filter blur-3xl pointer-events-none group-hover:bg-[#00ff87]/15 transition-all duration-300"></div>
              
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#00ff87]/20 to-[#00e5ff]/20 flex items-center justify-center border border-[#00ff87]/30 shadow-md shadow-[#00ff87]/10">
                    <TrendingUp className="w-6 h-6 text-[#00ff87]" />
                  </div>
                  <div>
                    <h4 className="text-base font-extrabold text-white flex items-center gap-2">
                      {t('roi_revenue_title')}
                    </h4>
                    <span className="text-xs font-semibold text-[#00ff87] flex items-center gap-1.5 mt-0.5">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#00ff87] animate-pulse"></span>
                      {locale === 'ka' ? 'სავარაუდო წლიური ზრდა' : locale === 'ru' ? 'Прогноз годового прироста' : 'Projected Annual Growth'}
                    </span>
                  </div>
                </div>

                <div className="text-4xl md:text-5xl lg:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white via-[#e2e8f0] to-[#00ff87] tracking-tight mb-4 font-mono leading-none">
                  <AnimatedNumber value={revenueIncrease} format={formatCurrency} />
                </div>
                
                <p className="text-sm text-[#94A3B8] leading-relaxed mb-6 max-w-xl">
                  {t('roi_revenue_desc')}
                </p>

                {/* BI Dynamic SVG Growth Projections Chart */}
                <RoiChart 
                  revenueIncrease={revenueIncrease} 
                  maxRev={5000 * 0.05 * currency.max * 12} 
                  locale={locale} 
                />
              </div>

              {/* Bottom Call to Action inside ROI section */}
              <button
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#00ff87] to-[#00e5ff] hover:brightness-110 text-slate-950 font-extrabold rounded-2xl transition-all duration-300 shadow-xl shadow-[#00ff87]/20 hover:shadow-[#00ff87]/40 active:scale-98 hover:scale-[1.02] transform border border-[#00ff87]/25 hover:border-[#00ff87]/50 cursor-pointer"
                style={{ minHeight: '48px' }}
                onClick={() => {
                  const element = document.getElementById('b2b-cta-target');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    // Fallback to top or contact form
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
              >
                {t('roi_cta')}
                <ChevronRight className="w-5 h-5" />
              </button>

            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
};
