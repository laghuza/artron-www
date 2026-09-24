import { PureSportsMirror } from '@/components/landing/pure-sports-mirror/PureSportsMirror';
import { DashboardFeaturesSection } from '@/components/DashboardFeaturesSection';
import { ArtronAiSection } from '@/components/landing/ArtronAiSection';
import { PricingSection } from '@/components/landing/PricingSection';
import { PartnerEcosystem } from '@/components/landing/PartnerEcosystem';
import { FaqSection } from '@/components/landing/FaqSection';
import { Header } from '@/components/Header';
import { KineticScrollHero } from '@/components/landing/KineticScrollHero';
import { DualCoreShowcase } from '@/components/landing/DualCoreShowcase';
import { B2CAthleteAdvantages } from '@/components/landing/B2CAthleteAdvantages';
import { Footer } from '@/components/landing/Footer';
import { CookieConsentBanner } from '@/components/consent/CookieConsentBanner';
import { SectionTransition } from '@/components/ui/SectionTransition';
import type { Metadata } from 'next';

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

        {/* 3. B2B Control Hub: 4-Node Core Matrix (Operations & Security) & 6-Node Analytics */}
        <DashboardFeaturesSection />
        <SectionTransition variant="laser" />

        {/* 4. B2C Athlete Digital Freedom: Mobile App for Members */}
        <B2CAthleteAdvantages />
        <SectionTransition variant="laser" />

        {/* 5. Dedicated Multimodal AI Neural Engine Section */}
        <ArtronAiSection />
        <SectionTransition variant="laser" />

        {/* 6. Pricing Matrix */}
        <PricingSection />
        <SectionTransition variant="laser" />

        {/* 7. Partner Ecosystem & Live Coverage Network */}
        <PartnerEcosystem />
        <SectionTransition variant="laser" />

        {/* 8. FAQ Knowledge Base */}
        <FaqSection />
      </main>
      <Footer />
      <CookieConsentBanner />
    </div>
  );
}
