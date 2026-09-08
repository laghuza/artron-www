'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { THREAT_SCENARIOS, ThreatScenario } from '@/data/enterpriseSecurityData';
import { soundEngine } from '@/core';
import { 
  AlertTriangle, 
  ShieldAlert, 
  CheckCircle2, 
  Play, 
  Terminal,
  Moon,
  Zap,
  MapPin,
  LogOut,
  ShieldCheck
} from 'lucide-react';

const getScenarioIcon = (id: string, isSelected: boolean) => {
  switch (id) {
    case 'night_login':
      return <Moon className={`w-4 h-4 ${isSelected ? 'text-indigo-400' : 'text-gray-400'}`} />;
    case 'brute_force':
      return <Zap className={`w-4 h-4 ${isSelected ? 'text-amber-400' : 'text-gray-400'}`} />;
    case 'foreign_ip':
      return <MapPin className={`w-4 h-4 ${isSelected ? 'text-cyan-400' : 'text-gray-400'}`} />;
    case 'force_logout':
      return <LogOut className={`w-4 h-4 ${isSelected ? 'text-[#00ff87]' : 'text-gray-400'}`} />;
    default:
      return <ShieldAlert className={`w-4 h-4 ${isSelected ? 'text-red-400' : 'text-gray-400'}`} />;
  }
};

export const ThreatDefenseConsole: React.FC = () => {
  const [activeScenarioId, setActiveScenarioId] = useState<string>(THREAT_SCENARIOS[0].id);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simulationLog, setSimulationLog] = useState<string[]>([]);

  const selectedScenario = THREAT_SCENARIOS.find((s) => s.id === activeScenarioId) || THREAT_SCENARIOS[0];

  const handleRunSimulation = (scenario: ThreatScenario) => {
    soundEngine.playPulseNode();
    setActiveScenarioId(scenario.id);
    setIsSimulating(true);
    setSimulationLog([
      `[${new Date().toLocaleTimeString()}] დაფიქსირდა ტრიგერი: ${scenario.triggerEvent}`,
      `[${new Date().toLocaleTimeString()}] ანომალიის ამოცნობის ძრავი: ARTRON_THREAT_ANALYZER_v2`,
    ]);

    setTimeout(() => {
      soundEngine.playSystemAccess();
      setSimulationLog((prev) => [
        ...prev,
        `[${new Date().toLocaleTimeString()}] რეაქცია: ${scenario.systemAction}`,
        `[${new Date().toLocaleTimeString()}] სტატუსი: საფრთხე განეიტრალებულია 100% [0.42 წმ]`,
      ]);
      setIsSimulating(false);
    }, 900);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* Left: Scenario Selectors */}
      <div className="lg:col-span-5 space-y-3">
        <div className="text-xs font-mono text-gray-400 uppercase tracking-wider pb-1 px-1">
          ამოირჩიეთ სატესტო საფრთხის სცენარი:
        </div>

        {THREAT_SCENARIOS.map((scenario) => {
          const isSelected = scenario.id === activeScenarioId;
          return (
            <button
              key={scenario.id}
              type="button"
              onClick={() => handleRunSimulation(scenario)}
              className={`w-full p-4 rounded-2xl border text-left transition-all duration-300 space-y-2 group relative overflow-hidden ${
                isSelected
                  ? 'bg-[#121722] border-[#00ff87]/60 shadow-[0_0_25px_rgba(0,255,135,0.18)]'
                  : 'bg-black/30 border-white/10 hover:border-white/20 hover:bg-white/[0.03]'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                    isSelected ? 'bg-[#00ff87]/15 border border-[#00ff87]/30 shadow-[0_0_10px_rgba(0,255,135,0.2)]' : 'bg-white/5 border border-white/10'
                  }`}>
                    {getScenarioIcon(scenario.id, isSelected)}
                  </div>
                  <span className="text-xs font-bold text-white group-hover:text-[#00ff87] transition-colors">
                    {scenario.title}
                  </span>
                </div>
                <span
                  className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border uppercase font-semibold ${
                    scenario.badgeType === 'critical'
                      ? 'bg-red-500/15 text-red-400 border-red-500/30'
                      : scenario.badgeType === 'warning'
                      ? 'bg-amber-500/15 text-amber-400 border-amber-500/30'
                      : 'bg-[#00ff87]/15 text-[#00ff87] border-[#00ff87]/30'
                  }`}
                >
                  {scenario.badgeText}
                </span>
              </div>
              <p className="text-[11px] text-gray-300 pl-10.5 leading-relaxed">
                {scenario.triggerEvent}
              </p>
            </button>
          );
        })}
      </div>

      {/* Right: Live Terminal Security Execution Console */}
      <div className="lg:col-span-7 bg-[#05080E] border border-white/15 rounded-3xl p-5 sm:p-7 shadow-2xl space-y-4 font-mono relative overflow-hidden">
        {/* Glow corner */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#00ff87]/5 rounded-full blur-3xl pointer-events-none" />

        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3 relative z-10">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 shadow-[0_0_6px_rgba(239,68,68,0.5)]" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 shadow-[0_0_6px_rgba(245,158,11,0.5)]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#00ff87] shadow-[0_0_8px_#00ff87]" />
            <span className="text-xs text-gray-300 ml-2 font-bold tracking-wider">
              ARTRON // THREAT_ENGINE_SIMULATOR
            </span>
          </div>
          <span className="text-[10px] text-[#00A3FF] bg-[#00A3FF]/10 px-2.5 py-0.5 rounded-full border border-[#00A3FF]/20 font-bold">
            AUTO-DEFENSE ACTIVE
          </span>
        </div>

        {/* Selected Scenario Preview Box */}
        <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2 relative z-10">
          <div className="flex items-center gap-2 text-xs text-white font-bold">
            <div className="w-6 h-6 rounded-md bg-[#00A3FF]/20 flex items-center justify-center">
              {getScenarioIcon(selectedScenario.id, true)}
            </div>
            <span>{selectedScenario.title}</span>
          </div>
          <div className="text-xs text-[#00ff87] bg-[#00ff87]/10 p-2.5 rounded-xl border border-[#00ff87]/20 leading-relaxed font-sans">
            {selectedScenario.systemAction}
          </div>
        </div>

        {/* Console Log Window */}
        <div className="bg-black/70 rounded-2xl p-4 border border-white/5 space-y-2 min-h-[140px] text-xs relative z-10 shadow-inner">
          <div className="text-gray-400 text-[11px] pb-1 border-b border-white/5 flex items-center gap-2 font-mono">
            <Terminal className="w-3.5 h-3.5 text-[#00A3FF]" />
            <span>რეალური დროის უსაფრთხოების ლოგი:</span>
          </div>

          {simulationLog.length === 0 ? (
            <div className="text-gray-500 italic py-6 text-center text-xs">
              დააჭირეთ მარცხნივ ნებისმიერ სცენარს ან ქვემოთ ღილაკს სიმულაციისთვის...
            </div>
          ) : (
            simulationLog.map((log, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                className={`text-[11px] leading-relaxed ${
                  log.includes('საფრთხე') || log.includes('რეაქცია')
                    ? 'text-[#00ff87] font-bold'
                    : log.includes('დაფიქსირდა')
                    ? 'text-amber-300'
                    : 'text-gray-400'
                }`}
              >
                {log}
              </motion.div>
            ))
          )}
        </div>

        {/* Trigger Button */}
        <button
          type="button"
          onClick={() => handleRunSimulation(selectedScenario)}
          disabled={isSimulating}
          className="w-full py-3.5 bg-gradient-to-r from-[#00ff87] to-[#00A3FF] hover:opacity-95 text-black font-sans font-extrabold text-xs rounded-xl transition-all shadow-[0_0_20px_rgba(0,255,135,0.25)] flex items-center justify-center gap-2 active:scale-98 relative z-10"
        >
          <Play className="w-3.5 h-3.5 fill-black" />
          {isSimulating ? 'ანომალიის დამუშავება...' : `⚡ შეამოწმეთ დაცვა: "${selectedScenario.title}"`}
        </button>
      </div>
    </div>
  );
};
