import { useState, useEffect } from "react";
import InteractiveEnneaCore from "./InteractiveEnneaCore";
import DefaultNarrative from "./narratives/DefaultNarrative";
import FederationsNarrative from "./narratives/FederationsNarrative";
import ClubsBlueprintNarrative from "./narratives/ClubsBlueprintNarrative";
import IotTelemetryNarrative from "./narratives/IotTelemetryNarrative";
import MobileOSNarrative from "./narratives/MobileOSNarrative";
import PartnersIntegrationsNarrative from "./narratives/PartnersIntegrationsNarrative";
import CoreTeamCareersNarrative from "./narratives/CoreTeamCareersNarrative";
import AboutUsNarrative from "./narratives/AboutUsNarrative";
import SlaSecurityNarrative from "./narratives/SlaSecurityNarrative";
import PurgeNarrative from "./narratives/PurgeNarrative";
import AccessFormNarrative from "./narratives/AccessFormNarrative";
import SystemRegistryFooter from "./SystemRegistryFooter";
import ScanLine from "./ScanLine";
import LiveTelemetryFeed from "./LiveTelemetryFeed";
import { audioManager } from "@/utils/audioManager";

export default function SplitCoreDashboard() {
  const [activeNode, setActiveNode] = useState<number>(7); // Default is Node 07 About Us
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);
  const [accessTab, setAccessTab] = useState<"login" | "request" | "choice">("choice");
  const [isFlashActive, setIsFlashActive] = useState<boolean>(false);
  const [sweepTrigger, setSweepTrigger] = useState<number>(0);
  const [isFadeToBlack, setIsFadeToBlack] = useState<boolean>(false);
  const [transitionStep, setTransitionStep] = useState<"idle" | "zooming" | "sweeping" | "console">("idle");
  const [purgeState, setPurgeState] = useState<"none" | "selection" | "tenant" | "athlete" | "tenant-success" | "athlete-success">("none");
  const [gateHover, setGateHover] = useState<"gate_a" | "gate_b" | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(true);

  // Subscribe to audioManager state
  useEffect(() => {
    setIsMuted(audioManager.isMuted());
    const unsubscribe = audioManager.subscribe((muted) => {
      setIsMuted(muted);
    });
    return unsubscribe;
  }, []);

  // Reset states on node transition
  useEffect(() => {
    if (activeNode !== 8) {
      setPurgeState("none");
    }
    if (activeNode !== 9) {
      setTransitionStep((prev) => (prev !== "idle" ? "idle" : prev));
      setAccessTab((prev) => (prev !== "choice" ? "choice" : prev));
    }
  }, [activeNode]);

  const handleResetDashboard = () => {
    setActiveNode(7); // Return to core Node 07
    setAccessTab("choice");
    setPurgeState("none");
  };

  const getSystemBorderColor = () => {
    if (activeNode === 8 && purgeState !== "none") return "border-[#FF3D00]/25";
    if (activeNode === 9) return "border-[#00E676]/25";
    return "border-[#9CA3AF]/10";
  };

  return (
    <div className="relative w-screen h-screen bg-[#121418] text-[#F5F5F7] overflow-hidden flex flex-col justify-between selection:bg-[#00E676] selection:text-[#121418]">
      <ScanLine />

      {/* TOP-LEFT AUDIO CONTROLLER WIDGET */}
      <div className="absolute top-4 left-6 z-50 flex items-center gap-2 font-mono text-[9px] tracking-widest text-[#00E676]/60">
        <button 
          onClick={() => audioManager.setMuted(!isMuted)} 
          className="hover:text-white cursor-pointer transition-colors focus:outline-none"
        >
          {isMuted ? '[ AUDIO_MUTED ]' : '[ AUDIO_ACTIVE ]'}
        </button>
        {!isMuted && (
          <div className="audio-wave playing">
            <span className="audio-bar" />
            <span className="audio-bar" />
            <span className="audio-bar" />
          </div>
        )}
      </div>

      {/* Main Split Grid - Centralized Bounded Container to enforce mathematical proportions */}
      <div className="flex-1 w-full flex justify-center bg-[#121418] schematic-grid border-b border-[#9CA3AF]/10">
        <main className="w-full max-w-[1440px] grid grid-cols-1 md:grid-cols-[40%_60%] gap-0 overflow-hidden relative">
          
          {/* LEFT PANEL */}
          <section className={`flex flex-col justify-center px-8 md:px-16 py-12 relative border-r transition-colors duration-1000 ${getSystemBorderColor()}`}>
            <div className="max-w-md w-full mx-auto">
              {activeNode === 1 && <FederationsNarrative />}
              {activeNode === 2 && <ClubsBlueprintNarrative />}
              {activeNode === 3 && <IotTelemetryNarrative />}
              {activeNode === 4 && <MobileOSNarrative />}
              {activeNode === 5 && <PartnersIntegrationsNarrative />}
              {activeNode === 6 && <CoreTeamCareersNarrative />}
              {activeNode === 7 && <AboutUsNarrative />}
              
              {activeNode === 8 && (
                purgeState === "none" ? (
                  <SlaSecurityNarrative onDataPurgeTrigger={() => setPurgeState("selection")} />
                ) : (
                  <PurgeNarrative purgeState={purgeState} setPurgeState={setPurgeState} />
                )
              )}

              {activeNode === 9 && (
                <AccessFormNarrative 
                  onReset={handleResetDashboard}
                  accessTab={accessTab}
                  setAccessTab={setAccessTab}
                  sweepTrigger={sweepTrigger}
                  setSweepTrigger={setSweepTrigger}
                  setTransitionStep={setTransitionStep}
                  transitionStep={transitionStep}
                  setIsFlashActive={setIsFlashActive}
                  setIsFadeToBlack={setIsFadeToBlack}
                  onHoverGate={setGateHover}
                />
              )}
            </div>
          </section>

          {/* RIGHT PANEL - CYBERNETIC ENNEA CORE */}
          <section className="flex flex-col justify-center items-center relative p-8 md:p-12">
            <InteractiveEnneaCore 
              activeNode={activeNode}
              onNodeSelect={(index) => setActiveNode(index)}
              onNodeHover={(index) => setHoveredNode(index)}
              isScaledUp={activeNode === 9}
              transitionStep={transitionStep}
              isFlashActive={isFlashActive}
              gateHover={gateHover}
            />
          </section>
        </main>
      </div>

      {/* BOTTOM TELEMETRY MARQUEE FEED */}
      <div className="w-full bg-black/10">
        <LiveTelemetryFeed />
      </div>

      {/* FOOTER */}
      <SystemRegistryFooter onDataPurgeTrigger={() => { setActiveNode(8); setPurgeState("selection"); }} />
    </div>
  );
}
