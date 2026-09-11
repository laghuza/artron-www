'use client';

import React from 'react';

export const MirrorTileModeOverlay: React.FC<{ mode: number }> = ({ mode }) => {
  if (mode === 0) {
    return (
      <svg className="absolute inset-0 w-full h-full max-w-[850px] max-h-[420px] pointer-events-none" viewBox="0 0 700 360" fill="none">
        <circle cx="350" cy="180" r="160" stroke="#00E5FF" strokeWidth="0.8" strokeOpacity="0.35" strokeDasharray="6 6" />
        <line x1="50" y1="180" x2="650" y2="180" stroke="#00E5FF" strokeWidth="0.6" strokeOpacity="0.25" strokeDasharray="4 4" />
        <line x1="350" y1="20" x2="350" y2="340" stroke="#00E5FF" strokeWidth="0.6" strokeOpacity="0.25" strokeDasharray="4 4" />
      </svg>
    );
  }
  if (mode === 1) {
    return (
      <svg className="absolute inset-0 w-full h-full max-w-[850px] max-h-[420px] pointer-events-none" viewBox="0 0 700 360" fill="none">
        <path d="M 100 180 Q 225 120 350 180 T 600 180" stroke="#00E5FF" strokeWidth="1.2" strokeOpacity="0.4" strokeDasharray="4 4" />
        <path d="M 100 180 Q 225 240 350 180 T 600 180" stroke="#00A3FF" strokeWidth="1.2" strokeOpacity="0.3" strokeDasharray="4 4" />
      </svg>
    );
  }
  if (mode === 2) {
    return (
      <svg className="absolute inset-0 w-full h-full max-w-[850px] max-h-[420px] pointer-events-none" viewBox="0 0 700 360" fill="none">
        <circle cx="350" cy="180" r="45" stroke="#00E5FF" strokeWidth="1.2" strokeOpacity="0.5" />
        <circle cx="350" cy="180" r="75" stroke="#00A3FF" strokeWidth="0.8" strokeOpacity="0.3" strokeDasharray="5 5" />
        <circle cx="350" cy="180" r="3" fill="#00E5FF" fillOpacity="0.8" />
      </svg>
    );
  }
  return (
    <svg className="absolute inset-0 w-full h-full max-w-[850px] max-h-[420px] pointer-events-none" viewBox="0 0 700 360" fill="none">
      <polygon points="350,110 390,150 375,210 325,210 310,150" stroke="#10B981" strokeWidth="1.5" strokeOpacity="0.5" fill="#10B981" fillOpacity="0.05" />
      <circle cx="350" cy="180" r="90" stroke="#10B981" strokeWidth="0.8" strokeOpacity="0.25" strokeDasharray="8 6" />
    </svg>
  );
};
