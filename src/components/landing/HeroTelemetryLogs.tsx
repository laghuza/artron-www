'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Terminal } from 'lucide-react';

interface TelemetryLog {
  id: string;
  time: string;
  user: string;
  type: string; // 'IN' | 'OUT'
  role: string; // 'Employee' | 'Member' | 'Trainer' | 'Guest'
  status: string; // 'Granted' | 'Denied'
}

interface HeroTelemetryLogsProps {
  logs: TelemetryLog[];
}

export const HeroTelemetryLogs: React.FC<HeroTelemetryLogsProps> = ({ logs }) => {
  const { t } = useLanguage();

  return (
    <div className="bg-[#05070a]/85 backdrop-blur-xl border border-[#8a99ad]/10 rounded-xl p-3.5">
      <h5 className="text-[10px] font-mono font-bold text-[#E2E8F0] tracking-wider uppercase mb-2 flex items-center justify-between">
        <span className="flex items-center gap-1.5">
          <Terminal className="w-3.5 h-3.5 text-[#00ff87] drop-shadow-[0_0_8px_#00ff87]" />
          {t('db_logs_title')}
        </span>
        <span className="text-[8px] font-mono font-normal text-[#94A3B8] normal-case">
          {t('db_employee_time')}
        </span>
      </h5>
      <div className="space-y-1.5 font-mono text-[9px] max-h-[140px] overflow-y-auto">
        {logs.map((log) => (
          <div
            key={log.id}
            className="flex items-center justify-between p-1.5 hover:bg-white/5 rounded border border-transparent hover:border-white/5 transition-all"
          >
            <div className="flex items-center gap-1.5">
              <span className="text-[#94A3B8]">{log.time}</span>
              <span className="text-white font-semibold">{log.user}</span>
              <span
                className={`px-1 rounded text-[8px] font-mono font-bold ${
                  log.role === 'Employee'
                    ? 'bg-[#00ff87]/15 text-[#00ff87]'
                    : log.role === 'Trainer'
                    ? 'bg-[#00ff87]/15 text-[#00ff87] drop-shadow-[0_0_8px_#00ff87]'
                    : 'bg-[#00ff87]/10 text-[#00ff87]'
                }`}
              >
                {log.role}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className={`font-bold ${log.type === 'IN' ? 'text-[#00ff87]' : 'text-rose-400'}`}>
                {log.type}
              </span>
              <span className="text-[#94A3B8]">|</span>
              <span className="text-[#00ff87] font-bold">OK</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
