export interface FacilityTurnstile {
  id: string;
  name: string;
  status: "active" | "offline" | "calibrating";
  passRatePerMin: number;
  lastScanTimestamp: string;
}

export interface ClubAcademy {
  id: string;
  tenantId: string;
  federationId: string;
  name: string;
  academyType: "pro_academy" | "grassroots" | "olympic_center";
  activeTeamsCount: number;
  facilityTurnstiles: FacilityTurnstile[];
}
