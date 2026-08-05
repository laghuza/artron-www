import React, { ReactNode } from "react";
import type { Metadata } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import OfflineGuard from "@/components/ui/OfflineGuard";

import { I18nProvider } from "@/context/I18nContext";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "ARTRON: Sports OS",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ka" className="h-full antialiased dark">
      <body className={`${outfit.variable} ${jetbrainsMono.variable} min-h-full bg-iron text-silver-light font-sans`}>
        <I18nProvider>
          <OfflineGuard>{children}</OfflineGuard>
        </I18nProvider>
      </body>
    </html>
  );
}