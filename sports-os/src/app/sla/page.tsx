import Link from 'next/link';

export default function SLAPage() {
  return (
    <div className="min-h-screen bg-[#121418] text-[#F5F5F7] font-sans selection:bg-[#00E676] selection:text-[#121418]">
      <main className="max-w-3xl mx-auto py-16 px-6 flex flex-col gap-12">
        <nav>
          <Link 
            href="/" 
            className="font-mono text-[#F5F5F7] hover:text-[#00E676] transition-colors duration-200"
          >
            [ ESCAPE_TO_CORE ]
          </Link>
        </nav>
        
        <header className="space-y-4 border-b border-[#F5F5F7]/10 pb-8">
          <h1 className="font-['Outfit'] text-4xl md:text-5xl font-bold tracking-tight uppercase">
            Service Level Agreement
          </h1>
          <div className="font-mono text-sm text-[#F5F5F7]/60 flex flex-col gap-1">
            <span>[ SYSTEM_LOG_ID ]: SLA_2026_V2.0</span>
            <span>[ LAST_MODIFIED ]: 2026-06-19</span>
            <span>[ STATUS ]: ENFORCED</span>
          </div>
        </header>

        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="font-mono text-lg text-[#00E676]">SECTION_01 // SYSTEM_UPTIME_99.9%</h2>
            <p className="leading-relaxed opacity-90 text-sm md:text-base">
              The Artron Core Infrastructure is guaranteed to maintain a minimum operational uptime of 99.9% during any given monthly cycle. This encompasses all physical entry gateways, localized processing nodes, and primary database synchronization channels. Scheduled downtimes for cryptographic updates are exempt and will be broadcasted 48 hours prior.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="font-mono text-lg text-[#00E676]">SECTION_02 // COMPLIANCE_AND_TELEMETRY</h2>
            <p className="leading-relaxed opacity-90 text-sm md:text-base">
              All physical hardware installations and telemetry synchronization endpoints conform to stringent international data protection parameters. In the event of latency exceeding 500ms on core biometric transfers, localized redundancies will automatically engage to preserve session data integrity.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="font-mono text-lg text-[#00E676]">SECTION_03 // DISASTER_RECOVERY</h2>
            <p className="leading-relaxed opacity-90 text-sm md:text-base">
              In cases of critical node failure or localized network disruption, Artron's decentralized backup protocols ensure full state restoration within a 4-hour window. Clients retain continuous read-only access to their historical physical performance metrics via offline cached fragments during recovery phases.
            </p>
          </div>
        </section>

        <footer className="border-t border-[#F5F5F7]/10 pt-8 mt-8">
          <p className="font-mono text-xs text-[#F5F5F7]/40 uppercase">
            END_OF_LOG // ARTRON_CONSORTIUM // VERIFIED
          </p>
        </footer>
      </main>
    </div>
  );
}
