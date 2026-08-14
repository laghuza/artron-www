import PrivacyClient from "./PrivacyClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "კონფიდენციალურობის პოლიტიკა | Privacy Policy",
  description: "მონაცემთა დაცვის, AES-256-GCM შიფრაციისა და ბიომეტრიული უსაფრთხოების წესები შპს ართრონის (ს/კ 412799431) ეკოსისტემაში.",
  alternates: {
    canonical: '/privacy',
  },
  openGraph: {
    title: "კონფიდენციალურობის პოლიტიკა | Privacy Policy | ARTRON",
    description: "მონაცემთა დაცვის, შიფრაციისა და ბიომეტრიული უსაფრთხოების წესები შპს ართრონის ეკოსისტემაში.",
    url: "https://www.artron.ge/privacy",
  }
};

export default function Page() {
  return <PrivacyClient />;
}
