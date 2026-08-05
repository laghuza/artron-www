import { SubItemData } from "@/components/features/dashboard/NodeDetailStage";

export const FEDERATION_LIST: SubItemData[] = [
  {
    id: "geo_football",
    nodeId: 1,
    category: "FEDERATION_NODE",
    title: "საქართველოს ფეხბურთის ფედერაციები (GFF)",
    subtitle: "NATIONAL FOOTBALL GOVERNING BODY",
    status: "SECURE_ACTIVE",
    statusColor: "text-emerald-core border-emerald-core/30 bg-emerald-core/10",
    description: "ეროვნული საფეხბურთო ლიგების, მოთამაშეთა რეესტრისა და ლიცენზირების ცენტრალიზებული ციფრული ჰაბი.",
    metrics: [
      { label: "REGISTERED_CLUBS", value: "48 CLUBS" },
      { label: "LICENSED_ATHLETES", value: "14,250" },
      { label: "SECURITY_GATEWAY", value: "ENCRYPTED" }
    ],
    details: {
      GATEWAY_PROTOCOL: "AES_256_RSA",
      DATA_CENTER: "TBI_CORE_DC_01",
      API_SYNC_RATE: "99.98%"
    }
  },
  {
    id: "geo_basketball",
    nodeId: 1,
    category: "FEDERATION_NODE",
    title: "საქართველოს კალათბურთის ეროვნული ფედერაცია",
    subtitle: "GEORGIAN BASKETBALL FEDERATION",
    status: "SECURE_ACTIVE",
    statusColor: "text-sapphire-light border-sapphire-light/30 bg-sapphire-light/10",
    description: "საკალათბურთო ტურნირების, ტრანსფერებისა და მსაჯთა ციფრული ტელემეტრიის ავტომატიზებული პლატფორმა.",
    metrics: [
      { label: "REGISTERED_TEAMS", value: "32 TEAMS" },
      { label: "ACTIVE_MATCHES", value: "8 LIVE" },
      { label: "TELEMETRY_STATUS", value: "OPTIMAL" }
    ],
    details: {
      GATEWAY_PROTOCOL: "AES_256_RSA",
      DATA_CENTER: "TBI_CORE_DC_02",
      API_SYNC_RATE: "100.0%"
    }
  },
  {
    id: "geo_rugby",
    nodeId: 1,
    category: "FEDERATION_NODE",
    title: "საქართველოს რაგბის კავშირი (GRU)",
    subtitle: "GEORGIAN RUGBY UNION",
    status: "SECURE_ACTIVE",
    statusColor: "text-gold-raw border-gold-raw/30 bg-gold-raw/10",
    description: "დიდი 10-ისა და ეროვნული ნაკრებების ბიომექანიკური მონიტორინგი და სამედიცინო პასპორტები.",
    metrics: [
      { label: "REGIONAL_UNIONS", value: "12 REGIONS" },
      { label: "PHYSIO_MONITORS", value: "850 ACTIVE" },
      { label: "HEALTH_PASS", value: "VERIFIED" }
    ],
    details: {
      GATEWAY_PROTOCOL: "AES_256_RSA",
      DATA_CENTER: "TBI_CORE_DC_03",
      API_SYNC_RATE: "99.95%"
    }
  }
];
