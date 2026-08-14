import TermsClient from "./TermsClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "მომსახურების პირობები | Terms of Service",
  description: "ვებგვერდითა და ართრონის SaaS პლატფორმით სარგებლობის სალიცენზიო შეთანხმება, უსაფრთხოების წესები და დაბრუნების პოლიტიკა.",
  alternates: {
    canonical: '/terms',
  },
  openGraph: {
    title: "მომსახურების პირობები | Terms of Service | ARTRON",
    description: "ვებგვერდითა და ართრონის SaaS პლატფორმით სარგებლობის წესები და პირობები.",
    url: "https://www.artron.ge/terms",
  }
};

export default function Page() {
  return <TermsClient />;
}
