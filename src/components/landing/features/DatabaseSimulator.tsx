'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Eye, EyeOff, Shield, RefreshCw } from 'lucide-react';

export const DatabaseSimulator: React.FC = () => {
  const { t } = useLanguage();
  const [revealID, setRevealID] = useState<boolean>(false);
  const [qrSeed, setQrSeed] = useState<number>(10293);
  const [qrProgress, setQrProgress] = useState<number>(100);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setQrProgress((prev) => {
        if (prev <= 2) {
          setQrSeed(Math.floor(Math.random() * 90000) + 10000);
          return 100;
        }
        return prev - 2;
      });
    }, 100);
    return () => clearInterval(progressInterval);
  }, []);

  return (
    <div className="space-y-5 flex-grow flex flex-col justify-between">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
        
        {/* Left: Card Profile info */}
        <div className="relative bg-black/30 border border-white/5 rounded-xl p-4 md:col-span-7 space-y-3.5 flex flex-col justify-between overflow-hidden">
          {/* Terminal corners */}
          <div className="absolute top-1.5 left-2 text-[#9CA3AF]/20 font-mono text-[9px] pointer-events-none select-none">┌</div>
          <div className="absolute top-1.5 right-2 text-[#9CA3AF]/20 font-mono text-[9px] pointer-events-none select-none">┐</div>
          <div className="absolute bottom-1.5 left-2 text-[#9CA3AF]/20 font-mono text-[9px] pointer-events-none select-none">└</div>
          <div className="absolute bottom-1.5 right-2 text-[#9CA3AF]/20 font-mono text-[9px] pointer-events-none select-none">┘</div>
          
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#00C853] to-[#00ff87] flex items-center justify-center text-white font-black text-sm border border-white/15 shadow-lg shadow-[#00ff87]/10">
              GK
            </div>
            <div>
              <div className="text-xs font-bold text-white">George K.</div>
              <div className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>{t('dashboardFeatures_db_status_active')}</span>
              </div>
            </div>
          </div>

          {/* Fields */}
          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-[#94A3B8] font-mono">{t('dashboardFeatures_db_tier')}:</span>
              <span className="text-[#00ff87] font-bold">{t('dashboardFeatures_db_tier_vip')}</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-white/5">
              <span className="text-[#94A3B8] font-mono">{t('dashboardFeatures_db_id')}:</span>
              <div className="flex items-center gap-1.5 font-mono text-[11px]">
                <span>{revealID ? '412-799-431' : '•••-•••-•••'}</span>
                <button
                  onClick={() => setRevealID(!revealID)}
                  className="text-[#00ff87] hover:text-[#00FF87] cursor-pointer focus:outline-none"
                >
                  {revealID ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>

          {/* Legal DPA lock banner */}
          <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-[#00ff87]/10 border border-[#00ff87]/20 text-[9px] font-mono text-[#00ff87]">
            <Shield className="w-3.5 h-3.5 shrink-0" />
            <span>{t('dashboardFeatures_db_encrypted')}</span>
          </div>
        </div>

        {/* Right: Simulated Dynamic QR Pass code generator */}
        <div className="relative bg-black/30 border border-white/5 rounded-xl p-4 md:col-span-5 flex flex-col items-center justify-between text-center overflow-hidden">
          {/* Terminal corners */}
          <div className="absolute top-1.5 left-2 text-[#9CA3AF]/20 font-mono text-[9px] pointer-events-none select-none">┌</div>
          <div className="absolute top-1.5 right-2 text-[#9CA3AF]/20 font-mono text-[9px] pointer-events-none select-none">┐</div>
          <div className="absolute bottom-1.5 left-2 text-[#9CA3AF]/20 font-mono text-[9px] pointer-events-none select-none">└</div>
          <div className="absolute bottom-1.5 right-2 text-[#9CA3AF]/20 font-mono text-[9px] pointer-events-none select-none">┘</div>

          <div className="text-[10px] text-[#94A3B8] uppercase font-mono font-bold tracking-wider">{t('dashboardFeatures_db_qr')}</div>
          
          {/* Simulated QR Code Graphic */}
          <div className="my-2.5 p-2 bg-white rounded-lg inline-block relative group">
            <div className="w-24 h-24 flex flex-col justify-between items-stretch">
              <div className="grid grid-cols-6 gap-0.5 w-full h-full">
                {Array.from({ length: 36 }).map((_, i) => {
                  const isFinder = 
                    (i < 3 || (i >= 6 && i < 9) || (i >= 12 && i < 15)) || // top-left
                    (i % 6 >= 3 && i < 18) || // top-right
                    (i >= 18 && i % 6 < 3); // bottom-left
                  const seedValue = Math.sin(qrSeed + i) * 10000;
                  const isBlack = isFinder ? true : (seedValue - Math.floor(seedValue) > 0.5);
                  return (
                    <div
                      key={i}
                      className={`rounded-sm transition-all duration-300 ${
                        isBlack ? 'bg-slate-900' : 'bg-transparent'
                      }`}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          {/* Progress Bar (countdown to regenerate) */}
          <div className="w-full space-y-1.5">
            <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
              <div className="bg-[#00FF87] h-full transition-all duration-100" style={{ width: `${qrProgress}%` }}></div>
            </div>
            <button
              onClick={() => {
                setQrSeed(Math.floor(Math.random() * 90000) + 10000);
                setQrProgress(100);
              }}
              className="text-[9px] font-mono font-bold text-[#94A3B8] hover:text-[#00ff87] flex items-center justify-center gap-1 cursor-pointer mx-auto"
            >
              <RefreshCw className="w-2.5 h-2.5" />
              <span>{t('dashboardFeatures_db_qr_gen')}</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
