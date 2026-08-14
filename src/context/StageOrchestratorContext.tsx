"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";

interface StageOrchestratorContextType {
  activeNodeId: number;
  activeSubModuleId: string | null;
  inspectMode: boolean;
  mobileStage: "canvas" | "system";
  selectNode: (nodeId: number, subModuleId?: string | null) => void;
  selectSubModule: (subModuleId: string | null) => void;
  resetStage: () => void;
  toggleInspectMode: (mode?: boolean) => void;
  setMobileStage: (stage: "canvas" | "system") => void;
}

const StageOrchestratorContext = createContext<StageOrchestratorContextType | undefined>(undefined);

export function StageOrchestratorProvider({ children }: { children: ReactNode }) {
  const [activeNodeId, setActiveNodeId] = useState<number>(0);
  const [activeSubModuleId, setActiveSubModuleId] = useState<string | null>(null);
  const [inspectMode, setInspectModeState] = useState<boolean>(false);
  const [mobileStage, setMobileStageState] = useState<"canvas" | "system">("canvas");

  const selectNode = useCallback((nodeId: number, subModuleId: string | null = null) => {
    setActiveNodeId(nodeId);
    setActiveSubModuleId(subModuleId);
  }, []);

  const selectSubModule = useCallback((subModuleId: string | null) => {
    setActiveSubModuleId(subModuleId);
  }, []);

  const resetStage = useCallback(() => {
    setActiveNodeId(0);
    setActiveSubModuleId(null);
  }, []);

  const toggleInspectMode = useCallback((mode?: boolean) => {
    setInspectModeState((prev) => (mode !== undefined ? mode : !prev));
  }, []);

  const setMobileStage = useCallback((stage: "canvas" | "system") => {
    setMobileStageState(stage);
  }, []);

  return (
    <StageOrchestratorContext.Provider
      value={{
        activeNodeId,
        activeSubModuleId,
        inspectMode,
        mobileStage,
        selectNode,
        selectSubModule,
        resetStage,
        toggleInspectMode,
        setMobileStage,
      }}
    >
      {children}
    </StageOrchestratorContext.Provider>
  );
}

export function useStageOrchestrator() {
  const context = useContext(StageOrchestratorContext);
  if (!context) {
    throw new Error("useStageOrchestrator must be used within StageOrchestratorProvider");
  }
  return context;
}
