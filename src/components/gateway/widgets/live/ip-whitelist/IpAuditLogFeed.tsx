"use client";

import React from 'react';
import { IpAuditLog } from '@/types/ipWhitelist';

interface IpAuditLogFeedProps {
  logs: IpAuditLog[];
}

export const IpAuditLogFeed: React.FC<IpAuditLogFeedProps> = ({ logs }) => {
  return (
    <div className="flex flex-col h-full space-y-2">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] text-gray-300 font-bold uppercase tracking-wider">
            📜 უსაფრთხოების აუდიტ-ლოგები ({logs.length})
          </span>
          <p className="text-[8.5px] text-gray-400">SecurityService &amp; AuditInterceptor ჩანაწერები</p>
        </div>
        <span className="text-[8px] text-[#00ff87] font-mono animate-pulse">● LIVE STREAM</span>
      </div>

      <div className="space-y-1.5 flex-1 overflow-y-auto max-h-[170px] pr-1 font-mono text-[9px]">
        {logs.map((log) => (
          <div
            key={log.id}
            className={`p-2 rounded border transition-all ${
              log.status === 'ALLOWED'
                ? 'bg-black/30 border-white/5 text-gray-300'
                : 'bg-red-500/10 border-red-500/30 text-red-200 shadow-[0_0_8px_rgba(239,68,68,0.1)]'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 font-bold">
                <span>{log.status === 'ALLOWED' ? '🟢' : '🛑'}</span>
                <span className="text-white">{log.userName}</span>
                <span className="text-[8px] text-gray-400">({log.userRole})</span>
              </div>
              <span className="text-[8px] text-gray-400">{log.timestamp}</span>
            </div>

            <div className="mt-1 flex items-center justify-between text-[8px] text-gray-400">
              <span className="truncate">{log.attemptedIp}</span>
              <span className="text-[#00B0FF] shrink-0 ml-1">{log.authMethod}</span>
            </div>

            <div className="mt-0.5 text-[8px] opacity-85 text-gray-300">
              {log.reason}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
