import React from 'react';

interface SectionTransitionProps {
  /** 'default' | 'sparse' | 'laser' */
  variant?: 'default' | 'sparse' | 'laser';
  className?: string;
}

/**
 * Decorative between-section atmospheric divider with laser data stream conduits.
 * Pure CSS — zero JavaScript overhead, zero layout shift (CLS=0).
 * Renders brand-cyan geometric nodes + laser pulse hairline + quantum packet bursts.
 * aria-hidden: true — purely decorative, invisible to screen readers.
 */
export const SectionTransition: React.FC<SectionTransitionProps> = ({
  variant = 'laser',
  className = '',
}) => {
  return (
    <div
      className={`relative w-full h-16 sm:h-20 overflow-hidden pointer-events-none select-none z-10 ${className}`}
      aria-hidden="true"
      role="presentation"
    >
      {/* Background Soft Glow Center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 max-w-4xl h-8 bg-[#00A3FF]/5 blur-xl" />

      {/* Hairline Conduit — fades in smoothly from edges */}
      <div
        className="absolute h-[1px] bg-gradient-to-r from-transparent via-[#00A3FF]/35 to-transparent"
        style={{ top: '50%', left: '2%', right: '2%' }}
      />

      {/* Laser Glow Tube Accent */}
      <div
        className="absolute h-[2px] bg-gradient-to-r from-transparent via-[#00D2FF]/40 to-transparent blur-[1px]"
        style={{ top: '50%', left: '10%', right: '10%' }}
      />

      {/* Center Glowing Quantum Diamond Node */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
        <div className="w-4 h-4 rounded-full bg-[#00A3FF]/20 animate-ping" />
        <div className="absolute w-2 h-2 rounded-[2px] rotate-45 bg-[#00D2FF] shadow-[0_0_10px_#00A3FF,0_0_20px_#0066FF]" />
        <div className="absolute w-1 h-1 rounded-full bg-white shadow-[0_0_4px_#FFFFFF]" />
      </div>

      {/* Quantum Data Packet Flowing Left -> Right */}
      <div
        className="absolute h-[2px] w-16 rounded-full bg-gradient-to-r from-transparent via-[#00D2FF] to-transparent shadow-[0_0_10px_#00D2FF,0_0_20px_#00A3FF]"
        style={{
          top: '50%',
          transform: 'translateY(-50%)',
          animation: 'laser-pulse-flow 7s ease-in-out infinite',
        }}
      />

      {/* Node A — floating cyan particle top-left */}
      <div
        className="absolute w-1.5 h-1.5 rounded-full bg-[#00A3FF]/40 shadow-[0_0_6px_#00A3FF]"
        style={{ top: '30%', left: '15%', animation: 'st-float-a 9s ease-in-out infinite' }}
      />

      {/* Node B — emerald particle center-left */}
      <div
        className="absolute w-2 h-2 rounded-full bg-[#10B981]/30 shadow-[0_0_8px_#10B981]"
        style={{ top: '52%', left: '34%', animation: 'st-float-b 13s ease-in-out infinite' }}
      />

      {/* Node C — bright cyan particle right */}
      <div
        className="absolute w-1.5 h-1.5 rounded-full bg-[#00D2FF]/40 shadow-[0_0_6px_#00D2FF]"
        style={{ top: '38%', right: '18%', animation: 'st-float-c 11s ease-in-out infinite' }}
      />

      {/* Diamond — rotated square right */}
      {variant !== 'sparse' && (
        <div
          className="absolute w-2.5 h-2.5 border border-[#00A3FF]/30 rotate-45 shadow-[0_0_6px_rgba(0,163,255,0.2)]"
          style={{ top: '25%', left: '72%', animation: 'st-float-a 15s ease-in-out infinite reverse' }}
        />
      )}

      {/* Micro dot — tiny accent far right */}
      <div
        className="absolute w-1 h-1 rounded-full bg-[#00A3FF]/25 shadow-[0_0_4px_#00A3FF]"
        style={{ top: '58%', left: '88%', animation: 'st-float-b 17s ease-in-out infinite reverse' }}
      />
    </div>
  );
};

