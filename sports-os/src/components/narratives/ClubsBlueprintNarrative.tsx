"use client";

import { useState } from "react";

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
}

export default function ClubsBlueprintNarrative({ onBack }: ClubsBlueprintNarrativeProps) {
  const nodes: NodeData[] = [
    {
      id: "gate_1",
      name: "RFID_TURNSTILE_01",
      type: "ACCESS_CONTROL",
      status: "SECURE_ACTIVE",
      color: "text-emerald-core bg-emerald-core/10 border-emerald-core/30",
      desc: "შესასვლელი ბარიერი RFID წამკითხველით.",
      cx: 50,
      cy: 160,
    },
    {
      id: "biom_1",
      name: "BIOMETRIC_SCANNER_02",
      type: "CLINICAL_TELEMETRY",
      status: "READY_ACTIVE",
      color: "text-copper bg-copper/10 border-copper/30",
      desc: "თითის ანაბეჭდისა და ბიომეტრიული სკანირების წერტილი.",
      cx: 185,
      cy: 140,
    },
    {
      id: "dashboard",
      name: "CENTRAL_GATEWAY_HQ",
      type: "ADMIN_CONSOLE",
      status: "CORE_READY",
      color: "text-sapphire bg-sapphire/10 border-sapphire/30",
      desc: "ცენტრალური მართვის კონსოლი.",
      cx: 170,
      cy: 60,
    },
    {
      id: "premium_pos",
      name: "MARKETPLACE_POS_04",
      type: "FINANCIAL_NODE",
      status: "CONNECTED",
      color: "text-gold-raw bg-gold-raw/10 border-gold-raw/30",
      desc: "კლუბური მაღაზიისა და სერვისების გაყიდვის ტერმინალი.",
      cx: 310,
      cy: 60,
    },
  ];

  const [selectedNode, setSelectedNode] = useState<NodeData>(nodes[0]);
  const [hoveredNode, setHoveredNode] = useState<NodeData | null>(null);

  return (
    <div className="space-y-4 font-sans select-none animate-fadeIn">
      <div className="space-y-1">
        <div className="font-mono text-[12px] text-gold-raw uppercase tracking-[0.15em]">
          [ NODE_02 // CLUB_DIGITAL_TWIN ]
        </div>
        <h2 className="text-xl font-bold tracking-tight text-white uppercase">
          FACILITY BLUEPRINT
        </h2>
      </div>

      {/* Blueprint SVG Container */}
      <div className="bg-iron-surface/40 border border-silver-structure/10 p-2 rounded relative flex justify-center">
        <svg viewBox="0 0 380 200" strokeWidth="0.8" className="w-full stroke-silver-structure/25 fill-none">
          <rect x="5" y="5" width="370" height="190" rx="3" />
          <line x1="110" y1="5" x2="110" y2="195" />
          <line x1="110" y1="100" x2="260" y2="100" />
          <line x1="260" y1="5" x2="260" y2="195" />
          <line x1="110" y1="60" x2="5" y2="60" />
          <line x1="110" y1="130" x2="5" y2="130" />

          {/* Connected Lines */}
          <path d="M50 160 L170 60 M170 60 L185 140 M185 140 L310 60" className="stroke-emerald-core/10 stroke-[1] stroke-dasharray-[3_3] fill-none" />

          {/* Node SVG circles mapped */}
          {nodes.map((node) => {
            const isSelected = selectedNode.id === node.id;
            const strokeColor = node.id === "gate_1" ? "stroke-emerald-core" :
                                node.id === "biom_1" ? "stroke-copper" :
                                node.id === "dashboard" ? "stroke-sapphire-light" :
                                "stroke-gold-raw";
            const glowColor = node.id === "gate_1" ? "fill-emerald-core/5 stroke-emerald-core/30" :
                              node.id === "biom_1" ? "fill-copper/5 stroke-copper/30" :
                              node.id === "dashboard" ? "fill-sapphire-light/5 stroke-sapphire-light/30" :
                              "fill-gold-raw/5 stroke-gold-raw/30";
            return (
              <g key={node.id}>
                {/* Glow ring */}
                <circle
                  cx={node.cx}
                  cy={node.cy}
                  r={node.id === "dashboard" ? 15 : 12}
                  className={`pointer-events-none stroke-[1] animate-pulse ${glowColor}`}
                />
                {/* Clickable/hoverable Node */}
                <circle
                  cx={node.cx}
                  cy={node.cy}
                  r={node.id === "dashboard" ? 9 : 7}
                  onClick={() => setSelectedNode(node)}
                  onMouseEnter={() => setHoveredNode(node)}
                  onMouseLeave={() => setHoveredNode(null)}
                  className={`cursor-pointer fill-iron stroke-[1.5] ${strokeColor} ${isSelected ? "animate-pulse" : ""}`}
                />
              </g>
            );
          })}
        </svg>

        {/* Floating Tooltip */}
        {hoveredNode && (
          <div
            className="absolute bg-[#1A1D23]/95 border border-silver-structure/20 backdrop-blur-[8px] px-3 py-1.5 rounded-[4px] font-mono text-[9px] text-white shadow-[0_4px_12px_rgba(0,0,0,0.55)] pointer-events-none transform -translate-x-1/2 -translate-y-full mb-3 z-30 transition-opacity duration-200"
            style={{
              left: `${(hoveredNode.cx / 380) * 100}%`,
              top: `${(hoveredNode.cy / 200) * 100}%`,
            }}
          >
            <div className="text-emerald-core font-bold text-[10px]">[ DEVICE: {hoveredNode.name} ]</div>
            <div className="text-silver-structure/70 mt-0.5">// [ STATUS: {hoveredNode.status} ]</div>
          </div>
        )}
      </div>

      {/* Telemetry card */}
      <div className="bg-iron/80 border border-silver-structure/10 p-3 rounded font-mono text-[12px] tracking-[0.15em] space-y-2">
        <div className="text-silver-structure/45 uppercase tracking-wider">[ TELEMETRY_FEED ]</div>
        <div className="flex justify-between items-baseline">
          <span className="text-white font-bold text-[13px]">{selectedNode.name}</span>
          <span className={`inline-block px-1.5 py-0.5 border rounded-[3px] text-[10px] ${selectedNode.color}`}>
            {selectedNode.status}
          </span>
        </div>
        <p className="text-bone-light/85 font-sans leading-relaxed text-[13px] tracking-normal">
          {selectedNode.desc}
        </p>
      </div>

      <div>
        <button
          onClick={onBack}
          className="font-mono text-[12px] text-silver-structure hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          ← Return to Core
        </button>
      </div>
    </div>
  );
}
