"use client";

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import InteractiveEnneaCore from "./InteractiveEnneaCore";
import CinematicLoginConsole from "../narratives/CinematicLoginConsole";
import NodeDetailStage, { SubItemData } from "./NodeDetailStage";

interface DashboardMainStageProps {
  activeNode: number;
  currentDisplayNode: number;
  selectedSubItem: SubItemData | null;
  setSelectedSubItem: (item: SubItemData | null) => void;
  transitionStep: "idle" | "zooming" | "sweeping" | "console";
  handleNodeSelect: (index: number) => void;
  setHoveredNode: (index: number | null) => void;
  isFlashActive: boolean;
  gateHover: "gate_a" | "gate_b" | null;
  handleTriggerScan: () => void;
  setIsFlashActive: (active: boolean) => void;
  router: AppRouterInstance;
  handleAccessTabChange: (tab: "login" | "request" | "choice") => void;
  setIsFadeToBlack: (fade: boolean) => void;
  accessTab: "login" | "request" | "choice";
  glowColors: Record<number, string>;
}

export default function DashboardMainStage({
  activeNode,
  currentDisplayNode,
  selectedSubItem,
  setSelectedSubItem,
  transitionStep,
  handleNodeSelect,
  setHoveredNode,
  isFlashActive,
  gateHover,
  handleTriggerScan,
  setIsFlashActive,
  router,
  handleAccessTabChange,
  setIsFadeToBlack,
  accessTab,
  glowColors,
}: DashboardMainStageProps) {
  return (
    <div
      className={`flex-1 h-full flex flex-col items-center justify-center relative p-6 md:p-12 z-20 transition-all duration-[1000ms] ease-expo-out ${
        activeNode === 9 && accessTab === "request" ? "opacity-40" : ""
      }`}
    >
      <div
        className="absolute w-[450px] h-[450px] rounded-full blur-[120px] opacity-10 transition-all duration-1000 pointer-events-none z-0"
        style={{ backgroundColor: glowColors[currentDisplayNode] || "transparent" }}
      />
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
        {selectedSubItem && transitionStep === "idle" ? (
          <NodeDetailStage
            data={selectedSubItem}
            onClose={() => setSelectedSubItem(null)}
          />
        ) : (
          <InteractiveEnneaCore
            activeNode={activeNode}
            onNodeSelect={handleNodeSelect}
            onNodeHover={setHoveredNode}
            isScaledUp={transitionStep !== "idle"}
            transitionStep={transitionStep}
            isFlashActive={isFlashActive}
            gateHover={gateHover}
          />
        )}
        {transitionStep === "console" && (
          <div className="w-full max-w-lg mt-0 z-30">
            <CinematicLoginConsole
              onCancel={() => handleNodeSelect(0)}
              onSubmitting={handleTriggerScan}
              onFlashTrigger={() => {
                setIsFlashActive(true);
                setTimeout(() => setIsFlashActive(false), 800);
              }}
              onSuccessRedirect={(path) => router.push(path)}
              onSwitchToRequest={() => handleAccessTabChange("request")}
              onFadeToBlack={() => setIsFadeToBlack(true)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
