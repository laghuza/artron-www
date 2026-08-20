import { KineticScrollHero } from "@/components/landing/KineticScrollHero";
import { DualCoreShowcase } from "@/components/landing/DualCoreShowcase";
import { PartnerEcosystem } from "@/components/landing/PartnerEcosystem";
import { ServicesShowcase } from "@/components/landing/ServicesShowcase";
import { RoiCalculator } from "@/components/landing/RoiCalculator";
import { PricingSection } from "@/components/landing/PricingSection";
import { BusinessStatsShowcase } from "@/components/landing/BusinessStatsShowcase";
import { AnalyticsShowcase } from "@/components/landing/AnalyticsShowcase";
import { DashboardFeaturesSection } from "@/components/DashboardFeaturesSection";
import { BookingEngine } from "@/components/landing/BookingEngine";
import { FaqSection } from "@/components/landing/FaqSection";
import { SaaSGatewayCTA } from "@/components/landing/SaaSGatewayCTA";
import { Footer } from "@/components/landing/Footer";
import { AIBotWidget } from "@/components/landing/AIBotWidget";
import { CookieConsentBanner } from "@/components/consent/CookieConsentBanner";
import { LeftFloatingNavDock } from "@/components/navigation/LeftFloatingNavDock";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ARTRON | ფიტნეს დარბაზის პროგრამა, CRM & IoT ტურნიკეტები",
  description: "ართრონი არის სპორტული დარბაზებისა და ფიტნეს ცენტრების მართვის SaaS ეკოსისტემა. B2B CRM სამართავი პანელი, IoT ტურნიკეტები, შრომის აღრიცხვა (ბრძანება №01-15/ნ) და B2C მობილური აპლიკაცია.",
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "ARTRON | ფიტნეს დარბაზის პროგრამა, CRM & IoT ტურნიკეტები",
    description: "ართრონი არის სპორტული დარბაზებისა და ფიტნეს ცენტრების მართვის SaaS ეკოსისტემა. B2B CRM სამართავი პანელი, IoT ტურნიკეტები, შრომის აღრიცხვა (ბრძანება №01-15/ნ) და B2C მობილური აპლიკაცია.",
    url: "https://www.artron.ge",
  }
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen relative bg-[#080B10] text-[#F8FAFC]">
      <LeftFloatingNavDock />
      <main className="flex-grow flex flex-col">
        <KineticScrollHero />
        <DualCoreShowcase />
        <ServicesShowcase />
        <DashboardFeaturesSection />
        <AnalyticsShowcase />
        <BusinessStatsShowcase />
        <RoiCalculator />
        <PricingSection />
        <PartnerEcosystem />
        <FaqSection />
        <BookingEngine />
        <SaaSGatewayCTA />
      </main>
      <Footer />
      <AIBotWidget />
      <CookieConsentBanner />
    </div>
  );
}
