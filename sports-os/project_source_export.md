# Project Source Code Export

## File: `src/app/club/control/page.tsx`

```typescript
"use client";

import { useRouter } from "next/navigation";

export default function ClubControlPanel() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-iron text-white font-sans selection:bg-emerald-core/30 p-8 flex flex-col justify-between relative overflow-hidden schematic-grid">
      {/* Header Bar */}
      <div className="flex justify-between items-center border-b border-silver-structure/10 pb-6 z-10">
        <div>
          <div className="font-mono text-[10px] text-emerald-core tracking-[0.18em] uppercase">
            [ SPORTS_CLUB_MANAGEMENT_NODE ]
          </div>
          <h1 className="text-2xl font-bold uppercase tracking-tight">
            Club Control Panel
          </h1>
        </div>
        <button
          onClick={() => router.push("/")}
          className="font-mono text-[12px] text-silver-structure hover:text-white transition-colors border border-silver-structure/25 px-4 py-1.5 rounded uppercase hover:bg-white/5 cursor-pointer"
        >
          ← Terminate Connection
        </button>
      </div>

      {/* Main Grid content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8 flex-1 items-stretch z-10">
        {/* Card 1: Roster */}
        <div className="bg-[#1A1D23]/55 border border-[rgba(156,163,175,0.12)] backdrop-blur-[24px] p-6 rounded flex flex-col justify-between">
          <div>
            <div className="font-mono text-[10px] text-silver-structure tracking-[0.18em] uppercase mb-2">
              // CLUB_ROSTER
            </div>
            <div className="text-4xl font-extrabold text-emerald-core font-mono">
              450
            </div>
            <p className="text-[14px] text-bone-light/85 mt-2 font-sans">
              Sports practitioners and club members registered.
            </p>
          </div>
          <div className="font-mono text-[10px] text-emerald-core/80 mt-4">
            [ STATUS: SYNCHRONIZED ]
          </div>
        </div>

        {/* Card 2: Training Sessions */}
        <div className="bg-[#1A1D23]/55 border border-[rgba(156,163,175,0.12)] backdrop-blur-[24px] p-6 rounded flex flex-col justify-between">
          <div>
            <div className="font-mono text-[10px] text-silver-structure tracking-[0.18em] uppercase mb-2">
              // TRAINING_PROGRAMS
            </div>
            <div className="text-4xl font-extrabold text-copper font-mono">
              14
            </div>
            <p className="text-[14px] text-bone-light/85 mt-2 font-sans">
              Active sports programs and training paths running.
            </p>
          </div>
          <div className="font-mono text-[10px] text-copper/80 mt-4">
            [ SCHEDULES: LIVE ]
          </div>
        </div>

        {/* Card 3: Gateway Node status */}
        <div className="bg-[#1A1D23]/55 border border-[rgba(156,163,175,0.12)] backdrop-blur-[24px] p-6 rounded flex flex-col justify-between">
          <div>
            <div className="font-mono text-[10px] text-silver-structure tracking-[0.18em] uppercase mb-2">
              // HUB_NODE_SECURITY
            </div>
            <div className="text-4xl font-extrabold text-gold-raw font-mono">
              SECURE
            </div>
            <p className="text-[14px] text-bone-light/85 mt-2 font-sans">
              Access permissions and local node firewall parameters verified.
            </p>
          </div>
          <div className="font-mono text-[10px] text-gold-raw/80 mt-4">
            [ TENANT_ID: ACTIVE_OK ]
          </div>
        </div>
      </div>

      {/* Footer log bar */}
      <div className="border-t border-silver-structure/10 pt-4 flex justify-between items-center text-[10px] font-mono text-silver-structure tracking-[0.18em] z-10">
        <div>CORE INTEGRATION STABLE // DECRYPT_KEY: A-VALID</div>
        <div>ARTRON.IO // CONFIDENTIAL CMD</div>
      </div>
    </div>
  );
}

```

## File: `src/app/federation/dashboard/page.tsx`

```typescript
"use client";

import { useRouter } from "next/navigation";

export default function FederationDashboard() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-iron text-white font-sans selection:bg-emerald-core/30 p-8 flex flex-col justify-between relative overflow-hidden schematic-grid">
      {/* Header Bar */}
      <div className="flex justify-between items-center border-b border-silver-structure/10 pb-6 z-10">
        <div>
          <div className="font-mono text-[10px] text-emerald-core tracking-[0.18em] uppercase">
            [ SOVEREIGN_FEDERATION_INTEGRATION_NODE ]
          </div>
          <h1 className="text-2xl font-bold uppercase tracking-tight">
            Federation Central Command
          </h1>
        </div>
        <button
          onClick={() => router.push("/")}
          className="font-mono text-[12px] text-silver-structure hover:text-white transition-colors border border-silver-structure/25 px-4 py-1.5 rounded uppercase hover:bg-white/5 cursor-pointer"
        >
          ← Terminate Connection
        </button>
      </div>

      {/* Main Grid content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8 flex-1 items-stretch z-10">
        {/* Card 1: Core Telemetry */}
        <div className="bg-[#1A1D23]/55 border border-[rgba(156,163,175,0.12)] backdrop-blur-[24px] p-6 rounded flex flex-col justify-between">
          <div>
            <div className="font-mono text-[10px] text-silver-structure tracking-[0.18em] uppercase mb-2">
              // ATHLETE_DIRECTORY
            </div>
            <div className="text-4xl font-extrabold text-emerald-core font-mono">
              48,201
            </div>
            <p className="text-[14px] text-bone-light/85 mt-2 font-sans">
              Active sports practitioners registry database verified.
            </p>
          </div>
          <div className="font-mono text-[10px] text-emerald-core/80 mt-4">
            [ DATA_SYNC: SECURE_SYNC_OK ]
          </div>
        </div>

        {/* Card 2: Trainer / Officer Database */}
        <div className="bg-[#1A1D23]/55 border border-[rgba(156,163,175,0.12)] backdrop-blur-[24px] p-6 rounded flex flex-col justify-between">
          <div>
            <div className="font-mono text-[10px] text-silver-structure tracking-[0.18em] uppercase mb-2">
              // LICENSED_TRAINERS
            </div>
            <div className="text-4xl font-extrabold text-copper font-mono">
              1,842
            </div>
            <p className="text-[14px] text-bone-light/85 mt-2 font-sans">
              Professionals credentials and coaching certifications validated.
            </p>
          </div>
          <div className="font-mono text-[10px] text-copper/80 mt-4">
            [ REGISTRY: VERIFIED ]
          </div>
        </div>

        {/* Card 3: Clubs Overview */}
        <div className="bg-[#1A1D23]/55 border border-[rgba(156,163,175,0.12)] backdrop-blur-[24px] p-6 rounded flex flex-col justify-between">
          <div>
            <div className="font-mono text-[10px] text-silver-structure tracking-[0.18em] uppercase mb-2">
              // REGISTERED_ACADEMIES
            </div>
            <div className="text-4xl font-extrabold text-gold-raw font-mono">
              94
            </div>
            <p className="text-[14px] text-bone-light/85 mt-2 font-sans">
              Affiliated sports entities active in the sovereign grid.
            </p>
          </div>
          <div className="font-mono text-[10px] text-gold-raw/80 mt-4">
            [ MULTI_TENANT: ACTIVE ]
          </div>
        </div>
      </div>

      {/* Footer log bar */}
      <div className="border-t border-silver-structure/10 pt-4 flex justify-between items-center text-[10px] font-mono text-silver-structure tracking-[0.18em] z-10">
        <div>CORE INTEGRATION STABLE // DECRYPT_KEY: A-VALID</div>
        <div>ARTRON.IO // CONFIDENTIAL CMD</div>
      </div>
    </div>
  );
}

```

## File: `src/app/globals.css`

```css
@import "tailwindcss";

:root {
  --background: #121418;
  --foreground: #f5f5f7;
}

@theme {
  --color-iron: #121418;
  --color-iron-surface: #1A1D23;
  --color-iron-border: #232730;
  
  --color-emerald-core: #00E676;
  --color-sapphire: #0F52BA;
  --color-gold-raw: #D4AF37;
  --color-copper: #D97736;
  --color-ruby: #FF3D00;
  
  --color-silver-structure: #9CA3AF;
  --color-bone-light: #F5F5F7;
  
  --font-sans: var(--font-outfit), sans-serif;
  --font-mono: var(--font-jetbrains-mono), monospace;
  
  --ease-expo-out: cubic-bezier(0.16, 1, 0.3, 1);
}

html,
body,
#__next,
body > div:first-child {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: var(--background);
  color: var(--foreground);
  font-family: var(--font-sans);
}

/* Custom Hide Scrollbar Utility */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

/* Schematic Grid Background with Ambient Vignette */
.schematic-grid {
  background-size: 40px 40px, 40px 40px, 100% 100%;
  background-image: 
    linear-gradient(to right, rgba(156, 163, 175, 0.04) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(156, 163, 175, 0.04) 1px, transparent 1px),
    radial-gradient(circle at center, #16191e 0%, #121418 80%);
}

/* Blinking cursor */
@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
.animate-blink {
  animation: blink 1s step-end infinite;
}

/* Scan laser animation */
@keyframes laser-scan {
  0% { top: 0%; opacity: 0; }
  5% { opacity: 0.8; }
  95% { opacity: 0.8; }
  100% { top: 100%; opacity: 0; }
}
.animate-laser {
  animation: laser-scan 1.8s cubic-bezier(0.15, 0.85, 0.45, 1) forwards;
}

/* Float animation for biomechanical dots */
@keyframes float {
  0%, 100% { transform: translateY(0px) scale(1); }
  50% { transform: translateY(-6px) scale(1.1); }
}
.animate-float {
  animation: float 4s ease-in-out infinite;
}

/* Premium tactile kinetic overrides */
.transition,
.transition-all,
.transition-colors,
.transition-opacity,
.transition-shadow,
.transition-transform {
  transition-duration: 600ms;
  transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
}

/* Vector Subpixel Geometric Precision */
svg line,
svg path,
svg polyline,
svg circle {
  shape-rendering: geometricPrecision;
  vector-effect: non-scaling-stroke;
}

/* Micro-Typography & Optical Kerning */
h1.uppercase,
h2.uppercase,
h3.uppercase,
h4.uppercase {
  letter-spacing: -0.02em;
  line-height: 0.95;
}

.font-mono {
  letter-spacing: 0.18em;
}

/* Fast secure authorization pulses */
@keyframes pulse-fast {
  0%, 100% { opacity: 0.15; }
  50% { opacity: 0.85; }
}
.animate-pulse-fast {
  animation: pulse-fast 0.6s cubic-bezier(0.16, 1, 0.3, 1) infinite;
}

@keyframes ping-fast {
  75%, 100% {
    transform: scale(2.2);
    opacity: 0;
  }
}
.animate-ping-fast {
  animation: ping-fast 0.6s cubic-bezier(0.16, 1, 0.3, 1) infinite;
}

/* Cinematic Radial Sweep Effect */
@keyframes radial-sweep {
  0% {
    width: 0px;
    height: 0px;
    opacity: 0.9;
    box-shadow: 0 0 30px 10px rgba(0, 230, 118, 0.6), inset 0 0 20px 5px rgba(0, 230, 118, 0.4);
  }
  100% {
    width: 2500px;
    height: 2500px;
    opacity: 0;
    box-shadow: 0 0 120px 40px rgba(0, 230, 118, 0), inset 0 0 100px 30px rgba(0, 230, 118, 0);
  }
}
.radial-sweep-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  border: 1px solid rgba(0, 230, 118, 0.35);
  background: radial-gradient(circle, rgba(0, 230, 118, 0.08) 0%, transparent 75%);
  pointer-events: none;
  z-index: 10;
  animation: radial-sweep 1.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

/* Linear input styles */
.line-input-core {
  background: transparent;
  border: none;
  border-bottom: 1px solid rgba(156, 163, 175, 0.2);
  border-radius: 0;
  padding: 8px 0;
  color: #fff;
  outline: none;
  transition: border-bottom-color 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.line-input-core:focus {
  border-bottom-color: #00E676;
}

.line-input-centered {
  background: transparent;
  border: none;
  border-bottom: 1px solid rgba(192, 192, 192, 0.35); /* 1px Antique Silver style */
  border-radius: 0;
  padding: 8px 0;
  color: #fff;
  outline: none;
  text-align: center;
  font-family: var(--font-mono);
  font-size: 13px;
  width: 100%;
  max-width: 480px;
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  letter-spacing: 0.2em;
}
.line-input-centered:focus {
  border-bottom-color: #00E676;
  box-shadow: 0 1px 0 0 #00E676;
}
.line-input-centered::placeholder {
  color: rgba(192, 192, 192, 0.25);
  text-align: center;
}

/* Cinematic Fade-to-black overlay */
.fade-to-black-overlay {
  position: fixed;
  inset: 0;
  background: #000000;
  z-index: 9999;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}
.fade-to-black-overlay.active {
  opacity: 1;
}

/* Core bright validation flash */
@keyframes core-flash {
  0% {
    transform: scale(1);
    filter: brightness(3);
    opacity: 1;
  }
  100% {
    transform: scale(1.65);
    filter: brightness(1);
    opacity: 0.15;
  }
}
.animate-core-flash {
  animation: core-flash 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

/* Grandiose Core Pulsation */
@keyframes core-grandiose-pulse {
  0%, 100% {
    transform: translate(200px, 200px) scale(1);
    filter: drop-shadow(0 0 12px rgba(0, 230, 118, 0.3));
  }
  50% {
    transform: translate(200px, 200px) scale(1.22);
    filter: drop-shadow(0 0 35px rgba(0, 230, 118, 0.85));
  }
}
.animate-core-grandiose {
  transform-origin: 200px 200px;
  animation: core-grandiose-pulse 3s ease-in-out infinite;
}

/* GATE_A Hover Slow Emerald Pulsation */
@keyframes gate-a-pulse {
  0%, 100% {
    transform: translate(200px, 200px) scale(1);
    filter: drop-shadow(0 0 12px rgba(0, 230, 118, 0.3));
  }
  50% {
    transform: translate(200px, 200px) scale(1.16);
    filter: drop-shadow(0 0 30px rgba(0, 230, 118, 0.8));
  }
}
.animate-core-gate-a-hover {
  transform-origin: 200px 200px;
  animation: gate-a-pulse 2.2s ease-in-out infinite;
}

/* Telemetry Marquee Animation */
@keyframes telemetry-marquee {
  0% { transform: translate3d(0, 0, 0); }
  100% { transform: translate3d(-50%, 0, 0); }
}
.animate-telemetry-marquee {
  display: inline-flex;
  animation: telemetry-marquee 35s linear infinite;
}

/* Audio Wave Visualizer Styles */
.audio-wave {
  display: inline-flex;
  align-items: flex-end;
  gap: 2px;
  width: 14px;
  height: 10px;
}
.audio-bar {
  width: 2px;
  background-color: #00E676;
  border-radius: 1px;
  transition: height 0.3s ease, background-color 0.3s ease;
}
.audio-wave.playing .audio-bar {
  animation: audio-bounce 0.8s ease-in-out infinite alternate;
}
.audio-wave.playing .audio-bar:nth-child(1) {
  animation-delay: 0.1s;
}
.audio-wave.playing .audio-bar:nth-child(2) {
  animation-delay: 0.4s;
}
.audio-wave.playing .audio-bar:nth-child(3) {
  animation-delay: 0.25s;
}

@keyframes audio-bounce {
  0% {
    height: 3px;
  }
  100% {
    height: 10px;
  }
}




```

## File: `src/app/layout.tsx`

```typescript
import type { Metadata } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import OfflineGuard from "@/components/OfflineGuard";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ARTRON: Sports OS",
  description: "Systemic self-organization for sports federations, clubs, and professionals.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ka" className="h-full antialiased dark">
      <body className={`${outfit.variable} ${jetbrainsMono.variable} min-h-full bg-iron text-silver-light font-sans`}>
        <OfflineGuard>{children}</OfflineGuard>
      </body>
    </html>
  );
}

```

## File: `src/app/page.tsx`

```typescript
"use client";

import SplitCoreDashboard from "@/components/SplitCoreDashboard";

export default function Home() {
  return <SplitCoreDashboard />;
}

```

## File: `src/app/privacy/page.tsx`

```typescript
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

```

## File: `src/app/sla/page.tsx`

```typescript
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

```

## File: `src/components/ArtronLogo.tsx`

```typescript
"use client";

interface ArtronLogoProps {
  className?: string;
}

export default function ArtronLogo({ className = "w-5 h-5" }: ArtronLogoProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={`${className} fill-none`}
    >
      {/* Connectors (Outer boundary square + internal diagonals/cross lines) */}
      <g id="artron-connectors" className="artron-connectors stroke-silver-structure/35">
        {/* Outer Perimeter */}
        <line x1="8" y1="8" x2="32" y2="8" strokeWidth="1.1" strokeLinecap="round" />
        <line x1="32" y1="8" x2="56" y2="8" strokeWidth="1.1" strokeLinecap="round" />
        <line x1="56" y1="8" x2="56" y2="32" strokeWidth="1.1" strokeLinecap="round" />
        <line x1="56" y1="32" x2="56" y2="56" strokeWidth="1.1" strokeLinecap="round" />
        <line x1="56" y1="56" x2="32" y2="56" strokeWidth="1.1" strokeLinecap="round" />
        <line x1="32" y1="56" x2="8" y2="56" strokeWidth="1.1" strokeLinecap="round" />
        <line x1="8" y1="56" x2="8" y2="32" strokeWidth="1.1" strokeLinecap="round" />
        <line x1="8" y1="32" x2="8" y2="8" strokeWidth="1.1" strokeLinecap="round" />

        {/* Inner Cross and Diagonals connected to Center (32,32) */}
        <line x1="32" y1="8" x2="32" y2="32" strokeWidth="1.1" strokeLinecap="round" />
        <line x1="56" y1="8" x2="32" y2="32" strokeWidth="1.1" strokeLinecap="round" />
        <line x1="56" y1="32" x2="32" y2="32" strokeWidth="1.1" strokeLinecap="round" />
        <line x1="56" y1="56" x2="32" y2="32" strokeWidth="1.1" strokeLinecap="round" />
        <line x1="32" y1="56" x2="32" y2="32" strokeWidth="1.1" strokeLinecap="round" />
        <line x1="8" y1="56" x2="32" y2="32" strokeWidth="1.1" strokeLinecap="round" />
        <line x1="8" y1="32" x2="32" y2="32" strokeWidth="1.1" strokeLinecap="round" />
        <line x1="8" y1="8" x2="32" y2="32" strokeWidth="1.1" strokeLinecap="round" />
      </g>

      {/* Outer Nodes (Antique Silver, 2.4px radius, placed on 3x3 boundary coordinates) */}
      <g id="artron-outer-nodes" className="artron-outer-nodes fill-iron stroke-[#9CA3AF] stroke-[1.2]">
        <circle cx="32" cy="8" r="2.4" />
        <circle cx="56" cy="8" r="2.4" />
        <circle cx="56" cy="32" r="2.4" />
        <circle cx="56" cy="56" r="2.4" />
        <circle cx="32" cy="56" r="2.4" />
        <circle cx="8" cy="56" r="2.4" />
        <circle cx="8" cy="32" r="2.4" />
        <circle cx="8" cy="8" r="2.4" />
      </g>

      {/* Center Emerald Core (Emerald, 4.4px radius) */}
      <g id="artron-emerald-core" className="artron-emerald-core fill-[#00E676] stroke-[#00E676] stroke-[1]">
        <circle cx="32" cy="32" r="4.4" />
      </g>
    </svg>
  );
}

```

## File: `src/components/CoreSection.tsx`

```typescript
"use client";

import { useEffect, useRef, useState } from "react";

const BOOT_LOGS = [
  "[ INIT ] LOADING SPORTS OS KERNEL V1.0.42...",
  "[ OK ] MEMORY PAGE POOL DECLARED [ 512MB ]",
  "[ OK ] CONNECTING TO DECENTRALIZED WORKER NODES...",
  "[ OK ] ENNEA CORE CONNECTION ESTABLISHED [ 4.8ms ]",
  "[ OK ] ACQUIRING SYSTEM ACCREDITATION LEVELS...",
  "[ OK ] DECRYPTING GRAPHICS BUFFER...",
  "[ OK ] BOOT SEQUENCE COMPLETED SUCCESSFULLY.",
];

export default function CoreSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [bootLogs, setBootLogs] = useState<string[]>([]);
  const [isBooted, setIsBooted] = useState(false);
  const [showLaser, setShowLaser] = useState(false);

  useEffect(() => {
    let logIndex = 0;
    const interval = setInterval(() => {
      if (logIndex < BOOT_LOGS.length) {
        setBootLogs((prev) => [...prev, BOOT_LOGS[logIndex]]);
        logIndex++;
      } else {
        clearInterval(interval);
        setShowLaser(true);
        setTimeout(() => {
          setIsBooted(true);
          setShowLaser(false);
        }, 800);
      }
    }, 200);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isBooted) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const particles: Array<{ x: number; y: number; tx: number; ty: number; r: number; a: number }> = [];
    const cx = w / 2, cy = h / 2, gap = Math.min(w, h) * 0.15;
    const nodes = Array.from({ length: 9 }, (_, idx) => ({
      x: cx + ((idx % 3) - 1) * gap,
      y: cy + (Math.floor(idx / 3) - 1) * gap,
    }));

    for (let i = 0; i < 200; i++) {
      const node = nodes[i % nodes.length];
      const rad = 25 * Math.random(), ang = Math.random() * Math.PI * 2;
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        tx: node.x + Math.cos(ang) * rad,
        ty: node.y + Math.sin(ang) * rad,
        r: Math.random() * 1.5 + 0.8,
        a: Math.random() * 0.5 + 0.5,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = "rgba(156, 163, 175, 0.03)";
      ctx.lineWidth = 0.5;
      nodes.forEach((n, i) => {
        nodes.forEach((n2, j) => {
          if (i !== j && Math.hypot(n.x - n2.x, n.y - n2.y) < gap * 1.5) {
            ctx.beginPath(); ctx.moveTo(n.x, n.y); ctx.lineTo(n2.x, n2.y); ctx.stroke();
          }
        });
      });

      particles.forEach((p, i) => {
        p.x += (p.tx - p.x) * 0.04;
        p.y += (p.ty - p.y) * 0.04;
        ctx.fillStyle = `rgba(0, 230, 118, ${p.a})`;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 40) {
            ctx.strokeStyle = `rgba(0, 230, 118, ${(1 - dist / 40) * 0.15})`;
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p2.x, p2.y); ctx.stroke();
          }
        }
      });
      animId = requestAnimationFrame(animate);
    };
    animate();

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [isBooted]);

  return (
    <section id="core" className="relative h-screen w-screen snap-start shrink-0 overflow-hidden flex flex-col items-center justify-center bg-iron schematic-grid">
      {showLaser && <div className="absolute left-0 z-50 h-[2px] w-full bg-emerald-core shadow-[0_0_15px_#00E676] animate-laser" />}
      {!isBooted ? (
        <div className="z-20 font-mono text-[10px] text-emerald-core max-w-lg w-full px-6 space-y-1.5 text-left select-none">
          {bootLogs.map((log, idx) => <div key={idx} className="opacity-90 tracking-wide">&gt; {log}</div>)}
          <div className="inline-block w-1.5 h-3 bg-emerald-core animate-blink ml-1"></div>
        </div>
      ) : (
        <>
          <canvas ref={canvasRef} className="absolute inset-0 z-10 block pointer-events-none" />
          <div className="relative z-20 text-center px-6 max-w-3xl pointer-events-none select-none">
            <div className="font-mono text-xs text-emerald-core uppercase tracking-[0.25em] mb-4">[ THE PORTAL GATEWAY ]</div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6 uppercase">ARTRON.<br />THE SPORTING INFRASTRUCTURE STANDARD.</h1>
            <p className="text-xs md:text-sm text-silver-structure/80 leading-relaxed max-w-xl mx-auto mb-8">
              ქაოსიდან წესრიგში ლაგებადი ეკოსისტემა. სპორტული ინფრასტრუქტურის გლობალური სტანდარტი, რომელიც უზრუნველყოფს ფიზიკური სივრცეებისა და პროცესების სრულ გაციფრულებას.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pointer-events-auto">
              <a
                href="#gateway"
                className="px-6 py-2.5 font-mono text-xs font-bold text-iron bg-emerald-core border border-emerald-core hover:bg-emerald-core/90 transition-all rounded"
              >
                REQUEST SYSTEM ACCESS
              </a>
              <button
                onClick={() => {
                  const evt = new CustomEvent("open-ghost-menu");
                  window.dispatchEvent(evt);
                }}
                className="px-6 py-2.5 font-mono text-xs font-bold text-emerald-core border border-emerald-core/20 hover:border-emerald-core bg-emerald-core/5 hover:bg-emerald-core/10 transition-all rounded cursor-pointer"
              >
                ENTER THE CORE
              </button>
            </div>
          </div>
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce flex flex-col items-center gap-2">
            <span className="font-mono text-[9px] text-silver-structure/40 tracking-wider">SCROLL_TO_SYSTEM_LAYERS</span>
            <svg className="w-4 h-4 text-emerald-core" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </>
      )}
    </section>
  );
}

```

## File: `src/components/DigitalTwinSection.tsx`

```typescript
"use client";

import { useState } from "react";

interface NodeData {
  id: string;
  name: string;
  type: string;
  status: string;
  color: string;
  desc: string;
}

export default function DigitalTwinSection() {
  const [selectedNode, setSelectedNode] = useState<NodeData>({
    id: "gate_1",
    name: "RFID_TURNSTILE_01",
    type: "ACCESS_CONTROL",
    status: "ONLINE / SECURE",
    color: "text-emerald-core bg-emerald-core/10 border-emerald-core/30",
    desc: "შესასვლელი ბარიერი. კავშირი კლუბის ბირთვთან და აბონემენტების ბაზასთან.",
  });

  const nodes: NodeData[] = [
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

  return (
    <section
      id="digital-twin"
      className="relative h-screen w-screen snap-start shrink-0 overflow-hidden flex flex-col items-center justify-center bg-iron schematic-grid border-b border-silver-structure/5"
    >
      <div className="relative z-20 w-full max-w-6xl px-6 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        {/* Left: Info Panel (4 cols) */}
        <div className="md:col-span-4 bg-iron-surface/60 border border-silver-structure/10 p-6 rounded-lg font-mono text-xs">
          <div className="text-emerald-core text-[10px] uppercase tracking-[0.2em] mb-2">[ THE_DIGITAL_TWIN_TELEMETRY ]</div>
          <h2 className="text-2xl font-bold text-white mb-4 uppercase font-sans tracking-wide">DIGITAL TWIN</h2>
          <p className="text-[11px] text-silver-structure/80 leading-relaxed font-sans mb-6">
            მომხმარებელი ხედავს სპორტული სივრცის (დარბაზის, სტადიონის) თხელი ხაზებით დახატულ ციფრულ ტყუპს (Digital Twin), სადაც კვანძები რეალურ დროში პულსირებენ.
          </p>

          <div className="border-t border-silver-structure/10 pt-4 space-y-3">
            <div className="text-[9px] text-silver-structure/40 uppercase">ACTIVE_NODE_DETAILS:</div>
            <div>
              <span className="text-silver-structure font-bold">{selectedNode.name}</span>
              <div className="text-[9px] text-silver-structure/50 mt-0.5">{selectedNode.type}</div>
            </div>
            <div className={`inline-block px-2 py-0.5 border rounded text-[10px] ${selectedNode.color}`}>
              {selectedNode.status}
            </div>
            <p className="text-[11px] text-silver-structure/70 font-sans leading-relaxed pt-1">
              {selectedNode.desc}
            </p>
          </div>
        </div>

        {/* Right: Interactive Top-Down SVG Map (8 cols) */}
        <div className="md:col-span-8 flex justify-center bg-iron-surface/20 border border-silver-structure/5 p-6 rounded-lg relative">
          <svg viewBox="0 0 400 250" className="w-full max-w-2xl stroke-silver-structure/20 stroke-[0.8] fill-none">
            {/* Outer Walls / Blueprint Grid */}
            <rect x="10" y="10" width="380" height="230" rx="4" />
            
            {/* Room partitions */}
            <line x1="120" y1="10" x2="120" y2="240" />
            <line x1="120" y1="120" x2="280" y2="120" />
            <line x1="280" y1="10" x2="280" y2="240" />
            <line x1="120" y1="80" x2="10" y2="80" />
            <line x1="120" y1="160" x2="10" y2="160" />

            {/* Labels in blueprint */}
            <text x="25" y="30" className="fill-silver-structure/30 font-mono text-[8px] stroke-none">CARDIO_ZONE</text>
            <text x="25" y="110" className="fill-silver-structure/30 font-mono text-[8px] stroke-none">POOL_ACCESS</text>
            <text x="25" y="190" className="fill-silver-structure/30 font-mono text-[8px] stroke-none">ACCESS_GATES</text>
            <text x="180" y="30" className="fill-silver-structure/30 font-mono text-[8px] stroke-none">HQ_DASHBOARD</text>
            <text x="160" y="145" className="fill-silver-structure/30 font-mono text-[8px] stroke-none">BIOMETRICS_ROOM</text>
            <text x="300" y="30" className="fill-silver-structure/30 font-mono text-[8px] stroke-none">MARKETPLACE_POS</text>

            {/* Pulsing connections between nodes */}
            <path d="M60 200 L180 80 M180 80 L200 170 M200 170 L340 80" className="stroke-emerald-core/20 stroke-[1] stroke-dasharray-[4_4] fill-none" />

            {/* Node 1: RFID Gate */}
            <circle
              cx="60" cy="200" r="8"
              onClick={() => setSelectedNode(nodes[0])}
              className={`cursor-pointer fill-iron stroke-emerald-core stroke-[1.5] ${selectedNode.id === "gate_1" ? "animate-pulse r-10" : ""}`}
            />
            {/* Node 2: Biometric Scanner */}
            <circle
              cx="200" cy="170" r="8"
              onClick={() => setSelectedNode(nodes[1])}
              className={`cursor-pointer fill-iron stroke-copper stroke-[1.5] ${selectedNode.id === "biom_1" ? "animate-pulse r-10" : ""}`}
            />
            {/* Node 3: Dashboard Console */}
            <circle
              cx="180" cy="80" r="10"
              onClick={() => setSelectedNode(nodes[2])}
              className={`cursor-pointer fill-iron stroke-sapphire stroke-[2] ${selectedNode.id === "dashboard" ? "animate-pulse" : ""}`}
            />
            {/* Node 4: Gold Marketplace POS */}
            <circle
              cx="340" cy="80" r="8"
              onClick={() => setSelectedNode(nodes[3])}
              className={`cursor-pointer fill-iron stroke-gold-raw stroke-[1.5] ${selectedNode.id === "premium_pos" ? "animate-pulse" : ""}`}
            />
          </svg>
          <div className="absolute top-2 left-4 font-mono text-[8px] text-silver-structure/40">
            [ GYM_BLUEPRINT_TOP_DOWN_MAP ]
          </div>
        </div>
      </div>
    </section>
  );
}

```

## File: `src/components/GatewaySection.tsx`

```typescript
"use client";

import { useState } from "react";
import SystemRegistryFooter from "./SystemRegistryFooter";

export default function GatewaySection() {
  const [org, setOrg] = useState("");
  const [email, setEmail] = useState("");
  const [level, setLevel] = useState("L1_FEDERATION");
  const [status, setStatus] = useState<"idle" | "submitting" | "done">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!org || !email) return;
    
    setStatus("submitting");
    setTimeout(() => {
      setStatus("done");
    }, 3000);
  };

  return (
    <section
      id="gateway"
      className="relative h-screen w-screen snap-start shrink-0 overflow-hidden flex flex-col justify-between items-center bg-iron schematic-grid"
    >
      <div className="flex-1 flex flex-col justify-center items-center w-full max-w-md px-6 z-20">
        <div className="text-center mb-8">
          <div className="font-mono text-xs text-emerald-core uppercase tracking-[0.25em] mb-2">
            [ SECURE_SYSTEM_GATEWAY ]
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white uppercase font-sans">
            REQUEST ACCESS
          </h2>
          <p className="text-xs text-silver-structure/60 mt-1">
            შეავსეთ განაცხადი სისტემაში წვდომის მისაღებად.
          </p>
        </div>

        {status === "idle" && (
          <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
            <div>
              <label className="block text-emerald-core mb-1.5 uppercase">ORGANIZATION_OR_NAME:</label>
              <input
                type="text"
                required
                value={org}
                onChange={(e) => setOrg(e.target.value)}
                className="w-full bg-iron-surface border border-silver-structure/20 focus:border-emerald-core p-2.5 rounded text-white outline-none"
                placeholder="e.g. NATIONAL ATHLETICS FEDERATION"
              />
            </div>
            <div>
              <label className="block text-emerald-core mb-1.5 uppercase">SECURE_EMAIL:</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-iron-surface border border-silver-structure/20 focus:border-emerald-core p-2.5 rounded text-white outline-none"
                placeholder="e.g. admin@sports-org.gov"
              />
            </div>
            <div>
              <label className="block text-emerald-core mb-1.5 uppercase">IDENTIFICATION_CODE_OR_LICENSE:</label>
              <input
                type="text"
                required
                className="w-full bg-iron-surface border border-silver-structure/20 focus:border-emerald-core p-2.5 rounded text-white outline-none"
                placeholder="e.g. ID_405928129 / LIC_948271"
              />
            </div>
            <div>
              <label className="block text-emerald-core mb-1.5 uppercase">ORGANIZATION_TYPE:</label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full bg-iron-surface border border-silver-structure/20 focus:border-emerald-core p-2.5 rounded text-white outline-none"
              >
                <option value="FEDERATION">FEDERATION (ფედერაცია)</option>
                <option value="CLUB">CLUB / SPORTS CENTRE (კლუბი / სპორტული ცენტრი)</option>
                <option value="PROFESSIONAL">LICENSED PROFESSIONAL (დამოუკიდებელი ლიცენზირებული პროფესიონალი)</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full py-3 mt-4 bg-emerald-core/10 border border-emerald-core/30 text-emerald-core hover:border-emerald-core hover:bg-emerald-core/20 font-bold uppercase rounded cursor-pointer transition-colors"
            >
              REQUEST SYSTEM ACCESS
            </button>
          </form>
        )}

        {status !== "idle" && (
          <div className="bg-iron-surface border border-silver-structure/20 p-6 rounded font-mono text-xs space-y-4">
            <div className="text-emerald-core">
              &gt; SYSTEM ACCESS REQUEST RECEIVED...
            </div>
            <div>
              ORG: {org.toUpperCase()}
              <br />
              SYS_TYPE: {level}
            </div>
            
            {status === "submitting" ? (
              <div className="space-y-1.5">
                <div className="text-emerald-core animate-pulse">
                  SYSTEM ANALYSIS IN PROGRESS...
                </div>
                <div className="text-copper animate-pulse">
                  [ ENCRYPTING DATA NODES... ]
                </div>
                <span className="inline-block w-1.5 h-3 bg-emerald-core ml-1 animate-blink"></span>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="text-gold-raw font-bold">
                  [ CREDENTIALS SUBMITTED FOR CORE VALIDATION ]
                </div>
                <div className="text-ruby">
                  [ STATUS: UNDER REVIEW ]
                </div>
                <div className="text-[10px] text-silver-structure/50 leading-relaxed font-sans">
                  თქვენი ორგანიზაციის მონაცემები წარმატებით გაიგზავნა სისტემური ვალიდაციისთვის. უსაფრთხოების სამსახური გადაამოწმებს წარდგენილ ლიცენზიებს და დაგიკავშირდებათ მითითებულ ელ-ფოსტაზე.
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <SystemRegistryFooter />
    </section>
  );
}

```

## File: `src/components/GhostTrigger.tsx`

```typescript
"use client";

import Link from "next/link";
import ArtronLogo from "./ArtronLogo";

interface GhostTriggerProps {
  onAccessClick: () => void;
}

export default function GhostTrigger({ onAccessClick }: GhostTriggerProps) {
  return (
    <div className="flex flex-col items-end group relative select-none z-50">
      {/* Rotating 32px Trigger Logo */}
      <div className="flex items-center justify-center cursor-pointer transition-opacity duration-300 hover:opacity-80 pb-3">
        <ArtronLogo className="w-8 h-8 transition-transform duration-[2000ms] ease-out group-hover:rotate-180" />
      </div>

      {/* Glassmorphic Dropdown Panel with Invisible Hover Bridge */}
      <div className="absolute top-11 right-0 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 delay-150 group-hover:delay-0 transform translate-y-1 group-hover:translate-y-0 bg-[#1A1D23]/75 backdrop-blur-[12px] border border-silver-structure/15 rounded shadow-2xl w-48 text-right z-50 after:content-[''] after:absolute after:w-full after:h-6 after:-top-5 after:left-0 after:block">
        <button
          onClick={onAccessClick}
          className="w-full text-right text-silver-structure/70 hover:text-emerald-core font-mono text-[13px] px-6 py-5 transition-colors cursor-pointer block uppercase"
        >
          01 // ENTER THE CORE
        </button>
        <Link
          href="/sla"
          className="w-full text-right text-silver-structure/70 hover:text-emerald-core font-mono text-[13px] px-6 py-5 transition-colors block border-t border-silver-structure/15 uppercase"
        >
          02 // PROTOCOL (SLA)
        </Link>
      </div>
    </div>
  );
}

```

## File: `src/components/InteractiveEnneaCore.tsx`

```typescript
"use client";

import { useState } from "react";

interface InteractiveEnneaCoreProps {
  activeNode: number;
  onNodeSelect: (index: number) => void;
  onNodeHover: (index: number | null) => void;
  isScaledUp?: boolean;
  transitionStep?: "idle" | "zooming" | "sweeping" | "console";
  isFlashActive?: boolean;
  gateHover?: "gate_a" | "gate_b" | null;
}

const COLORS: Record<number, string> = { 1: "#0F52BA", 2: "#00E676", 3: "#D97736", 4: "#00E676", 5: "#D4AF37", 6: "#D4AF37", 9: "#00E676", 7: "#9CA3AF", 8: "#9CA3AF" };
const LABELS = ["01 // FEDERATIONS", "02 // CLUBS & ACADEMIES", "03 // PROFESSIONALS", "04 // ATHLETE MOBILE OS", "05 // COINS & BADGES", "06 // MARKETPLACE", "07 // TELEMETRY", "08 // SECURITY & SLA"];
const COORDS = [
  { x: 200, y: 50,  align: "middle" as const, tx: 200, ty: 30 },
  { x: 350, y: 50,  align: "start" as const,  tx: 364, ty: 45 }, { x: 350, y: 200, align: "start" as const,  tx: 364, ty: 203 },
  { x: 350, y: 350, align: "start" as const,  tx: 364, ty: 358 }, { x: 200, y: 350, align: "middle" as const, tx: 200, ty: 372 },
  { x: 50,  y: 350, align: "end" as const,    tx: 36,  ty: 358 }, { x: 50,  y: 200, align: "end" as const,    tx: 36,  ty: 203 },
  { x: 50,  y: 50,  align: "end" as const,    tx: 36,  ty: 45 }
];

export default function InteractiveEnneaCore({
  activeNode, onNodeSelect, onNodeHover, isScaledUp = false, transitionStep = "idle", isFlashActive = false, gateHover = null
}: InteractiveEnneaCoreProps) {
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);
  const handleLeave = () => { setHoveredNode(null); onNodeHover(null); };
  
  const nodes = COORDS.map((coord, i) => ({
    id: i + 1, ...coord, label: LABELS[i], active: activeNode === i + 1, color: COLORS[i + 1] || "#9CA3AF"
  }));
  
  const isCenterActive = activeNode === 9 || hoveredNode === 9;
  const showOuter = transitionStep !== "sweeping" && transitionStep !== "console";

  return (
    <div className={`w-full flex items-center justify-center relative transition-all duration-1000 ${
      transitionStep === "console" ? "h-[160px] md:h-[185px]" : "h-full"
    }`}>
      <svg
        viewBox="0 0 400 400"
        className={`w-full max-w-[450px] aspect-square select-none cursor-pointer overflow-visible transition-all duration-[1000ms] ${
          isScaledUp ? (transitionStep === "console" ? "scale-[0.82] translate-y-[-5px]" : "scale-[1.25] translate-y-[-24px]") : "scale-100"
        }`}
        onMouseLeave={handleLeave}
      >
        <defs>
          <radialGradient id="core-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00E676" stopOpacity="0.45" /><stop offset="100%" stopColor="#00E676" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Bounding 3x3 Grid Matrix */}
        <g className={`transition-opacity duration-1000 stroke-[rgba(156,163,175,0.04)] stroke-[0.8] fill-none pointer-events-none ${showOuter ? "opacity-100" : "opacity-0"}`}>
          <line x1="50" y1="50" x2="350" y2="50" /><line x1="50" y1="200" x2="350" y2="200" /><line x1="50" y1="350" x2="350" y2="350" />
          <line x1="50" y1="50" x2="50" y2="350" /><line x1="200" y1="50" x2="200" y2="350" /><line x1="350" y1="50" x2="350" y2="350" />
        </g>

        {/* Data Packets Flow Animation */}
        {showOuter && gateHover === "gate_b" && nodes.map((node) => (
          <circle key={`packet-${node.id}`} r="3" fill="#00E676" className="pointer-events-none">
            <animate attributeName="cx" from="200" to={node.x} dur="1.2s" repeatCount="indefinite" />
            <animate attributeName="cy" from="200" to={node.y} dur="1.2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="1;0.8;0" keyTimes="0;0.7;1" dur="1.2s" repeatCount="indefinite" />
          </circle>
        ))}

        {/* Node connectors */}
        {nodes.map((node) => {
          const isActivePath = activeNode === node.id || hoveredNode === node.id;
          return (
            <line
              key={`line-${node.id}`} x1="200" y1="200" x2={node.x} y2={node.y}
              stroke={isActivePath ? node.color : "rgba(156,163,175,0.07)"} strokeWidth={isActivePath ? "1.5" : "0.8"}
              className={`transition-opacity duration-1000 ${showOuter ? "opacity-100" : "opacity-0 pointer-events-none"}`}
            />
          );
        })}

        {/* Central Core Element */}
        <g
          onClick={() => { onNodeSelect(9); onNodeHover(9); }}
          onMouseEnter={() => { setHoveredNode(9); onNodeHover(9); }}
          onMouseLeave={() => { setHoveredNode(null); onNodeHover(null); }}
          className={!showOuter ? "animate-core-grandiose" : gateHover === "gate_a" ? "animate-core-gate-a-hover" : "transition-transform duration-300"}
          style={showOuter && gateHover !== "gate_a" ? { transform: `translate(200px, 200px)` } : {}}
        >
          <circle r="40" fill="transparent" className="cursor-pointer" />
          <circle r="48" fill="url(#core-glow)" className="pointer-events-none" />
          {isFlashActive && <circle r="48" fill="#00E676" className="pointer-events-none animate-core-flash" />}
          
          {[38, 28].map((r) => (
            <circle key={r} r={r} className={`fill-none stroke-[#00E676] stroke-[0.8] opacity-20 pointer-events-none ${activeNode === 9 ? "animate-pulse-fast" : "animate-pulse"}`} />
          ))}
          <circle r="22" fill="none" stroke="#00E676" strokeWidth="0.8" className={`opacity-15 pointer-events-none ${activeNode === 9 ? "animate-ping-fast" : "animate-ping"}`} />
          
          <g className="transition-transform duration-300" style={{ transform: isCenterActive ? "scale(1.2)" : "scale(1)" }}>
            <circle r="16" className="fill-iron-surface stroke-[#00E676] stroke-[1.2] transition-colors duration-300" style={{ fillOpacity: isCenterActive ? 0.9 : 0.4 }} />
            <circle r="6" fill="#00E676" />
          </g>
          <text y="-22" textAnchor="middle" className={`font-mono text-[6px] tracking-wider fill-[#00E676] transition-opacity duration-300 cursor-pointer ${isCenterActive && showOuter ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
            09 // REQUEST ACCESS
          </text>
        </g>

        {/* Outer Ennea Nodes */}
        {nodes.map((node) => {
          const isAct = node.active || hoveredNode === node.id;
          return (
            <g
              key={node.id} transform={`translate(${node.x}, ${node.y})`}
              onClick={() => { onNodeSelect(node.id); onNodeHover(node.id); }}
              onMouseEnter={() => { setHoveredNode(node.id); onNodeHover(node.id); }}
              onMouseLeave={() => { setHoveredNode(null); onNodeHover(null); }}
              className={`transition-opacity duration-1000 ${showOuter ? "opacity-100" : "opacity-0 pointer-events-none"}`}
            >
              <circle r="20" fill="transparent" className="cursor-pointer" />
              <circle r={isAct ? 14 : 7} fill="none" stroke={node.color} strokeWidth={isAct ? 0.8 : 0.5} className={`${isAct ? "animate-ping opacity-25" : "animate-pulse opacity-15"} pointer-events-none`} />
              
              <g className="transition-transform duration-300" style={{ transform: isAct ? "scale(1.25)" : "scale(1)" }}>
                <circle r="2.4" fill={isAct ? node.color : "#121418"} stroke={isAct ? node.color : "#9CA3AF"} strokeWidth="1.2" style={{ strokeOpacity: isAct ? 1.0 : 0.4 }} className="transition-all duration-300" />
              </g>
              <text
                x={node.tx - node.x} y={node.ty - node.y} textAnchor={node.align} fill={isAct ? "#F5F5F7" : "#9CA3AF"}
                className="font-mono text-[11px] uppercase tracking-wider transition-colors duration-300 cursor-pointer"
                style={{ fillOpacity: isAct ? 1.0 : 0.35 }}
              >
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

```

## File: `src/components/LiveTelemetryFeed.tsx`

```typescript
"use client";

import { useEffect, useState } from "react";

export default function LiveTelemetryFeed() {
  const [latency, setLatency] = useState(12);
  const [scanId, setScanId] = useState("A-90421");
  const [cpu, setCpu] = useState(24);
  const [blockHeight, setBlockHeight] = useState(894121);
  const [nodeStatus, setNodeStatus] = useState("SYNC_OK");

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate active telemetric updates
      setLatency(Math.floor(Math.random() * 7) + 9); // oscillates 9ms-15ms
      setCpu(Math.floor(Math.random() * 12) + 20); // oscillates 20%-31%
      
      if (Math.random() > 0.6) {
        const randomIds = ["A-90421", "A-12845", "A-38501", "A-77491", "A-04921", "A-55912"];
        setScanId(randomIds[Math.floor(Math.random() * randomIds.length)]);
      }

      if (Math.random() > 0.8) {
        setBlockHeight((prev) => prev + 1);
      }

      if (Math.random() > 0.95) {
        setNodeStatus(Math.random() > 0.5 ? "ACTIVE" : "SYNC_OK");
      }
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  const feedContent = (
    <span className="flex items-center gap-4 text-silver-structure/45 font-mono text-[9px] uppercase tracking-[0.15em] shrink-0">
      <span>[ TBS_NODE_01: <span className="text-emerald-core/60">{nodeStatus}</span> ]</span>
      <span>·</span>
      <span>[ ATHLETE_SCAN: <span className="text-emerald-core/60">{scanId}</span> ]</span>
      <span>·</span>
      <span>[ LATENCY: <span className="text-emerald-core/60">{latency}ms</span> ]</span>
      <span>·</span>
      <span>[ CPU_LOAD: <span className="text-emerald-core/60">{cpu}%</span> ]</span>
      <span>·</span>
      <span>[ SECURE_TUNNEL: <span className="text-emerald-core/60">ESTABLISHED</span> ]</span>
      <span>·</span>
      <span>[ DB_POOL: <span className="text-emerald-core/60">ACTIVE</span> ]</span>
      <span>·</span>
      <span>[ BLOCK: <span className="text-emerald-core/60">{blockHeight}</span> ]</span>
      <span className="mr-4">·</span>
    </span>
  );

  return (
    <div className="w-full overflow-hidden relative select-none flex py-1">
      <div className="flex animate-telemetry-marquee whitespace-nowrap">
        {feedContent}
        {feedContent}
      </div>
    </div>
  );
}

```

## File: `src/components/ModulesSection.tsx`

```typescript
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

```

## File: `src/components/OfflineGuard.tsx`

```typescript
"use client";

import { useEffect, useState } from "react";
import { audioManager } from "@/utils/audioManager";

export default function OfflineGuard({ children }: { children: React.ReactNode }) {
  const [isOffline, setIsOffline] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setIsOffline(!navigator.onLine);

    const handleOffline = () => {
      setIsOffline(true);
      audioManager.playAlert();
    };
    const handleOnline = () => {
      setIsOffline(false);
      audioManager.playClick();
    };

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  if (!isMounted) return <>{children}</>;

  return (
    <>
      {children}
      <div
        className="fixed inset-0 bg-[#121418] z-[9999] flex flex-col justify-center items-center select-none transition-all duration-[400ms] ease-out pointer-events-none"
        style={{
          opacity: isOffline ? 1 : 0,
          pointerEvents: isOffline ? "all" : "none",
        }}
      >
        {/* Dimmed 9-Node Logo */}
        <svg viewBox="0 0 400 400" className="w-24 h-24 opacity-25 select-none pointer-events-none mb-6">
          <g stroke="rgba(156, 163, 175, 0.2)" strokeWidth="1" fill="none">
            <line x1="50" y1="50" x2="350" y2="50" />
            <line x1="50" y1="200" x2="350" y2="200" />
            <line x1="50" y1="350" x2="350" y2="350" />
            <line x1="50" y1="50" x2="50" y2="350" />
            <line x1="200" y1="50" x2="200" y2="350" />
            <line x1="350" y1="50" x2="350" y2="350" />
          </g>
          <g stroke="rgba(156, 163, 175, 0.15)" strokeWidth="1">
            <line x1="200" y1="200" x2="200" y2="50" />
            <line x1="200" y1="200" x2="350" y2="50" />
            <line x1="200" y1="200" x2="350" y2="200" />
            <line x1="200" y1="200" x2="350" y2="350" />
            <line x1="200" y1="200" x2="200" y2="350" />
            <line x1="200" y1="200" x2="50" y2="350" />
            <line x1="200" y1="200" x2="50" y2="200" />
            <line x1="200" y1="200" x2="50" y2="50" />
          </g>
          <circle cx="200" cy="200" r="5" fill="#9CA3AF" />
          <circle cx="200" cy="50" r="4" fill="#9CA3AF" />
          <circle cx="350" cy="50" r="4" fill="#9CA3AF" />
          <circle cx="350" cy="200" r="4" fill="#9CA3AF" />
          <circle cx="350" cy="350" r="4" fill="#9CA3AF" />
          <circle cx="200" cy="350" r="4" fill="#9CA3AF" />
          <circle cx="50" cy="350" r="4" fill="#9CA3AF" />
          <circle cx="50" cy="200" r="4" fill="#9CA3AF" />
          <circle cx="50" cy="50" r="4" fill="#9CA3AF" />
        </svg>

        {/* Lava Red Pulsing Dot */}
        <div
          className="w-3.5 h-3.5 rounded-full mb-6 animate-pulse"
          style={{
            backgroundColor: "#FF3D00",
            boxShadow: "0 0 20px #FF3D00",
          }}
        />

        {/* Status Text Block */}
        <div className="text-center space-y-2.5 font-mono text-[10px] md:text-[11px] tracking-[0.18em] px-4">
          <div className="text-[#FF3D00] font-bold">
            [ NETWORK_LINK: SEVERED ] // [ EMERGENCY_STANDBY_MODE_ACTIVE ]
          </div>
          <div className="text-white/60 font-medium">
            ARTRON PORTAL REMAINS SECURED ON-DEVICE.
          </div>
        </div>
      </div>
    </>
  );
}

```

## File: `src/components/ScanLine.tsx`

```typescript
"use client";

interface ScanLineProps {
  trigger: number;
}

export default function ScanLine({ trigger }: ScanLineProps) {
  return (
    <div
      key={trigger}
      className="pointer-events-none fixed left-0 z-50 h-[2px] w-full bg-emerald-core shadow-[0_0_12px_#00E676] opacity-0 animate-laser"
    />
  );
}


```

## File: `src/components/SplitCoreDashboard.tsx`

```typescript
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { audioManager } from "@/utils/audioManager";
import InteractiveEnneaCore from "./InteractiveEnneaCore";
import DefaultNarrative from "./narratives/DefaultNarrative";
import FederationsNarrative from "./narratives/FederationsNarrative";
import ClubsBlueprintNarrative from "./narratives/ClubsBlueprintNarrative";
import ProfessionalsModulesNarrative from "./narratives/ProfessionalsModulesNarrative";
import MobileOSNarrative from "./narratives/MobileOSNarrative";
import GamificationNarrative from "./narratives/GamificationNarrative";
import MarketplaceNarrative from "./narratives/MarketplaceNarrative";
import AnalyticsNarrative from "./narratives/AnalyticsNarrative";
import SlaSecurityNarrative from "./narratives/SlaSecurityNarrative";
import AccessFormNarrative from "./narratives/AccessFormNarrative";
import CinematicLoginConsole from "./narratives/CinematicLoginConsole";
import SystemRegistryFooter from "./SystemRegistryFooter";
import GhostTrigger from "./GhostTrigger";
import ScanLine from "./ScanLine";
import LiveTelemetryFeed from "./LiveTelemetryFeed";


const GLOW_COLORS: Record<number, string> = {
  1: "#0F52BA", 2: "#00E676", 3: "#D97736", 4: "#00E676",
  5: "#D4AF37", 6: "#D97736", 7: "#9CA3AF", 8: "#9CA3AF", 9: "#00E676",
};

export default function SplitCoreDashboard() {
  const router = useRouter();
  const [activeNode, setActiveNode] = useState<number>(0);
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);
  const [scanTrigger, setScanTrigger] = useState<number>(0);
  const [accessTab, setAccessTab] = useState<"login" | "request" | "choice">("choice");
  const [isFlashActive, setIsFlashActive] = useState<boolean>(false);
  const [sweepTrigger, setSweepTrigger] = useState<number>(0);
  const [isFadeToBlack, setIsFadeToBlack] = useState<boolean>(false);
  const [transitionStep, setTransitionStep] = useState<"idle" | "zooming" | "sweeping" | "console">("idle");
  const [gateHover, setGateHover] = useState<"gate_a" | "gate_b" | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const currentDisplayNode = hoveredNode !== null ? hoveredNode : activeNode;

  useEffect(() => {
    setIsMuted(audioManager.isMuted());
    const unsubscribe = audioManager.subscribe((muted) => {
      setIsMuted(muted);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (transitionStep !== "idle") {
      audioManager.startHum();
    } else {
      audioManager.stopHum();
    }
    return () => {
      audioManager.stopHum();
    };
  }, [transitionStep]);

  useEffect(() => {
    if (activeNode === 9 && accessTab === "login") {
      if (transitionStep === "idle") {
        setTransitionStep("zooming");
        const t1 = setTimeout(() => {
          setTransitionStep("sweeping");
          setSweepTrigger((prev) => prev + 1);
          const t2 = setTimeout(() => {
            setTransitionStep("console");
          }, 1400);
          return () => clearTimeout(t2);
        }, 1000);
        return () => clearTimeout(t1);
      }
    } else if (activeNode !== 9) {
      setTransitionStep("idle");
      setAccessTab("choice");
    }
  }, [activeNode, accessTab]);

  const handleTriggerScan = () => setScanTrigger((prev) => prev + 1);

  const handleNodeSelect = (index: number) => {
    audioManager.playHapticClick();
    setActiveNode(index);
    if (index === 9) setAccessTab("choice");
  };

  const handleAccessTabChange = (tab: "login" | "request" | "choice") => {
    audioManager.playClick();
    setAccessTab(tab);
  };

  const renderLeftPanel = () => {
    switch (currentDisplayNode) {
      case 1: return <FederationsNarrative onBack={() => handleNodeSelect(0)} />;
      case 2: return <ClubsBlueprintNarrative onBack={() => handleNodeSelect(0)} />;
      case 3: return <ProfessionalsModulesNarrative onBack={() => handleNodeSelect(0)} />;
      case 4: return <MobileOSNarrative />;
      case 5: return <GamificationNarrative />;
      case 6: return <MarketplaceNarrative />;
      case 7: return <AnalyticsNarrative />;
      case 8: return <SlaSecurityNarrative />;
      case 9:
        return (
          <AccessFormNarrative
            onCancel={() => handleNodeSelect(0)}
            onSubmitting={handleTriggerScan}
            onTabChange={handleAccessTabChange}
            accessTab={accessTab}
            onHoverGate={setGateHover}
            onTriggerFlash={() => {
              setIsFlashActive(true);
              setTimeout(() => setIsFlashActive(false), 900);
            }}
          />
        );
      default: return <DefaultNarrative onRequestAccess={() => handleNodeSelect(9)} />;
    }
  };

  return (
    <div className={`relative h-screen w-screen max-h-screen max-w-screen overflow-hidden flex flex-col md:flex-row select-none transition-all duration-[1000ms] ease-expo-out box-border ${
      (transitionStep === "sweeping" || transitionStep === "console")
        ? "bg-black"
        : transitionStep === "zooming"
          ? "bg-[#090A0C]"
          : "bg-iron schematic-grid"
    }`}>
      {/* Floating Mute Control */}
      <button
        onClick={() => {
          audioManager.playClick();
          audioManager.toggleMute();
        }}
        className="fixed top-4 left-6 z-50 font-mono text-[9px] uppercase tracking-[0.2em] text-silver-structure/45 hover:text-white border border-silver-structure/10 hover:border-emerald-core/45 bg-iron-surface/40 hover:bg-iron-surface/90 px-3 py-1.5 rounded backdrop-blur-[6px] transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-[0_4px_12px_rgba(0,0,0,0.5)] group animate-fadeIn"
      >
        <div className={`audio-wave ${(!isMuted && transitionStep !== "idle") ? "playing" : ""}`}>
          <span className="audio-bar h-1.5" style={{ backgroundColor: isMuted ? "#9CA3AF" : "#00E676" }} />
          <span className="audio-bar h-2.5" style={{ backgroundColor: isMuted ? "#9CA3AF" : "#00E676" }} />
          <span className="audio-bar h-2" style={{ backgroundColor: isMuted ? "#9CA3AF" : "#00E676" }} />
        </div>
        <span>[ {isMuted ? "AUDIO_MUTED" : "AUDIO_ON"} ]</span>
      </button>

      <ScanLine trigger={scanTrigger} />
      <div className={`fade-to-black-overlay ${isFadeToBlack ? "active" : ""}`} />
      
      {transitionStep === "sweeping" && (
        <div key={`sweep-${sweepTrigger}`} className="radial-sweep-ring" />
      )}
      
      {transitionStep === "idle" && (
        <div className="absolute top-4 right-4 z-40 animate-fadeIn">
          <GhostTrigger onAccessClick={() => handleNodeSelect(9)} />
        </div>
      )}
      
      <div className={`h-full flex flex-col justify-center relative overflow-hidden transition-all duration-[1000ms] ease-expo-out bg-[#1A1D23]/55 box-border ${
        transitionStep !== "idle"
          ? "w-0 opacity-0 px-0 py-0 border-r-0 pointer-events-none"
          : "w-full md:w-[40%] px-8 md:px-12 py-16 border-r border-[rgba(156,163,175,0.12)] backdrop-blur-[24px]"
      }`}>
        <div className="max-w-sm mx-auto w-full">
          {transitionStep === "idle" && renderLeftPanel()}
        </div>
        
        {/* Live Telemetry Feed */}
        {transitionStep === "idle" && (
          <div className="absolute bottom-8 left-0 w-full px-8 md:px-12 pointer-events-none">
            <LiveTelemetryFeed />
          </div>
        )}
      </div>

      
      <div className={`flex-1 h-full flex flex-col items-center justify-center relative p-6 md:p-12 z-20 transition-all duration-[1000ms] ease-expo-out ${
        activeNode === 9 && accessTab === "request" ? "opacity-40" : ""
      }`}>
        <div
          className="absolute w-[450px] h-[450px] rounded-full blur-[120px] opacity-10 transition-all duration-1000 pointer-events-none z-0"
          style={{ backgroundColor: GLOW_COLORS[currentDisplayNode] || "transparent" }}
        />
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
          <InteractiveEnneaCore
            activeNode={activeNode}
            onNodeSelect={handleNodeSelect}
            onNodeHover={setHoveredNode}
            isScaledUp={transitionStep !== "idle"}
            transitionStep={transitionStep}
            isFlashActive={isFlashActive}
            gateHover={gateHover}
          />
          {transitionStep === "console" && (
            <div className="w-full max-w-lg mt-0 z-30">
              <CinematicLoginConsole
                onCancel={() => handleNodeSelect(0)}
                onSubmitting={handleTriggerScan}
                onFlashTrigger={() => {
                  setIsFlashActive(true);
                  setTimeout(() => setIsFlashActive(false), 800);
                }}
                onSuccessRedirect={(path) => router.push(path)}
                onSwitchToRequest={() => handleAccessTabChange("request")}
                onFadeToBlack={() => setIsFadeToBlack(true)}
              />
            </div>
          )}
        </div>
      </div>
      
      {transitionStep === "idle" && <SystemRegistryFooter />}
    </div>
  );
}


```

## File: `src/components/SystemRegistryFooter.tsx`

```typescript
"use client";

import Link from "next/link";

export default function SystemRegistryFooter() {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-[#1A1D23]/90 backdrop-blur-[15px] border-t border-silver-structure/10 select-none z-50 transform translate-y-[calc(100%-24px)] hover:translate-y-0 transition-transform duration-500 ease-out group">
      {/* Drawer Handle Header */}
      <div className="h-6 w-full flex items-center justify-center border-b border-silver-structure/5 bg-iron/40 cursor-pointer group-hover:bg-iron-surface transition-colors">
        <span className="font-mono text-[8px] uppercase tracking-[0.3em] text-silver-structure/45 group-hover:text-emerald-core transition-colors">
          [ SYSTEM REUSE REGISTRY — HOVER TO DECRYPT ]
        </span>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 p-6 md:p-8">
        {/* Block 01: Sovereign Registry */}
        <div className="space-y-3">
          <div className="font-mono text-[11px] text-emerald-core uppercase tracking-[0.2em]">[ SOVEREIGN_REGISTRY ]</div>
          <div className="space-y-1.5 font-sans text-[13px] text-silver-structure/80">
            <div><span className="text-silver-structure/50">[ CORPORATE_ENTITY ]:</span> ARTRON Consortium LLC</div>
            <div><span className="text-silver-structure/50">[ REGISTRY_CODE ]:</span> 405XXXXXX</div>
            <div>
              <span className="text-silver-structure/50">[ SYSTEM_PROTOCOLS ]:</span>{" "}
              <Link href="/sla" className="text-silver-structure/80 hover:text-emerald-core underline transition-colors">[ SLA ]</Link>{" "}
              <Link href="/privacy" className="text-silver-structure/80 hover:text-emerald-core underline transition-colors">[ PRIVACY ]</Link>
            </div>
            <div><span className="text-silver-structure/50">[ COMPLIANCE ]:</span> GDPR · ISO 27001</div>
          </div>
        </div>

        {/* Block 02: Communication Nodes */}
        <div className="space-y-3">
          <div className="font-mono text-[11px] text-emerald-core uppercase tracking-[0.2em]">[ COMMUNICATION_NODES ]</div>
          <div className="space-y-1.5 font-sans text-[13px] text-silver-structure/80">
            <div><span className="text-silver-structure/50">[ GENERAL ]:</span> office@artron.io</div>
            <div><span className="text-silver-structure/50">[ SECURITY ]:</span> security@artron.io</div>
            <div><span className="text-silver-structure/50">[ LEGAL ]:</span> legal@artron.io</div>
            <div><span className="text-silver-structure/50">[ DIRECT_ROUTE ]:</span> +995 (32) 2XX XX XX</div>
          </div>
        </div>

        {/* Block 03: Physical Hubs */}
        <div className="space-y-3">
          <div className="font-mono text-[11px] text-emerald-core uppercase tracking-[0.2em]">[ PHYSICAL_NODES ]</div>
          <div className="space-y-1.5 font-sans text-[13px] text-silver-structure/80">
            <div><span className="text-silver-structure/50">[ TBILISI_HUB ]:</span> 12 Merab Kostava St, Tbilisi</div>
            <div><span className="text-silver-structure/50">[ OPERATING_HOURS ]:</span> 09:00 — 18:00 (GMT+4)</div>
            <div className="flex gap-3 pt-1 text-silver-structure/70">
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-emerald-core hover:drop-shadow-[0_0_4px_#00E676] transition-all duration-300 ease-in-out">
                <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-emerald-core hover:drop-shadow-[0_0_4px_#00E676] transition-all duration-300 ease-in-out">
                <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.163c-.22.824-.867 1.47-1.69 1.69-1.498.403-7.5.807-7.5.807s-6.002-.404-7.5-.807c-.822-.22-1.47-.866-1.69-1.69-.403-1.498-.807-7.5-.807-7.5s.404-6.002.807-7.5c.22-.823.868-1.47 1.69-1.69 1.498-.403 7.5-.807 7.5-.807s6.002.404 7.5.807c.823.22 1.47.867 1.69 1.69.403 1.498.807 7.5.807 7.5s-.404 6.002-.807 7.5zm-14.498 9.837v-8l7 4-7 4z"/></svg>
              </a>
              <a href="https://x.com" target="_blank" rel="noreferrer" className="hover:text-emerald-core hover:drop-shadow-[0_0_4px_#00E676] transition-all duration-300 ease-in-out">
                <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-emerald-core hover:drop-shadow-[0_0_4px_#00E676] transition-all duration-300 ease-in-out">
                <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
              </a>
            </div>
          </div>
        </div>

        {/* Block 04: System Telemetry */}
        <div className="space-y-3">
          <div className="font-mono text-[11px] text-emerald-core uppercase tracking-[0.2em]">[ SYSTEM_TELEMETRY ]</div>
          <div className="space-y-1.5 font-sans text-[13px] text-silver-structure/80">
            <div className="flex items-center gap-1.5">
              <span className="text-silver-structure/50">[ CORE_STATUS ]:</span>
              <span className="inline-flex items-center gap-1.5 font-bold text-emerald-core">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-core opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-core"></span>
                </span>
                LIVE
              </span>
            </div>
            <div><span className="text-silver-structure/50">[ NEXT_AUDIT ]:</span> 2026-11-01</div>
            <div><span className="text-silver-structure/50">[ CRYPTO_KEY ]:</span> PGP_KEY_ACTIVE</div>
          </div>
        </div>
      </div>
    </footer>
  );
}

```

## File: `src/components/narratives/AccessFormNarrative.tsx`

```typescript
"use client";

import { useState } from "react";
import ProgressiveIntakeForm from "./ProgressiveIntakeForm";

interface AccessFormNarrativeProps {
  onCancel: () => void;
  onSubmitting?: () => void;
  onTabChange: (tab: "login" | "request" | "choice") => void;
  accessTab: "choice" | "login" | "request";
  onHoverGate: (gate: "gate_a" | "gate_b" | null) => void;
  onTriggerFlash: () => void;
}

export default function AccessFormNarrative({
  onCancel,
  onSubmitting,
  onTabChange,
  accessTab,
  onHoverGate,
  onTriggerFlash
}: AccessFormNarrativeProps) {
  const [isValidating, setIsValidating] = useState<boolean>(false);

  const handleIntakeComplete = () => {
    setIsValidating(true);
    if (onSubmitting) onSubmitting();
    onTriggerFlash();
  };

  if (isValidating) {
    return (
      <div className="font-mono text-[11px] text-emerald-core uppercase tracking-[0.16em] leading-relaxed p-4 bg-iron-surface/40 border border-emerald-core/30 rounded space-y-3.5 animate-fadeIn">
        <div>&gt;&gt; SYSTEM ENCRYPTION PROTOCOL [OK]</div>
        <div>&gt;&gt; DATA STREAMS CAPTURED</div>
        <div className="border-t border-emerald-core/10 my-2 pt-2 text-white font-bold leading-normal">
          APPLICATION LOCKED. DATA ENCRYPTED. SECURITY AUDIT IN PROGRESS...
        </div>
        <div className="text-emerald-core text-center pt-2 font-bold animate-pulse text-[11px]">
          [ ACCESS STATUS: UNDER REVIEW ]
        </div>
        <button
          onClick={() => {
            setIsValidating(false);
            onTabChange("choice");
          }}
          className="w-full mt-4 py-1.5 border border-emerald-core/35 hover:bg-emerald-core/10 text-white font-mono text-[10px] rounded cursor-pointer transition-all uppercase tracking-wider"
        >
          [ RESET INTEGRATION ]
        </button>
      </div>
    );
  }

  if (accessTab === "choice") {
    return (
      <div className="space-y-4 font-sans select-none animate-fadeIn">
        <div className="space-y-1">
          <div className="font-mono text-[11px] text-emerald-core uppercase tracking-[0.18em]">
            [ GATEWAY_DISPATCHER ]
          </div>
          <h2 className="text-lg font-bold tracking-tight text-white uppercase font-mono">
            SELECT ENTRY PATHWAY
          </h2>
        </div>

        <div className="flex flex-col gap-3">
          <div
            onMouseEnter={() => onHoverGate("gate_a")}
            onMouseLeave={() => onHoverGate(null)}
            onClick={() => {
              onHoverGate(null);
              onTabChange("login");
            }}
            className="border border-silver-structure/15 bg-iron-surface/30 hover:bg-emerald-core/5 hover:border-emerald-core/40 p-4 rounded cursor-pointer transition-all duration-300 group"
          >
            <div className="font-mono text-[10px] text-emerald-core/70 tracking-[0.16em] mb-0.5 group-hover:text-emerald-core transition-colors">
              GATE_A // CORE GATEWAY
            </div>
            <h3 className="font-mono text-[12px] font-bold text-white uppercase tracking-[0.12em] group-hover:translate-x-1 transition-transform">
              ENTER THE CORE
            </h3>
            <p className="text-[10.5px] text-silver-structure/70 mt-1 leading-snug font-sans tracking-normal">
              Secure credentials verification portal for registered entities.
            </p>
          </div>

          <div
            onMouseEnter={() => onHoverGate("gate_b")}
            onMouseLeave={() => onHoverGate(null)}
            onClick={() => onTabChange("request")}
            className="border border-silver-structure/15 bg-iron-surface/30 hover:bg-emerald-core/5 hover:border-emerald-core/40 p-4 rounded cursor-pointer transition-all duration-300 group"
          >
            <div className="font-mono text-[10px] text-emerald-core/70 tracking-[0.16em] mb-0.5 group-hover:text-emerald-core transition-colors">
              GATE_B // REGISTRY INTAKE
            </div>
            <h3 className="font-mono text-[12px] font-bold text-white uppercase tracking-[0.12em] group-hover:translate-x-1 transition-transform">
              INITIATE INTEGRATION
            </h3>
            <p className="text-[10.5px] text-silver-structure/70 mt-1 leading-snug font-sans tracking-normal">
              Begin 3-step vetting workflow for new federation or club profiles.
            </p>
          </div>
        </div>

        <button
          onClick={onCancel}
          className="w-full py-1.5 text-center font-mono text-[11px] text-silver-structure hover:text-white transition-colors cursor-pointer"
        >
          &larr; CANCEL PROTOCOL
        </button>
      </div>
    );
  }

  return (
    <ProgressiveIntakeForm
      onCancel={() => onTabChange("choice")}
      onSubmitComplete={handleIntakeComplete}
    />
  );
}

```

## File: `src/components/narratives/AnalyticsNarrative.tsx`

```typescript
"use client";

export default function AnalyticsNarrative() {
  return (
    <div className="space-y-4 font-sans select-none animate-fadeIn">
      <div className="space-y-1">
        <div className="font-mono text-[12px] text-silver-structure/70 uppercase tracking-[0.15em]">
          [ NODE_07 // GLOBAL_TELEMETRY ]
        </div>
        <h2 className="text-xl font-bold tracking-tight text-white uppercase">
          ANALYTICS & METRICS
        </h2>
      </div>

      {/* Analytics Chart SVG */}
      <div className="bg-iron-surface/40 border border-silver-structure/10 p-4 rounded flex justify-center">
        <svg viewBox="0 0 200 160" className="w-full max-w-[200px] stroke-silver-structure/20 stroke-[1] fill-none">
          {/* Grid lines */}
          <line x1="20" y1="20" x2="20" y2="140" />
          <line x1="20" y1="140" x2="180" y2="140" />
          <line x1="20" y1="60" x2="180" y2="60" className="stroke-silver-structure/5" />
          <line x1="20" y1="100" x2="180" y2="100" className="stroke-silver-structure/5" />

          {/* Chart Spline line */}
          <path
            d="M 20 120 Q 50 110 70 80 T 120 90 T 150 40 T 180 30"
            className="stroke-silver-structure/70"
            strokeWidth="1.5"
          />

          {/* Glowing node point */}
          <circle cx="150" cy="40" r="3" className="fill-emerald-core" />
          <circle cx="150" cy="40" r="6" className="stroke-emerald-core/30 animate-pulse" />
          
          <text x="110" y="32" className="fill-silver-structure/50 font-mono text-[5px] stroke-none">PEAK_LOAD: 98.4%</text>
        </svg>
      </div>

      <p className="text-[15px] text-bone-light/85 leading-relaxed font-sans">
        სისტემის გლობალური რეესტრი და ანალიტიკა. სერვერების დატვირთვის, მოთხოვნების სიხშირისა და API პასუხების სიჩქარის მონიტორინგი რეალურ დროში.
      </p>
    </div>
  );
}

```

## File: `src/components/narratives/CinematicLoginConsole.tsx`

```typescript
"use client";

import { useState } from "react";

interface CinematicLoginConsoleProps {
  onCancel: () => void;
  onSubmitting: () => void;
  onFlashTrigger: () => void;
  onSuccessRedirect: (path: string) => void;
  onSwitchToRequest: () => void;
  onFadeToBlack: () => void;
}

export default function CinematicLoginConsole({
  onCancel,
  onSubmitting,
  onFlashTrigger,
  onSuccessRedirect,
  onFadeToBlack
}: CinematicLoginConsoleProps) {
  const [artronId, setArtronId] = useState("");
  const [accessCode, setAccessCode] = useState("");
  const [status, setStatus] = useState<"idle" | "verifying" | "done">("idle");
  const [logStep, setLogStep] = useState(0);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!/^A-\d{5}$/.test(artronId.toUpperCase())) {
      setError("INVALID ID. REQUIRED FORMAT: A-XXXXX");
      return;
    }
    if (!accessCode) {
      setError("ACCESS CODE REQUIRED");
      return;
    }

    setStatus("verifying");
    onSubmitting();
    onFlashTrigger();

    setTimeout(() => setLogStep(1), 450);
    setTimeout(() => setLogStep(2), 900);
    setTimeout(() => {
      setLogStep(3);
      onFadeToBlack();
    }, 1350);

    setTimeout(() => {
      setStatus("done");
      const digit = parseInt(artronId.replace(/\D/g, "")) || 0;
      onSuccessRedirect(digit % 2 !== 0 ? "/federation/dashboard" : "/club/control");
    }, 2200);
  };

  return (
    <div className="space-y-4 max-w-sm mx-auto text-center font-mono">
      {status === "idle" ? (
        <div className="space-y-5 animate-fadeIn">
          <div className="space-y-1.5 mt-2">
            <h1 className="text-white text-[24px] md:text-[28px] font-extrabold uppercase font-sans tracking-tight leading-none">
              WELCOME BACK TO THE CORE.
            </h1>
            <div className="text-silver-structure/70 text-[9px] uppercase tracking-[0.16em]">
              [ INITIALIZING SECURE GATEWAY HANDSHAKE... ]
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="text-ruby font-bold uppercase text-[10px] tracking-wider">&gt; {error}</div>}
            
            <div className="py-0.5">
              <input
                type="text"
                required
                value={artronId}
                onChange={(e) => setArtronId(e.target.value)}
                className="line-input-centered uppercase"
                placeholder="ENTER ARTRON ID"
              />
            </div>
            
            <div className="py-0.5">
              <input
                type="password"
                required
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                className="line-input-centered"
                placeholder="ENTER ACCESS CODE"
              />
            </div>
            
            <div className="flex flex-col gap-3 pt-2">
              <button
                type="submit"
                className="w-full py-2.5 bg-black hover:bg-emerald-core/10 border border-emerald-core/40 hover:border-emerald-core text-emerald-core font-bold uppercase rounded cursor-pointer transition-all duration-300 text-[10px] tracking-[0.18em] shadow-[0_0_15px_rgba(0,230,118,0.05)] hover:shadow-[0_0_20px_rgba(0,230,118,0.15)]"
              >
                [ SECURE CONNECTION // ACTIVATE NODE ]
              </button>
              <button
                type="button"
                onClick={onCancel}
                className="text-silver-structure/50 hover:text-white transition-colors cursor-pointer text-[9px] tracking-widest"
              >
                ← CANCEL GATEWAY
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="py-8 animate-fadeIn space-y-3">
          <div className="text-silver-structure/40 text-[9px] uppercase tracking-[0.16em] animate-pulse">
            [ PERFORMING SECURE CONNECTION HANDSHAKE ]
          </div>
          <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-emerald-core leading-relaxed px-4 min-h-[24px]">
            {logStep >= 1 && "GEO_NODE_ACTIVE"}
            {logStep >= 2 && " // GATEWAY_KEY_VALIDATED"}
            {logStep >= 3 && " // SYNCHRONIZING TELEMETRY..."}
            {logStep < 3 && (
              <span className="inline-block w-1.5 h-3 bg-emerald-core ml-1 animate-blink align-middle"></span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

```

## File: `src/components/narratives/ClubsBlueprintNarrative.tsx`

```typescript
"use client";

import { useState } from "react";

interface NodeData {
  id: string;
  name: string;
  type: string;
  status: string;
  color: string;
  desc: string;
  cx: number;
  cy: number;
}

interface ClubsBlueprintNarrativeProps {
  onBack: () => void;
}

export default function ClubsBlueprintNarrative({ onBack }: ClubsBlueprintNarrativeProps) {
  const nodes: NodeData[] = [
    {
      id: "gate_1",
      name: "RFID_TURNSTILE_01",
      type: "ACCESS_CONTROL",
      status: "SECURE_ACTIVE",
      color: "text-emerald-core bg-emerald-core/10 border-emerald-core/30",
      desc: "შესასვლელი ბარიერი RFID წამკითხველით.",
      cx: 50,
      cy: 160,
    },
    {
      id: "biom_1",
      name: "BIOMETRIC_SCANNER_02",
      type: "CLINICAL_TELEMETRY",
      status: "READY_ACTIVE",
      color: "text-copper bg-copper/10 border-copper/30",
      desc: "თითის ანაბეჭდისა და ბიომეტრიული სკანირების წერტილი.",
      cx: 185,
      cy: 140,
    },
    {
      id: "dashboard",
      name: "CENTRAL_GATEWAY_HQ",
      type: "ADMIN_CONSOLE",
      status: "CORE_READY",
      color: "text-sapphire bg-sapphire/10 border-sapphire/30",
      desc: "ცენტრალური მართვის კონსოლი.",
      cx: 170,
      cy: 60,
    },
    {
      id: "premium_pos",
      name: "MARKETPLACE_POS_04",
      type: "FINANCIAL_NODE",
      status: "CONNECTED",
      color: "text-gold-raw bg-gold-raw/10 border-gold-raw/30",
      desc: "კლუბური მაღაზიისა და სერვისების გაყიდვის ტერმინალი.",
      cx: 310,
      cy: 60,
    },
  ];

  const [selectedNode, setSelectedNode] = useState<NodeData>(nodes[0]);
  const [hoveredNode, setHoveredNode] = useState<NodeData | null>(null);

  return (
    <div className="space-y-4 font-sans select-none animate-fadeIn">
      <div className="space-y-1">
        <div className="font-mono text-[12px] text-gold-raw uppercase tracking-[0.15em]">
          [ NODE_02 // CLUB_DIGITAL_TWIN ]
        </div>
        <h2 className="text-xl font-bold tracking-tight text-white uppercase">
          FACILITY BLUEPRINT
        </h2>
      </div>

      {/* Blueprint SVG Container */}
      <div className="bg-iron-surface/40 border border-silver-structure/10 p-2 rounded relative flex justify-center">
        <svg viewBox="0 0 380 200" strokeWidth="0.8" className="w-full stroke-silver-structure/25 fill-none">
          <rect x="5" y="5" width="370" height="190" rx="3" />
          <line x1="110" y1="5" x2="110" y2="195" />
          <line x1="110" y1="100" x2="260" y2="100" />
          <line x1="260" y1="5" x2="260" y2="195" />
          <line x1="110" y1="60" x2="5" y2="60" />
          <line x1="110" y1="130" x2="5" y2="130" />

          {/* Connected Lines */}
          <path d="M50 160 L170 60 M170 60 L185 140 M185 140 L310 60" className="stroke-emerald-core/10 stroke-[1] stroke-dasharray-[3_3] fill-none" />

          {/* Node SVG circles mapped */}
          {nodes.map((node) => {
            const isSelected = selectedNode.id === node.id;
            const strokeColor = node.id === "gate_1" ? "stroke-emerald-core" :
                                node.id === "biom_1" ? "stroke-copper" :
                                node.id === "dashboard" ? "stroke-sapphire-light" :
                                "stroke-gold-raw";
            const glowColor = node.id === "gate_1" ? "fill-emerald-core/5 stroke-emerald-core/30" :
                              node.id === "biom_1" ? "fill-copper/5 stroke-copper/30" :
                              node.id === "dashboard" ? "fill-sapphire-light/5 stroke-sapphire-light/30" :
                              "fill-gold-raw/5 stroke-gold-raw/30";
            return (
              <g key={node.id}>
                {/* Glow ring */}
                <circle
                  cx={node.cx}
                  cy={node.cy}
                  r={node.id === "dashboard" ? 15 : 12}
                  className={`pointer-events-none stroke-[1] animate-pulse ${glowColor}`}
                />
                {/* Clickable/hoverable Node */}
                <circle
                  cx={node.cx}
                  cy={node.cy}
                  r={node.id === "dashboard" ? 9 : 7}
                  onClick={() => setSelectedNode(node)}
                  onMouseEnter={() => setHoveredNode(node)}
                  onMouseLeave={() => setHoveredNode(null)}
                  className={`cursor-pointer fill-iron stroke-[1.5] ${strokeColor} ${isSelected ? "animate-pulse" : ""}`}
                />
              </g>
            );
          })}
        </svg>

        {/* Floating Tooltip */}
        {hoveredNode && (
          <div
            className="absolute bg-[#1A1D23]/95 border border-silver-structure/20 backdrop-blur-[8px] px-3 py-1.5 rounded-[4px] font-mono text-[9px] text-white shadow-[0_4px_12px_rgba(0,0,0,0.55)] pointer-events-none transform -translate-x-1/2 -translate-y-full mb-3 z-30 transition-opacity duration-200"
            style={{
              left: `${(hoveredNode.cx / 380) * 100}%`,
              top: `${(hoveredNode.cy / 200) * 100}%`,
            }}
          >
            <div className="text-emerald-core font-bold text-[10px]">[ DEVICE: {hoveredNode.name} ]</div>
            <div className="text-silver-structure/70 mt-0.5">// [ STATUS: {hoveredNode.status} ]</div>
          </div>
        )}
      </div>

      {/* Telemetry card */}
      <div className="bg-iron/80 border border-silver-structure/10 p-3 rounded font-mono text-[12px] tracking-[0.15em] space-y-2">
        <div className="text-silver-structure/45 uppercase tracking-wider">[ TELEMETRY_FEED ]</div>
        <div className="flex justify-between items-baseline">
          <span className="text-white font-bold text-[13px]">{selectedNode.name}</span>
          <span className={`inline-block px-1.5 py-0.5 border rounded-[3px] text-[10px] ${selectedNode.color}`}>
            {selectedNode.status}
          </span>
        </div>
        <p className="text-bone-light/85 font-sans leading-relaxed text-[13px] tracking-normal">
          {selectedNode.desc}
        </p>
      </div>

      <div>
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

```

## File: `src/components/narratives/DefaultNarrative.tsx`

```typescript
"use client";

import ArtronLogo from "../ArtronLogo";

interface DefaultNarrativeProps {
  onRequestAccess: () => void;
}

export default function DefaultNarrative({ onRequestAccess }: DefaultNarrativeProps) {
  return (
    <div className="space-y-6 font-sans select-none animate-fadeIn">
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <ArtronLogo className="w-8 h-8" />
          <div className="font-mono text-[12px] text-emerald-core uppercase tracking-[0.15em]">
            [ SYSTEM // CORE_INIT ]
          </div>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white uppercase leading-none">
          ARTRON<br />
          SPORTS OS
        </h1>
        <p className="text-xs text-silver-structure/50 font-mono tracking-wider">
          სისტემური თვითორგანიზების პრინციპი.
        </p>
      </div>

      <div className="h-[1px] bg-silver-structure/10 w-full" />

      <p className="text-[15px] text-bone-light/85 leading-relaxed font-sans">
        ართრონი არ არის უბრალოდ პლატფორმა. ეს არის სპორტული სექტორის ლიდერების (ფედერაციების, კლუბებისა და პროფესიონალების) ოპერაციული სისტემა. მართვა ხორციელდება ცენტრალური 9-კვანძიანი Ennea Core ბირთვის მეშვეობით.
      </p>

      <div className="pt-4">
        <button
          onClick={onRequestAccess}
          className="font-mono text-xs text-iron bg-emerald-core hover:bg-[#00F580] px-5 py-3 border border-emerald-core/80 rounded uppercase font-bold tracking-widest transition-all w-full text-center shadow-[0_0_15px_rgba(0,230,118,0.35),_inset_0_1px_0_rgba(255,255,255,0.3)] hover:shadow-[0_0_25px_rgba(0,230,118,0.5),_inset_0_1px_0_rgba(255,255,255,0.45)] cursor-pointer"
        >
          REQUEST SYSTEM ACCESS
        </button>
      </div>
    </div>
  );
}

```

## File: `src/components/narratives/FederationsNarrative.tsx`

```typescript
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

```

## File: `src/components/narratives/GamificationNarrative.tsx`

```typescript
"use client";

import { useState } from "react";

interface HoveredItem {
  name: string;
  status: string;
  x: number;
  y: number;
}

export default function GamificationNarrative() {
  const [hoveredItem, setHoveredItem] = useState<HoveredItem | null>(null);

  return (
    <div className="space-y-4 font-sans select-none animate-fadeIn">
      <div className="space-y-1">
        <div className="font-mono text-[12px] text-gold-raw uppercase tracking-[0.15em]">
          [ NODE_05 // GAMIFICATION_ENGINE ]
        </div>
        <h2 className="text-xl font-bold tracking-tight text-white uppercase">
          COINS & ACHIEVEMENTS
        </h2>
      </div>

      {/* Gamification Badge SVG */}
      <div className="bg-iron-surface/40 border border-silver-structure/10 p-4 rounded flex justify-center group/coin [perspective:1000px]">
        <div className="w-full max-w-[200px] transition-transform duration-700 ease-out group-hover/coin:[transform:rotateY(25deg)_rotateX(8deg)] [transform-style:preserve-3d] relative">
          <svg viewBox="0 0 200 160" className="w-full stroke-silver-structure/20 stroke-[1] fill-none">
            {/* Gold Coin Group */}
            <g
              className="cursor-pointer"
              onMouseEnter={() => setHoveredItem({
                name: "COIN_DISPENSER_05",
                status: "SECURE_ACTIVE",
                x: 65,
                y: 80
              })}
              onMouseLeave={() => setHoveredItem(null)}
            >
              {/* Gold Coin Vector */}
              <circle cx="65" cy="80" r="28" className="stroke-gold-raw hover:stroke-gold-raw/80 transition-colors" strokeWidth="1.5" />
              <circle cx="65" cy="80" r="20" className="stroke-gold-raw/40" />
              <text x="60" y="85" className="fill-gold-raw font-mono text-[14px] font-bold stroke-none">A</text>
            </g>

            {/* Achievement Badge Hexagon Group */}
            <g
              className="cursor-pointer"
              onMouseEnter={() => setHoveredItem({
                name: "BADGE_CREATION_UNIT",
                status: "PROVISIONED",
                x: 135,
                y: 82.5
              })}
              onMouseLeave={() => setHoveredItem(null)}
            >
              {/* Achievement Badge Hexagon */}
              <polygon
                points="135,55 160,70 160,95 135,110 110,95 110,70"
                className="stroke-gold-raw hover:stroke-gold-raw/80 transition-colors"
                strokeWidth="1.5"
              />
              <polygon
                points="135,62 153,73 153,92 135,103 117,92 117,73"
                className="stroke-gold-raw/30"
              />
              {/* Star in badge */}
              <polygon
                points="135,73 138,81 146,81 140,86 142,94 135,89 128,94 130,86 124,81 132,81"
                className="fill-gold-raw stroke-none"
              />
            </g>
          </svg>

          {/* Floating Tooltip */}
          {hoveredItem && (
            <div
              className="absolute bg-[#1A1D23]/95 border border-silver-structure/20 backdrop-blur-[8px] px-3 py-1.5 rounded-[4px] font-mono text-[9px] text-white shadow-[0_4px_12px_rgba(0,0,0,0.55)] pointer-events-none transform -translate-x-1/2 -translate-y-full mb-3 z-30 transition-opacity duration-200 [transform-style:flat]"
              style={{
                left: `${(hoveredItem.x / 200) * 100}%`,
                top: `${(hoveredItem.y / 160) * 100}%`,
              }}
            >
              <div className="text-gold-raw font-bold text-[10px]">[ DEVICE: {hoveredItem.name} ]</div>
              <div className="text-silver-structure/70 mt-0.5">// [ STATUS: {hoveredItem.status} ]</div>
            </div>
          )}
        </div>
      </div>

      <p className="text-[15px] text-bone-light/85 leading-relaxed font-sans">
        ათლეტების წახალისების გეიმიფიცირებული სისტემა. Artron Coin-ები და ციფრული ბეიჯები, რომლებიც გაიცემა მიღწეული შედეგებისა და დასწრების აქტივობებისთვის.
      </p>
    </div>
  );
}

```

## File: `src/components/narratives/MarketplaceNarrative.tsx`

```typescript
"use client";

export default function MarketplaceNarrative() {
  return (
    <div className="space-y-4 font-sans select-none animate-fadeIn">
      <div className="space-y-1">
        <div className="font-mono text-[12px] text-gold-raw uppercase tracking-[0.15em]">
          [ NODE_06 // MODULE_MARKETPLACE ]
        </div>
        <h2 className="text-xl font-bold tracking-tight text-white uppercase">
          SYSTEM MARKETPLACE
        </h2>
      </div>

      {/* Marketplace modular boxes SVG */}
      <div className="bg-iron-surface/40 border border-silver-structure/10 p-4 rounded flex justify-center">
        <svg viewBox="0 0 200 160" className="w-full max-w-[200px] stroke-silver-structure/20 stroke-[1] fill-none">
          {/* Module 1 */}
          <rect x="25" y="30" width="60" height="40" rx="3" className="stroke-gold-raw/80" strokeWidth="1.2" />
          <text x="32" y="45" className="fill-gold-raw font-mono text-[5px] stroke-none">[ MOD_SCHEDULING ]</text>
          <line x1="85" y1="50" x2="115" y2="50" className="stroke-gold-raw/30 stroke-dasharray-[2_2]" />

          {/* Module 2 */}
          <rect x="115" y="30" width="60" height="40" rx="3" className="stroke-gold-raw/80" strokeWidth="1.2" />
          <text x="122" y="45" className="fill-gold-raw font-mono text-[5px] stroke-none">[ MOD_FINANCIAL ]</text>

          {/* Module 3 */}
          <rect x="70" y="95" width="60" height="40" rx="3" className="stroke-gold-raw/85" strokeWidth="1.5" />
          <text x="77" y="110" className="fill-gold-raw font-mono text-[5px] stroke-none">[ CORE_TELEMETRY ]</text>
          
          {/* Pin connections */}
          <circle cx="85" cy="50" r="2.5" className="fill-gold-raw" />
          <circle cx="115" cy="50" r="2.5" className="fill-gold-raw" />
          <path d="M55 70 L100 95" className="stroke-gold-raw/30 stroke-dasharray-[2_2]" />
          <path d="M145 70 L100 95" className="stroke-gold-raw/30 stroke-dasharray-[2_2]" />
        </svg>
      </div>

      <p className="text-[15px] text-bone-light/85 leading-relaxed font-sans">
        დამატებითი ფუნქციონალური მოდულების მაღაზია. მყისიერი ინტეგრაცია (Plug-and-Play) საინსტიტუციო განრიგებისთვის, ონლაინ გადახდებისთვის და უსაფრთხოების კარიბჭეებისთვის.
      </p>
    </div>
  );
}

```

## File: `src/components/narratives/MobileOSNarrative.tsx`

```typescript
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

```

## File: `src/components/narratives/ProfessionalsModulesNarrative.tsx`

```typescript
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


```

## File: `src/components/narratives/ProgressiveIntakeForm.tsx`

```typescript
"use client";

import { useState } from "react";
import { audioManager } from "@/utils/audioManager";

interface ProgressiveIntakeFormProps {
  onCancel: () => void;
  onSubmitComplete: () => void;
}

export default function ProgressiveIntakeForm({
  onCancel,
  onSubmitComplete
}: ProgressiveIntakeFormProps) {
  const [step, setStep] = useState<number>(1);
  const [entityType, setEntityType] = useState("Sovereign Federation");
  const [athletes, setAthletes] = useState("");
  const [trainers, setTrainers] = useState("");
  const [region, setRegion] = useState("");
  const [scheduling, setScheduling] = useState(false);
  const [sla, setSla] = useState(false);
  const [gamification, setGamification] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    audioManager.playClick();
    if (step < 3) setStep((prev) => prev + 1);
    else onSubmitComplete();
  };

  const handleBack = () => {
    audioManager.playClick();
    if (step > 1) setStep((prev) => prev - 1);
    else onCancel();
  };

  return (
    <div className="space-y-3.5 animate-fadeIn text-[11px] font-mono tracking-[0.16em]">
      <div className="flex justify-between items-center border-b border-silver-structure/10 pb-1.5">
        <span className="text-emerald-core uppercase tracking-[0.12em]">STEP {step} OF 3</span>
        <div className="flex gap-1">
          {[1, 2, 3].map((s) => (
            <div key={s} className={`w-1.5 h-1.5 rounded-full ${s <= step ? "bg-emerald-core" : "bg-silver-structure/20"}`} />
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        {step === 1 && (
          <div>
            <label className="block text-emerald-core mb-1">ENTITY TYPE:</label>
            <select
              value={entityType}
              onChange={(e) => {
                audioManager.playClick();
                setEntityType(e.target.value);
              }}
              className="w-full bg-iron-surface border border-silver-structure/25 focus:border-emerald-core py-1 px-2 rounded text-white outline-none cursor-pointer text-[11px]"
            >
              <option value="Sovereign Federation">Sovereign Federation (ფედერაცია)</option>
              <option value="Sports Club / Academy">Sports Club / Academy (კლუბი / აკადემია)</option>
              <option value="Licensed Coach / Professional">Licensed Coach / Professional (ტრენერი/მედიკოსი)</option>
            </select>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-2">
            <div>
              <label className="block text-emerald-core mb-0.5">ACTIVE ATHLETES / ათლეტები:</label>
              <input
                type="number" required value={athletes} onChange={(e) => setAthletes(e.target.value)}
                className="w-full bg-iron-surface border border-silver-structure/25 focus:border-emerald-core py-1 px-2 rounded text-white outline-none text-[11px]"
                placeholder="e.g. 250"
              />
            </div>
            <div>
              <label className="block text-emerald-core mb-0.5">TRAINERS COUNT / ტრენერები:</label>
              <input
                type="number" required value={trainers} onChange={(e) => setTrainers(e.target.value)}
                className="w-full bg-iron-surface border border-silver-structure/25 focus:border-emerald-core py-1 px-2 rounded text-white outline-none text-[11px]"
                placeholder="e.g. 15"
              />
            </div>
            <div>
              <label className="block text-emerald-core mb-0.5">REGION / რეგიონი:</label>
              <input
                type="text" required value={region} onChange={(e) => setRegion(e.target.value)}
                className="w-full bg-iron-surface border border-silver-structure/25 focus:border-emerald-core py-1 px-2 rounded text-white outline-none text-[11px]"
                placeholder="e.g. Tbilisi, Georgia"
              />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-2.5">
            <div className="text-silver-structure/70 font-sans tracking-normal text-[11px] mb-1">
              Select priority integration modules:
            </div>
            <div className="space-y-2 font-sans tracking-normal">
              {[
                { id: "sched", label: "Scheduling (განრიგები)", val: scheduling, set: setScheduling },
                { id: "sla", label: "SLA & Security (იურიდიული)", val: sla, set: setSla },
                { id: "game", label: "Gamification & Coins (გეიმიფიკაცია)", val: gamification, set: setGamification }
              ].map((item) => (
                <label key={item.id} className="flex items-center gap-2 cursor-pointer text-white">
                  <input
                    type="checkbox"
                    checked={item.val}
                    onChange={(e) => {
                      audioManager.playClick();
                      item.set(e.target.checked);
                    }}
                    className="accent-emerald-core w-4 h-4 animate-fadeIn"
                  />
                  <span className="text-[11.5px] uppercase tracking-wider font-mono">{item.label}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-2 pt-2.5 items-center">
          <button
            type="submit"
            className="flex-1 py-1.5 bg-emerald-core/10 border border-emerald-core/30 text-emerald-core hover:border-emerald-core hover:bg-emerald-core/20 font-bold uppercase rounded cursor-pointer transition-colors text-[10.5px]"
          >
            {step < 3 ? "CONTINUE PROTOCOL" : "SUBMIT INTEGRATION PROTOCOL"}
          </button>
          <button
            type="button" onClick={handleBack}
            className="px-2 py-1 text-silver-structure hover:text-white transition-colors cursor-pointer text-[10.5px] font-mono"
          >
            {step > 1 ? "← BACK" : "← CANCEL"}
          </button>
        </div>
      </form>
    </div>
  );
}


```

## File: `src/components/narratives/RequestAccessForm.tsx`

```typescript
"use client";

import { useState } from "react";

interface RequestAccessFormProps {
  onCancel: () => void;
  onSubmitting: () => void;
}

export default function RequestAccessForm({ onCancel, onSubmitting }: RequestAccessFormProps) {
  const [entityType, setEntityType] = useState("Sovereign Federation");
  const [entityName, setEntityName] = useState("");
  const [registryCode, setRegistryCode] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "done">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!entityName || !registryCode || !email) return;

    setStatus("submitting");
    onSubmitting(); // Trigger scanline animation!

    setTimeout(() => {
      setStatus("done");
    }, 2000);
  };

  return (
    <div className="space-y-3">
      {status === "idle" ? (
        <form onSubmit={handleSubmit} className="space-y-2 font-mono text-[11px] tracking-[0.16em]">
          <div>
            <label className="block text-emerald-core mb-0.5 uppercase">ENTITY TYPE:</label>
            <select
              value={entityType}
              onChange={(e) => setEntityType(e.target.value)}
              className="w-full bg-iron-surface border border-silver-structure/20 focus:border-emerald-core py-1 px-2 rounded text-white outline-none tracking-normal cursor-pointer text-[11px]"
            >
              <option value="Sovereign Federation">Sovereign Federation (ფედერაცია)</option>
              <option value="Sports Club / Academy">Sports Club / Academy (კლუბი / აკადემია)</option>
              <option value="Licensed Professional">Licensed Professional (ლიცენზირებული სპეციალისტი)</option>
            </select>
          </div>
          <div>
            <label className="block text-emerald-core mb-0.5 uppercase">ENTITY NAME:</label>
            <input
              type="text"
              required
              value={entityName}
              onChange={(e) => setEntityName(e.target.value)}
              className="w-full bg-iron-surface border border-silver-structure/20 focus:border-emerald-core py-1 px-2 rounded text-white outline-none tracking-normal text-[11px]"
              placeholder="e.g. OLYMPIC CENTER"
            />
          </div>
          <div>
            <label className="block text-emerald-core mb-0.5 uppercase">OFFICIAL REGISTRY CODE:</label>
            <input
              type="text"
              required
              value={registryCode}
              onChange={(e) => setRegistryCode(e.target.value)}
              className="w-full bg-iron-surface border border-silver-structure/20 focus:border-emerald-core py-1 px-2 rounded text-white outline-none tracking-normal text-[11px]"
              placeholder="e.g. RC-948271"
            />
          </div>
          <div>
            <label className="block text-emerald-core mb-0.5 uppercase">SECURE COMMUNICATION ROUTE:</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-iron-surface border border-silver-structure/20 focus:border-emerald-core py-1 px-2 rounded text-white outline-none tracking-normal text-[11px]"
              placeholder="e.g. contact@olympic.org"
            />
          </div>
          <div className="flex gap-2 pt-1 items-center">
            <button
              type="submit"
              className="flex-1 py-1.5 bg-emerald-core/10 border border-emerald-core/30 text-emerald-core hover:border-emerald-core hover:bg-emerald-core/20 font-bold uppercase rounded cursor-pointer transition-colors text-[11px]"
            >
              SUBMIT SECURE PROTOCOL
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="px-2 py-1 font-mono text-[11px] text-silver-structure hover:text-white transition-colors cursor-pointer"
            >
              ← Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="bg-iron-surface border border-silver-structure/20 p-4 rounded font-mono text-[12px] tracking-[0.18em] space-y-3">
          {status === "submitting" ? (
            <div className="space-y-2">
              <div className="text-emerald-core animate-pulse">
                &gt; SYSTEM ANALYSIS IN PROGRESS...
              </div>
              <div className="text-copper animate-pulse">
                [ QUEUING CREDENTIALS FOR VALIDATION ]
              </div>
              <span className="inline-block w-1.5 h-3 bg-emerald-core ml-1 animate-blink"></span>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="text-gold-raw font-bold uppercase">
                [ YOUR CREDENTIALS ARE BEING QUEUED FOR CORE VALIDATION ]
              </div>
              <div className="text-ruby font-bold uppercase">
                [ ACCESS STATUS: UNDER REVIEW ]
              </div>
              <p className="text-[15px] text-bone-light/85 font-sans leading-relaxed tracking-normal">
                ართრონის ადმინისტრაცია გადაამოწმებს წარდგენილ ორგანიზაციულ მონაცემებს და დაგიკავშირდებათ მითითებულ ელ-ფოსტაზე.
              </p>
              <div className="pt-2">
                <button
                  onClick={onCancel}
                  className="font-mono text-[12px] text-silver-structure hover:text-white transition-colors cursor-pointer"
                >
                  ← Return to Core
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

```

## File: `src/components/narratives/SlaSecurityNarrative.tsx`

```typescript
"use client";

import Link from "next/link";

export default function SlaSecurityNarrative() {
  return (
    <div className="space-y-4 font-sans select-none animate-fadeIn">
      <div className="space-y-1">
        <div className="font-mono text-[12px] text-silver-structure/70 uppercase tracking-[0.15em]">
          [ NODE_08 // COMPLIANCE_AND_SECURITY ]
        </div>
        <h2 className="text-xl font-bold tracking-tight text-white uppercase">
          SECURITY & PRIVACY
        </h2>
      </div>

      {/* Shield Vector SVG */}
      <div className="bg-iron-surface/40 border border-silver-structure/10 p-4 rounded flex justify-center">
        <svg viewBox="0 0 200 160" className="w-full max-w-[200px] stroke-silver-structure/20 stroke-[1.2] fill-none">
          {/* Shield outline */}
          <path d="M100 25 C130 25, 155 35, 155 35 C155 35, 155 90, 100 135 C45 90, 45 35, 45 35 C45 35, 70 25, 100 25 Z" />
          <path d="M100 32 C125 32, 147 41, 147 41 C147 41, 147 85, 100 126 C53 85, 53 41, 53 41 C53 41, 75 32, 100 32 Z" className="stroke-silver-structure/10" />

          {/* Core Check */}
          <path d="M75 75 L93 93 L125 58" className="stroke-emerald-core" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          
          <text x="75" y="148" className="fill-silver-structure/50 font-mono text-[5px] stroke-none">COMPLIANCE: GDPR SECURE</text>
        </svg>
      </div>

      <p className="text-[15px] text-bone-light/85 leading-relaxed font-sans">
        სერვისების SLA და პერსონალურ მონაცემთა დაცვის მკაცრი რეგულაციები. სისტემა სრულად შეესაბამება ISO 27001-ისა და GDPR-ის მოთხოვნებს.
      </p>

      <div className="flex gap-2 font-mono text-[11px]">
        <Link href="/sla" className="flex-1 py-1.5 bg-silver-structure/5 hover:bg-silver-structure/10 border border-silver-structure/15 text-center text-silver-structure hover:text-white rounded uppercase transition-colors">
          [ VIEW_SLA ]
        </Link>
        <Link href="/privacy" className="flex-1 py-1.5 bg-silver-structure/5 hover:bg-silver-structure/10 border border-silver-structure/15 text-center text-silver-structure hover:text-white rounded uppercase transition-colors">
          [ PRIVACY_TERMS ]
        </Link>
      </div>
    </div>
  );
}

```

## File: `src/utils/audioManager.ts`

```typescript
"use client";

class AudioManager {
  private humAudio: HTMLAudioElement | null = null;
  private muted = true;
  private listeners: ((muted: boolean) => void)[] = [];

  constructor() {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("artron_audio_muted");
      this.muted = saved !== "false";
    }
  }

  public subscribe(listener: (muted: boolean) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notify() {
    this.listeners.forEach((l) => l(this.muted));
  }

  public isMuted() {
    return this.muted;
  }

  public toggleMute() {
    this.setMuted(!this.muted);
  }

  public setMuted(muted: boolean) {
    this.muted = muted;
    if (typeof window !== "undefined") {
      localStorage.setItem("artron_audio_muted", String(muted));
    }
    if (this.humAudio) {
      this.humAudio.muted = muted;
    }
    this.notify();
  }

  public playClick() {
    if (typeof window === "undefined" || this.muted) return;
    try {
      const click = new Audio("/click.mp3");
      click.volume = 0.08;
      click.play().catch(() => {});
    } catch (e) {
      console.warn("Click audio playback failed:", e);
    }
  }

  public playHapticClick() {
    if (typeof window === "undefined" || this.muted) return;
    try {
      const click = new Audio("/haptic-click.mp3");
      click.volume = 0.1; // volume cap = 0.1 (10%)
      click.play().catch(() => {});
    } catch (e) {
      console.warn("Haptic click playback failed:", e);
    }
  }

  public startHum() {
    if (typeof window === "undefined") return;
    try {
      if (!this.humAudio) {
        this.humAudio = new Audio("/ambient-hum.mp3");
        this.humAudio.loop = true;
        this.humAudio.volume = 0.03;
      }
      this.humAudio.muted = this.muted;
      this.humAudio.play().catch(() => {});
    } catch (e) {
      console.warn("Ambient hum playback failed:", e);
    }
  }

  public stopHum() {
    if (this.humAudio) {
      try {
        this.humAudio.pause();
        this.humAudio.currentTime = 0;
      } catch (e) {}
    }
  }

  public playAlert() {
    if (typeof window === "undefined" || this.muted) return;
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(140, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(70, ctx.currentTime + 0.3);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0005, ctx.currentTime + 0.35);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.4);
    } catch (e) {}
  }
}

export const audioManager = new AudioManager();

```

