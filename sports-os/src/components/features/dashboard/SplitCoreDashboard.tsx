"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { audioManager } from "@/lib/audioManager";
import { SubItemData } from "@/components/features/dashboard/NodeDetailStage";
import SystemRegistryFooter from "@/components/layout/SystemRegistryFooter";
import GhostTrigger from "@/components/features/dashboard/GhostTrigger";
import ScanLine from "@/components/ui/ScanLine";
import LiveTelemetryFeed from "@/components/features/telemetry/LiveTelemetryFeed";
import MuteAudioButton from "@/components/features/dashboard/MuteAudioButton";
import LanguageToggle from "@/components/ui/LanguageToggle";
import DashboardLeftPanel from "@/components/features/dashboard/DashboardLeftPanel";
import DashboardMainStage from "@/components/features/dashboard/DashboardMainStage";
import { GLOW_COLORS } from "@/components/features/dashboard/dashboardConstants";
import { useDashboardEffects } from "@/hooks/useDashboardEffects";

export default function SplitCoreDashboard() {
  const router = useRouter();
  const [activeNode, setActiveNode] = useState<number>(0);
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);
  const [scanTrigger, setScanTrigger] = useState<number>(0);
  const [accessTab, setAccessTab] = useState<"login" | "request" | "choice">("choice");
  const [isFlashActive, setIsFlashActive] = useState<boolean>(false);
  const [sweepTrigger, setSweepTrigger] = useState<number>(0);
  const [isFadeToBlack, setIsFadeToBlack] = useState<boolean>(false);
  const [transitionStep, setTransitionStep] = useState<"idle" | "zooming" | "sweeping" | "console">("idle");
  const [gateHover, setGateHover] = useState<"gate_a" | "gate_b" | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [purgeState, setPurgeState] = useState<"none" | "selection" | "tenant" | "athlete" | "tenant-success" | "athlete-success">("none");
  const [selectedSubItem, setSelectedSubItem] = useState<SubItemData | null>(null);

  const currentDisplayNode = hoveredNode !== null ? hoveredNode : activeNode;

  useDashboardEffects({
    setIsMuted,
    transitionStep,
    activeNode,
    setPurgeState,
    accessTab,
    setTransitionStep,
    setSweepTrigger,
    setAccessTab,
  });

  const handleTriggerScan = () => setScanTrigger((prev) => prev + 1);

  const handleNodeSelect = (index: number) => {
    audioManager.playHapticClick();
    setActiveNode(index);
    setSelectedSubItem(null);
    if (index === 9) setAccessTab("choice");
  };

  const handleAccessTabChange = (tab: "login" | "request" | "choice") => {
    audioManager.playClick();
    setAccessTab(tab);
  };

  return (
    <div className={`relative h-screen w-screen max-h-screen max-w-screen overflow-hidden flex flex-col md:flex-row select-none transition-all duration-[1000ms] ease-expo-out box-border ${(transitionStep === "sweeping" || transitionStep === "console")
        ? "bg-black"
        : transitionStep === "zooming"
          ? "bg-[#090A0C]"
          : "bg-iron schematic-grid"
      }`}>
      <MuteAudioButton isMuted={isMuted} transitionStep={transitionStep} />
      <LanguageToggle />
      <ScanLine trigger={scanTrigger} />
      <div className={`fade-to-black-overlay ${isFadeToBlack ? "active" : ""}`} />

      {transitionStep === "sweeping" && (
        <div key={`sweep-${sweepTrigger}`} className="radial-sweep-ring" />
      )}

      {transitionStep === "idle" && (
        <div className="absolute top-4 right-4 z-40 animate-fadeIn">
          <GhostTrigger onAccessClick={() => handleNodeSelect(9)} />
        </div>
      )}

      <div className={`h-full flex flex-col justify-center relative overflow-hidden transition-all duration-[1000ms] ease-expo-out bg-[#1A1D23]/55 box-border ${transitionStep !== "idle"
          ? "w-0 opacity-0 px-0 py-0 border-r-0 pointer-events-none"
          : "w-full md:w-[40%] px-8 md:px-12 py-16 border-r border-[rgba(156,163,175,0.12)] backdrop-blur-[24px]"
        }`}>
        <div className="max-w-sm mx-auto w-full">
          {transitionStep === "idle" && (
            <DashboardLeftPanel
              currentDisplayNode={currentDisplayNode}
              handleNodeSelect={handleNodeSelect}
              selectedSubItem={selectedSubItem}
              setSelectedSubItem={setSelectedSubItem}
              purgeState={purgeState}
              setPurgeState={setPurgeState}
              handleTriggerScan={handleTriggerScan}
              handleAccessTabChange={handleAccessTabChange}
              accessTab={accessTab}
              setGateHover={setGateHover}
              setIsFlashActive={setIsFlashActive}
            />
          )}
        </div>

        {transitionStep === "idle" && (
          <div className="absolute bottom-8 left-0 w-full px-8 md:px-12 pointer-events-none">
            <LiveTelemetryFeed />
          </div>
        )}
      </div>

      <DashboardMainStage
        activeNode={activeNode}
        currentDisplayNode={currentDisplayNode}
        selectedSubItem={selectedSubItem}
        setSelectedSubItem={setSelectedSubItem}
        transitionStep={transitionStep}
        handleNodeSelect={handleNodeSelect}
        setHoveredNode={setHoveredNode}
        isFlashActive={isFlashActive}
        gateHover={gateHover}
        handleTriggerScan={handleTriggerScan}
        setIsFlashActive={setIsFlashActive}
        router={router}
        handleAccessTabChange={handleAccessTabChange}
        setIsFadeToBlack={setIsFadeToBlack}
        accessTab={accessTab}
        glowColors={GLOW_COLORS}
      />

      {transitionStep === "idle" && <SystemRegistryFooter onDataPurgeTrigger={() => { setActiveNode(8); setPurgeState("selection"); }} />}
    </div>
  );
}
