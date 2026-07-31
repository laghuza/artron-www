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
      {/* Connectors (Outer boundary square + internal diagonals/cross lines) */}
      <g id="artron-connectors" className="artron-connectors stroke-silver-structure/35">
        {/* Outer Perimeter */}
        <line x1="8" y1="8" x2="32" y2="8" strokeWidth="1.1" strokeLinecap="round" />
        <line x1="32" y1="8" x2="56" y2="8" strokeWidth="1.1" strokeLinecap="round" />
        <line x1="56" y1="8" x2="56" y2="32" strokeWidth="1.1" strokeLinecap="round" />
        <line x1="56" y1="32" x2="56" y2="56" strokeWidth="1.1" strokeLinecap="round" />
        <line x1="56" y1="56" x2="32" y2="56" strokeWidth="1.1" strokeLinecap="round" />
        <line x1="32" y1="56" x2="8" y2="56" strokeWidth="1.1" strokeLinecap="round" />
        <line x1="8" y1="56" x2="8" y2="32" strokeWidth="1.1" strokeLinecap="round" />
        <line x1="8" y1="32" x2="8" y2="8" strokeWidth="1.1" strokeLinecap="round" />

        {/* Inner Cross and Diagonals connected to Center (32,32) */}
        <line x1="32" y1="8" x2="32" y2="32" strokeWidth="1.1" strokeLinecap="round" />
        <line x1="56" y1="8" x2="32" y2="32" strokeWidth="1.1" strokeLinecap="round" />
        <line x1="56" y1="32" x2="32" y2="32" strokeWidth="1.1" strokeLinecap="round" />
        <line x1="56" y1="56" x2="32" y2="32" strokeWidth="1.1" strokeLinecap="round" />
        <line x1="32" y1="56" x2="32" y2="32" strokeWidth="1.1" strokeLinecap="round" />
        <line x1="8" y1="56" x2="32" y2="32" strokeWidth="1.1" strokeLinecap="round" />
        <line x1="8" y1="32" x2="32" y2="32" strokeWidth="1.1" strokeLinecap="round" />
        <line x1="8" y1="8" x2="32" y2="32" strokeWidth="1.1" strokeLinecap="round" />
      </g>

      {/* Outer Nodes (Antique Silver, 2.4px radius, placed on 3x3 boundary coordinates) */}
      <g id="artron-outer-nodes" className="artron-outer-nodes fill-iron stroke-[#9CA3AF] stroke-[1.2]">
        <circle cx="32" cy="8" r="2.4" />
        <circle cx="56" cy="8" r="2.4" />
        <circle cx="56" cy="32" r="2.4" />
        <circle cx="56" cy="56" r="2.4" />
        <circle cx="32" cy="56" r="2.4" />
        <circle cx="8" cy="56" r="2.4" />
        <circle cx="8" cy="32" r="2.4" />
        <circle cx="8" cy="8" r="2.4" />
      </g>

      {/* Center Emerald Core (Emerald, 4.4px radius) */}
      <g id="artron-emerald-core" className="artron-emerald-core fill-[#00E676] stroke-[#00E676] stroke-[1]">
        <circle cx="32" cy="32" r="4.4" />
      </g>
    </svg>
  );
}
