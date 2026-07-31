"use client";

import { SubItemData } from "./NodeDetailStage";
import DefaultNarrative from "../narratives/DefaultNarrative";
import FederationsNarrative from "../narratives/FederationsNarrative";
import ClubsBlueprintNarrative from "../narratives/ClubsBlueprintNarrative";
import ProfessionalsModulesNarrative from "../narratives/ProfessionalsModulesNarrative";
import MobileOSNarrative from "../narratives/MobileOSNarrative";
import GamificationNarrative from "../narratives/GamificationNarrative";
import MarketplaceNarrative from "../narratives/MarketplaceNarrative";
import AnalyticsNarrative from "../narratives/AnalyticsNarrative";
import SlaSecurityNarrative from "../narratives/SlaSecurityNarrative";
import PurgeNarrative from "../narratives/PurgeNarrative";
import AccessFormNarrative from "../narratives/AccessFormNarrative";

interface DashboardLeftPanelProps {
  currentDisplayNode: number;
  handleNodeSelect: (index: number) => void;
  selectedSubItem: SubItemData | null;
  setSelectedSubItem: (item: SubItemData | null) => void;
  purgeState: "none" | "selection" | "tenant" | "athlete" | "tenant-success" | "athlete-success";
  setPurgeState: (state: "none" | "selection" | "tenant" | "athlete" | "tenant-success" | "athlete-success") => void;
  handleTriggerScan: () => void;
  handleAccessTabChange: (tab: "login" | "request" | "choice") => void;
  accessTab: "login" | "request" | "choice";
  setGateHover: (gate: "gate_a" | "gate_b" | null) => void;
  setIsFlashActive: (active: boolean) => void;
}

export default function DashboardLeftPanel({
  currentDisplayNode,
  handleNodeSelect,
  selectedSubItem,
  setSelectedSubItem,
  purgeState,
  setPurgeState,
  handleTriggerScan,
  handleAccessTabChange,
  accessTab,
  setGateHover,
  setIsFlashActive,
}: DashboardLeftPanelProps) {
  switch (currentDisplayNode) {
    case 1:
      return (
        <FederationsNarrative
          onBack={() => handleNodeSelect(0)}
          onSelectSubItem={setSelectedSubItem}
          selectedSubId={selectedSubItem?.id}
        />
      );
    case 2:
      return (
        <ClubsBlueprintNarrative
          onBack={() => handleNodeSelect(0)}
          onSelectSubItem={setSelectedSubItem}
          selectedSubId={selectedSubItem?.id}
        />
      );
    case 3:
      return (
        <ProfessionalsModulesNarrative
          onBack={() => handleNodeSelect(0)}
          onSelectSubItem={setSelectedSubItem}
        />
      );
    case 4: return <MobileOSNarrative />;
    case 5: return <GamificationNarrative />;
    case 6: return <MarketplaceNarrative />;
    case 7: return <AnalyticsNarrative />;
    case 8:
      return purgeState === "none" ? (
        <SlaSecurityNarrative onDataPurgeTrigger={() => setPurgeState("selection")} />
      ) : (
        <PurgeNarrative purgeState={purgeState} setPurgeState={setPurgeState} />
      );
    case 9:
      return (
        <AccessFormNarrative
          onCancel={() => handleNodeSelect(0)}
          onSubmitting={handleTriggerScan}
          onTabChange={handleAccessTabChange}
          accessTab={accessTab}
          onHoverGate={setGateHover}
          onTriggerFlash={() => {
            setIsFlashActive(true);
            setTimeout(() => setIsFlashActive(false), 900);
          }}
        />
      );
    default:
      return <DefaultNarrative onRequestAccess={() => handleNodeSelect(9)} />;
  }
}
