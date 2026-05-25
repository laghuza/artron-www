import Link from "next/link";

export default function SlaPage() {
  return (
    <main className="min-h-screen w-screen bg-iron text-bone-light p-8 md:p-16 font-sans schematic-grid overflow-y-auto">
      <div className="max-w-4xl mx-auto border border-silver-structure/10 bg-iron-surface/40 p-6 md:p-10 rounded-lg">
        {/* Stamp */}
        <div className="font-mono text-[10px] text-silver-structure/60 border-b border-silver-structure/10 pb-6 mb-8 flex flex-col sm:flex-row justify-between gap-4">
          <div className="space-y-1">
            <div>[ PROTOCOL_ID: ARTRON_SLA_2026_05 ]</div>
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
          SECTION_00 // SYSTEM_INTEGRATION_SLA
        </h1>

        {/* Sections */}
        <div className="space-y-8 text-[15px] text-bone-light/85 leading-relaxed font-sans">
          <div>
            <h2 className="font-mono text-emerald-core mb-2 uppercase">[ SECTION_01 // CORE_INTEGRATION_TERMS ]</h2>
            <p>
              ეს დოკუმენტი წარმოადგენს სისტემურ ხელშეკრულებას ართრონის პლატფორმასა და კლიენტ ორგანიზაციას შორის. ართრონი უზრუნველყოფს ფიზიკური ინფრასტრუქტურის სრულ გაციფრულებას და მოდულების 99.9%-იან ხელმისაწვდომობას.
            </p>
          </div>

          <div>
            <h2 className="font-mono text-emerald-core mb-2 uppercase">[ SECTION_02 // SYSTEM_MAINTENANCE_WINDOW ]</h2>
            <p>
              სისტემური აუდიტი და გეგმიური განახლებები ტარდება ყოველკვარტალურად, რაც არ აფერხებს ლოკალურ ტერმინალებსა და წვდომის კონტროლერებს ავტონომიურ რეჟიმში მუშაობისას.
            </p>
          </div>

          <div>
            <h2 className="font-mono text-emerald-core mb-2 uppercase">[ SECTION_03 // LIABILITIES_AND_ENFORCEMENT ]</h2>
            <p>
              ნებისმიერი არასანქცირებული წვდომის მცდელობა ან API კვანძების დესტაბილიზაცია გამოიწვევს ორგანიზაციის ავტორიზაციის მყისიერ შეჩერებას და კრიტიკული რეესტრის დაბლოკვას.
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
