import React from 'react';

interface SectionTransitionProps {
  /** Sparse = only line + 2 nodes. Default includes diamond. */
  variant?: 'default' | 'sparse';
  className?: string;
}

/**
 * Decorative between-section atmospheric divider.
 *
 * Pure CSS — zero JavaScript, zero scroll listeners.
 * Renders 3-4 floating brand-cyan geometric nodes + a
 * fading hairline. Opacity kept intentionally low (0.06–0.15)
 * to remain atmospheric, not distracting.
 *
 * aria-hidden: true — purely decorative, invisible to screen readers.
 */
export const SectionTransition: React.FC<SectionTransitionProps> = ({
  variant = 'default',
  className = '',
}) => {
  return (
    <div
      className={`relative w-full h-20 overflow-hidden pointer-events-none select-none ${className}`}
      aria-hidden="true"
      role="presentation"
    >
      {/* Hairline — fades in from edges */}
      <div
        className="absolute h-[1px] bg-gradient-to-r from-transparent via-[#00A3FF]/10 to-transparent"
        style={{ top: '50%', left: '8%', right: '8%' }}
      />

      {/* Node A — slow drift, top-left quadrant */}
      <div
        className="absolute w-1.5 h-1.5 rounded-full bg-[#00A3FF]/20"
        style={{ top: '28%', left: '14%', animation: 'st-float-a 9s ease-in-out infinite' }}
      />

      {/* Node B — medium drift, center */}
      <div
        className="absolute w-2 h-2 rounded-full bg-[#00A3FF]/10"
        style={{ top: '55%', left: '49%', animation: 'st-float-b 13s ease-in-out infinite' }}
      />

      {/* Node C — fast drift, right */}
      <div
        className="absolute w-1 h-1 rounded-full bg-[#00A3FF]/15"
        style={{ top: '35%', right: '18%', animation: 'st-float-c 11s ease-in-out infinite' }}
      />

      {/* Diamond — rotated square, only in default variant */}
      {variant === 'default' && (
        <div
          className="absolute w-2 h-2 border border-[#00A3FF]/10 rotate-45"
          style={{ top: '22%', left: '72%', animation: 'st-float-a 15s ease-in-out infinite reverse' }}
        />
      )}

      {/* Micro dot — tiny accent far right */}
      <div
        className="absolute w-1 h-1 rounded-full bg-[#00A3FF]/8"
        style={{ top: '60%', left: '88%', animation: 'st-float-b 17s ease-in-out infinite reverse' }}
      />
    </div>
  );
};
