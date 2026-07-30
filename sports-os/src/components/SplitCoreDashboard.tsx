"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { audioManager } from "@/utils/audioManager";
import InteractiveEnneaCore from "./InteractiveEnneaCore";
import DefaultNarrative from "./narratives/DefaultNarrative";
import FederationsNarrative from "./narratives/FederationsNarrative";
import ClubsBlueprintNarrative from "./narratives/ClubsBlueprintNarrative";
import ProfessionalsModulesNarrative from "./narratives/ProfessionalsModulesNarrative";
import MobileOSNarrative from "./narratives/MobileOSNarrative";
import GamificationNarrative from "./narratives/GamificationNarrative";
import MarketplaceNarrative from "./narratives/MarketplaceNarrative";
import AnalyticsNarrative from "./narratives/AnalyticsNarrative";
import SlaSecurityNarrative from "./narratives/SlaSecurityNarrative";
import PurgeNarrative from "./narratives/PurgeNarrative";
import AccessFormNarrative from "./narratives/AccessFormNarrative";
import CinematicLoginConsole from "./narratives/CinematicLoginConsole";
import SystemRegistryFooter from "./SystemRegistryFooter";
import GhostTrigger from "./GhostTrigger";
import ScanLine from "./ScanLine";
import LiveTelemetryFeed from "./LiveTelemetryFeed";


const GLOW_COLORS: Record<number, string> = {
  1: "#0F52BA", 2: "#00E676", 3: "#D97736", 4: "#00E676",
  5: "#D4AF37", 6: "#D97736", 7: "#9CA3AF", 8: "#9CA3AF", 9: "#00E676",
};

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

  const currentDisplayNode = hoveredNode !== null ? hoveredNode : activeNode;

  useEffect(() => {
    setIsMuted(audioManager.isMuted());
    const unsubscribe = audioManager.subscribe((muted) => {
      setIsMuted(muted);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (transitionStep !== "idle") {
      audioManager.startHum();
    } else {
      audioManager.stopHum();
    }
    return () => {
      audioManager.stopHum();
    };
  }, [transitionStep]);

  useEffect(() => {
    if (activeNode !== 8) {
      setPurgeState("none");
    }
  }, [activeNode]);

  useEffect(() => {
    let t1: any;
    let t2: any;

    if (activeNode === 9 && accessTab === "login") {
      if (transitionStep === "idle") {
        setTransitionStep("zooming");
        t1 = setTimeout(() => {
          setTransitionStep("sweeping");
          setSweepTrigger((prev) => prev + 1);
          t2 = setTimeout(() => {
            setTransitionStep("console");
          }, 1400);
        }, 1000);
      }
    } else if (activeNode !== 9) {
      setTransitionStep((prev) => (prev !== "idle" ? "idle" : prev));
      setAccessTab((prev) => (prev !== "choice" ? "choice" : prev));
    }

    return () => {
      if (t1) clearTimeout(t1);
      if (t2) clearTimeout(t2);
    };
  }, [activeNode, accessTab]);

  const handleTriggerScan = () => setScanTrigger((prev) => prev + 1);

  const handleNodeSelect = (index: number) => {
    audioManager.playHapticClick();
    setActiveNode(index);
    if (index === 9) setAccessTab("choice");
  };

  const handleAccessTabChange = (tab: "login" | "request" | "choice") => {
    audioManager.playClick();
    setAccessTab(tab);
  };

  const renderLeftPanel = () => {
    switch (currentDisplayNode) {
      case 1: return <FederationsNarrative onBack={() => handleNodeSelect(0)} />;
      case 2: return <ClubsBlueprintNarrative onBack={() => handleNodeSelect(0)} />;
      case 3: return <ProfessionalsModulesNarrative onBack={() => handleNodeSelect(0)} />;
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
      default: return <DefaultNarrative onRequestAccess={() => handleNodeSelect(9)} />;
    }
  };

  return (
    <div className={`relative h-screen w-screen max-h-screen max-w-screen overflow-hidden flex flex-col md:flex-row select-none transition-all duration-[1000ms] ease-expo-out box-border ${(transitionStep === "sweeping" || transitionStep === "console")
        ? "bg-black"
        : transitionStep === "zooming"
          ? "bg-[#090A0C]"
          : "bg-iron schematic-grid"
      }`}>
      {/* Floating Mute Control */}
      <button
        onClick={() => {
          audioManager.playClick();
          audioManager.toggleMute();
        }}
        className="fixed top-4 left-6 z-50 font-mono text-[9px] uppercase tracking-[0.2em] text-silver-structure/45 hover:text-white border border-silver-structure/10 hover:border-emerald-core/45 bg-iron-surface/40 hover:bg-iron-surface/90 px-3 py-1.5 rounded backdrop-blur-[6px] transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-[0_4px_12px_rgba(0,0,0,0.5)] group animate-fadeIn"
      >
        <div className={`audio-wave ${(!isMuted && transitionStep !== "idle") ? "playing" : ""}`}>
          <span className="audio-bar h-1.5" style={{ backgroundColor: isMuted ? "#9CA3AF" : "#00E676" }} />
          <span className="audio-bar h-2.5" style={{ backgroundColor: isMuted ? "#9CA3AF" : "#00E676" }} />
          <span className="audio-bar h-2" style={{ backgroundColor: isMuted ? "#9CA3AF" : "#00E676" }} />
        </div>
        <span>[ {isMuted ? "AUDIO_MUTED" : "AUDIO_ON"} ]</span>
      </button>

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
          {transitionStep === "idle" && renderLeftPanel()}
        </div>

        {/* Live Telemetry Feed */}
        {transitionStep === "idle" && (
          <div className="absolute bottom-8 left-0 w-full px-8 md:px-12 pointer-events-none">
            <LiveTelemetryFeed />
          </div>
        )}
      </div>


      <div className={`flex-1 h-full flex flex-col items-center justify-center relative p-6 md:p-12 z-20 transition-all duration-[1000ms] ease-expo-out ${activeNode === 9 && accessTab === "request" ? "opacity-40" : ""
        }`}>
        <div
          className="absolute w-[450px] h-[450px] rounded-full blur-[120px] opacity-10 transition-all duration-1000 pointer-events-none z-0"
          style={{ backgroundColor: GLOW_COLORS[currentDisplayNode] || "transparent" }}
        />
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
          <InteractiveEnneaCore
            activeNode={activeNode}
            onNodeSelect={handleNodeSelect}
            onNodeHover={setHoveredNode}
            isScaledUp={transitionStep !== "idle"}
            transitionStep={transitionStep}
            isFlashActive={isFlashActive}
            gateHover={gateHover}
          />
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

      {transitionStep === "idle" && <SystemRegistryFooter onDataPurgeTrigger={() => { setActiveNode(8); setPurgeState("selection"); }} />}
    </div>
  );
}
