"use client";

import React, { useState } from 'react';
import { IP_COMPARISON_MATRIX, INITIAL_BRANCH_IPS, INITIAL_USER_IP_RULES } from '@/data/ipWhitelistData';
import { soundEngine } from '@/core';
import { IpSimulationConsole } from '../gateway/widgets/live/ip-whitelist/IpSimulationConsole';

export const IpWhitelistSecurityShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'SIMULATION' | 'COMPARISON' | 'BENEFITS'>('SIMULATION');
  const [userRules] = useState(INITIAL_USER_IP_RULES);
  const [branchIps] = useState(INITIAL_BRANCH_IPS);

  return (
    <section className="relative w-full py-16 px-4 sm:px-6 lg:px-8 bg-[#090D14] border-t border-b border-white/10 overflow-hidden select-none">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-[#00ff87]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-[#00A3FF]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 space-y-10">
        {/* Header Title Section */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00ff87]/10 border border-[#00ff87]/30 font-mono text-[11px] text-[#00ff87] uppercase tracking-[0.2em]">
            <span className="w-2 h-2 rounded-full bg-[#00ff87] animate-pulse" />
            ZERO-TRUST IP GEO-FENCING &amp; ALLOWED IP
          </div>

          <h2 className="font-mono text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            🛡️ მხოლოდ დარბაზიდან მართვის გარანტია
          </h2>

          <p className="font-sans text-sm sm:text-base text-gray-300 max-w-2xl mx-auto leading-relaxed">
            მკაცრად შეზღუდეთ თანამშრომელთა წვდომა სისტემაზე მხოლოდ ფილიალის ოფიციალური Wi-Fi/LAN ქსელიდან.
            აღკვეთეთ სახლიდან შესვლა, მონაცემთა გაჟონვა და უნებართვო ფინანსური ოპერაციები.
          </p>
        </div>

        {/* 3 Core Value Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-[#121722]/80 border border-white/10 hover:border-[#00ff87]/40 transition-all space-y-2 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
            <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-xl">
              🛑
            </div>
            <h3 className="font-mono text-sm font-bold text-white uppercase tracking-wider">
              1. ფინანსური თაღლითობის აღკვეთა
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              მოლარე ვერ შეძლებს სახლიდან აბონემენტის გაყიდვას, თანხის გატარებას, ჩეკის გაუქმებას ან კლიენტის ბალანსის შეცვლას.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#121722]/80 border border-white/10 hover:border-[#00B0FF]/40 transition-all space-y-2 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
            <div className="w-10 h-10 rounded-xl bg-[#00B0FF]/10 border border-[#00B0FF]/30 flex items-center justify-center text-xl">
              🔒
            </div>
            <h3 className="font-mono text-sm font-bold text-white uppercase tracking-wider">
              2. ბაზების გაჟონვისგან დაცვა
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              პერსონალი ვერ შეძლებს სამუშაო საათების შემდეგ სახლიდან კლიენტთა ბაზების, ტელეფონის ნომრების ან ანგარიშგებების გადმოწერას.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#121722]/80 border border-white/10 hover:border-[#00ff87]/40 transition-all space-y-2 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
            <div className="w-10 h-10 rounded-xl bg-[#00ff87]/10 border border-[#00ff87]/30 flex items-center justify-center text-xl">
              ⏱️
            </div>
            <h3 className="font-mono text-sm font-bold text-white uppercase tracking-wider">
              3. სამუშაო დისციპლინა (№01-15/ნ)
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              სისტემაში მუშაობა შესაძლებელია მხოლოდ მაშინ, როცა თანამშრომელი ფიზიკურად იმყოფება ობიექტზე და მიერთებულია დარბაზის LAN-ზე.
            </p>
          </div>
        </div>

        {/* Interactive Center Hub & Tabs */}
        <div className="bg-[#0D121B] border border-[#00ff87]/30 rounded-2xl p-4 sm:p-6 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.6)] space-y-6">
          {/* Sub Navigation */}
          <div className="flex items-center justify-center gap-2 p-1 bg-black/50 rounded-xl border border-white/10 max-w-md mx-auto">
            <button
              type="button"
              onClick={() => {
                soundEngine.playPulseNode();
                setActiveTab('SIMULATION');
              }}
              className={`flex-1 py-2 rounded-lg text-xs font-mono font-bold transition-all ${
                activeTab === 'SIMULATION'
                  ? 'bg-[#00ff87]/20 text-[#00ff87] border border-[#00ff87]/60 shadow-[0_0_12px_rgba(0,255,135,0.3)]'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              🧪 ცოცხალი სიმულატორი
            </button>
            <button
              type="button"
              onClick={() => {
                soundEngine.playPulseNode();
                setActiveTab('COMPARISON');
              }}
              className={`flex-1 py-2 rounded-lg text-xs font-mono font-bold transition-all ${
                activeTab === 'COMPARISON'
                  ? 'bg-[#00A3FF]/20 text-[#00A3FF] border border-[#00A3FF]/60 shadow-[0_0_12px_rgba(0,163,255,0.3)]'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              📊 შედარების მატრიცა
            </button>
          </div>

          {/* Tab 1: Live Interactive Simulator */}
          {activeTab === 'SIMULATION' && (
            <div className="max-w-xl mx-auto bg-[#090D14] border border-white/10 rounded-xl p-4 shadow-inner">
              <div className="mb-3 text-center">
                <span className="text-xs font-mono text-[#00ff87] uppercase tracking-wider">
                  [ გამოსცადეთ რეალურ დროში: დარბაზის LAN vs სახლის IP ]
                </span>
              </div>
              <IpSimulationConsole
                userRules={userRules}
                branchIps={branchIps}
                onLogAttempt={() => {}}
              />
            </div>
          )}

          {/* Tab 2: Comparison Table */}
          {activeTab === 'COMPARISON' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-sans border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-gray-400 font-mono text-[11px] uppercase tracking-wider">
                    <th className="py-3 px-4">მახასიათებელი</th>
                    <th className="py-3 px-4 text-gray-400">სტანდარტული ფიტნეს პროგრამები</th>
                    <th className="py-3 px-4 text-[#00ff87] font-bold">Artron SaaS პლატფორმა</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {IP_COMPARISON_MATRIX.map((row) => (
                    <tr key={row.featureKey} className="hover:bg-white/5 transition-all">
                      <td className="py-3 px-4 font-bold text-white">{row.featureTitle}</td>
                      <td className="py-3 px-4 text-gray-400">{row.standardSystem}</td>
                      <td className="py-3 px-4 text-[#00ff87] font-medium bg-[#00ff87]/5">{row.artronSaas}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Bottom Trust CTA Band */}
        <div className="flex flex-col sm:flex-row items-center justify-between p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 via-black/60 to-cyan-950/40 border border-[#00ff87]/30 text-xs text-gray-300">
          <div className="flex items-center gap-2 mb-2 sm:mb-0">
            <span className="text-lg">👑</span>
            <span>
              <strong>მფლობელის უპირატესობა:</strong> მართეთ მსოფლიოს ნებისმიერი წერტილიდან, ხოლო პერსონალი შეზღუდეთ მხოლოდ დარბაზის ლოკაციით.
            </span>
          </div>
          <span className="font-mono text-[#00ff87] font-bold uppercase tracking-wider">
            100% ZERO-TRUST POLICY
          </span>
        </div>
      </div>
    </section>
  );
};
