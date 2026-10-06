'use client';

import React, { useMemo } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { getAboutVisionData } from '../data/aboutVisionData';

export const AboutReliability: React.FC = () => {
  const { locale } = useLanguage();
  const { reliability, vaultCards } = useMemo(() => getAboutVisionData(locale), [locale]);

  return (
    <section id="s3" data-screen-label="03 Reliability" className="relative z-10 pt-24 sm:pt-36">
      <div className="vision-grid gap-y-12">
        <div className="vision-divider">
          <div className="vision-rule" />
          <i />
          <div className="vision-rule" />
        </div>

        {/* Chapter Header */}
        <div className="col-span-full flex items-baseline gap-4 sm:gap-6 flex-wrap vision-rv in">
          <span className="vision-mono text-amber-500 font-semibold text-sm">{reliability.chapterNum}</span>
          <h2 className="text-[clamp(26px,3.6vw,52px)] font-light text-white tracking-tight leading-tight">
            {reliability.title}<em className="not-italic text-slate-400">{reliability.titleEm}</em>
          </h2>
        </div>

        <p className="col-span-12 lg:col-span-7 text-[clamp(16px,1.35vw,20px)] leading-relaxed text-slate-300 vision-rv in">
          {reliability.descP1}
          <strong className="text-white font-medium">{reliability.descBold}</strong>
          {reliability.descP2}
        </p>

        {/* 4 Vault Cards Grid */}
        <div className="col-span-full grid grid-cols-1 md:grid-cols-2 gap-px bg-gradient-to-br from-slate-200/20 via-slate-500/10 to-amber-500/25 border border-white/10 rounded-3xl overflow-hidden mt-6 shadow-2xl vision-rv in">
          {vaultCards.map((card, i) => (
            <article
              key={i}
              className="relative bg-[#090A0F]/85 backdrop-blur-md p-8 sm:p-12 flex flex-col justify-between gap-6 min-h-[360px] sm:min-h-[400px] group transition-colors duration-500 hover:bg-[#0B132B]/90"
            >
              {/* Corner Tick Mark */}
              <i className="absolute top-4 right-4 w-2 h-2 border border-amber-600/70 rotate-45 transition-transform duration-500 group-hover:scale-125 group-hover:border-amber-400" />

              {/* Optional Emerald Top Spark */}
              {card.spark && (
                <div className="absolute top-0 left-0 w-2/5 h-px bg-gradient-to-r from-emerald-400/80 to-transparent" />
              )}

              <span className="vision-mono text-cyan-400 font-medium">{card.id}</span>

              {/* Big Metallic Stat Value */}
              <div className="font-mono font-light text-[clamp(36px,4.8vw,80px)] leading-none tracking-tight vision-metal flex items-baseline gap-3 flex-wrap">
                {card.value}
                <small className="text-xs sm:text-sm tracking-widest text-amber-500 font-mono font-medium">
                  {card.unit}
                </small>
              </div>

              {/* Title & Description */}
              <div className="mt-auto space-y-3">
                <h5 className="text-[clamp(18px,1.6vw,24px)] font-normal text-white leading-snug">
                  {card.title}
                </h5>
                <p className="text-[15px] sm:text-[16px] leading-relaxed text-slate-300 font-light">
                  {card.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
