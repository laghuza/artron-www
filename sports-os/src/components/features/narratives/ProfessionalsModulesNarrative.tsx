"use client";

import { useState, useEffect } from "react";
import { audioManager } from "@/lib/audioManager";
import { SubItemData } from "@/components/features/dashboard/NodeDetailStage";
import { useI18n } from "@/context/I18nContext";
import { useStageOrchestrator } from "@/context/StageOrchestratorContext";

interface ModuleDetail {
  id: string;
  name: string;
  tag: string;
  color: string;
  status: string;
  metrics: string[];
  desc: string;
}

interface ProfessionalsModulesNarrativeProps {
  onBack: () => void;
  onSelectSubItem?: (item: SubItemData | null) => void;
}

export default function ProfessionalsModulesNarrative({ onBack, onSelectSubItem }: ProfessionalsModulesNarrativeProps) {
  const { t } = useI18n();
  const orchestrator = useStageOrchestrator();
  const [activeTab, setActiveTab] = useState<string>("scheduling");

  useEffect(() => {
    if (orchestrator?.activeSubModuleId) {
      setActiveTab(orchestrator.activeSubModuleId);
    }
  }, [orchestrator?.activeSubModuleId]);


  const modules: Record<string, ModuleDetail> = {
    scheduling: {
      id: "scheduling",
      name: "Core Scheduling Channel",
      tag: "# core-scheduling",
      color: "text-emerald-core border-emerald-core/20 bg-emerald-core/5",
      status: "SYNCED / ACTIVE",
      metrics: ["WORKERS: 12", "RESERVATIONS: 1,842/hr", "LATENCY: 4.8ms"],
      desc: "ავტომატური საინსტიტუციო განრიგები და რესურსების ოპტიმიზაცია რეალურ დროში.",
    },
    medical: {
      id: "medical",
      name: "Medical & Traumatology",
      tag: "# medical-trauma",
      color: "text-sapphire-light border-sapphire-light/20 bg-sapphire-light/5",
      status: "SECURED / CLINICAL",
      metrics: ["BIOMECHANIC_FEEDS: 18", "ACCURACY: 99.4%", "ACTIVE_DOCS: 4"],
      desc: "ათლეტების ბიომექანიკური ანალიზი, ჯანმრთელობის ისტორია და ტრავმების მონიტორინგი.",
    },
    access: {
      id: "access",
      name: "Access & Gates Controller",
      tag: "# access-gates",
      color: "text-ruby border-ruby/20 bg-ruby/5",
      status: "MONITORED / LOCK",
      metrics: ["GATES: 8", "PASSES_TODAY: 14,290", "LAST_SCAN: PASS_OK"],
      desc: "Turnstile-ების, RFID წამკითხველებისა და წვდომის კონტროლერების ცენტრალიზებული სისტემა.",
    },
    financial: {
      id: "financial",
      name: "Financial Nodes & Ledger",
      tag: "# financial-nodes",
      color: "text-gold-raw border-gold-raw/20 bg-gold-raw/5",
      status: "RAW_GOLD_TIER",
      metrics: ["PAYMENT_API: OK", "ARTRON_COINS: ACTIVE", "COMMISSION: 0%"],
      desc: "აბონემენტების გაყიდვა, ტრანზაქციების რეესტრი და Artron Coin-ის ბირთვი.",
    },
  };

  const selected = modules[activeTab];

  const handleChannelSelect = (tabKey: string) => {
    audioManager.playClick();
    setActiveTab(tabKey);
    if (orchestrator?.selectSubModule) orchestrator.selectSubModule(tabKey);
    const mod = modules[tabKey];
    if (onSelectSubItem && mod) {
      onSelectSubItem({
        id: mod.id,
        nodeId: 3,
        category: "SPORTS_OS_CHANNEL",
        title: mod.name,
        subtitle: mod.tag,
        status: mod.status,
        statusColor: mod.color,
        description: mod.desc,
        metrics: mod.metrics.map(m => {
          const parts = m.split(": ");
          return { label: parts[0] || "METRIC", value: parts[1] || m };
        }),
        details: { CHANNEL_TAG: mod.tag, TELEMETRY_STATE: "HEALTHY" }
      });
    }
  };

  return (
    <div className="space-y-4 font-sans select-none animate-fadeIn">
      <div className="space-y-1">
        <div className="font-mono text-[12px] text-copper uppercase tracking-[0.15em]">
          {t("nodes.node_3.tag")}
        </div>
        <h2 className="text-xl font-bold tracking-tight text-white uppercase">{t("nodes.node_3.name")}</h2>
      </div>

      <div className="grid grid-cols-2 gap-1.5 font-mono text-[11px] tracking-wider">
        {Object.values(modules).map((m) => (
          <button
            key={m.id}
            onClick={() => handleChannelSelect(m.id)}
            className={`text-left px-2 py-1.5 border rounded flex items-center justify-between cursor-pointer ${
              activeTab === m.id
                ? "bg-iron border-silver-structure/30 text-white font-bold"
                : "bg-iron-surface/30 border-silver-structure/15 text-silver-structure/60 hover:text-white"
            }`}
          >
            <span>{m.tag}</span>
            <span className={`w-1.5 h-1.5 rounded-full ${activeTab === m.id ? "bg-emerald-core animate-pulse" : "bg-ruby opacity-30"}`} />
          </button>
        ))}
      </div>

      <div className="bg-iron-surface/40 border border-silver-structure/10 p-3 rounded space-y-3 font-mono text-[12px]">
        <div className="flex justify-between items-start">
          <span className="text-white font-bold text-[13px] font-sans">{selected.name}</span>
          <span className={`px-1.5 py-0.5 border text-[10px] rounded font-bold ${selected.color}`}>{selected.status}</span>
        </div>
        <p className="text-bone-light/85 font-sans leading-relaxed text-[12px]">{selected.desc}</p>
        <button onClick={() => handleChannelSelect(activeTab)} className="text-sapphire-light text-[10px] hover:underline cursor-pointer">
          {t("nodes.node_3.select_prompt")}
        </button>
      </div>

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
