"use client";

import React from "react";

export const ArtronLogo: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 64 64" className={`${className} fill-none select-none`}>
    <g className="stroke-[#9CA3AF]/35">
      <line x1="8" y1="8" x2="32" y2="8" strokeWidth="1.1" strokeLinecap="round" />
      <line x1="32" y1="8" x2="56" y2="8" strokeWidth="1.1" strokeLinecap="round" />
      <line x1="56" y1="8" x2="56" y2="32" strokeWidth="1.1" strokeLinecap="round" />
      <line x1="56" y1="32" x2="56" y2="56" strokeWidth="1.1" strokeLinecap="round" />
      <line x1="56" y1="56" x2="32" y2="56" strokeWidth="1.1" strokeLinecap="round" />
      <line x1="32" y1="56" x2="8" y2="56" strokeWidth="1.1" strokeLinecap="round" />
      <line x1="8" y1="56" x2="8" y2="32" strokeWidth="1.1" strokeLinecap="round" />
      <line x1="8" y1="32" x2="8" y2="8" strokeWidth="1.1" strokeLinecap="round" />
      <line x1="32" y1="8" x2="32" y2="32" strokeWidth="1.1" strokeLinecap="round" />
      <line x1="56" y1="8" x2="32" y2="32" strokeWidth="1.1" strokeLinecap="round" />
      <line x1="56" y1="32" x2="32" y2="32" strokeWidth="1.1" strokeLinecap="round" />
      <line x1="56" y1="56" x2="32" y2="32" strokeWidth="1.1" strokeLinecap="round" />
      <line x1="32" y1="56" x2="32" y2="32" strokeWidth="1.1" strokeLinecap="round" />
      <line x1="8" y1="56" x2="32" y2="32" strokeWidth="1.1" strokeLinecap="round" />
      <line x1="8" y1="32" x2="32" y2="32" strokeWidth="1.1" strokeLinecap="round" />
      <line x1="8" y1="8" x2="32" y2="32" strokeWidth="1.1" strokeLinecap="round" />
    </g>
    <g className="fill-[#121418] stroke-[#9CA3AF] stroke-[1.2]">
      <circle cx="32" cy="8" r="2.4" /><circle cx="56" cy="8" r="2.4" /><circle cx="56" cy="32" r="2.4" /><circle cx="56" cy="56" r="2.4" />
      <circle cx="32" cy="56" r="2.4" /><circle cx="8" cy="56" r="2.4" /><circle cx="8" cy="32" r="2.4" /><circle cx="8" cy="8" r="2.4" />
    </g>
    <circle cx="32" cy="32" r="3.2" fill="#00E676" />
  </svg>
);
