import DeleteAccountClient from "./DeleteAccountClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ანგარიშის წაშლა | Account Deletion",
  description: "ანგარიშის დეაქტივაციისა და მონაცემთა წაშლის პროცედურა Apple App Store, Google Play და საქართველოს კანონმდებლობის შესაბამისად.",
  alternates: {
    canonical: '/delete-account',
  },
  openGraph: {
    title: "ანგარიშის წაშლა | Account Deletion | ARTRON",
    description: "ანგარიშის დეაქტივაციისა და მონაცემთა წაშლის პროცედურა ARTRON-ის მომხმარებლებისთვის.",
    url: "https://www.artron.ge/delete-account",
  }
};

export default function Page() {
  return <DeleteAccountClient />;
}
