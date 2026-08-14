export interface BiometricTelemetry {
  heartRateBpm: number;
  vo2Max: number;
  fatigueScore: number; // 0 - 100
  speedMs: number;
  lastUpdated: string;
}

export interface AthleteProfile {
  id: string;
  tenantId: string;
  clubId: string;
  firstName: string;
  lastName: string;
  category: string;
  passkeyStatus: "active" | "pending" | "revoked";
  biometrics: BiometricTelemetry;
  piiEncrypted: boolean;
}

export type AthleteFilter = "all" | "active" | "high-fatigue" | "pending-passkey";
