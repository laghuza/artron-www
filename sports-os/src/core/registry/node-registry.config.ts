import { SubItemData } from "@/components/features/dashboard/NodeDetailStage";

export type DomainType =
  | "federations"
  | "clubs"
  | "telemetry"
  | "athletes"
  | "integrations"
  | "careers"
  | "about"
  | "security"
  | "system";

export interface SubModuleConfig {
  id: string;
  title: string;
  category: string;
  doctrines: string[];
}

export interface NodeConfig {
  id: number;
  nodeCode: string;
  title: string;
  domain: DomainType;
  shortDesc: string;
  subModules: SubModuleConfig[];
  controllerName: string;
}

export const NODE_REGISTRY: Record<number, NodeConfig> = {
  1: {
    id: 1,
    nodeCode: "SOVEREIGN_FEDERATIONS",
    title: "FEDERATION GOVERNANCE",
    domain: "federations",
    shortDesc: "National federation governance, club licensing & cryptographic gateway.",
    controllerName: "FederationGovernanceStage",
    subModules: [
      { id: "fed-registry", title: "CONNECTED FEDERATION REGISTRY", category: "REGISTRY", doctrines: ["GEO_FOOTBALL_FED: SECURE", "GEO_BASKETBALL_FED: SECURE"] },
      { id: "fed-gateway", title: "CRYPTOGRAPHIC GATEWAY", category: "SECURITY", doctrines: ["AES_256_RSA_ACTIVE", "SYS_LOAD: 12.4%"] },
    ],
  },
  2: {
    id: 2,
    nodeCode: "CLUB_DIGITAL_TWIN",
    title: "FACILITY BLUEPRINT & CLUBS",
    domain: "clubs",
    shortDesc: "Academy operations, multi-team management & facility digital twins.",
    controllerName: "ClubOperationsStage",
    subModules: [
      { id: "turnstile-feed", title: "TELEMETRY FEED", category: "HARDWARE", doctrines: ["RFID_TURNSTILE_01: ACTIVE"] },
    ],
  },
  3: {
    id: 3,
    nodeCode: "IOT_TELEMETRY",
    title: "REAL-TIME EDGE TELEMETRY",
    domain: "telemetry",
    shortDesc: "Sub-50ms WebSocket streaming for edge sensors & biometrics.",
    controllerName: "EdgeTelemetryStage",
    subModules: [
      { id: "iot-stream", title: "SENSOR STREAM", category: "TELEMETRY", doctrines: ["STREAMING @ SUB-50MS LATENCY"] },
    ],
  },
  4: {
    id: 4,
    nodeCode: "ATHLETE_MOBILE_OS",
    title: "USER & ATHLETE MANAGEMENT",
    domain: "athletes",
    shortDesc: "Biometric performance telemetry & athlete passkey access.",
    controllerName: "AthleteStageView",
    subModules: [
      { id: "mobile-app", title: "REACT NATIVE HUD", category: "ATHLETE_OS", doctrines: ["BIOMETRIC_PASSKEY_AUTH", "SQLITE_OFFLINE_SYNC"] },
    ],
  },
  5: {
    id: 5,
    nodeCode: "PARTNERS_INTEGRATIONS",
    title: "PARTNERS & INTEGRATIONS",
    domain: "integrations",
    shortDesc: "Third-party SaaS extensions & billing webhooks.",
    controllerName: "IntegrationsStage",
    subModules: [
      { id: "partner-mod", title: "MODULAR EXTENSIONS", category: "INTEGRATIONS", doctrines: ["FINANCIAL_WEBHOOKS_ACTIVE"] },
    ],
  },
  6: {
    id: 6,
    nodeCode: "CORE_TEAM_CAREERS",
    title: "CORE TEAM & CAREERS",
    domain: "careers",
    shortDesc: "Artron engineering team & platform research.",
    controllerName: "CareersStage",
    subModules: [
      { id: "careers-hub", title: "JOIN THE CORE", category: "CAREERS", doctrines: ["AI_RESEARCH_ACTIVE"] },
    ],
  },
  7: {
    id: 7,
    nodeCode: "ABOUT_US",
    title: "SYSTEM VISION & DOCTRINE",
    domain: "about",
    shortDesc: "Artron core doctrine & biophilic mineral design guidelines.",
    controllerName: "AboutStage",
    subModules: [
      { id: "doctrine-manifesto", title: "ARTRON MANIFESTO", category: "DOCTRINE", doctrines: ["SELF_ORGANIZATION_PROTOCOL"] },
    ],
  },
  8: {
    id: 8,
    nodeCode: "SECURITY_SLA",
    title: "SECOPS & DATA PURGE",
    domain: "security",
    shortDesc: "GDPR compliance, AES-256 encryption & 14-day automated purge.",
    controllerName: "SecOpsStage",
    subModules: [
      { id: "gdpr-purge", title: "GDPR SHIELD", category: "SECOPS", doctrines: ["14_DAY_AUTOMATED_PURGE"] },
    ],
  },
  9: {
    id: 9,
    nodeCode: "CORE_INIT",
    title: "ARTRON CENTRAL GATEWAY",
    domain: "system",
    shortDesc: "Central EnneaCore 9-Node OS neural dispatcher.",
    controllerName: "CentralGatewayStage",
    subModules: [
      { id: "core-access", title: "SYSTEM ENTRY", category: "SYSTEM", doctrines: ["NEURAL_DISPATCHER_INIT"] },
    ],
  },
};

export function getNodeConfig(nodeId: number): NodeConfig | undefined {
  return NODE_REGISTRY[nodeId];
}

export function getNodesByDomain(domain: DomainType): NodeConfig[] {
  return Object.values(NODE_REGISTRY).filter((node) => node.domain === domain);
}

export function getNodeSubModules(nodeId: number): SubModuleConfig[] {
  return NODE_REGISTRY[nodeId]?.subModules || [];
}
