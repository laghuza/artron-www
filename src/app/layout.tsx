import type { Metadata } from "next";
import { Outfit, JetBrains_Mono, Noto_Sans_Georgian } from "next/font/google";
import { LanguageProvider } from "@/context/LanguageContext";
import { FloatingContactWidget } from "@/components/FloatingContactWidget";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const notoGeorgian = Noto_Sans_Georgian({
  subsets: ["georgian"],
  variable: "--font-noto-georgian",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.artron.ge"),
  title: {
    default: "ARTRON | ფიტნეს დარბაზის პროგრამა & IoT ტურნიკეტები",
    template: "%s | ARTRON"
  },
  description: "B2B CRM მართვის პანელი, IoT ტურნიკეტები, სამუშაო დრო (ბრძანება №01-15/ნ) და B2C მობილური აპლიკაცია სპორტული დარბაზებისა და ფედერაციებისთვის.",
  keywords: [
    "ფიტნეს დარბაზის პროგრამა",
    "CRM სპორტდარბაზისთვის",
    "აუზის მართვის სისტემა",
    "ტურნიკეტის მონტაჟი",
    "Gym CRM",
    "Fitness SaaS",
    "IoT Access Automation",
    "Order 01-15/n"
  ],
  alternates: {
    canonical: '/',
    languages: {
      'ka-GE': '/',
      'en-US': '/?lang=en',
      'ru-RU': '/?lang=ru',
    },
  },
  openGraph: {
    title: "ARTRON | Enterprise Fitness SaaS & IoT Access Automation",
    description: "Advanced CRM Control Panel & Client Mobile App for Fitness Chains and Sports Complexes. Complete turnstile socket control and business metrics automation.",
    url: "https://www.artron.ge",
    siteName: "ARTRON",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ARTRON - Enterprise Fitness SaaS & IoT Access Automation",
      },
    ],
    locale: "ka_GE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ARTRON | Enterprise Fitness SaaS & IoT Access Automation",
    description: "Advanced CRM Control Panel & Client Mobile App for Fitness Chains and Sports Complexes.",
    images: ["/og-image.png"],
  },
};


export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ka"
      className={`${outfit.variable} ${jetbrainsMono.variable} ${notoGeorgian.variable} h-full antialiased dark`}
    >
      <head>
        {/* Google Consent Mode v2 Defaults */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('consent', 'default', {
                'analytics_storage': 'denied',
                'ad_storage': 'denied',
                'ad_user_data': 'denied',
                'ad_personalization': 'denied'
              });
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#0B0F17] text-white">
        <LanguageProvider>
          {children}
          <FloatingContactWidget />
        </LanguageProvider>
      </body>
    </html>
  );
}
