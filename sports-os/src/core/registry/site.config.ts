export interface SiteConfig {
  name: string;
  shortName: string;
  description: string;
  version: string;
  domain: string;
  securityLevel: string;
  defaultLocale: string;
  locales: string[];
  contact: {
    email: string;
    support: string;
  };
}

export const SITE_CONFIG: SiteConfig = {
  name: "Artron Sports OS",
  shortName: "ArtronOS",
  description: "Enterprise Multi-Tenant Sports Management System Matrix",
  version: "10.2.0-PROD",
  domain: "artronos.com",
  securityLevel: "AES-256 / RLS ENFORCED",
  defaultLocale: "en",
  locales: ["en", "ge"],
  contact: {
    email: "secops@artronos.com",
    support: "https://artronos.com/support",
  },
};
