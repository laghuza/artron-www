'use client';

import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { getAboutVisionData } from '../data/aboutVisionData';

export const AboutManifesto: React.FC = () => {
  const { locale } = useLanguage();
  const { manifesto } = useMemo(() => getAboutVisionData(locale), [locale]);

  const assembleRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  // Deterministic seeds for letter dispersal based on active locale letters
  const seeds = useMemo(
    () =>
      manifesto.assembleLetters.map((_, i) => ({
        x: (((i * 23) % 80) - 40) * (i % 2 ? 1 : -1) * 1.5,
        y: (((i * 37) % 70) - 35) * 1.2,
        r: ((i * 47) % 140) - 70,
        s: 0.5 + ((i * 19) % 9) * 0.1,
      })),
    [manifesto.assembleLetters]
  );

  useEffect(() => {
    const handleScroll = () => {
      const el = assembleRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const rawProgress = -rect.top / (rect.height - vh);
      const clamped = Math.min(1, Math.max(0, rawProgress));
      setProgress(clamped);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const ease = (t: number) => 1 - Math.pow(1 - t, 3);
  const e = ease(Math.min(1, progress / 0.8));
  const k = 1 - e;
  const isBound = e > 0.98;
  const showClaim = progress > 0.78;

  return (
    <section id="s1" data-screen-label="01 Manifesto" className="relative z-10">
      {/* Hero Header */}
      <header className="min-h-[100svh] flex flex-col justify-between pt-8 sm:pt-12 pb-10 sm:pb-14 vision-grid">
        <div className="flex justify-between items-center col-span-full gap-4">
          <span className="vision-mono text-cyan-400 font-semibold">{manifesto.badge}</span>
          <span className="vision-mono text-slate-400">{manifesto.geoCoord}</span>
        </div>

        <div className="col-span-full grid grid-cols-12 gap-x-4 sm:gap-x-8 items-end my-auto py-10">
          <h1 className="col-span-full font-extralight text-[clamp(64px,16vw,260px)] leading-[0.88] tracking-tight -ml-1 vision-metal vision-rv in">
            ARTRON
          </h1>
          <p className="col-span-12 lg:col-span-7 font-light text-[clamp(22px,3vw,42px)] leading-tight text-slate-100 mt-4 sm:mt-6 vision-rv in">
            {manifesto.tagline}
          </p>
          <div className="col-span-12 lg:col-span-5 flex flex-col items-start lg:items-end gap-1.5 mt-6 lg:mt-0 text-left lg:text-right vision-rv in">
            <span className="vision-mono text-cyan-300 font-medium">{manifesto.chapterBadge}</span>
            <span className="vision-mono text-slate-400">{manifesto.chapterSub}</span>
          </div>
        </div>

        <div className="col-span-full flex justify-between items-end gap-4 mt-8 pt-4 border-t border-white/10">
          <div className="flex items-baseline gap-2.5 sm:gap-3.5 flex-wrap">
            <span className="text-amber-400 font-mono text-lg sm:text-xl md:text-2xl font-semibold tracking-wider">
              I.
            </span>
            <span className="text-[clamp(20px,2.5vw,34px)] font-light tracking-wide vision-metal drop-shadow-[0_0_18px_rgba(248,250,252,0.5)] drop-shadow-[0_0_35px_rgba(148,163,184,0.35)]">
              {manifesto.movementBornInConnection}
            </span>
          </div>
          <div className="flex items-center gap-3 vision-mono text-slate-400">
            <i className="block w-px h-10 bg-gradient-to-b from-amber-400 to-transparent animate-pulse" />
            <span>{manifesto.scroll}</span>
          </div>
        </div>
      </header>

      {/* Quote Block */}
      <div className="vision-grid pt-24 sm:pt-36 pb-20 sm:pb-28 gap-y-10">
        <div className="col-span-12 lg:col-start-2 lg:col-span-10 flex justify-end gap-4 flex-wrap vision-rv in">
          <span className="vision-mono text-slate-400">{manifesto.quoteAuthor}</span>
        </div>

        <blockquote className="col-span-12 lg:col-start-2 lg:col-span-10 font-extralight text-[clamp(24px,3.5vw,56px)] leading-relaxed text-center vision-metal vision-rv in">
          {manifesto.quoteText}
        </blockquote>

        <div className="vision-divider vision-rv in">
          <div className="vision-rule" />
          <i />
          <div className="vision-rule" />
        </div>

        <div className="col-span-12 lg:col-start-4 lg:col-span-6 text-[clamp(16px,1.35vw,20px)] leading-relaxed text-slate-200 space-y-5 vision-rv in">
          <p className="text-slate-400 italic">{manifesto.thinkWhatItMeans}</p>
          <p>{manifesto.lettersAloneText}</p>
          <p>{manifesto.artronTurnsText}</p>
        </div>
      </div>

      {/* Assemble Word Kinetic Scroll */}
      <div ref={assembleRef} className="h-[220vh] relative">
        <div className="sticky top-0 h-[100svh] flex flex-col items-center justify-center gap-6 sm:gap-10 overflow-hidden px-4">
          <span className="vision-mono font-medium text-cyan-300">
            {isBound ? '[ SYNTAX // BOUND ]' : '[ NOISE // UNBOUND ]'}
          </span>

          <div className="flex font-serif font-extralight text-[clamp(56px,13vw,220px)] leading-none tracking-tight vision-metal select-none">
            {manifesto.assembleLetters.map((letter, idx) => {
              const seed = seeds[idx] || { x: 0, y: 0, r: 0, s: 1 };
              const tx = seed.x * k;
              const ty = seed.y * k;
              const tr = seed.r * k;
              const ts = 1 + (seed.s - 1) * k;
              const opacity = 0.28 + 0.72 * e;

              return (
                <span
                  key={`${locale}-${idx}`}
                  style={{
                    transform: `translate(${tx}vw, ${ty}vh) rotate(${tr}deg) scale(${ts})`,
                    opacity,
                    display: 'inline-block',
                    transition: 'transform 0.05s linear, opacity 0.05s linear',
                  }}
                >
                  {letter}
                </span>
              );
            })}
          </div>

          <div className="flex gap-6 sm:gap-8 flex-wrap justify-center vision-mono">
            <span className="text-slate-400">
              {manifesto.noiseLabel} <b className="text-amber-400">{String(Math.round(100 * (1 - e))).padStart(3, '0')}%</b>
            </span>
            <span className="text-slate-400">
              {manifesto.syntaxLabel} <b className="text-cyan-400">{String(Math.round(100 * e)).padStart(3, '0')}%</b>
            </span>
          </div>

          <p
            className="text-[clamp(20px,2.5vw,36px)] font-light text-center text-white transition-all duration-700 max-w-xl"
            style={{
              opacity: showClaim ? 1 : 0,
              transform: showClaim ? 'none' : 'translateY(16px)',
            }}
          >
            {manifesto.syntaxClaim}
          </p>
        </div>
      </div>

      {/* Fragmentation & Consequences */}
      <div className="vision-grid py-20 sm:py-32 gap-y-12">
        <p className="col-span-12 lg:col-span-7 text-[clamp(20px,2.2vw,32px)] leading-relaxed font-light text-slate-200 vision-rv in">
          {manifesto.fragmentationIntro}
        </p>

        <div className="col-span-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 pt-4">
          {manifesto.actors.map((act, i) => (
            <div
              key={i}
              className={`flex flex-col gap-3 pt-4 border-t border-slate-700/50 vision-rv in ${
                i === 1 ? 'lg:mt-[120px]' : i === 3 ? 'lg:mt-[80px]' : ''
              }`}
            >
              <span className="vision-mono text-cyan-400">{act.coord}</span>
              <p className="text-[clamp(16px,1.5vw,22px)] leading-relaxed text-slate-300">{act.text}</p>
            </div>
          ))}
        </div>

        <p className="col-span-12 lg:col-start-7 lg:col-span-6 text-[clamp(16px,1.35vw,20px)] leading-relaxed text-slate-400 vision-rv in">
          {manifesto.isolatedDesc}
          <strong className="text-white font-medium">{manifesto.isolatedSyntaxWord}</strong>
          {manifesto.isolatedSyntaxDesc}
        </p>

        <div className="col-span-full flex flex-col space-y-4 pt-8">
          <div className="vision-mono text-cyan-400 font-semibold mb-2 vision-rv in">{manifesto.whenFragmented}</div>
          <div className="vision-rule" />
          {manifesto.consequences.map((c, i) => (
            <React.Fragment key={i}>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6 py-4 items-baseline vision-rv in">
                <span className="vision-mono col-span-2 text-amber-400 font-semibold">{c.num}</span>
                <p className="col-span-10 text-[clamp(20px,2.4vw,36px)] font-extralight text-slate-200">{c.text}</p>
              </div>
              <div className="vision-rule" />
            </React.Fragment>
          ))}
        </div>

        <p className="col-span-12 lg:col-start-2 lg:col-span-10 text-center font-serif font-extralight text-[clamp(24px,3.8vw,56px)] leading-tight vision-metal py-8 vision-rv in">
          {manifesto.motionWithoutMind}
        </p>
      </div>

      {/* Goal Block */}
      <div className="vision-grid py-16 sm:py-28 gap-y-10">
        <h3 className="col-span-12 lg:col-span-6 font-extralight text-[clamp(30px,4.2vw,68px)] leading-tight text-white vision-rv in">
          {manifesto.ultimateGoalTitle}
        </h3>
        <div className="col-span-12 lg:col-span-6 text-[clamp(16px,1.35vw,20px)] leading-relaxed text-slate-300 space-y-4 vision-rv in">
          <p>{manifesto.ultimateGoalP1}</p>
          <p className="text-slate-400">
            {manifesto.ultimateGoalP2}
            <strong className="text-white font-medium">{manifesto.ultimateGoalPursuit}</strong>
          </p>
        </div>

        <div className="col-span-full grid grid-cols-1 md:grid-cols-2 gap-px bg-slate-700/30 border border-slate-700/40 rounded-2xl overflow-hidden mt-6 vision-rv in shadow-2xl">
          <div className="bg-[#090A0F]/80 backdrop-blur-md p-8 sm:p-12 flex flex-col justify-between gap-6 min-h-[240px]">
            <span className="vision-mono text-rose-400 font-semibold">{manifesto.minusArtronBadge}</span>
            <p className="text-[clamp(18px,2vw,30px)] font-light text-slate-400 tracking-wide">
              {manifesto.minusArtronText}
            </p>
          </div>
          <div className="bg-[#0B132B]/85 backdrop-blur-md p-8 sm:p-12 flex flex-col justify-between gap-6 min-h-[240px] border-t md:border-t-0 md:border-l border-cyan-500/20">
            <span className="vision-mono text-cyan-400 font-bold">{manifesto.plusArtronBadge}</span>
            <p className="text-[clamp(18px,2vw,30px)] font-light text-white leading-relaxed">
              {manifesto.plusArtronText}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
