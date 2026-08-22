"use client";

interface ArtronLogoProps {
  className?: string;
  vivid?: boolean;
}

export default function ArtronLogo({ className = "w-6 h-6", vivid = false }: ArtronLogoProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={`${className} fill-none select-none`}
    >
      <defs>
        {/* Glow filter for Emerald Core */}
        <filter id="emerald-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Subtle glow for Outer Nodes */}
        <filter id="node-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Gradients */}
        <radialGradient id="emeraldRadial" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#00FF87" />
          <stop offset="70%" stopColor="#00E676" />
          <stop offset="100%" stopColor="#00B0FF" />
        </radialGradient>

        <radialGradient id="nodeRadial" cx="40%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="70%" stopColor="#E2E8F0" />
          <stop offset="100%" stopColor="#94A3B8" />
        </radialGradient>
      </defs>

      {/* 8 Outer Nodes (Clean, luminous, floating quantum nodes - No Connector Lines) */}
      <g
        id="artron-outer-nodes"
        filter="url(#node-glow)"
        className="transition-all duration-500"
      >
        <circle cx="32" cy="8" r={vivid ? "3.2" : "2.6"} fill="url(#nodeRadial)" />
        <circle cx="56" cy="8" r={vivid ? "3.2" : "2.6"} fill="url(#nodeRadial)" />
        <circle cx="56" cy="32" r={vivid ? "3.2" : "2.6"} fill="url(#nodeRadial)" />
        <circle cx="56" cy="56" r={vivid ? "3.2" : "2.6"} fill="url(#nodeRadial)" />
        <circle cx="32" cy="56" r={vivid ? "3.2" : "2.6"} fill="url(#nodeRadial)" />
        <circle cx="8" cy="56" r={vivid ? "3.2" : "2.6"} fill="url(#nodeRadial)" />
        <circle cx="8" cy="32" r={vivid ? "3.2" : "2.6"} fill="url(#nodeRadial)" />
        <circle cx="8" cy="8" r={vivid ? "3.2" : "2.6"} fill="url(#nodeRadial)" />
      </g>

      {/* Center Emerald Core (High-tech focal point with radiant emerald glow) */}
      <g id="artron-emerald-core" filter="url(#emerald-glow)">
        <circle
          cx="32"
          cy="32"
          r={vivid ? "5.4" : "4.6"}
          fill="url(#emeraldRadial)"
        />
        {/* Core hot-spot highlight */}
        <circle cx="30.5" cy="30.5" r="1.4" fill="#FFFFFF" opacity="0.8" />
      </g>
    </svg>
  );
}


