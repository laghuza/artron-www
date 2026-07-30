import Link from 'next/link';

export default function TermsPage() {
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
            Terms of Protocol
          </h1>
          <div className="font-mono text-sm text-[#F5F5F7]/60 flex flex-col gap-1">
            <span>[ SYSTEM_LOG_ID ]: TRM_2026_V1.1</span>
            <span>[ LAST_MODIFIED ]: 2026-06-19</span>
            <span>[ STATUS ]: ACTIVE_DIRECTIVE</span>
          </div>
        </header>

        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="font-mono text-lg text-[#00E676]">SECTION_01 // ACCESS_PROTOCOLS</h2>
            <p className="leading-relaxed opacity-90 text-sm md:text-base">
              By authenticating with the Artron Core, users agree to operate within the established boundaries of the system. Access is granted on a per-node basis, strictly tied to verified credentials. Any attempt to bypass authorization checkpoints or manipulate telemetry data streams will result in immediate termination of the connection and a permanent log entry.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="font-mono text-lg text-[#00E676]">SECTION_02 // MUTABILITY_POLICIES</h2>
            <p className="leading-relaxed opacity-90 text-sm md:text-base">
              User profiles, fitness vectors, and historical archives are designated as mutable exclusively by the owner or assigned administrative delegates. The system reserves the right to automatically purge orphaned sessions and deregister inactive accounts after a continuous latency period exceeding 365 days.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="font-mono text-lg text-[#00E676]">SECTION_03 // RESOURCE_ALLOCATION</h2>
            <p className="leading-relaxed opacity-90 text-sm md:text-base">
              Bandwidth, computational cycles, and physical access timeslots within the Artron ecosystem are dynamically allocated based on prevailing subscription tiers. Users acknowledge that system resources are finite and governed by fair-use algorithms designed to maintain overall network stability and optimal performance across all active instances.
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
