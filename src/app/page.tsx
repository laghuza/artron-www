import { HeroSection } from "@/components/landing/HeroSection";
import { PartnerEcosystem } from "@/components/landing/PartnerEcosystem";
import { ServicesShowcase } from "@/components/landing/ServicesShowcase";
import { RoiCalculator } from "@/components/landing/RoiCalculator";
import { DashboardFeaturesSection } from "@/components/DashboardFeaturesSection";
import { BookingEngine } from "@/components/landing/BookingEngine";
import { FaqSection } from "@/components/landing/FaqSection";
import { SaaSGatewayCTA } from "@/components/landing/SaaSGatewayCTA";
import { Footer } from "@/components/landing/Footer";
import { AIBotWidget } from "@/components/landing/AIBotWidget";
import { CookieConsentBanner } from "@/components/consent/CookieConsentBanner";
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
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow flex flex-col">
        <HeroSection />
        <PartnerEcosystem />
        <ServicesShowcase />
        <RoiCalculator />
        <DashboardFeaturesSection />
        <BookingEngine />
        <FaqSection />
        <SaaSGatewayCTA />
      </main>
      <Footer />
      <AIBotWidget />
      <CookieConsentBanner />
    </div>
  );
}
