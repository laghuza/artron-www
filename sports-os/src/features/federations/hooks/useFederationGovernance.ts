"use client";

import { useState, useMemo } from "react";
import { SovereignFederation, FederationFilter } from "../types";

const INITIAL_FEDERATIONS: SovereignFederation[] = [
  {
    id: "fed-001",
    tenantId: "ten-geo-01",
    name: "Georgian Football Federation (GFF)",
    code: "GEO_FOOTBALL_FED",
    country: "Georgia",
    clubsCount: 42,
    athletesCount: 14200,
    licensedUntil: "2028-12-31",
    gateway: { keyId: "KEY_GFF_9981", algorithm: "AES-256-RSA", systemLoadPct: 12.4, status: "active" },
  },
  {
    id: "fed-002",
    tenantId: "ten-geo-01",
    name: "Georgian Basketball Federation (GBF)",
    code: "GEO_BASKETBALL_FED",
    country: "Georgia",
    clubsCount: 28,
    athletesCount: 6800,
    licensedUntil: "2027-06-30",
    gateway: { keyId: "KEY_GBF_4412", algorithm: "AES-256-RSA", systemLoadPct: 8.9, status: "active" },
  },
  {
    id: "fed-003",
    tenantId: "ten-geo-01",
    name: "Georgian Rugby Union (GRU)",
    code: "GEO_RUGBY_UNION",
    country: "Georgia",
    clubsCount: 34,
    athletesCount: 9100,
    licensedUntil: "2029-01-01",
    gateway: { keyId: "KEY_GRU_7701", algorithm: "ECDSA-P384", systemLoadPct: 18.2, status: "active" },
  },
];

export function useFederationGovernance() {
  const [federations] = useState<SovereignFederation[]>(INITIAL_FEDERATIONS);
  const [filter, setFilter] = useState<FederationFilter>("all");
  const [selectedFedId, setSelectedFedId] = useState<string>("fed-001");

  const filteredFederations = useMemo(() => {
    return federations.filter((f) => {
      if (filter === "active") return f.gateway.status === "active";
      if (filter === "high-load") return f.gateway.systemLoadPct > 15;
      return true;
    });
  }, [federations, filter]);

  const selectedFederation = useMemo(() => {
    return federations.find((f) => f.id === selectedFedId) || federations[0];
  }, [federations, selectedFedId]);

  return {
    federations: filteredFederations,
    selectedFederation,
    setSelectedFedId,
    filter,
    setFilter,
  };
}
