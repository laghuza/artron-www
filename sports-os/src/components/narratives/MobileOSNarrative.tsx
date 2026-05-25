"use client";

export default function MobileOSNarrative() {
  return (
    <div className="space-y-4 font-sans select-none animate-fadeIn">
      <div className="space-y-1">
        <div className="font-mono text-[12px] text-emerald-core uppercase tracking-[0.15em]">
          [ NODE_04 // MOBILE_ATHLETE_OS ]
        </div>
        <h2 className="text-xl font-bold tracking-tight text-white uppercase">
          ATHLETE MOBILE APP
        </h2>
      </div>

      {/* Smartphone Mockup */}
      <div className="bg-iron-surface/40 border border-silver-structure/10 p-4 rounded flex justify-center">
        <svg viewBox="0 0 200 160" className="w-full max-w-[200px] stroke-silver-structure/20 stroke-[1] fill-none">
          {/* Phone Shell */}
          <rect x="60" y="5" width="80" height="150" rx="10" strokeWidth="1.5" />
          {/* Screen */}
          <rect x="64" y="15" width="72" height="130" rx="4" />
          {/* Speaker / Notch */}
          <line x1="90" y1="10" x2="110" y2="10" strokeWidth="1.5" strokeLinecap="round" />
          
          {/* App Dashboard UI Mockup */}
          {/* Profile circle */}
          <circle cx="100" cy="35" r="10" className="stroke-emerald-core/40" />
          {/* Weekly chart bars */}
          <line x1="75" y1="90" x2="75" y2="70" strokeWidth="3" className="stroke-emerald-core" />
          <line x1="85" y1="90" x2="85" y2="60" strokeWidth="3" className="stroke-emerald-core/60" />
          <line x1="95" y1="90" x2="95" y2="75" strokeWidth="3" className="stroke-emerald-core" />
          <line x1="105" y1="90" x2="105" y2="50" strokeWidth="3" className="stroke-emerald-core" />
          <line x1="115" y1="90" x2="115" y2="80" strokeWidth="3" className="stroke-emerald-core/40" />
          <line x1="125" y1="90" x2="125" y2="65" strokeWidth="3" className="stroke-emerald-core" />

          {/* Metric Box */}
          <rect x="70" y="105" width="60" height="25" rx="2" className="stroke-silver-structure/30" />
          <text x="75" y="115" className="fill-emerald-core font-mono text-[5px] stroke-none">LOAD_INDEX: 82%</text>
          <text x="75" y="123" className="fill-silver-structure/60 font-mono text-[4px] stroke-none">STATUS: EXCELLENT</text>
        </svg>
      </div>

      <p className="text-[15px] text-bone-light/85 leading-relaxed font-sans">
        NativeWind-ზე დაშენებული მობილური აპლიკაცია მოვარჯიშეებისა და მშობლებისთვის. რეალურ დროში ტრენინგების განრიგი, ბიომეტრიული მონაცემები და Push შეტყობინებები.
      </p>
    </div>
  );
}
