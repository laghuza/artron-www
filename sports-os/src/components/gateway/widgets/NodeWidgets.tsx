"use client";

import React from 'react';

export const Node01FederationWidget: React.FC = () => (
  <div className="bg-[#16191E]/90 border border-[#262a33] p-3.5 rounded font-mono text-[11px] space-y-2.5 leading-relaxed">
    <div className="text-[#00E676] font-semibold flex justify-between">
      <span>&gt; CONNECTED FEDERATIONS:</span><span className="text-[10px] text-gray-500">AES-256</span>
    </div>
    <div className="space-y-1 text-gray-300">
      <div className="flex justify-between"><span>GEO_FOOTBALL_FED:</span><span className="text-[#00E676] font-bold">● ACTIVE</span></div>
      <div className="flex justify-between"><span>GEO_BASKETBALL_FED:</span><span className="text-[#00E676] font-bold">● ACTIVE</span></div>
      <div className="flex justify-between"><span>GEO_RUGBY_UNION:</span><span className="text-[#00E676] font-bold">● ACTIVE</span></div>
    </div>
  </div>
);

export const Node02BlueprintWidget: React.FC = () => (
  <div className="bg-[#16191E]/90 border border-[#262a33] p-3 rounded space-y-2">
    <svg viewBox="0 0 380 120" strokeWidth="0.8" className="w-full stroke-gray-600/30 fill-none">
      <rect x="5" y="5" width="370" height="110" rx="3" />
      <line x1="110" y1="5" x2="110" y2="115" /><line x1="260" y1="5" x2="260" y2="115" />
      <path d="M50 100 L170 30 M170 30 L185 80 M185 80 L310 30" className="stroke-[#00E676]/40 stroke-[1] stroke-dasharray-[3_3]" />
      <circle cx="50" cy="100" r="6" className="fill-[#121418] stroke-[#00E676] stroke-[1.5]" />
      <circle cx="185" cy="80" r="6" className="fill-[#121418] stroke-[#00E676] stroke-[1.5]" />
      <circle cx="170" cy="30" r="8" className="fill-[#121418] stroke-[#00E676] stroke-[1.5]" />
    </svg>
    <div className="flex justify-between items-center font-mono text-[10px] text-gray-400">
      <span>TURNSTILE: <span className="text-[#00E676]">RFID_ACTIVE</span></span><span>LATENCY: 0.2ms</span>
    </div>
  </div>
);

export const Node03ProWidget: React.FC = () => (
  <div className="bg-[#16191E]/90 border border-[#262a33] p-3 rounded font-mono text-[10px] space-y-1.5 text-gray-300">
    <div className="text-[#D97736] font-bold">&gt; ATHLETE_PROFESSIONAL_NODES</div>
    <div className="flex justify-between"><span>SCHEDULING_ENGINE:</span><span className="text-[#00E676]">SYNC_OK</span></div>
    <div className="flex justify-between"><span>CONTRACT_LEDGER:</span><span className="text-[#00E676]">VERIFIED</span></div>
  </div>
);

export const Node04MobileWidget: React.FC = () => (
  <div className="bg-[#16191E]/90 border border-[#262a33] p-3 rounded font-mono text-[10px] space-y-1.5">
    <div className="text-[#00E676] font-bold">&gt; ATHLETE_MOBILE_OS_TELEMETRY</div>
    <div className="grid grid-cols-2 gap-2 text-gray-300">
      <div>HEART_RATE: <span className="text-[#00E676]">142 BPM</span></div>
      <div>GPS_TRACK: <span className="text-[#00E676]">LAT:41.71</span></div>
    </div>
  </div>
);

export const Node05MarketplaceWidget: React.FC = () => (
  <div className="bg-[#16191E]/90 border border-[#262a33] p-3 rounded flex items-center justify-between font-mono text-[10px]">
    <div className="space-y-1">
      <div className="text-[#D4AF37] font-bold">COINS & ACHIEVEMENTS</div>
      <div className="text-gray-400">REWARD_TOKEN: <span className="text-[#00E676]">ARTRON_COIN</span></div>
    </div>
    <div className="w-8 h-8 rounded-full border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] font-bold text-xs">A</div>
  </div>
);

export const Node06MarketWidget: React.FC = () => (
  <div className="bg-[#16191E]/90 border border-[#262a33] p-3 rounded font-mono text-[10px] space-y-1 text-gray-300">
    <div className="text-[#D4AF37] font-bold">&gt; B2B_MARKETPLACE_GATEWAY</div>
    <div className="flex justify-between"><span>API_PARTNERS:</span><span className="text-[#00E676]">24 ACTIVE</span></div>
  </div>
);

export const Node07AnalyticsWidget: React.FC = () => (
  <div className="bg-[#16191E]/90 border border-[#262a33] p-3 rounded font-mono text-[10px] space-y-1 text-gray-300">
    <div className="text-[#9CA3AF] font-bold">&gt; ENNEACORE_ANALYTICS_ENGINE</div>
    <div className="flex justify-between"><span>TELEMETRY_NODES:</span><span className="text-[#00E676]">9 ONLINE</span></div>
  </div>
);

export const Node08GdprShieldWidget: React.FC = () => (
  <div className="bg-[#16191E]/90 border border-[#262a33] p-3 rounded font-mono text-xs flex items-center space-x-3">
    <svg viewBox="0 0 100 100" className="w-8 h-8 stroke-gray-400 fill-none">
      <path d="M50 10 C65 10, 80 15, 80 15 C80 15, 80 50, 50 80 C20 50, 20 15, 20 15 C20 15, 35 10, 50 10 Z" strokeWidth="1.5" />
      <path d="M35 45 L45 55 L65 35" className="stroke-[#00E676]" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
    <div>
      <div className="text-white font-bold text-[11px]">GDPR & ISO 27001 SECURE</div>
      <div className="text-[9px] text-gray-400">AES-256 PII Encrypted • 14-Day Purge</div>
    </div>
  </div>
);

import { soundEngine } from '@/core';

export const Node09AccessWidget: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<'REGISTER' | 'LOGIN'>('REGISTER');
  const [entityType, setEntityType] = React.useState<'FEDERATION' | 'CLUB' | 'ATHLETE' | 'SPECIALIST'>('FEDERATION');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [entityName, setEntityName] = React.useState('');
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundEngine.playSystemAccess();
    setIsSubmitted(true);
  };

  const handleTabSwitch = (tab: 'REGISTER' | 'LOGIN') => {
    soundEngine.playPulseNode();
    setActiveTab(tab);
    setIsSubmitted(false);
  };

  return (
    <div className="bg-[#121418]/90 border border-white/10 rounded-lg p-4 font-mono text-[11px] space-y-3 text-gray-300">
      {/* Dual Tab Switcher */}
      <div className="grid grid-cols-2 gap-1.5 p-1 bg-[#1A1D23] border border-white/5 rounded-md text-[10px] uppercase tracking-wider">
        <button
          type="button"
          onClick={() => handleTabSwitch('REGISTER')}
          className={`py-2 px-2 rounded transition-all cursor-pointer ${
            activeTab === 'REGISTER'
              ? 'bg-[#121418] text-[#00FF66] border border-[#00FF66]/40 font-bold'
              : 'text-[#9CA3AF]/70 hover:text-white'
          }`}
        >
          01 // MEMBERSHIP INIT
        </button>
        <button
          type="button"
          onClick={() => handleTabSwitch('LOGIN')}
          className={`py-2 px-2 rounded transition-all cursor-pointer ${
            activeTab === 'LOGIN'
              ? 'bg-[#121418] text-[#00FF66] border border-[#00FF66]/40 font-bold'
              : 'text-[#9CA3AF]/70 hover:text-white'
          }`}
        >
          02 // CONSOLE ACCESS
        </button>
      </div>

      {isSubmitted ? (
        <div className="py-6 flex flex-col items-center justify-center text-center space-y-2 font-mono animate-fadeIn">
          <div className="w-8 h-8 rounded-full border border-[#00FF66] bg-[#00FF66]/10 flex items-center justify-center text-[#00FF66] text-sm">
            ✓
          </div>
          <div className="text-white font-bold text-xs uppercase tracking-wider">
            {activeTab === 'REGISTER' ? 'MEMBERSHIP DISPATCHED' : 'SESSION AUTHORIZED'}
          </div>
          <p className="text-[10px] text-[#9CA3AF] font-sans">
            {activeTab === 'REGISTER'
              ? 'განაცხადი მიღებულია. ბირთვი ამუშავებს მონაცემებს.'
              : 'სესია წარმატებით ავტორიზებულია.'}
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="mt-2 text-[9px] text-[#00FF66] underline hover:text-white cursor-pointer"
          >
            [ RE-OPEN FORM ]
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          {activeTab === 'REGISTER' && (
            <>
              <div>
                <label className="block text-[9px] uppercase text-[#9CA3AF]/80 mb-1 tracking-wider">
                  ENTITY CATEGORY // სუბიექტი
                </label>
                <div className="grid grid-cols-2 gap-1 text-[9px]">
                  {(['FEDERATION', 'CLUB', 'ATHLETE', 'SPECIALIST'] as const).map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => {
                        soundEngine.playPulseNode();
                        setEntityType(cat);
                      }}
                      className={`p-1.5 border rounded text-left transition-all cursor-pointer ${
                        entityType === cat
                          ? 'bg-[#16191E] border-[#00FF66] text-[#00FF66]'
                          : 'bg-[#121418] border-white/10 text-[#9CA3AF] hover:text-white'
                      }`}
                    >
                      ● {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[9px] uppercase text-[#9CA3AF]/80 mb-1 tracking-wider">
                  ORGANIZATION / ATHLETE NAME
                </label>
                <input
                  type="text"
                  required
                  value={entityName}
                  onChange={(e) => setEntityName(e.target.value)}
                  placeholder="მაგ: Georgian Basketball Fed"
                  className="w-full bg-[#1A1D23] border border-white/10 focus:border-[#00FF66]/60 rounded px-2.5 py-1.5 text-xs text-white placeholder-[#9CA3AF]/40 outline-none"
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-[9px] uppercase text-[#9CA3AF]/80 mb-1 tracking-wider">
              OPERATOR IDENTITY // EMAIL
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="operator@artron.ge"
              className="w-full bg-[#1A1D23] border border-white/10 focus:border-[#00FF66]/60 rounded px-2.5 py-1.5 text-xs text-white placeholder-[#9CA3AF]/40 outline-none"
            />
          </div>

          <div>
            <label className="block text-[9px] uppercase text-[#9CA3AF]/80 mb-1 tracking-wider">
              ACCESS KEY // PASSWORD
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full bg-[#1A1D23] border border-white/10 focus:border-[#00FF66]/60 rounded px-2.5 py-1.5 text-xs text-white placeholder-[#9CA3AF]/40 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full h-[40px] mt-1 bg-[#00FF66] text-[#0A0D10] font-mono text-[11px] font-bold tracking-[1.2px] uppercase rounded shadow-[0_0_15px_rgba(0,255,102,0.25)] hover:bg-[#00E65C] transition-all cursor-pointer"
          >
            {activeTab === 'REGISTER' ? '[ SUBMIT MEMBERSHIP REQUEST ]' : '[ AUTHORIZE CONSOLE SESSION ]'}
          </button>
        </form>
      )}
    </div>
  );
};

