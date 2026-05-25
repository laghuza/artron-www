"use client";

import { useState } from "react";

interface ModuleDetail {
  id: string;
  name: string;
  tag: string;
  color: string;
  status: string;
  metrics: string[];
  desc: string;
}

export default function ModulesSection() {
  const [activeModule, setActiveModule] = useState<string>("scheduling");

  const modules: Record<string, ModuleDetail> = {
    scheduling: {
      id: "scheduling",
      name: "Core Scheduling",
      tag: "# core-scheduling",
      color: "text-emerald-core border-emerald-core/20 bg-emerald-core/5",
      status: "SYNCED / ACTIVE",
      metrics: ["WORKERS: 12", "RESERVATION_FLOWS: 1,842/hr", "LATENCY: 4.8ms"],
      desc: "ავტომატური საინსტიტუციო განრიგები, ტრენერების ჯავშნები, დარბაზებისა და რესურსების ოპტიმიზაცია რეალურ დროში.",
    },
    medical: {
      id: "medical",
      name: "Medical & Traumatology",
      tag: "# medical-traumatology",
      color: "text-sapphire border-sapphire/20 bg-sapphire/5",
      status: "SECURED / CLINICAL",
      metrics: ["ACTIVE_DOCTORS: 4", "BIOMECHANIC_FEEDS: 18", "ACCURACY: 99.4%"],
      desc: "ნუტრიციოლოგებისა და ტრავმატოლოგების გაერთიანებული კაბინეტი. ათლეტების ბიომექანიკური ანალიზი და ჯანმრთელობის ისტორია.",
    },
    access: {
      id: "access",
      name: "Access & Gates",
      tag: "# access-gates",
      color: "text-ruby border-ruby/20 bg-ruby/5",
      status: "MONITORED / LOCK",
      metrics: ["GATE_CONTROLLERS: 8", "TOTAL_PASSES_TODAY: 14,290", "LAST_SCAN: PASS_OK"],
      desc: "Turnstile-ების, RFID წამკითხველების, ჭკვიანი კარტებისა და მობილური შტრიხკოდების მართვის ცენტრალიზებული სისტემა.",
    },
    financial: {
      id: "financial",
      name: "Financial Nodes",
      tag: "# financial-nodes",
      color: "text-gold-raw border-gold-raw/20 bg-gold-raw/5",
      status: "RAW_GOLD_TIER",
      metrics: ["PAYMENT_API: OK", "ARTRON_COINS: ACTIVE", "COMMISSION: 0%"],
      desc: "აბონემენტების გაყიდვა, ავტომატური ყოველთვიური გადარიცხვები, რეფერალური სისტემები და ფინანსური ტრანზაქციების რეესტრი.",
    },
  };

  const selected = modules[activeModule];

  return (
    <section
      id="sports-os"
      className="relative h-screen w-screen snap-start shrink-0 overflow-hidden flex flex-col items-center justify-center bg-iron schematic-grid border-b border-silver-structure/5"
    >
      <div className="relative z-20 w-full max-w-5xl px-6">
        <div className="text-center mb-8">
          <div className="font-mono text-xs text-emerald-core uppercase tracking-[0.25em] mb-2">[ THE_SPORTS_OPERATING_SYSTEM ]</div>
          <h2 className="text-3xl font-bold tracking-tight text-white uppercase font-sans">THE SPORTS OS</h2>
          <p className="text-xs text-silver-structure/60 mt-1">
            მოდულური არქიტექტურა, რომელიც მარტივად იტევს ახალ ფუნქციონალს ყოველგვარი ქაოსის გარეშე.
          </p>
        </div>

        {/* Discord-like Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 border border-silver-structure/10 rounded-lg overflow-hidden h-[340px] font-mono text-xs">
          
          {/* Channels Sidebar (4 cols) */}
          <div className="md:col-span-4 bg-iron-surface/80 border-r border-silver-structure/10 p-4 space-y-4">
            <div className="text-[10px] text-silver-structure/40 uppercase tracking-wider">[ SYSTEM_CHANNELS ]</div>
            <ul className="space-y-1.5">
              {Object.values(modules).map((m) => (
                <li key={m.id}>
                  <button
                    onClick={() => setActiveModule(m.id)}
                    className={`w-full text-left px-3 py-2 rounded transition-all flex items-center justify-between cursor-pointer ${
                      activeModule === m.id
                        ? "bg-iron border border-silver-structure/15 text-white"
                        : "text-silver-structure/60 hover:text-white"
                    }`}
                  >
                    <span>{m.tag}</span>
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      m.id === "scheduling" ? "bg-emerald-core" :
                      m.id === "medical" ? "bg-sapphire" :
                      m.id === "access" ? "bg-ruby" : "bg-gold-raw"
                    }`} />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Module View Console (8 cols) */}
          <div className="md:col-span-8 bg-iron-surface/40 p-6 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-bold text-white font-sans">{selected.name}</h3>
                <span className={`px-2 py-0.5 border text-[9px] rounded font-bold ${selected.color}`}>
                  {selected.status}
                </span>
              </div>
              <p className="text-xs text-silver-structure/85 font-sans leading-relaxed min-h-[60px]">
                {selected.desc}
              </p>
            </div>

            <div className="border-t border-silver-structure/10 pt-4">
              <div className="text-[9px] text-silver-structure/40 mb-2">LIVE_NODE_METRICS:</div>
              <div className="grid grid-cols-3 gap-4">
                {selected.metrics.map((met, idx) => (
                  <div key={idx} className="bg-iron/50 border border-silver-structure/5 p-2 rounded text-[10px] text-silver-structure">
                    {met}
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
