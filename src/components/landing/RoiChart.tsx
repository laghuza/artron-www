import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

interface RoiChartProps {
  revenueIncrease: number;
  maxRev: number;
  locale: string;
}

export const RoiChart: React.FC<RoiChartProps> = ({ revenueIncrease, maxRev, locale }) => {
  // Memoized calculations of coordinates with fallback safeguards
  const { y1, y2, y3, y4, y5 } = useMemo(() => {
    const safeMax = typeof maxRev === 'number' && maxRev > 0 ? maxRev : 100000;
    const safeInc = typeof revenueIncrease === 'number' && !isNaN(revenueIncrease) ? revenueIncrease : 0;
    
    const clampY = (factor: number) => {
      const calc = 95 - ((safeInc * factor) / safeMax) * 70;
      if (isNaN(calc)) return 95;
      return Math.round(Math.max(15, Math.min(95, calc)));
    };

    return {
      y1: clampY(0.2),
      y2: clampY(0.45),
      y3: clampY(0.7),
      y4: clampY(0.85),
      y5: clampY(1.0)
    };
  }, [revenueIncrease, maxRev]);

  const areaPathD = `M 20 95 L 20 ${y1} L 135 ${y2} L 250 ${y3} L 365 ${y4} L 480 ${y5} L 480 95 Z`;
  const linePathD = `M 20 ${y1} L 135 ${y2} L 250 ${y3} L 365 ${y4} L 480 ${y5}`;

  return (
    <div className="mb-6 bg-[#0B0F17]/50 border border-white/5 rounded-2xl p-4 relative overflow-hidden">
      <div className="flex justify-between items-center mb-4">
        <span className="text-[11px] font-semibold text-[#94A3B8] tracking-wide">
          {locale === 'ka' ? '5-წლიანი შემოსავლის ზრდის დინამიკა' : locale === 'ru' ? 'Динамика роста доходов на 5 лет' : '5-Year Projected Revenue Growth'}
        </span>
        <span className="text-[10px] font-semibold text-[#00ff87] bg-[#00ff87]/10 border border-[#00ff87]/20 px-2 py-0.5 rounded-full">
          {locale === 'ka' ? 'ავტომატიზაციით' : locale === 'ru' ? 'С автоматизацией' : 'With Automation'}
        </span>
      </div>

      <svg className="w-full h-28 overflow-visible" viewBox="0 0 500 100">
        <defs>
          <linearGradient id="chart-glow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00ff87" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#00ff87" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="line-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#00e5ff" />
            <stop offset="100%" stopColor="#00ff87" />
          </linearGradient>
        </defs>
        {/* Grid Lines */}
        <line x1="20" y1="25" x2="480" y2="25" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
        <line x1="20" y1="60" x2="480" y2="60" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
        <line x1="20" y1="95" x2="480" y2="95" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />

        {/* Glow Area */}
        <motion.path
          d={areaPathD}
          initial={{ d: areaPathD }}
          animate={{ d: areaPathD }}
          fill="url(#chart-glow)"
          transition={{ type: 'spring', stiffness: 100, damping: 18 }}
        />

        {/* Line */}
        <motion.path
          d={linePathD}
          initial={{ d: linePathD }}
          animate={{ d: linePathD }}
          fill="none"
          stroke="url(#line-grad)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          transition={{ type: 'spring', stiffness: 100, damping: 18 }}
        />

        {/* Dots */}
        <motion.circle cx="20" cy={y1} initial={{ cy: y1 }} animate={{ cy: y1 }} r="3" fill="#00e5ff" transition={{ type: 'spring', stiffness: 120, damping: 15 }} />
        <motion.circle cx="135" cy={y2} initial={{ cy: y2 }} animate={{ cy: y2 }} r="3" fill="#00e5ff" transition={{ type: 'spring', stiffness: 120, damping: 15 }} />
        <motion.circle cx="250" cy={y3} initial={{ cy: y3 }} animate={{ cy: y3 }} r="3" fill="#00e5ff" transition={{ type: 'spring', stiffness: 120, damping: 15 }} />
        <motion.circle cx="365" cy={y4} initial={{ cy: y4 }} animate={{ cy: y4 }} r="3" fill="#00ff87" transition={{ type: 'spring', stiffness: 120, damping: 15 }} />
        <motion.circle cx="480" cy={y5} initial={{ cy: y5 }} animate={{ cy: y5 }} r="4" fill="#00ff87" transition={{ type: 'spring', stiffness: 120, damping: 15 }} />

        {/* Labels */}
        <text x="20" y="108" fill="#64748B" fontSize="9" className="font-sans font-medium text-center">
          {locale === 'ka' ? '1 წელი' : locale === 'ru' ? '1 год' : 'Year 1'}
        </text>
        <text x="135" y="108" fill="#64748B" fontSize="9" className="font-sans font-medium text-center">
          {locale === 'ka' ? '2 წელი' : locale === 'ru' ? '2 год' : 'Year 2'}
        </text>
        <text x="250" y="108" fill="#64748B" fontSize="9" className="font-sans font-medium text-center">
          {locale === 'ka' ? '3 წელი' : locale === 'ru' ? '3 год' : 'Year 3'}
        </text>
        <text x="365" y="108" fill="#64748B" fontSize="9" className="font-sans font-medium text-center">
          {locale === 'ka' ? '4 წელი' : locale === 'ru' ? '4 год' : 'Year 4'}
        </text>
        <text x="445" y="108" fill="#00ff87" fontSize="9" className="font-sans font-bold">
          {locale === 'ka' ? '5 წელი (პროგნოზი)' : locale === 'ru' ? '5 лет (прогноз)' : 'Year 5 (Proj)'}
        </text>
      </svg>
    </div>
  );
};
