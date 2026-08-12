import type { Prisma, $Enums } from "@prisma/client";

// Prisma Model Payload Types
export type AthleteProfile = Prisma.AthleteProfileGetPayload<{}>;
export type Contract = Prisma.ContractGetPayload<{}>;
export type Subscription = Prisma.SubscriptionGetPayload<{}>;
export type BiometricTelemetryStream = Prisma.BiometricTelemetryStreamGetPayload<{}>;

// Enum Types via Prisma $Enums Namespace
export type SubscriptionPlan = $Enums.SubscriptionPlan;
export type ContractStatus = $Enums.ContractStatus;
export type BillingStatus = $Enums.BillingStatus;
export type ContractType = $Enums.ContractType;
export type AcademyType = $Enums.AcademyType;

export interface DashboardKPIMetrics {
  totalAthletes: number;
  athleteChangePct: number;
  activeContracts: number;
  totalContractValueCents: number;
  telemetryStreamRatePerSec: number;
  mrrCents: number;
  mrrChangePct: number;
  systemUptimePct: number;
  rlsLatencyMs: number;
}

export interface TypedAthleteRosterItem {
  profile: AthleteProfile;
  activeContract?: Contract | null;
  latestTelemetry?: BiometricTelemetryStream | null;
  enneaCoreScore: number;
}

export interface EnneaCoreTelemetryPayload {
  speed: number;
  endurance: number;
  stress: number;
  loadFactor: number;
  vo2MaxEstimate?: number;
}
