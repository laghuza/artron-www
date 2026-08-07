"use client";

import { useStageOrchestrator } from "@/context/StageOrchestratorContext";

export default function MobileStageDock() {
  const { mobileStage, setMobileStage } = useStageOrchestrator();

  const activeBtn =
    "bg-[#1A1D23] text-[#00E676] border border-[#00E676] shadow-[0_0_8px_rgba(0,230,118,0.12)] font-medium";
  const idleBtn =
    "bg-[#121418] text-[#9CA3AF] border border-[#9CA3AF]/18 hover:text-[#F5F5F3] hover:bg-[#232730]";

  return (
    <div className="lg:hidden block fixed bottom-4 inset-x-0 mx-auto z-50 w-fit bg-[#1A1D23]/90 backdrop-blur-md border border-[#9CA3AF]/18 p-1.5 rounded-md flex gap-2 shadow-[0_0_8px_rgba(0,230,118,0.12)]">
      <button
        onClick={() => setMobileStage("canvas")}
        className={`py-1.5 px-3 text-[10px] font-mono rounded-sm uppercase transition-colors duration-200 cursor-pointer ${
          mobileStage === "canvas" ? activeBtn : idleBtn
        }`}
      >
        [ CANVAS_STAGE ]
      </button>
      <button
        onClick={() => setMobileStage("system")}
        className={`py-1.5 px-3 text-[10px] font-mono rounded-sm uppercase transition-colors duration-200 cursor-pointer ${
          mobileStage === "system" ? activeBtn : idleBtn
        }`}
      >
        [ SYSTEM_STAGE ]
      </button>
    </div>
  );
}
