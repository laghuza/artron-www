'use client';

import React, { useRef, useEffect } from 'react';

interface ArtronMonolithFacetsProps {
  scrollProgress: number;
  onBoundsChange?: (bounds: {
    left: number;
    right: number;
    top: number;
    bottom: number;
    width: number;
    height: number;
  }) => void;
  className?: string;
}

const smooth = (t: number) => t * t * (3 - 2 * t);
const clamp = (v: number, a: number, b: number) => Math.min(Math.max(v, a), b);

export const ArtronMonolithFacets: React.FC<ArtronMonolithFacetsProps> = ({
  scrollProgress,
  onBoundsChange,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Measure letter cluster bounds for Daisi particle keep-out
  useEffect(() => {
    if (!containerRef.current || !onBoundsChange) return;

    const measure = () => {
      if (!containerRef.current) return;
      const letters = containerRef.current.querySelectorAll('.letter-box');
      if (letters.length > 0) {
        let l = 1e9, r = -1e9, t = 1e9, bt = -1e9;
        letters.forEach((el) => {
          const q = el.getBoundingClientRect();
          l = Math.min(l, q.left);
          r = Math.max(r, q.right);
          t = Math.min(t, q.top);
          bt = Math.max(bt, q.bottom);
        });
        onBoundsChange({
          left: l,
          right: r,
          top: t,
          bottom: bt,
          width: r - l,
          height: bt - t,
        });
        return;
      }
      const rect = containerRef.current.getBoundingClientRect();
      onBoundsChange({
        left: rect.left,
        right: rect.right,
        top: rect.top,
        bottom: rect.bottom,
        width: rect.width,
        height: rect.height,
      });
    };

    measure();
    const tId = setTimeout(measure, 300);
    window.addEventListener('resize', measure, { passive: true });
    return () => {
      clearTimeout(tId);
      window.removeEventListener('resize', measure);
    };
  }, [onBoundsChange]);

  const p = scrollProgress;
  const fp = smooth(Math.min(p * 3.5, 1));
  const lOp = p >= 0.24 ? 0 : 1 - smooth(clamp((p - 0.08) / 0.16, 0, 1));
  const clusterTransform = `scale(${1 - p * 0.08}) translate3d(0, ${-25 * p}px, 0)`;

  return (
    <div
      ref={containerRef}
      className={`relative z-20 flex items-center justify-center gap-[1.6vw] w-[min(92vw,1100px)] select-none will-change-transform ${className}`}
      style={{
        opacity: lOp,
        visibility: lOp <= 0 ? 'hidden' : 'visible',
        transform: clusterTransform,
        perspective: '1800px',
        transformStyle: 'preserve-3d',
      }}
      aria-label="ARTRON Monolith"
    >
      {/* SVG Defs for Chiseled Titanium Gradients */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          <linearGradient id="chiseledTitaniumRamp" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="28%" stopColor="#E2E8F0" />
            <stop offset="68%" stopColor="#94A3B8" />
            <stop offset="100%" stopColor="#1E293B" />
          </linearGradient>
          <linearGradient id="solarGrazingRim" x1="0%" y1="0%" x2="80%" y2="20%">
            <stop offset="0%" stopColor="#D4AF37" />
            <stop offset="45%" stopColor="#FFF4C2" stopOpacity="0.7" />
            <stop offset="80%" stopColor="#FFFFFF" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="glacialShadowUnder" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#060911" />
            <stop offset="70%" stopColor="#0F172A" />
            <stop offset="100%" stopColor="rgba(56, 189, 248, 0.2)" />
          </linearGradient>
        </defs>
      </svg>

      {/* LETTER A */}
      <div className="flex-1 max-w-[155px] aspect-[100/120] relative">
        <svg viewBox="0 0 100 120" className="w-full h-full overflow-visible drop-shadow-[0_25px_50px_rgba(0,0,0,0.98)]">
          <g style={{ transform: `translate(${-25 * fp}px, 0) rotate(${-8 * fp}deg)`, transformOrigin: 'center center' }}>
            <polygon points="50,10 10,106 26,106 50,38" fill="url(#chiseledTitaniumRamp)" />
            <polyline points="20,85 50,10" fill="none" stroke="url(#solarGrazingRim)" strokeWidth="1.4" />
          </g>
          <g style={{ transform: `translate(${25 * fp}px, 0) rotate(${8 * fp}deg)`, transformOrigin: 'center center' }}>
            <polygon points="50,10 50,38 74,106 90,106" fill="url(#chiseledTitaniumRamp)" />
            <polyline points="50,10 80,85" fill="none" stroke="url(#solarGrazingRim)" strokeWidth="1.4" />
          </g>
          <g style={{ transform: `translate(0, ${15 * fp}px) scale(${1 - 0.25 * fp})`, transformOrigin: 'center center' }}>
            <polygon points="50,12 12,108 28,108 50,42 72,108 88,108" fill="url(#glacialShadowUnder)" />
            <rect x="25" y="65" width="50" height="13" fill="url(#chiseledTitaniumRamp)" />
          </g>
        </svg>
      </div>

      {/* LETTER R1 */}
      <div className="flex-1 max-w-[155px] aspect-[100/120] relative">
        <svg viewBox="0 0 100 120" className="w-full h-full overflow-visible drop-shadow-[0_25px_50px_rgba(0,0,0,0.98)]">
          <g>
            <rect x="14" y="10" width="16" height="96" fill="url(#chiseledTitaniumRamp)" />
            <line x1="14" y1="10" x2="14" y2="106" stroke="url(#solarGrazingRim)" strokeWidth="1.4" />
          </g>
          <g style={{ transform: `translate(${10 * fp}px, ${-14 * fp}px)` }}>
            <path d="M30 10 L56 10 C74 10 74 54 56 54 L30 54 Z M30 24 L52 24 C60 24 60 40 52 40 L30 40 Z" fill="url(#chiseledTitaniumRamp)" />
            <line x1="14" y1="10" x2="60" y2="10" stroke="url(#solarGrazingRim)" strokeWidth="1.4" />
          </g>
          <g style={{ transform: `translate(${20 * fp}px, ${15 * fp}px) rotate(${12 * fp}deg)`, transformOrigin: 'center center' }}>
            <polygon points="46,50 82,106 64,106 34,54" fill="url(#chiseledTitaniumRamp)" />
          </g>
        </svg>
      </div>

      {/* LETTER T */}
      <div className="flex-1 max-w-[155px] aspect-[100/120] relative">
        <svg viewBox="0 0 100 120" className="w-full h-full overflow-visible drop-shadow-[0_25px_50px_rgba(0,0,0,0.98)]">
          <g style={{ transform: `translate(${-35 * fp}px, 0)` }}>
            <rect x="8" y="10" width="42" height="15" fill="url(#chiseledTitaniumRamp)" />
            <line x1="8" y1="10" x2="50" y2="10" stroke="url(#solarGrazingRim)" strokeWidth="1.4" />
          </g>
          <g style={{ transform: `translate(${35 * fp}px, 0)` }}>
            <rect x="50" y="10" width="42" height="15" fill="url(#chiseledTitaniumRamp)" />
            <line x1="50" y1="10" x2="92" y2="10" stroke="url(#solarGrazingRim)" strokeWidth="1.4" />
          </g>
          <g style={{ transform: `translate(0, ${25 * fp}px) scaleY(${1 - 0.15 * fp})`, transformOrigin: 'top center' }}>
            <rect x="8" y="24" width="84" height="4" fill="url(#glacialShadowUnder)" />
            <rect x="42" y="25" width="16" height="81" fill="url(#chiseledTitaniumRamp)" />
          </g>
        </svg>
      </div>

      {/* LETTER R2 */}
      <div className="flex-1 max-w-[155px] aspect-[100/120] relative">
        <svg viewBox="0 0 100 120" className="w-full h-full overflow-visible drop-shadow-[0_25px_50px_rgba(0,0,0,0.98)]">
          <g>
            <rect x="14" y="10" width="16" height="96" fill="url(#chiseledTitaniumRamp)" />
            <line x1="14" y1="10" x2="14" y2="106" stroke="url(#solarGrazingRim)" strokeWidth="1.4" />
          </g>
          <g style={{ transform: `translate(${10 * fp}px, ${-14 * fp}px)` }}>
            <path d="M30 10 L56 10 C74 10 74 54 56 54 L30 54 Z M30 24 L52 24 C60 24 60 40 52 40 L30 40 Z" fill="url(#chiseledTitaniumRamp)" />
            <line x1="14" y1="10" x2="60" y2="10" stroke="url(#solarGrazingRim)" strokeWidth="1.4" />
          </g>
          <g style={{ transform: `translate(${20 * fp}px, ${15 * fp}px) rotate(${12 * fp}deg)`, transformOrigin: 'center center' }}>
            <polygon points="46,50 82,106 64,106 34,54" fill="url(#chiseledTitaniumRamp)" />
          </g>
        </svg>
      </div>

      {/* LETTER O */}
      <div className="flex-1 max-w-[155px] aspect-[100/120] relative">
        <svg viewBox="0 0 100 120" className="w-full h-full overflow-visible drop-shadow-[0_25px_50px_rgba(0,0,0,0.98)]">
          <g style={{ transform: `translate(${-28 * fp}px, ${-28 * fp}px) rotate(${-15 * fp}deg)`, transformOrigin: 'center center' }}>
            <path d="M50 10 C32 10 18 20 12 36 L28 42 C32 30 40 25 50 25 Z" fill="url(#chiseledTitaniumRamp)" />
          </g>
          <g style={{ transform: `translate(${28 * fp}px, ${-28 * fp}px) rotate(${15 * fp}deg)`, transformOrigin: 'center center' }}>
            <path d="M50 10 C68 10 82 20 88 36 L72 42 C68 30 60 25 50 25 Z" fill="url(#chiseledTitaniumRamp)" />
          </g>
          <g style={{ transform: `translate(${-28 * fp}px, ${28 * fp}px) rotate(${15 * fp}deg)`, transformOrigin: 'center center' }}>
            <path d="M12 60 C12 88 24 110 50 110 L50 95 C34 95 28 80 28 60 Z" fill="url(#chiseledTitaniumRamp)" />
          </g>
          <g style={{ transform: `translate(${28 * fp}px, ${28 * fp}px) rotate(${-15 * fp}deg)`, transformOrigin: 'center center' }}>
            <path d="M88 60 C88 88 76 110 50 110 L50 95 C66 95 72 80 72 60 Z" fill="url(#chiseledTitaniumRamp)" />
          </g>
        </svg>
      </div>

      {/* LETTER N */}
      <div className="flex-1 max-w-[155px] aspect-[100/120] relative">
        <svg viewBox="0 0 100 120" className="w-full h-full overflow-visible drop-shadow-[0_25px_50px_rgba(0,0,0,0.98)]">
          <g style={{ transform: `translate(${-16 * fp}px, 0)` }}>
            <rect x="12" y="10" width="15" height="96" fill="url(#chiseledTitaniumRamp)" />
          </g>
          <g style={{ transform: `scale(${1 - 0.2 * fp})`, transformOrigin: 'center center' }}>
            <polygon points="27,10 73,106 87,106 41,10" fill="url(#chiseledTitaniumRamp)" />
          </g>
          <g style={{ transform: `translate(${16 * fp}px, 0)` }}>
            <rect x="73" y="10" width="15" height="96" fill="url(#chiseledTitaniumRamp)" />
          </g>
        </svg>
      </div>
    </div>
  );
};
