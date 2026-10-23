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
  regionName?: string;
  regionCity?: string;
  logoSrc?: string;
  url?: string;
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

const createLogoBadge = (logoSrc: string, alt: string, borderColor = '#00A3FF', isContained = false, fallbackInitials?: string) =>
  React.createElement(
    'div',
    { className: `w-12 h-12 rounded-full ${isContained ? 'bg-white p-1' : 'bg-[#05070a]'} border-2 border-white/20 flex items-center justify-center relative shadow-lg shrink-0 overflow-hidden` },
    React.createElement('div', { className: "w-2.5 h-2.5 rounded-full bg-emerald-400 absolute -bottom-0.5 -right-0.5 border-2 border-[#0B0F17] animate-pulse z-10" }),
    React.createElement('img', {
      src: logoSrc,
      alt,
      className: `w-full h-full ${isContained ? 'object-contain' : 'object-cover'}`,
      onError: (e: React.SyntheticEvent<HTMLImageElement>) => {
        const target = e.currentTarget;
        target.style.display = 'none';
        const parent = target.parentElement;
        if (parent) {
          const fallback = parent.querySelector('.logo-fallback') as HTMLElement;
          if (fallback) fallback.style.display = 'flex';
        }
      }
    }),
    React.createElement(
      'span',
      {
        className: 'logo-fallback hidden absolute inset-0 items-center justify-center text-[10px] font-black tracking-tight select-none uppercase px-1 text-center',
        style: { color: borderColor }
      },
      fallbackInitials || alt.split(' ').map(w => w[0]).join('').slice(0, 3)
    )
  );


export const gymClients: GymClient[] = [
  {
    id: 'x-area',
    name: 'X AREA FITNESS',
    subtitleKa: 'პრემიუმ ფიტნეს სივრცე',
    subtitleEn: 'Premium Fitness Space',
    subtitleRu: 'Премиум фитнес-пространство',
    followers: '11,000+',
    tags: ['IoT ტურნიკეტები', 'CRM პანელი', 'QR დაშვება', 'აბონემენტები'],
    descKa: 'სრულად ავტომატიზებული ტურნიკეტებით, QR დაშვებითა და ცენტრალური CRM სამართავი პანელით.',
    descEn: 'Fully automated turnstile access, dynamic QR pass, and unified central CRM control panel.',
    descRu: 'Полная автоматизация турникетов, динамические QR-пропуска и единая CRM панель.',
    brandColor: '#CCFF00',
    regionName: 'იმერეთი',
    regionCity: 'ქუთაისი',
    logoSrc: '/logo/client logo/x-area-fitness.jpg',
    url: 'https://www.facebook.com/GymXarea/',
    badge: createLogoBadge('/logo/client logo/x-area-fitness.jpg', 'X AREA FITNESS', '#CCFF00'),
  },
  {
    id: 'flex-fitness',
    name: 'FLEX FITNESS',
    subtitleKa: 'ძალისმიერი & ფუნქციური დარბაზი',
    subtitleEn: 'Strength & Functional Gym',
    subtitleRu: 'Силовой и функциональный зал',
    followers: '3,000+',
    tags: ['ბრძანება №01-15/ნ', 'მწვრთნელები', 'ვიზიტების ისტორია', 'ფინანსები'],
    descKa: 'მწვრთნელების მართვა, შრომის აღრიცხვა ბრძანება №01-15/ნ-ით და წევრების ვიზიტების ტელემეტრია.',
    descEn: 'Trainer management, labor time-tracking under Order №01-15/N, and member attendance telemetry.',
    descRu: 'Управление тренерами, учет рабочего времени по Приказу №01-15/н и телеметрия визитов.',
    brandColor: '#00D2FF',
    regionName: 'იმერეთი',
    regionCity: 'ქუთაისი',
    logoSrc: '/logo/client logo/flex-fitness.jpg',
    url: 'https://www.facebook.com/p/Flex-Fitness-61575290080789/',
    badge: createLogoBadge('/logo/client logo/flex-fitness.jpg', 'FLEX FITNESS', '#00D2FF'),
  },
  {
    id: 'pixl-fitness',
    name: 'PIXL FITNESS',
    subtitleKa: 'პიქსელ ფიტნესი • ინოვაციური კლუბი',
    subtitleEn: 'PIXL Fitness • Innovative Club',
    subtitleRu: 'Пиксель Фитнес • Инновационный клуб',
    followers: '2,800+',
    tags: ['ონლაინ გაყიდვები', 'მომხმარებელთა ბაზა', 'შემოსავლების ანალიტიკა'],
    descKa: 'ავტომატური გაყიდვების მოდული, მომხმარებელთა ნაკადის მართვა და ფინანსური რეპორტინგი.',
    descEn: 'Automated sales engine, customer flow management, and real-time revenue analytics.',
    descRu: 'Модуль автоматических продаж, управление потоком клиентов и финансовая аналитика.',
    brandColor: '#FF4D4D',
    regionName: 'იმერეთი',
    regionCity: 'ქუთაისი',
    logoSrc: '/logo/client logo/pixl-fitness.jpg',
    url: 'https://www.facebook.com/p/PIXL-Fitness-%E1%83%9E%E1%83%98%E1%83%A5%E1%83%A1%E1%83%94%E1%83%9A-%E1%83%A4%E1%83%98%E1%83%A2%E1%83%9C%E1%83%94%E1%83%A1%E1%83%98-61582333325219/',
    badge: createLogoBadge('/logo/client logo/pixl-fitness.jpg', 'PIXL FITNESS', '#FF4D4D'),
  },
  {
    id: 'fitness-zona-15',
    name: 'FITNESS ZONA 15',
    subtitleKa: 'ფიტნეს ზონა 15 · სპორტული დარბაზი',
    subtitleEn: 'Fitness Zone 15 · Sports Gym',
    subtitleRu: 'Фитнес Зона 15 · Спортивный зал',
    followers: '1,400+',
    tags: ['IoT ტურნიკეტები', 'სპორტული დარბაზი', 'CRM', 'QR დაშვება'],
    descKa: 'სრული ავტომატიზაცია, წევრების ბაზა და QR დაშვების სისტემა.',
    descEn: 'Full facility automation, member database, and QR access control.',
    descRu: 'Полная автоматизация зала, база клиентов и QR контроль доступа.',
    brandColor: '#22C55E',
    regionName: 'იმერეთი',
    regionCity: 'თერჯოლა',
    logoSrc: '/logo/client logo/fitness-zona-15.jpg',
    url: 'https://www.facebook.com/p/Fitness-Zona-15-%E1%83%A4%E1%83%98%E1%83%A2%E1%83%9C%E1%83%94%E1%83%A1-%E1%83%96%E1%83%9D%E1%83%9C%E1%83%90-15-61590491499705/',
    badge: createLogoBadge('/logo/client logo/fitness-zona-15.jpg', 'FITNESS ZONA 15', '#22C55E'),
  },
  {
    id: 'athletic-kutaisi',
    name: 'ATHLETIC FITNESS',
    subtitleKa: 'ფიტნეს კლუბი & დარბაზი',
    subtitleEn: 'Fitness Club & Gym',
    subtitleRu: 'Фитнес-клуб и тренажерный зал',
    followers: '840+',
    tags: ['IoT ტურნიკეტები', 'ქუთაისი', 'ფიტნეს ცენტრი', 'QR დაშვება'],
    descKa: 'სრული ავტომატიზაცია, წევრების ვიზიტების აღრიცხვა და QR კოდით დაშვების სისტემა.',
    descEn: 'Full facility automation, member visit tracking, and smart QR access control.',
    descRu: 'Полная автоматизация, учет посещений и система доступа по QR-коду.',
    brandColor: '#FF9900',
    regionName: 'იმერეთი',
    regionCity: 'ქუთაისი',
    logoSrc: '/logo/client logo/athletic-fitness.jpg',
    url: 'https://www.facebook.com/p/Athletic%E1%83%90%E1%83%97%E1%83%9A%E1%83%94%E1%83%A2%E1%83%98%E1%83%99%E1%83%98-61582720707292/',
    badge: createLogoBadge('/logo/client logo/athletic-fitness.jpg', 'ATHLETIC FITNESS', '#FF9900'),
  },
  {
    id: 'bazadze-fencing',
    name: 'ბაზაძის ფარიკაობის აკადემია',
    subtitleKa: 'ჩემპიონთა აკადემია · Bazadze Fencing Academy',
    subtitleEn: 'Champions Academy · Bazadze Fencing Academy',
    subtitleRu: 'Академия фехтования Базадзе',
    followers: '—',
    tags: ['ფარიკაობის აკადემია', 'CRM პანელი', 'სპორტსმენები', 'IoT ტურნიკეტები'],
    descKa: 'მ. ბაზაძის სახელობის ჩემპიონთა ფარიკაობის აკადემიის ცენტრალიზებული სპორტსმენთა მართვა და IoT წვდომის კონტროლი.',
    descEn: 'Centralized athlete management and IoT access control for Bazadze Fencing Academy.',
    descRu: 'Централизованное управление спортсменами и IoT контроль доступа для Академии фехтования Базадзе.',
    brandColor: '#1E3A5F',
    regionName: 'თბილისი',
    regionCity: 'თბილისი',
    logoSrc: '/logo/client logo/bazadze-fencing-academy.png',
    url: 'https://www.facebook.com/georgianfencing/',
    badge: createLogoBadge('/logo/client logo/bazadze-fencing-academy.png', 'ბაზაძის ფარიკაობის აკადემია', '#1E3A5F', true),
  },
  {
    id: 'corpus-fitness',
    name: 'Corpus Fitness Centre',
    subtitleKa: 'მოძრაობისა & რეაბილიტაციის სივრცე',
    subtitleEn: 'Movement & Recovery Centre',
    subtitleRu: 'Центр движения и реабилитации',
    followers: '1,200+',
    tags: ['რეაბილიტაცია', 'მოძრაობის თერაპია', 'CRM პანელი', 'IoT ტურნიკეტები'],
    descKa: 'სწორი მოძრაობის მექანიკა, რეაბილიტაცია, პილატესი და წევრების პერსონალური აღრიცხვა ართრონის პლატფორმით.',
    descEn: 'Posture alignment, functional rehabilitation, Pilates and personalized member tracking via Artron.',
    descRu: 'Механика движения, реабилитация, пилатес и персонализированный учет клиентов на платформе Artron.',
    brandColor: '#38BDF8',
    regionName: 'თბილისი',
    regionCity: 'თბილისი',
    logoSrc: '/logo/client logo/corpus-fitness-centre.jpg',
    url: 'https://www.facebook.com/p/Corpus-Fitness-Centre-61572591784418/?locale=ka_GE',
    badge: createLogoBadge('/logo/client logo/corpus-fitness-centre.jpg', 'Corpus Fitness Centre', '#38BDF8'),
  },
];

export const hardwarePartners: Partner[] = [
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
