import Link from 'next/link';

export default function PrivacyPage() {
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
            Privacy Protocols
          </h1>
          <div className="font-mono text-sm text-[#F5F5F7]/60 flex flex-col gap-1">
            <span>[ SYSTEM_LOG_ID ]: PRV_2026_V1.2</span>
            <span>[ LAST_MODIFIED ]: 2026-06-19</span>
            <span>[ SECURITY_LEVEL ]: PUBLIC</span>
          </div>
        </header>

        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="font-mono text-lg text-[#00E676]">SECTION_01 // DATA_MINING_AND_BIOMETRICS</h2>
            <p className="leading-relaxed opacity-90 text-sm md:text-base">
              The Artron Consortium ("We", "System", "Platform") initiates telemetry protocols upon user connection. Biometric data, movement vectors, and physiological markers collected during physical conditioning are encrypted using advanced cryptographic sequences. This data remains sovereign to the user's localized node and is solely utilized for performance calibration.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="font-mono text-lg text-[#00E676]">SECTION_02 // SYSTEM_INTEGRITY</h2>
            <p className="leading-relaxed opacity-90 text-sm md:text-base">
              System integrity is maintained through decentralized validations. We do not transmit unencrypted biometric signatures to external third-party constructs. Temporary access to localized data is permitted only for verified Artron System Administrators during scheduled maintenance windows, following strict zero-trust parameters.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="font-mono text-lg text-[#00E676]">SECTION_03 // COOKIE_TELEMETRY</h2>
            <p className="leading-relaxed opacity-90 text-sm md:text-base">
              Navigation across the Artron core requires essential tracking modules (cookies) to sustain connection states and authorization handshakes. Non-essential tracking for system behavioral analytics can be disabled via the user's root terminal preferences.
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
