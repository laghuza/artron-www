"use client";

import { useI18n } from "@/context/I18nContext";

export default function AnalyticsNarrative() {
  const { t } = useI18n();

  return (
    <div className="space-y-4 font-sans select-none animate-fadeIn">
      <div className="space-y-1">
        <div className="font-mono text-[12px] text-silver-structure/70 uppercase tracking-[0.15em]">
          {t("nodes.node_7.tag")}
        </div>
        <h2 className="text-xl font-bold tracking-tight text-white uppercase">
          {t("nodes.node_7.name")}
        </h2>
      </div>

      {/* Analytics Chart SVG */}
      <div className="bg-iron-surface/40 border border-silver-structure/10 p-4 rounded flex justify-center">
        <svg viewBox="0 0 200 160" className="w-full max-w-[200px] stroke-silver-structure/20 stroke-[1] fill-none">
          {/* Grid lines */}
          <line x1="20" y1="20" x2="20" y2="140" />
          <line x1="20" y1="140" x2="180" y2="140" />
          <line x1="20" y1="60" x2="180" y2="60" className="stroke-silver-structure/5" />
          <line x1="20" y1="100" x2="180" y2="100" className="stroke-silver-structure/5" />

          {/* Chart Spline line */}
          <path
            d="M 20 120 Q 50 110 70 80 T 120 90 T 150 40 T 180 30"
            className="stroke-silver-structure/70"
            strokeWidth="1.5"
          />

          {/* Glowing node point */}
          <circle cx="150" cy="40" r="3" className="fill-emerald-core" />
          <circle cx="150" cy="40" r="6" className="stroke-emerald-core/30 animate-pulse" />
          
          <text x="110" y="32" className="fill-silver-structure/50 font-mono text-[5px] stroke-none">PEAK_LOAD: 98.4%</text>
        </svg>
      </div>

      <p className="text-[15px] text-bone-light/85 leading-relaxed font-sans">
        {t("nodes.node_7.description")}
      </p>
    </div>
  );
}
