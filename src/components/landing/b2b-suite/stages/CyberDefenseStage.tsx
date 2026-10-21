'use client';

import React from 'react';
import { ShieldCheck, HardDrive, WifiOff, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { LAYERS } from '../constants';

interface CyberDefenseStageProps {
  layer: number;
  offline: boolean;
  queue: number;
  onSelectLayer: (idx: number) => void;
  onToggleOffline: () => void;
}

export const CyberDefenseStage: React.FC<CyberDefenseStageProps> = ({
  layer,
  offline,
  queue,
  onSelectLayer,
  onToggleOffline,
}) => {
  const { locale } = useLanguage();

  const copy = {
    bufferBadge: locale === 'ka'
      ? 'ოფლაინ ბუფერი: 10,000 დაშვება (L2 Edge Cache)'
      : locale === 'ru'
      ? 'Офлайн-буфер: 10,000 проходов (L2 Edge Cache)'
      : 'Offline Buffer: 10,000 Entries (L2 Edge Cache)',
    offlineActive: locale === 'ka'
      ? 'ოფლაინ რეჟიმი აქტიურია · ტურნიკეტი მუშაობს უწყვეტად (0 შეფერხება)'
      : locale === 'ru'
      ? 'Офлайн-режим активен · Турникет работает непрерывно (0 задержек)'
      : 'Offline Mode Active · Turnstile operates with 0 delays',
    offlineSub: locale === 'ka'
      ? 'ინტერნეტის გათიშვისას დაშვებები ინახება კონტროლერის ლოკალურ მეხსიერებაში და აღდგენისთანავე სინქრონიზდება.'
      : locale === 'ru'
      ? 'При обрыве сети проходы пишутся в локальную память контроллера и синхронизируются при восстановлении.'
      : 'When network drops, access logs persist in local controller flash and auto-sync on reconnect.',
    btnRestore: locale === 'ka' ? 'ინტერნეტის აღდგენა · სინქრონი' : locale === 'ru' ? 'Восстановить связь · Синхронизация' : 'Restore Connection · Sync',
    btnSimulate: locale === 'ka' ? 'ინტერნეტის გათიშვის სიმულაცია' : locale === 'ru' ? 'Симуляция обрыва сети' : 'Simulate Network Outage',
    coreLabel: locale === 'ka' ? 'ბირთვი' : locale === 'ru' ? 'Ядро' : 'Core',
    online: locale === 'ka' ? 'ონლაინ' : locale === 'ru' ? 'Онлайн' : 'Online',
    local: locale === 'ka' ? 'ლოკალური' : locale === 'ru' ? 'Локальный' : 'Local',
  };

  return (
    <div className="flex flex-col items-center gap-5 w-full py-2">
      {/* 🛡️ 10,000-Scan Offline Buffer Telemetry Badge */}
      <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#10B981]/30 bg-[#10B981]/10 text-[#34D399] font-mono text-[11px] shadow-[0_0_15px_rgba(16,185,129,0.15)]">
        <HardDrive className="w-3.5 h-3.5 text-[#10B981] animate-pulse" />
        <span className="font-bold tracking-tight">{copy.bufferBadge}</span>
      </div>

      {/* Concentric Defense Rings Diagram */}
      <div className="relative w-full max-w-[360px] aspect-square flex items-center justify-center">
        {LAYERS.map((l, i) => {
          const isSelected = layer === i;
          const isOuterOffline = i === 0 && offline;
          const sizePct = l.s;

          return (
            <button
              key={l.n}
              type="button"
              onClick={() => onSelectLayer(i)}
              className={`absolute rounded-full transition-all duration-500 flex items-start justify-center pt-2 cursor-pointer ${
                isOuterOffline
                  ? 'border-2 border-dashed border-[#F59E0B] bg-[#06090e]/40'
                  : isSelected
                  ? 'border-2 border-[#10B981] bg-[#10B981]/10 shadow-[0_0_28px_-6px_rgba(16,185,129,0.6)]'
                  : 'border border-[#BAE6FD]/20 bg-[#06090e]/30 hover:border-[#BAE6FD]/40'
              }`}
              style={{
                width: `${sizePct}%`,
                height: `${sizePct}%`,
              }}
            >
              <span
                className={`font-mono text-[10px] sm:text-[11px] tracking-wider px-2 py-0.5 rounded backdrop-blur-sm ${
                  isSelected ? 'text-[#10B981] font-bold' : isOuterOffline ? 'text-[#F59E0B]' : 'text-[#A9B9CA]'
                }`}
              >
                {l.n} · e={l.e}
              </span>
            </button>
          );
        })}

        {/* Central Core */}
        <div className="relative z-10 w-[30%] h-[30%] rounded-full flex flex-col items-center justify-center gap-1 bg-radial from-[#10B981]/30 to-[#10B981]/5 border border-[#10B981] shadow-[0_0_30px_-6px_rgba(16,185,129,0.7)] text-center pointer-events-none">
          <span className="text-[11px] font-bold text-[#F0F9FF]">{copy.coreLabel}</span>
          <span className={`font-mono text-[10px] font-semibold ${offline ? 'text-[#F59E0B]' : 'text-[#10B981]'}`}>
            {offline ? `${copy.local} · Q ${queue}` : copy.online}
          </span>
        </div>
      </div>

      {/* Offline Status Alert Banner when offline */}
      {offline && (
        <div className="w-full max-w-[420px] p-2.5 rounded-xl bg-[#F59E0B]/10 border border-[#F59E0B]/30 flex items-start gap-2.5 text-left animate-in fade-in zoom-in-95 duration-200">
          <WifiOff className="w-4 h-4 text-[#F59E0B] shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <div className="text-[11.5px] font-bold text-[#FBBF24] leading-snug">
              {copy.offlineActive}
            </div>
            <p className="text-[10px] text-[#D1D5DB] mt-0.5 leading-relaxed">
              {copy.offlineSub}
            </p>
          </div>
        </div>
      )}

      {/* Offline Network Simulation Button */}
      <button
        type="button"
        onClick={onToggleOffline}
        className={`flex items-center gap-2.5 min-h-[44px] px-6 rounded-full border text-xs sm:text-sm font-semibold transition-all shadow-lg cursor-pointer ${
          offline
            ? 'bg-[#F59E0B]/15 border-[#F59E0B] text-[#F59E0B] shadow-[0_0_20px_rgba(245,158,11,0.25)]'
            : 'bg-[#0C121B]/80 border-[#BAE6FD]/25 text-[#F0F9FF] hover:border-[#10B981]'
        }`}
      >
        <span
          className="w-2 h-2 rounded-full shrink-0"
          style={{
            backgroundColor: offline ? '#F59E0B' : '#10B981',
            boxShadow: `0 0 8px ${offline ? '#F59E0B' : '#10B981'}`,
          }}
        />
        <span>{offline ? copy.btnRestore : copy.btnSimulate}</span>
      </button>
    </div>
  );
};

