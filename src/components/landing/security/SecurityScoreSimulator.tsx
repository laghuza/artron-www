'use client';

import React, { useState, useMemo, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  Check, 
  Plus, 
  Sparkles, 
  RefreshCw,
  KeyRound,
  Fingerprint,
  Smartphone,
  ShieldAlert,
  Laptop,
  Building2,
  BellRing,
  Lock
} from 'lucide-react';
import { SECURITY_SCORE_FACTORS, SecurityFactor } from '@/data/enterpriseSecurityData';
import { soundEngine } from '@/core';

const getFactorIcon = (id: string, isActive: boolean) => {
  switch (id) {
    case 'strong_password':
      return <KeyRound className={`w-4 h-4 ${isActive ? 'text-[#00A3FF]' : 'text-gray-400'}`} />;
    case 'webauthn_passkey':
      return <Fingerprint className={`w-4 h-4 ${isActive ? 'text-[#00ff87]' : 'text-gray-400'}`} />;
    case 'backup_webauthn':
      return <Smartphone className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-gray-400'}`} />;
    case 'backup_codes':
      return <ShieldAlert className={`w-4 h-4 ${isActive ? 'text-purple-400' : 'text-gray-400'}`} />;
    case 'trusted_devices':
      return <Laptop className={`w-4 h-4 ${isActive ? 'text-sky-400' : 'text-gray-400'}`} />;
    case 'allowed_ip':
      return <Building2 className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-gray-400'}`} />;
    case 'threat_alerts':
      return <BellRing className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-gray-400'}`} />;
    default:
      return <Lock className={`w-4 h-4 ${isActive ? 'text-[#00A3FF]' : 'text-gray-400'}`} />;
  }
};

export const SecurityScoreSimulator: React.FC = () => {
  const [activeFactorIds, setActiveFactorIds] = useState<string[]>(
    SECURITY_SCORE_FACTORS.filter((f) => f.defaultEnabled).map((f) => f.id)
  );

  const gaugeRef = useRef<HTMLDivElement>(null);
  const [gaugeMouse, setGaugeMouse] = useState({ x: 0, y: 0 });
  const [isGaugeHovered, setIsGaugeHovered] = useState(false);

  const handleGaugeMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!gaugeRef.current) return;
    const rect = gaugeRef.current.getBoundingClientRect();
    setGaugeMouse({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  const totalScore = useMemo(() => {
    return SECURITY_SCORE_FACTORS.reduce((acc, factor) => {
      return activeFactorIds.includes(factor.id) ? acc + factor.points : acc;
    }, 0);
  }, [activeFactorIds]);

  const scoreLevel = useMemo(() => {
    if (totalScore >= 90) return { label: 'უმაღლესი (EXCELLENT)', color: '#00ff87', bg: 'bg-[#00ff87]/15', border: 'border-[#00ff87]/50', glow: 'rgba(0, 255, 135, 0.25)' };
    if (totalScore >= 70) return { label: 'კარგი (GOOD)', color: '#00A3FF', bg: 'bg-[#00A3FF]/15', border: 'border-[#00A3FF]/50', glow: 'rgba(0, 163, 255, 0.25)' };
    if (totalScore >= 45) return { label: 'საშუალო (MODERATE)', color: '#f59e0b', bg: 'bg-amber-500/15', border: 'border-amber-500/50', glow: 'rgba(245, 158, 11, 0.25)' };
    return { label: 'დაუცველი (WEAK)', color: '#ef4444', bg: 'bg-red-500/15', border: 'border-red-500/50', glow: 'rgba(239, 68, 68, 0.25)' };
  }, [totalScore]);

  const toggleFactor = (id: string) => {
    soundEngine.playPulseNode();
    setActiveFactorIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleReset = () => {
    soundEngine.playPulseNode();
    setActiveFactorIds(SECURITY_SCORE_FACTORS.filter((f) => f.defaultEnabled).map((f) => f.id));
  };

  const handleMaxSecurity = () => {
    soundEngine.playSystemAccess();
    setActiveFactorIds(SECURITY_SCORE_FACTORS.map((f) => f.id));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* Left: Interactive Score Gauge & Audit Summary with Cursor Spotlight */}
      <div 
        ref={gaugeRef}
        onMouseMove={handleGaugeMouseMove}
        onMouseEnter={() => setIsGaugeHovered(true)}
        onMouseLeave={() => setIsGaugeHovered(false)}
        className="lg:col-span-5 bg-[#090D14] border border-white/10 rounded-3xl p-6 relative overflow-hidden shadow-2xl space-y-6 transition-all duration-300"
        style={{
          borderColor: isGaugeHovered ? scoreLevel.color : undefined,
          boxShadow: isGaugeHovered ? `0 12px 36px ${scoreLevel.glow}` : undefined,
        }}
      >
        {/* Dynamic Cursor Spotlight */}
        <div
          className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-0"
          style={{
            opacity: isGaugeHovered ? 1 : 0,
            background: `radial-gradient(350px circle at ${gaugeMouse.x}px ${gaugeMouse.y}px, ${scoreLevel.glow}, transparent 80%)`,
          }}
        />

        {/* Ambient Glow */}
        <div 
          className="absolute -top-10 -left-10 w-48 h-48 rounded-full blur-3xl opacity-20 transition-all duration-500 pointer-events-none"
          style={{ backgroundColor: scoreLevel.color }}
        />

        <div className="flex items-center justify-between border-b border-white/10 pb-4 relative z-10">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 transition-colors duration-300" style={{ color: scoreLevel.color }} />
            <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
              REAL-TIME SECURITY SCORE
            </span>
          </div>
          <span className="text-[10px] font-mono text-gray-400 bg-white/5 px-2 py-0.5 rounded-full border border-white/10">
            AUDIT v2.4
          </span>
        </div>

        {/* Circular / Big Score Counter */}
        <div className="text-center py-4 relative z-10">
          <motion.div
            key={totalScore}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="text-6xl sm:text-7xl font-extrabold tracking-tight font-mono mb-2"
            style={{ color: scoreLevel.color, textShadow: `0 0 30px ${scoreLevel.glow}` }}
          >
            {totalScore}%
          </motion.div>

          <div
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold font-mono tracking-wide ${scoreLevel.bg} ${scoreLevel.border} border shadow-sm`}
            style={{ color: scoreLevel.color }}
          >
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: scoreLevel.color }} />
            {scoreLevel.label}
          </div>

          <p className="text-xs text-gray-300 mt-4 leading-relaxed max-w-xs mx-auto">
            {totalScore >= 90
              ? 'თქვენი დარბაზი დაცულია საერთაშორისო საბანკო კიბერ-სტანდარტებით. შიდა თაღლითობის რისკი: 0%.'
              : totalScore >= 70
              ? 'უსაფრთხოების კარგი დონე. ჩართეთ დარჩენილი მოდულები 100%-იანი თავდაცვისთვის.'
              : 'ყურადღება! რეკომენდებულია ბიომეტრიული გასაღებებისა და Allowed IP წესების გააქტიურება.'}
          </p>
        </div>

        {/* Action Controls */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10 relative z-10">
          <button
            type="button"
            onClick={handleMaxSecurity}
            className="py-2.5 px-3 bg-[#00ff87]/15 hover:bg-[#00ff87]/25 text-[#00ff87] border border-[#00ff87]/40 rounded-xl text-xs font-bold font-mono transition-all flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(0,255,135,0.15)] active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5" />
            100% MAX დაცვა
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="py-2.5 px-3 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 rounded-xl text-xs font-mono transition-all flex items-center justify-center gap-1.5 active:scale-95"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            სტანდარტული
          </button>
        </div>
      </div>

      {/* Right: Security Factor Toggles Checklist */}
      <div className="lg:col-span-7 space-y-2.5">
        <div className="flex items-center justify-between pb-2 px-1">
          <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">
            სისტემური თავდაცვის შრეები (ჩართეთ/გამორთეთ სატესტოდ):
          </span>
          <span className="text-xs font-mono text-[#00ff87] font-semibold bg-[#00ff87]/10 px-2 py-0.5 rounded-full border border-[#00ff87]/20">
            {activeFactorIds.length} / {SECURITY_SCORE_FACTORS.length} ჩართულია
          </span>
        </div>

        {SECURITY_SCORE_FACTORS.map((factor) => {
          const isActive = activeFactorIds.includes(factor.id);
          return (
            <button
              key={factor.id}
              type="button"
              onClick={() => toggleFactor(factor.id)}
              className={`w-full p-3.5 rounded-2xl border text-left transition-all duration-300 flex items-center justify-between gap-3 group relative overflow-hidden ${
                isActive
                  ? 'bg-[#121722]/95 border-[#00A3FF]/40 shadow-[0_4px_20px_rgba(0,163,255,0.12)] hover:border-[#00A3FF]'
                  : 'bg-black/30 border-white/5 opacity-60 hover:opacity-100 hover:border-white/20 hover:bg-white/[0.03]'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0 relative z-10">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg shrink-0 transition-transform group-hover:scale-105 duration-200 ${
                    isActive ? 'bg-[#00A3FF]/15 border border-[#00A3FF]/30 shadow-[0_0_12px_rgba(0,163,255,0.2)]' : 'bg-white/5 border border-white/10'
                  }`}
                >
                  {getFactorIcon(factor.id, isActive)}
                </div>
                <div className="truncate">
                  <div className="text-xs font-bold text-white group-hover:text-[#00A3FF] transition-colors truncate">
                    {factor.label}
                  </div>
                  <div className="text-[11px] text-gray-400 truncate">
                    {factor.description}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 shrink-0 relative z-10">
                <span className="text-xs font-mono font-bold text-[#00ff87]">
                  +{factor.points}%
                </span>
                <div
                  className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all duration-200 ${
                    isActive
                      ? 'bg-[#00ff87] text-black shadow-[0_0_12px_rgba(0,255,135,0.4)]'
                      : 'bg-white/10 text-gray-400 group-hover:bg-white/20'
                  }`}
                >
                  {isActive ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <Plus className="w-3.5 h-3.5" />}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
