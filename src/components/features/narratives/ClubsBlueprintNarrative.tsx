"use client";

import { useState, useEffect } from "react";
import { audioManager } from "@/lib/audioManager";
import { SubItemData } from "@/components/features/dashboard/NodeDetailStage";
import { useI18n } from "@/context/I18nContext";
import { useStageOrchestrator } from "@/context/StageOrchestratorContext";

interface NodeData {
  id: string;
  name: string;
  type: string;
  status: string;
  color: string;
  desc: string;
  cx: number;
  cy: number;
}

interface ClubsBlueprintNarrativeProps {
  onBack: () => void;
  onSelectSubItem?: (item: SubItemData | null) => void;
  selectedSubId?: string | null;
}

const BLUEPRINT_DEVICES: NodeData[] = [
  { id: "gate_1", name: "RFID_TURNSTILE_01", type: "ACCESS_CONTROL", status: "SECURE_ACTIVE", color: "text-emerald-core bg-emerald-core/10 border-emerald-core/30", desc: "შესასვლელი ბარიერი RFID წამკითხველით.", cx: 50, cy: 160 },
  { id: "biom_1", name: "BIOMETRIC_SCANNER_02", type: "CLINICAL_TELEMETRY", status: "READY_ACTIVE", color: "text-copper bg-copper/10 border-copper/30", desc: "თითის ანაბეჭდისა და ბიომეტრიული სკანირების წერტილი.", cx: 185, cy: 140 },
  { id: "dashboard", name: "CENTRAL_GATEWAY_HQ", type: "ADMIN_CONSOLE", status: "CORE_READY", color: "text-sapphire bg-sapphire/10 border-sapphire/30", desc: "ცენტრალური მართვის კონსოლი.", cx: 170, cy: 60 },
  { id: "premium_pos", name: "MARKETPLACE_POS_04", type: "FINANCIAL_NODE", status: "CONNECTED", color: "text-gold-raw bg-gold-raw/10 border-gold-raw/30", desc: "კლუბური მაღაზიისა და სერვისების გაყიდვის ტერმინალი.", cx: 310, cy: 60 }
];

export default function ClubsBlueprintNarrative({ onBack, onSelectSubItem }: ClubsBlueprintNarrativeProps) {
  const { t } = useI18n();
  const orchestrator = useStageOrchestrator();
  const [selectedNode, setSelectedNode] = useState<NodeData>(BLUEPRINT_DEVICES[0]);
  const [hoveredNode, setHoveredNode] = useState<NodeData | null>(null);

  useEffect(() => {
    if (orchestrator?.activeSubModuleId) {
      const found = BLUEPRINT_DEVICES.find((d) => d.id === orchestrator.activeSubModuleId);
      if (found) setSelectedNode(found);
    }
  }, [orchestrator?.activeSubModuleId]);

  const handleSelectDevice = (node: NodeData) => {
    audioManager.playClick();
    setSelectedNode(node);
    if (orchestrator?.selectSubModule) orchestrator.selectSubModule(node.id);
    if (onSelectSubItem) {
      onSelectSubItem({
        id: node.id,
        nodeId: 2,
        category: "CLUB_DIGITAL_TWIN",
        title: node.name,
        subtitle: `TYPE: ${node.type}`,
        status: node.status,
        statusColor: node.color,
        description: node.desc,
        metrics: [
          { label: "DEVICE_TYPE", value: node.type },
          { label: "GATEWAY_STATUS", value: node.status },
          { label: "LATENCY", value: "1.2ms" }
        ],
        details: { COORD_X: `${node.cx}px`, COORD_Y: `${node.cy}px`, PROTOCOL: "MQTT_TLS" }
      });
    }
  };


  return (
    <div className="space-y-4 font-sans select-none animate-fadeIn">
      <div className="space-y-1">
        <div className="font-mono text-[12px] text-gold-raw uppercase tracking-[0.15em]">{t("nodes.node_2.tag")}</div>
        <h2 className="text-xl font-bold tracking-tight text-white uppercase">{t("nodes.node_2.name")}</h2>
      </div>

      <div className="bg-iron-surface/40 border border-silver-structure/10 p-2 rounded relative flex justify-center">
        <svg viewBox="0 0 380 200" strokeWidth="0.8" className="w-full stroke-silver-structure/25 fill-none">
          <rect x="5" y="5" width="370" height="190" rx="3" />
          <line x1="110" y1="5" x2="110" y2="195" />
          <line x1="110" y1="100" x2="260" y2="100" />
          <line x1="260" y1="5" x2="260" y2="195" />
          <path d="M50 160 L170 60 M170 60 L185 140 M185 140 L310 60" className="stroke-emerald-core/10 stroke-[1] stroke-dasharray-[3_3]" />
          {BLUEPRINT_DEVICES.map((node) => {
            const isSelected = selectedNode.id === node.id;
            return (
              <g key={node.id}>
                <circle cx={node.cx} cy={node.cy} r={12} className="pointer-events-none fill-emerald-core/5 stroke-emerald-core/30 animate-pulse" />
                <circle
                  cx={node.cx}
                  cy={node.cy}
                  r={8}
                  onClick={() => handleSelectDevice(node)}
                  onMouseEnter={() => setHoveredNode(node)}
                  onMouseLeave={() => setHoveredNode(null)}
                  className={`cursor-pointer fill-iron stroke-[1.5] ${isSelected ? "stroke-gold-raw animate-pulse" : "stroke-silver-structure"}`}
                />
              </g>
            );
          })}
        </svg>

        {hoveredNode && (
          <div className="absolute bg-[#1A1D23]/95 border border-silver-structure/20 px-2 py-1 rounded font-mono text-[9px] text-white pointer-events-none transform -translate-x-1/2 -translate-y-full mb-2 z-30" style={{ left: `${(hoveredNode.cx / 380) * 100}%`, top: `${(hoveredNode.cy / 200) * 100}%` }}>
            <div className="text-emerald-core font-bold">[ {hoveredNode.name} ]</div>
          </div>
        )}
      </div>

      <div className="bg-iron/80 border border-silver-structure/10 p-3 rounded font-mono text-[12px] space-y-2">
        <div className="flex justify-between items-baseline">
          <span className="text-white font-bold text-[13px]">{selectedNode.name}</span>
          <span className={`px-1.5 py-0.5 border rounded text-[10px] ${selectedNode.color}`}>{selectedNode.status}</span>
        </div>
        <p className="text-bone-light/85 font-sans leading-relaxed text-[12px]">{selectedNode.desc}</p>
        <button onClick={() => handleSelectDevice(selectedNode)} className="text-sapphire-light text-[10px] hover:underline cursor-pointer">
          {t("nodes.node_2.open_inspector")}
        </button>
      </div>

      <div>
        <button onClick={() => { audioManager.playClick(); if (onSelectSubItem) onSelectSubItem(null); onBack(); }} className="font-mono text-[12px] text-silver-structure hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer">
          {t("system.return_to_core")}
        </button>
      </div>
    </div>
  );
}
