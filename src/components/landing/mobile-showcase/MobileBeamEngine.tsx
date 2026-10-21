'use client';

import React from 'react';
import { InnerBeamCoords } from './types';
import { SHOWCASE_RGB, SHOWCASE_PALE } from './mobileShowcaseConfig';

interface MobileBeamEngineProps {
  activeId: number;
  inner: InnerBeamCoords | null;
}

export const MobileBeamEngine: React.FC<MobileBeamEngineProps> = ({
  activeId,
  inner,
}) => {
  if (!inner) return null;

  const rgb = SHOWCASE_RGB[activeId];
  const pale = SHOWCASE_PALE[activeId];
  const tx = inner.bx - 7;
  const ty = inner.bty + inner.bh / 2;
  const ex = Math.max(16, Math.min(22, tx - 8));
  const radii: (number | string)[] = [16, 16, 14, '50%', 14, 14, 18, '50%'];
  const r = radii[activeId];

  // SVG path: enters at x=0, y=inner.by, goes horizontally to ex, then vertically to ty, then horizontally to tx
  const pathD = `M0 ${inner.by} H${ex} V${ty} H${tx}`;

  return (
    <div
      key={inner.key}
      className="absolute inset-0 pointer-events-none z-30"
    >
      <svg
        width="300"
        height="620"
        viewBox="0 0 300 620"
        className="absolute left-0 top-0 overflow-visible"
      >
        <path
          d={pathD}
          fill="none"
          stroke={`rgba(${rgb}, 0.9)`}
          strokeWidth="1.25"
          className="animate-[arDraw_0.55s_cubic-bezier(0.4,0,0.2,1)_both]"
          style={{
            filter: `drop-shadow(0 0 4px rgba(${rgb}, 0.85))`,
          }}
        />
        <circle
          cx={tx}
          cy={ty}
          r={2.5}
          fill={pale}
          className="animate-[arFade_0.2s_0.5s_both]"
          style={{
            filter: `drop-shadow(0 0 5px rgba(${rgb}, 0.95))`,
          }}
        />
      </svg>

      {/* Target ping ring around the inner element */}
      <div
        className="absolute animate-[arPing_1.4s_0.5s_cubic-bezier(0.2,0.8,0.2,1)_both]"
        style={{
          left: inner.bx - 4,
          top: inner.bty - 4,
          width: inner.bw + 8,
          height: inner.bh + 8,
          borderRadius: typeof r === 'number' ? `${r + 4}px` : r,
          boxShadow: `0 0 0 1.5px rgba(${rgb}, 0.8), 0 0 20px rgba(${rgb}, 0.35)`,
        }}
      />
    </div>
  );
};
