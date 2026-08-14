'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { 
  CreditCard, 
  Cpu, 
  ShieldCheck, 
  Workflow, 
  Zap, 
  CheckCircle2 
} from 'lucide-react';

interface Partner {
  id: string;
  name: string;
  category: 'fintech' | 'access';
  icon: React.ReactNode;
  descKa: string;
  descEn: string;
  descRu: string;
  status: string;
}

export const PartnerEcosystem: React.FC = () => {
  const { t, locale } = useLanguage();

  const partners: Partner[] = [
    {
      id: 'stripe',
      name: 'Stripe',
      category: 'fintech',
      icon: <CreditCard className="w-6 h-6 text-[#635BFF]" />,
      descKa: 'საერთაშორისო გამოწერები და 14-დღიანი თანხის ავტომატური დაბრუნება.',
      descEn: 'Global subscription billing & 14-day statutory refund orchestration.',
      descRu: 'Международные подписки и автоматический 14-дневный возврат средств.',
      status: 'API CONNECTED',
    },
    {
      id: 'bog',
      name: 'Bank of Georgia',
      category: 'fintech',
      icon: <Zap className="w-6 h-6 text-[#FF5E00]" />,
      descKa: 'B2B ლოკალური გადახდები, BOG განვადება და Apple/Google Pay.',
      descEn: 'B2B acquiring, local BOG checkouts, Apple Pay & Google Pay support.',
      descRu: 'Локальный эквайринг, рассрочка BOG, Apple Pay и Google Pay.',
      status: 'SECURE LINK',
    },
    {
      id: 'tbc',
      name: 'TBC Bank',
      category: 'fintech',
      icon: <CheckCircle2 className="w-6 h-6 text-[#00A3FF]" />,
      descKa: 'TBC Checkout ინტეგრაცია, QR გადახდები და ბარათების უსაფრთხო შენახვა.',
      descEn: 'TBC acquiring integration, direct QR code payments, card tokenization.',
      descRu: 'Интеграция TBC Checkout, QR-оплата и токенизация карт.',
      status: 'SECURE LINK',
    },
    {
      id: 'zkteco',
      name: 'ZKTeco',
      category: 'access',
      icon: <Cpu className="w-6 h-6 text-emerald-400" />,
      descKa: 'ბიომეტრიული სკანერები, თითის ანაბეჭდის და RFID კონტროლერები.',
      descEn: 'Biometric controllers, fingerprint readers, and RFID check-in relays.',
      descRu: 'Биометрические терминалы, сканеры отпечатков пальцев и RFID-кардридеры.',
      status: 'TCP/SOCKET SYNC',
    },
    {
      id: 'hikvision',
      name: 'Hikvision',
      category: 'access',
      icon: <ShieldCheck className="w-6 h-6 text-rose-500" />,
      descKa: 'სახის ამომცნობი ტერმინალები და IP კამერების ტელემეტრიის ნაკადი.',
      descEn: 'Facial recognition terminals & real-time IP camera telemetry integration.',
      descRu: 'Терминалы распознавания лиц и трансляция телеметрии IP-камер.',
      status: 'MQTT ACTIVE',
    },
    {
      id: 'artron-core',
      name: 'Artron Relay Core',
      category: 'access',
      icon: <Workflow className="w-6 h-6 text-[#00ff87]" />,
      descKa: 'ართრონის საკუთარი IoT დაფა, 24/7 ოფლაინ კავშირი და მართვა.',
      descEn: 'Proprietary Artron IoT board, autonomous offline access cache logic.',
      descRu: 'Собственная плата IoT, автономный оффлайн-кэш пропусков 24/7.',
      status: 'NATIVE FIRMWARE',
    },
  ];

  const getDesc = (p: Partner) => {
    if (locale === 'en') return p.descEn;
    if (locale === 'ru') return p.descRu;
    return p.descKa;
  };

  return (
    <section id="partner-ecosystem" className="py-20 md:py-24 relative overflow-hidden bg-[#0B0F17] border-b border-white/5">
      {/* Grid background effect */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[linear-gradient(to_right,#00A3FF_1px,transparent_1px),linear-gradient(to_bottom,#00A3FF_1px,transparent_1px)] bg-[size:3rem_3rem]"></div>
      
      {/* Glowing decor */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[350px] h-[350px] bg-[#00A3FF]/5 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[350px] h-[350px] bg-[#00ff87]/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00A3FF]/10 border border-[#00A3FF]/20 text-xs font-mono font-bold text-[#00A3FF] mb-4 tracking-wider uppercase">
            [SYS: PARTNER_NET]
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
            {t('partner_title')}
          </h2>
          <p className="mt-4 text-sm md:text-base text-[#94A3B8] font-medium leading-relaxed">
            {t('partner_subtitle')}
          </p>
        </div>

        {/* Categories split grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Fintech & Billing */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 border-b border-white/10 pb-3">
              <div className="p-2 bg-[#00A3FF]/10 rounded-lg text-[#00A3FF] border border-[#00A3FF]/20">
                <CreditCard className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-black tracking-wider uppercase text-white font-mono">
                {t('partner_fintech')}
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {partners.filter(p => p.category === 'fintech').map(p => (
                <div 
                  key={p.id} 
                  className="bg-[#121722]/50 border border-white/5 hover:border-[#00A3FF]/50 p-5 rounded-2xl transition-all duration-300 group flex items-start gap-4 relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-[2px] h-full bg-[#00A3FF] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="p-3 bg-white/5 border border-white/10 rounded-xl group-hover:border-white/20 transition-all shrink-0">
                    {p.icon}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-black text-white">{p.name}</span>
                      <span className="text-[8px] font-mono font-bold text-[#00A3FF] bg-[#00A3FF]/10 px-1.5 py-0.5 rounded border border-[#00A3FF]/20 tracking-wider">
                        {p.status}
                      </span>
                    </div>
                    <p className="text-xs text-[#94A3B8] leading-relaxed">
                      {getDesc(p)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Access Control & Hardware */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 border-b border-white/10 pb-3">
              <div className="p-2 bg-[#00ff87]/10 rounded-lg text-[#00ff87] border border-[#00ff87]/20">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-black tracking-wider uppercase text-white font-mono">
                {t('partner_access')}
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {partners.filter(p => p.category === 'access').map(p => (
                <div 
                  key={p.id} 
                  className="bg-[#121722]/50 border border-white/5 hover:border-[#00ff87]/50 p-5 rounded-2xl transition-all duration-300 group flex items-start gap-4 relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-[2px] h-full bg-[#00ff87] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="p-3 bg-white/5 border border-white/10 rounded-xl group-hover:border-white/20 transition-all shrink-0">
                    {p.icon}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-black text-white">{p.name}</span>
                      <span className="text-[8px] font-mono font-bold text-[#00ff87] bg-[#00ff87]/10 px-1.5 py-0.5 rounded border border-[#00ff87]/20 tracking-wider">
                        {p.status}
                      </span>
                    </div>
                    <p className="text-xs text-[#94A3B8] leading-relaxed">
                      {getDesc(p)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
