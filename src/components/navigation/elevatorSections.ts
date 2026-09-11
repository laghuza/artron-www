export interface SectionNode {
  index: string;
  id: string;
  label: { ka: string; en: string; ru: string };
  aiPrompt: { ka: string; en: string; ru: string };
}

export const SECTION_NODES: SectionNode[] = [
  {
    index: '01',
    id: 'pure-sports-mirror',
    label: { ka: '01 • სისტემური სარკე', en: '01 • Systemic Mirror', ru: '01 • Системное зеркало' },
    aiPrompt: {
      ka: 'გამარჯობა! გაინტერესებთ, როგორ ახდენს ართრონის სარკე წევრებისა და სპორტული დარბაზის მონაცემების სრულ ანალიზს?',
      en: 'Hello! Would you like to know how Artron Mirror performs complete sports facility and member analytics?',
      ru: 'Здравствуйте! Хотите узнать, как Artron Mirror анализирует данные спорткомплекса и членов клуба?',
    },
  },
  {
    index: '02',
    id: 'ecosystem',
    label: { ka: '02 • Dual-Core ეკოსისტემა', en: '02 • Dual-Core Ecosystem', ru: '02 • Dual-Core Экосистема' },
    aiPrompt: {
      ka: 'გამარჯობა! გაინტერესებთ, როგორ მუშაობს B2B მართვის პანელი და B2C მობილური აპლიკაცია რეალურ დროში სინქრონულად?',
      en: 'Hello! Interested in how the B2B Dashboard and B2C Mobile App synchronize in real-time?',
      ru: 'Здравствуйте! Интересует, как панель B2B и мобильное приложение B2C синхронизируются в реальном времени?',
    },
  },
  {
    index: '03',
    id: 'dashboard-features',
    label: { ka: '03 • B2B Control Hub', en: '03 • B2B Control Hub', ru: '03 • B2B Control Hub' },
    aiPrompt: {
      ka: 'ვხედავ, B2B მართვის პანელს ათვალიერებთ: IoT ტურნიკეტებს, შრომის ტაბელს, ფინანსებს, AI-სა და თავდაცვას. გსურთ დეტალები?',
      en: 'Exploring the B2B Control Hub: IoT access, labor timesheets, finance & ROI, AI, and defense. Want details?',
      ru: 'Изучаете B2B Control Hub: IoT турникеты, табель труда, финансы и ROI, AI и защиту. Хотите подробнее?',
    },
  },
  {
    index: '04',
    id: 'mobile-app',
    label: { ka: '04 • B2C აპლიკაცია', en: '04 • B2C Mobile App', ru: '04 • B2C Приложение' },
    aiPrompt: {
      ka: 'გაინტერესებთ, როგორ იყენებენ ათლეტები მობილურ აპლიკაციას QR საშვისთვის, აბონემენტის განახლებისთვის და ვარჯიშებისთვის?',
      en: 'Interested in how athletes use the mobile app for instant QR entry, pass renewals, and workout tracking?',
      ru: 'Интересует, как спортсмены используют мобильное приложение для QR-пропуска, продления абонементов и тренировок?',
    },
  },
  {
    index: '05',
    id: 'ai-intelligence',
    label: { ka: '05 • AI ასისტენტი & ავტომატიზაცია', en: '05 • AI Assistant & Automation', ru: '05 • AI Ассистент и автоматизация' },
    aiPrompt: {
      ka: 'გაინტერესებთ, როგორ ეხმარება AI ასისტენტი სპორტდარბაზის მენეჯერს 5-წამიანი OCR რეგისტრაციით, ქართული ხმოვანი ბრძანებებითა და გადინების პრევენციით?',
      en: 'Interested in how the Smart Assistant empowers gym managers with 5-second OCR onboarding, voice commands, and churn prevention?',
      ru: 'Интересует, как Smart-ассистент помогает управляющему спорткомплексом за счет 5-секундной OCR регистрации, голосовых команд и контроля оттока?',
    },
  },
  {
    index: '06',
    id: 'pricing',
    label: { ka: '06 • ტარიფები & პაკეტები', en: '06 • Pricing & Plans', ru: '06 • Тарифы и пакеты' },
    aiPrompt: {
      ka: 'გსურთ გაეცნოთ ართრონის სატარიფო პაკეტებს ან გაიაროთ 15-წუთიანი ინდივიდუალური ონლაინ დემო-პრეზენტაცია?',
      en: 'Would you like to explore Artron pricing tiers or book a 15-minute live demo presentation for your facility?',
      ru: 'Хотите ознакомиться с тарифами Artron или забронировать 15-минутную демо-презентацию для вашего комплекса?',
    },
  },
];
