'use client';

import React, { useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';

interface FooterSloganProps {
  sloganRef: React.RefObject<HTMLHeadingElement | null>;
  onShock: () => void;
}

export const FooterSlogan: React.FC<FooterSloganProps> = ({ sloganRef, onShock }) => {
  const { t } = useLanguage();

  // Handle slogan click shockwave flare effect
  const handleClick = () => {
    onShock();
    const sl = sloganRef.current;
    if (!sl || !sl.animate || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const base =
      'drop-shadow(0 1px 0 rgba(255,255,255,0.08)) drop-shadow(0 22px 34px rgba(0,0,0,0.65))';
    sl.animate(
      [
        { filter: `${base} drop-shadow(0 0 0 rgba(243,217,138,0)) brightness(1)` },
        { filter: `${base} drop-shadow(0 0 10px rgba(243,217,138,0.55)) brightness(1.45)`, offset: 0.18 },
        { filter: `${base} drop-shadow(0 0 3px rgba(162,201,242,0.35)) brightness(1.12)`, offset: 0.5 },
        { filter: `${base} drop-shadow(0 0 0 rgba(243,217,138,0)) brightness(1)` },
      ],
      { duration: 1100, easing: 'cubic-bezier(.2,.7,.2,1)' }
    );
  };

  useEffect(() => {
    const sl = sloganRef.current;
    if (!sl) return;

    let raf = 0;
    let spec = -0.5;
    let last = performance.now();
    let isHovering = false;
    let mouseRelX = 0.5;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = sl.getBoundingClientRect();
      if (
        e.clientX >= rect.left - 100 &&
        e.clientX <= rect.right + 100 &&
        e.clientY >= rect.top - 50 &&
        e.clientY <= rect.bottom + 50
      ) {
        isHovering = true;
        mouseRelX = (e.clientX - rect.left) / (rect.width || 1);
      } else {
        isHovering = false;
      }
    };

    const loop = (now: number) => {
      const dt = Math.min(50, now - last);
      last = now;
      const k = dt / 16.67;

      const tgt = isHovering
        ? Math.max(-0.4, Math.min(1.4, mouseRelX))
        : 0.5 + 0.9 * Math.sin(now / 5200);

      spec += (tgt - spec) * (1 - Math.pow(0.92, k));
      const pos = (((1.25 - spec) / 1.5) * 100).toFixed(2);
      sl.style.backgroundPosition = `${pos}% 0, 0 0`;

      raf = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [sloganRef]);

  const band =
    'linear-gradient(105deg,rgba(147,197,253,0) 43%,rgba(191,219,254,0.6) 48%,#FFFFFF 50%,rgba(191,219,254,0.6) 52%,rgba(147,197,253,0) 57%)';
  const chrome =
    'linear-gradient(180deg,#F8FAFC 0%,#E2E8F0 22%,#CBD5E1 44%,#94A3B8 70%,#64748B 100%)';

  return (
    <section className="relative z-10 w-full overflow-hidden">
      {/* Light Sweeping Arc Line */}
      <div
        data-rim="h"
        aria-hidden="true"
        className="relative h-px w-full overflow-hidden"
        style={{
          background:
            'linear-gradient(90deg,rgba(168,123,65,0) 0%,rgba(168,123,65,0.45) 20%,rgba(212,175,55,0.5) 50%,rgba(168,123,65,0.45) 80%,rgba(168,123,65,0) 100%)',
        }}
      >
        <span
          aria-hidden="true"
          className="absolute top-0 left-0 w-[min(36vw,460px)] h-full animate-arc-line"
          style={{
            background:
              'linear-gradient(90deg,transparent,rgba(147,197,253,0.6) 60%,#FFFFFF 95%,transparent)',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-12 pb-4 md:pb-6 flex flex-col items-center gap-6 md:gap-8">
        {/* Colossal Fluid Slogan */}
        <div data-reveal="slogan" className="relative text-center w-full select-none">
          {/* Atmosphere Glow Behind Slogan */}
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(900px,95%)] h-[60%] pointer-events-none rounded-full blur-[50px]"
            style={{
              background:
                'linear-gradient(90deg,rgba(147,197,253,0.07),rgba(6,78,59,0.16),rgba(147,197,253,0.07))',
            }}
          />

          <h3
            ref={sloganRef}
            onClick={handleClick}
            title="Click to ignite shockwave"
            className="m-0 inline-block px-1 pb-2 cursor-pointer font-extrabold tracking-[-0.03em] leading-[1.02] text-balance transition-transform active:scale-[0.99] select-none"
            style={{
              fontSize: 'clamp(36px, min(6.8vw, 12vh), 108px)',
              WebkitTextStroke: '1px rgba(226,232,240,0.22)',
              filter:
                'drop-shadow(0 1px 0 rgba(255,255,255,0.08)) drop-shadow(0 22px 34px rgba(0,0,0,0.65))',
              backgroundImage: `${band}, ${chrome}`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: '130% 0, 0 0',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              backgroundSize: '250% 100%, 100% 100%',
              transform: 'translateZ(0)',
            }}
          >
            {t('footer_slogan')}
          </h3>
        </div>

        {/* Lower Copyright & Telemetry Bar */}
        <div
          data-reveal="rise"
          data-order="4"
          data-rim="top"
          className="relative w-full flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-400/10 text-xs text-[#64748B]"
        >
          <div className="text-center sm:text-left tracking-wide">
            &copy; 2026 {t('logo_text') || 'ARTRON'}. {t('footer_all_rights')}
          </div>
          <div className="flex items-center gap-3 font-mono text-[11px] text-[#64748B]">
            <span>Georgia / Kutaisi</span>
            <span>•</span>
            <span className="text-[#00A3FF]">v1.0.0</span>
          </div>
        </div>
      </div>
    </section>
  );
};
