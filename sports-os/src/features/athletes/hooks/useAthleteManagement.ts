"use client";

import { useState, useMemo } from "react";
import { AthleteProfile, AthleteFilter } from "../types";

const INITIAL_ATHLETES: AthleteProfile[] = [
  {
    id: "ath-001",
    tenantId: "ten-geo-01",
    clubId: "club-dinamo",
    firstName: "Luka",
    lastName: "Modric",
    category: "Senior First Team",
    passkeyStatus: "active",
    biometrics: { heartRateBpm: 154, vo2Max: 62.4, fatigueScore: 18, speedMs: 7.8, lastUpdated: "NOW" },
    piiEncrypted: true,
  },
  {
    id: "ath-002",
    tenantId: "ten-geo-01",
    clubId: "club-dinamo",
    firstName: "Giorgi",
    lastName: "Chakvetadze",
    category: "First Team Midfielder",
    passkeyStatus: "active",
    biometrics: { heartRateBpm: 168, vo2Max: 59.8, fatigueScore: 42, speedMs: 8.4, lastUpdated: "NOW" },
    piiEncrypted: true,
  },
  {
    id: "ath-003",
    tenantId: "ten-geo-01",
    clubId: "club-saburtalo",
    firstName: "Khvicha",
    lastName: "Kvaratskhelia",
    category: "Elite Forward",
    passkeyStatus: "active",
    biometrics: { heartRateBpm: 172, vo2Max: 65.1, fatigueScore: 24, speedMs: 9.2, lastUpdated: "NOW" },
    piiEncrypted: true,
  },
];

export function useAthleteManagement() {
  const [athletes] = useState<AthleteProfile[]>(INITIAL_ATHLETES);
  const [filter, setFilter] = useState<AthleteFilter>("all");
  const [selectedAthleteId, setSelectedAthleteId] = useState<string | null>("ath-001");

  const filteredAthletes = useMemo(() => {
    return athletes.filter((a) => {
      if (filter === "active") return a.passkeyStatus === "active";
      if (filter === "high-fatigue") return a.biometrics.fatigueScore > 40;
      if (filter === "pending-passkey") return a.passkeyStatus === "pending";
      return true;
    });
  }, [athletes, filter]);

  const selectedAthlete = useMemo(() => {
    return athletes.find((a) => a.id === selectedAthleteId) || athletes[0];
  }, [athletes, selectedAthleteId]);

  return {
    athletes: filteredAthletes,
    totalCount: athletes.length,
    selectedAthlete,
    setSelectedAthleteId,
    filter,
    setFilter,
  };
}
