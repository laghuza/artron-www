'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { FooterCosmicCanvas, FooterCanvasHandle } from './footer/FooterCosmicCanvas';
import { FooterAppBadges } from './footer/FooterAppBadges';
import { FooterNavGrid } from './footer/FooterNavGrid';
import { FooterSlogan } from './footer/FooterSlogan';
import { FooterToast } from './footer/FooterToast';

export const Footer: React.FC = () => {
  const footerRef = useRef<HTMLElement | null>(null);
  const sloganRef = useRef<HTMLHeadingElement | null>(null);
  const canvasHandleRef = useRef<FooterCanvasHandle | null>(null);

  const [showToast, setShowToast] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const toastTimerRef = useRef<NodeJS.Timeout | null>(null);
  const copyTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleNotify = useCallback(() => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setShowToast(false);
    setTimeout(() => {
      setShowToast(true);
      toastTimerRef.current = setTimeout(() => setShowToast(false), 4200);
    }, 30);
  }, []);

  const fallbackCopy = (text: string) => {
    try {
      const t = document.createElement('textarea');
      t.value = text;
      t.style.cssText = 'position:fixed;opacity:0;left:-9999px';
      document.body.appendChild(t);
      t.select();
      document.execCommand('copy');
      t.remove();
    } catch {
      // Ignored fallback
    }
  };

  const handleCopy = useCallback((key: string, text: string) => {
    const markDone = () => {
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
      setCopiedKey(key);
      copyTimerRef.current = setTimeout(() => setCopiedKey(null), 1600);
    };

    if (typeof navigator !== 'undefined' && navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(markDone, () => {
        fallbackCopy(text);
        markDone();
      });
    } else {
      fallbackCopy(text);
      markDone();
    }
  }, []);

  const handleOpenCookiePrefs = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('artron-reopen-cookie-settings'));
    }
  }, []);

  const handleShock = useCallback(() => {
    if (canvasHandleRef.current) {
      canvasHandleRef.current.fireShock();
    }
  }, []);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
    };
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative w-full overflow-hidden isolate mt-8 -webkit-font-smoothing-antialiased"
      style={{
        borderTopLeftRadius: '50% 24px',
        borderTopRightRadius: '50% 24px',
        background:
          'radial-gradient(140% 60% at 50% 0%, #0F1628 0%, #0B101D 38%, #080B15 70%, #05070B 100%)',
      }}
    >
      {/* Atmosphere Gradients */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(90% 38% at 50% 0%, rgba(255,255,255,0.08) 0%, rgba(147,197,253,0.05) 30%, rgba(147,197,253,0) 70%), radial-gradient(60% 40% at 12% 58%, rgba(168,123,65,0.04), transparent 70%), radial-gradient(55% 40% at 90% 62%, rgba(16,185,129,0.035), transparent 70%)',
        }}
      />

      {/* Aurora Breathing Glow */}
      <div
        aria-hidden="true"
        className="absolute left-0 right-0 top-0 h-[clamp(240px,46vh,420px)] z-0 pointer-events-none transform-gpu"
      >
        <div
          className="absolute left-1/2 -top-16 w-[130%] h-full origin-top blur-[16px] animate-aurora-breathe"
          style={{
            background:
              'radial-gradient(18% 30% at 50% 12%, rgba(255,255,255,0.34) 0%, rgba(255,255,255,0) 100%), radial-gradient(36% 52% at 44% 8%, rgba(147,197,253,0.22) 0%, rgba(147,197,253,0) 100%), radial-gradient(40% 60% at 60% 10%, rgba(6,78,59,0.42) 0%, rgba(6,78,59,0) 100%), radial-gradient(60% 80% at 50% 0%, rgba(147,197,253,0.08) 0%, rgba(6,78,59,0.14) 45%, rgba(5,7,11,0) 80%)',
          }}
        />
      </div>

      {/* Cosmic Canvas Particles & Interactive Lightning Engine */}
      <FooterCosmicCanvas
        ref={canvasHandleRef}
        footerRef={footerRef}
        sloganRef={sloganRef}
      />

      {/* Top Arc Glow Flare */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-0 w-[min(720px,70%)] h-[90px] -translate-x-1/2 z-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(50% 100% at 50% 0%, rgba(255,255,255,0.1) 0%, rgba(212,175,55,0.05) 35%, rgba(16,185,129,0.03) 60%, transparent 100%)',
        }}
      />

      {/* Top Beam Border Highlight with Celestial Arch */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[2] pointer-events-none origin-top pt-[1.5px]"
        style={{
          borderTopLeftRadius: '50% 24px',
          borderTopRightRadius: '50% 24px',
          background:
            'linear-gradient(90deg, rgba(100,116,139,0.15) 0%, rgba(148,163,184,0.55) 18%, rgba(226,232,240,0.7) 34%, #93C5FD 44%, #FFFFFF 50%, #93C5FD 56%, rgba(226,232,240,0.7) 66%, rgba(148,163,184,0.55) 82%, rgba(100,116,139,0.15) 100%)',
          WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
          WebkitMaskComposite: 'xor',
          mask: 'linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0)',
        }}
      />

      {/* Center Arch Halo Spotlight */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 -top-2.5 w-[min(420px,50%)] h-6 -translate-x-1/2 z-[2] pointer-events-none rounded-full blur-[6px]"
        style={{
          background:
            'radial-gradient(50% 50% at 50% 50%, rgba(255,255,255,0.9) 0%, rgba(147,197,253,0.55) 30%, rgba(147,197,253,0) 72%)',
        }}
      />

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-12 flex flex-col">
        {/* Upper: Mobile App Status Bar */}
        <FooterAppBadges onNotify={handleNotify} />

        {/* Middle: 3-Column Navigation & Legal Grid */}
        <FooterNavGrid
          onCopy={handleCopy}
          copiedKey={copiedKey}
          onOpenCookiePrefs={handleOpenCookiePrefs}
        />
      </div>

      {/* Bottom: Fluid Slogan & Global Copyright */}
      <FooterSlogan sloganRef={sloganRef} onShock={handleShock} />

      {/* Interactive Floating Release Toast */}
      <FooterToast show={showToast} />
    </footer>
  );
};
