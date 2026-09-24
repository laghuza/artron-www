import AboutClient from "./AboutClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ARTRON — სპორტის ციფრული სინტაქსი | ჩვენ შესახებ & Vision",
  description: "ARTRON არის სპორტის ცენტრალური ციფრული ნერვული სისტემა — 9 ურთიერთდაკავშირებული კვანძის ეკოსისტემა, 99.99% Uptime და AES-256 GCM უსაფრთხოება. ანიდან ჰოემდე, დასაბამიდან უსასრულობამდე.",
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: "ARTRON — სპორტის ციფრული სინტაქსი | ჩვენ შესახებ & Vision",
    description: "ARTRON არის სპორტის ცენტრალური ციფრული ნერვული სისტემა — 9 ურთიერთდაკავშირებული კვანძის ეკოსისტემა, 99.99% Uptime და AES-256 GCM უსაფრთხოება.",
    url: "https://www.artron.ge/about",
  }
};

export default function Page() {
  return <AboutClient />;
}
