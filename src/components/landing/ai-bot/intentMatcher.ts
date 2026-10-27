import { BotReply, SupportedLocale, SectionTopicId } from './types';
import { getSectionReply } from './sectionKnowledge';
import {
  getPricingReply,
  getOcrReply,
  getVoiceReply,
  getTurnstileReply,
  getLaborReply,
  getOfflineReply,
  getCompanyInfoReply,
  getOfftopicFallbackReply,
  getLeadBridgeActions,
} from './domainKnowledge';

const AFFIRMATIVE_KEYWORDS = [
  'დიახ', 'კი', 'კიი', 'მოყევი', 'გვითხარი', 'დეტალები', 'რა თქმა უნდა', 'გისმენთ',
  'მაინტერესებს', 'კარგი', 'ჰო', 'დეტალურად', 'მითხარი', 'გააგრძელე', 'მინდა',
  'yes', 'yeah', 'yep', 'sure', 'tell me', 'details', 'ok', 'okay', 'interested', 'more',
  'да', 'конечно', 'расскажи', 'давай', 'интересно', 'подробнее', 'детали', 'ок', 'хорошо'
];

export function isAffirmativeQuery(query: string): boolean {
  const clean = query.toLowerCase().trim();
  return AFFIRMATIVE_KEYWORDS.some((kw) => clean === kw || clean.startsWith(kw + ' ') || clean.endsWith(' ' + kw));
}

export function detectSectionFromPrompt(promptText: string): SectionTopicId | null {
  const p = promptText.toLowerCase();

  if (p.includes('პარტნიორი') || p.includes('ტექნოლოგიური ინტეგრაციები') || p.includes('партнеры') || p.includes('partner')) {
    return 'partner-ecosystem';
  }
  if (p.includes('ocr') || p.includes('ხმოვანი') || p.includes('ai ასისტენტი') || p.includes('smart assistant') || p.includes('умный ассистент')) {
    return 'ai-intelligence';
  }
  if (p.includes('qr საშვისთვის') || p.includes('მობილურ აპლიკაციას') || p.includes('b2c mobile app') || p.includes('спортсмены используют')) {
    return 'mobile-app';
  }
  if (p.includes('მართვის ცენტრს') || p.includes('control hub') || p.includes('центр управления') || p.includes('ტაბელს, ფინანსებს')) {
    return 'dashboard-features';
  }
  if (p.includes('dual-core') || p.includes('სინქრონულად') || p.includes('b2b მართვის პანელი') || p.includes('synchronize') || p.includes('синхронизируются')) {
    return 'ecosystem';
  }
  if (p.includes('სპორტულ სივრცეებს') || p.includes('ათლეტურ ოსტატობას') || p.includes('sports venues') || p.includes('спортивные залы')) {
    return 'pure-sports-mirror';
  }
  if (p.includes('დანერგვასთან') || p.includes('მიგრაციასთან') || p.includes('faq') || p.includes('questions regarding artron') || p.includes('внедрению')) {
    return 'faq';
  }

  return null;
}

export function matchQueryToReply(
  rawQuery: string,
  locale: SupportedLocale,
  lastBotPrompt?: string
): BotReply {
  const query = rawQuery.toLowerCase().trim();

  // 1. Contextual handling of affirmative answers ("დიახ", "კი", "მოყევი", etc.)
  if (isAffirmativeQuery(query) && lastBotPrompt) {
    const detectedSection = detectSectionFromPrompt(lastBotPrompt);
    if (detectedSection) {
      return getSectionReply(detectedSection, locale);
    }
    // If last prompt was generic welcome, explain the core ecosystem
    return getSectionReply('ecosystem', locale);
  }

  // 2. Pricing & Cost inquiries -> Explain Starter/Pro/Enterprise + Direct Sales actions
  const pricingKw = ['ტარიფ', 'ფას', 'ღირს', 'ღირებულება', 'გადასახად', 'პაკეტ', 'pricing', 'price', 'cost', 'fee', 'тариф', 'цен', 'стоимост', 'прайс'];
  if (pricingKw.some((kw) => query.includes(kw))) {
    return getPricingReply(locale);
  }

  // 3. Demo / Booking
  const demoKw = ['დემო', 'ჯავშან', 'პრეზენტაცია', 'demo', 'booking', 'демо', 'презентаци'];
  if (demoKw.some((kw) => query.includes(kw))) {
    if (locale === 'ka') {
      return {
        text: 'ჩვენთან არ არის საჭირო რთული დემო-ჯავშნის მოლოდინი. ჩვენი გუნდი მყისიერად გაგიწევთ პირად კონსულტაციას, დეტალურად გაგაცნობთ სისტემის შესაძლებლობებს და მოარგებს მას თქვენს ობიექტს:',
        actions: getLeadBridgeActions(locale),
      };
    }
    if (locale === 'ru') {
      return {
        text: 'Вам не нужно ждать демо-записи. Наши специалисты оперативно проконсультируют вас в WhatsApp или по телефону, подробно покажут систему и подберут решение для вашего клуба:',
        actions: getLeadBridgeActions(locale),
      };
    }
    return {
      text: 'No need to wait for a scheduled demo booking. Our team can connect with you immediately via WhatsApp or phone, walk you through system capabilities, and tailor the solution to your club:',
      actions: getLeadBridgeActions(locale),
    };
  }

  // 4. OCR / Vision
  const ocrKw = ['ocr', 'პირადობ', 'პასპორტ', 'სკანირებ', 'დოკუმენტ', 'passport', 'сканирован', 'паспорт'];
  if (ocrKw.some((kw) => query.includes(kw))) {
    return getOcrReply(locale);
  }

  // 5. Voice Assistant
  const voiceKw = ['ხმოვან', 'ხმით', 'კარნახ', 'voice', 'speech', 'stt', 'tts', 'голосов', 'диктовк'];
  if (voiceKw.some((kw) => query.includes(kw))) {
    return getVoiceReply(locale);
  }

  // 6. Turnstiles & Old hardware (Came, ZKTeco, Hikvision)
  const turnstileKw = ['ტურნიკეტ', 'სკანერ', 'მონტაჟ', 'came', 'zkteco', 'hikvision', 'აპარატურ', 'ინსტალაცია', 'turnstile', 'hardware', 'gate', 'турникет', 'монтаж'];
  if (turnstileKw.some((kw) => query.includes(kw))) {
    return getTurnstileReply(locale);
  }

  // 7. Labor Order №01-15/ნ
  const laborKw = ['01-15', 'შრომის', 'ტაბელ', 'ინსპექცია', 'ჯანდაცვ', 'საათებ', 'თანამშრომლ', 'მწვრთნელ', 'labor', 'timesheet', 'inspection', 'табель', 'приказ'];
  if (laborKw.some((kw) => query.includes(kw))) {
    return getLaborReply(locale);
  }

  // 8. Offline mode & Internet cut
  const offlineKw = ['offline', 'ოფლაინ', 'ინტერნეტ', 'გაითიშ', 'დენი', 'ავტონომ', 'офлайн', 'интернет', 'отключен'];
  if (offlineKw.some((kw) => query.includes(kw))) {
    return getOfflineReply(locale);
  }

  // 9. Partners & Venues
  const partnerKw = ['პარტნიორ', 'x area', 'flex', 'pixl', 'zona 15', 'athletic', 'corpus', 'ბაზაძ', 'კლუბ', 'partner', 'клуб', 'партнер'];
  if (partnerKw.some((kw) => query.includes(kw))) {
    return getSectionReply('partner-ecosystem', locale);
  }

  // 10. Banks & Payments
  const bankKw = ['გადახდ', 'ბანკ', 'bog', 'tbc', 'stripe', 'apple pay', 'google pay', 'ბარათ', 'payment', 'bank', 'оплат', 'банк'];
  if (bankKw.some((kw) => query.includes(kw))) {
    return getSectionReply('partner-ecosystem', locale);
  }

  // 11. B2C Mobile App & QR
  const mobileKw = ['აპლიკაცი', 'qr', 'საშვ', 'სკრინშოტ', 'მობილურ', 'ათლეტ', 'app', 'mobile', 'pass', 'приложен', 'пропуск', 'скриншот'];
  if (mobileKw.some((kw) => query.includes(kw))) {
    return getSectionReply('mobile-app', locale);
  }

  // 12. B2B Control Hub / Churn / Win-Back
  const crmKw = ['crm', 'სამართავ', 'პანელ', 'დაშბორდ', 'churn', 'win-back', 'ანალიტიკ', 'დაბრუნებ', 'გადინებ', 'dashboard', 'управлен', 'отток'];
  if (crmKw.some((kw) => query.includes(kw))) {
    return getSectionReply('dashboard-features', locale);
  }

  // 13. Security, GDPR & AES-256
  const secKw = ['უსაფრთხოებ', 'დაცვა', 'შიფრ', 'aes', 'gdpr', 'ტენანტ', 'security', 'privacy', 'encryption', 'безопасн', 'шифрован'];
  if (secKw.some((kw) => query.includes(kw))) {
    return getSectionReply('dashboard-features', locale);
  }

  // 14. 14-day refund
  const refundKw = ['თანხის დაბრუნება', '14 დღ', 'refund', 'возврат', '14 дн'];
  if (refundKw.some((kw) => query.includes(kw))) {
    return getSectionReply('faq', locale);
  }

  // 15. Onboarding & Excel Migration
  const onbKw = ['მიგრაცი', 'გადმოტან', 'ძველი ბაზა', 'ექსელ', 'excel', 'migration', 'миграция', 'внедрение'];
  if (onbKw.some((kw) => query.includes(kw))) {
    return getSectionReply('faq', locale);
  }

  // 16. Facility types (Gym, Pool, Tennis, Studio, Federation)
  const facKw = ['ვისთვის', 'აუზ', 'სტუდი', 'იოგა', 'პილატეს', 'სპორტკომპლექს', 'ფედერაცი', 'facilities', 'pool', 'бассейн', 'для кого'];
  if (facKw.some((kw) => query.includes(kw))) {
    return getSectionReply('pure-sports-mirror', locale);
  }

  // 17. Company identity & contacts
  const compKw = ['ვინ ხართ', 'კომპანია', 'მისამართ', 'ტელეფონ', 'კონტაქტ', 'შპს', 'company', 'address', 'contacts', 'контакт', 'адрес'];
  if (compKw.some((kw) => query.includes(kw))) {
    return getCompanyInfoReply(locale);
  }

  // 18. Greetings & AI identity
  const greetKw = ['გამარჯობა', 'სალამი', 'ვინ ხარ', 'რა შეგიძლია', 'hello', 'hi', 'hey', 'who are you', 'привет'];
  if (greetKw.some((kw) => query.includes(kw))) {
    if (locale === 'ka') {
      return {
        text: 'გამარჯობა! მე ვარ ARTRON AI — ართრონის სპორტული ეკოსისტემის ინტელექტუალური ასისტენტი. შემიძლია გაგაცნოთ IoT ტურნიკეტები, B2B მართვის პანელი, მობილური აპლიკაცია, OCR და ხმოვანი რეგისტრაცია, შრომის ტაბელი (№01-15/ნ) და პარტნიორები. რით შემიძლია დაგეხმაროთ?',
      };
    }
    if (locale === 'ru') {
      return {
        text: 'Здравствуйте! Я ARTRON AI — интеллектуальный ассистент экосистемы Artron. Могу рассказать об IoT-турникетах, B2B панели, мобильном приложении, OCR и голосовой регистрации, учете рабочего времени (№01-15/н) и партнерах. Чем могу помочь?',
      };
    }
    return {
      text: 'Hello! I am ARTRON AI — the intelligent assistant of the Artron sports ecosystem. I can guide you through IoT turnstiles, the B2B CRM dashboard, B2C Mobile App, OCR & voice onboarding, labor compliance (Order №01-15/n), and partner facilities. How may I assist you?',
    };
  }

  // 19. Truly unmapped / off-topic inquiry -> Polite deflection to live sales/engineers
  return getOfftopicFallbackReply(locale);
}
