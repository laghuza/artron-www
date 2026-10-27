import { BotReply, SupportedLocale, SectionTopicId } from './types';

export const SECTION_REPLIES: Record<SectionTopicId, Record<SupportedLocale, string>> = {
  'pure-sports-mirror': {
    ka: `ართრონის სპორტული ინფრასტრუქტურის მოდული აერთიანებს 5 ძირითად სპორტულ სივრცეს:
1. ათლეტური ჰაბები & სატრენაჟორო დარბაზები — გამტარუნარიანობისა და აღჭურვილობის მართვა;
2. ოლიმპიური აუზები — საცურაო ბილიკების დატვირთვისა და ტენიანობის რეჟიმების კონტროლი;
3. ჩოგბურთი & პადელი — კორტების ავტომატური დაჯავშნა და განათების ინტეგრაცია;
4. საბრძოლო დარბაზები & რინგები — მებრძოლთა რინგ-ტაიმერები და წონითი კატეგორიები;
5. მრავალფუნქციური არენები — ჯგუფური ვარჯიშები და ტურნირების მართვა.

ყველა ზონა აღჭურვილია RFID/ბიომეტრიული სკანერებით და 100%-ით აკმაყოფილებს შრომისა და უსაფრთხოების სტანდარტებს.`,
    en: `Artron's sports infrastructure framework encompasses 5 primary facility disciplines:
1. Athletic Hubs & Gyms — Capacity tracking and equipment load distribution;
2. Olympic Pools — Swim lane occupancy and humidity environment controls;
3. Tennis & Padel — Automated court reservations and dynamic lighting sync;
4. Combat Gyms & Rings — Ring timers and fighter weight class management;
5. Multi-Sport Arenas — Group workouts, tournaments, and federation leagues.

Every zone integrates RFID/biometric readers and meets labor compliance regulations.`,
    ru: `Модуль спортивной инфраструктуры Artron объединяет 5 ключевых спортивных направлений:
1. Атлетические хабы и тренажерные залы — контроль пропускной способности и инвентаря;
2. Олимпийские бассейны — учет загрузки дорожек и мониторинг микроклимата;
3. Теннис и падел — автоматическое бронирование кортов и синхронизация света;
4. Залы единоборств и ринги — таймеры ринга и весовые категории бойцов;
5. Многофункциональные арены — групповые тренировки и турнирная сетка.

Все зоны оснащены RFID/биометрическими сканерами и полностью соответствуют нормам трудового учета.`
  },

  'ecosystem': {
    ka: `ართრონის Dual-Core ეკოსისტემა მოიცავს ორ ურთიერთდაკავშირებულ ბირთვს, რომლებიც რეალურ დროში მუშაობენ:

• B2B სამართავი პანელი (Web) — მფლობელებისთვის, მენეჯერებისთვის, ბუღალტრებისა და მწვრთნელებისთვის. უზრუნველყოფს ტურნიკეტების მონიტორინგს, ფინანსურ რეპორტინგს, შრომის ტაბელს (№01-15/ნ) და Churn ანალიტიკას.
• B2C მობილური აპლიკაცია (iOS/Android) — ათლეტებისთვის. 15-წამიანი დინამიური QR საშვი, 1 კლიკით აბონემენტის ყიდვა/განახლება 14-დღიანი დაბრუნებით, განრიგი და შედეგების ისტორია.

ტურნიკეტზე წევრის ყოველი გავლა მომენტალურად (ნულოვანი დაყოვნებით) აისახება სამართავ პანელში.`,
    en: `Artron's Dual-Core ecosystem operates across two synchronized real-time pillars:

• B2B Web Control Hub — For owners, club managers, accountants, and trainers. Provides live turnstile telemetry, financial analytics, labor timesheets (Order №01-15/n), and AI Churn metrics.
• B2C Mobile App (iOS/Android) — For members and athletes. Features 15-second dynamic QR passes, 1-click subscription renewals with 14-day statutory refunds, class bookings, and progress tracking.

Every turnstile entry synchronizes with zero latency between the mobile pass and admin dashboard.`,
    ru: `Экосистема Dual-Core от Artron состоит из двух синхронизированных в реальном времени ядер:

• B2B Веб-панель управления — для владельцев, управляющих, бухгалтеров и тренеров. Обеспечивает мониторинг турникетов, финансовую отчетность, табель учета труда (№01-15/н) и аналитику оттока.
• B2C Мобильное приложение (iOS/Android) — для спортсменов. Включает 15-секундный динамический QR-пропуск, покупку/продление карт в 1 клик с гарантией возврата 14 дней и историю тренировок.

Каждый проход через турникет мгновенно и без задержек отображается в панели управления.`
  },

  'dashboard-features': {
    ka: `B2B მართვის ცენტრი აერთიანებს სპორტული ობიექტის 5 უმნიშვნელოვანეს ფუნქციას:

1. IoT ტურნიკეტების კონტროლი — დისტანციური გაღება, ბლოკირება, 95%+ თავსებადობა არსებულ აპარატურასთან (Came, ZKTeco, Hikvision);
2. შრომის აღრიცხვის ტაბელი (ბრძანება №01-15/ნ) — პერსონალის შესვლა-გასვლის ავტომატური აღრიცხვა და Excel/PDF ექსპორტი შრომის ინსპექციისთვის;
3. ფინანსური მოდული & ROI — აბონემენტების გაყიდვები, ფიტნეს-ბარი, რეპორტები და პერსონალური მწვრთნელების საკომისიოები;
4. Churn Prediction & Win-Back — AI პროგნოზირებს წევრის წასვლას 15–30 დღით ადრე და GoSMS-ით უგზავნის სამოტივაციო შეთავაზებებს (აბრუნებს 15–25%-ს);
5. უსაფრთხოების ციტადელი — Multi-Tenant იზოლაცია (RLS), პირადი ნომრების AES-256-GCM დაშიფვრა და GDPR სტანდარტები.`,
    en: `The B2B Control Hub consolidates 5 vital fitness management capabilities:

1. IoT Turnstile Control — Remote gate trigger, override, and 95%+ compatibility with existing gates (Came, ZKTeco, Hikvision);
2. Official Labor Timesheets (Order №01-15/n) — Automated turnstile-driven employee time logging and ready inspection export;
3. Finance & ROI Analytics — Subscriptions, retail/bar sales, trainer commissions, and cash-flow reporting;
4. Churn Prediction & Win-Back — Machine learning flags at-risk members 15–30 days early and automates GoSMS reactivation (recovers 15–25%);
5. Enterprise Security — Strict Multi-Tenant isolation (RLS), AES-256-GCM encryption for national IDs, and GDPR compliance.`,
    ru: `Панель управления B2B объединяет 5 ключевых возможностей спортивного менеджмента:

1. Управление IoT-турникетами — удаленное открытие, блокировка и совместимость 95%+ с Came, ZKTeco, Hikvision;
2. Официальный табель рабочего времени (Приказ №01-15/н) — автоматический учет смен сотрудников по турникету без штрафов инспекции;
3. Финансы и ROI — продажи абонементов, фитнес-бар, комиссионные тренеров и отчетность;
4. Churn Prediction и Win-Back — ИИ выявляет риск ухода за 15–30 дней и возвращает 15–25% клиентов через SMS;
5. Кибербезопасность — Multi-Tenant изоляция (RLS), шифрование личных данных AES-256-GCM и стандарты GDPR.`
  },

  'mobile-app': {
    ka: `ARTRON-ის B2C მობილური აპლიკაცია ათლეტებს სთავაზობს მაქსიმალურ კომფორტს:

• დინამიური 15-წამიანი QR საშვი — კოდი ავტომატურად ახლდება ყოველ 15 წამში. სკრინშოტი ან ფოტო ტურნიკეტს ვერ გააღებს, რაც გამორიცხავს ბარათის სხვისთვის გადაცემას (Anti-Passback);
• 1 კლიკით გადახდა & განახლება — საბანკო ბარათით, Apple Pay-ით ან Google Pay-ით მყისიერი შეძენა;
• 14-დღიანი უპირობო დაბრუნება — კანონმდებლობის დაცვით, თანხის დაბრუნება 1 კლიკით პირველ ვიზიტამდე;
• ჯავშნები & განრიგი — ჯგუფური ვარჯიშებისა და მწვრთნელების კალენდარი;
• სამენოვანი ინტერფეისი — სრული ლოკალიზაცია ქართულ, ინგლისურ და რუსულ ენებზე.`,
    en: `The ARTRON B2C Mobile App delivers a premium athlete experience:

• 15-Second Dynamic QR Pass — Generates a fresh cryptographic token every 15 seconds. Static screenshots fail to open turnstiles, preventing unauthorized sharing (Anti-Passback);
• 1-Click Payments & Renewals — Instant checkout via credit cards, Apple Pay, or Google Pay;
• 14-Day Statutory Refund — In-app 1-click refund before first facility check-in, complying with consumer laws;
• Class Bookings & Schedules — Group sessions and personal trainer bookings;
• Trilingual Experience — Native UI in Georgian, English, and Russian.`,
    ru: `Мобильное приложение ARTRON B2C создано для максимального удобства спортсменов:

• Динамический 15-секундный QR-пропуск — обновляется каждые 15 секунд. Скриншот или фото не откроют турникет, передача пропуска исключена (Anti-Passback);
• Оплата и продление в 1 клик — через банковские карты, Apple Pay или Google Pay;
• Возврат в течение 14 дней — по закону о защите прав потребителей, возврат в 1 клик до первого посещения;
• Бронирование и расписание — запись на групповые занятия и к персональным тренерам;
• 3 языка интерфейса — полная локализация на грузинский, английский и русский.`
  },

  'ai-intelligence': {
    ka: `ARTRON AI ინტელექტუალური ასისტენტი მოიცავს 3 ძირითად ტექნოლოგიას:

1. 5-წამიანი Vision OCR — პირადობის მოწმობის ან პასპორტის კამერით დასკანირება და მონაცემების ავტომატური შევსება 99.8% სიზუსტით (ადმინისტრატორის მექანიკური შეცდომების 0-მდე დაყვანა);
2. ქართული ხმოვანი ბრძანებები (STT/TTS) — წევრის რეგისტრაცია, აბონემენტის გაყინვა და ბრძანებები ხმით, კლავიატურაზე ბეჭდვის გარეშე;
3. Churn Radar & ვირტუალური კონსიერჟი — Check-in სიხშირის კლების დაფიქსირება 15-30 დღით ადრე, სამოტივაციო Push/SMS შეთავაზებები და სტუმრების 24/7 ავტო-კონსულტაცია.`,
    en: `ARTRON AI Intelligence engine delivers 3 core automations:

1. 5-Second Vision OCR — Scans ID cards or passports via camera, auto-filling registration fields with 99.8% accuracy and zero reception typos;
2. Georgian Voice Commands (STT/TTS) — Hands-free member onboarding, pass freezing, and operational voice shortcuts;
3. Churn Radar & Virtual Concierge — Detects declining visit frequency 15–30 days early, triggers personalized retention campaigns, and assists visitors 24/7.`,
    ru: `Интеллектуальный ассистент ARTRON AI включает 3 передовые технологии:

1. Vision OCR за 5 секунд — сканирование ID-карты или паспорта через камеру с автозаполнением полей с точностью 99.8% без ошибок ресепшена;
2. Голосовые команды на грузинском языке — регистрация клиентов, заморозка карт и голосовое управление без клавиатуры;
3. Churn Radar и виртуальный консьерж — распознает спад посещаемости за 15–30 дней, отправляет персонализированные пуши/SMS и консультирует гостей 24/7.`
  },

  'partner-ecosystem': {
    ka: `ართრონის პარტნიორული ეკოსისტემა აერთიანებს წამყვან სპორტულ ობიექტებსა და ტექნოლოგიურ გიგანტებს:

🏛️ პარტნიორი სპორტული დარბაზები & აკადემიები:
• X AREA FITNESS (ქუთაისი) — 11,000+ წევრი, პრემიუმ კლუბი, IoT ტურნიკეტები;
• FLEX FITNESS (ქუთაისი) — 3,000+ წევრი, პრემიუმ კლუბი;
• PIXL FITNESS (ქუთაისი) — 2,800+ წევრი, ფუნქციური დარბაზი;
• FITNESS ZONA 15 (თერჯოლა) — 1,400+ წევრი;
• ATHLETIC FITNESS (ქუთაისი) — 840+ წევრი;
• Corpus Fitness Centre (თბილისი) — 1,200+ წევრი, აღდგენითი ცენტრი;
• ბაზაძის ფარიკაობის აკადემია (თბილისი) — ოფიციალური პარტნიორი.

💳 ფინტექი & გადახდები: საქართველოს ბანკი (BOG 1-Click), თიბისი (TBC), Stripe, Apple Pay, Google Pay და ავტომატური ყოველთვიური ჩამოჭრები.
🔌 IoT & აპარატურა: Came, ZKTeco, Hikvision ტურნიკეტები და GoSMS შეტყობინებების სერვისი.`,
    en: `Artron's partner ecosystem integrates leading athletic facilities and technology providers:

🏛️ Partner Sports Clubs & Academies:
• X AREA FITNESS (Kutaisi) — 11,000+ members, premium club, IoT turnstiles;
• FLEX FITNESS (Kutaisi) — 3,000+ members, premium gym;
• PIXL FITNESS (Kutaisi) — 2,800+ members, functional gym;
• FITNESS ZONA 15 (Terjola) — 1,400+ members;
• ATHLETIC FITNESS (Kutaisi) — 840+ members;
• Corpus Fitness Centre (Tbilisi) — 1,200+ members, recovery center;
• Bazadze Fencing Academy (Tbilisi) — Official sports partner.

💳 FinTech & Payments: Bank of Georgia (BOG 1-Click), TBC Bank, Stripe, Apple Pay, Google Pay, and recurring billing.
🔌 IoT & Hardware: Came, ZKTeco, Hikvision turnstiles, and GoSMS messaging gateway.`,
    ru: `Партнерская экосистема Artron объединяет ведущие спортивные объекты и технологических лидеров:

🏛️ Клубы-партнеры и академии:
• X AREA FITNESS (Кутаиси) — 11,000+ членов, премиум-клуб, IoT-турникеты;
• FLEX FITNESS (Кутаиси) — 3,000+ членов, премиум-зал;
• PIXL FITNESS (Кутаиси) — 2,800+ членов, функциональный клуб;
• FITNESS ZONA 15 (Тержола) — 1,400+ членов;
• ATHLETIC FITNESS (Кутаиси) — 840+ членов;
• Corpus Fitness Centre (Тбилиси) — 1,200+ членов, оздоровительный центр;
• Академия фехтования Базадзе (Тбилиси) — официальный партнер.

💳 Финтех и платежи: Bank of Georgia (BOG 1-Click), TBC Bank, Stripe, Apple Pay, Google Pay и рекуррентные списания.
🔌 IoT и оборудование: турникеты Came, ZKTeco, Hikvision и SMS-шлюз GoSMS.`
  },

  'faq': {
    ka: `ხშირად დასმული კითხვების შეჯამება საიტის ოფიციალური მონაცემებით:

1. ტურნიკეტების მონტაჟი — სრულდება 1–3 სამუშაო დღეში დარბაზის გაუჩერებლად;
2. არსებული ძველი ტურნიკეტები — ახლის ყიდვა საჭირო არ არის. ჩვენი IoT კონტროლერი ერგება Came, ZKTeco, Hikvision-ის 95%-ს (ხარჯი 4-ჯერ ნაკლებია);
3. ბრძანება №01-15/ნ — ტურნიკეტზე გავლა ავტომატურად ქმნის ოფიციალურ ტაბელს შრომის ინსპექციისთვის;
4. ოფლაინ რეჟიმი — ინტერნეტის გათიშვისას Edge-მეხსიერება ინახავს საშვებს და ჩვეულებრივად ატარებს წევრებს;
5. მონაცემთა ექსპორტი — შეწყვეტისას 30 დღე გაქვთ ბაზის სრული ექსპორტისთვის (No Vendor Lock-in);
6. 14-დღიანი დაბრუნება — მობილური აპლიკაციით შეძენილი აბონემენტის დაბრუნება 1 კლიკით პირველ ვიზიტამდე.`,
    en: `Key FAQ answers directly from our verified platform knowledge base:

1. Turnstile Installation — Completed in 1–3 business days with zero gym downtime;
2. Old Turnstiles Compatibility — No need to buy new hardware. Our IoT controller fits 95%+ of Came, ZKTeco, Hikvision models (4× cost saving);
3. Labor Order №01-15/n — Turnstile scans automatically generate electronic timesheets protecting from inspection fines;
4. Offline Resilience — Local Edge memory ensures turnstiles let members pass even during complete internet outages;
5. Data Export Guarantee — 30 days to export your entire database if you cancel (No Vendor Lock-in);
6. 14-Day Refund — Statutory right of withdrawal in the mobile app before first check-in.`,
    ru: `Ключевые ответы FAQ на основе официальных данных платформы:

1. Установка турникетов — занимает 1–3 рабочих дня без остановки работы зала;
2. Совместимость старых турникетов — покупать новые не нужно. Наш IoT-контроллер совместим с 95%+ моделей Came, ZKTeco, Hikvision (в 4 раза дешевле);
3. Приказ №01-15/н — проход через турникет автоматически формирует официальный табель для трудовой инспекции;
4. Офлайн-режим — при обрыве интернета локальная память Edge пропускает клиентов в штатном режиме;
5. Экспорт данных — 30 дней на полную выгрузку базы при расторжении (без Vendor Lock-in);
6. Возврат за 14 дней — гарантированный возврат абонемента в приложении до первого посещения.`
  }
};

export function getSectionReply(sectionId: SectionTopicId, locale: SupportedLocale): BotReply {
  const text = SECTION_REPLIES[sectionId]?.[locale] || SECTION_REPLIES[sectionId]?.['ka'];
  return { text };
}
