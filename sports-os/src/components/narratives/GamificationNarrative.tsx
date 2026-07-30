"use client";

import { useState } from "react";

interface HoveredItem {
  name: string;
  status: string;
  x: number;
  y: number;
}

export default function GamificationNarrative() {
  const [hoveredItem, setHoveredItem] = useState<HoveredItem | null>(null);

  return (
    <div className="space-y-4 font-sans select-none animate-fadeIn">
      <div className="space-y-1">
        <div className="font-mono text-[12px] text-gold-raw uppercase tracking-[0.15em]">
          [ NODE_05 // GAMIFICATION_ENGINE ]
        </div>
        <h2 className="text-xl font-bold tracking-tight text-white uppercase">
          COINS & ACHIEVEMENTS
        </h2>
      </div>

      {/* Gamification Badge SVG */}
      <div className="bg-iron-surface/40 border border-silver-structure/10 p-4 rounded flex justify-center group/coin [perspective:1000px]">
        <div className="w-full max-w-[200px] transition-transform duration-700 ease-out group-hover/coin:[transform:rotateY(25deg)_rotateX(8deg)] [transform-style:preserve-3d] relative">
          <svg viewBox="0 0 200 160" className="w-full stroke-silver-structure/20 stroke-[1] fill-none">
            {/* Gold Coin Group */}
            <g
              className="cursor-pointer"
              onMouseEnter={() => setHoveredItem({
                name: "COIN_DISPENSER_05",
                status: "SECURE_ACTIVE",
                x: 65,
                y: 80
              })}
              onMouseLeave={() => setHoveredItem(null)}
            >
              {/* Gold Coin Vector */}
              <circle cx="65" cy="80" r="28" className="stroke-gold-raw hover:stroke-gold-raw/80 transition-colors" strokeWidth="1.5" />
              <circle cx="65" cy="80" r="20" className="stroke-gold-raw/40" />
              <text x="60" y="85" className="fill-gold-raw font-mono text-[14px] font-bold stroke-none">A</text>
            </g>

            {/* Achievement Badge Hexagon Group */}
            <g
              className="cursor-pointer"
              onMouseEnter={() => setHoveredItem({
                name: "BADGE_CREATION_UNIT",
                status: "PROVISIONED",
                x: 135,
                y: 82.5
              })}
              onMouseLeave={() => setHoveredItem(null)}
            >
              {/* Achievement Badge Hexagon */}
              <polygon
                points="135,55 160,70 160,95 135,110 110,95 110,70"
                className="stroke-gold-raw hover:stroke-gold-raw/80 transition-colors"
                strokeWidth="1.5"
              />
              <polygon
                points="135,62 153,73 153,92 135,103 117,92 117,73"
                className="stroke-gold-raw/30"
              />
              {/* Star in badge */}
              <polygon
                points="135,73 138,81 146,81 140,86 142,94 135,89 128,94 130,86 124,81 132,81"
                className="fill-gold-raw stroke-none"
              />
            </g>
          </svg>

          {/* Floating Tooltip */}
          {hoveredItem && (
            <div
              className="absolute bg-[#1A1D23]/95 border border-silver-structure/20 backdrop-blur-[8px] px-3 py-1.5 rounded-[4px] font-mono text-[9px] text-white shadow-[0_4px_12px_rgba(0,0,0,0.55)] pointer-events-none transform -translate-x-1/2 -translate-y-full mb-3 z-30 transition-opacity duration-200 [transform-style:flat]"
              style={{
                left: `${(hoveredItem.x / 200) * 100}%`,
                top: `${(hoveredItem.y / 160) * 100}%`,
              }}
            >
              <div className="text-gold-raw font-bold text-[10px]">[ DEVICE: {hoveredItem.name} ]</div>
              <div className="text-silver-structure/70 mt-0.5">// [ STATUS: {hoveredItem.status} ]</div>
            </div>
          )}
        </div>
      </div>

      <p className="text-[15px] text-bone-light/85 leading-relaxed font-sans">
        ათლეტების წახალისების გეიმიფიცირებული სისტემა. Artron Coin-ები და ციფრული ბეიჯები, რომლებიც გაიცემა მიღწეული შედეგებისა და დასწრების აქტივობებისთვის.
      </p>
    </div>
  );
}
