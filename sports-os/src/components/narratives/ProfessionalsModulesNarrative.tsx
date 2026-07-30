"use client";

import { useState } from "react";
import { audioManager } from "@/utils/audioManager";

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
}

export default function ProfessionalsModulesNarrative({ onBack }: ProfessionalsModulesNarrativeProps) {
  const [activeTab, setActiveTab] = useState<string>("scheduling");

  const modules: Record<string, ModuleDetail> = {
    scheduling: {
      id: "scheduling",
      name: "Core Scheduling",
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
      name: "Access & Gates",
      tag: "# access-gates",
      color: "text-ruby border-ruby/20 bg-ruby/5",
      status: "MONITORED / LOCK",
      metrics: ["GATES: 8", "PASSES_TODAY: 14,290", "LAST_SCAN: PASS_OK"],
      desc: "Turnstile-ების, RFID წამკითხველებისა და წვდომის კონტროლერების ცენტრალიზებული სისტემა.",
    },
    financial: {
      id: "financial",
      name: "Financial Nodes",
      tag: "# financial-nodes",
      color: "text-gold-raw border-gold-raw/20 bg-gold-raw/5",
      status: "RAW_GOLD_TIER",
      metrics: ["PAYMENT_API: OK", "ARTRON_COINS: ACTIVE", "COMMISSION: 0%"],
      desc: "აბონემენტების გაყიდვა, ტრანზაქციების რეესტრი და Artron Coin-ის ბირთვი.",
    },
  };

  const selected = modules[activeTab];

  return (
    <div className="space-y-4 font-sans select-none animate-fadeIn">
      <div className="space-y-1">
        <div className="font-mono text-[12px] text-copper uppercase tracking-[0.15em]">
          [ NODE_03 // SPORTS_OS_CHANNELS ]
        </div>
        <h2 className="text-xl font-bold tracking-tight text-white uppercase">
          SYSTEM CHANNELS
        </h2>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-2 gap-1.5 font-mono text-[11px] tracking-wider">
        {Object.values(modules).map((m) => (
          <button
            key={m.id}
            onClick={() => {
              audioManager.playClick();
              setActiveTab(m.id);
            }}
            className={`text-left px-2 py-1.5 border rounded-[3px] transition-all flex items-center justify-between cursor-pointer ${
              activeTab === m.id
                ? "bg-iron border-silver-structure/30 text-white font-bold"
                : "bg-iron-surface/30 border-silver-structure/15 text-silver-structure/60 hover:text-white"
            }`}
          >
            <span>{m.tag}</span>
            <div className="flex gap-1 items-center">
              <span className={`w-1.5 h-1.5 rounded-full bg-emerald-core shadow-[0_0_4px_#00E676] ${activeTab === m.id ? "animate-pulse" : "opacity-30"}`} />
              <span className={`w-1.5 h-1.5 rounded-full bg-ruby shadow-[0_0_4px_#FF3D00] ${activeTab !== m.id ? "animate-pulse" : "opacity-30"}`} />
            </div>
          </button>
        ))}
      </div>

      {/* Details Box */}
      <div className="bg-iron-surface/40 border border-silver-structure/10 p-3 rounded space-y-3 font-mono text-[12px] tracking-[0.15em]">
        <div className="flex justify-between items-start">
          <span className="text-white font-bold text-[13px] tracking-normal font-sans">{selected.name}</span>
          <span className={`px-1.5 py-0.5 border text-[10px] rounded-[3px] font-bold ${selected.color}`}>
            {selected.status}
          </span>
        </div>
        <p className="text-bone-light/85 font-sans leading-relaxed text-[13px] tracking-normal min-h-[40px]">
          {selected.desc}
        </p>

        <div className="border-t border-silver-structure/10 pt-2 text-[10px] space-y-1">
          <div className="text-silver-structure/40 uppercase">[ MODULE_METRICS ]:</div>
          <div className="grid grid-cols-1 gap-1">
            {selected.metrics.map((met, idx) => (
              <div key={idx} className="text-silver-structure/80">
                &gt; {met}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <button
          onClick={() => {
            audioManager.playClick();
            onBack();
          }}
          className="font-mono text-[12px] text-silver-structure hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          ← Return to Core
        </button>
      </div>
    </div>
  );
}

