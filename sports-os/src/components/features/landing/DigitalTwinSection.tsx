"use client";

import { useState } from "react";
import DigitalTwinInfoPanel, { NodeData } from "@/components/features/landing/DigitalTwinInfoPanel";
import DigitalTwinSvgMap from "@/components/features/landing/DigitalTwinSvgMap";

const NODES: NodeData[] = [
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

export default function DigitalTwinSection() {
  const [selectedNode, setSelectedNode] = useState<NodeData>(NODES[0]);

  return (
    <section
      id="digital-twin"
      className="relative h-screen w-screen snap-start shrink-0 overflow-hidden flex flex-col items-center justify-center bg-iron schematic-grid border-b border-silver-structure/5"
    >
      <div className="relative z-20 w-full max-w-6xl px-6 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <DigitalTwinInfoPanel selectedNode={selectedNode} />
        <DigitalTwinSvgMap selectedNode={selectedNode} setSelectedNode={setSelectedNode} nodes={NODES} />
      </div>
    </section>
  );
}
