import CookiePolicyClient from "./CookiePolicyClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ქუქი-ფაილების პოლიტიკა | Cookie Policy",
  description: "ქუქი-ფაილების მართვა, Google Consent Mode v2 და Apple ATT შესაბამისობა შპს ართრონის პლატფორმაზე.",
  alternates: {
    canonical: '/cookie-policy',
  },
  openGraph: {
    title: "ქუქი-ფაილების პოლიტიკა | Cookie Policy | ARTRON",
    description: "ქუქი-ფაილების მართვა, Google Consent Mode v2 და Apple ATT შესაბამისობა შპს ართრონის ეკოსისტემაში.",
    url: "https://www.artron.ge/cookie-policy",
  }
};

export default function Page() {
  return <CookiePolicyClient />;
}
