import dynamic from 'next/dynamic';
import { Header } from '@/components/Header';
import { KineticScrollHero } from '@/components/landing/KineticScrollHero';
import { DualCoreShowcase } from '@/components/landing/DualCoreShowcase';
import { B2CAthleteAdvantages } from '@/components/landing/B2CAthleteAdvantages';
import { Footer } from '@/components/landing/Footer';
import { CookieConsentBanner } from '@/components/consent/CookieConsentBanner';
import { LeftFloatingNavDock } from '@/components/navigation/LeftFloatingNavDock';
import { SectionTransition } from '@/components/ui/SectionTransition';
import { SectionSkeleton } from '@/components/ui/SectionSkeleton';
import type { Metadata } from 'next';

// ── Dynamically Imported Below-the-Fold Heavy Modules (Vercel Bundle Optimization) ──
const ServicesShowcase = dynamic(
  () => import('@/components/landing/ServicesShowcase').then((mod) => mod.ServicesShowcase),
  { loading: () => <SectionSkeleton minHeight="min-h-[600px]" label="SERVICES ECOSYSTEM LOADING..." /> }
);

const DashboardFeaturesSection = dynamic(
  () => import('@/components/DashboardFeaturesSection').then((mod) => mod.DashboardFeaturesSection),
  { loading: () => <SectionSkeleton minHeight="min-h-[500px]" label="DASHBOARD MATRIX LOADING..." /> }
);

const AnalyticsShowcase = dynamic(
  () => import('@/components/landing/AnalyticsShowcase').then((mod) => mod.AnalyticsShowcase),
  { loading: () => <SectionSkeleton minHeight="min-h-[650px]" label="AI TELEMETRY & ANALYTICS LOADING..." /> }
);

const BusinessStatsShowcase = dynamic(
  () => import('@/components/landing/BusinessStatsShowcase').then((mod) => mod.BusinessStatsShowcase),
  { loading: () => <SectionSkeleton minHeight="min-h-[450px]" label="GROWTH STATS LOADING..." /> }
);

const RoiCalculator = dynamic(
  () => import('@/components/landing/RoiCalculator').then((mod) => mod.RoiCalculator),
  { loading: () => <SectionSkeleton minHeight="min-h-[550px]" label="ROI CALCULATOR LOADING..." /> }
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

const AIBotWidget = dynamic(
  () => import('@/components/landing/AIBotWidget').then((mod) => mod.AIBotWidget)
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
      <LeftFloatingNavDock />
      <main className="flex-grow flex flex-col">
        <KineticScrollHero />
        <DualCoreShowcase />
        <B2CAthleteAdvantages />
        <SectionTransition variant="sparse" />
        <ServicesShowcase />
        <DashboardFeaturesSection />
        <AnalyticsShowcase />
        <BusinessStatsShowcase />
        <SectionTransition />
        <RoiCalculator />
        <PricingSection />
        <SectionTransition variant="sparse" />
        <PartnerEcosystem />
        <BookingEngine />
        <FaqSection />
        <SectionTransition />
        <SaaSGatewayCTA />
      </main>
      <Footer />
      <AIBotWidget />
      <CookieConsentBanner />
    </div>
  );
}
