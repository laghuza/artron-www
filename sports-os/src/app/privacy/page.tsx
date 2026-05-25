import Link from "next/link";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen w-screen bg-iron text-bone-light p-8 md:p-16 font-sans schematic-grid overflow-y-auto">
      <div className="max-w-4xl mx-auto border border-silver-structure/10 bg-iron-surface/40 p-6 md:p-10 rounded-lg">
        {/* Stamp */}
        <div className="font-mono text-[10px] text-silver-structure/60 border-b border-silver-structure/10 pb-6 mb-8 flex flex-col sm:flex-row justify-between gap-4">
          <div className="space-y-1">
            <div>[ PROTOCOL_ID: ARTRON_PRV_2026_05 ]</div>
            <div>[ LAST_AUDIT: 2026-05-22 ]</div>
          </div>
          <div className="flex items-center gap-1.5 font-bold text-emerald-core">
            [ STATUS:{" "}
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-core opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-core"></span>
            </span>
            SYSTEM_VALID ]
          </div>
        </div>

        {/* Title */}
        <h1 className="font-mono text-xl md:text-2xl font-bold tracking-tight text-white mb-8 border-b border-silver-structure/10 pb-4">
          SECTION_00 // SYSTEM_DATA_PRIVACY_PROTOCOL
        </h1>

        {/* Sections */}
        <div className="space-y-8 text-[15px] text-bone-light/85 leading-relaxed font-sans">
          <div>
            <h2 className="font-mono text-emerald-core mb-2 uppercase">[ SECTION_01 // ENCRYPTION_STANDARDS ]</h2>
            <p>
              მომხმარებელთა და ორგანიზაციათა ყველა მონაცემი იშიფრება SHA-256 და AES-256 ალგორითმების გამოყენებით. ინფორმაცია მკაცრად იზოლირებულია Multi-Tenant სერვერულ კვანძებში.
            </p>
          </div>

          <div>
            <h2 className="font-mono text-emerald-core mb-2 uppercase">[ SECTION_02 // TELEMETRY_AND_BIOMETRICS ]</h2>
            <p>
              ბიომეტრიული სკანერების მონაცემები მუშავდება დაუყოვნებლივ ლოკალურ მეხსიერებაში და არ ინახება ცენტრალიზებულ ღრუბლოვან სერვერებზე პირდაპირი იდენტიფიკატორების სახით.
            </p>
          </div>

          <div>
            <h2 className="font-mono text-emerald-core mb-2 uppercase">[ SECTION_03 // COMPLIANCE_AND_AUDIT ]</h2>
            <p>
              მონაცემთა დაცვისა და უსაფრთხოების წესები სრულად შეესაბამება ევროპულ GDPR რეგულაციებსა და ISO 27001 სტანდარტებს. სისტემა ექვემდებარება ყოველწლიურ გარე უსაფრთხოების აუდიტს.
            </p>
          </div>
        </div>

        {/* Return Button */}
        <div className="border-t border-silver-structure/10 pt-8 mt-12 flex justify-between items-center">
          <Link
            href="/"
            className="font-mono text-[12px] text-emerald-core hover:text-[#00F580] transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            ← Return to Core
          </Link>
          <span className="font-mono text-[9px] text-silver-structure/30">ARTRON.IO // CONFIDENTIAL</span>
        </div>
      </div>
    </main>
  );
}
