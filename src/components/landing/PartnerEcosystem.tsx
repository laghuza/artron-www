'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { 
  CreditCard, 
  Cpu, 
  ShieldCheck, 
  Workflow, 
  Zap, 
  CheckCircle2, 
  Building2, 
  Users, 
  Sparkles,
  Lock
} from 'lucide-react';

interface GymClient {
  id: string;
  name: string;
  subtitleKa: string;
  subtitleEn: string;
  subtitleRu: string;
  followers: string;
  tags: string[];
  descKa: string;
  descEn: string;
  descRu: string;
  brandColor: string;
  badge: React.ReactNode;
}

interface Partner {
  id: string;
  name: string;
  category: 'hardware' | 'fintech';
  icon: React.ReactNode;
  descKa: string;
  descEn: string;
  descRu: string;
  status: string;
  statusType: 'live' | 'official' | 'talks';
  brandColor: string;
}

export const PartnerEcosystem: React.FC = () => {
  const { t, locale } = useLanguage();
  const [activeTab, setActiveTab] = useState<'all' | 'clients' | 'hardware' | 'fintech'>('all');

  const gymClients: GymClient[] = [
    {
      id: 'x-area',
      name: 'X AREA GYM',
      subtitleKa: 'პრემიუმ ფიტნეს სივრცე',
      subtitleEn: 'Premium Fitness Space',
      subtitleRu: 'Премиум фитнес-пространство',
      followers: '11,000+',
      tags: ['IoT ტურნიკეტები', 'CRM პანელი', 'QR დაშვება', 'აბონემენტები'],
      descKa: 'სრულად ავტომატიზებული ტურნიკეტებით, QR დაშვებითა და ცენტრალური CRM სამართავი პანელით.',
      descEn: 'Fully automated turnstile access, dynamic QR pass, and unified central CRM control panel.',
      descRu: 'Полная автоматизация турникетов, динамические QR-пропуска и единая CRM панель.',
      brandColor: '#CCFF00',
      badge: (
        <div className="w-12 h-12 rounded-full bg-black border-2 border-white/20 flex flex-col items-center justify-center relative overflow-hidden shadow-lg shrink-0">
          <span className="text-[9px] font-black text-white leading-none tracking-tighter">X AREA</span>
          <span className="text-[10px] font-extrabold text-[#CCFF00] leading-none tracking-tighter">GYM</span>
        </div>
      ),
    },
    {
      id: 'flex-fitness',
      name: 'Flex Fitness',
      subtitleKa: 'ძალისმიერი & ფუნქციური დარბაზი',
      subtitleEn: 'Strength & Functional Gym',
      subtitleRu: 'Силовой и функциональный зал',
      followers: '3,000+',
      tags: ['ბრძანება №01-15/ნ', 'მწვრთნელები', 'ვიზიტების ისტორია', 'ფინანსები'],
      descKa: 'მწვრთნელების მართვა, შრომის აღრიცხვა ბრძანება №01-15/ნ-ით და წევრების ვიზიტების ტელემეტრია.',
      descEn: 'Trainer management, labor time-tracking under Order №01-15/N, and member attendance telemetry.',
      descRu: 'Управление тренерами, учет рабочего времени по Приказу №01-15/н и телеметрия визитов.',
      brandColor: '#00D2FF',
      badge: (
        <div className="w-12 h-12 rounded-full bg-[#0d121d] border-2 border-[#00D2FF] flex items-center justify-center relative shadow-lg shrink-0">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 absolute -bottom-0.5 -right-0.5 border-2 border-[#0B0F17] animate-pulse"></div>
          <span className="text-[11px] font-black text-[#00D2FF] tracking-tight">FF</span>
        </div>
      ),
    },
    {
      id: 'pixl-fitness',
      name: 'PIXL Fitness',
      subtitleKa: 'პიქსელ ფიტნესი • ინოვაციური კლუბი',
      subtitleEn: 'PIXL Fitness • Innovative Club',
      subtitleRu: 'Пиксель Фитнес • Инновационный клуб',
      followers: '2,800+',
      tags: ['ონლაინ გაყიდვები', 'მომხმარებელთა ბაზა', 'შემოსავლების ანალიტიკა'],
      descKa: 'ავტომატური გაყიდვების მოდული, მომხმარებელთა ნაკადის მართვა და ფინანსური რეპორტინგი.',
      descEn: 'Automated sales engine, customer flow management, and real-time revenue analytics.',
      descRu: 'Модуль автоматических продаж, управление потоком клиентов и финансовая аналитика.',
      brandColor: '#FF4D4D',
      badge: (
        <div className="w-12 h-12 rounded-full bg-[#0e1420] border-2 border-[#00A3FF] flex items-center justify-center relative shadow-lg shrink-0">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 absolute -bottom-0.5 -right-0.5 border-2 border-[#0B0F17] animate-pulse"></div>
          <span className="text-[12px] font-black text-[#FF4D4D] tracking-tighter">FX</span>
        </div>
      ),
    },
  ];

  const partners: Partner[] = [
    {
      id: 'zkteco',
      name: 'ZKTeco Georgia',
      category: 'hardware',
      icon: <Cpu className="w-6 h-6 text-emerald-400" />,
      descKa: 'ოფიციალური წარმომადგენელი საქართველოში: ბიომეტრიული სკანერები, სახის ამოცნობა და RFID ტურნიკეტები.',
      descEn: 'Official Representative in Georgia: Biometric scanners, facial recognition terminals, and RFID turnstiles.',
      descRu: 'Официальный представитель в Грузии: Биометрические сканеры, распознавание лиц и RFID турникеты.',
      status: 'OFFICIAL DISTRIBUTOR / GE',
      statusType: 'official',
      brandColor: '#00E599',
    },
    {
      id: 'gantner',
      name: 'GANTNER Electronic',
      category: 'hardware',
      icon: <Lock className="w-6 h-6 text-[#00A3FF]" />,
      descKa: 'მოლაპარაკების ეტაპზე: ევროპული ლიდერი ჭკვიან საკეტებში (Smart Lockers), RFID/NFC სამაჯურებსა და დაშვებაში.',
      descEn: 'In Partnership Negotiations: European leader in Smart Lockers, RFID/NFC wristbands, and access solutions.',
      descRu: 'В процессе переговоров: Европейский лидер в умных замках (Smart Lockers) и RFID/NFC браслетах.',
      status: 'IN PARTNERSHIP TALKS',
      statusType: 'talks',
      brandColor: '#00A3FF',
    },
    {
      id: 'hikvision',
      name: 'Hikvision',
      category: 'hardware',
      icon: <ShieldCheck className="w-6 h-6 text-rose-500" />,
      descKa: 'სახის ამომცნობი ტერმინალები და IP კამერების ტელემეტრიის რეალურ დროში ნაკადი.',
      descEn: 'Facial recognition terminals & real-time IP camera telemetry stream integration.',
      descRu: 'Терминалы распознавания лиц и трансляция телеметрии IP-камер в реальном времени.',
      status: 'MQTT / IP ACTIVE',
      statusType: 'live',
      brandColor: '#F43F5E',
    },
    {
      id: 'artron-core',
      name: 'Artron Relay Core',
      category: 'hardware',
      icon: <Workflow className="w-6 h-6 text-[#00ff87]" />,
      descKa: 'ართრონის საკუთარი IoT დაფა, 24/7 ოფლაინ ავტონომიური დაშვების ქეშირება.',
      descEn: 'Proprietary Artron IoT board, autonomous 24/7 offline access cache architecture.',
      descRu: 'Собственная плата IoT, автономный оффлайн-кэш пропусков 24/7.',
      status: 'NATIVE FIRMWARE',
      statusType: 'live',
      brandColor: '#00FF87',
    },
    {
      id: 'bog',
      name: 'Bank of Georgia',
      category: 'fintech',
      icon: <Zap className="w-6 h-6 text-[#FF5E00]" />,
      descKa: 'B2B ლოკალური გადახდები, BOG განვადება, Apple Pay და Google Pay მხარდაჭერა.',
      descEn: 'B2B acquiring, local BOG installment checkouts, Apple Pay & Google Pay.',
      descRu: 'Локальный эквайринг, рассрочка BOG, Apple Pay и Google Pay.',
      status: 'SECURE LINK',
      statusType: 'live',
      brandColor: '#FF5E00',
    },
    {
      id: 'tbc',
      name: 'TBC Bank',
      category: 'fintech',
      icon: <CheckCircle2 className="w-6 h-6 text-[#00A3FF]" />,
      descKa: 'TBC Checkout ინტეგრაცია, პირდაპირი QR გადახდები და ბარათების უსაფრთხო ტოკენიზაცია.',
      descEn: 'TBC acquiring integration, direct QR code payments, and card tokenization.',
      descRu: 'Интеграция TBC Checkout, QR-оплата и безопасная токенизация карт.',
      status: 'SECURE LINK',
      statusType: 'live',
      brandColor: '#00A3FF',
    },
    {
      id: 'stripe',
      name: 'Stripe',
      category: 'fintech',
      icon: <CreditCard className="w-6 h-6 text-[#635BFF]" />,
      descKa: 'საერთაშორისო გამოწერები და 14-დღიანი თანხის ავტომატური დაბრუნების პროტოკოლი.',
      descEn: 'Global subscription billing & 14-day statutory refund orchestration.',
      descRu: 'Международные подписки и автоматический 14-дневный возврат средств.',
      status: 'API CONNECTED',
      statusType: 'live',
      brandColor: '#635BFF',
    },
  ];

  const getGymSubtitle = (g: GymClient) => {
    if (locale === 'en') return g.subtitleEn;
    if (locale === 'ru') return g.subtitleRu;
    return g.subtitleKa;
  };

  const getGymDesc = (g: GymClient) => {
    if (locale === 'en') return g.descEn;
    if (locale === 'ru') return g.descRu;
    return g.descKa;
  };

  const getPartnerDesc = (p: Partner) => {
    if (locale === 'en') return p.descEn;
    if (locale === 'ru') return p.descRu;
    return p.descKa;
  };

  return (
    <section id="partner-ecosystem" className="py-20 md:py-28 relative overflow-hidden bg-[#0B0F17] border-b border-white/5">
      {/* Dynamic Matrix Background Grid */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[linear-gradient(to_right,#00A3FF_1px,transparent_1px),linear-gradient(to_bottom,#00A3FF_1px,transparent_1px)] bg-[size:3rem_3rem]"></div>
      
      {/* Glowing atmospheric orbs */}
      <div className="absolute top-1/4 left-1/5 -translate-y-1/2 w-[400px] h-[400px] bg-[#00A3FF]/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/5 -translate-y-1/2 w-[400px] h-[400px] bg-[#00ff87]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00A3FF]/10 border border-[#00A3FF]/25 text-xs font-mono font-bold text-[#00A3FF] mb-4 tracking-wider uppercase shadow-[0_0_15px_rgba(0,163,255,0.15)]">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>{t('partner_badge')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            {t('partner_title')}
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#94A3B8] font-medium leading-relaxed">
            {t('partner_subtitle')}
          </p>

          {/* Interactive Filter Tabs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3 p-1.5 bg-[#121722]/80 border border-white/10 rounded-2xl backdrop-blur-md max-w-xl mx-auto">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 ${
                activeTab === 'all'
                  ? 'bg-[#00A3FF] text-white shadow-[0_0_20px_rgba(0,163,255,0.4)]'
                  : 'text-[#94A3B8] hover:text-white hover:bg-white/5'
              }`}
            >
              {t('partner_tab_all')}
            </button>
            <button
              onClick={() => setActiveTab('clients')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 flex items-center gap-1.5 ${
                activeTab === 'clients'
                  ? 'bg-[#CCFF00] text-black shadow-[0_0_20px_rgba(204,255,0,0.4)]'
                  : 'text-[#94A3B8] hover:text-white hover:bg-white/5'
              }`}
            >
              <Building2 className="w-4 h-4" />
              {t('partner_tab_clients')}
            </button>
            <button
              onClick={() => setActiveTab('hardware')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 flex items-center gap-1.5 ${
                activeTab === 'hardware'
                  ? 'bg-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.4)]'
                  : 'text-[#94A3B8] hover:text-white hover:bg-white/5'
              }`}
            >
              <Cpu className="w-4 h-4" />
              {t('partner_tab_hardware')}
            </button>
            <button
              onClick={() => setActiveTab('fintech')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 flex items-center gap-1.5 ${
                activeTab === 'fintech'
                  ? 'bg-[#635BFF] text-white shadow-[0_0_20px_rgba(99,91,255,0.4)]'
                  : 'text-[#94A3B8] hover:text-white hover:bg-white/5'
              }`}
            >
              <CreditCard className="w-4 h-4" />
              {t('partner_tab_fintech')}
            </button>
          </div>
        </div>

        {/* SECTION 1: CLIENT FITNESS CLUBS (Social Proof) */}
        {(activeTab === 'all' || activeTab === 'clients') && (
          <div className="mb-14">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#CCFF00]/10 rounded-xl text-[#CCFF00] border border-[#CCFF00]/20">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black tracking-wide uppercase text-white font-mono flex items-center gap-2">
                    {t('partner_tab_clients')}
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/30">
                      LIVE IN PRODUCTION
                    </span>
                  </h3>
                  <p className="text-xs text-[#94A3B8]">
                    დარბაზები, სადაც ართრონის სისტემა 24/7 რეჟიმში უზრუნველყოფს სრულ ავტომატიზაციას
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {gymClients.map((gym) => (
                <div
                  key={gym.id}
                  className="bg-[#121722]/70 border border-white/10 hover:border-[#00A3FF]/50 p-6 rounded-2xl transition-all duration-300 group relative overflow-hidden backdrop-blur-sm flex flex-col justify-between hover:shadow-[0_0_30px_rgba(0,163,255,0.15)]"
                >
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#00A3FF] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div>
                    {/* Top Row: Badge + Name + Status */}
                    <div className="flex items-start gap-4 mb-4">
                      {gym.badge}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="text-base font-black text-white truncate">{gym.name}</h4>
                          <span className="text-[9px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                            {t('partner_client_status')}
                          </span>
                        </div>
                        <p className="text-xs text-[#94A3B8] font-medium mt-0.5">
                          {getGymSubtitle(gym)}
                        </p>
                      </div>
                    </div>

                    {/* Followers & Metrics Badge */}
                    <div className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded-xl mb-4 text-xs font-mono text-[#94A3B8]">
                      <Users className="w-4 h-4 text-[#00A3FF]" />
                      <span className="font-bold text-white">{gym.followers}</span>
                      <span>{t('partner_client_metrics')}</span>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-[#94A3B8] leading-relaxed mb-4">
                      {getGymDesc(gym)}
                    </p>
                  </div>

                  {/* Feature Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/5">
                    {gym.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md bg-white/5 text-[#E2E8F0] border border-white/10"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 2: HARDWARE & ACCESS CONTROL */}
        {(activeTab === 'all' || activeTab === 'hardware') && (
          <div className="mb-14">
            <div className="flex items-center gap-3 border-b border-white/10 pb-4 mb-6">
              <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-400 border border-emerald-500/20">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-black tracking-wide uppercase text-white font-mono">
                  {t('partner_access')}
                </h3>
                <p className="text-xs text-[#94A3B8]">
                  ბიომეტრიული სკანერები, ჭკვიანი საკეტები და ტურნიკეტების პირდაპირი ინტეგრაცია
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {partners.filter(p => p.category === 'hardware').map(p => (
                <div 
                  key={p.id} 
                  className="bg-[#121722]/60 border border-white/10 hover:border-emerald-400/50 p-5 rounded-2xl transition-all duration-300 group flex flex-col justify-between relative overflow-hidden backdrop-blur-sm hover:shadow-[0_0_25px_rgba(16,185,129,0.15)]"
                >
                  <div className="absolute top-0 left-0 w-[3px] h-full bg-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="p-2.5 bg-white/5 border border-white/10 rounded-xl group-hover:border-emerald-400/30 transition-all">
                        {p.icon}
                      </div>
                      <span className={`text-[9px] font-mono font-extrabold px-2 py-0.5 rounded-full border ${
                        p.statusType === 'official'
                          ? 'text-emerald-300 bg-emerald-500/15 border-emerald-500/30'
                          : p.statusType === 'talks'
                          ? 'text-cyan-300 bg-cyan-500/15 border-cyan-500/30'
                          : 'text-[#00A3FF] bg-[#00A3FF]/10 border-[#00A3FF]/20'
                      }`}>
                        {p.status}
                      </span>
                    </div>

                    <h4 className="text-sm font-black text-white mb-1.5">{p.name}</h4>
                    <p className="text-xs text-[#94A3B8] leading-relaxed">
                      {getPartnerDesc(p)}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-[#64748B]">
                    <span>PROTOCOL</span>
                    <span className="text-emerald-400 font-bold">TCP / MQTT / SOCKET</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 3: FINTECH & BILLING */}
        {(activeTab === 'all' || activeTab === 'fintech') && (
          <div>
            <div className="flex items-center gap-3 border-b border-white/10 pb-4 mb-6">
              <div className="p-2 bg-[#635BFF]/10 rounded-xl text-[#635BFF] border border-[#635BFF]/20">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-black tracking-wide uppercase text-white font-mono">
                  {t('partner_fintech')}
                </h3>
                <p className="text-xs text-[#94A3B8]">
                  საბანკო ეკვაირინგი, B2B გამოწერები და უსაფრთხო გადახდები
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {partners.filter(p => p.category === 'fintech').map(p => (
                <div 
                  key={p.id} 
                  className="bg-[#121722]/60 border border-white/10 hover:border-[#635BFF]/50 p-5 rounded-2xl transition-all duration-300 group flex flex-col justify-between relative overflow-hidden backdrop-blur-sm hover:shadow-[0_0_25px_rgba(99,91,255,0.15)]"
                >
                  <div className="absolute top-0 left-0 w-[3px] h-full bg-[#635BFF] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="p-2.5 bg-white/5 border border-white/10 rounded-xl group-hover:border-[#635BFF]/30 transition-all">
                        {p.icon}
                      </div>
                      <span className="text-[9px] font-mono font-extrabold px-2 py-0.5 rounded-full border text-[#635BFF] bg-[#635BFF]/10 border-[#635BFF]/30">
                        {p.status}
                      </span>
                    </div>

                    <h4 className="text-sm font-black text-white mb-1.5">{p.name}</h4>
                    <p className="text-xs text-[#94A3B8] leading-relaxed">
                      {getPartnerDesc(p)}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-[#64748B]">
                    <span>SECURITY</span>
                    <span className="text-[#635BFF] font-bold">PCI-DSS / 3D SECURE</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
