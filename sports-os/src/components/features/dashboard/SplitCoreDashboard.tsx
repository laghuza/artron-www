"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { audioManager } from "@/lib/audioManager";
import { SubItemData } from "@/components/features/dashboard/NodeDetailStage";
import SystemRegistryFooter from "@/components/layout/SystemRegistryFooter";
import MobileStageDock from "@/components/layout/MobileStageDock";
import DesktopLogoMenu from "@/components/layout/DesktopLogoMenu";
import ScanLine from "@/components/ui/ScanLine";
import LiveTelemetryFeed from "@/components/features/telemetry/LiveTelemetryFeed";
import MuteAudioButton from "@/components/features/dashboard/MuteAudioButton";
import LanguageToggle from "@/components/ui/LanguageToggle";
import ArtronCyberMenu from "@/components/layout/ArtronCyberMenu";
import DashboardLeftPanel from "@/components/features/dashboard/DashboardLeftPanel";
import DashboardMainStage from "@/components/features/dashboard/DashboardMainStage";
import { GLOW_COLORS } from "@/components/features/dashboard/dashboardConstants";
import { useDashboardEffects } from "@/hooks/useDashboardEffects";
import { useStageOrchestrator } from "@/context/StageOrchestratorContext";

interface SplitCoreDashboardProps {
  onReturnToGateway?: () => void;
}

export default function SplitCoreDashboard({ onReturnToGateway }: SplitCoreDashboardProps = {}) {
  const router = useRouter();
  const { mobileStage, setMobileStage, selectNode } = useStageOrchestrator();
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

  useDashboardEffects({ setIsMuted, transitionStep, activeNode, setPurgeState, accessTab, setTransitionStep, setSweepTrigger, setAccessTab });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && transitionStep === 'idle' && purgeState === 'none' && onReturnToGateway) {
        onReturnToGateway();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [transitionStep, purgeState, onReturnToGateway]);



  const handleTriggerScan = () => setScanTrigger((prev) => prev + 1);
  const handleNodeSelect = (index: number) => {
    audioManager.playHapticClick();
    setActiveNode(index);
    if (selectNode) selectNode(index);
    setSelectedSubItem(null);
    if (index === 9) setAccessTab("choice");
    setMobileStage("system");
  };
  const handleAccessTabChange = (tab: "login" | "request" | "choice") => { audioManager.playClick(); setAccessTab(tab); };

  return (
    <div className={`relative h-screen w-screen max-h-screen max-w-screen overflow-hidden flex flex-col lg:flex-row select-none transition-all duration-[1000ms] ease-expo-out box-border ${
      (transitionStep === "sweeping" || transitionStep === "console" || transitionStep === "zooming") ? "bg-[#121418]" : "bg-iron schematic-grid"
    }`}>
      <MuteAudioButton isMuted={isMuted} transitionStep={transitionStep} />
      <LanguageToggle />
      <ArtronCyberMenu isMuted={isMuted} transitionStep={transitionStep} onDataPurgeTrigger={() => { handleNodeSelect(8); setPurgeState("selection"); }} />
      <ScanLine trigger={scanTrigger} />
      <MobileStageDock />
      <div className={`fade-to-black-overlay ${isFadeToBlack ? "active" : ""}`} />
      {transitionStep === "sweeping" && <div key={`sweep-${sweepTrigger}`} className="radial-sweep-ring" />}
      {transitionStep === "idle" && (
        <div className="absolute top-4 right-4 z-50 animate-fadeIn flex items-center gap-3">
          {onReturnToGateway && (
            <button
              type="button"
              onClick={onReturnToGateway}
              className="px-3 py-1.5 bg-[#121418]/90 border border-[#00E676]/40 text-[#00E676] hover:bg-[#00E676] hover:text-[#121418] text-[11px] font-mono font-bold tracking-[1.5px] uppercase rounded transition-all cursor-pointer shadow-[0_0_15px_rgba(0,230,118,0.2)]"
            >
              [ ✕ RETURN TO GATEWAY (ESC) ]
            </button>
          )}
          <div className="hidden lg:block">
            <DesktopLogoMenu onEnterCore={() => handleNodeSelect(9)} />
          </div>
        </div>
      )}


      <div className={`h-full flex flex-col justify-center relative overflow-hidden transition-all duration-[1000ms] ease-expo-out bg-[#1A1D23]/60 box-border ${
        transitionStep !== "idle"
          ? "w-0 opacity-0 px-0 py-0 border-r-0 pointer-events-none"
          : `${mobileStage === "system" ? "w-full flex" : "hidden lg:flex"} lg:w-[40%] px-4 sm:px-8 lg:px-10 py-6 lg:py-16 border-r border-[rgba(156,163,175,0.18)] backdrop-blur-[12px]`
      }`}>
        <div className="max-w-md mx-auto w-full overflow-y-auto max-h-full scrollbar-thin">
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
          <div className="absolute bottom-8 left-0 w-full px-4 sm:px-8 lg:px-12 pointer-events-none hidden sm:block">
            <LiveTelemetryFeed />
          </div>
        )}
      </div>

      <div className={`${mobileStage === "canvas" ? "w-full flex-1 flex" : "hidden lg:flex lg:w-[60%] lg:flex-1"} h-full flex-col`}>
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
      </div>

      {transitionStep === "idle" && <SystemRegistryFooter onDataPurgeTrigger={() => { handleNodeSelect(8); setPurgeState("selection"); }} />}
    </div>
  );
}
