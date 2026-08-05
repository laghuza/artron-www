"use client";

import { useState } from "react";
import { audioManager } from "@/lib/audioManager";
import { SubItemData } from "@/components/features/dashboard/NodeDetailStage";
import { FEDERATION_LIST } from "@/components/features/narratives/federation/federationData";
import { useI18n } from "@/context/I18nContext";

interface FederationsNarrativeProps {
  onBack: () => void;
  onSelectSubItem?: (item: SubItemData | null) => void;
  selectedSubId?: string | null;
}

export default function FederationsNarrative({ onBack, onSelectSubItem, selectedSubId }: FederationsNarrativeProps) {
  const { t } = useI18n();
  const [activeId, setActiveId] = useState<string | null>(selectedSubId || null);

  const handleSelect = (item: SubItemData) => {
    audioManager.playClick();
    if (activeId === item.id) {
      setActiveId(null);
      if (onSelectSubItem) onSelectSubItem(null);
    } else {
      setActiveId(item.id);
      if (onSelectSubItem) onSelectSubItem(item);
    }
  };

  return (
    <div className="space-y-5 font-sans select-none animate-fadeIn">
      <div className="space-y-1">
        <div className="font-mono text-[12px] text-sapphire-light uppercase tracking-[0.15em]">
          {t("nodes.node_1.tag")}
        </div>
        <h2 className="text-xl font-bold tracking-tight text-white uppercase">
          {t("nodes.node_1.name")}
        </h2>
      </div>

      <div className="h-[1px] bg-silver-structure/10 w-full" />

      {/* Interactive Federation List */}
      <div className="bg-iron-surface/40 border border-silver-structure/10 p-3 rounded font-mono text-[12px] tracking-[0.15em] space-y-2">
        <div className="text-sapphire-light text-[11px] mb-2">{t("nodes.node_1.select_prompt")}</div>
        <div className="space-y-1.5">
          {FEDERATION_LIST.map((item) => {
            const isSelected = activeId === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelect(item)}
                className={`w-full text-left px-3 py-2 rounded transition-all flex items-center justify-between border cursor-pointer ${
                  isSelected
                    ? "bg-iron border-sapphire-light/60 text-white shadow-[0_0_12px_rgba(15,82,186,0.35)]"
                    : "bg-iron-surface/30 border-silver-structure/10 text-silver-structure/80 hover:text-white hover:border-silver-structure/30"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-sapphire-light font-mono text-[10px]">[{isSelected ? "▶" : "◇"}]</span>
                  <span className="truncate max-w-[160px] font-sans font-bold text-[12px]">{item.title.split(" ")[0]} FED</span>
                </div>
                <span className="text-emerald-core text-[10px] font-mono">● {t("system.live")}</span>
              </button>
            );
          })}
        </div>
        <div className="pt-2 border-t border-silver-structure/10 text-silver-structure/50 text-[10px]">
          {t("nodes.node_1.tip")}
        </div>
      </div>

      <p className="text-[13px] text-bone-light/85 leading-relaxed font-sans">
        {t("nodes.node_1.description")}
      </p>

      <div>
        <button
          onClick={() => {
            audioManager.playClick();
            if (onSelectSubItem) onSelectSubItem(null);
            onBack();
          }}
          className="font-mono text-[12px] text-silver-structure hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          {t("system.return_to_core")}
        </button>
      </div>
    </div>
  );
}
