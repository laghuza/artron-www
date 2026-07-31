"use client";

import { NodeData } from "./DigitalTwinInfoPanel";

interface DigitalTwinSvgMapProps {
  selectedNode: NodeData;
  setSelectedNode: (node: NodeData) => void;
  nodes: NodeData[];
}

export default function DigitalTwinSvgMap({ selectedNode, setSelectedNode, nodes }: DigitalTwinSvgMapProps) {
  return (
    <div className="md:col-span-8 flex justify-center bg-iron-surface/20 border border-silver-structure/5 p-6 rounded-lg relative">
      <svg viewBox="0 0 400 250" className="w-full max-w-2xl stroke-silver-structure/20 stroke-[0.8] fill-none">
        {/* Outer Walls / Blueprint Grid */}
        <rect x="10" y="10" width="380" height="230" rx="4" />
        
        {/* Room partitions */}
        <line x1="120" y1="10" x2="120" y2="240" />
        <line x1="120" y1="120" x2="280" y2="120" />
        <line x1="280" y1="10" x2="280" y2="240" />
        <line x1="120" y1="80" x2="10" y2="80" />
        <line x1="120" y1="160" x2="10" y2="160" />

        {/* Labels in blueprint */}
        <text x="25" y="30" className="fill-silver-structure/30 font-mono text-[8px] stroke-none">CARDIO_ZONE</text>
        <text x="25" y="110" className="fill-silver-structure/30 font-mono text-[8px] stroke-none">POOL_ACCESS</text>
        <text x="25" y="190" className="fill-silver-structure/30 font-mono text-[8px] stroke-none">ACCESS_GATES</text>
        <text x="180" y="30" className="fill-silver-structure/30 font-mono text-[8px] stroke-none">HQ_DASHBOARD</text>
        <text x="160" y="145" className="fill-silver-structure/30 font-mono text-[8px] stroke-none">BIOMETRICS_ROOM</text>
        <text x="300" y="30" className="fill-silver-structure/30 font-mono text-[8px] stroke-none">MARKETPLACE_POS</text>

        {/* Pulsing connections between nodes */}
        <path d="M60 200 L180 80 M180 80 L200 170 M200 170 L340 80" className="stroke-emerald-core/20 stroke-[1] stroke-dasharray-[4_4] fill-none" />

        {/* Node 1: RFID Gate */}
        <circle
          cx="60" cy="200" r="8"
          onClick={() => setSelectedNode(nodes[0])}
          className={`cursor-pointer fill-iron stroke-emerald-core stroke-[1.5] ${selectedNode.id === "gate_1" ? "animate-pulse r-10" : ""}`}
        />
        {/* Node 2: Biometric Scanner */}
        <circle
          cx="200" cy="170" r="8"
          onClick={() => setSelectedNode(nodes[1])}
          className={`cursor-pointer fill-iron stroke-copper stroke-[1.5] ${selectedNode.id === "biom_1" ? "animate-pulse r-10" : ""}`}
        />
        {/* Node 3: Dashboard Console */}
        <circle
          cx="180" cy="80" r="10"
          onClick={() => setSelectedNode(nodes[2])}
          className={`cursor-pointer fill-iron stroke-sapphire stroke-[2] ${selectedNode.id === "dashboard" ? "animate-pulse" : ""}`}
        />
        {/* Node 4: Gold Marketplace POS */}
        <circle
          cx="340" cy="80" r="8"
          onClick={() => setSelectedNode(nodes[3])}
          className={`cursor-pointer fill-iron stroke-gold-raw stroke-[1.5] ${selectedNode.id === "premium_pos" ? "animate-pulse" : ""}`}
        />
      </svg>
      <div className="absolute top-2 left-4 font-mono text-[8px] text-silver-structure/40">
        [ GYM_BLUEPRINT_TOP_DOWN_MAP ]
      </div>
    </div>
  );
}
