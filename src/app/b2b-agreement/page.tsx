import B2BAgreementClient from "./B2BAgreementClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "B2B SaaS სალიცენზიო ხელშეკრულება | B2B MSA Agreement",
  description: "სალიცენზიო და მომსახურების ხელშეკრულების ძირითადი პირობები (SLA, Uptime, DPA, ბრძანება №01-15/ნ) შპს ართრონსა (ს/კ 412799431) და სპორტულ ცენტრებს შორის.",
  alternates: {
    canonical: '/b2b-agreement',
  },
  openGraph: {
    title: "B2B SaaS სალიცენზიო ხელშეკრულება (MSA) | ARTRON",
    description: "SLA, Uptime, შრომის აღრიცხვა (ბრძანება №01-15/ნ) და მონაცემთა დამუშავების შეთანხმება შპს ართრონსა და B2B კლიენტებს შორის.",
    url: "https://www.artron.ge/b2b-agreement",
  }
};

export default function Page() {
  return <B2BAgreementClient />;
}
