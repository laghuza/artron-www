"use client";

export default function GamificationNarrative() {
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
        <div className="w-full max-w-[200px] transition-transform duration-700 ease-out group-hover/coin:[transform:rotateY(25deg)_rotateX(8deg)] [transform-style:preserve-3d]">
          <svg viewBox="0 0 200 160" className="w-full stroke-silver-structure/20 stroke-[1] fill-none">
            {/* Gold Coin Vector */}
            <circle cx="65" cy="80" r="28" className="stroke-gold-raw" strokeWidth="1.5" />
            <circle cx="65" cy="80" r="20" className="stroke-gold-raw/40" />
            <text x="60" y="85" className="fill-gold-raw font-mono text-[14px] font-bold stroke-none">A</text>

            {/* Achievement Badge Hexagon */}
            <polygon
              points="135,55 160,70 160,95 135,110 110,95 110,70"
              className="stroke-gold-raw"
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
          </svg>
        </div>
      </div>

      <p className="text-[15px] text-bone-light/85 leading-relaxed font-sans">
        ათლეტების წახალისების გეიმიფიცირებული სისტემა. Artron Coin-ები და ციფრული ბეიჯები, რომლებიც გაიცემა მიღწეული შედეგებისა და დასწრების აქტივობებისთვის.
      </p>
    </div>
  );
}
