import React from 'react';
import { Cpu, Lock, ShieldCheck, Workflow, Zap, CheckCircle2, CreditCard } from 'lucide-react';

export interface GymClient {
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

export interface Partner {
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

export const gymClients: GymClient[] = [
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
    badge: React.createElement(
      'div',
      { className: "w-12 h-12 rounded-full bg-black border-2 border-white/20 flex flex-col items-center justify-center relative overflow-hidden shadow-lg shrink-0" },
      React.createElement('span', { className: "text-[9px] font-black text-white leading-none tracking-tighter" }, 'X AREA'),
      React.createElement('span', { className: "text-[10px] font-extrabold text-[#CCFF00] leading-none tracking-tighter" }, 'GYM')
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
    badge: React.createElement(
      'div',
      { className: "w-12 h-12 rounded-full bg-[#0d121d] border-2 border-[#00D2FF] flex items-center justify-center relative shadow-lg shrink-0" },
      React.createElement('div', { className: "w-2.5 h-2.5 rounded-full bg-emerald-400 absolute -bottom-0.5 -right-0.5 border-2 border-[#0B0F17] animate-pulse" }),
      React.createElement('span', { className: "text-[11px] font-black text-[#00D2FF] tracking-tight" }, 'FF')
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
    badge: React.createElement(
      'div',
      { className: "w-12 h-12 rounded-full bg-[#0e1420] border-2 border-[#00A3FF] flex items-center justify-center relative shadow-lg shrink-0" },
      React.createElement('div', { className: "w-2.5 h-2.5 rounded-full bg-emerald-400 absolute -bottom-0.5 -right-0.5 border-2 border-[#0B0F17] animate-pulse" }),
      React.createElement('span', { className: "text-[12px] font-black text-[#FF4D4D] tracking-tighter" }, 'FX')
    ),
  },
];

export const hardwarePartners: Partner[] = [
  {
    id: 'zkteco',
    name: 'ZKTeco Georgia',
    category: 'hardware',
    icon: React.createElement(Cpu, { className: "w-6 h-6 text-emerald-400" }),
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
    icon: React.createElement(Lock, { className: "w-6 h-6 text-[#00A3FF]" }),
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
    icon: React.createElement(ShieldCheck, { className: "w-6 h-6 text-rose-500" }),
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
    icon: React.createElement(Workflow, { className: "w-6 h-6 text-[#00ff87]" }),
    descKa: 'ართრონის საკუთარი IoT დაფა, 24/7 ოფლაინ ავტონომიური დაშვების ქეშირება.',
    descEn: 'Proprietary Artron IoT board, autonomous 24/7 offline access cache architecture.',
    descRu: 'Собственная плата IoT, автономный оффлайн-кэш пропусков 24/7.',
    status: 'NATIVE FIRMWARE',
    statusType: 'live',
    brandColor: '#00FF87',
  },
];

export const fintechPartners: Partner[] = [
  {
    id: 'bog',
    name: 'Bank of Georgia',
    category: 'fintech',
    icon: React.createElement(Zap, { className: "w-6 h-6 text-[#FF5E00]" }),
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
    icon: React.createElement(CheckCircle2, { className: "w-6 h-6 text-[#00A3FF]" }),
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
    icon: React.createElement(CreditCard, { className: "w-6 h-6 text-[#635BFF]" }),
    descKa: 'საერთაშორისო გამოწერები და 14-დღიანი თანხის ავტომატური დაბრუნების პროტოკოლი.',
    descEn: 'Global subscription billing & 14-day statutory refund orchestration.',
    descRu: 'Международные подписки и автоматический 14-дневный возврат средств.',
    status: 'API CONNECTED',
    statusType: 'live',
    brandColor: '#635BFF',
  },
];
