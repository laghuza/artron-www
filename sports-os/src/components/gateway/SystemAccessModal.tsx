"use client";

import React, { useState } from 'react';
import { soundEngine } from '@/core';

interface SystemAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SystemAccessModal: React.FC<SystemAccessModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'REGISTER' | 'LOGIN'>('REGISTER');
  const [entityType, setEntityType] = useState<'FEDERATION' | 'CLUB' | 'ATHLETE' | 'SPECIALIST'>('FEDERATION');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [entityName, setEntityName] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundEngine.playSystemAccess();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 2200);
  };

  const handleTabSwitch = (tab: 'REGISTER' | 'LOGIN') => {
    soundEngine.playPulseNode();
    setActiveTab(tab);
    setIsSubmitted(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#090b0e]/80 backdrop-blur-md animate-fadeIn select-none">
      {/* Backdrop click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Main Glassmorphic Modal Window */}
      <div className="relative w-full max-w-[540px] bg-[#12161A]/95 border border-[rgba(156,163,175,0.18)] rounded-xl shadow-[0_16px_48px_rgba(0,0,0,0.6)] backdrop-blur-2xl p-6 sm:p-8 z-10 overflow-hidden">
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#00FF66]/5 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-5 border-b border-white/10 mb-6">
          <div>
            <div className="font-mono text-[11px] text-[#00FF66] uppercase tracking-[0.2em] flex items-center gap-2 mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00FF66] animate-pulse" />
              [ ACCESS_GATEWAY // NODE_09 ]
            </div>
            <h2 className="font-sans text-xl sm:text-2xl font-bold text-white uppercase tracking-tight">
              {activeTab === 'REGISTER' ? 'Initiate System Membership' : 'Console Authorization'}
            </h2>
          </div>
          <button
            onClick={() => {
              soundEngine.playPulseNode();
              onClose();
            }}
            className="w-8 h-8 rounded-md border border-[rgba(156,163,175,0.2)] bg-[#1A1D23] text-[#9CA3AF] hover:text-white hover:border-[#00FF66]/50 flex items-center justify-center font-mono text-xs transition-all cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Dual Form Selector Tabs */}
        <div className="grid grid-cols-2 gap-2 p-1 bg-[#1A1D23]/80 border border-white/5 rounded-lg mb-6 font-mono text-[11px] uppercase tracking-wider">
          <button
            type="button"
            onClick={() => handleTabSwitch('REGISTER')}
            className={`py-2.5 px-3 rounded-md transition-all cursor-pointer ${
              activeTab === 'REGISTER'
                ? 'bg-[#121418] text-[#00FF66] border border-[#00FF66]/40 font-semibold shadow-sm'
                : 'text-[#9CA3AF]/70 hover:text-white hover:bg-[#121418]/40'
            }`}
          >
            01 // MEMBERSHIP INIT
          </button>
          <button
            type="button"
            onClick={() => handleTabSwitch('LOGIN')}
            className={`py-2.5 px-3 rounded-md transition-all cursor-pointer ${
              activeTab === 'LOGIN'
                ? 'bg-[#121418] text-[#00FF66] border border-[#00FF66]/40 font-semibold shadow-sm'
                : 'text-[#9CA3AF]/70 hover:text-white hover:bg-[#121418]/40'
            }`}
          >
            02 // CONSOLE ACCESS
          </button>
        </div>

        {/* Submission Confirmation Screen */}
        {isSubmitted ? (
          <div className="py-12 flex flex-col items-center justify-center text-center space-y-4 font-mono animate-fadeIn">
            <div className="w-12 h-12 rounded-full border border-[#00FF66] bg-[#00FF66]/10 flex items-center justify-center text-[#00FF66] text-xl">
              ✓
            </div>
            <div className="text-white font-bold text-base tracking-wider uppercase">
              {activeTab === 'REGISTER' ? 'INITIATION REQUEST DISPATCHED' : 'AUTHORIZING OPERATOR SESSION'}
            </div>
            <p className="text-xs text-[#9CA3AF] max-w-xs leading-relaxed font-sans">
              {activeTab === 'REGISTER'
                ? 'თქვენი განაცხადი მიღებულია. ართრონის უსაფრთხოების ბირთვი ამოწმებს სუბიექტის ავთენტურობას.'
                : 'ოპერატორის იდენტიფიკაცია დამოწმებულია. ხდება სესიის სინქრონიზაცია.'}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 font-mono">
            {activeTab === 'REGISTER' && (
              <>
                <div>
                  <label className="block text-[10px] uppercase text-[#9CA3AF]/80 mb-1.5 tracking-wider">
                    ENTITY CATEGORY // სუბიექტის ტიპი
                  </label>
                  <div className="grid grid-cols-2 gap-2 text-[10px]">
                    {(['FEDERATION', 'CLUB', 'ATHLETE', 'SPECIALIST'] as const).map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => {
                          soundEngine.playPulseNode();
                          setEntityType(cat);
                        }}
                        className={`p-2 border rounded text-left transition-all cursor-pointer ${
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
                  <label className="block text-[10px] uppercase text-[#9CA3AF]/80 mb-1.5 tracking-wider">
                    ORGANIZATION / ATHLETE NAME // სუბიექტის დასახელება
                  </label>
                  <input
                    type="text"
                    required
                    value={entityName}
                    onChange={(e) => setEntityName(e.target.value)}
                    placeholder="მაგ: Georgian Basketball Federation"
                    className="w-full bg-[#121418] border border-white/10 focus:border-[#00FF66]/60 rounded-md px-3.5 py-2.5 text-xs text-white placeholder-[#9CA3AF]/40 outline-none transition-colors"
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-[10px] uppercase text-[#9CA3AF]/80 mb-1.5 tracking-wider">
                OPERATOR IDENTITY // ელ-ფოსტა
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="operator@artron.ge"
                className="w-full bg-[#121418] border border-white/10 focus:border-[#00FF66]/60 rounded-md px-3.5 py-2.5 text-xs text-white placeholder-[#9CA3AF]/40 outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase text-[#9CA3AF]/80 mb-1.5 tracking-wider">
                SECURITY ACCESS KEY // პაროლი
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-[#121418] border border-white/10 focus:border-[#00FF66]/60 rounded-md px-3.5 py-2.5 text-xs text-white placeholder-[#9CA3AF]/40 outline-none transition-colors"
              />
            </div>

            <div className="pt-3">
              <button
                type="submit"
                className="w-full h-[48px] bg-[#00FF66] text-[#0A0D10] font-mono text-[12px] font-bold tracking-[1.5px] uppercase rounded-md shadow-[0_0_20px_rgba(0,255,102,0.25)] hover:bg-[#00E65C] hover:shadow-[0_0_30px_rgba(0,255,102,0.4)] transition-all cursor-pointer"
              >
                {activeTab === 'REGISTER' ? '[ SUBMIT MEMBERSHIP REQUEST ]' : '[ AUTHORIZE CONSOLE SESSION ]'}
              </button>
            </div>
          </form>
        )}

        {/* Modal Footer Security Badge */}
        <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between font-mono text-[10px] text-[#9CA3AF]/60">
          <span>SECURED BY ARTRON ENNEA CORE</span>
          <span>AES-256 PII ENCRYPTED</span>
        </div>
      </div>
    </div>
  );
};
