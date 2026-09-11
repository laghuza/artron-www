'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MasterDimensionId } from './mirrorTypes';

import { MirrorTileModeOverlay } from './MirrorTileModeOverlay';

interface MirrorReactiveBackdropProps {
  dimensionId: MasterDimensionId;
  activePillId: string;
  activeTileIndex?: number;
}

export const MirrorReactiveBackdrop: React.FC<MirrorReactiveBackdropProps> = ({
  dimensionId,
  activePillId,
  activeTileIndex = 0,
}) => {
  return (
    <div
      className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden"
      style={{
        perspective: '1000px',
        filter: 'drop-shadow(0 0 20px rgba(0, 163, 255, 0.08))',
      }}
      aria-hidden="true"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={`${activePillId}_mode_${activeTileIndex}`}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 0.15, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
          className="w-full h-full flex items-center justify-center relative"
          style={{
            transform: 'rotateX(3deg) scale(1.04)',
          }}
        >
          {renderHologram(activePillId, dimensionId)}
          <MirrorTileModeOverlay mode={activeTileIndex} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

function renderHologram(pillId: string, dimensionId: MasterDimensionId) {
  // 🏛️ Physical Venues
  if (pillId === 'venue_1') return <TatamiOctagonSvg />;
  if (pillId === 'venue_2') return <YouthAcademySvg />;
  if (pillId === 'venue_3') return <MultisportArenaSvg />;
  if (pillId === 'venue_4') return <NationalOlympicBaseSvg />;
  if (pillId === 'venue_5') return <FederationCoreSvg />;

  // 👥 Sports Workforce
  if (pillId === 'staff_1') return <GovernanceOrbitsSvg />;
  if (pillId === 'staff_2') return <TacticalPitchSvg />;
  if (pillId === 'staff_3') return <MedicalEkgSvg />;
  if (pillId === 'staff_4') return <FacilityIotSvg />;
  if (pillId === 'staff_5') return <AquaticLifeguardRadarSvg />;

  // 🏅 Mastery & Titles
  if (pillId === 'rank_1') return <NationalRanksLadderSvg />;
  if (pillId === 'rank_2') return <InternationalLicensureSvg />;
  if (pillId === 'rank_3') return <OlympicPodiumSvg />;
  if (pillId === 'rank_4') return <ChampionshipBeltsSvg />;
  if (pillId === 'rank_5') return <DanProgressionSvg />;

  // Fallbacks by dimension
  if (dimensionId === 'venues') return <MultisportArenaSvg />;
  if (dimensionId === 'workforce') return <MedicalEkgSvg />;
  return <OlympicPodiumSvg />;
}

// ── 1. Tatami & Octagon Mesh (Hubs) ──
function TatamiOctagonSvg() {
  return (
    <svg className="w-full h-full max-w-[850px] max-h-[420px]" viewBox="0 0 700 360" fill="none">
      {/* Octagon combat ring */}
      <polygon
        points="350,60 470,110 520,230 470,290 350,310 230,290 180,230 230,110"
        stroke="#00E5FF"
        strokeWidth="1.8"
        strokeDasharray="6 4"
      />
      <polygon
        points="350,90 440,130 480,220 440,270 350,285 260,270 220,220 260,130"
        stroke="#00A3FF"
        strokeWidth="1.2"
        strokeOpacity="0.45"
      />
      {/* Tatami sub-quadrants */}
      <line x1="260" y1="187" x2="440" y2="187" stroke="#10B981" strokeWidth="1.2" strokeOpacity="0.5" />
      <line x1="350" y1="100" x2="350" y2="275" stroke="#10B981" strokeWidth="1.2" strokeOpacity="0.5" />
      <circle cx="350" cy="187" r="38" stroke="#00E5FF" strokeWidth="1.5" strokeOpacity="0.6" />
      {/* Outer pulse rays */}
      <circle cx="350" cy="187" r="140" stroke="#00E5FF" strokeWidth="0.8" strokeOpacity="0.25" strokeDasharray="5 5" />
    </svg>
  );
}

// ── 2. Youth Academy Grid ──
function YouthAcademySvg() {
  return (
    <svg className="w-full h-full max-w-[850px] max-h-[420px]" viewBox="0 0 700 360" fill="none">
      <rect x="120" y="60" width="460" height="240" rx="18" stroke="#00E5FF" strokeWidth="1.5" strokeDasharray="6 4" />
      {/* Training sectors U7-U19 */}
      <line x1="273" y1="60" x2="273" y2="300" stroke="#00A3FF" strokeWidth="1.2" strokeOpacity="0.4" />
      <line x1="426" y1="60" x2="426" y2="300" stroke="#00A3FF" strokeWidth="1.2" strokeOpacity="0.4" />
      <line x1="120" y1="180" x2="580" y2="180" stroke="#10B981" strokeWidth="1.2" strokeOpacity="0.4" strokeDasharray="4 4" />
      {/* Gymnastics rings / center hubs */}
      <circle cx="196" cy="120" r="22" stroke="#00E5FF" strokeWidth="1.2" strokeOpacity="0.5" />
      <circle cx="350" cy="180" r="32" stroke="#10B981" strokeWidth="1.5" strokeOpacity="0.6" />
      <circle cx="503" cy="240" r="22" stroke="#00E5FF" strokeWidth="1.2" strokeOpacity="0.5" />
    </svg>
  );
}

// ── 3. Multisport Arena (Megaplexes) ──
function MultisportArenaSvg() {
  return (
    <svg className="w-full h-full max-w-[850px] max-h-[420px]" viewBox="0 0 700 360" fill="none">
      {/* Arena track perimeter */}
      <rect x="60" y="35" width="580" height="290" rx="40" stroke="#00E5FF" strokeWidth="1.5" strokeDasharray="6 4" />
      <rect x="95" y="65" width="510" height="230" rx="30" stroke="#00A3FF" strokeWidth="1" strokeOpacity="0.35" />
      {/* Center Court */}
      <circle cx="350" cy="180" r="50" stroke="#00E5FF" strokeWidth="1.4" strokeOpacity="0.5" />
      <line x1="350" y1="65" x2="350" y2="295" stroke="#00E5FF" strokeWidth="1.2" strokeOpacity="0.4" />
      {/* Swimming Lanes in upper section */}
      {[95, 110, 125].map((y) => (
        <line key={y} x1="130" y1={y} x2="270" y2={y} stroke="#00E5FF" strokeWidth="1" strokeDasharray="3 3" strokeOpacity="0.6" />
      ))}
      {/* Combat Zone polygon */}
      <polygon points="450,140 540,140 520,220 430,220" stroke="#10B981" strokeWidth="1.2" strokeOpacity="0.55" fill="#10B981" fillOpacity="0.04" />
    </svg>
  );
}

// ── 4. National Olympic Base ──
function NationalOlympicBaseSvg() {
  return (
    <svg className="w-full h-full max-w-[850px] max-h-[420px]" viewBox="0 0 700 360" fill="none">
      {/* Georgian / National Crest Geometry */}
      <circle cx="350" cy="180" r="130" stroke="#00E5FF" strokeWidth="1.5" strokeDasharray="8 4" />
      <circle cx="350" cy="180" r="90" stroke="#EF4444" strokeWidth="1.2" strokeOpacity="0.5" />
      {/* Cross symmetry rays */}
      <line x1="350" y1="50" x2="350" y2="310" stroke="#EF4444" strokeWidth="1.5" strokeOpacity="0.55" />
      <line x1="220" y1="180" x2="480" y2="180" stroke="#EF4444" strokeWidth="1.5" strokeOpacity="0.55" />
      {/* Olympic 5 rings outline */}
      <circle cx="280" cy="165" r="18" stroke="#00E5FF" strokeWidth="1.2" strokeOpacity="0.6" />
      <circle cx="315" cy="165" r="18" stroke="#F59E0B" strokeWidth="1.2" strokeOpacity="0.6" />
      <circle cx="350" cy="165" r="18" stroke="#FFFFFF" strokeWidth="1.2" strokeOpacity="0.6" />
      <circle cx="385" cy="165" r="18" stroke="#10B981" strokeWidth="1.2" strokeOpacity="0.6" />
      <circle cx="420" cy="165" r="18" stroke="#EF4444" strokeWidth="1.2" strokeOpacity="0.6" />
    </svg>
  );
}

// ── 5. Federation Core ──
function FederationCoreSvg() {
  return (
    <svg className="w-full h-full max-w-[850px] max-h-[420px]" viewBox="0 0 700 360" fill="none">
      {/* Institutional Central Core */}
      <circle cx="350" cy="180" r="40" stroke="#00E5FF" strokeWidth="2" strokeOpacity="0.8" fill="#00E5FF" fillOpacity="0.08" />
      <circle cx="350" cy="180" r="110" stroke="#00A3FF" strokeWidth="1" strokeDasharray="4 4" strokeOpacity="0.4" />
      <circle cx="350" cy="180" r="155" stroke="#10B981" strokeWidth="0.8" strokeOpacity="0.3" />
      {/* Regional Club nodes connected to Federation core */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
        const rad = (deg * Math.PI) / 180;
        const x = 350 + Math.cos(rad) * 110;
        const y = 180 + Math.sin(rad) * 110;
        return (
          <g key={deg}>
            <line x1="350" y1="180" x2={x} y2={y} stroke="#00E5FF" strokeWidth="1" strokeOpacity="0.4" />
            <circle cx={x} cy={y} r="8" stroke="#00E5FF" strokeWidth="1.2" strokeOpacity="0.7" fill="#060910" />
          </g>
        );
      })}
    </svg>
  );
}

// ── 6. Governance Orbits ──
function GovernanceOrbitsSvg() {
  return (
    <svg className="w-full h-full max-w-[850px] max-h-[420px]" viewBox="0 0 700 360" fill="none">
      <ellipse cx="350" cy="180" rx="160" ry="85" stroke="#00A3FF" strokeWidth="1.2" strokeDasharray="5 5" strokeOpacity="0.45" />
      <ellipse cx="350" cy="180" rx="110" ry="130" stroke="#00E5FF" strokeWidth="1" strokeOpacity="0.35" />
      <circle cx="350" cy="180" r="28" stroke="#00E5FF" strokeWidth="2" strokeOpacity="0.8" fill="#00E5FF" fillOpacity="0.1" />
      {/* Strategic Board Nodes */}
      <circle cx="210" cy="130" r="14" stroke="#10B981" strokeWidth="1.5" strokeOpacity="0.6" />
      <circle cx="490" cy="130" r="14" stroke="#10B981" strokeWidth="1.5" strokeOpacity="0.6" />
      <circle cx="350" cy="50" r="14" stroke="#00E5FF" strokeWidth="1.5" strokeOpacity="0.6" />
      <circle cx="350" cy="310" r="14" stroke="#00E5FF" strokeWidth="1.5" strokeOpacity="0.6" />
    </svg>
  );
}

// ── 7. Tactical Pitch (Coaching Staff) ──
function TacticalPitchSvg() {
  return (
    <svg className="w-full h-full max-w-[850px] max-h-[420px]" viewBox="0 0 700 360" fill="none">
      {/* Pitch border */}
      <rect x="100" y="45" width="500" height="270" rx="16" stroke="#00E5FF" strokeWidth="1.5" strokeOpacity="0.5" />
      <line x1="350" y1="45" x2="350" y2="315" stroke="#00E5FF" strokeWidth="1.2" strokeOpacity="0.45" />
      <circle cx="350" cy="180" r="48" stroke="#00E5FF" strokeWidth="1.5" strokeOpacity="0.5" />
      {/* Goal areas */}
      <rect x="100" y="115" width="65" height="130" stroke="#00A3FF" strokeWidth="1.2" strokeOpacity="0.4" />
      <rect x="535" y="115" width="65" height="130" stroke="#00A3FF" strokeWidth="1.2" strokeOpacity="0.4" />
      {/* Tactical Strategy Arrows / Movements */}
      <path d="M 230 130 Q 300 90 380 140" stroke="#10B981" strokeWidth="1.8" strokeDasharray="4 3" strokeOpacity="0.75" />
      <path d="M 240 240 Q 320 270 420 220" stroke="#10B981" strokeWidth="1.8" strokeDasharray="4 3" strokeOpacity="0.75" />
    </svg>
  );
}

// ── 8. Medical & EKG (Sports Medicine) ──
function MedicalEkgSvg() {
  return (
    <svg className="w-full h-full max-w-[850px] max-h-[420px]" viewBox="0 0 700 360" fill="none">
      {/* Anatomical cross geometry */}
      <circle cx="350" cy="180" r="120" stroke="#00A3FF" strokeWidth="1" strokeDasharray="5 5" strokeOpacity="0.3" />
      <circle cx="350" cy="180" r="70" stroke="#00E5FF" strokeWidth="1.2" strokeOpacity="0.4" />
      {/* Pulsing EKG waves */}
      <path
        d="M 60 180 L 180 180 L 205 130 L 230 230 L 255 150 L 275 180 L 350 180 L 375 180 L 395 125 L 420 235 L 445 155 L 465 180 L 640 180"
        stroke="#10B981"
        strokeWidth="2.2"
        strokeOpacity="0.8"
      />
      {/* Medical Cross in center */}
      <rect x="338" y="160" width="24" height="40" rx="3" stroke="#00E5FF" strokeWidth="1.2" strokeOpacity="0.5" fill="#00E5FF" fillOpacity="0.08" />
      <rect x="330" y="168" width="40" height="24" rx="3" stroke="#00E5FF" strokeWidth="1.2" strokeOpacity="0.5" fill="#00E5FF" fillOpacity="0.08" />
    </svg>
  );
}

// ── 9. Facility IoT (Operations) ──
function FacilityIotSvg() {
  return (
    <svg className="w-full h-full max-w-[850px] max-h-[420px]" viewBox="0 0 700 360" fill="none">
      {/* IoT Grid Matrix */}
      {[100, 200, 300, 400, 500, 600].map((x) => (
        <line key={x} x1={x} y1="60" x2={x} y2="300" stroke="#00A3FF" strokeWidth="0.8" strokeOpacity="0.2" strokeDasharray="4 4" />
      ))}
      {[90, 150, 210, 270].map((y) => (
        <line key={y} x1="80" y1={y} x2="620" y2={y} stroke="#00A3FF" strokeWidth="0.8" strokeOpacity="0.2" strokeDasharray="4 4" />
      ))}
      {/* Turnstile Access Points / Relays */}
      <circle cx="200" cy="150" r="16" stroke="#00E5FF" strokeWidth="1.8" strokeOpacity="0.7" fill="#00E5FF" fillOpacity="0.1" />
      <circle cx="500" cy="150" r="16" stroke="#00E5FF" strokeWidth="1.8" strokeOpacity="0.7" fill="#00E5FF" fillOpacity="0.1" />
      <circle cx="350" cy="210" r="22" stroke="#10B981" strokeWidth="2" strokeOpacity="0.8" fill="#10B981" fillOpacity="0.12" />
      <line x1="200" y1="150" x2="350" y2="210" stroke="#00E5FF" strokeWidth="1.5" strokeOpacity="0.5" />
      <line x1="500" y1="150" x2="350" y2="210" stroke="#00E5FF" strokeWidth="1.5" strokeOpacity="0.5" />
    </svg>
  );
}

// ── 10. Aquatic Lifeguard Radar & 50m Lanes ──
function AquaticLifeguardRadarSvg() {
  return (
    <svg className="w-full h-full max-w-[850px] max-h-[420px]" viewBox="0 0 700 360" fill="none">
      {/* 50m Olympic Pool Perimeter */}
      <rect x="70" y="60" width="560" height="240" rx="14" stroke="#00E5FF" strokeWidth="1.8" strokeOpacity="0.65" />
      {/* 8 Olympic Swimming Lanes */}
      {[90, 120, 150, 180, 210, 240, 270].map((y) => (
        <line key={y} x1="70" y1={y} x2="630" y2={y} stroke="#00A3FF" strokeWidth="1" strokeDasharray="6 4" strokeOpacity="0.45" />
      ))}
      {/* Lifeguard Radar Concentric Wave Circles (Center / Lifeguard Post) */}
      <circle cx="350" cy="180" r="30" stroke="#00E5FF" strokeWidth="1.5" strokeOpacity="0.75" />
      <circle cx="350" cy="180" r="65" stroke="#00E5FF" strokeWidth="1.2" strokeOpacity="0.5" strokeDasharray="4 4" />
      <circle cx="350" cy="180" r="105" stroke="#10B981" strokeWidth="1" strokeOpacity="0.4" strokeDasharray="5 5" />
      {/* Lifebuoy Ring in Center */}
      <circle cx="350" cy="180" r="16" stroke="#EF4444" strokeWidth="2.5" strokeOpacity="0.8" fill="#FFFFFF" fillOpacity="0.1" />
      {/* Sweep angle line */}
      <line x1="350" y1="180" x2="445" y2="120" stroke="#00E5FF" strokeWidth="1.5" strokeOpacity="0.7" />
    </svg>
  );
}

// ── 11. National Ranks Ladder ──
function NationalRanksLadderSvg() {
  return (
    <svg className="w-full h-full max-w-[850px] max-h-[420px]" viewBox="0 0 700 360" fill="none">
      {/* Ascending qualification steps */}
      <path d="M 120 280 L 220 280 L 220 230 L 330 230 L 330 170 L 440 170 L 440 110 L 560 110" stroke="#00E5FF" strokeWidth="2" strokeOpacity="0.7" />
      {/* Star of Mastery on top */}
      <polygon points="560,95 565,108 578,108 568,116 572,128 560,121 548,128 552,116 542,108 555,108" stroke="#F59E0B" strokeWidth="1.5" strokeOpacity="0.85" fill="#F59E0B" fillOpacity="0.2" />
      {/* Level indicators */}
      <circle cx="170" cy="280" r="8" stroke="#00A3FF" strokeWidth="1.2" />
      <circle cx="275" cy="230" r="8" stroke="#00A3FF" strokeWidth="1.2" />
      <circle cx="385" cy="170" r="8" stroke="#00E5FF" strokeWidth="1.2" />
      <circle cx="500" cy="110" r="8" stroke="#10B981" strokeWidth="1.2" />
    </svg>
  );
}

// ── 12. International Licensure & Elo ──
function InternationalLicensureSvg() {
  return (
    <svg className="w-full h-full max-w-[850px] max-h-[420px]" viewBox="0 0 700 360" fill="none">
      {/* Global Globe Mesh */}
      <circle cx="350" cy="180" r="115" stroke="#00E5FF" strokeWidth="1.5" strokeDasharray="6 4" strokeOpacity="0.6" />
      <ellipse cx="350" cy="180" rx="115" ry="45" stroke="#00A3FF" strokeWidth="1.2" strokeOpacity="0.45" />
      <ellipse cx="350" cy="180" rx="55" ry="115" stroke="#00A3FF" strokeWidth="1.2" strokeOpacity="0.45" />
      {/* Grandmaster Crown/Insignia */}
      <path d="M 310 100 L 330 125 L 350 95 L 370 125 L 390 100 L 385 140 L 315 140 Z" stroke="#F59E0B" strokeWidth="1.5" strokeOpacity="0.8" fill="#F59E0B" fillOpacity="0.1" />
    </svg>
  );
}

// ── 13. Olympic Podium ──
function OlympicPodiumSvg() {
  return (
    <svg className="w-full h-full max-w-[850px] max-h-[420px]" viewBox="0 0 700 360" fill="none">
      {/* 1st Place (Gold, Center) */}
      <rect x="290" y="115" width="120" height="175" stroke="#F59E0B" strokeWidth="1.8" strokeOpacity="0.65" fill="#F59E0B" fillOpacity="0.06" rx="8" />
      {/* 2nd Place (Silver, Left) */}
      <rect x="180" y="160" width="110" height="130" stroke="#CBD5E1" strokeWidth="1.5" strokeOpacity="0.5" fill="#CBD5E1" fillOpacity="0.04" rx="8" />
      {/* 3rd Place (Bronze, Right) */}
      <rect x="410" y="195" width="110" height="95" stroke="#D97706" strokeWidth="1.5" strokeOpacity="0.5" fill="#D97706" fillOpacity="0.04" rx="8" />
      {/* Olympic Medal in Center */}
      <circle cx="350" cy="70" r="28" stroke="#F59E0B" strokeWidth="2.2" strokeOpacity="0.85" fill="#F59E0B" fillOpacity="0.15" />
      <circle cx="350" cy="70" r="16" stroke="#F59E0B" strokeWidth="1.2" strokeOpacity="0.4" fill="none" />
      {/* Radiating champion laurel arcs */}
      <path d="M 270 80 C 270 30, 430 30, 430 80" stroke="#F59E0B" strokeWidth="1.2" strokeDasharray="4 4" strokeOpacity="0.55" />
    </svg>
  );
}

// ── 14. Championship Belts ──
function ChampionshipBeltsSvg() {
  return (
    <svg className="w-full h-full max-w-[850px] max-h-[420px]" viewBox="0 0 700 360" fill="none">
      {/* 4 World Belts Hexagonal Central Medallion */}
      <polygon points="350,110 420,150 420,210 350,250 280,210 280,150" stroke="#F59E0B" strokeWidth="2" strokeOpacity="0.8" fill="#F59E0B" fillOpacity="0.1" />
      {/* Side Strap Plates */}
      <rect x="160" y="155" width="110" height="50" rx="8" stroke="#00E5FF" strokeWidth="1.2" strokeOpacity="0.55" />
      <rect x="430" y="155" width="110" height="50" rx="8" stroke="#00E5FF" strokeWidth="1.2" strokeOpacity="0.55" />
      <line x1="80" y1="180" x2="620" y2="180" stroke="#00A3FF" strokeWidth="1.5" strokeOpacity="0.4" strokeDasharray="6 4" />
      {/* 4 Crown Gems */}
      <circle cx="350" cy="180" r="18" stroke="#10B981" strokeWidth="1.5" strokeOpacity="0.7" />
    </svg>
  );
}

// ── 15. Dan Progression (Oriental Martial Arts) ──
function DanProgressionSvg() {
  return (
    <svg className="w-full h-full max-w-[850px] max-h-[420px]" viewBox="0 0 700 360" fill="none">
      {/* Horizontal Dan Progression Bar */}
      <line x1="80" y1="210" x2="620" y2="210" stroke="#00E5FF" strokeWidth="2" strokeOpacity="0.5" />
      {/* 10 Dan Nodes with increasing radiance to 10th Dan Red Belt */}
      {[100, 150, 200, 250, 300, 350, 400, 450, 500, 580].map((x, i) => {
        const isXDan = i === 9;
        return (
          <g key={x}>
            <circle
              cx={x}
              cy="210"
              r={isXDan ? 14 : 7}
              stroke={isXDan ? '#EF4444' : '#00E5FF'}
              strokeWidth={isXDan ? 2.5 : 1.2}
              fill={isXDan ? '#EF4444' : '#00E5FF'}
              fillOpacity={0.2 + i * 0.08}
            />
            <line x1={x} y1="210" x2={x} y2={175 - (i % 2) * 20} stroke="#00A3FF" strokeWidth="0.8" strokeOpacity="0.4" />
          </g>
        );
      })}
    </svg>
  );
}
