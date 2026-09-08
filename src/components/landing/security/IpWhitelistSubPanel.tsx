'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IP_COMPARISON_MATRIX, INITIAL_BRANCH_IPS, INITIAL_USER_IP_RULES } from '@/data/ipWhitelistData';
import { soundEngine } from '@/core';
import { IpSimulationConsole } from '@/components/gateway/widgets/live/ip-whitelist/IpSimulationConsole';

export const IpWhitelistSubPanel: React.FC = () => {
  const [subTab, setSubTab] = useState<'SIMULATION' | 'COMPARISON'>('SIMULATION');
  const [userRules] = useState(INITIAL_USER_IP_RULES);
  const [branchIps] = useState(INITIAL_BRANCH_IPS);

  return (
    <div className="space-y-6">
      {/* Sub Navigation */}
      <div className="flex items-center justify-center gap-2 p-1.5 bg-black/60 rounded-xl border border-white/10 max-w-md mx-auto">
        <button
          type="button"
          onClick={() => {
            soundEngine.playPulseNode();
            setSubTab('SIMULATION');
          }}
          className={`flex-1 py-2 px-3 rounded-lg text-xs font-mono font-bold transition-all flex items-center justify-center gap-1.5 ${
            subTab === 'SIMULATION'
              ? 'bg-[#00ff87]/20 text-[#00ff87] border border-[#00ff87]/60 shadow-[0_0_12px_rgba(0,255,135,0.25)]'
              : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          <span>🧪</span> ცოცხალი სიმულატორი
        </button>
        <button
          type="button"
          onClick={() => {
            soundEngine.playPulseNode();
            setSubTab('COMPARISON');
          }}
          className={`flex-1 py-2 px-3 rounded-lg text-xs font-mono font-bold transition-all flex items-center justify-center gap-1.5 ${
            subTab === 'COMPARISON'
              ? 'bg-[#00A3FF]/20 text-[#00A3FF] border border-[#00A3FF]/60 shadow-[0_0_12px_rgba(0,163,255,0.25)]'
              : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          <span>📊</span> შედარების მატრიცა
        </button>
      </div>

      <AnimatePresence mode="wait">
        {subTab === 'SIMULATION' && (
          <motion.div
            key="SIMULATION"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="max-w-xl mx-auto bg-[#090D14] border border-white/10 rounded-2xl p-5 shadow-inner"
          >
            <div className="mb-4 text-center">
              <span className="text-xs font-mono text-[#00ff87] uppercase tracking-wider">
                [ გამოსცადეთ რეალურ დროში: დარბაზის LAN vs სახლის IP ]
              </span>
            </div>
            <IpSimulationConsole
              userRules={userRules}
              branchIps={branchIps}
              onLogAttempt={() => {}}
            />
          </motion.div>
        )}

        {subTab === 'COMPARISON' && (
          <motion.div
            key="COMPARISON"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="overflow-x-auto rounded-2xl border border-white/10 bg-[#090D14]/70 backdrop-blur-sm"
          >
            <table className="w-full text-left text-xs font-sans border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-gray-400 font-mono text-[11px] uppercase tracking-wider bg-white/[0.02]">
                  <th className="py-3.5 px-4 sm:px-6">მახასიათებელი</th>
                  <th className="py-3.5 px-4 sm:px-6 text-gray-400">სტანდარტული ფიტნეს პროგრამები</th>
                  <th className="py-3.5 px-4 sm:px-6 text-[#00ff87] font-bold">Artron SaaS პლატფორმა</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {IP_COMPARISON_MATRIX.map((row) => (
                  <tr key={row.featureKey} className="hover:bg-white/5 transition-all">
                    <td className="py-3.5 px-4 sm:px-6 font-bold text-white">{row.featureTitle}</td>
                    <td className="py-3.5 px-4 sm:px-6 text-gray-400">{row.standardSystem}</td>
                    <td className="py-3.5 px-4 sm:px-6 text-[#00ff87] font-medium bg-[#00ff87]/5">{row.artronSaas}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
