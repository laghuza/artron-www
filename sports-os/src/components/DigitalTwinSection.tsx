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

export default function DigitalTwinSection() {
  const [selectedNode, setSelectedNode] = useState<NodeData>({
    id: "gate_1",
    name: "RFID_TURNSTILE_01",
    type: "ACCESS_CONTROL",
    status: "ONLINE / SECURE",
    color: "text-emerald-core bg-emerald-core/10 border-emerald-core/30",
    desc: "შესასვლელი ბარიერი. კავშირი კლუბის ბირთვთან და აბონემენტების ბაზასთან.",
  });

  const nodes: NodeData[] = [
    {
      id: "gate_1",
      name: "RFID_TURNSTILE_01",
      type: "ACCESS_CONTROL",
      status: "ONLINE / SECURE",
      color: "text-emerald-core bg-emerald-core/10 border-emerald-core/30",
      desc: "შესასვლელი ბარიერი. ინტეგრირებული RFID ბარათის წამკითხველთან და ვერიფიკაციის კონტროლერთან.",
    },
    {
      id: "biom_1",
      name: "BIOMETRIC_SCANNER_02",
      type: "CLINICAL_TELEMETRY",
      status: "CALIBRATED",
      color: "text-copper bg-copper/10 border-copper/30",
      desc: "თითის ანაბეჭდისა და ბიომეტრიული სკანირების წერტილი. გამოიყენება სამედიცინო და უსაფრთხოების ზონებში.",
    },
    {
      id: "dashboard",
      name: "CENTRAL_GATEWAY_HQ",
      type: "ADMIN_CONSOLE",
      status: "CORE_READY",
      color: "text-sapphire bg-sapphire/10 border-sapphire/30",
      desc: "ფედერაციებისა და კლუბების ადმინისტრაციული სამართავი პანელი. იღებს და ამუშავებს ყველა ლოკალურ სიგნალს.",
    },
    {
      id: "premium_pos",
      name: "MARKETPLACE_POS_04",
      type: "FINANCIAL_NODE",
      status: "CONNECTED",
      color: "text-gold-raw bg-gold-raw/10 border-gold-raw/30",
      desc: "კლუბური მაღაზიისა და დამატებითი სერვისების გაყიდვის ტერმინალი. სინქრონიზებულია Artron Coin-ის ბირთვთან.",
    },
  ];

  return (
    <section
      id="digital-twin"
      className="relative h-screen w-screen snap-start shrink-0 overflow-hidden flex flex-col items-center justify-center bg-iron schematic-grid border-b border-silver-structure/5"
    >
      <div className="relative z-20 w-full max-w-6xl px-6 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        {/* Left: Info Panel (4 cols) */}
        <div className="md:col-span-4 bg-iron-surface/60 border border-silver-structure/10 p-6 rounded-lg font-mono text-xs">
          <div className="text-emerald-core text-[10px] uppercase tracking-[0.2em] mb-2">[ THE_DIGITAL_TWIN_TELEMETRY ]</div>
          <h2 className="text-2xl font-bold text-white mb-4 uppercase font-sans tracking-wide">DIGITAL TWIN</h2>
          <p className="text-[11px] text-silver-structure/80 leading-relaxed font-sans mb-6">
            მომხმარებელი ხედავს სპორტული სივრცის (დარბაზის, სტადიონის) თხელი ხაზებით დახატულ ციფრულ ტყუპს (Digital Twin), სადაც კვანძები რეალურ დროში პულსირებენ.
          </p>

          <div className="border-t border-silver-structure/10 pt-4 space-y-3">
            <div className="text-[9px] text-silver-structure/40 uppercase">ACTIVE_NODE_DETAILS:</div>
            <div>
              <span className="text-silver-structure font-bold">{selectedNode.name}</span>
              <div className="text-[9px] text-silver-structure/50 mt-0.5">{selectedNode.type}</div>
            </div>
            <div className={`inline-block px-2 py-0.5 border rounded text-[10px] ${selectedNode.color}`}>
              {selectedNode.status}
            </div>
            <p className="text-[11px] text-silver-structure/70 font-sans leading-relaxed pt-1">
              {selectedNode.desc}
            </p>
          </div>
        </div>

        {/* Right: Interactive Top-Down SVG Map (8 cols) */}
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
      </div>
    </section>
  );
}
