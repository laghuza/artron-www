'use client';

import React, { useRef, useState, useCallback } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { PassportData } from './mirrorTypes';
import { MirrorIcon } from './MirrorIcon';

interface MirrorClickableSpecTilesProps {
  passport: PassportData;
  activePillId: string;
  activeTileIndex?: number;
  onSelectTile?: (index: number) => void;
  playTactileClick: () => void;
}

interface SpecTileItem {
  id: number;
  label: string;
  value: string;
  detail: string;
  icon: string;
  isHighlight?: boolean;
}

interface SpecTileCardProps {
  tile: SpecTileItem;
  isActive: boolean;
  onClick: () => void;
}

const SpecTileCard: React.FC<SpecTileCardProps> = ({ tile, isActive, onClick }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Exact pixel mouse coordinates inside the card for 60 FPS spotlight tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Dynamic spotlight background matching brand tokens & active/highlight status
  const spotlightBg = useTransform([mouseX, mouseY], ([x, y]) => {
    if (isActive) {
      return `radial-gradient(280px circle at ${x}px ${y}px, rgba(0, 229, 255, 0.25), rgba(0, 163, 255, 0.08) 42%, transparent 75%)`;
    }
    if (tile.isHighlight) {
      return `radial-gradient(280px circle at ${x}px ${y}px, rgba(16, 185, 129, 0.22), rgba(0, 229, 255, 0.07) 42%, transparent 75%)`;
    }
    return `radial-gradient(280px circle at ${x}px ${y}px, rgba(0, 163, 255, 0.20), rgba(0, 229, 255, 0.06) 42%, transparent 75%)`;
  });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    },
    [mouseX, mouseY]
  );

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  return (
    <motion.div
      ref={cardRef}
      role="button"
      tabIndex={0}
      aria-pressed={isActive}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileHover={{ y: -3, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      className={`
        group relative overflow-hidden rounded-2xl p-4 sm:p-5 flex flex-col justify-between min-h-[145px] sm:min-h-[160px] cursor-pointer transition-all duration-300 select-none
        backdrop-blur-xl border
        ${
          isActive
            ? 'border-[#00E5FF] bg-[#00E5FF]/[0.06] shadow-[0_0_25px_rgba(0,229,255,0.22)] hover:shadow-[0_0_32px_rgba(0,229,255,0.32)]'
            : 'bg-[#0B101B]/80 border-white/10 hover:border-[#00E5FF]/40 hover:bg-[#0D1524]/90 hover:shadow-[0_8px_24px_rgba(0,163,255,0.16)]'
        }
      `}
    >
      {/* Dynamic Cursor-Following Radial Spotlight Glow */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl transition-opacity duration-300 z-0"
        style={{
          opacity: isHovered ? 1 : 0,
          background: spotlightBg,
        }}
        aria-hidden="true"
      />

      {/* Subtle Top-Rim Light Beam */}
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent group-hover:via-[#00E5FF]/50 transition-all duration-500 z-10" />

      {/* Content wrapper with z-10 ensuring text remains crystal clear */}
      <div className="relative z-10 flex flex-col justify-between h-full w-full">
        {/* Top Row: Icon Badge + Label + Active Indicator Dot */}
        <div className="flex items-center justify-between gap-2 w-full">
          <div className="flex items-center gap-2.5 min-w-0">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                isActive
                  ? 'bg-[#00E5FF]/20 text-[#00E5FF] shadow-[0_0_12px_rgba(0,229,255,0.35)]'
                  : 'bg-white/[0.06] text-slate-400 group-hover:bg-[#00E5FF]/15 group-hover:text-[#00E5FF] group-hover:shadow-[0_0_10px_rgba(0,229,255,0.2)]'
              }`}
            >
              <MirrorIcon name={tile.icon} isActive={isActive} size={15} />
            </div>
            <span
              className={`text-[11px] sm:text-xs font-mono uppercase tracking-wider font-semibold truncate transition-colors duration-200 ${
                isActive
                  ? 'text-[#00E5FF]'
                  : tile.isHighlight
                  ? 'text-[#10B981] group-hover:text-[#34D399]'
                  : 'text-slate-400 group-hover:text-slate-200'
              }`}
            >
              {tile.label}
            </span>
          </div>

          {/* Top Right Active Glowing Dot */}
          <div className="shrink-0 flex items-center justify-center w-3 h-3">
            {isActive && (
              <motion.span
                layoutId="activeSpecTileDot"
                className="w-2 h-2 rounded-full bg-[#00E5FF] shadow-[0_0_10px_#00E5FF]"
              />
            )}
          </div>
        </div>

        {/* Middle: Bold White Title */}
        <div className="mt-3 mb-2">
          <h4
            className={`text-sm sm:text-[15px] font-bold tracking-tight leading-snug line-clamp-2 transition-colors duration-200 ${
              isActive ? 'text-white' : 'text-slate-100 group-hover:text-white'
            }`}
          >
            {tile.value}
          </h4>
        </div>

        {/* Bottom: Context Detail */}
        <div>
          <p className="text-xs text-slate-400 leading-relaxed line-clamp-2 font-normal group-hover:text-slate-300 transition-colors duration-200">
            {tile.detail}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export const MirrorClickableSpecTiles: React.FC<MirrorClickableSpecTilesProps> = ({
  passport,
  activePillId: _activePillId,
  activeTileIndex = 0,
  onSelectTile,
  playTactileClick,
}) => {
  const tiles: SpecTileItem[] = [
    {
      id: 0,
      label: passport.scaleLabel,
      value: passport.scale,
      detail: passport.scaleDetail,
      icon: 'globe',
    },
    {
      id: 1,
      label: passport.disciplinesLabel,
      value: passport.disciplines,
      detail: passport.disciplinesDetail,
      icon: 'zap',
    },
    {
      id: 2,
      label: passport.keyAreaLabel,
      value: passport.keyArea,
      detail: passport.keyAreaDetail,
      icon: 'target',
    },
    {
      id: 3,
      label: passport.highestStandardLabel,
      value: passport.highestStandard,
      detail: passport.highestStandardDetail,
      icon: 'trophy',
      isHighlight: true,
    },
  ];

  const handleTileClick = (index: number) => {
    playTactileClick();
    if (onSelectTile) {
      onSelectTile(index);
    }
  };

  return (
    <div className="w-full select-none">
      {/* 4 Bottom Specification Cards (4-Column Grid on Desktop, 2x2 on Mobile) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 w-full">
        {tiles.map((tile) => (
          <SpecTileCard
            key={tile.id}
            tile={tile}
            isActive={activeTileIndex === tile.id}
            onClick={() => handleTileClick(tile.id)}
          />
        ))}
      </div>
    </div>
  );
};
