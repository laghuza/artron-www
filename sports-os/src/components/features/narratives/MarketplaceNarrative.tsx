"use client";

import { useI18n } from "@/context/I18nContext";
import { useStageOrchestrator } from "@/context/StageOrchestratorContext";

export default function MarketplaceNarrative() {
  const { t } = useI18n();
  const orchestrator = useStageOrchestrator();

  const handleModClick = (modId: string) => {
    if (orchestrator?.selectSubModule) orchestrator.selectSubModule(modId);
  };

  return (
    <div className="space-y-4 font-sans select-none animate-fadeIn">
      <div className="space-y-1">
        <div className="font-mono text-[12px] text-gold-raw uppercase tracking-[0.15em]">
          {t("nodes.node_6.tag")}
        </div>
        <h2 className="text-xl font-bold tracking-tight text-white uppercase">
          {t("nodes.node_6.name")}
        </h2>
      </div>

      {/* Marketplace modular boxes SVG */}
      <div className="bg-iron-surface/40 border border-silver-structure/10 p-4 rounded flex justify-center">
        <svg viewBox="0 0 200 160" className="w-full max-w-[200px] stroke-silver-structure/20 stroke-[1] fill-none">
          {/* Module 1 */}
          <rect onClick={() => handleModClick("MOD_SCHEDULING")} x="25" y="30" width="60" height="40" rx="3" className="stroke-gold-raw/80 hover:stroke-gold-raw cursor-pointer transition-colors" strokeWidth="1.2" />
          <text x="32" y="45" className="fill-gold-raw font-mono text-[5px] stroke-none pointer-events-none">[ MOD_SCHEDULING ]</text>
          <line x1="85" y1="50" x2="115" y2="50" className="stroke-gold-raw/30 stroke-dasharray-[2_2]" />

          {/* Module 2 */}
          <rect onClick={() => handleModClick("MOD_FINANCIAL")} x="115" y="30" width="60" height="40" rx="3" className="stroke-gold-raw/80 hover:stroke-gold-raw cursor-pointer transition-colors" strokeWidth="1.2" />
          <text x="122" y="45" className="fill-gold-raw font-mono text-[5px] stroke-none pointer-events-none">[ MOD_FINANCIAL ]</text>

          {/* Module 3 */}
          <rect onClick={() => handleModClick("CORE_TELEMETRY")} x="70" y="95" width="60" height="40" rx="3" className="stroke-gold-raw/85 hover:stroke-gold-raw cursor-pointer transition-colors" strokeWidth="1.5" />
          <text x="77" y="110" className="fill-gold-raw font-mono text-[5px] stroke-none pointer-events-none">[ CORE_TELEMETRY ]</text>
          
          {/* Pin connections */}
          <circle cx="85" cy="50" r="2.5" className="fill-gold-raw" />
          <circle cx="115" cy="50" r="2.5" className="fill-gold-raw" />
          <path d="M55 70 L100 95" className="stroke-gold-raw/30 stroke-dasharray-[2_2]" />
          <path d="M145 70 L100 95" className="stroke-gold-raw/30 stroke-dasharray-[2_2]" />
        </svg>
      </div>

      <p className="text-[15px] text-bone-light/85 leading-relaxed font-sans">
        {t("nodes.node_6.description")}
      </p>
    </div>
  );
}

