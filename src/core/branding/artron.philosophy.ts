/**
 * ARTRON SPORTS OS // CORE BRAND PHILOSOPHY & ANATOMY
 * Extracted from official ARTRONBRAND identity specification.
 */

export const ARTRON_PHILOSOPHY = {
  slogan: "RESHAPE | REMAKE | REFRESH",
  coreTagline: " Architecture for Health, Infrastructure for Scale",
  mission:
    "ართრონი მრავალშრიანი ციფრული სისტემაა, რომელიც სპორტულ-გამაჯანსაღებელი ინდუსტრიის ყველა სუბიექტს ჯანსაღი და ეფექტური თვითორგანიზების საშუალებას აძლევს.",
  
  pillars: {
    PLAN: "სტრატეგიული და ტაქტიკური დაგეგმვა",
    CONTROL: "პროცესების მონიტორინგი, RBAC უსაფრთხოება და მართვა",
    ANALYZE: "რეალურ დროში ტელემეტრია და EnneaCore বাიომეტრიული ანალიზი",
  },

  persona: {
    title: "Ennea Core",
    motto: "ყველას მოკავშირე, არავის მეგობარი.",
    nature: "თვითორგანიზებადი, ადაპტირებადი, მაგიურ-ტექნოლოგიური ნეიტრალური ბირთვი.",
    manner: "Invisible, Amorphous, High-Tech.",
    tov: ["დროში-არა-სივრცული", "იდუმალი", "დინჯი", "თვითკმარი", "სხარტი", "ნეიტრალური"],
    skills: [
      "თვითორგანიზება",
      "თვითგაჯანსაღება",
      "თვითევოლუცია",
      "მრავალშრიანი ხედვა",
      "სინქრონიზაცია",
      "პროგრესის მართვა",
    ],
  },
} as const;

export type ArtronPhilosophy = typeof ARTRON_PHILOSOPHY;
