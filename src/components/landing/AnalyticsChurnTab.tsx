import React, { useState, useEffect, useRef } from 'react';
import { Activity, ShieldAlert, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ChurnUser {
  id: number;
  name: string;
  risk: number;
  factor: string;
  trigger: string;
  status: string;
}

interface AnalyticsChurnTabProps {
  t: (key: string) => string;
  locale: string;
  churnMock: ChurnUser[];
  selectedUserIndex: number;
  setSelectedUserIndex: (idx: number) => void;
}

export const AnalyticsChurnTab: React.FC<AnalyticsChurnTabProps> = ({
  t,
  locale,
  churnMock,
  selectedUserIndex,
  setSelectedUserIndex,
}) => {
  const selectedUser = churnMock[selectedUserIndex];

  // High performance count-up animation for circular risk indicator
  const [displayRisk, setDisplayRisk] = useState(0);
  const prevRiskRef = useRef(0);

  useEffect(() => {
    const start = prevRiskRef.current;
    const end = selectedUser.risk;
    if (start === end) {
      setDisplayRisk(end);
      return;
    }
    const duration = 800; // ms
    const startTime = performance.now();

    let animationFrameId: number;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Easing: easeOutQuad
      const easedProgress = progress * (2 - progress);
      const currentVal = Math.round(start + (end - start) * easedProgress);
      setDisplayRisk(currentVal);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        prevRiskRef.current = end;
      }
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [selectedUser.risk]);

  const listVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    show: { 
      opacity: 1, 
      x: 0, 
      transition: { 
        type: 'spring' as const, 
        stiffness: 180, 
        damping: 18 
      } 
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center flex-grow">
      {/* Gauges Side */}
      <div className="lg:col-span-5 flex flex-col items-center justify-center space-y-6">
        <div className="relative w-48 h-48">
          {/* Glowing dynamic background */}
          <div className="absolute inset-0 bg-[#FF4A5A]/5 rounded-full filter blur-xl animate-pulse"></div>
          
          {/* SVG Gauge */}
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" stroke="rgba(255,255,255,0.03)" strokeWidth="8" fill="transparent" />
            <motion.circle 
              cx="50" 
              cy="50" 
              r="40" 
              stroke={selectedUser.status === 'HIGH' ? '#FF4A5A' : selectedUser.status === 'MEDIUM' ? '#FFC700' : '#00ff87'} 
              strokeWidth="8" 
              fill="transparent" 
              strokeDasharray="251.2"
              initial={{ strokeDashoffset: 251.2 }}
              animate={{ strokeDashoffset: 251.2 - (251.2 * selectedUser.risk) / 100 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              strokeLinecap="round"
            />
          </svg>
          
          {/* Gauge Text overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-4xl md:text-5xl font-black text-white font-mono tracking-tighter">
              {displayRisk}%
            </span>
            <span className="text-[9px] font-mono text-[#94A3B8] uppercase tracking-widest mt-1">
              {locale === 'ka' ? 'რისკის დონე' : locale === 'ru' ? 'Уровень риска' : 'Risk Factor'}
            </span>
          </div>
        </div>

        <div className="text-center">
          <AnimatePresence mode="wait">
            <motion.div 
              key={selectedUser.status}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#FF4A5A]/10 border border-[#FF4A5A]/20 text-[10px] font-mono font-bold text-[#FF4A5A] uppercase"
            >
              <ShieldAlert className="w-3.5 h-3.5" /> 
              {selectedUser.status} RISK DETECTED
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Data Panel Side */}
      <div className="lg:col-span-7 space-y-6">
        <div>
          <h3 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
            <Activity className="w-5 h-5 text-[#00e5ff]" />
            {t('analytics_churn_title')}
          </h3>
          <p className="text-xs text-[#94A3B8]">{t('analytics_churn_subtitle')}</p>
        </div>

        {/* User Selector List */}
        <motion.div 
          variants={listVariants}
          initial="hidden"
          animate="show"
          className="space-y-3"
        >
          {churnMock.map((user, idx) => {
            const isSelected = selectedUserIndex === idx;
            return (
              <motion.button
                key={user.id}
                variants={itemVariants}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => setSelectedUserIndex(idx)}
                className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-center justify-between cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#00ff87] ${
                  isSelected
                    ? 'bg-[#0b0f17]/80 border-[#00ff87] shadow-md shadow-[#00ff87]/5'
                    : 'bg-white/[0.02] border-white/5 hover:border-white/10 hover:bg-white/[0.04]'
                }`}
                style={{ minHeight: '64px' }}
              >
                <div className="flex items-center gap-4">
                  <span className={`w-2.5 h-2.5 rounded-full ${
                    user.status === 'HIGH' ? 'bg-[#FF4A5A]' : user.status === 'MEDIUM' ? 'bg-[#FFC700]' : 'bg-[#00ff87]'
                  } animate-pulse`}></span>
                  <div>
                    <div className="text-sm font-bold text-white font-mono">{user.name}</div>
                    <div className="text-xs text-[#94A3B8]">{user.factor}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded border ${
                    user.status === 'HIGH' 
                      ? 'bg-[#FF4A5A]/10 border-[#FF4A5A]/25 text-[#FF4A5A]' 
                      : user.status === 'MEDIUM' 
                      ? 'bg-[#FFC700]/10 border-[#FFC700]/25 text-[#FFC700]' 
                      : 'bg-[#00ff87]/10 border-[#00ff87]/25 text-[#00ff87]'
                  }`}>
                    {user.risk}%
                  </span>
                  <ChevronRight className={`w-4 h-4 text-[#94A3B8] transition-transform ${isSelected ? 'translate-x-1 text-[#00ff87]' : ''}`} />
                </div>
              </motion.button>
            );
          })}
        </motion.div>

        {/* AI Trigger Box */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={selectedUser.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="p-4 rounded-2xl bg-[#05070a] border border-[#8a99ad]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="space-y-1">
              <div className="text-[10px] font-mono text-[#00e5ff] uppercase font-bold">[ AI_TRIGGER_ROUTINE ]</div>
              <div className="text-xs text-white font-semibold">
                {selectedUser.trigger}
              </div>
            </div>
            <div className="text-[10px] font-mono font-semibold px-3 py-1 rounded bg-[#00ff87]/10 border border-[#00ff87]/20 text-[#00ff87] self-start sm:self-auto uppercase tracking-wider">
              {locale === 'ka' ? 'აქტიურია' : locale === 'ru' ? 'Активно' : 'Active Status'}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
