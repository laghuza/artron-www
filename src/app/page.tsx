import dynamic from 'next/dynamic';
import { Header } from '@/components/Header';
import { KineticScrollHero } from '@/components/landing/KineticScrollHero';
import { DualCoreShowcase } from '@/components/landing/DualCoreShowcase';
import { B2CAthleteAdvantages } from '@/components/landing/B2CAthleteAdvantages';
import { Footer } from '@/components/landing/Footer';
import { CookieConsentBanner } from '@/components/consent/CookieConsentBanner';
import { SectionTransition } from '@/components/ui/SectionTransition';
import { SectionSkeleton } from '@/components/ui/SectionSkeleton';
import type { Metadata } from 'next';

// ── Dynamically Imported Below-the-Fold Heavy Modules (Vercel Bundle Optimization) ──
const PureSportsMirror = dynamic(
  () => import('@/components/landing/pure-sports-mirror/PureSportsMirror').then((mod) => mod.PureSportsMirror),
  { loading: () => <SectionSkeleton minHeight="min-h-[550px]" label="THE PURE SPORTS MIRROR LOADING..." /> }
);

const DashboardFeaturesSection = dynamic(
  () => import('@/components/DashboardFeaturesSection').then((mod) => mod.DashboardFeaturesSection),
  { loading: () => <SectionSkeleton minHeight="min-h-[500px]" label="DASHBOARD MATRIX LOADING..." /> }
);

const ArtronAiSection = dynamic(
  () => import('@/components/landing/ArtronAiSection').then((mod) => mod.ArtronAiSection),
  { loading: () => <SectionSkeleton minHeight="min-h-[550px]" label="AI NEURAL ENGINE LOADING..." /> }
);

const PricingSection = dynamic(
  () => import('@/components/landing/PricingSection').then((mod) => mod.PricingSection),
  { loading: () => <SectionSkeleton minHeight="min-h-[600px]" label="PRICING MATRIX LOADING..." /> }
);

const PartnerEcosystem = dynamic(
  () => import('@/components/landing/PartnerEcosystem').then((mod) => mod.PartnerEcosystem),
  { loading: () => <SectionSkeleton minHeight="min-h-[500px]" label="PARTNER NETWORK LOADING..." /> }
);

const FaqSection = dynamic(
  () => import('@/components/landing/FaqSection').then((mod) => mod.FaqSection),
  { loading: () => <SectionSkeleton minHeight="min-h-[400px]" label="KNOWLEDGE BASE LOADING..." /> }
);

export const metadata: Metadata = {
  title: 'ARTRON | ფიტნეს დარბაზის პროგრამა, CRM & IoT ტურნიკეტები',
  description:
    'ართრონი არის სპორტული დარბაზებისა და ფიტნეს ცენტრების მართვის SaaS ეკოსისტემა. B2B CRM სამართავი პანელი, IoT ტურნიკეტები, შრომის აღრიცხვა (ბრძანება №01-15/ნ) და B2C მობილური აპლიკაცია.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'ARTRON | ფიტნეს დარბაზის პროგრამა, CRM & IoT ტურნიკეტები',
    description:
      'ართრონი არის სპორტული დარბაზებისა და ფიტნეს ცენტრების მართვის SaaS ეკოსისტემა. B2B CRM სამართავი პანელი, IoT ტურნიკეტები, შრომის აღრიცხვა (ბრძანება №01-15/ნ) და B2C მობილური აპლიკაცია.',
    url: 'https://www.artron.ge',
  },
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen relative bg-[#080B10] text-[#F8FAFC]">
      <Header isSticky={true} hideOnInitialScroll={true} />
      <main className="flex-grow flex flex-col relative">
        {/* 1. Kinetic Hero Header */}
        <KineticScrollHero />
        <SectionTransition variant="laser" />

        {/* 1.5 The Pure Sports Mirror (Systemic Mirror) */}
        <PureSportsMirror />
        <SectionTransition variant="laser" />

        {/* 2. Dual-Core Ecosystem Bridge (Web + App Sync) */}
        <DualCoreShowcase />
        <SectionTransition variant="laser" />

        {/* Below-the-fold sections with content-visibility: auto for 60-120 FPS scrolling */}
        <div className="cv-auto">
          {/* 3. B2B Control Hub: 4-Node Core Matrix (Operations & Security) & 6-Node Analytics */}
          <DashboardFeaturesSection />
          <SectionTransition variant="laser" />
        </div>

        <div className="cv-auto">
          {/* 4. B2C Athlete Digital Freedom: Mobile App for Members */}
          <B2CAthleteAdvantages />
          <SectionTransition variant="laser" />
        </div>

        <div className="cv-auto">
          {/* 5. Dedicated Multimodal AI Neural Engine Section */}
          <ArtronAiSection />
          <SectionTransition variant="laser" />
        </div>

        <div className="cv-auto">
          {/* 6. Pricing Matrix */}
          <PricingSection />
          <SectionTransition variant="laser" />
        </div>

        <div className="cv-auto">
          {/* 7. Partner Ecosystem & Live Coverage Network */}
          <PartnerEcosystem />
          <SectionTransition variant="laser" />
        </div>

        <div className="cv-auto">
          {/* 8. FAQ Knowledge Base */}
          <FaqSection />
        </div>
      </main>
      <Footer />
      <CookieConsentBanner />
    </div>
  );
}
