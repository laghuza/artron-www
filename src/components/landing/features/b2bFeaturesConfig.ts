import React from 'react';
import { 
  Cpu, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  Coins, 
  Target, 
  BarChart3, 
  ShieldAlert, 
  Flame, 
  RotateCcw,
  CalendarDays,
  FileSpreadsheet,
  LucideIcon 
} from 'lucide-react';

export type B2BCategoryType = 'core' | 'analytics';

export interface B2BFeatureItem {
  id: string; // e.g. 'iot', 'booking', 'security', 'migration', 'roi', 'okr', 'kpi', 'churn', 'heatmap', 'winback'
  category: B2BCategoryType;
  badge: string;
  color: string;
  icon: LucideIcon;
  titleKey?: string;
  descKey?: string;
  titles: {
    ka: string;
    en: string;
    ru: string;
  };
  descriptions: {
    ka: string;
    en: string;
    ru: string;
  };
}

export const B2B_CORE_FEATURES: B2BFeatureItem[] = [
  {
    id: 'iot',
    category: 'core',
    badge: 'IoT Core',
    color: '#00ff87',
    icon: Cpu,
    titleKey: 'nav_features_hub',
    descKey: 'nav_features_hub_desc',
    titles: {
      ka: 'მართვის ცენტრი & IoT',
      en: 'Control Hub & IoT',
      ru: 'Центр управления & IoT'
    },
    descriptions: {
      ka: 'ტურნიკეტები, ათლეტთა ბაზა, №01-15/ნ',
      en: 'Turnstiles, athlete roster, Order №01-15/ნ',
      ru: 'Турникеты, база атлетов, Приказ №01-15/н'
    }
  },
  {
    id: 'booking',
    category: 'core',
    badge: 'Smart Schedule',
    color: '#00A3FF',
    icon: CalendarDays,
    titles: {
      ka: 'დაჯავშნები & განრიგის მართვა',
      en: 'Smart Booking & Schedules',
      ru: 'Бронирования и расписание'
    },
    descriptions: {
      ka: 'ჯგუფური, პერსონალური, ბილიკები, Overbooking ლიმიტი',
      en: 'Group classes, pool lanes, trainers, capacity limits',
      ru: 'Групповые, дорожки, тренеры, лимит переполнения'
    }
  },
  {
    id: 'security',
    category: 'core',
    badge: 'Zero-Fraud',
    color: '#00E5FF',
    icon: ShieldCheck,
    titleKey: 'nav_features_security',
    descKey: 'nav_features_security_desc',
    titles: {
      ka: 'კიბერდაცვა & ლოკალური მართვა',
      en: 'Zero-Fraud Cyber Defense',
      ru: 'Киберзащита и локальное управление'
    },
    descriptions: {
      ka: 'პირდაპირი საბანკო ნაკადები, მხოლოდ დარბაზიდან მართვა, AES-256',
      en: 'Direct bank flows, on-premise admin locks, AES-256',
      ru: 'Прямой банк, доступ только из зала, AES-256'
    }
  },
  {
    id: 'migration',
    category: 'core',
    badge: 'Zero-Downtime',
    color: '#10B981',
    icon: FileSpreadsheet,
    titles: {
      ka: 'ბაზის უმტკივნეულო მიგრაცია',
      en: 'Zero-Downtime Data Migration',
      ru: 'Бесшовный перенос базы'
    },
    descriptions: {
      ka: 'Excel/CSV/1C-დან 48 საათში, 0 დანაკარგი',
      en: 'From Excel/CSV/1C in 48 hours, 0 data loss',
      ru: 'Перенос из Excel/1C за 48 часов, без потерь'
    }
  }
];

export const B2B_ANALYTICS_FEATURES: B2BFeatureItem[] = [
  {
    id: 'roi',
    category: 'analytics',
    badge: 'ROI Matrix',
    color: '#00E5FF',
    icon: Coins,
    titles: {
      ka: 'ინვესტიციის ROI',
      en: 'Investment ROI Calculator',
      ru: 'Калькулятор окупаемости ROI'
    },
    descriptions: {
      ka: 'ფინანსური სიმულატორი, დაზოგილი ხარჯები',
      en: 'Financial simulator, operational labor savings',
      ru: 'Финансовый симулятор, экономия затрат'
    }
  },
  {
    id: 'okr',
    category: 'analytics',
    badge: 'Goal Hub',
    color: '#00A3FF',
    icon: Target,
    titles: {
      ka: 'მიზნები & OKR (Goal Hub)',
      en: 'Strategic Goals & OKR Hub',
      ru: 'Стратегические цели и OKR'
    },
    descriptions: {
      ka: 'სტრატეგიული KPI & მიზნები',
      en: 'Strategic facility KPIs & benchmark goals',
      ru: 'Стратегические KPI и ключевые цели'
    }
  },
  {
    id: 'kpi',
    category: 'analytics',
    badge: 'KPI Hub',
    color: '#38BDF8',
    icon: BarChart3,
    titles: {
      ka: 'KPI პანელი',
      en: 'Real-time KPI Dashboard',
      ru: 'Панель операционных KPI'
    },
    descriptions: {
      ka: 'საოპერაციო ჯანმრთელობის მეტრიკები',
      en: 'Operational health, net revenue & retention',
      ru: 'Метрики здоровья бизнеса, выручка и удержание'
    }
  },
  {
    id: 'churn',
    category: 'analytics',
    badge: 'AI Guard',
    color: '#F43F5E',
    icon: ShieldAlert,
    titles: {
      ka: 'გადინების პროგნოზი (AI Churn)',
      en: 'AI Churn Predictive Engine',
      ru: 'Прогноз оттока клиентов (AI Churn)'
    },
    descriptions: {
      ka: 'წევრთა შენარჩუნების პროგნოზირება',
      en: 'Drop-in frequency anomaly & automated prevention',
      ru: 'Прогнозирование удержания и превентивные офферы'
    }
  },
  {
    id: 'heatmap',
    category: 'analytics',
    badge: 'Capacity',
    color: '#F59E0B',
    icon: Flame,
    titles: {
      ka: 'პიკური საათების რუკა (Heatmap)',
      en: 'Peak Hours Load Heatmap',
      ru: 'Тепловая карта часов пик'
    },
    descriptions: {
      ka: 'დარბაზის დატვირთვის სითბური ანალიზი',
      en: 'Traffic density heat distribution & off-peak rates',
      ru: 'Анализ загрузки зала и непиковые тарифы'
    }
  },
  {
    id: 'winback',
    category: 'analytics',
    badge: 'Retention',
    color: '#10B981',
    icon: RotateCcw,
    titles: {
      ka: 'დაბრუნების ROI (Win-back)',
      en: 'Win-Back Analytics & ROI',
      ru: 'Аналитика возврата клиентов'
    },
    descriptions: {
      ka: 'პასიური წევრების დაბრუნების კამპანიები',
      en: 'Lapsed member automated reactivation sequences',
      ru: 'Автокампании реактивации ушедших клиентов'
    }
  }
];

export const ALL_B2B_FEATURES: B2BFeatureItem[] = [
  ...B2B_CORE_FEATURES,
  ...B2B_ANALYTICS_FEATURES
];
