'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { ShieldCheck, CreditCard, Network, Lock, CheckCircle2, XCircle, Sparkles, Building2, KeyRound } from 'lucide-react';
import { soundEngine } from '@/core';

type DefenseTab = 'bank' | 'rbac' | 'ip_guard';

export const ControlPanelDefenseSimulator: React.FC = () => {
  const { t, locale } = useLanguage();
  const [activeTab, setActiveTab] = useState<DefenseTab>('bank');
  const [testIpStatus, setTestIpStatus] = useState<'granted' | 'blocked'>('granted');

  const handleTabChange = (tab: DefenseTab) => {
    soundEngine.playPulseNode();
    setActiveTab(tab);
  };

  return (
    <div className="space-y-4 flex-grow flex flex-col justify-between select-none">
      {/* Top Header: Sub-view Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-white/10">
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-black/40 border border-white/10">
          <button
            type="button"
            onClick={() => handleTabChange('bank')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'bank'
                ? 'bg-[#00ff87]/20 border border-[#00ff87]/40 text-[#00ff87] shadow-[0_0_12px_rgba(0,255,135,0.2)]'
                : 'text-[#94A3B8] hover:text-white'
            }`}
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>{locale === 'ka' ? 'პირდაპირი ბანკი & 0% თაღლითობა' : locale === 'ru' ? 'Прямой банк и 0% фрод' : 'Direct Bank & Zero-Fraud'}</span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange('rbac')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'rbac'
                ? 'bg-[#00A3FF]/20 border border-[#00A3FF]/40 text-[#00A3FF] shadow-[0_0_12px_rgba(0,163,255,0.2)]'
                : 'text-[#94A3B8] hover:text-white'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>{locale === 'ka' ? 'RBAC როლების მატრიცა' : locale === 'ru' ? 'RBAC Матрица ролей' : 'RBAC Roles Matrix'}</span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange('ip_guard')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'ip_guard'
                ? 'bg-purple-500/20 border border-purple-500/40 text-purple-300 shadow-[0_0_12px_rgba(168,85,247,0.2)]'
                : 'text-[#94A3B8] hover:text-white'
            }`}
          >
            <Network className="w-3.5 h-3.5" />
            <span>{locale === 'ka' ? 'IP-Guard ქსელური შეზღუდვა' : locale === 'ru' ? 'IP-Guard Ограничение' : 'IP-Guard Network Lock'}</span>
          </button>
        </div>

        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[10px] font-bold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>ZERO-TRUST DEFENSE</span>
        </div>
      </div>

      {/* Tab 1: Bank & Financial Sovereignty */}
      {activeTab === 'bank' && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch flex-grow">
          {/* Left: Security Ledger */}
          <div className="md:col-span-7 bg-black/30 border border-white/5 rounded-xl p-4 flex flex-col justify-between space-y-3">
            <div>
              <div className="text-[10px] text-emerald-400 font-mono font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3 h-3" />
                {locale === 'ka' ? 'პირდაპირი საბანკო ანგარიშსწორება' : 'Direct Merchant Settlement'}
              </div>
              <h4 className="text-sm font-bold text-white mt-1">
                {locale === 'ka' ? 'თანხა მიდის პირდაპირ თქვენს IBAN-ზე' : 'Funds route directly to your Gym IBAN'}
              </h4>
              <p className="text-xs text-gray-300 mt-1 leading-relaxed">
                {locale === 'ka'
                  ? 'არავითარი შუალედური ბალანსები ან შეყოვნებული გამოტანა. TBC/BOG API ინტეგრაციით ყველა გადახდა მომენტალურად ჯდება თქვენს ანგარიშზე.'
                  : 'No intermediary escrow wallets. All online and POS card payments settle instantly directly to your business account.'}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10 text-[10px] font-mono">
              <div className="p-2 rounded bg-white/5 border border-white/10">
                <span className="text-gray-400 block">{locale === 'ka' ? 'ტრანზაქციის საკომისიო' : 'Payout Fee'}</span>
                <span className="text-emerald-400 font-bold text-xs">0% {locale === 'ka' ? 'ართრონის საკომისიო' : 'Platform Cut'}</span>
              </div>
              <div className="p-2 rounded bg-white/5 border border-white/10">
                <span className="text-gray-400 block">{locale === 'ka' ? 'ჩეკების დაცვა' : 'Audit Immutability'}</span>
                <span className="text-cyan-400 font-bold text-xs">{locale === 'ka' ? 'წაშლა აკრძალულია' : 'Zero Deletions'}</span>
              </div>
            </div>
          </div>

          {/* Right: Bank Card Visual */}
          <div className="md:col-span-5 bg-gradient-to-br from-[#0B1528] to-[#060D1A] border border-[#00A3FF]/30 rounded-xl p-4 flex flex-col justify-between relative overflow-hidden shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#00A3FF]/20 border border-[#00A3FF]/40 flex items-center justify-center text-[#00A3FF]">
                  <CreditCard className="w-4 h-4" />
                </div>
                <span className="text-xs font-mono font-bold text-white">ARTRON PAY LINK</span>
              </div>
              <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-bold">
                ENCRYPTED
              </span>
            </div>

            <div className="my-2">
              <div className="text-[10px] text-gray-400 font-mono">BUSINESS IBAN:</div>
              <div className="text-xs font-mono font-bold text-slate-200 tracking-wider">GE42TB7900000012345678</div>
              <div className="text-[10px] text-emerald-400 font-mono mt-1 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> PCI-DSS COMPLIANT // NO RAW CARDS STORED
              </div>
            </div>

            <div className="text-[9px] text-gray-400 border-t border-white/10 pt-2 flex justify-between font-mono">
              <span>SECURITY: SHA-256</span>
              <span className="text-white font-bold">BANK DIRECT</span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: RBAC Role Matrix */}
      {activeTab === 'rbac' && (
        <div className="bg-black/30 border border-white/5 rounded-xl p-4 flex-grow flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-xs font-bold text-white flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#00A3FF]" />
              <span>{locale === 'ka' ? 'თანამშრომელთა უფლებების განაწილება (RBAC)' : 'Role-Based Access Control (RBAC)'}</span>
            </div>
            <span className="text-[10px] font-mono text-gray-400">{locale === 'ka' ? 'მკაცრად იზოლირებული როლები' : 'Strict Isolation'}</span>
          </div>

          <div className="space-y-1.5 overflow-x-auto text-[11px]">
            <div className="grid grid-cols-12 gap-2 p-1.5 rounded bg-white/5 font-mono text-[10px] text-gray-400 font-bold uppercase">
              <div className="col-span-3">{locale === 'ka' ? 'როლი' : 'Role'}</div>
              <div className="col-span-3 text-center">{locale === 'ka' ? 'კლიენტთა ბაზა' : 'Clients'}</div>
              <div className="col-span-3 text-center">{locale === 'ka' ? 'ფინანსები' : 'Finance'}</div>
              <div className="col-span-3 text-center">{locale === 'ka' ? 'ტურნიკეტი' : 'Turnstile'}</div>
            </div>

            {/* Director */}
            <div className="grid grid-cols-12 gap-2 p-2 rounded bg-black/40 border border-white/5 items-center font-mono">
              <div className="col-span-3 font-bold text-white flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>{locale === 'ka' ? 'დირექტორი' : 'Director'}</span>
              </div>
              <div className="col-span-3 text-center text-emerald-400 flex items-center justify-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Full</div>
              <div className="col-span-3 text-center text-emerald-400 flex items-center justify-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Full</div>
              <div className="col-span-3 text-center text-emerald-400 flex items-center justify-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Override</div>
            </div>

            {/* Receptionist */}
            <div className="grid grid-cols-12 gap-2 p-2 rounded bg-black/40 border border-white/5 items-center font-mono">
              <div className="col-span-3 font-bold text-white flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00A3FF]" />
                <span>{locale === 'ka' ? 'ადმინისტრატორი' : 'Reception'}</span>
              </div>
              <div className="col-span-3 text-center text-emerald-400 flex items-center justify-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> View/Reg</div>
              <div className="col-span-3 text-center text-rose-400 flex items-center justify-center gap-1"><XCircle className="w-3.5 h-3.5" /> Blocked</div>
              <div className="col-span-3 text-center text-emerald-400 flex items-center justify-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Pass Entry</div>
            </div>

            {/* Trainer */}
            <div className="grid grid-cols-12 gap-2 p-2 rounded bg-black/40 border border-white/5 items-center font-mono">
              <div className="col-span-3 font-bold text-white flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                <span>{locale === 'ka' ? 'მწვრთნელი' : 'Trainer'}</span>
              </div>
              <div className="col-span-3 text-center text-amber-400 flex items-center justify-center gap-1">Only Own</div>
              <div className="col-span-3 text-center text-rose-400 flex items-center justify-center gap-1"><XCircle className="w-3.5 h-3.5" /> Blocked</div>
              <div className="col-span-3 text-center text-rose-400 flex items-center justify-center gap-1"><XCircle className="w-3.5 h-3.5" /> No Access</div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: IP Guard */}
      {activeTab === 'ip_guard' && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch flex-grow">
          <div className="md:col-span-7 bg-black/30 border border-white/5 rounded-xl p-4 flex flex-col justify-between space-y-3">
            <div>
              <div className="text-[10px] text-purple-400 font-mono font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Network className="w-3 h-3" />
                {locale === 'ka' ? 'ლოკაციური უსაფრთხოება' : 'Geo-Fenced Local IP Whitelist'}
              </div>
              <h4 className="text-sm font-bold text-white mt-1">
                {locale === 'ka' ? 'პანელზე წვდომა მხოლოდ დარბაზის შიდა ქსელიდან' : 'Access Restricted to Gym Wi-Fi/LAN'}
              </h4>
              <p className="text-xs text-gray-300 mt-1 leading-relaxed">
                {locale === 'ka'
                  ? 'თანამშრომლები სისტემაში სახლიდან ვერ შევლენ. მართვის პანელი იხსნება მხოლოდ იმ IP მისამართებზე, რომლებიც თქვენ წინასწარ დაამტკიცეთ.'
                  : 'Staff cannot access member databases or financial logs from home. Management panel opens strictly on approved gym Wi-Fi/IPs.'}
              </p>
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-white/10 font-mono text-xs">
              <span className="text-gray-400">{locale === 'ka' ? 'სიმულაცია:' : 'Simulation:'}</span>
              <button
                type="button"
                onClick={() => {
                  soundEngine.playPulseNode();
                  setTestIpStatus('granted');
                }}
                className={`px-2.5 py-1 rounded text-[10px] font-bold cursor-pointer ${
                  testIpStatus === 'granted' ? 'bg-emerald-500 text-black font-black' : 'bg-white/10 text-gray-400'
                }`}
              >
                192.168.1.5 (Gym Wi-Fi)
              </button>
              <button
                type="button"
                onClick={() => {
                  soundEngine.playPulseNode();
                  setTestIpStatus('blocked');
                }}
                className={`px-2.5 py-1 rounded text-[10px] font-bold cursor-pointer ${
                  testIpStatus === 'blocked' ? 'bg-rose-500 text-white font-black' : 'bg-white/10 text-gray-400'
                }`}
              >
                85.117.42.1 (Foreign Home IP)
              </button>
            </div>
          </div>

          <div className={`md:col-span-5 rounded-xl p-4 flex flex-col justify-between items-center text-center border transition-all ${
            testIpStatus === 'granted'
              ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-400'
              : 'bg-rose-950/30 border-rose-500/50 text-rose-400'
          }`}>
            <div className="my-auto space-y-2">
              <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center ${
                testIpStatus === 'granted' ? 'bg-emerald-500/20 border border-emerald-500/40' : 'bg-rose-500/20 border border-rose-500/40 animate-pulse'
              }`}>
                {testIpStatus === 'granted' ? <CheckCircle2 className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
              </div>
              <div className="font-mono text-xs font-bold text-white">
                {testIpStatus === 'granted'
                  ? (locale === 'ka' ? 'წვდომა დაშვებულია' : 'ACCESS GRANTED')
                  : (locale === 'ka' ? 'წვდომა დაბლოკილია' : 'ACCESS DENIED: FOREIGN IP')}
              </div>
              <p className="text-[10px] text-gray-300 font-mono">
                {testIpStatus === 'granted'
                  ? 'Gym LAN Verified (Tbilisi HQ)'
                  : 'Zero-Trust Protocol: IP not in whitelist'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
