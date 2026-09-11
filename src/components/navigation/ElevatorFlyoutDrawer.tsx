'use client';

import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { audioManager } from '@/lib/audioManager';
import {
  X,
  Cpu,
  FileSpreadsheet,
  Users,
  CreditCard,
  UserCheck,
  Calendar,
  ShieldCheck,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

interface SubModuleItem {
  id: string;
  targetId: string;
  icon: React.ComponentType<{ className?: string }>;
  badge: string;
  title: { ka: string; en: string; ru: string };
  desc: { ka: string; en: string; ru: string };
}

const SUBMODULES: SubModuleItem[] = [
  {
    id: 'turnstiles',
    targetId: 'dashboard-features',
    icon: Cpu,
    badge: 'IoT LIVE',
    title: {
      ka: '01. IoT ტურნიკეტების მონიტორინგი',
      en: '01. IoT Turnstile Live Sockets',
      ru: '01. Мониторинг IoT турникетов',
    },
    desc: {
      ka: 'Real-time WebSocket ნაკადი, Anti-Passback და ბიომეტრიული სკანერები.',
      en: 'Real-time WebSocket stream, Anti-Passback, and biometric scanners.',
      ru: 'Поток WebSocket в реальном времени, Anti-Passback и биометрия.',
    },
  },
  {
    id: 'labor',
    targetId: 'dashboard-features',
    icon: FileSpreadsheet,
    badge: '№01-15/ნ',
    title: {
      ka: '02. შრომის ტაბელი №01-15/ნ',
      en: '02. Labor Time Attendance №01-15/N',
      ru: '02. Табель рабочего времени №01-15/Н',
    },
    desc: {
      ka: 'ჯანდაცვის სამინისტროს რეგულაციებთან 100% შესაბამისობა და ექსპორტი.',
      en: '100% compliance with Ministry of Health regulations and Excel export.',
      ru: '100% соответствие требованиям Минздрава и экспорт в Excel.',
    },
  },
  {
    id: 'members',
    targetId: 'pure-sports-mirror',
    icon: Users,
    badge: 'ATHLETE 360°',
    title: {
      ka: '03. წევრების ბაზა & Anti-Passback',
      en: '03. Member Base & Anti-Passback',
      ru: '03. База клиентов и Anti-Passback',
    },
    desc: {
      ka: 'სრული ათლეტის პროფილი, ხელოვნური ინტელექტის გადინების რისკ-ქულა.',
      en: 'Complete athlete profile, AI churn risk score, and QR entry tracking.',
      ru: 'Полный профиль клиента, шкала оттока AI и QR-пропуск.',
    },
  },
  {
    id: 'finances',
    targetId: 'enterprise-security',
    icon: CreditCard,
    badge: 'PAYMENT API',
    title: {
      ka: '04. ფინანსები & BOG/TBC API',
      en: '04. Finances & BOG/TBC API',
      ru: '04. Финансы и API BOG/TBC',
    },
    desc: {
      ka: 'ავტომატური ბილინგი, ბანკების ინტეგრაცია და ფინანსური სუვერენიტეტი.',
      en: 'Automated recurring billing, bank integration, and PCI-DSS isolation.',
      ru: 'Автоматический биллинг, интеграция с банками и изоляция PCI-DSS.',
    },
  },
  {
    id: 'churn',
    targetId: 'analytics-showcase',
    icon: UserCheck,
    badge: 'AI RETENTION',
    title: {
      ka: '05. Churn Prediction & SMS Hub',
      en: '05. Churn Prediction & SMS Hub',
      ru: '05. Прогнозирование оттока и SMS Hub',
    },
    desc: {
      ka: 'პასიური წევრების იდენტიფიცირება და Win-Back ავტომატური კამპანიები.',
      en: 'Proactive identification of passive members and automated win-back SMS.',
      ru: 'Идентификация пассивных членов и автоматические кампании Win-Back.',
    },
  },
  {
    id: 'schedule',
    targetId: 'dashboard-features',
    icon: Calendar,
    badge: 'ZONES & TRAINERS',
    title: {
      ka: '06. მწვრთნელების & ზონების განრიგი',
      en: '06. Trainer & Zone Scheduling',
      ru: '06. Расписание тренеров и зон',
    },
    desc: {
      ka: 'აუზის ბილიკების, სტუდიების და პირადი მწვრთნელების ჭკვიანი კალენდარი.',
      en: 'Smart lane reservations, studio slots, and trainer commissions.',
      ru: 'Умное бронирование дорожек, студий и учет комиссий тренеров.',
    },
  },
  {
    id: 'rbac',
    targetId: 'staff-access-roles',
    icon: ShieldCheck,
    badge: 'CASL RBAC',
    title: {
      ka: '07. როლები (RBAC) & დაცვა',
      en: '07. Staff Access Roles & Passkeys',
      ru: '07. Ролевой доступ (RBAC) и защита',
    },
    desc: {
      ka: 'მრავალდონიანი ადმინისტრატორული როლები, FIDO2 WebAuthn Passkeys.',
      en: 'Granular role-based permissions, biometric passkeys, audit trail.',
      ru: 'Многоуровневые права доступа, биометрические Passkeys и аудит.',
    },
  },
];

interface ElevatorFlyoutDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ElevatorFlyoutDrawer: React.FC<ElevatorFlyoutDrawerProps> = ({ isOpen, onClose }) => {
  const { locale } = useLanguage();
  const drawerRef = useRef<HTMLDivElement>(null);
  const lang = (locale === 'ka' || locale === 'en' || locale === 'ru') ? locale : 'ka';

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleItemClick = (targetId: string) => {
    audioManager.playHapticClick();
    onClose();

    // Smooth scroll to target section with offset
    setTimeout(() => {
      const el = document.getElementById(targetId);
      if (el) {
        const navOffset = 80;
        const targetPos = el.getBoundingClientRect().top + window.scrollY - navOffset;
        window.scrollTo({ top: targetPos, behavior: 'smooth' });
      }
    }, 150);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Blur Overlay - Pure Fixed Overlay (Zero Layout Shift) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 cursor-pointer"
            aria-hidden="true"
          />

          {/* Sliding Glass Drawer (From Right Edge) */}
          <motion.div
            ref={drawerRef}
            initial={{ x: 60, opacity: 0, scale: 0.96 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            exit={{ x: 50, opacity: 0, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 360, damping: 28, mass: 0.8 }}
            className="fixed right-2 sm:right-16 lg:right-20 top-1/2 -translate-y-1/2 z-50 w-[92vw] sm:w-[360px] max-h-[88vh] flex flex-col bg-[#090D15]/95 border border-[#00E5FF]/30 rounded-3xl p-5 shadow-[0_20px_60px_rgba(0,0,0,0.85),0_0_30px_rgba(0,229,255,0.2)] backdrop-blur-2xl overflow-hidden will-change-transform"
            role="dialog"
            aria-modal="true"
            aria-label="ARTRON Sport OS Modules"
          >
            {/* Header Ambient Glow */}
            <div className="absolute top-0 left-0 w-48 h-32 bg-[#00E5FF]/15 rounded-full blur-3xl pointer-events-none" />

            {/* Top Bar */}
            <div className="flex items-center justify-between pb-3.5 mb-3 border-b border-white/10 relative z-10">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#00A3FF]/15 border border-[#00A3FF]/40 flex items-center justify-center text-[#00A3FF]">
                  <Sparkles className="w-4 h-4 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-xs font-mono font-bold tracking-widest text-[#00A3FF] uppercase">
                    ARTRON SPORT OS
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    {lang === 'ka'
                      ? 'მართვის პანელის ქვემოდულები'
                      : lang === 'ru'
                      ? 'Подмодули панели управления'
                      : 'Control Panel Submodules'}
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors focus:outline-none"
                aria-label="Close Drawer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Submodules List */}
            <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar relative z-10">
              {SUBMODULES.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleItemClick(item.targetId)}
                    className="w-full text-left p-3 rounded-2xl bg-white/[0.03] hover:bg-[#00A3FF]/10 border border-white/5 hover:border-[#00A3FF]/40 transition-all duration-200 group flex items-start gap-3 focus:outline-none"
                  >
                    <div className="w-8 h-8 mt-0.5 rounded-xl bg-white/5 group-hover:bg-[#00A3FF]/20 border border-white/10 group-hover:border-[#00A3FF]/40 flex items-center justify-center text-slate-300 group-hover:text-[#00A3FF] transition-all shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-0.5">
                        <span className="text-xs font-semibold text-white group-hover:text-[#00A3FF] transition-colors truncate">
                          {item.title[lang]}
                        </span>
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-[#00A3FF] border border-[#00A3FF]/20 shrink-0">
                          {item.badge}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 group-hover:text-slate-300 line-clamp-2 leading-relaxed">
                        {item.desc[lang]}
                      </p>
                    </div>

                    <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-[#00A3FF] transition-transform group-hover:translate-x-0.5 shrink-0 mt-2" />
                  </button>
                );
              })}
            </div>

            {/* Footer Quick Action */}
            <div className="pt-3 mt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400 relative z-10">
              <span className="font-mono">7 CORE MODULES</span>
              <a
                href="#booking-engine"
                onClick={(e) => {
                  e.preventDefault();
                  handleItemClick('booking-engine');
                }}
                className="text-[#00A3FF] hover:underline font-semibold flex items-center gap-1"
              >
                {lang === 'ka' ? 'დემო ჩვენება →' : lang === 'ru' ? 'Демо показ →' : 'Live Demo →'}
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
