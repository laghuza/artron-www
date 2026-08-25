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
  subtitleKa?: string;
  subtitleEn?: string;
  subtitleRu?: string;
  category: 'hardware' | 'fintech';
  icon: React.ReactNode;
  descKa: string;
  descEn: string;
  descRu: string;
  status: string;
  statusType: 'live' | 'official' | 'talks' | 'primary';
  brandColor: string;
  isPrimary?: boolean;
  badges?: string[];
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
  {
    id: 'fitness-zona-15',
    name: 'Fitness Zona 15',
    subtitleKa: 'სპორტული დარბაზი',
    subtitleEn: 'Sports Fitness Gym',
    subtitleRu: 'Спортивный зал',
    followers: '1,400+',
    tags: ['IoT ტურნიკეტები', 'სპორტული დარბაზი', 'CRM', 'QR დაშვება'],
    descKa: 'სრული ავტომატიზაცია, წევრების ბაზა და QR დაშვების სისტემა.',
    descEn: 'Full facility automation, member database, and QR access control.',
    descRu: 'Полная автоматизация зала, база клиентов и QR контроль доступа.',
    brandColor: '#22C55E',
    badge: React.createElement(
      'div',
      { className: "w-12 h-12 rounded-full bg-black border-2 border-[#22C55E] flex flex-col items-center justify-center relative shadow-lg shrink-0 overflow-hidden" },
      React.createElement('div', { className: "w-2.5 h-2.5 rounded-full bg-emerald-400 absolute -bottom-0.5 -right-0.5 border-2 border-[#0B0F17] animate-pulse" }),
      React.createElement('span', { className: "text-[7.5px] font-black text-[#22C55E] tracking-tighter uppercase leading-tight" }, 'FITNESS'),
      React.createElement('span', { className: "text-[9.5px] font-black text-white tracking-tighter leading-tight" }, 'ზონა 15')
    ),
  },
  {
    id: 'athletic-kutaisi',
    name: 'Athletic.ათლეტიკი',
    subtitleKa: 'ფიტნეს კლუბი & დარბაზი',
    subtitleEn: 'Fitness Club & Gym',
    subtitleRu: 'Фитнес-клуб и тренажерный зал',
    followers: '840+',
    tags: ['IoT ტურნიკეტები', 'ქუთაისი', 'ფიტნეს ცენტრი', 'QR დაშვება'],
    descKa: 'სრული ავტომატიზაცია, წევრების ვიზიტების აღრიცხვა და QR კოდით დაშვების სისტემა.',
    descEn: 'Full facility automation, member visit tracking, and smart QR access control.',
    descRu: 'Полная автоматизация, учет посещений и система доступа по QR-коду.',
    brandColor: '#FF9900',
    badge: React.createElement(
      'div',
      { className: "w-12 h-12 rounded-full bg-black border-2 border-[#00A3FF] flex items-center justify-center relative shadow-lg shrink-0 overflow-hidden" },
      React.createElement('div', { className: "w-2.5 h-2.5 rounded-full bg-emerald-400 absolute -bottom-0.5 -right-0.5 border-2 border-[#0B0F17] animate-pulse z-10" }),
      React.createElement(
        'svg',
        { viewBox: "0 0 120 120", className: "w-11 h-11 select-none", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
        React.createElement('rect', { x: "12", y: "34", width: "4", height: "52", rx: "1.5", fill: "#FFFFFF" }),
        React.createElement('rect', { x: "19", y: "40", width: "4", height: "40", rx: "1.5", fill: "#CBD5E1" }),
        React.createElement('rect', { x: "97", y: "40", width: "4", height: "40", rx: "1.5", fill: "#CBD5E1" }),
        React.createElement('rect', { x: "104", y: "34", width: "4", height: "52", rx: "1.5", fill: "#FFFFFF" }),
        React.createElement('path', { d: "M 27 72 L 39 34 L 51 72 L 44 72 L 39 56 L 34 72 Z", fill: "#FF9900" }),
        React.createElement('text', { x: "47", y: "66", fill: "#FFFFFF", fontSize: "19", fontWeight: "900", fontFamily: "Impact, system-ui, sans-serif", letterSpacing: "-0.5" }, "THLETIC"),
        React.createElement('text', { x: "60", y: "85", textAnchor: "middle", fill: "#FFB800", fontSize: "7.5", fontWeight: "900", fontFamily: "system-ui, sans-serif", letterSpacing: "0.4" }, "FITNESS CLUB GEORGIA")
      )
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
    subtitleKa: 'მთავარი საგადახდო პარტნიორი • Mobile & Web',
    subtitleEn: 'Primary Payment Gateway • Mobile & Web',
    subtitleRu: 'Основной платежный шлюз • Mobile & Web',
    category: 'fintech',
    isPrimary: true,
    icon: React.createElement(
      'div',
      { className: "w-7 h-7 rounded-lg bg-gradient-to-br from-[#FF5E00] to-[#FF8C00] flex items-center justify-center shadow-[0_0_15px_rgba(255,94,0,0.4)]" },
      React.createElement(
        'svg',
        { viewBox: "0 0 24 24", className: "w-4.5 h-4.5 fill-white select-none", xmlns: "http://www.w3.org/2000/svg" },
        React.createElement('path', { d: "M12 2L2 7l10 5 10-5-10-5zm0 8.5L4.5 7 12 3.25 19.5 7 12 10.5zM2 17l10 5 10-5v-2l-10 5-10-5v2zm0-5l10 5 10-5v-2l-10 5-10-5v2z" })
      )
    ),
    descKa: 'მობილური აპლიკაციისა და ონლაინ გაყიდვების ცენტრალური ექვაირინგი: Apple Pay & Google Pay 1-კლიკით გადახდა, BOG 0% განვადება და ბარათების უსაფრთხო ტოკენიზაცია.',
    descEn: 'Mobile App & online sales central acquiring: 1-click Apple Pay & Google Pay, BOG 0% installment checkout, and secure recurring card tokenization.',
    descRu: 'Центральный эквайринг мобильного приложения и онлайн-продаж: Apple Pay и Google Pay в 1 клик, рассрочка BOG 0% и безопасная токенизация карт.',
    status: 'PRIMARY MOBILE GATEWAY',
    statusType: 'primary',
    brandColor: '#FF5E00',
    badges: [' Apple Pay', 'G Pay', 'BOG განვადება 0%', 'ტოკენიზაცია'],
  },
];
