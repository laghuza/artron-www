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
const DashboardFeaturesSection = dynamic(
  () => import('@/components/DashboardFeaturesSection').then((mod) => mod.DashboardFeaturesSection),
  { loading: () => <SectionSkeleton minHeight="min-h-[500px]" label="DASHBOARD MATRIX LOADING..." /> }
);

const MultimodalAiShowcase = dynamic(
  () => import('@/components/landing/MultimodalAiShowcase').then((mod) => mod.MultimodalAiShowcase),
  { loading: () => <SectionSkeleton minHeight="min-h-[600px]" label="MULTIMODAL AI ASSISTANT LOADING..." /> }
);

const AnalyticsShowcase = dynamic(
  () => import('@/components/landing/AnalyticsShowcase').then((mod) => mod.AnalyticsShowcase),
  { loading: () => <SectionSkeleton minHeight="min-h-[650px]" label="AI TELEMETRY & ANALYTICS LOADING..." /> }
);

const EnterpriseSecurityShowcase = dynamic(
  () => import('@/components/landing/EnterpriseSecurityShowcase').then((mod) => mod.EnterpriseSecurityShowcase),
  { loading: () => <SectionSkeleton minHeight="min-h-[550px]" label="ENTERPRISE SECURITY & FINANCIAL SOVEREIGNTY LOADING..." /> }
);

const StaffAccessRolesShowcase = dynamic(
  () => import('@/components/landing/StaffAccessRolesShowcase').then((mod) => mod.StaffAccessRolesShowcase),
  { loading: () => <SectionSkeleton minHeight="min-h-[550px]" label="STAFF ACCESS & DYNAMIC RBAC LOADING..." /> }
);

const LegacyVsArtronSection = dynamic(
  () => import('@/components/landing/LegacyVsArtronSection').then((mod) => mod.LegacyVsArtronSection),
  { loading: () => <SectionSkeleton minHeight="min-h-[600px]" label="PARADIGM SHIFT MATRIX LOADING..." /> }
);


const PricingSection = dynamic(
  () => import('@/components/landing/PricingSection').then((mod) => mod.PricingSection),
  { loading: () => <SectionSkeleton minHeight="min-h-[600px]" label="PRICING MATRIX LOADING..." /> }
);

const PartnerEcosystem = dynamic(
  () => import('@/components/landing/PartnerEcosystem').then((mod) => mod.PartnerEcosystem),
  { loading: () => <SectionSkeleton minHeight="min-h-[500px]" label="PARTNER NETWORK LOADING..." /> }
);

const BookingEngine = dynamic(
  () => import('@/components/landing/BookingEngine').then((mod) => mod.BookingEngine),
  { loading: () => <SectionSkeleton minHeight="min-h-[550px]" label="INSTANT BOOKING GATEWAY LOADING..." /> }
);

const FaqSection = dynamic(
  () => import('@/components/landing/FaqSection').then((mod) => mod.FaqSection),
  { loading: () => <SectionSkeleton minHeight="min-h-[400px]" label="KNOWLEDGE BASE LOADING..." /> }
);

const SaaSGatewayCTA = dynamic(
  () => import('@/components/landing/SaaSGatewayCTA').then((mod) => mod.SaaSGatewayCTA),
  { loading: () => <SectionSkeleton minHeight="min-h-[400px]" label="GATEWAY CTA LOADING..." /> }
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

        {/* 2. Dual-Core Ecosystem Bridge (Web + App Sync) */}
        <DualCoreShowcase />
        <SectionTransition variant="laser" />

        {/* Below-the-fold sections with content-visibility: auto for 60-120 FPS scrolling */}
        <div className="cv-auto">
          {/* 3. B2B Control Hub Cluster: CRM, IoT & Labor Compliance */}
          <DashboardFeaturesSection />
          <SectionTransition variant="laser" />
        </div>

        <div className="cv-auto">
          <MultimodalAiShowcase />
          <SectionTransition variant="laser" />
        </div>

        <div className="cv-auto">
          <EnterpriseSecurityShowcase />
          <SectionTransition variant="laser" />
        </div>

        <div className="cv-auto">
          <StaffAccessRolesShowcase />
          <SectionTransition variant="laser" />
        </div>

        <div className="cv-auto">
          <LegacyVsArtronSection />
          <SectionTransition variant="laser" />
        </div>

        <div className="cv-auto">
          {/* 4. B2C Athlete Advantages: Mobile App for Members */}
          <B2CAthleteAdvantages />
          <SectionTransition variant="laser" />
        </div>

        <div className="cv-auto">
          {/* 5. Business Intelligence & Analytics Showcase */}
          <AnalyticsShowcase />
          <SectionTransition variant="laser" />
        </div>

        <div className="cv-auto">
          {/* 6. Pricing Matrix */}
          <PricingSection />
          <SectionTransition variant="laser" />
        </div>

        <div className="cv-auto">
          {/* 7. Partner Ecosystem */}
          <PartnerEcosystem />
          <SectionTransition variant="laser" />
        </div>

        <div className="cv-auto">
          {/* 8. Instant Booking Engine */}
          <BookingEngine />
          <SectionTransition variant="laser" />
        </div>

        <div className="cv-auto">
          {/* 9. FAQ Knowledge Base */}
          <FaqSection />
          <SectionTransition variant="laser" />
        </div>

        <div className="cv-auto">
          {/* 10. Final Gateway CTA */}
          <SaaSGatewayCTA />
        </div>
      </main>
      <Footer />
      <CookieConsentBanner />
    </div>
  );
}
