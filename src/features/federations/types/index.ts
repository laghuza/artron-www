export interface FederationGateway {
  keyId: string;
  algorithm: "AES-256-RSA" | "ECDSA-P384";
  systemLoadPct: number;
  status: "active" | "maintenance" | "isolated";
}

export interface SovereignFederation {
  id: string;
  tenantId: string;
  name: string;
  code: string;
  country: string;
  clubsCount: number;
  athletesCount: number;
  licensedUntil: string;
  gateway: FederationGateway;
}

export type FederationFilter = "all" | "active" | "high-load";
