import type { Metadata } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ARTRON: Sports OS",
  description: "Systemic self-organization for sports federations, clubs, and professionals.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ka" className="h-full antialiased dark">
      <body className={`${outfit.variable} ${jetbrainsMono.variable} min-h-full bg-iron text-silver-light font-sans`}>
        {children}
      </body>
    </html>
  );
}
