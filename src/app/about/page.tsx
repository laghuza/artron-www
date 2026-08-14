import AboutClient from "./AboutClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ჩვენ შესახებ | About Us",
  description: "გაიცანით შპს ართრონი - ფიტნესისა და სპორტის ავტომატიზაციის ლიდერი საქართველოში. B2B CRM მართვის პანელი, IoT ტურნიკეტები, შრომის აღრიცხვა (ბრძანება №01-15/ნ) და B2C მობილური აპლიკაცია.",
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: "ჩვენ შესახებ | About Us | ARTRON",
    description: "გაიცანით შპს ართრონი - ფიტნესისა და სპორტის ავტომატიზაციის ლიდერი საქართველოში. B2B მართვის პანელი, IoT აპარატურა და B2C მობილური აპლიკაცია.",
    url: "https://www.artron.ge/about",
  }
};

export default function Page() {
  return <AboutClient />;
}
