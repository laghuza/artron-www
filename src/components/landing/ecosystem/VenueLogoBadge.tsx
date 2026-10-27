"use client";

import React, { useState } from "react";
import Image from "next/image";

interface VenueLogoBadgeProps {
  logoSrc?: string;
  name: string;
  accent?: string;
  size?: number;
  className?: string;
  isContained?: boolean;
}

export const VenueLogoBadge: React.FC<VenueLogoBadgeProps> = ({
  logoSrc,
  name,
  accent = "#00A3FF",
  size = 28,
  className = "w-7 h-7",
  isContained = false,
}) => {
  const [hasError, setHasError] = useState(false);

  // If no source or image loading failed, render high-contrast monogram badge
  if (!logoSrc || hasError) {
    const initials = name
      .replace(/[^a-zA-Z0-9\u10D0-\u10FA\s]/g, "")
      .split(/\s+/)
      .filter(Boolean)
      .map((w) => w[0])
      .join("")
      .slice(0, 3)
      .toUpperCase();

    return (
      <div
        className={`${className} rounded-full border border-white/20 bg-[#0B0F17] flex items-center justify-center shrink-0 shadow-sm transition-transform`}
        style={{ borderColor: `${accent}60` }}
        title={name}
      >
        <span
          className="text-[9px] font-mono font-bold tracking-tighter select-none"
          style={{ color: accent }}
        >
          {initials || "•"}
        </span>
      </div>
    );
  }

  const isExplicitlyContained = isContained || name.includes("ბაზაძის") || name.toLowerCase().includes("bazadze");

  return (
    <div
      className={`${className} rounded-full overflow-hidden shrink-0 border border-white/20 flex items-center justify-center transition-all ${
        isExplicitlyContained ? "bg-white p-0.5" : "bg-black/80"
      }`}
    >
      <Image
        src={logoSrc}
        alt={name}
        width={size}
        height={size}
        className={`w-full h-full ${isExplicitlyContained ? "object-contain" : "object-cover"}`}
        onError={() => setHasError(true)}
      />
    </div>
  );
};
