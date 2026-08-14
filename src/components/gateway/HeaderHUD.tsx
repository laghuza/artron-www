"use client";
import React, { useState } from 'react';

export const HeaderHUD: React.FC = () => {
  const [audioActive, setAudioActive] = useState(true);
  return (
    <header className="w-full bg-[#121418] border-b border-[#262a33] px-4 lg:px-8 py-3 flex items-center justify-between font-mono text-xs text-gray-300 select-none z-20">
      <div className="flex items-center space-x-3">
        <div className="w-6 h-6 rounded border border-[#00ff87] flex items-center justify-center bg-[#00ff87]/10 text-[#00ff87] font-bold text-xs">▲</div>
        <div className="flex flex-col">
          <span className="text-white font-bold tracking-widest uppercase">ARTRON CORE OS</span>
          <span className="text-[9px] text-[#00ff87] tracking-wider">ENNEACORE MATRIX GATEWAY</span>
        </div>
      </div>
      <div className="hidden md:flex items-center space-x-4 text-[11px]">
        <span className="flex items-center space-x-1.5 bg-[#16191E] border border-[#262a33] px-3 py-1 rounded">
          <span className="w-2 h-2 rounded-full bg-[#00ff87] animate-pulse" />
          <span className="text-gray-400">STATUS:</span><span className="text-[#00ff87]">SYSTEM_ONLINE</span>
        </span>
        <span className="bg-[#16191E] border border-[#262a33] px-3 py-1 rounded text-gray-400">
          LATENCY: <span className="text-white">0.4MS</span>
        </span>
      </div>
      <div className="flex items-center space-x-3">
        <button onClick={() => setAudioActive(!audioActive)} className="flex items-center space-x-2 bg-[#16191E] hover:bg-[#1C2027] border border-[#262a33] hover:border-[#00ff87]/50 px-3 py-1 rounded transition-colors text-[11px]">
          <span className={`w-2 h-2 rounded-full ${audioActive ? 'bg-[#00ff87] animate-ping' : 'bg-gray-600'}`} />
          <span className="text-gray-400">AUDIO:</span>
          <span className={audioActive ? 'text-[#00ff87]' : 'text-gray-500'}>{audioActive ? '48kHz LIVE' : 'MUTED'}</span>
        </button>
        <svg viewBox="0 0 64 64" className="w-7 h-7 text-white border border-[#262a33] rounded bg-[#16191E] p-1" role="img" aria-label="Artron OS Logo">
          <g fill="currentColor">
            <circle cx="8" cy="8" r="2.4" /><circle cx="32" cy="8" r="2.4" /><circle cx="56" cy="8" r="2.4" />
            <circle cx="8" cy="32" r="2.4" /><circle cx="56" cy="32" r="2.4" />
            <circle cx="8" cy="56" r="2.4" /><circle cx="32" cy="56" r="2.4" /><circle cx="56" cy="56" r="2.4" />
          </g>
          <circle cx="32" cy="32" r="4.4" fill="#00E676" className="filter drop-shadow-[0_0_4px_#00E676]" />
        </svg>
      </div>
    </header>
  );
};
