"use client";

import { useState } from "react";
import { useI18n } from "@/context/I18nContext";
import { useStageOrchestrator } from "@/context/StageOrchestratorContext";
import { ARTRON_DESIGN_SYSTEM } from "@/config/theme.config";

interface InteractiveEnneaCoreProps {
  activeNode: number; onNodeSelect: (index: number) => void; onNodeHover: (index: number | null) => void;
  isScaledUp?: boolean; transitionStep?: "idle" | "zooming" | "sweeping" | "console"; isFlashActive?: boolean; gateHover?: "gate_a" | "gate_b" | null;
}

const COORDS = [
  { x: 200, y: 50, align: "middle" as const, tx: 200, ty: 30 }, { x: 350, y: 50, align: "start" as const, tx: 364, ty: 45 },
  { x: 350, y: 200, align: "start" as const, tx: 364, ty: 203 }, { x: 350, y: 350, align: "start" as const, tx: 364, ty: 358 },
  { x: 200, y: 350, align: "middle" as const, tx: 200, ty: 372 }, { x: 50, y: 350, align: "end" as const, tx: 36, ty: 358 },
  { x: 50, y: 200, align: "end" as const, tx: 36, ty: 203 }, { x: 50, y: 50, align: "end" as const, tx: 36, ty: 45 }
];

export default function InteractiveEnneaCore({
  activeNode, onNodeSelect, onNodeHover, isScaledUp = false, transitionStep = "idle", isFlashActive = false, gateHover = null
}: InteractiveEnneaCoreProps) {
  const { t } = useI18n();
  const orchestrator = useStageOrchestrator();
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);

  const effectiveActiveNode = orchestrator?.activeNodeId || activeNode;
  const activeTargetId = hoveredNode !== null ? hoveredNode : (effectiveActiveNode && effectiveActiveNode !== 9 ? effectiveActiveNode : null);

  const handleLeave = () => { setHoveredNode(null); onNodeHover(null); };
  const handleSelectNode = (id: number) => {
    if (orchestrator?.selectNode) orchestrator.selectNode(id);
    onNodeSelect(id);
  };

  const labels = [t("labels.node_1"), t("labels.node_2"), t("labels.node_3"), t("labels.node_4"), t("labels.node_5"), t("labels.node_6"), t("labels.node_7"), t("labels.node_8")];
  const isCenterActive = effectiveActiveNode === 9 || hoveredNode === 9;
  const showOuter = transitionStep !== "sweeping" && transitionStep !== "console";
  const { nodes, connectors } = ARTRON_DESIGN_SYSTEM;

  return (
    <div className={`w-full flex items-center justify-center relative transition-all duration-1000 ${transitionStep === "console" ? "h-[160px] md:h-[185px]" : "h-full"}`}>
      <svg viewBox="0 0 400 400" className={`w-full max-w-[450px] aspect-square select-none cursor-pointer overflow-visible transition-all duration-[1000ms] ${isScaledUp ? (transitionStep === "console" ? "scale-[0.82] translate-y-[-5px]" : "scale-[1.25] translate-y-[-24px]") : "scale-100"}`} onMouseLeave={handleLeave}>
        <defs>
          <radialGradient id="raw-jade-core-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={nodes[9].secondary} stopOpacity="0.6" />
            <stop offset="50%" stopColor={nodes[9].primary} stopOpacity="0.25" />
            <stop offset="100%" stopColor={nodes[9].primary} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Monochromatic Biophilic Telemetry Grid & Concentric Rings */}
        <g className={`transition-opacity duration-1000 stroke-[rgba(156,163,175,0.12)] stroke-[0.8] fill-none pointer-events-none ${showOuter ? "opacity-100" : "opacity-0"}`}>
          <line x1="50" y1="50" x2="350" y2="50" /><line x1="50" y1="200" x2="350" y2="200" /><line x1="50" y1="350" x2="350" y2="350" />
          <line x1="50" y1="50" x2="50" y2="350" /><line x1="200" y1="50" x2="200" y2="350" /><line x1="350" y1="50" x2="350" y2="350" />
          <circle cx="200" cy="200" r="75" /><circle cx="200" cy="200" r="150" /><circle cx="200" cy="200" r="212" />
        </g>

        {/* Connector Rays: Default stroke rgba(108, 122, 137, 0.2). Active: ONLY 1 ray lights up with node primary color */}
        {COORDS.map((coord, i) => {
          const id = (i + 1) as keyof typeof nodes;
          const isRayActive = activeTargetId === id;
          const nodeConfig = nodes[id];
          return (
            <g key={`ray-group-${id}`}>
              {isRayActive && (
                <line x1="200" y1="200" x2={coord.x} y2={coord.y} stroke={nodeConfig.primary} strokeWidth="3" strokeOpacity="0.3" className="pointer-events-none blur-[1px]" />
              )}
              <line
                key={`line-${id}`}
                x1="200" y1="200" x2={coord.x} y2={coord.y}
                stroke={isRayActive ? nodeConfig.primary : connectors.defaultStroke}
                strokeWidth={isRayActive ? connectors.activeStrokeWidth : "0.8px"}
                className={`transition-all duration-300 ${showOuter ? "opacity-100" : "opacity-0 pointer-events-none"}`}
              />
            </g>
          );
        })}

        {/* Active Ray Telemetry Data Packet */}
        {showOuter && activeTargetId && activeTargetId !== 9 && (
          <circle r="2.5" fill={nodes[activeTargetId as keyof typeof nodes]?.secondary || "#52B788"} className="pointer-events-none">
            <animate attributeName="cx" from="200" to={COORDS[activeTargetId - 1].x} dur="0.9s" repeatCount="indefinite" />
            <animate attributeName="cy" from="200" to={COORDS[activeTargetId - 1].y} dur="0.9s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="1;0.9;0.1" keyTimes="0;0.7;1" dur="0.9s" repeatCount="indefinite" />
          </circle>
        )}

        {/* Always-Active Central Raw Jade Core (Node 09) */}
        <g onClick={() => { handleSelectNode(9); onNodeHover(9); }} onMouseEnter={() => { setHoveredNode(9); onNodeHover(9); }} onMouseLeave={() => { setHoveredNode(null); onNodeHover(null); }} className={!showOuter ? "animate-core-grandiose" : gateHover === "gate_a" ? "animate-core-gate-a-hover" : "transition-transform duration-300 cursor-pointer"} style={showOuter && gateHover !== "gate_a" ? { transform: `translate(200px, 200px)` } : {}}>
          <circle r="40" fill="transparent" className="cursor-pointer" />
          <circle r="48" fill="url(#raw-jade-core-glow)" className="pointer-events-none" />
          {isFlashActive && <circle r="48" fill={nodes[9].secondary} className="pointer-events-none animate-core-flash" />}
          {[38, 28].map((r) => <circle key={r} r={r} stroke={nodes[9].primary} strokeWidth="0.8" className={`fill-none opacity-35 pointer-events-none ${isCenterActive ? "animate-pulse-fast" : "animate-pulse"}`} />)}
          <circle r="22" fill="none" stroke={nodes[9].secondary} strokeWidth="0.8" className={`opacity-30 pointer-events-none ${isCenterActive ? "animate-ping-fast" : "animate-ping"}`} />
          <g className="transition-transform duration-300" style={{ transform: isCenterActive ? "scale(1.2)" : "scale(1)" }}>
            <circle r="16" className="fill-[#121418] stroke-[#40916C] stroke-[1.2] transition-colors duration-300" style={{ fillOpacity: 0.95 }} />
            <circle r="6" fill={nodes[9].secondary} />
          </g>
          <text y="-22" textAnchor="middle" className={`font-mono text-[6px] tracking-wider fill-[#52B788] transition-opacity duration-300 cursor-pointer ${isCenterActive && showOuter ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
            09 // {nodes[9].name}
          </text>
        </g>

        {/* 8 Outer Biophilic Mineral Radar Nodes */}
        {COORDS.map((coord, i) => {
          const id = (i + 1) as keyof typeof nodes;
          const isAct = activeTargetId === id;
          const nodeConfig = nodes[id];
          const label = labels[i];
          return (
            <g key={id} transform={`translate(${coord.x}, ${coord.y})`} onClick={() => { handleSelectNode(id); onNodeHover(id); }} onMouseEnter={() => { setHoveredNode(id); onNodeHover(id); }} onMouseLeave={() => { setHoveredNode(null); onNodeHover(null); }} className={`transition-opacity duration-1000 cursor-pointer ${showOuter ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
              <circle r="20" fill="transparent" className="cursor-pointer" />
              {isAct && <circle r="14" fill={nodeConfig.primary} fillOpacity="0.25" className="pointer-events-none animate-pulse" />}
              {isAct && <circle r="10" fill="none" stroke={nodeConfig.secondary} strokeWidth="1.0" className="animate-ping opacity-40 pointer-events-none" />}
              <g className="transition-transform duration-300" style={{ transform: isAct ? "scale(1.3)" : "scale(1)" }}>
                <circle r="3.5" fill={isAct ? nodeConfig.primary : "rgba(156, 163, 175, 0.2)"} stroke={isAct ? nodeConfig.secondary : "rgba(156, 163, 175, 0.4)"} strokeWidth="1.2" className="transition-all duration-300" />
              </g>
              <text x={coord.tx - coord.x} y={coord.ty - coord.y} textAnchor={coord.align} fill={isAct ? "#F5F5F3" : "#6B7280"} className={`font-mono text-[11px] uppercase tracking-wider transition-colors duration-300 cursor-pointer ${isAct ? "font-bold" : "font-normal"}`}>
                {label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
