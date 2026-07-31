"use client";

import { useEffect } from "react";
import { audioManager } from "@/lib/audioManager";

interface UseDashboardEffectsProps {
  setIsMuted: (muted: boolean) => void;
  transitionStep: "idle" | "zooming" | "sweeping" | "console";
  activeNode: number;
  setPurgeState: (state: any) => void;
  accessTab: "login" | "request" | "choice";
  setTransitionStep: React.Dispatch<React.SetStateAction<"idle" | "zooming" | "sweeping" | "console">>;
  setSweepTrigger: React.Dispatch<React.SetStateAction<number>>;
  setAccessTab: React.Dispatch<React.SetStateAction<"login" | "request" | "choice">>;
}

export function useDashboardEffects({
  setIsMuted,
  transitionStep,
  activeNode,
  setPurgeState,
  accessTab,
  setTransitionStep,
  setSweepTrigger,
  setAccessTab,
}: UseDashboardEffectsProps) {
  useEffect(() => {
    setIsMuted(audioManager.isMuted());
    const unsubscribe = audioManager.subscribe((muted: boolean) => {
      setIsMuted(muted);
    });
    return unsubscribe;
  }, [setIsMuted]);

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
  }, [activeNode, setPurgeState]);

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
  }, [activeNode, accessTab, transitionStep, setTransitionStep, setSweepTrigger, setAccessTab]);
}
