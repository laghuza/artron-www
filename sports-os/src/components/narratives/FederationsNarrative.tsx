"use client";

interface FederationsNarrativeProps {
  onBack: () => void;
}

export default function FederationsNarrative({ onBack }: FederationsNarrativeProps) {
  return (
    <div className="space-y-6 font-sans select-none animate-fadeIn">
      <div className="space-y-1">
        <div className="font-mono text-[12px] text-sapphire-light uppercase tracking-[0.15em]">
          [ NODE_01 // SOVEREIGN_FEDERATIONS ]
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-white uppercase">
          FEDERATION NODES
        </h2>
      </div>

      <div className="h-[1px] bg-silver-structure/10 w-full" />

      <div className="bg-iron-surface/40 border border-silver-structure/10 p-4 rounded font-mono text-[12px] tracking-[0.15em] space-y-3 leading-relaxed">
        <div className="text-sapphire-light">&gt; CONNECTED FEDERATION REGISTRY:</div>
        <div className="space-y-1 text-silver-structure/85">
          <div className="flex justify-between">
            <span>GEO_FOOTBALL_FED:</span>
            <span className="text-emerald-core">● SECURE_ACTIVE</span>
          </div>
          <div className="flex justify-between">
            <span>GEO_BASKETBALL_FED:</span>
            <span className="text-emerald-core">● SECURE_ACTIVE</span>
          </div>
          <div className="flex justify-between">
            <span>GEO_RUGBY_UNION:</span>
            <span className="text-emerald-core">● SECURE_ACTIVE</span>
          </div>
        </div>
        <div className="pt-2 border-t border-silver-structure/10 text-silver-structure/60">
          [ GATEWAY_KEY ]: AES_256_RSA_ACTIVE
          <br />
          [ SYS_LOAD ]: 12.4%
        </div>
      </div>

      <p className="text-[15px] text-bone-light/85 leading-relaxed font-sans">
        ეროვნული ფედერაციების მონაცემთა ბაზა დაცულია ორმხრივი დაშიფვრით. თითოეული ფედერაციისთვის შექმნილია დამოუკიდებელი კრიპტოგრაფიული კარიბჭე (Secure Gateway API).
      </p>

      <div className="pt-2">
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
