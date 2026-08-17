import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

interface RoiChartProps {
  revenueIncrease: number;
  maxRev: number;
  locale: string;
}

export const RoiChart: React.FC<RoiChartProps> = ({ revenueIncrease, maxRev, locale }) => {
  // Memoized calculations of coordinates
  const { y1, y2, y3, y4, y5 } = useMemo(() => {
    return {
      y1: Math.round(95 - ((revenueIncrease * 0.2) / maxRev) * 70),
      y2: Math.round(95 - ((revenueIncrease * 0.45) / maxRev) * 70),
      y3: Math.round(95 - ((revenueIncrease * 0.7) / maxRev) * 70),
      y4: Math.round(95 - ((revenueIncrease * 0.85) / maxRev) * 70),
      y5: Math.round(95 - ((revenueIncrease * 1.0) / maxRev) * 70)
    };
  }, [revenueIncrease, maxRev]);

  return (
    <div className="mb-6 bg-[#0B0F17]/50 border border-white/5 rounded-2xl p-4 relative overflow-hidden">
      <div className="flex justify-between items-center mb-4">
        <span className="text-[10px] font-mono text-[#64748B] uppercase tracking-wider">
          {locale === 'ka' ? '5-წლიანი ROI ზრდის ტრენდი' : locale === 'ru' ? '5-летний тренд роста ROI' : '5-Year ROI Growth Trend'}
        </span>
        <span className="text-[10px] font-mono text-[#00ff87] font-bold">
          {locale === 'ka' ? 'ავტომატიზირებული' : locale === 'ru' ? 'Автоматизировано' : 'Automated'}
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
          animate={{ d: `M 20 95 L 20 ${y1} L 135 ${y2} L 250 ${y3} L 365 ${y4} L 480 ${y5} L 480 95 Z` }}
          fill="url(#chart-glow)"
          transition={{ type: 'spring', stiffness: 100, damping: 18 }}
        />

        {/* Line */}
        <motion.path
          animate={{ d: `M 20 ${y1} L 135 ${y2} L 250 ${y3} L 365 ${y4} L 480 ${y5}` }}
          fill="none"
          stroke="url(#line-grad)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          transition={{ type: 'spring', stiffness: 100, damping: 18 }}
        />

        {/* Dots */}
        <motion.circle cx="20" animate={{ cy: y1 }} r="3" fill="#00e5ff" transition={{ type: 'spring', stiffness: 120, damping: 15 }} />
        <motion.circle cx="135" animate={{ cy: y2 }} r="3" fill="#00e5ff" transition={{ type: 'spring', stiffness: 120, damping: 15 }} />
        <motion.circle cx="250" animate={{ cy: y3 }} r="3" fill="#00e5ff" transition={{ type: 'spring', stiffness: 120, damping: 15 }} />
        <motion.circle cx="365" animate={{ cy: y4 }} r="3" fill="#00ff87" transition={{ type: 'spring', stiffness: 120, damping: 15 }} />
        <motion.circle cx="480" animate={{ cy: y5 }} r="4" fill="#00ff87" transition={{ type: 'spring', stiffness: 120, damping: 15 }} />

        {/* Labels */}
        <text x="20" y="108" fill="#64748B" fontSize="8" className="font-mono text-center">Y1</text>
        <text x="135" y="108" fill="#64748B" fontSize="8" className="font-mono text-center">Y2</text>
        <text x="250" y="108" fill="#64748B" fontSize="8" className="font-mono text-center">Y3</text>
        <text x="365" y="108" fill="#64748B" fontSize="8" className="font-mono text-center">Y4</text>
        <text x="460" y="108" fill="#00ff87" fontSize="8" className="font-mono font-bold">Y5 (PROJ)</text>
      </svg>
    </div>
  );
};
