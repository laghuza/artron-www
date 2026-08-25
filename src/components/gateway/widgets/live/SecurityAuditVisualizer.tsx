"use client";

import React, { useState } from 'react';
import { soundEngine } from '@/core';

interface SecurityAuditVisualizerProps {
  cardType: 'functional' | 'permissions' | 'business';
  subChapterId?: string;
}

export const SecurityAuditVisualizer: React.FC<SecurityAuditVisualizerProps> = ({
  cardType,
}) => {
  const [globalLock, setGlobalLock] = useState(false);
  const [aesStatus, setAesStatus] = useState<'ENCRYPTED' | 'DECRYPTING' | 'SECURE'>('ENCRYPTED');

  const handleTestIsolation = () => {
    soundEngine.playPulseNode();
    setAesStatus('DECRYPTING');
    setTimeout(() => {
      soundEngine.playSystemAccess();
      setAesStatus('SECURE');
    }, 600);
  };

  return (
    <div className="w-full h-full flex flex-col justify-between p-4 bg-[#090D14]/95 border border-[#00ff87]/40 rounded-xl font-mono text-xs text-white">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-2.5 mb-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00ff87] animate-pulse" />
          <span className="text-[#00ff87] font-bold tracking-wider uppercase text-[11px]">
            CYBER SECURITY SENTINEL // RLS ISOLATION &amp; AUDIT TRAIL
          </span>
        </div>
        <span className="text-[10px] text-gray-400 bg-white/5 px-2 py-0.5 rounded border border-white/10">
          NODE 08 // SECURITY
        </span>
      </div>

      {cardType === 'functional' && (
        <div className="space-y-3 flex-1 flex flex-col justify-between">
          <div className="bg-[#121722] p-3 rounded-lg border border-white/10 space-y-2">
            <div className="text-[10px] text-gray-400 uppercase tracking-wider">
              მონაცემთა შიფრაცია &amp; PII დაცვა (AES-256-GCM)
            </div>

            <div className="grid grid-cols-2 gap-2 text-[10px]">
              <div className="bg-black/30 p-2 rounded border border-white/5">
                <span className="text-gray-400">პირადი ნომერი (ID):</span>
                <div className="text-[#00ff87] font-bold truncate mt-0.5">
                  {aesStatus === 'SECURE' ? '01024048921 [DECRYPTED_RBAC]' : 'enc:a9f8412...[AES-256]'}
                </div>
              </div>
              <div className="bg-black/30 p-2 rounded border border-white/5">
                <span className="text-gray-400">ბიომეტრიული ფოტო:</span>
                <div className="text-[#00B0FF] font-bold mt-0.5">SHA-256 HASH VERIFIED</div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleTestIsolation}
              className="w-full py-2 bg-[#00ff87]/20 hover:bg-[#00ff87]/30 border border-[#00ff87] text-[#00ff87] rounded text-[10px] font-bold"
            >
              🔒 RLS Multi-Tenant შიფრაციის ტესტირება
            </button>
          </div>

          <div className="bg-[#121722] p-3 rounded-lg border border-white/10 flex items-center justify-between">
            <div>
              <div className="text-[11px] font-bold text-white">Global Session Revoke (Kill-Switch)</div>
              <div className="text-[9px] text-gray-400">ყველა აქტიური სესიის მყისიერი გაუქმება</div>
            </div>
            <button
              type="button"
              onClick={() => {
                soundEngine.playSystemAccess();
                setGlobalLock(!globalLock);
              }}
              className={`px-3 py-1.5 rounded text-[10px] font-bold transition-all ${
                globalLock
                  ? 'bg-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.5)]'
                  : 'bg-white/5 border border-white/15 text-gray-300'
              }`}
            >
              {globalLock ? '🛑 სისტემა დაბლოკილია' : 'სესიების გათიშვა'}
            </button>
          </div>
        </div>
      )}

      {cardType === 'permissions' && (
        <div className="space-y-3 flex-1 flex flex-col justify-between">
          <div className="bg-[#121722] p-3 rounded-lg border border-white/10 space-y-2">
            <div className="text-[10px] text-gray-400 uppercase tracking-wider">
              უსაფრთხოების სტანდარტები &amp; რეგულაციები
            </div>

            <div className="space-y-1.5 text-[11px]">
              <div className="flex items-center justify-between p-1.5 bg-black/30 rounded border border-white/5">
                <span className="text-gray-300">პერსონალურ მონაცემთა დაცვა:</span>
                <span className="text-[#00ff87] font-bold">100% COMPLIANT (საქართველოს კანონი)</span>
              </div>
              <div className="flex items-center justify-between p-1.5 bg-black/30 rounded border border-white/5">
                <span className="text-gray-300">WebAuthn / Passkey:</span>
                <span className="text-[#00B0FF] font-bold">ბიომეტრიული პაროლის გარეშე შესვლა</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {cardType === 'business' && (
        <div className="space-y-3 flex-1 flex flex-col justify-between">
          <div className="bg-[#121722] p-3 rounded-lg border border-white/10">
            <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-2">
              ნულოვანი რეპუტაციული და ფინანსური რისკი
            </div>

            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-black/30 p-2 rounded border border-white/5">
                <div className="text-[9px] text-gray-400">მონაცემთა გაჟონვა</div>
                <div className="text-sm font-bold text-[#00ff87]">0 ინციდენტი</div>
              </div>
              <div className="bg-black/30 p-2 rounded border border-white/5">
                <div className="text-[9px] text-gray-400">Uptime გარანტია</div>
                <div className="text-sm font-bold text-[#00ff87]">99.98%</div>
              </div>
              <div className="bg-black/30 p-2 rounded border border-white/5">
                <div className="text-[9px] text-gray-400">აუდიტის სტატუსი</div>
                <div className="text-sm font-bold text-[#00ff87]">PASSED ✓</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[9px] text-gray-400">
        <span>OWASP TOP 10 HARDENED</span>
        <span className="text-[#00ff87]">ZERO TRUST ARCHITECTURE</span>
      </div>
    </div>
  );
};
