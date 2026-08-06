"use client";

import { useStageOrchestrator } from "@/context/StageOrchestratorContext";

export default function MobileStageDock() {
  const { mobileStage, setMobileStage } = useStageOrchestrator();

  const activeBtn =
    "bg-[#00F0FF]/20 text-[#00F0FF] border border-[#00F0FF]/60 shadow-[0_0_10px_rgba(0,240,255,0.3)] font-bold";
  const idleBtn =
    "bg-black/50 text-gray-400 border border-gray-800 hover:text-white";

  return (
    <div className="lg:hidden block fixed bottom-4 inset-x-0 mx-auto z-50 w-fit bg-[#05070a]/90 backdrop-blur-md border border-[#161b26] p-1.5 rounded-full flex gap-2 shadow-[0_0_20px_rgba(0,255,135,0.2)]">
      <button
        onClick={() => setMobileStage("canvas")}
        className={`py-1.5 px-3 text-[11px] font-mono rounded-full uppercase transition-all duration-200 cursor-pointer ${
          mobileStage === "canvas" ? activeBtn : idleBtn
        }`}
      >
        [ 📊 CANVAS ]
      </button>
      <button
        onClick={() => setMobileStage("system")}
        className={`py-1.5 px-3 text-[11px] font-mono rounded-full uppercase transition-all duration-200 cursor-pointer ${
          mobileStage === "system" ? activeBtn : idleBtn
        }`}
      >
        [ ⚙️ SYSTEM ]
      </button>
    </div>
  );
}
