'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { QrCode, Wifi } from 'lucide-react';

interface WalletCardProps {
  qrVal: string;
  locale: string;
}

export const WalletCard: React.FC<WalletCardProps> = ({ qrVal, locale }) => (
  <div className="relative w-full rounded-[20px] overflow-hidden bg-gradient-to-br from-[#0066FF]/90 via-[#0044CC] to-[#001A80] p-4 shadow-[0_12px_40px_rgba(0,102,255,0.45)]">
    <div
      className="absolute inset-0 opacity-[0.06] mix-blend-overlay"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: '128px',
      }}
    />
    <div className="absolute top-0 left-[-60%] w-[180%] h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
    <div className="relative z-10 flex items-center justify-between mb-3">
      <span className="text-[10px] font-black tracking-[0.2em] text-white/90 uppercase">ARTRON PASS</span>
      <Wifi className="w-3.5 h-3.5 text-white/70" />
    </div>
    <div className="relative z-10 flex justify-center mb-3">
      <div className="w-28 h-28 bg-white rounded-xl p-2 flex items-center justify-center shadow-inner relative overflow-hidden">
        <QrCode className="w-full h-full text-[#001A80]" />
        <motion.div
          className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00A3FF]/80 to-transparent"
          animate={{ top: ['10%', '88%', '10%'] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    </div>
    <div className="relative z-10 text-center">
      <span className="font-mono text-[10px] text-white/80 tracking-widest block">{qrVal}</span>
      <span className="text-[9px] text-white/50 mt-0.5 block">
        {locale === 'ka' ? 'ავტომატური განახლება 8 წმ' : 'Auto-refresh in 8s'}
      </span>
    </div>
    <div className="relative z-10 mt-3 pt-3 border-t border-white/20 flex items-center justify-between">
      <div>
        <div className="text-[9px] text-white/50 uppercase tracking-wider">Member</div>
        <div className="text-xs font-bold text-white">Nino K.</div>
      </div>
      <div className="text-right">
        <div className="text-[9px] text-white/50 uppercase tracking-wider">
          {locale === 'ka' ? 'აბონემენტი' : 'Plan'}
        </div>
        <div className="text-xs font-bold text-white">PRO · 3-Month</div>
      </div>
    </div>
  </div>
);
