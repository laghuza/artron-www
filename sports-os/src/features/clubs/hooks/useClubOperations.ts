"use client";

import { useState, useMemo } from "react";
import { ClubAcademy } from "../types";

const INITIAL_CLUBS: ClubAcademy[] = [
  {
    id: "club-dinamo",
    tenantId: "ten-geo-01",
    federationId: "fed-001",
    name: "FC Dinamo Tbilisi Academy",
    academyType: "pro_academy",
    activeTeamsCount: 14,
    facilityTurnstiles: [
      { id: "ts-01", name: "Main Stadium Entrance", status: "active", passRatePerMin: 42, lastScanTimestamp: "2s ago" },
      { id: "ts-02", name: "Academy Gate B", status: "active", passRatePerMin: 18, lastScanTimestamp: "5s ago" },
    ],
  },
  {
    id: "club-saburtalo",
    tenantId: "ten-geo-01",
    federationId: "fed-001",
    name: "FC Saburtalo Youth Complex",
    academyType: "pro_academy",
    activeTeamsCount: 10,
    facilityTurnstiles: [
      { id: "ts-03", name: "North Gate NFC", status: "active", passRatePerMin: 24, lastScanTimestamp: "1s ago" },
    ],
  },
];

export function useClubOperations() {
  const [clubs] = useState<ClubAcademy[]>(INITIAL_CLUBS);
  const [selectedClubId, setSelectedClubId] = useState<string>("club-dinamo");

  const selectedClub = useMemo(() => {
    return clubs.find((c) => c.id === selectedClubId) || clubs[0];
  }, [clubs, selectedClubId]);

  return {
    clubs,
    selectedClub,
    setSelectedClubId,
  };
}
