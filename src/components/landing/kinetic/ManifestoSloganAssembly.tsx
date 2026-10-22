'use client';

import React, { useMemo } from 'react';

interface ManifestoSloganAssemblyProps {
  scrollProgress: number;
  locale: string;
  className?: string;
}

const smooth = (t: number) => t * t * (3 - 2 * t);
const clamp = (v: number, a: number, b: number) => Math.min(Math.max(v, a), b);

interface WordConfig {
  word: string;
  start: number;
  end: number;
  isGold: boolean;
}

const DICTIONARY: Record<string, { words: WordConfig[]; subline: string; ariaLabel: string }> = {
  ka: {
    ariaLabel: 'მოძრაობა იბადება კავშირში',
    words: [
      { word: 'მოძრაობა', start: 0.24, end: 0.44, isGold: false },
      { word: 'იბადება', start: 0.38, end: 0.58, isGold: false },
      { word: 'კავშირში', start: 0.52, end: 0.70, isGold: true },
    ],
    subline: 'ერთი სისტემა — ყველა მოძრაობისთვის',
  },
  en: {
    ariaLabel: 'Motion is Born in Connection',
    words: [
      { word: 'Motion', start: 0.24, end: 0.42, isGold: false },
      { word: 'is Born in', start: 0.38, end: 0.56, isGold: false },
      { word: 'Connection', start: 0.52, end: 0.70, isGold: true },
    ],
    subline: 'One System — For All Movement',
  },
  ru: {
    ariaLabel: 'Движение Рождается в Связи',
    words: [
      { word: 'Движение', start: 0.24, end: 0.44, isGold: false },
      { word: 'Рождается', start: 0.38, end: 0.58, isGold: false },
      { word: 'в Связи', start: 0.52, end: 0.70, isGold: true },
    ],
    subline: 'Единая система — для любого движения',
  },
};

const CYCLE = ['', 'rim', '', 'split', 'rim edge', '', 'split', 'rim'];

export const ManifestoSloganAssembly: React.FC<ManifestoSloganAssemblyProps> = ({
  scrollProgress,
  locale,
  className = '',
}) => {
  const currentLang = DICTIONARY[locale] || DICTIONARY.ka;
  const p = scrollProgress;

  // Flatten glyphs for calculation
  const glyphData = useMemo(() => {
    const list: Array<{
      char: string;
      s: number;
      len: number;
      gold: boolean;
      variant: string;
      wordIdx: number;
      charIdx: number;
      isLastInWord: boolean;
      u: number;
    }> = [];

    let totalChars = 0;
    currentLang.words.forEach((w) => {
      totalChars += [...w.word].length;
    });

    let cumulativeIdx = 0;
    currentLang.words.forEach((wObj, wi) => {
      const chars = [...wObj.word];
      const n = chars.length;
      const len = (wObj.end - wObj.start) * 0.42;

      chars.forEach((c, i) => {
        let variant = '';
        if (c === 'ა' || c === 'A' || c === 'a' || c === 'а' || c === 'А') {
          variant = 'alpha';
        } else {
          variant = CYCLE[(cumulativeIdx + wi * 3) % CYCLE.length];
        }

        const s = wObj.start + (wObj.end - wObj.start - len) * (n > 1 ? i / (n - 1) : 0);
        list.push({
          char: c,
          s,
          len,
          gold: wObj.isGold,
          variant,
          wordIdx: wi,
          charIdx: i,
          isLastInWord: i === n - 1,
          u: totalChars > 1 ? cumulativeIdx / (totalChars - 1) : 0,
        });
        cumulativeIdx++;
      });
    });

    return list;
  }, [currentLang]);

  // Slogan stays visible once assembled, gently drifting upward into the natural page scroll
  const sUp = smooth(clamp((p - 0.86) / 0.14, 0, 1));
  const sloganOpacity = p < 0.22 ? 0 : 1;
  const sY = -sUp * 24;
  const sS = 1 - 0.02 * sUp;

  // Subline kinematics
  const subP = smooth(clamp((p - 0.60) / 0.10, 0, 1));
  const subOpacity = subP * 0.9;
  const subY = 6 * (1 - subP);
  const shine = smooth(clamp((p - 0.66) / 0.10, 0, 1));
  const subBgPos = `${100 - 100 * shine}% 0`;

  // Beam animation across letters
  const lock = smooth(clamp((p - 0.64) / 0.08, 0, 1));
  const beamX = -0.15 + 1.3 * clamp((p - 0.64) / 0.08, 0, 1);
  const beamOn = p > 0.64 && p < 0.74;

  let glyphPtr = 0;

  return (
    <div
      className={`absolute z-30 top-1/2 left-1/2 text-center w-[min(90vw,880px)] pointer-events-none select-none will-change-transform ${className}`}
      style={{
        opacity: sloganOpacity,
        visibility: sloganOpacity <= 0 ? 'hidden' : 'visible',
        transform: `translate(-50%, -50%) translate3d(0, ${sY}px, 0) scale(${sS})`,
      }}
      aria-label={currentLang.ariaLabel}
    >
      {/* Manifesto 3D Header */}
      <h1 className="manifesto-container flex flex-wrap justify-center gap-x-[0.42em] gap-y-[0.1em] font-sans font-bold text-[clamp(1.6rem,4.2vw,3.9rem)] leading-[1.3] perspective-[900px] transform-gpu">
        {currentLang.words.map((wObj, wi) => {
          const chars = [...wObj.word];
          return (
            <span key={`${wObj.word}-${wi}`} className="inline-flex whitespace-nowrap transform-gpu">
              {chars.map((_, ci) => {
                const g = glyphData[glyphPtr++];
                if (!g) return null;

                const e = smooth(clamp((p - g.s) / g.len, 0, 1));
                const letterSpacing = g.isLastInWord ? '0em' : `${(0.30 - 0.16 * e).toFixed(4)}em`;
                const crest = g.gold ? e : e * (0.35 + 0.65 * lock);
                const beam = beamOn ? Math.exp(-Math.pow((beamX - g.u) / 0.07, 2)) : 0;
                const brightness = (1 + 0.55 * beam).toFixed(3);
                const dropGold = Math.min(1, crest + beam).toFixed(3);
                const dropShadow = (0.95 * e).toFixed(3);

                let bgClasses = 'bg-gradient-to-br from-white via-[#E2E8F0] to-[#94A3B8]';
                if (g.variant.includes('alpha')) {
                  bgClasses = 'bg-[linear-gradient(100deg,#D4AF37_0%,rgba(255,244,194,0.7)_16%,transparent_34%),linear-gradient(135deg,#FFFFFF_0%,#E2E8F0_28%,#94A3B8_68%,#1E293B_100%)] [-webkit-text-stroke:0.6px_rgba(212,175,55,0.6)]';
                } else if (g.variant.includes('rim')) {
                  bgClasses = 'bg-[linear-gradient(100deg,#D4AF37_0%,rgba(255,244,194,0.7)_18%,rgba(255,255,255,0.3)_30%,transparent_42%),linear-gradient(135deg,#FFFFFF_0%,#E2E8F0_28%,#94A3B8_68%,#1E293B_100%)]';
                } else if (g.variant.includes('split')) {
                  bgClasses = 'bg-[linear-gradient(180deg,transparent_54%,#060911_54%,#0F172A_60%,rgba(56,189,248,0.45)_63%,transparent_63%),linear-gradient(135deg,#FFFFFF_0%,#E2E8F0_28%,#94A3B8_68%,#1E293B_100%)]';
                }

                return (
                  <span
                    key={`${wi}-${ci}`}
                    className={`inline-block bg-clip-text text-transparent will-change-transform ${bgClasses}`}
                    style={{
                      opacity: e,
                      transform: `translate3d(0, ${18 * (1 - e)}px, ${-40 * (1 - e)}px)`,
                      letterSpacing,
                      filter: `brightness(${brightness}) drop-shadow(0 -1px 0 rgba(212,175,55,${dropGold})) drop-shadow(0 7px 9px rgba(10,13,20,${dropShadow}))`,
                    }}
                  >
                    {g.char}
                  </span>
                );
              })}
            </span>
          );
        })}
      </h1>

      {/* Subline with light shine */}
      <p
        className="mt-6 text-[clamp(13px,1.1vw,16px)] tracking-[0.32em] font-sans font-medium text-balance bg-clip-text text-transparent bg-[linear-gradient(100deg,#94A3B8_0%,#94A3B8_38%,#E2E8F0_45%,#FFF4C2_50%,#E2E8F0_55%,#94A3B8_62%,#94A3B8_100%)] bg-[length:300%_100%] transition-transform duration-75"
        style={{
          opacity: subOpacity,
          transform: `translateY(${subY}px)`,
          backgroundPosition: subBgPos,
        }}
      >
        {currentLang.subline}
      </p>
    </div>
  );
};
