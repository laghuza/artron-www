'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Cpu, AlertTriangle, Unlock, Lock, Terminal } from 'lucide-react';

export const IotSimulator: React.FC = () => {
  const { t } = useLanguage();
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);
  const [unlockTimer, setUnlockTimer] = useState<number>(5);
  const [isEmergency, setIsEmergency] = useState<boolean>(false);
  const [iotLogs, setIotLogs] = useState<Array<{ id: number; time: string; text: string; status: string }>>([
    { id: 1, time: '20:05:12', text: 'UDP command sent to Node #42', status: 'SUCCESS' },
    { id: 2, time: '20:07:34', text: 'Relay pulse trigger check-in', status: 'SUCCESS' },
    { id: 3, time: '20:09:01', text: 'Anti-passback verification OK', status: 'SUCCESS' },
  ]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isUnlocked) {
      interval = setInterval(() => {
        setUnlockTimer((prev) => {
          if (prev <= 1) {
            setIsUnlocked(false);
            const now = new Date().toTimeString().split(' ')[0];
            setIotLogs((prevLogs) => [
              { id: Date.now(), time: now, text: 'Main entrance turnstile locked', status: 'LOCKED' },
              ...prevLogs.slice(0, 4),
            ]);
            return 5;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isUnlocked]);

  const handleRemoteUnlock = () => {
    if (isUnlocked) {
      setIsUnlocked(false);
      setUnlockTimer(5);
      return;
    }
    setIsUnlocked(true);
    setUnlockTimer(5);
    const now = new Date().toTimeString().split(' ')[0];
    setIotLogs((prevLogs) => [
      { id: Date.now(), time: now, text: 'Remote unlock pulse triggered (5s)', status: 'UNLOCKED' },
      ...prevLogs.slice(0, 4),
    ]);
  };

  const handleEmergencyToggle = () => {
    const newState = !isEmergency;
    setIsEmergency(newState);
    const now = new Date().toTimeString().split(' ')[0];
    setIotLogs((prevLogs) => [
      {
        id: Date.now(),
        time: now,
        text: newState ? '🚨 EMERGENCY OVERRIDE ENABLED: ALL GATES OPEN' : '🔧 Emergency override disabled',
        status: newState ? 'ALERT' : 'SUCCESS',
      },
      ...prevLogs.slice(0, 4),
    ]);
  };

  return (
    <div className="space-y-6 flex-grow flex flex-col justify-between">
      <div className="relative bg-black/30 border border-white/5 rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden">
        {/* Terminal corners */}
        <div className="absolute top-1.5 left-2 text-[#9CA3AF]/20 font-mono text-[9px] pointer-events-none select-none">┌</div>
        <div className="absolute top-1.5 right-2 text-[#9CA3AF]/20 font-mono text-[9px] pointer-events-none select-none">┐</div>
        <div className="absolute bottom-1.5 left-2 text-[#9CA3AF]/20 font-mono text-[9px] pointer-events-none select-none">└</div>
        <div className="absolute bottom-1.5 right-2 text-[#9CA3AF]/20 font-mono text-[9px] pointer-events-none select-none">┘</div>
        
        <div className="space-y-1.5 flex-1">
          <div className="text-[10px] text-[#94A3B8] uppercase font-bold tracking-wider">{t('dashboardFeatures_gate_name')}</div>
          <div className="text-sm font-bold text-white flex items-center gap-2 font-mono">
            <Cpu className="w-4 h-4 text-[#00ff87]" />
            <span>NODE-RELAY #42-MAIN</span>
          </div>
          <div className="text-xs text-[#94A3B8] flex items-center gap-1.5">
            <span>{t('dashboardFeatures_relay')}:</span>
            <span className="text-emerald-400 font-semibold">{t('dashboardFeatures_relay_on')}</span>
          </div>
        </div>

        <div className="relative flex flex-col items-center">
          <div className={`w-20 h-20 rounded-full border flex flex-col items-center justify-center transition-all duration-300 ${
            isEmergency
              ? 'border-rose-500 bg-rose-500/10 shadow-[0_0_15px_rgba(239,68,68,0.25)] animate-pulse'
              : isUnlocked
                ? 'border-[#00FF87] bg-[#00ff87]/10 shadow-[0_0_15px_rgba(0,255,135,0.25)]'
                : 'border-white/10 bg-white/5'
          }`}>
            {isEmergency ? (
              <AlertTriangle className="w-8 h-8 text-rose-500" />
            ) : isUnlocked ? (
              <Unlock className="w-8 h-8 text-[#00FF87]" />
            ) : (
              <Lock className="w-8 h-8 text-white/40" />
            )}
            <span className="text-[8px] uppercase font-mono font-black tracking-widest mt-1 text-white">
              {isEmergency ? 'OVERRIDE' : isUnlocked ? `${t('dashboardFeatures_unlocked_state')} (${unlockTimer}s)` : t('dashboardFeatures_locked_state')}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={handleRemoteUnlock}
          disabled={isEmergency}
          className={`py-2.5 px-4 rounded-xl text-xs font-bold transition-all border flex items-center justify-center gap-2 cursor-pointer ${
            isUnlocked
              ? 'bg-[#00ff87]/20 text-[#00ff87] border-[#00ff87]/40'
              : 'bg-white/5 text-[#E2E8F0] border-white/10 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed'
          }`}
          style={{ minHeight: '44px' }}
        >
          <Unlock className="w-4 h-4" />
          <span>{t('dashboardFeatures_remote_unlock')}</span>
        </button>
        <button
          onClick={handleEmergencyToggle}
          className={`py-2.5 px-4 rounded-xl text-xs font-bold transition-all border flex items-center justify-center gap-2 cursor-pointer ${
            isEmergency
              ? 'bg-rose-500 text-white border-rose-600 shadow-lg shadow-rose-500/20'
              : 'bg-rose-500/10 text-rose-400 border-rose-500/20 hover:bg-rose-500/25'
          }`}
          style={{ minHeight: '44px' }}
        >
          <AlertTriangle className="w-4 h-4" />
          <span>{t('dashboardFeatures_emergency_btn')}</span>
        </button>
      </div>

      <div className="relative bg-black/40 border border-white/5 rounded-xl p-4 flex-grow overflow-hidden">
        {/* Terminal corners */}
        <div className="absolute top-1.5 left-2 text-[#9CA3AF]/20 font-mono text-[9px] pointer-events-none select-none">┌</div>
        <div className="absolute top-1.5 right-2 text-[#9CA3AF]/20 font-mono text-[9px] pointer-events-none select-none">┐</div>
        <div className="absolute bottom-1.5 left-2 text-[#9CA3AF]/20 font-mono text-[9px] pointer-events-none select-none">└</div>
        <div className="absolute bottom-1.5 right-2 text-[#9CA3AF]/20 font-mono text-[9px] pointer-events-none select-none">┘</div>

        <div className="text-[10px] font-mono font-bold text-white tracking-wider uppercase mb-2.5 flex items-center gap-1.5">
          <Terminal className="w-3.5 h-3.5 text-[#00ff87]" />
          <span>{t('dashboardFeatures_logs_title')}</span>
        </div>
        <div className="space-y-1.5 font-mono text-[9px] max-h-[120px] overflow-y-auto">
          {iotLogs.map((log) => (
            <div key={log.id} className="flex justify-between items-center py-1 border-b border-white/5">
              <div className="flex items-center gap-1.5">
                <span className="text-[#94A3B8]">{log.time}</span>
                <span className="text-white">{log.text}</span>
              </div>
              <span className={`px-1.5 py-0.5 rounded text-[8px] font-mono font-bold ${
                log.status === 'SUCCESS' ? 'bg-emerald-500/10 text-emerald-400' :
                log.status === 'UNLOCKED' ? 'bg-[#00ff87]/15 text-[#00ff87]' :
                log.status === 'LOCKED' ? 'bg-white/10 text-white/60' : 'bg-rose-500/15 text-rose-400'
              }`}>
                {log.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
