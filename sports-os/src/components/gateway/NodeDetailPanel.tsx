"use client";

import React from 'react';
import { SubChapter } from '@/types/gateway';

interface NodeDetailPanelProps {
  activeSubChapter: SubChapter | null;
  onBackToNode: () => void;
}

export const NodeDetailPanel: React.FC<NodeDetailPanelProps> = ({
  activeSubChapter,
  onBackToNode
}) => {
  if (!activeSubChapter) return null;

  return (
    <div className="w-full lg:w-[60%] bg-[#0B0C0E] p-6 lg:p-8 flex flex-col justify-between min-h-[500px] border-l border-[#262a33]">
      <div className="space-y-6">
        <button
          onClick={onBackToNode}
          className="text-xs font-mono text-[#00E676] hover:text-white flex items-center space-x-1 uppercase tracking-wider transition-colors"
        >
          <span>[ ← BACK TO NODE ]</span>
        </button>

        <div className="space-y-2">
          <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">
            LOGICAL DOCTRINE SPECIFICATION
          </span>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            {activeSubChapter.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 pt-2">
          {activeSubChapter.doctrines.map((doctrine, idx) => (
            <div
              key={idx}
              className="p-4 rounded bg-[#121418] border border-[#262a33] hover:border-[#00E676]/50 transition-all duration-200"
            >
              <div className="flex items-start space-x-3">
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#00E676]/10 text-[#00E676] border border-[#00E676]/30">
                  0{idx + 1}
                </span>
                <p className="text-gray-300 text-sm leading-relaxed font-sans">
                  {doctrine}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-6 border-t border-[#262a33]/60 flex items-center justify-between text-[10px] font-mono text-gray-500 uppercase">
        <span>SECURITY LEVEL: CLASSIFIED</span>
        <span>ENCRYPTION: AES-256</span>
      </div>
    </div>
  );
};
