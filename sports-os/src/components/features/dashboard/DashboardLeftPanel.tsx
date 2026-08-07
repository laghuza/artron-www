"use client";

import { SubItemData } from "@/components/features/dashboard/NodeDetailStage";
import DefaultNarrative from "@/components/features/narratives/DefaultNarrative";
import Node01CrmNarrative from "@/components/features/narratives/Node01CrmNarrative";
import ClubsBlueprintNarrative from "@/components/features/narratives/ClubsBlueprintNarrative";
import ProfessionalsModulesNarrative from "@/components/features/narratives/ProfessionalsModulesNarrative";
import MobileOSNarrative from "@/components/features/narratives/MobileOSNarrative";
import GamificationNarrative from "@/components/features/narratives/GamificationNarrative";
import MarketplaceNarrative from "@/components/features/narratives/MarketplaceNarrative";
import AnalyticsNarrative from "@/components/features/narratives/AnalyticsNarrative";
import SlaSecurityNarrative from "@/components/features/narratives/SlaSecurityNarrative";
import PurgeNarrative from "@/components/features/narratives/PurgeNarrative";
import AccessFormNarrative from "@/components/features/narratives/AccessFormNarrative";
import { useStageOrchestrator } from "@/context/StageOrchestratorContext";

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
  const orchestrator = useStageOrchestrator();
  const effectiveNode = currentDisplayNode || orchestrator?.activeNodeId || 0;

  const renderNarrative = () => {
    switch (effectiveNode) {
      case 1:
        return (
          <Node01CrmNarrative
            onBack={() => handleNodeSelect(0)}
            onSelectSubItem={(item) => setSelectedSubItem(item as unknown as SubItemData)}
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
  };

  return (
    <div className="w-full max-w-full overflow-y-auto overflow-x-hidden scrollbar-thin">
      {renderNarrative()}
    </div>
  );
}
