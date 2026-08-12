import React, { ReactNode } from "react";
import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import OfflineGuard from "@/components/ui/OfflineGuard";

import { I18nProvider } from "@/context/I18nContext";
import { StageOrchestratorProvider } from "@/context/StageOrchestratorContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
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
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} min-h-full bg-[#090A0F] text-[#F8FAFC] font-sans`}>
        <I18nProvider>
          <StageOrchestratorProvider>
            <OfflineGuard>{children}</OfflineGuard>
          </StageOrchestratorProvider>
        </I18nProvider>
      </body>
    </html>
  );
}