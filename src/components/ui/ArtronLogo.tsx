"use client";

interface ArtronLogoProps {
  className?: string;
}

export default function ArtronLogo({ className = "w-5 h-5" }: ArtronLogoProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={`${className} fill-none`}
    >
      {/* Connectors (Antique Silver, strokeWidth 1.1) */}
      <g
        id="artron-connectors"
        className="stroke-[#9CA3AF]/40 group-hover:stroke-[#9CA3AF]/70 transition-colors duration-500"
        strokeWidth="1.1"
        strokeLinecap="round"
        fill="none"
      >
        {/* Horizontal */}
        <line x1="8" y1="8" x2="56" y2="8" />
        <line x1="8" y1="32" x2="56" y2="32" />
        <line x1="8" y1="56" x2="56" y2="56" />
        {/* Vertical */}
        <line x1="8" y1="8" x2="8" y2="56" />
        <line x1="32" y1="8" x2="32" y2="56" />
        <line x1="56" y1="8" x2="56" y2="56" />
        {/* Diagonals */}
        <line x1="8" y1="8" x2="56" y2="56" />
        <line x1="56" y1="8" x2="8" y2="56" />
      </g>

      {/* 8 Outer Nodes (Antique Silver `#9CA3AF`, 2.4px radius, placed on 3x3 boundary coordinates) */}
      <g
        id="artron-outer-nodes"
        className="fill-[#9CA3AF] stroke-[#9CA3AF] stroke-[0.8] group-hover:fill-white group-hover:stroke-white transition-colors duration-500"
      >
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
      <g id="artron-emerald-core" className="artron-emerald-core fill-[#00E676] stroke-[#00E676] stroke-[0.8] filter drop-shadow-[0_0_6px_#00E676]">
        <circle cx="32" cy="32" r="4.4" />
      </g>
    </svg>
  );
}

