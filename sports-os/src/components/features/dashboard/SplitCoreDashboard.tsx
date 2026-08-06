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
  const [mobileStage, setMobileStage] = useState<"canvas" | "system">("canvas");

  const currentDisplayNode = hoveredNode !== null ? hoveredNode : activeNode;

  useDashboardEffects({ setIsMuted, transitionStep, activeNode, setPurgeState, accessTab, setTransitionStep, setSweepTrigger, setAccessTab });

  const handleTriggerScan = () => setScanTrigger((prev) => prev + 1);
  const handleNodeSelect = (index: number) => {
    audioManager.playHapticClick();
    setActiveNode(index);
    setSelectedSubItem(null);
    if (index === 9) setAccessTab("choice");
    setMobileStage("system");
  };
  const handleAccessTabChange = (tab: "login" | "request" | "choice") => { audioManager.playClick(); setAccessTab(tab); };

  const activeBtn = "bg-[#00F0FF]/20 text-[#00F0FF] border border-[#00F0FF]/60 shadow-[0_0_10px_rgba(0,240,255,0.3)] font-bold";
  const idleBtn = "bg-black/50 text-gray-400 border border-gray-800 hover:text-white";

  return (
    <div className={`relative h-screen w-screen max-h-screen max-w-screen overflow-hidden flex flex-col lg:flex-row select-none transition-all duration-[1000ms] ease-expo-out box-border ${
      (transitionStep === "sweeping" || transitionStep === "console") ? "bg-black" : transitionStep === "zooming" ? "bg-[#090A0C]" : "bg-iron schematic-grid"
    }`}>
      <MuteAudioButton isMuted={isMuted} transitionStep={transitionStep} />
      <LanguageToggle />
      <ScanLine trigger={scanTrigger} />
      <div className={`fade-to-black-overlay ${isFadeToBlack ? "active" : ""}`} />
      {transitionStep === "sweeping" && <div key={`sweep-${sweepTrigger}`} className="radial-sweep-ring" />}
      {transitionStep === "idle" && (
        <div className="absolute top-4 right-4 z-40 animate-fadeIn hidden lg:block">
          <GhostTrigger onAccessClick={() => handleNodeSelect(9)} />
        </div>
      )}

      {/* Mobile Stage Toggle Header (< lg) */}
      <div className="lg:hidden flex items-center justify-center gap-2 p-2 bg-[#101216]/95 border-b border-[rgba(156,163,175,0.15)] z-40 w-full shrink-0">
        <button onClick={() => setMobileStage("canvas")} className={`flex-1 max-w-[180px] py-1.5 px-3 text-[11px] font-mono rounded uppercase transition-all duration-200 cursor-pointer text-center ${mobileStage === "canvas" ? activeBtn : idleBtn}`}>
          [ 📊 CANVAS (60%) ]
        </button>
        <button onClick={() => setMobileStage("system")} className={`flex-1 max-w-[180px] py-1.5 px-3 text-[11px] font-mono rounded uppercase transition-all duration-200 cursor-pointer text-center ${mobileStage === "system" ? activeBtn : idleBtn}`}>
          [ ⚙️ SYSTEM (40%) ]
        </button>
      </div>

      <div className={`h-full flex flex-col justify-center relative overflow-hidden transition-all duration-[1000ms] ease-expo-out bg-[#1A1D23]/55 box-border ${
        transitionStep !== "idle"
          ? "w-0 opacity-0 px-0 py-0 border-r-0 pointer-events-none"
          : `${mobileStage === "system" ? "w-full flex" : "hidden lg:flex"} lg:w-[40%] px-4 sm:px-8 lg:px-12 py-6 lg:py-16 border-r border-[rgba(156,163,175,0.12)] backdrop-blur-[24px]`
      }`}>
        <div className="max-w-sm mx-auto w-full overflow-y-auto max-h-full scrollbar-thin">
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

      {transitionStep === "idle" && <SystemRegistryFooter onDataPurgeTrigger={() => { setActiveNode(8); setPurgeState("selection"); setMobileStage("system"); }} />}
    </div>
  );
}
