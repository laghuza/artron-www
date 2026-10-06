'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { getAboutVisionData } from '../data/aboutVisionData';

export const AboutCallToUnity: React.FC = () => {
  const { locale } = useLanguage();
  const { unity, unityCtas } = useMemo(() => getAboutVisionData(locale), [locale]);

  return (
    <section id="s4" data-screen-label="04 Call to Unity" className="relative z-10 pt-24 sm:pt-36">
      <div className="vision-grid gap-y-12">
        <div className="vision-divider">
          <div className="vision-rule" />
          <i />
          <div className="vision-rule" />
        </div>

        {/* Chapter Header */}
        <div className="col-span-full flex items-baseline gap-4 sm:gap-6 flex-wrap vision-rv in">
          <span className="vision-mono text-amber-500 font-semibold text-sm">{unity.chapterNum}</span>
          <h2 className="text-[clamp(26px,3.6vw,52px)] font-light text-white tracking-tight leading-tight">
            {unity.title}<em className="not-italic text-slate-400">{unity.titleEm}</em>
          </h2>
        </div>

        <p className="col-span-12 lg:col-span-7 text-[clamp(16px,1.35vw,20px)] leading-relaxed text-slate-300 vision-rv in">
          {unity.descP1}
          <strong className="text-white font-medium">{unity.descBold}</strong>
          {unity.descP2}
        </p>

        {/* 3 Call to Action Rows */}
        <div className="col-span-full flex flex-col mt-4 border-b border-white/10 vision-rv in">
          {unityCtas.map((cta, i) => (
            <Link
              key={i}
              href={cta.href}
              className="relative grid grid-cols-1 md:grid-cols-12 gap-y-3 md:gap-x-6 items-center py-8 sm:py-10 border-t border-white/10 group transition-all duration-500 hover:bg-gradient-to-r hover:from-amber-500/[0.04] hover:to-transparent focus:outline-none"
              style={{ minHeight: '44px' }}
            >
              {/* Expanding Gold Accent Line on Hover */}
              <div className="absolute left-0 top-[-1px] h-px w-full bg-gradient-to-r from-amber-600 via-amber-400 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />

              <span className="vision-mono col-span-1 md:col-span-2 text-cyan-400 font-medium">
                {cta.badge}
              </span>

              <h6 className="col-span-1 md:col-span-5 text-[clamp(20px,2.2vw,34px)] font-light text-white transition-transform duration-500 group-hover:translate-x-2">
                {cta.title}
              </h6>

              <p className="col-span-1 md:col-span-3 text-sm sm:text-[15px] leading-relaxed text-slate-400">
                {cta.desc}
              </p>

              <div className="col-span-1 md:col-span-2 justify-self-start md:justify-self-end flex items-center gap-3 vision-mono text-xs text-slate-200 group-hover:text-amber-400 transition-colors">
                <span>{cta.action}</span>
                <div className="relative w-8 group-hover:w-14 h-px bg-current transition-all duration-500">
                  <div className="absolute right-0 top-[-3px] w-1.5 h-1.5 border-t border-r border-current rotate-45" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <p className="col-span-12 lg:col-start-4 lg:col-span-6 text-center text-[clamp(17px,1.4vw,22px)] leading-relaxed text-slate-400 mt-6 vision-rv in">
          {unity.barrierP1}
          <strong className="text-white font-medium">{unity.rulesOneForAll}</strong>
          {unity.barrierP2}
          <strong className="text-white font-medium">{unity.infinitePossibilities}</strong>
        </p>
      </div>

      {/* Finale Section */}
      <div className="min-h-[85svh] flex flex-col justify-center items-center text-center gap-8 sm:gap-12 py-24 sm:py-32 px-4 vision-grid">
        <span className="vision-mono text-cyan-400 font-semibold text-sm vision-rv in">{unity.finalBadge}</span>

        <h2 className="col-span-full font-serif font-extralight text-[clamp(36px,7vw,110px)] leading-[1.08] tracking-tight vision-metal vision-rv in">
          <span className="block">{unity.finalTitleLine1}</span>
          <span className="block">{unity.finalTitleLine2}</span>
        </h2>

        <p className="col-span-12 lg:col-start-3 lg:col-span-8 max-w-2xl text-[clamp(17px,1.4vw,22px)] leading-relaxed text-slate-300 font-light vision-rv in">
          {unity.finalParagraphP1}
          <strong className="text-white font-medium">{unity.finalParagraphBold}</strong>
          {unity.finalParagraphP2}
        </p>
      </div>

      {/* Citation Footer */}
      <footer className="vision-grid py-8 border-t border-white/10">
        <div className="col-span-12 text-center sm:text-right vision-mono text-[11px] text-slate-400">
          {unity.footerRights}
          <b className="text-cyan-400">{unity.footerTagline}</b>
        </div>
      </footer>
    </section>
  );
};
