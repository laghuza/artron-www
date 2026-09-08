"use client";

import React, { useState } from 'react';
import { soundEngine } from '@/core';
import { FIELD_SECURITY_SAMPLES } from '@/data/rbacMatrixData';

export const FieldSecurityTab: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'masked'>('all');

  const handleTestField = () => {
    soundEngine.playSystemAccess();
  };

  return (
    <div className="space-y-4 text-xs font-sans">
      {/* Intro Header */}
      <div className="p-3 bg-[#0B0E14] border border-white/10 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-bold text-white flex items-center gap-1.5">
              <span>🔒</span> Field-Level Security & Excluded Fields
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              AES-256 / Server-Side Filtering
            </span>
          </div>
          <p className="text-[11px] text-gray-400 max-w-2xl leading-relaxed">
            CASL არქიტექტურა უზრუნველყოფს, რომ სენსიტიური ველები (ხელფასები, კლიენტის პირადი ნომერი, თვითღირებულება)
            სერვერიდანვე გაიფილტროს და ბრაუზერში არასდროს გაჟონოს.
          </p>
        </div>

        <button
          onClick={handleTestField}
          className="px-3 py-1.5 rounded-lg bg-[#00A3FF]/15 border border-[#00A3FF]/40 text-[#00A3FF] hover:bg-[#00A3FF]/25 transition-all font-mono text-[11px] shrink-0"
        >
          ⚡ შეამოწმე დაცვა
        </button>
      </div>

      {/* Comparison Grid Header */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {FIELD_SECURITY_SAMPLES.map((item, idx) => (
          <div
            key={idx}
            className="p-3.5 bg-[#0E131E] border border-white/10 rounded-xl space-y-2.5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-white text-[12px] flex items-center gap-1.5">
                <span className="text-[#00A3FF]">▪</span> {item.fieldNameKa}
              </span>
              <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-gray-400">
                {item.module}
              </span>
            </div>

            {/* Comparison Cards: Director vs Cashier */}
            <div className="space-y-1.5">
              {/* Director View */}
              <div className="p-2 rounded-lg bg-emerald-950/20 border border-emerald-500/20 flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-1.5">
                  <span className="text-emerald-400 font-bold font-mono">👑 დირექტორი:</span>
                  <span className="text-emerald-300 font-mono">{item.directorView}</span>
                </div>
                <span className="text-[10px] text-emerald-400 font-mono">✓ FULL ACCESS</span>
              </div>

              {/* Cashier View (Masked / Blocked) */}
              <div className="p-2 rounded-lg bg-rose-950/25 border border-rose-500/25 flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-1.5">
                  <span className="text-rose-400 font-bold font-mono">🎟️ მოლარე:</span>
                  <span className="text-rose-300 font-mono">{item.cashierView}</span>
                </div>
                <span className="text-[10px] text-rose-400 font-mono">⛔ BLOCKED</span>
              </div>
            </div>

            {/* Security Reason */}
            <div className="text-[10px] text-gray-400 font-sans pt-1 border-t border-white/5 flex items-center gap-1">
              <span className="text-amber-400">🛡️ მიზანი:</span>
              <span>{item.securityReasonKa}</span>
            </div>
          </div>
        ))}
      </div>

      {/* CASL ExcludedFields Code Snippet Demo */}
      <div className="p-3 bg-[#080B10] border border-white/10 rounded-xl font-mono text-[11px] space-y-1.5">
        <div className="text-gray-400 flex items-center justify-between">
          <span className="text-cyan-400 font-bold">⚡ CASL ExcludedFields Interceptor (Server-Side Logic)</span>
          <span className="text-[10px] text-gray-500">NestJS / Fastify Core</span>
        </div>
        <pre className="text-gray-300 overflow-x-auto p-2 bg-black/40 rounded border border-white/5 text-[10px] leading-relaxed">
{`if (user.role === 'CASHIER_ADMIN') {
  // ავტომატურად იბლოკება სენსიტიური ველები სერვერზე
  can('read', 'Customer', ['id', 'fullName', 'activePass']);
  cannot('read', 'Customer', ['personalId', 'phoneNumber', 'bankCardToken']);
  cannot('delete', 'Sale'); // მოლარე ვერასდროს წაშლის ჩეკს
}`}
        </pre>
      </div>
    </div>
  );
};
