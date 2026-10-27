"use client";

import React from "react";
import { motion } from "framer-motion";
import { Globe, Layers } from "lucide-react";
import { soundEngine } from "./EnneaAudioEngine";
import { EnneaStrings } from "./types";

interface EnneaMobileViewSwitcherProps {
  mode: "map" | "list";
  onSelectMode: (mode: "map" | "list") => void;
  t: EnneaStrings;
  accentColor?: string;
  className?: string;
}

export const EnneaMobileViewSwitcher: React.FC<EnneaMobileViewSwitcherProps> = ({
  mode,
  onSelectMode,
  t,
  accentColor = "#7FD4FF",
  className = "",
}) => {
  const mapLabel = t.mobileViewMap || (t.breadcrumbCountry === "საქართველო" ? "3D რუკა" : t.breadcrumbCountry === "Грузия" ? "3D Карта" : "3D Map");
  const listLabel = t.mobileViewList || (t.breadcrumbCountry === "საქართველო" ? "სია & პარტნიორები" : t.breadcrumbCountry === "Грузия" ? "Список и партнеры" : "List & Partners");

  const items: Array<{ id: "map" | "list"; label: string; icon: React.ReactNode }> = [
    {
      id: "map",
      label: mapLabel,
      icon: <Globe className="w-3.5 h-3.5" />,
    },
    {
      id: "list",
      label: listLabel,
      icon: <Layers className="w-3.5 h-3.5" />,
    },
  ];

  return (
    <div className={`relative w-full max-w-[340px] mx-auto select-none ${className}`}>
      {/* Liquid Glass Sliding Lens Dock */}
      <div className="relative flex items-center justify-between p-1 h-11 bg-[#060910]/90 backdrop-blur-xl border border-white/[0.12] rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
        {items.map((item) => {
          const isSelected = mode === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                if (!isSelected) {
                  soundEngine.cue("click");
                  onSelectMode(item.id);
                }
              }}
              aria-label={item.label}
              className="relative z-10 flex-1 h-9 px-3 rounded-full flex items-center justify-center gap-1.5 cursor-pointer select-none border-none bg-transparent transition-colors"
            >
              {/* Floating Liquid Glass Lens with Layout Transition */}
              {isSelected && (
                <motion.div
                  layoutId="enneaMobileViewLens"
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 32,
                  }}
                  className="absolute inset-0 rounded-full p-[1.5px] pointer-events-none"
                  style={{
                    background: `linear-gradient(135deg, rgba(255,255,255,0.75) 0%, ${accentColor}88 50%, rgba(255,255,255,0.35) 100%)`,
                    boxShadow: `0 4px 20px rgba(0,0,0,0.7), 0 0 18px ${accentColor}44`,
                  }}
                >
                  <div className="relative w-full h-full rounded-full bg-[#070B13]/95 backdrop-blur-xl border border-white/30 shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.85),inset_0_-1.5px_3px_rgba(0,0,0,0.7)] flex items-center justify-center overflow-hidden">
                    {/* Chromatic specular glints */}
                    <span className="absolute -top-1 right-2 w-5 h-2 bg-gradient-to-r from-cyan-300 via-white to-transparent rounded-full blur-[1px] opacity-90" />
                    <span
                      className="absolute -bottom-1 left-2 w-5 h-2 rounded-full blur-[1.5px] opacity-80"
                      style={{
                        background: `linear-gradient(90deg, ${accentColor}, transparent)`,
                      }}
                    />
                    <span className="absolute inset-0 bg-radial from-white/10 via-transparent to-transparent pointer-events-none" />

                    {/* Optical Focus Reticle Ticks */}
                    <span
                      className="absolute top-0.5 left-1/2 -translate-x-1/2 w-3 h-[1.5px] rounded-full"
                      style={{
                        backgroundColor: accentColor,
                        boxShadow: `0 0 8px ${accentColor}`,
                      }}
                    />
                    <span
                      className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-3 h-[1.5px] rounded-full"
                      style={{
                        backgroundColor: accentColor,
                        boxShadow: `0 0 8px ${accentColor}`,
                      }}
                    />
                  </div>
                </motion.div>
              )}

              {/* Button Content */}
              <span
                className={`relative z-20 flex items-center gap-1.5 font-mono text-[11.5px] font-bold tracking-wider uppercase transition-colors ${
                  isSelected ? "text-white" : "text-[#7E96A6] hover:text-white"
                }`}
              >
                <span
                  style={{
                    color: isSelected ? accentColor : "inherit",
                    filter: isSelected ? `drop-shadow(0 0 6px ${accentColor})` : "none",
                  }}
                >
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
