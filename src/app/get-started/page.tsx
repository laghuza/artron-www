import React, { Suspense } from "react";
import GetStartedClient from "./GetStartedClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "სისტემის შეძენა & სტუმრის დემო | ARTRON",
  description: "დაარეგისტრირეთ თქვენი ფიტნეს დარბაზი, საცურაო აუზი ან სტუდია ართრონის CRM პლატფორმაზე ან მიიღეთ 1-საათიანი მყისიერი Guest დემო წვდომა.",
  alternates: {
    canonical: '/get-started',
  },
  openGraph: {
    title: "სისტემის შეძენა & სტუმრის დემო | ARTRON",
    description: "დაარეგისტრირეთ თქვენი სპორტული ობიექტი ან მიიღეთ 1-საათიანი მყისიერი Guest დემო წვდომა.",
    url: "https://www.artron.ge/get-started",
  }
};

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#07090E] flex items-center justify-center text-[#00A3FF] font-mono text-xs">INITIALIZING_CORE...</div>}>
      <GetStartedClient />
    </Suspense>
  );
}
