import React from 'react';

interface IconProps {
  className?: string;
  color?: string;
  isActive?: boolean;
}

/**
 * 1. Sport OS Core Icon (Replacing generic Cpu)
 * Interlocking dual resonant rings with glowing quantum core & telemetry crossbars.
 */
export const SportOsCoreIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', color = '#00E5FF' }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="artronCoreGrad" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
        <stop stopColor={color} />
        <stop offset="1" stopColor="#0066FF" />
      </linearGradient>
      <filter id="coreGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="0.8" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    {/* Outer telemetry diamond */}
    <rect x="3" y="3" width="18" height="18" rx="5" stroke="url(#artronCoreGrad)" strokeWidth="1.2" strokeOpacity="0.4" />
    
    {/* Corner circuit micro-ticks */}
    <path d="M12 2V4M12 20V22M2 12H4M20 12H22" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.8" />
    
    {/* Dual interlocking orbital paths */}
    <circle cx="9.5" cy="12" r="4" stroke="url(#artronCoreGrad)" strokeWidth="1.4" strokeDasharray="3 1.5" />
    <circle cx="14.5" cy="12" r="4" stroke="url(#artronCoreGrad)" strokeWidth="1.4" strokeDasharray="3 1.5" />
    
    {/* Luminous Central Node Intersection */}
    <circle cx="12" cy="12" r="1.8" fill={color} filter="url(#coreGlow)" />
  </svg>
);

/**
 * 2. OCR Holographic Scanner Icon (Replacing generic ScanLine)
 * Precision digital ID silhouette with optical corner brackets and active laser sweep line.
 */
export const OcrScannerIcon: React.FC<IconProps> = ({ className = 'w-4 h-4', color = '#00A3FF', isActive }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="ocrLaserGrad" x1="3" y1="12" x2="21" y2="12" gradientUnits="userSpaceOnUse">
        <stop stopColor={color} stopOpacity="0.1" />
        <stop offset="0.5" stopColor={color} stopOpacity="1" />
        <stop offset="1" stopColor={color} stopOpacity="0.1" />
      </linearGradient>
    </defs>
    {/* Precision Optical Frame Reticles [ ] */}
    <path d="M4 8V5C4 4.44772 4.44772 4 5 4H8" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    <path d="M16 4H19C19.5523 4 20 4.44772 20 5V8" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    <path d="M20 16V19C20 19.5523 19.5523 20 19 20H16" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    <path d="M8 20H5C4.44772 20 4 19.5523 4 19V16" stroke={color} strokeWidth="1.6" strokeLinecap="round" />

    {/* ID Card Inner Miniature Silhouette */}
    <rect x="6.5" y="7" width="11" height="10" rx="1.5" stroke={color} strokeWidth="1" strokeOpacity="0.5" />
    
    {/* Biometric Portrait & Data Lines */}
    <rect x="8" y="9" width="3" height="3.5" rx="0.6" fill={color} fillOpacity="0.8" />
    <path d="M12.5 9.5H16M12.5 11.5H15M8 14.5H16" stroke={color} strokeWidth="1" strokeLinecap="round" strokeOpacity="0.7" />

    {/* Active Laser Scan Line */}
    <line 
      x1="3" 
      y1="12" 
      x2="21" 
      y2="12" 
      stroke="url(#ocrLaserGrad)" 
      strokeWidth={isActive ? "2" : "1.5"}
      strokeLinecap="round"
    />
  </svg>
);

/**
 * 3. Voice Spectrum Waveform Icon (Replacing generic Mic)
 * Multi-frequency sonic audio bars with harmonic gradient and central pulse.
 */
export const VoiceSpectrumIcon: React.FC<IconProps> = ({ className = 'w-4 h-4', color = '#00E5FF', isActive }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Dynamic Equalizer Bars */}
    {/* Bar 1 (Leftmost subtle) */}
    <rect x="3" y="10" width="2" height="4" rx="1" fill={color} fillOpacity="0.5" />
    
    {/* Bar 2 (Mid-low) */}
    <rect x="7" y="7" width="2" height="10" rx="1" fill={color} fillOpacity={isActive ? "0.9" : "0.75"} />
    
    {/* Bar 3 (Central Peak - Highest resonance) */}
    <rect x="11" y="3.5" width="2" height="17" rx="1" fill={color} />
    
    {/* Bar 4 (Mid-high) */}
    <rect x="15" y="6" width="2" height="12" rx="1" fill={color} fillOpacity={isActive ? "0.9" : "0.75"} />
    
    {/* Bar 5 (Rightmost subtle) */}
    <rect x="19" y="9.5" width="2" height="5" rx="1" fill={color} fillOpacity="0.5" />

    {/* Subtle Sound Frequency Horizon Axis */}
    <path d="M1.5 12H3M21 12H22.5" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.4" />
  </svg>
);

/**
 * 4. Churn Radar & Proactive Intelligence Icon (Replacing generic Bot)
 * Circular 360-degree telemetry radar with sweep vector and detected risk blips.
 */
export const ChurnRadarIcon: React.FC<IconProps> = ({ className = 'w-4 h-4', color = '#00ff87', isActive }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="radarSweep" x1="12" y1="12" x2="21" y2="6" gradientUnits="userSpaceOnUse">
        <stop stopColor={color} stopOpacity="0" />
        <stop offset="1" stopColor={color} stopOpacity={isActive ? "0.8" : "0.5"} />
      </linearGradient>
    </defs>
    
    {/* Concentric Radar Range Rings */}
    <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.2" strokeOpacity="0.4" />
    <circle cx="12" cy="12" r="5.5" stroke={color} strokeWidth="1" strokeOpacity="0.6" strokeDasharray="2 2" />
    <circle cx="12" cy="12" r="2.2" stroke={color} strokeWidth="1" strokeOpacity="0.8" />

    {/* Crosshairs */}
    <line x1="12" y1="2" x2="12" y2="22" stroke={color} strokeWidth="0.8" strokeOpacity="0.3" strokeDasharray="1.5 1.5" />
    <line x1="2" y1="12" x2="22" y2="12" stroke={color} strokeWidth="0.8" strokeOpacity="0.3" strokeDasharray="1.5 1.5" />

    {/* Radar Sweep Ray Sector */}
    <path d="M12 12L20.5 7.5" stroke="url(#radarSweep)" strokeWidth="1.5" strokeLinecap="round" />

    {/* Anticipated Member Churn Signals (Blips) */}
    <circle cx="15.5" cy="7.5" r="1.3" fill={color} className={isActive ? "animate-pulse" : ""} />
    <circle cx="7.5" cy="15.5" r="0.9" fill={color} fillOpacity="0.7" />
  </svg>
);
