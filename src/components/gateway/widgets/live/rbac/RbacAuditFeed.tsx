"use client";

import React from 'react';
import { RBAC_AUDIT_FEED_SAMPLES, RbacAuditLog } from '@/data/rbacMatrixData';

export const RbacAuditFeed: React.FC = () => {
  const getStatusBadge = (status: RbacAuditLog['status']) => {
    switch (status) {
      case 'SUCCESS':
        return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
      case 'BLOCKED':
        return 'bg-rose-500/15 text-rose-400 border-rose-500/30';
      case 'WARNING':
        return 'bg-amber-500/15 text-amber-300 border-amber-500/30';
    }
  };

  return (
    <div className="space-y-3 text-xs font-sans">
      <div className="flex items-center justify-between p-2.5 bg-[#0B0E14] border border-white/10 rounded-xl">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-white flex items-center gap-1.5">
            <span>📜</span> სრული აუდიტის ლოგირება (Audit Trail)
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-400 border border-cyan-500/30">
            Immutable Log
          </span>
        </div>
        <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live Stream
        </span>
      </div>

      <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1">
        {RBAC_AUDIT_FEED_SAMPLES.map(log => (
          <div
            key={log.id}
            className="p-3 bg-[#0E131E] border border-white/10 rounded-xl space-y-1.5 hover:border-white/20 transition-all font-mono"
          >
            <div className="flex items-center justify-between text-[11px]">
              <div className="flex items-center gap-2">
                <span className="text-gray-400">{log.timestamp}</span>
                <span className="text-white font-bold">{log.user}</span>
                <span className="text-gray-500 text-[10px]">({log.role})</span>
              </div>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getStatusBadge(log.status)}`}>
                {log.status}
              </span>
            </div>

            <div className="flex items-center gap-2 text-[11px]">
              <span className="text-[#00A3FF] font-bold">{log.action}</span>
              <span className="text-gray-400">→</span>
              <span className="text-gray-200">{log.target}</span>
            </div>

            <p className="text-[10px] text-gray-400 font-sans border-t border-white/5 pt-1">
              {log.detailsKa}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
