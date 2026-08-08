"use client";

import React, { useState } from 'react';
import { soundEngine } from '@/core';

interface MembershipRegistrationCardProps {
  onComplete?: () => void;
  onCancel?: () => void;
}

export const MembershipRegistrationCard: React.FC<MembershipRegistrationCardProps> = ({
  onComplete,
  onCancel,
}) => {
  const [orgName, setOrgName] = useState('');
  const [discipline, setDiscipline] = useState('FOOTBALL');
  const [adminEmail, setAdminEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orgName.trim() || !adminEmail.trim()) {
      soundEngine.playPulseNode();
      return;
    }

    soundEngine.playSystemAccess();
    setSubmitted(true);
    setTimeout(() => {
      onComplete?.();
    }, 2000);
  };

  if (submitted) {
    return (
      <div className="w-full bg-[#101318]/90 border border-[#00E676]/40 rounded-lg p-6 font-mono text-center space-y-3 animate-fadeIn">
        <div className="text-3xl text-[#00E676]">✓</div>
        <h4 className="text-[14px] font-bold text-white tracking-[2px] uppercase">
          REGISTRATION SUBMITTED
        </h4>
        <p className="text-[11px] text-[#9CA3AF]">
          TENANT DISPATCHER IS VERIFYING REGISTRATION FOR{' '}
          <span className="text-[#00E676]">{orgName.toUpperCase()}</span>
        </p>
        <div className="text-[10px] text-[#00E676] bg-[#00E676]/10 px-3 py-1 rounded border border-[#00E676]/30 inline-block font-semibold">
          DISPATCH CODE: TENANT-INIT-9021
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#101318]/90 border border-[rgba(0,230,118,0.3)] rounded-lg p-5 font-mono space-y-4 animate-fadeIn select-none">
      <div className="flex items-center justify-between border-b border-[#00E676]/20 pb-2.5">
        <span className="text-[11px] font-bold text-[#00E676] tracking-[1.5px] uppercase">
          01 // MEMBERSHIP INIT (CLUB REGISTRATION)
        </span>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="text-[10px] text-[#9CA3AF] hover:text-[#00E676]"
          >
            ✕
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-[10px] text-[#9CA3AF] tracking-wider uppercase mb-1">
            ORGANIZATION / CLUB NAME
          </label>
          <input
            type="text"
            required
            value={orgName}
            onChange={(e) => setOrgName(e.target.value)}
            className="w-full px-3 py-2 bg-[#0A0B0D] border border-[#9CA3AF]/20 focus:border-[#00E676] rounded text-[12px] text-white focus:outline-none"
            placeholder="FC Dinamo Academy / Tbilisi Sports Hub"
          />
        </div>

        <div>
          <label className="block text-[10px] text-[#9CA3AF] tracking-wider uppercase mb-1">
            PRIMARY SPORT DISCIPLINE
          </label>
          <select
            value={discipline}
            onChange={(e) => setDiscipline(e.target.value)}
            className="w-full px-3 py-2 bg-[#0A0B0D] border border-[#9CA3AF]/20 focus:border-[#00E676] rounded text-[12px] text-white focus:outline-none"
          >
            <option value="FOOTBALL">FOOTBALL (SOCCER)</option>
            <option value="BASKETBALL">BASKETBALL</option>
            <option value="RUGBY">RUGBY UNION</option>
            <option value="TENNIS">TENNIS ACADEMY</option>
            <option value="MULTI_SPORT">MULTI-SPORT COMPLEX</option>
          </select>
        </div>

        <div>
          <label className="block text-[10px] text-[#9CA3AF] tracking-wider uppercase mb-1">
            ADMINISTRATOR CONTACT EMAIL
          </label>
          <input
            type="email"
            required
            value={adminEmail}
            onChange={(e) => setAdminEmail(e.target.value)}
            className="w-full px-3 py-2 bg-[#0A0B0D] border border-[#9CA3AF]/20 focus:border-[#00E676] rounded text-[12px] text-white focus:outline-none"
            placeholder="admin@sports-club.ge"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2.5 bg-[#00E676]/15 hover:bg-[#00E676] text-[#00E676] hover:text-[#0A0B0D] font-bold text-[12px] tracking-[1.5px] uppercase rounded border border-[#00E676]/40 transition-all cursor-pointer"
        >
          SUBMIT ORGANIZATION REGISTRATION
        </button>
      </form>
    </div>
  );
};
