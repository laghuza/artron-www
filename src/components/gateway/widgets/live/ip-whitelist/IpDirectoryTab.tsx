"use client";

import React, { useState } from 'react';
import { BranchIp } from '@/types/ipWhitelist';
import { soundEngine } from '@/core';

interface IpDirectoryTabProps {
  branchIps: BranchIp[];
  onAddIp: (newIp: Omit<BranchIp, 'id' | 'createdAt'>) => boolean;
  onDeleteIp: (id: string) => void;
  onToggleActive: (id: string) => void;
}

export const IpDirectoryTab: React.FC<IpDirectoryTabProps> = ({
  branchIps,
  onAddIp,
  onDeleteIp,
  onToggleActive,
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [name, setName] = useState('');
  const [branchName, setBranchName] = useState('ვაკის ფილიალი');
  const [ipAddress, setIpAddress] = useState('');
  const [ipType, setIpType] = useState<'LAN' | 'WIFI' | 'HQ' | 'VPN'>('LAN');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !ipAddress.trim()) {
      setErrorMessage('გთხოვთ შეავსოთ დასახელება და IP მისამართი');
      return;
    }

    const success = onAddIp({
      name: name.trim(),
      branchName,
      ipAddress: ipAddress.trim(),
      type: ipType,
      isActive: true,
    });

    if (success) {
      soundEngine.playSystemAccess();
      setName('');
      setIpAddress('');
      setShowAddForm(false);
      setErrorMessage(null);
    } else {
      soundEngine.playClose();
      setErrorMessage('ეს IP მისამართი უკვე რეგისტრირებულია რეესტრში!');
    }
  };

  return (
    <div className="flex flex-col h-full space-y-2.5">
      {/* Header & Add Trigger */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] text-gray-300 font-bold uppercase tracking-wider">
            🌐 ფილიალების ოფიციალური IP რეესტრი ({branchIps.length})
          </span>
          <p className="text-[8.5px] text-gray-400">სტატიკური LAN/Wi-Fi ქსელები ფიზიკურ ობიექტებზე</p>
        </div>
        <button
          type="button"
          onClick={() => {
            soundEngine.playPulseNode();
            setShowAddForm(!showAddForm);
            setErrorMessage(null);
          }}
          className="px-2.5 py-1 bg-[#00ff87]/20 hover:bg-[#00ff87]/30 border border-[#00ff87]/60 text-[#00ff87] rounded text-[9.5px] font-bold transition-all flex items-center gap-1 shadow-[0_0_10px_rgba(0,255,135,0.15)]"
        >
          {showAddForm ? '✕ დახურვა' : '+ ახალი IP'}
        </button>
      </div>

      {/* Add IP Form Modal / Inset */}
      {showAddForm && (
        <form onSubmit={handleSubmit} className="bg-black/70 p-2.5 rounded-lg border border-[#00ff87]/40 space-y-2 animate-fadeIn text-[10px]">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-gray-400 text-[8.5px]">ქსელის დასახელება:</label>
              <input
                type="text"
                placeholder="მაგ: ვაკე - სალაროს LAN"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#121722] border border-white/15 rounded px-2 py-1 text-white text-[9.5px] focus:outline-none focus:border-[#00ff87]"
              />
            </div>
            <div>
              <label className="text-gray-400 text-[8.5px]">სტატიკური IP მისამართი:</label>
              <input
                type="text"
                placeholder="მაგ: 192.168.1.100"
                value={ipAddress}
                onChange={(e) => setIpAddress(e.target.value)}
                className="w-full bg-[#121722] border border-white/15 rounded px-2 py-1 text-white text-[9.5px] focus:outline-none focus:border-[#00ff87]"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-gray-400 text-[8.5px]">ფილიალი:</label>
              <select
                value={branchName}
                onChange={(e) => setBranchName(e.target.value)}
                className="w-full bg-[#121722] border border-white/15 rounded px-2 py-1 text-white text-[9.5px] focus:outline-none focus:border-[#00ff87]"
              >
                <option value="ვაკის ფილიალი">ვაკის ფილიალი</option>
                <option value="საბურთალოს დარბაზი">საბურთალოს დარბაზი</option>
                <option value="ბათუმის ოლიმპიური აუზი">ბათუმის ოლიმპიური აუზი</option>
                <option value="ცენტრალური HQ">ცენტრალური HQ</option>
              </select>
            </div>
            <div>
              <label className="text-gray-400 text-[8.5px]">ქსელის ტიპი:</label>
              <select
                value={ipType}
                onChange={(e) => setIpType(e.target.value as any)}
                className="w-full bg-[#121722] border border-white/15 rounded px-2 py-1 text-white text-[9.5px] focus:outline-none focus:border-[#00ff87]"
              >
                <option value="LAN">🏢 LAN (სადენიანი ქსელი)</option>
                <option value="WIFI">📶 Wi-Fi (ადმინისტრაცია)</option>
                <option value="HQ">🏛️ HQ Gateway</option>
                <option value="VPN">🔒 Encrypted VPN</option>
              </select>
            </div>
          </div>

          {errorMessage && (
            <div className="text-red-400 text-[9px] bg-red-500/10 border border-red-500/30 p-1 rounded">
              {errorMessage}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-1.5 bg-[#00ff87] text-black font-bold rounded text-[10px] hover:bg-[#00ff87]/90 transition-all shadow-[0_0_12px_rgba(0,255,135,0.4)]"
          >
            ✓ IP მისამართის რეგისტრაცია
          </button>
        </form>
      )}

      {/* Branch IPs List */}
      <div className="space-y-1.5 flex-1 overflow-y-auto max-h-[140px] pr-1">
        {branchIps.map((b) => (
          <div
            key={b.id}
            className={`flex items-center justify-between p-2 rounded border transition-all text-[9.5px] ${
              b.isActive
                ? 'bg-black/40 border-white/10 hover:border-[#00ff87]/40'
                : 'bg-black/20 border-white/5 opacity-60'
            }`}
          >
            <div className="flex items-center gap-2 truncate">
              <span className="text-xs">
                {b.type === 'LAN' ? '🏢' : b.type === 'WIFI' ? '📶' : b.type === 'HQ' ? '🏛️' : '🔒'}
              </span>
              <div className="truncate">
                <div className="font-bold text-white truncate flex items-center gap-1.5">
                  <span>{b.name}</span>
                  <span className="text-[8px] bg-white/10 text-gray-300 px-1 rounded">{b.type}</span>
                </div>
                <div className="text-[8.5px] text-[#00ff87] font-mono">{b.ipAddress} • {b.branchName}</div>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 ml-2">
              <button
                type="button"
                onClick={() => {
                  soundEngine.playPulseNode();
                  onToggleActive(b.id);
                }}
                className={`px-1.5 py-0.5 rounded text-[8.5px] font-bold transition-all ${
                  b.isActive
                    ? 'bg-[#00ff87]/20 text-[#00ff87] border border-[#00ff87]/40'
                    : 'bg-white/5 text-gray-400 border border-white/10'
                }`}
              >
                {b.isActive ? 'აქტიური' : 'გათიშული'}
              </button>
              <button
                type="button"
                onClick={() => {
                  soundEngine.playClose();
                  onDeleteIp(b.id);
                }}
                className="text-red-400 hover:text-red-300 hover:bg-red-500/20 px-1 py-0.5 rounded text-[9px] transition-all"
                title="წაშლა"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
