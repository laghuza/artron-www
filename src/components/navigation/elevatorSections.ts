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
    label: { ka: '03 • Control Hub & IoT', en: '03 • Control Hub & IoT', ru: '03 • Control Hub и IoT' },
    aiPrompt: {
      ka: 'ვხედავ, ათვალიერებთ IoT ტურნიკეტებსა და შრომის ტაბელს. გნებავთ, აგიხსნათ ბრძანება №01-15/ნ-ის ავტომატური ექსპორტი?',
      en: 'Exploring IoT Turnstiles and Labor Compliance? Would you like details on automated Order №01-15/N export?',
      ru: 'Изучаете IoT турникеты и учет труда? Хотите узнать об автоматическом формировании табеля №01-15/Н?',
    },
  },
  {
    index: '04',
    id: 'analytics-showcase',
    label: { ka: '04 • AI ანალიტიკა & ROI', en: '04 • AI Analytics & ROI', ru: '04 • AI Аналитика и ROI' },
    aiPrompt: {
      ka: 'ვხედავ, ფინანსურ ეკონომიას ათვალიერებთ. გნებავთ, თქვენი დარბაზის წევრების მიხედვით დაგითვალოთ ზუსტი ROI?',
      en: 'Looking at financial gains? Would you like an instant ROI calculation based on your active members?',
      ru: 'Рассматриваете финансовую выгоду? Хотите рассчитать точный ROI для вашего спортклуба?',
    },
  },
  {
    index: '05',
    id: 'booking-engine',
    label: { ka: '05 • ტარიფები & დემო', en: '05 • Pricing & Booking', ru: '05 • Тарифы и запись' },
    aiPrompt: {
      ka: 'გსურთ გაიაროთ 15-წუთიანი ინდივიდუალური ონლაინ დემო-პრეზენტაცია თქვენი ობიექტის მენეჯერებისთვის?',
      en: 'Would you like to book a 15-minute live demo presentation tailored for your sports facility managers?',
      ru: 'Хотите забронировать 15-минутную онлайн демо-презентацию для руководства вашего комплекса?',
    },
  },
];
