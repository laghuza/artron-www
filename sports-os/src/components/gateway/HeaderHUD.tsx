"use client";
import React, { useState } from 'react';

export const HeaderHUD: React.FC = () => {
  const [audioActive, setAudioActive] = useState(true);
  return (
    <header className="w-full bg-[#121418] border-b border-[#262a33] px-4 lg:px-8 py-3 flex items-center justify-between font-mono text-xs text-gray-300 select-none z-20">
      <div className="flex items-center space-x-3">
        <div className="w-6 h-6 rounded border border-[#00E676] flex items-center justify-center bg-[#00E676]/10 text-[#00E676] font-bold text-xs">▲</div>
        <div className="flex flex-col">
          <span className="text-white font-bold tracking-widest uppercase">ARTRON CORE OS</span>
          <span className="text-[9px] text-[#00E676] tracking-wider">ENNEACORE MATRIX GATEWAY</span>
        </div>
      </div>
      <div className="hidden md:flex items-center space-x-4 text-[11px]">
        <span className="flex items-center space-x-1.5 bg-[#16191E] border border-[#262a33] px-3 py-1 rounded">
          <span className="w-2 h-2 rounded-full bg-[#00E676] animate-pulse" />
          <span className="text-gray-400">STATUS:</span><span className="text-[#00E676]">SYSTEM_ONLINE</span>
        </span>
        <span className="bg-[#16191E] border border-[#262a33] px-3 py-1 rounded text-gray-400">
          LATENCY: <span className="text-white">0.4MS</span>
        </span>
      </div>
      <div className="flex items-center space-x-3">
        <button onClick={() => setAudioActive(!audioActive)} className="flex items-center space-x-2 bg-[#16191E] hover:bg-[#1C2027] border border-[#262a33] hover:border-[#00E676]/50 px-3 py-1 rounded transition-colors text-[11px]">
          <span className={`w-2 h-2 rounded-full ${audioActive ? 'bg-[#00E676] animate-ping' : 'bg-gray-600'}`} />
          <span className="text-gray-400">AUDIO:</span>
          <span className={audioActive ? 'text-[#00E676]' : 'text-gray-500'}>{audioActive ? '48kHz LIVE' : 'MUTED'}</span>
        </button>
        <svg viewBox="0 0 64 64" className="w-7 h-7 text-gray-400 border border-[#262a33] rounded bg-[#16191E] p-1" role="img" aria-label="Artron OS Logo">
          <g stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" fill="none">
            <line x1="8" y1="8" x2="56" y2="8" /><line x1="8" y1="32" x2="56" y2="32" /><line x1="8" y1="56" x2="56" y2="56" />
            <line x1="8" y1="8" x2="8" y2="56" /><line x1="32" y1="8" x2="32" y2="56" /><line x1="56" y1="8" x2="56" y2="56" />
            <line x1="8" y1="8" x2="56" y2="56" /><line x1="56" y1="8" x2="8" y2="56" />
          </g>
          <g fill="currentColor">
            <circle cx="8" cy="8" r="2.4" /><circle cx="32" cy="8" r="2.4" /><circle cx="56" cy="8" r="2.4" />
            <circle cx="8" cy="32" r="2.4" /><circle cx="56" cy="32" r="2.4" />
            <circle cx="8" cy="56" r="2.4" /><circle cx="32" cy="56" r="2.4" /><circle cx="56" cy="56" r="2.4" />
          </g>
          <circle cx="32" cy="32" r="4.4" fill="#00E676" />
        </svg>
      </div>
    </header>
  );
};
