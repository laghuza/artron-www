export type FaqCategory = 'all' | 'b2b' | 'b2c';
export type FaqTopic = 'turnstile' | 'shield' | 'card';
export type FaqVis = 'turnstile' | 'vault' | 'badge' | 'cloud' | 'wallet' | 'qr' | 'hub' | 'bridge';

export interface FaqItemConfig {
  id: number;
  cat: 'b2b' | 'b2c' | 'hybrid';
}

export const FAQ_ITEMS_CONFIG: FaqItemConfig[] = [
  { id: 1, cat: 'b2b' },
  { id: 2, cat: 'b2b' },
  { id: 3, cat: 'b2b' },
  { id: 4, cat: 'b2b' },
  { id: 8, cat: 'b2b' },
  { id: 5, cat: 'b2c' },
  { id: 6, cat: 'b2c' },
  { id: 7, cat: 'hybrid' },
];

export const TOPIC_MAP: Record<number, FaqTopic> = {
  1: 'turnstile',
  2: 'shield',
  3: 'shield',
  4: 'shield',
  5: 'card',
  6: 'card',
  7: 'turnstile',
  8: 'turnstile',
};

export const VIS_MAP: Record<number, FaqVis> = {
  1: 'turnstile',
  2: 'vault',
  3: 'badge',
  4: 'cloud',
  5: 'wallet',
  6: 'qr',
  7: 'hub',
  8: 'bridge',
};

export const QC_COLORS: Record<number, string> = {
  1: '#5cc8ff',
  2: '#a88bff',
  3: '#f7cf5e',
  4: '#6f9dff',
  5: '#3fe4a4',
  6: '#ff72d2',
  7: '#ff9a5e',
  8: '#c6f25e',
};

export const hexToRgba = (hex: string, alpha: number): string => {
  const n = parseInt(hex.slice(1), 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return `rgba(${r},${g},${b},${alpha})`;
};

export const FAQ_CONSOLE_UI = {
  ka: {
    eyebrow: 'ხშირად დასმული კითხვები',
    title: 'პასუხები, სანამ კითხვას დასვამთ',
    all: 'ყველა',
    b2b: 'დარბაზებისთვის',
    b2c: 'სპორტსმენებისთვის',
    basis: 'საფუძველი',
    ctaTitle: 'ვერ იპოვეთ პასუხი?',
    ctaSub: 'მიიღეთ პასუხი 5 წუთში',
    ctaBtn: 'პირდაპირი კავშირი',
    drag: 'გადაატრიალეთ',
    nav: 'ნავიგაცია',
    pick: 'არჩევა',
    copy: 'ბმულის კოპირება',
    copied: 'ბმული დაკოპირდა',
    helpful: 'გამოგადგათ პასუხი?',
    thanks: 'მადლობა შეფასებისთვის',
    slaLabel: 'სისტემის სტატუსი:',
    sla: '99.98% ხელმისაწვდომობა (SLA)',
    topics: {
      turnstile: 'IoT და ტურნიკეტები',
      shield: 'მონაცემთა უსაფრთხოება და კანონი',
      card: 'QR საშვი და წვდომა',
    },
  },
  en: {
    eyebrow: 'Frequently asked questions',
    title: 'Answers before you have to ask',
    all: 'All',
    b2b: 'For Gyms',
    b2c: 'For Athletes',
    basis: 'Basis',
    ctaTitle: "Didn't find your answer?",
    ctaSub: 'Get a reply within 5 minutes',
    ctaBtn: 'Direct contact',
    drag: 'Drag to rotate',
    nav: 'Navigate',
    pick: 'Select',
    copy: 'Copy link',
    copied: 'Link copied',
    helpful: 'Was this helpful?',
    thanks: 'Thanks for your feedback',
    slaLabel: 'System status:',
    sla: '99.98% uptime (SLA)',
    topics: {
      turnstile: 'IoT & Turnstiles',
      shield: 'Data Security & Legal',
      card: 'QR Pass & Access',
    },
  },
  ru: {
    eyebrow: 'Частые вопросы',
    title: 'Ответы до того, как вы спросите',
    all: 'Все',
    b2b: 'Для залов',
    b2c: 'Для спортсменов',
    basis: 'Основание',
    ctaTitle: 'Не нашли ответ?',
    ctaSub: 'Ответим в течение 5 минут',
    ctaBtn: 'Прямая связь',
    drag: 'Потяните, чтобы повернуть',
    nav: 'Навигация',
    pick: 'Выбор',
    copy: 'Скопировать ссылку',
    copied: 'Ссылка скопирована',
    helpful: 'Ответ был полезен?',
    thanks: 'Спасибо за оценку',
    slaLabel: 'Статус системы:',
    sla: '99.98% доступности (SLA)',
    topics: {
      turnstile: 'IoT и турникеты',
      shield: 'Безопасность данных и право',
      card: 'QR-пропуск и доступ',
    },
  },
};
