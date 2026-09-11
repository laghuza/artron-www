import React from 'react';
import { MasterDimensionId } from './mirrorDataMatrix';

export const MirrorHologramBlueprints: React.FC<{ dimensionId: MasterDimensionId }> = ({
  dimensionId,
}) => {
  return (
    <div
      className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden"
      style={{
        opacity: 0.2,
        transform: 'perspective(1000px) rotateX(4deg) scale(1.05)',
        filter: 'drop-shadow(0 0 30px rgba(0, 229, 255, 0.25))',
      }}
      aria-hidden="true"
    >
      {dimensionId === 'venues' && <HologramVenuesSvg />}
      {dimensionId === 'workforce' && <HologramWorkforceSvg />}
      {dimensionId === 'mastery' && <HologramMasterySvg />}
    </div>
  );
};

function HologramVenuesSvg() {
  return (
    <svg
      className="w-full h-full max-w-[850px] max-h-[420px]"
      viewBox="0 0 700 360"
      fill="none"
    >
      <defs>
        <linearGradient id="venueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#00A3FF" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#10B981" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      {/* Outer arena footprint */}
      <rect
        x="40"
        y="25"
        width="620"
        height="310"
        rx="24"
        stroke="url(#venueGrad)"
        strokeWidth="1.5"
        strokeDasharray="6 4"
      />
      {/* Running track rings */}
      <rect x="75" y="55" width="550" height="250" rx="20" stroke="#00E5FF" strokeWidth="1" strokeOpacity="0.35" />
      <rect x="110" y="85" width="480" height="190" rx="16" stroke="#00A3FF" strokeWidth="1.2" strokeOpacity="0.3" />
      {/* Center line & circle */}
      <line x1="350" y1="85" x2="350" y2="275" stroke="#00E5FF" strokeWidth="1.5" strokeOpacity="0.4" />
      <circle cx="350" cy="180" r="55" stroke="#00E5FF" strokeWidth="1.5" strokeOpacity="0.45" />
      {/* Penalty / Goal sectors */}
      <rect x="110" y="130" width="70" height="100" stroke="#00A3FF" strokeWidth="1.2" strokeOpacity="0.4" />
      <rect x="520" y="130" width="70" height="100" stroke="#00A3FF" strokeWidth="1.2" strokeOpacity="0.4" />
      {/* Combat tatami polygon */}
      <polygon
        points="440,140 530,140 510,220 420,220"
        stroke="#10B981"
        strokeWidth="1.5"
        strokeOpacity="0.6"
        fill="#10B981"
        fillOpacity="0.04"
      />
      {/* Swimming lanes */}
      {[105, 120, 135, 150].map((y) => (
        <line key={y} x1="170" y1={y} x2="310" y2={y} stroke="#00E5FF" strokeWidth="1" strokeOpacity="0.5" strokeDasharray="3 3" />
      ))}
      {/* Diagonal perspective ray lines */}
      <line x1="40" y1="25" x2="15" y2="45" stroke="#00A3FF" strokeWidth="0.8" strokeOpacity="0.3" />
      <line x1="660" y1="25" x2="685" y2="45" stroke="#00A3FF" strokeWidth="0.8" strokeOpacity="0.3" />
      <line x1="40" y1="335" x2="15" y2="355" stroke="#00A3FF" strokeWidth="0.8" strokeOpacity="0.3" />
      <line x1="660" y1="335" x2="685" y2="355" stroke="#00A3FF" strokeWidth="0.8" strokeOpacity="0.3" />
    </svg>
  );
}

function HologramWorkforceSvg() {
  return (
    <svg
      className="w-full h-full max-w-[850px] max-h-[420px]"
      viewBox="0 0 700 360"
      fill="none"
    >
      <defs>
        <linearGradient id="workGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.7" />
          <stop offset="50%" stopColor="#10B981" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#00A3FF" stopOpacity="0.7" />
        </linearGradient>
      </defs>
      {/* Concentric orbital rings */}
      <circle cx="350" cy="180" r="145" stroke="#00A3FF" strokeWidth="1" strokeOpacity="0.25" strokeDasharray="4 4" />
      <circle cx="350" cy="180" r="95" stroke="#00E5FF" strokeWidth="1.2" strokeOpacity="0.35" />
      {/* Node connecting rays */}
      <line x1="200" y1="120" x2="350" y2="180" stroke="#00E5FF" strokeWidth="1.5" strokeOpacity="0.4" />
      <line x1="500" y1="120" x2="350" y2="180" stroke="#00E5FF" strokeWidth="1.5" strokeOpacity="0.4" />
      <line x1="250" y1="260" x2="350" y2="180" stroke="#10B981" strokeWidth="1.5" strokeOpacity="0.5" />
      <line x1="450" y1="260" x2="350" y2="180" stroke="#10B981" strokeWidth="1.5" strokeOpacity="0.5" />
      {/* Telemetry nodes */}
      <circle cx="200" cy="120" r="18" stroke="#00A3FF" strokeWidth="1.5" strokeOpacity="0.6" fill="#00A3FF" fillOpacity="0.08" />
      <circle cx="500" cy="120" r="18" stroke="#00A3FF" strokeWidth="1.5" strokeOpacity="0.6" fill="#00A3FF" fillOpacity="0.08" />
      <circle cx="250" cy="260" r="16" stroke="#10B981" strokeWidth="1.5" strokeOpacity="0.6" fill="#10B981" fillOpacity="0.08" />
      <circle cx="450" cy="260" r="16" stroke="#10B981" strokeWidth="1.5" strokeOpacity="0.6" fill="#10B981" fillOpacity="0.08" />
      {/* Central Command Core */}
      <circle cx="350" cy="180" r="26" stroke="url(#workGrad)" strokeWidth="2" strokeOpacity="0.8" fill="#00E5FF" fillOpacity="0.12" />
      {/* EKG pulse wave */}
      <path
        d="M 120 180 L 190 180 L 205 145 L 225 215 L 245 160 L 265 180 L 324 180"
        stroke="#10B981"
        strokeWidth="2"
        strokeOpacity="0.75"
        fill="none"
      />
      <path
        d="M 376 180 L 435 180 L 455 145 L 475 215 L 495 160 L 515 180 L 580 180"
        stroke="#00E5FF"
        strokeWidth="2"
        strokeOpacity="0.75"
        fill="none"
      />
    </svg>
  );
}

function HologramMasterySvg() {
  return (
    <svg
      className="w-full h-full max-w-[850px] max-h-[420px]"
      viewBox="0 0 700 360"
      fill="none"
    >
      {/* Grand podium */}
      <rect x="290" y="115" width="120" height="170" stroke="#F59E0B" strokeWidth="1.8" strokeOpacity="0.5" fill="#F59E0B" fillOpacity="0.05" rx="8" />
      <rect x="180" y="160" width="110" height="125" stroke="#CBD5E1" strokeWidth="1.5" strokeOpacity="0.4" fill="#CBD5E1" fillOpacity="0.03" rx="8" />
      <rect x="410" y="195" width="110" height="90" stroke="#D97706" strokeWidth="1.5" strokeOpacity="0.4" fill="#D97706" fillOpacity="0.03" rx="8" />
      {/* Olympic/Championship Medal */}
      <circle cx="350" cy="70" r="28" stroke="#F59E0B" strokeWidth="2.2" strokeOpacity="0.8" fill="#F59E0B" fillOpacity="0.1" />
      <circle cx="350" cy="70" r="16" stroke="#F59E0B" strokeWidth="1.2" strokeOpacity="0.4" fill="none" />
      {/* Radiating champion arcs */}
      <path d="M 270 80 C 270 30, 430 30, 430 80" stroke="#F59E0B" strokeWidth="1.2" strokeDasharray="4 4" strokeOpacity="0.5" />
      <path d="M 240 90 C 240 10, 460 10, 460 90" stroke="#00E5FF" strokeWidth="1" strokeDasharray="4 4" strokeOpacity="0.3" />
      {/* Mastery Dan progression line */}
      <line x1="80" y1="315" x2="620" y2="315" stroke="#00A3FF" strokeWidth="1.5" strokeOpacity="0.35" />
      {[110, 165, 220, 275, 330, 385, 440, 495, 550, 605].map((x, i) => (
        <circle key={x} cx={x} cy="315" r="3.5" fill="#00E5FF" fillOpacity={0.25 + i * 0.07} />
      ))}
    </svg>
  );
}
