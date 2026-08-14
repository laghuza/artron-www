"use client";

import React from "react";

export const ArtronLogo: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 64 64" className={`${className} fill-none select-none`}>
    {/* Outer Nodes (Neutral White, 2.4px radius, placed on 3x3 boundary coordinates) */}
    <g className="fill-white stroke-white stroke-[0.8]">
      <circle cx="32" cy="8" r="2.4" />
      <circle cx="56" cy="8" r="2.4" />
      <circle cx="56" cy="32" r="2.4" />
      <circle cx="56" cy="56" r="2.4" />
      <circle cx="32" cy="56" r="2.4" />
      <circle cx="8" cy="56" r="2.4" />
      <circle cx="8" cy="32" r="2.4" />
      <circle cx="8" cy="8" r="2.4" />
    </g>
    {/* Center Emerald Core (Emerald Green `#00E676`, 4.4px radius) */}
    <circle cx="32" cy="32" r="4.4" fill="#00E676" className="filter drop-shadow-[0_0_6px_#00E676]" />
  </svg>
);
