"use client";

import Link from "next/link";
import { useI18n } from "@/context/I18nContext";
import { useStageOrchestrator } from "@/context/StageOrchestratorContext";

export default function SlaSecurityNarrative({ onDataPurgeTrigger }: { onDataPurgeTrigger?: () => void }) {
  const { t } = useI18n();
  const orchestrator = useStageOrchestrator();

  const handlePurge = () => {
    if (orchestrator?.selectSubModule) orchestrator.selectSubModule("data_purge");
    if (onDataPurgeTrigger) onDataPurgeTrigger();
  };

  return (
    <div className="space-y-4 font-sans select-none animate-fadeIn">
      <div className="space-y-1">
        <div className="font-mono text-[12px] text-silver-structure/70 uppercase tracking-[0.15em]">
          {t("nodes.node_8.tag")}
        </div>
        <h2 className="text-xl font-bold tracking-tight text-white uppercase">
          {t("nodes.node_8.name")}
        </h2>
      </div>

      {/* Shield Vector SVG */}
      <div className="bg-iron-surface/40 border border-silver-structure/10 p-4 rounded flex justify-center">
        <svg viewBox="0 0 200 160" className="w-full max-w-[200px] stroke-silver-structure/20 stroke-[1.2] fill-none">
          {/* Shield outline */}
          <path d="M100 25 C130 25, 155 35, 155 35 C155 35, 155 90, 100 135 C45 90, 45 35, 45 35 C45 35, 70 25, 100 25 Z" />
          <path d="M100 32 C125 32, 147 41, 147 41 C147 41, 147 85, 100 126 C53 85, 53 41, 53 41 C53 41, 75 32, 100 32 Z" className="stroke-silver-structure/10" />

          {/* Core Check */}
          <path d="M75 75 L93 93 L125 58" className="stroke-emerald-core" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          
          <text x="75" y="148" className="fill-silver-structure/50 font-mono text-[5px] stroke-none">COMPLIANCE: GDPR SECURE</text>
        </svg>
      </div>

      <p className="text-[15px] text-bone-light/85 leading-relaxed font-sans">
        {t("nodes.node_8.description")}
      </p>

      <div className="grid grid-cols-2 gap-x-3 gap-y-2 mt-4 font-mono text-[10px] tracking-wider">
        <Link 
          href="/privacy" 
          onClick={() => orchestrator?.selectSubModule("privacy")}
          className="border border-[#9CA3AF]/20 hover:border-[#00ff87] hover:text-[#00ff87] text-center py-2.5 px-2 rounded transition-all duration-300 whitespace-nowrap block"
        >
          [ {t("system.privacy")} ]
        </Link>
        <Link 
          href="/terms" 
          onClick={() => orchestrator?.selectSubModule("terms")}
          className="border border-[#9CA3AF]/20 hover:border-[#00ff87] hover:text-[#00ff87] text-center py-2.5 px-2 rounded transition-all duration-300 whitespace-nowrap block"
        >
          [ {t("system.terms")} ]
        </Link>
        <Link 
          href="/sla" 
          onClick={() => orchestrator?.selectSubModule("sla")}
          className="border border-[#9CA3AF]/20 hover:border-[#00ff87] hover:text-[#00ff87] text-center py-2.5 px-2 rounded transition-all duration-300 whitespace-nowrap block"
        >
          [ {t("system.sla")} ]
        </Link>
        <button 
          onClick={handlePurge}
          className="border border-[#FF3D00]/40 text-[#FF3D00] hover:bg-[#FF3D00] hover:text-[#121418] text-center py-2.5 px-2 rounded transition-all duration-300 whitespace-nowrap cursor-pointer block"
        >
          [ {t("system.data_purge")} ]
        </button>
      </div>
    </div>
  );
}

