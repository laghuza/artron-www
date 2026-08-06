"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";

interface StageOrchestratorContextType {
  activeNodeId: number;
  activeSubModuleId: string | null;
  inspectMode: boolean;
  selectNode: (nodeId: number, subModuleId?: string | null) => void;
  selectSubModule: (subModuleId: string | null) => void;
  toggleInspectMode: (mode?: boolean) => void;
}

const StageOrchestratorContext = createContext<StageOrchestratorContextType | undefined>(undefined);

export function StageOrchestratorProvider({ children }: { children: ReactNode }) {
  const [activeNodeId, setActiveNodeId] = useState<number>(0);
  const [activeSubModuleId, setActiveSubModuleId] = useState<string | null>(null);
  const [inspectMode, setInspectModeState] = useState<boolean>(false);

  const selectNode = useCallback((nodeId: number, subModuleId: string | null = null) => {
    setActiveNodeId(nodeId);
    setActiveSubModuleId(subModuleId);
  }, []);

  const selectSubModule = useCallback((subModuleId: string | null) => {
    setActiveSubModuleId(subModuleId);
  }, []);

  const toggleInspectMode = useCallback((mode?: boolean) => {
    setInspectModeState((prev) => (mode !== undefined ? mode : !prev));
  }, []);

  return (
    <StageOrchestratorContext.Provider
      value={{
        activeNodeId,
        activeSubModuleId,
        inspectMode,
        selectNode,
        selectSubModule,
        toggleInspectMode,
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
