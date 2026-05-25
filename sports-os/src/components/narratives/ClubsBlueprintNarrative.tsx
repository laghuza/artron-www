"use client";

import { useState } from "react";

interface NodeData {
  id: string;
  name: string;
  type: string;
  status: string;
  color: string;
  desc: string;
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
      status: "ONLINE / SECURE",
      color: "text-emerald-core bg-emerald-core/10 border-emerald-core/30",
      desc: "შესასვლელი ბარიერი RFID წამკითხველით.",
    },
    {
      id: "biom_1",
      name: "BIOMETRIC_SCANNER_02",
      type: "CLINICAL_TELEMETRY",
      status: "CALIBRATED",
      color: "text-copper bg-copper/10 border-copper/30",
      desc: "თითის ანაბეჭდისა და ბიომეტრიული სკანირების წერტილი.",
    },
    {
      id: "dashboard",
      name: "CENTRAL_GATEWAY_HQ",
      type: "ADMIN_CONSOLE",
      status: "CORE_READY",
      color: "text-sapphire bg-sapphire/10 border-sapphire/30",
      desc: "ცენტრალური მართვის კონსოლი.",
    },
    {
      id: "premium_pos",
      name: "MARKETPLACE_POS_04",
      type: "FINANCIAL_NODE",
      status: "CONNECTED",
      color: "text-gold-raw bg-gold-raw/10 border-gold-raw/30",
      desc: "კლუბური მაღაზიისა და სერვისების გაყიდვის ტერმინალი.",
    },
  ];

  const [selectedNode, setSelectedNode] = useState<NodeData>(nodes[0]);

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

      {/* Blueprint SVG */}
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

          {/* Node 1 Glow */}
          <circle cx="50" cy="160" r="12" className="pointer-events-none fill-emerald-core/5 stroke-emerald-core/30 stroke-[1] animate-pulse" />
          {/* Node 1 */}
          <circle
            cx="50" cy="160" r="7"
            onClick={() => setSelectedNode(nodes[0])}
            className={`cursor-pointer fill-iron stroke-emerald-core stroke-[1.5] ${selectedNode.id === "gate_1" ? "animate-pulse" : ""}`}
          />
          {/* Node 2 Glow */}
          <circle cx="185" cy="140" r="12" className="pointer-events-none fill-copper/5 stroke-copper/30 stroke-[1] animate-pulse" />
          {/* Node 2 */}
          <circle
            cx="185" cy="140" r="7"
            onClick={() => setSelectedNode(nodes[1])}
            className={`cursor-pointer fill-iron stroke-copper stroke-[1.5] ${selectedNode.id === "biom_1" ? "animate-pulse" : ""}`}
          />
          {/* Node 3 Glow */}
          <circle cx="170" cy="60" r="15" className="pointer-events-none fill-sapphire-light/5 stroke-sapphire-light/30 stroke-[1] animate-pulse" />
          {/* Node 3 */}
          <circle
            cx="170" cy="60" r="9"
            onClick={() => setSelectedNode(nodes[2])}
            className={`cursor-pointer fill-iron stroke-sapphire-light stroke-[2] ${selectedNode.id === "dashboard" ? "animate-pulse" : ""}`}
          />
          {/* Node 4 Glow */}
          <circle cx="310" cy="60" r="12" className="pointer-events-none fill-gold-raw/5 stroke-gold-raw/30 stroke-[1] animate-pulse" />
          {/* Node 4 */}
          <circle
            cx="310" cy="60" r="7"
            onClick={() => setSelectedNode(nodes[3])}
            className={`cursor-pointer fill-iron stroke-gold-raw stroke-[1.5] ${selectedNode.id === "premium_pos" ? "animate-pulse" : ""}`}
          />
        </svg>
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
