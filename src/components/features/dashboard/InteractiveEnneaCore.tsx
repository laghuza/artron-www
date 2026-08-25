"use client";

import { useState } from "react";
import { useI18n } from "@/context/I18nContext";
import { useStageOrchestrator } from "@/context/StageOrchestratorContext";
import { ARTRON_DESIGN_SYSTEM } from "@/config/theme.config";

interface InteractiveEnneaCoreProps {
  activeNode: number;
  onNodeSelect: (index: number) => void;
  onNodeHover: (index: number | null) => void;
  isScaledUp?: boolean;
  transitionStep?: "idle" | "zooming" | "sweeping" | "console";
  isFlashActive?: boolean;
  gateHover?: "gate_a" | "gate_b" | null;
}

const COORDS = [
  { x: 200, y: 50, align: "middle" as const, tx: 200, ty: 30 },
  { x: 350, y: 50, align: "start" as const, tx: 366, ty: 45 },
  { x: 350, y: 200, align: "start" as const, tx: 366, ty: 203 },
  { x: 350, y: 350, align: "start" as const, tx: 366, ty: 360 },
  { x: 200, y: 350, align: "middle" as const, tx: 200, ty: 374 },
  { x: 50, y: 350, align: "end" as const, tx: 34, ty: 360 },
  { x: 50, y: 200, align: "end" as const, tx: 34, ty: 203 },
  { x: 50, y: 50, align: "end" as const, tx: 34, ty: 45 }
];

export default function InteractiveEnneaCore({
  activeNode,
  onNodeSelect,
  onNodeHover,
  isScaledUp = false,
  transitionStep = "idle",
  isFlashActive = false,
  gateHover = null
}: InteractiveEnneaCoreProps) {
  const { t } = useI18n();
  const orchestrator = useStageOrchestrator();
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);

  const effectiveActiveNode = orchestrator?.activeNodeId || activeNode;
  const activeTargetId = hoveredNode !== null ? hoveredNode : (effectiveActiveNode && effectiveActiveNode !== 9 ? effectiveActiveNode : null);

  const handleLeave = () => {
    setHoveredNode(null);
    onNodeHover(null);
  };

  const handleSelectNode = (id: number) => {
    if (orchestrator?.selectNode) orchestrator.selectNode(id);
    onNodeSelect(id);
  };

  const labels = [
    t("labels.node_1"), t("labels.node_2"), t("labels.node_3"), t("labels.node_4"),
    t("labels.node_5"), t("labels.node_6"), t("labels.node_7"), t("labels.node_8")
  ];
  const isCenterActive = effectiveActiveNode === 9 || hoveredNode === 9;
  const showOuter = transitionStep !== "sweeping" && transitionStep !== "console";
  const { nodes } = ARTRON_DESIGN_SYSTEM;

  return (
    <div className={`w-full flex items-center justify-center relative transition-all duration-1000 ${transitionStep === "console" ? "h-[160px] md:h-[185px]" : "h-full"}`}>
      <svg
        viewBox="0 0 400 400"
        className={`w-full max-w-[450px] aspect-square select-none cursor-pointer overflow-visible transition-all duration-[1000ms] ${
          isScaledUp ? (transitionStep === "console" ? "scale-[0.82] translate-y-[-5px]" : "scale-[1.25] translate-y-[-24px]") : "scale-100"
        }`}
        onMouseLeave={handleLeave}
      >
        <defs>
          {/* Refined Central Quantum Core Gradient */}
          <radialGradient id="artron-quantum-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00A3FF" stopOpacity="0.45" />
            <stop offset="45%" stopColor="#0066FF" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#00A3FF" stopOpacity="0" />
          </radialGradient>

          {/* Active Node Holographic Aura */}
          <radialGradient id="node-active-halo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00A3FF" stopOpacity="0.6" />
            <stop offset="60%" stopColor="#00E5FF" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#00A3FF" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Precision Telemetry Grid & Concentric Orbit Rings */}
        <g className={`transition-opacity duration-1000 stroke-[rgba(148,163,184,0.1)] stroke-[0.75] fill-none pointer-events-none ${showOuter ? "opacity-100" : "opacity-0"}`}>
          {/* Subtle Outer Enclosure Frame */}
          <line x1="50" y1="50" x2="350" y2="50" strokeDasharray="4 6" />
          <line x1="50" y1="200" x2="350" y2="200" strokeDasharray="2 4" strokeOpacity="0.6" />
          <line x1="50" y1="350" x2="350" y2="350" strokeDasharray="4 6" />
          <line x1="50" y1="50" x2="50" y2="350" strokeDasharray="4 6" />
          <line x1="200" y1="50" x2="200" y2="350" strokeDasharray="2 4" strokeOpacity="0.6" />
          <line x1="350" y1="50" x2="350" y2="350" strokeDasharray="4 6" />

          {/* Concentric Telemetry Radar Orbits */}
          <circle cx="200" cy="200" r="75" strokeDasharray="3 5" />
          <circle cx="200" cy="200" r="150" strokeDasharray="4 6" />
          <circle cx="200" cy="200" r="212" strokeDasharray="2 4" strokeOpacity="0.4" />
        </g>

        {/* Telemetry Guide Rays & Unified Inward Micro-Photons */}
        {COORDS.map((coord, i) => {
          const id = (i + 1) as keyof typeof nodes;
          const isRayActive = activeTargetId === id;
          const nodeConfig = nodes[id] || { primary: "#00A3FF", secondary: "#38BDF8" };
          const pulseDur = isRayActive ? "1.3s" : "3.4s";
          const delayBase = (i * 0.42).toFixed(2);
          const delaySecondary = (i * 0.42 + 0.65).toFixed(2);

          return (
            <g key={`ray-group-${id}`}>
              {/* Refined Guide Track */}
              <line
                x1={coord.x}
                y1={coord.y}
                x2="200"
                y2="200"
                stroke={isRayActive ? nodeConfig.primary : "rgba(148, 163, 184, 0.12)"}
                strokeWidth={isRayActive ? "1.6" : "0.75"}
                strokeDasharray={isRayActive ? undefined : "3 4"}
                strokeOpacity={isRayActive ? "0.9" : "0.3"}
                className={`transition-all duration-300 pointer-events-none ${showOuter ? "opacity-100" : "opacity-0"}`}
              />

              {/* Active Focused Laser Glow */}
              {isRayActive && (
                <line
                  x1={coord.x}
                  y1={coord.y}
                  x2="200"
                  y2="200"
                  stroke={nodeConfig.primary}
                  strokeWidth="3.5"
                  strokeOpacity="0.25"
                  className="pointer-events-none blur-[1.5px]"
                />
              )}

              {/* Primary Micro-Photon Data Stream (Harmonious Cyan/Blue) */}
              {showOuter && (
                <circle
                  r={isRayActive ? "2.6" : "1.4"}
                  fill={isRayActive ? nodeConfig.secondary : "#00A3FF"}
                  className="pointer-events-none"
                >
                  <animate
                    attributeName="cx"
                    from={coord.x}
                    to="200"
                    dur={pulseDur}
                    begin={`${delayBase}s`}
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="cy"
                    from={coord.y}
                    to="200"
                    dur={pulseDur}
                    begin={`${delayBase}s`}
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values={isRayActive ? "0;0.9;1;0.4;0" : "0;0.45;0.6;0.2;0"}
                    keyTimes="0;0.12;0.65;0.92;1"
                    dur={pulseDur}
                    begin={`${delayBase}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              )}

              {/* Active Trailing Micro-Sparkle */}
              {showOuter && isRayActive && (
                <circle
                  r="1.4"
                  fill="#FFFFFF"
                  className="pointer-events-none"
                >
                  <animate
                    attributeName="cx"
                    from={coord.x}
                    to="200"
                    dur={pulseDur}
                    begin={`${delaySecondary}s`}
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="cy"
                    from={coord.y}
                    to="200"
                    dur={pulseDur}
                    begin={`${delaySecondary}s`}
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0;0.7;0.85;0.2;0"
                    keyTimes="0;0.15;0.65;0.92;1"
                    dur={pulseDur}
                    begin={`${delaySecondary}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              )}
            </g>
          );
        })}

        {/* Central Artron Quantum Core (Node 09) */}
        <g
          onClick={() => { handleSelectNode(9); onNodeHover(9); }}
          onMouseEnter={() => { setHoveredNode(9); onNodeHover(9); }}
          onMouseLeave={() => { setHoveredNode(null); onNodeHover(null); }}
          className={!showOuter ? "animate-core-grandiose" : gateHover === "gate_a" ? "animate-core-gate-a-hover" : "transition-transform duration-300 cursor-pointer"}
          style={showOuter && gateHover !== "gate_a" ? { transform: `translate(200px, 200px)` } : {}}
        >
          {/* Hitbox & Ambient Glow Field */}
          <circle r="42" fill="transparent" className="cursor-pointer" />
          <circle r="48" fill="url(#artron-quantum-glow)" className="pointer-events-none" />
          {isFlashActive && <circle r="48" fill="#00A3FF" className="pointer-events-none animate-core-flash" />}

          {/* Precision Concentric Core Rings */}
          {[38, 28].map((r) => (
            <circle
              key={r}
              r={r}
              stroke="#00A3FF"
              strokeWidth="0.8"
              strokeDasharray={r === 38 ? "3 5" : undefined}
              className={`fill-none opacity-30 pointer-events-none ${isCenterActive ? "animate-pulse-fast" : "animate-pulse"}`}
            />
          ))}
          <circle
            r="22"
            fill="none"
            stroke="#00E5FF"
            strokeWidth="0.8"
            className={`opacity-25 pointer-events-none ${isCenterActive ? "animate-ping-fast" : "animate-ping"}`}
          />

          {/* Central Quantum Reactor Eye */}
          <g className="transition-transform duration-300" style={{ transform: isCenterActive ? "scale(1.2)" : "scale(1)" }}>
            <circle
              r="16"
              className="fill-[#0B0E14] stroke-[#00A3FF] stroke-[1.2] transition-colors duration-300"
              style={{ fillOpacity: 0.95 }}
            />
            <circle r="6" fill="#00E5FF" className="transition-all duration-300" />
            <circle r="2.5" fill="#FFFFFF" />
          </g>

          <text
            y="-24"
            textAnchor="middle"
            className={`font-mono text-[7px] tracking-[1.5px] font-bold fill-[#00E5FF] transition-opacity duration-300 cursor-pointer ${
              isCenterActive && showOuter ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            09 // {nodes[9]?.name || "CORE"}
          </text>
        </g>

        {/* 8 Outer Unified High-Tech Telemetry Nodes */}
        {COORDS.map((coord, i) => {
          const id = (i + 1) as keyof typeof nodes;
          const isAct = activeTargetId === id;
          const nodeConfig = nodes[id] || { primary: "#00A3FF", secondary: "#38BDF8" };
          const label = labels[i];

          return (
            <g
              key={id}
              transform={`translate(${coord.x}, ${coord.y})`}
              onClick={() => { handleSelectNode(id); onNodeHover(id); }}
              onMouseEnter={() => { setHoveredNode(id); onNodeHover(id); }}
              onMouseLeave={() => { setHoveredNode(null); onNodeHover(null); }}
              className={`transition-opacity duration-1000 cursor-pointer ${showOuter ? "opacity-100" : "opacity-0 pointer-events-none"}`}
            >
              {/* Invisible touch/hover target */}
              <circle r="22" fill="transparent" className="cursor-pointer" />

              {/* Active Pulsing Radar Halo */}
              {isAct && (
                <circle
                  r="14"
                  fill="url(#node-active-halo)"
                  className="pointer-events-none animate-pulse"
                />
              )}
              {isAct && (
                <circle
                  r="11"
                  fill="none"
                  stroke={nodeConfig.primary}
                  strokeWidth="1.0"
                  className="animate-ping opacity-35 pointer-events-none"
                />
              )}

              {/* Node Geometry & Reticle */}
              <g className="transition-transform duration-300" style={{ transform: isAct ? "scale(1.25)" : "scale(1)" }}>
                {/* Outer Reticle Ring */}
                <circle
                  r="5"
                  fill={isAct ? "rgba(0, 163, 255, 0.2)" : "rgba(18, 20, 24, 0.85)"}
                  stroke={isAct ? nodeConfig.primary : "rgba(0, 163, 255, 0.35)"}
                  strokeWidth={isAct ? "1.4" : "0.9"}
                  className="transition-all duration-300"
                />
                {/* Center Precision Pin */}
                <circle
                  r={isAct ? "2.2" : "1.6"}
                  fill={isAct ? "#FFFFFF" : "rgba(148, 163, 184, 0.6)"}
                  className="transition-all duration-300"
                />
              </g>

              {/* Node Telemetry Typography */}
              <text
                x={coord.tx - coord.x}
                y={coord.ty - coord.y}
                textAnchor={coord.align}
                fill={isAct ? "#FFFFFF" : "#94A3B8"}
                className={`font-mono text-[10.5px] uppercase tracking-[1.2px] transition-colors duration-300 cursor-pointer ${
                  isAct ? "font-bold drop-shadow-[0_0_8px_rgba(0,163,255,0.6)]" : "font-normal hover:fill-[#CBD5E1]"
                }`}
              >
                {label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

