import GetStartedClient from "./GetStartedClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "რეგისტრაცია | Get Started",
  description: "დაარეგისტრირეთ თქვენი ფიტნეს დარბაზი, აკადემია, აუზი ან ეროვნული სპორტული ფედერაცია ართრონის პლატფორმაზე. გაიარეთ 3-ეტაპიანი ავტომატიზებული ვერიფიკაციის პროცედურა.",
  alternates: {
    canonical: '/get-started',
  },
  openGraph: {
    title: "რეგისტრაცია | Get Started | ARTRON",
    description: "დაარეგისტრირეთ თქვენი ფიტნეს დარბაზი ან ფედერაცია ართრონის პლატფორმაზე. გაიარეთ 3-ეტაპიანი ავტომატიზებული ვერიფიკაციის პროცედურა.",
    url: "https://www.artron.ge/get-started",
  }
};

export default function Page() {
  return <GetStartedClient />;
}
