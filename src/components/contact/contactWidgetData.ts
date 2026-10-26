import { CONTACT_CONFIG } from '@/config/contact';

export const CONTACT_SHEET_LABELS = {
  ka: {
    title: 'სწრაფი კომუნიკაცია',
    subtitle: 'დაუკავშირდით Artron-ის გუნდს 1 შეხებით',
    aiBot: 'AI ასისტენტი',
    aiBotDesc: '24/7 ონლაინ კონსულტაცია და პასუხები',
    aiStatus: 'ონლაინ',
    telegram: 'Telegram',
    telegramDesc: 'პირდაპირი ჩატი მხარდაჭერასთან',
    whatsapp: 'WhatsApp',
    whatsappDesc: 'მომენტალური მესენჯერი',
    phone: 'სატელეფონო ზარი',
    phoneDesc: CONTACT_CONFIG.phone.display,
    close: 'დახურვა',
  },
  en: {
    title: 'Quick Communication',
    subtitle: 'Connect with Artron team in 1 tap',
    aiBot: 'AI Assistant',
    aiBotDesc: '24/7 smart AI agent & instant answers',
    aiStatus: 'LIVE',
    telegram: 'Telegram',
    telegramDesc: 'Direct support chat',
    whatsapp: 'WhatsApp',
    whatsappDesc: 'Instant messenger',
    phone: 'Phone Call',
    phoneDesc: CONTACT_CONFIG.phone.display,
    close: 'Close',
  },
  ru: {
    title: 'Быстрая связь',
    subtitle: 'Свяжитесь с командой Artron в 1 касание',
    aiBot: 'AI Ассистент',
    aiBotDesc: '24/7 умный ассистент и ответы',
    aiStatus: 'ОНЛАЙН',
    telegram: 'Telegram',
    telegramDesc: 'Прямой чат с поддержкой',
    whatsapp: 'WhatsApp',
    whatsappDesc: 'Мгновенный мессенджер',
    phone: 'Телефонный звонок',
    phoneDesc: CONTACT_CONFIG.phone.display,
    close: 'Закрыть',
  },
} as const;

export type ContactLocale = keyof typeof CONTACT_SHEET_LABELS;
