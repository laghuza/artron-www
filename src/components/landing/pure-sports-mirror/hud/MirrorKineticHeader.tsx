'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface MirrorKineticHeaderProps {
  headline: string;
  kicker: string;
  accentColor: string;
  currentIndex: number;
  totalCount: number;
}

export const MirrorKineticHeader: React.FC<MirrorKineticHeaderProps> = ({
  headline,
  kicker,
  accentColor,
  currentIndex,
  totalCount,
}) => {
  const lines = headline.split('\n');
  const allWords = headline.replace(/\n/g, ' ').split(' ').filter(Boolean);
  const totalWords = allWords.length;
  let wordCounter = 0;

  return (
    <div className="flex flex-col gap-1.5 mb-2 sm:mb-2.5">
      {/* Top kicker bar */}
      <div className="flex items-center gap-2">
        <span
          className="w-1.5 h-1.5 rounded-full animate-pulse"
          style={{ backgroundColor: accentColor, boxShadow: `0 0 12px ${accentColor}` }}
        />
        <span className="font-mono text-[9px] tracking-[0.22em] text-slate-400 uppercase">
          {kicker}
        </span>
        <span className="flex-1 h-px bg-gradient-to-r from-white/15 to-transparent" />
        <span className="font-mono text-[9px] tracking-[0.14em] text-slate-500 font-tabular">
          {String(currentIndex + 1).padStart(2, '0')} / {String(totalCount).padStart(2, '0')}
        </span>
      </div>

      {/* Kinetic 3D-feel Staggered Headline with line breaks */}
      <motion.h3
        key={headline}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 0.84, 0.44, 1] }}
        className="text-2xl sm:text-3xl lg:text-[30px] xl:text-[34px] font-bold tracking-tight leading-[1.08] text-white flex flex-col gap-0.5"
      >
        {lines.map((line, li) => {
          const lineWords = line.split(' ').filter(Boolean);
          return (
            <div key={li} className="flex flex-wrap gap-x-2">
              {lineWords.map((word, wi) => {
                wordCounter++;
                const isLast = wordCounter === totalWords;
                return (
                  <span
                    key={`${word}-${wi}`}
                    className="inline-block transition-colors duration-300"
                    style={{ color: isLast ? accentColor : '#F4F9FD' }}
                  >
                    {word}
                  </span>
                );
              })}
            </div>
          );
        })}
      </motion.h3>
    </div>
  );
};
