import { 
  Cpu, 
  BarChart3, 
  Coins, 
  Target, 
  ShieldAlert, 
  Flame, 
  RotateCcw, 
  CalendarDays, 
  FileSpreadsheet, 
  ShieldCheck,
  LucideIcon 
} from 'lucide-react';

export interface SubMenuItem {
  href: string;
  tab: string;
  label: string;
  desc: string;
  icon: LucideIcon;
  badge: string;
  color: string;
}

export interface NavLinkItem {
  href: string;
  label: string;
  dropdown: 'none' | 'control';
}

export const CONTROL_PANEL_IDS = [
  '/#dashboard-features',
  '/#analytics-showcase',
  '/#enterprise-security',
  '/#staff-access-roles',
];

export function getControlPanelSubItems(locale: string, t: (k: string) => string): SubMenuItem[] {
  return [
    {
      href: '/#dashboard-features?tab=iot',
      tab: 'iot',
      label: t('nav_features_hub') || 'მართვის ცენტრი & IoT',
      desc: t('nav_features_hub_desc') || 'ტურნიკეტები, ათლეტთა ბაზა, №01-15/ნ',
      icon: Cpu,
      badge: 'IoT Core',
      color: '#00ff87',
    },
    {
      href: '/#dashboard-features?tab=booking',
      tab: 'booking',
      label: locale === 'ka' ? 'დაჯავშნები & განრიგის მართვა' : locale === 'ru' ? 'Бронирования и расписание' : 'Smart Booking & Schedules',
      desc: locale === 'ka' ? 'ჯგუფური, პერსონალური, ბილიკები, Overbooking ლიმიტი' : locale === 'ru' ? 'Групповые, дорожки, тренеры, лимиты' : 'Group classes, pool lanes, trainers, capacity limits',
      icon: CalendarDays,
      badge: 'Smart Schedule',
      color: '#00A3FF',
    },
    {
      href: '/#dashboard-features?tab=security',
      tab: 'security',
      label: t('nav_features_security') || 'კიბერდაცვა & ლოკალური მართვა',
      desc: t('nav_features_security_desc') || 'პირდაპირი საბანკო ნაკადები, მხოლოდ დარბაზიდან მართვა, AES-256',
      icon: ShieldCheck,
      badge: 'Zero-Fraud',
      color: '#00E5FF',
    },
    {
      href: '/#dashboard-features?tab=migration',
      tab: 'migration',
      label: locale === 'ka' ? 'მონაცემთა შეუფერხებელი მიგრაცია' : locale === 'ru' ? 'Бесшовный перенос базы' : 'Zero-Downtime Migration',
      desc: locale === 'ka' ? 'Excel/CSV/1C-დან 48 საათში, 0 დანაკარგი' : locale === 'ru' ? 'Перенос из Excel/1C за 48 часов' : 'From Excel/CSV/1C in 48h, 0 data loss',
      icon: FileSpreadsheet,
      badge: 'Zero-Downtime',
      color: '#10B981',
    },
  ];
}

export function getAnalyticsSubItems(locale: string, _t: (k: string) => string): SubMenuItem[] {
  return [
    {
      href: '/#dashboard-features?tab=roi',
      tab: 'roi',
      label: locale === 'ka' ? 'ინვესტიციის ROI' : locale === 'ru' ? 'Калькулятор ROI' : 'Investment ROI',
      desc: locale === 'ka' ? 'ფინანსური სიმულატორი, დაზოგილი ხარჯები' : locale === 'ru' ? 'Финансовый симулятор, экономия' : 'Financial return & labor savings',
      icon: Coins,
      badge: 'ROI Matrix',
      color: '#00E5FF',
    },
    {
      href: '/#dashboard-features?tab=okr',
      tab: 'okr',
      label: locale === 'ka' ? 'მიზნები & OKR (Goal Hub)' : locale === 'ru' ? 'Цели и OKR (Goal Hub)' : 'Goals & OKR Hub',
      desc: locale === 'ka' ? 'სტრატეგიული KPI & მიზნები' : locale === 'ru' ? 'Стратегические KPI и цели' : 'Strategic KPIs & progress tracking',
      icon: Target,
      badge: 'Goal Hub',
      color: '#00A3FF',
    },
    {
      href: '/#dashboard-features?tab=kpi',
      tab: 'kpi',
      label: locale === 'ka' ? 'KPI პანელი' : locale === 'ru' ? 'Панель KPI' : 'KPI Dashboard',
      desc: locale === 'ka' ? 'საოპერაციო ჯანმრთელობის მეტრიკები' : locale === 'ru' ? 'Операционные метрики' : 'Real-time operational health',
      icon: BarChart3,
      badge: 'KPI Hub',
      color: '#38BDF8',
    },
    {
      href: '/#dashboard-features?tab=churn',
      tab: 'churn',
      label: locale === 'ka' ? 'გადინების პროგნოზი (AI Churn)' : locale === 'ru' ? 'Прогноз оттока (AI Churn)' : 'AI Churn Prediction',
      desc: locale === 'ka' ? 'წევრთა შენარჩუნების პროგნოზირება' : locale === 'ru' ? 'Прогнозирование удержания' : 'Predictive member retention',
      icon: ShieldAlert,
      badge: 'AI Guard',
      color: '#F43F5E',
    },
    {
      href: '/#dashboard-features?tab=heatmap',
      tab: 'heatmap',
      label: locale === 'ka' ? 'პიკური საათების რუკა (Heatmap)' : locale === 'ru' ? 'Тепловая карта часов (Heatmap)' : 'Peak Hours Heatmap',
      desc: locale === 'ka' ? 'დარბაზის დატვირთვის სითბური ანალიზი' : locale === 'ru' ? 'Тепловой анализ загрузки зала' : 'Gym load distribution & off-peak',
      icon: Flame,
      badge: 'Capacity',
      color: '#F59E0B',
    },
    {
      href: '/#dashboard-features?tab=winback',
      tab: 'winback',
      label: locale === 'ka' ? 'წევრების დაბრუნება (Win-back)' : locale === 'ru' ? 'Возврат клиентов (Win-back)' : 'Win-Back Analytics',
      desc: locale === 'ka' ? 'პასიური წევრების დაბრუნების კამპანიები' : locale === 'ru' ? 'Кампании по возврату пассивных членов' : 'Lapsed member reactivation ROI',
      icon: RotateCcw,
      badge: 'Retention',
      color: '#10B981',
    },
  ];
}

export function getNavLinks(locale: string, t: (k: string) => string): NavLinkItem[] {
  return [
    { href: '/#pure-sports-mirror', label: t('nav_mirror') || (locale === 'ka' ? 'ინფრასტრუქტურა' : locale === 'ru' ? 'Инфраструктура' : 'Infrastructure'), dropdown: 'none' },
    { href: '/#ecosystem',          label: t('nav_sync') || (locale === 'ka' ? 'ეკოსისტემა' : locale === 'ru' ? 'Экосистема' : 'Ecosystem'), dropdown: 'none' },
    { href: '/#dashboard-features', label: t('nav_control_panel') || (locale === 'ka' ? 'მართვის ცენტრი' : locale === 'ru' ? 'Центр управления' : 'Control Hub'),  dropdown: 'control' },
    { href: '/#mobile-app',         label: t('nav_athlete_freedom') || (locale === 'ka' ? 'მობილური აპი' : locale === 'ru' ? 'Мобильное приложение' : 'Mobile App'), dropdown: 'none' },
    { href: '/#ai-intelligence',    label: t('nav_ai') || (locale === 'ka' ? 'AI ასისტენტი' : locale === 'ru' ? 'AI Ассистент' : 'AI Assistant'), dropdown: 'none' },
    { href: '/#partner-ecosystem',  label: t('nav_partners'),  dropdown: 'none' },
    { href: '/#faq',                label: t('nav_faq'),       dropdown: 'none' },
    { href: '/about',               label: t('nav_about'),     dropdown: 'none' },
  ];
}
