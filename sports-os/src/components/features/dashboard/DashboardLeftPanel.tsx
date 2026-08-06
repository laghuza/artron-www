"use client";

import { SubItemData } from "@/components/features/dashboard/NodeDetailStage";
import DefaultNarrative from "@/components/features/narratives/DefaultNarrative";
import FederationsNarrative from "@/components/features/narratives/FederationsNarrative";
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
  const effectiveNode = (orchestrator?.activeNodeId && orchestrator.activeNodeId > 0) ? orchestrator.activeNodeId : currentDisplayNode;
  const isNodeOrSubActive = (orchestrator?.activeNodeId && orchestrator.activeNodeId > 0) || Boolean(orchestrator?.activeSubModuleId) || effectiveNode > 0;

  const renderNarrative = () => {
    switch (effectiveNode) {
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
  };

  return (
    <div className="w-full max-w-full overflow-y-auto overflow-x-hidden scrollbar-thin">
      {isNodeOrSubActive && (
        <div className="lg:hidden sticky top-0 z-30 pb-3 pt-1 bg-[#101216]/90 backdrop-blur-md">
          <button
            onClick={() => orchestrator?.setMobileStage("canvas")}
            className="w-full py-2 px-3 text-[11px] font-mono rounded bg-[#00F0FF]/15 text-[#00F0FF] border border-[#00F0FF]/50 hover:bg-[#00F0FF]/25 shadow-[0_0_12px_rgba(0,240,255,0.25)] flex items-center justify-center gap-2 transition-all cursor-pointer font-bold tracking-wider uppercase"
          >
            [ ⬅️ BACK TO GRAPH / გრაფიკზე დაბრუნება ]
          </button>
        </div>
      )}
      {renderNarrative()}
    </div>
  );
}
