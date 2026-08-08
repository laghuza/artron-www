"use client";

import React, { useEffect } from 'react';
import { PortalState } from '@/types/gateway';

interface EmeraldPortalGateProps {
  portalState: PortalState;
  onBypass: () => void;
}

export const EmeraldPortalGate: React.FC<EmeraldPortalGateProps> = ({
  portalState,
  onBypass,
}) => {
  const isTransitioning = portalState === 'IGNITION' || portalState === 'EXPANDING';

  useEffect(() => {
    if (!isTransitioning) return;

    // Respect prefers-reduced-motion: bypass animation frames immediately
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      onBypass();
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onBypass();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isTransitioning, onBypass]);

  if (!isTransitioning) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden flex items-center justify-center">
      {/* Phase 2: Concentric Shockwave Ignition Ring */}
      {portalState === 'IGNITION' && (
        <div
          className="fixed left-1/2 top-1/2 rounded-full border-2 border-[#00E676] animate-ignition-blast"
          style={{
            width: '32px',
            height: '32px',
            transform: 'translate3d(-50%, -50%, 0)',
            willChange: 'transform, opacity',
          }}
        />
      )}

      {/* Phase 3: Core Expansion Overlay */}
      {portalState === 'EXPANDING' && (
        <div
          className="fixed left-1/2 top-1/2 rounded-full animate-core-expand"
          style={{
            width: '32px',
            height: '32px',
            transform: 'translate3d(-50%, -50%, 0)',
            willChange: 'transform, opacity',
          }}
        />
      )}
    </div>
  );
};
