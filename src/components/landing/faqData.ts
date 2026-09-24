export interface FaqItem {
  id: number;
  category: 'b2b' | 'b2c' | 'hybrid';
  refCode: string;
  keywords: string[];
  q: {
    ka: string;
    en: string;
    ru: string;
  };
  a: {
    ka: string;
    en: string;
    ru: string;
  };
  points: {
    ka: string[];
    en: string[];
    ru: string[];
  };
  basis: {
    ka: string;
    en: string;
    ru: string;
  };
}

export const FAQ_DATA: FaqItem[] = [
  {
    id: 1,
    category: 'b2b',
    refCode: '#01',
    keywords: ['ტურნიკეტ', 'მონტაჟ', 'ინსტალაც', 'დანერგ', 'turnstile', 'install', 'setup', 'турникет', 'монтаж', 'установк', 'ვადა'],
    q: {
      ka: 'რამდენ ხანში მონტაჟდება IoT ტურნიკეტები?',
      en: 'How long does IoT turnstile installation take?',
      ru: 'Сколько времени занимает монтаж IoT-турникетов?',
    },
    a: {
      ka: 'ფიზიკური ინსტალაცია სრულდება 1–3 სამუშაო დღეში — ვადა დამოკიდებულია შესასვლელების რაოდენობაზე. დარბაზს მუშაობის შეჩერება არ სჭირდება.',
      en: 'Physical installation takes 1–3 business days, depending on the number of entry points. Your gym does not need to close.',
      ru: 'Физическая установка занимает 1–3 рабочих дня в зависимости от количества входов. Закрывать зал не нужно.',
    },
    points: {
      ka: [
        'დღე 1 — ტურნიკეტების მონტაჟი და კაბელირება',
        'დღე 2 — კონტროლერის კონფიგურაცია და კლუბის ანგარიშთან სინქრონიზაცია',
        'დღე 3 — ტესტირება და პერსონალის ინსტრუქტაჟი',
        'სამუშაოები შეიძლება ჩატარდეს არასამუშაო საათებში',
      ],
      en: [
        'Day 1 — turnstile mounting and cabling',
        'Day 2 — controller configuration and sync with your club account',
        'Day 3 — testing and staff briefing',
        'Work can be scheduled outside opening hours',
      ],
      ru: [
        'День 1 — монтаж турникетов и прокладка кабеля',
        'День 2 — настройка контроллера и синхронизация с аккаунтом клуба',
        'День 3 — тестирование и инструктаж персонала',
        'Работы можно провести в нерабочие часы',
      ],
    },
    basis: {
      ka: 'დანერგვის სტანდარტი: 1–3 სამუშაო დღე',
      en: 'Rollout standard: 1–3 business days',
      ru: 'Стандарт внедрения: 1–3 рабочих дня',
    },
  },
  {
    id: 2,
    category: 'b2b',
    refCode: '#02',
    keywords: ['უსაფრთხო', 'ტენანტ', 'შიფრ', 'იზოლაც', 'security', 'secure', 'tenant', 'encrypt', 'privacy', 'безопасн', 'шифр', 'изоляц', 'aes-256', 'rls'],
    q: {
      ka: 'როგორ არის დაცული ჩვენი კლუბის მონაცემები სხვა კლუბებისგან?',
      en: "How is our club's data kept separate from other clubs?",
      ru: 'Как данные нашего клуба защищены от других клубов?',
    },
    a: {
      ka: 'თითოეული კლუბის მონაცემები იზოლირებულია მონაცემთა ბაზის დონეზე. სხვა კლუბს, მათ შორის კონკურენტს, თქვენს ჩანაწერებზე წვდომა ტექნიკურად არ აქვს.',
      en: "Each club's data is isolated at the database level. No other club — competitors included — can technically access your records.",
      ru: 'Данные каждого клуба изолированы на уровне базы данных. Другой клуб, включая конкурента, технически не имеет доступа к вашим записям.',
    },
    points: {
      ka: [
        'Row-Level Security (RLS): ყოველი მოთხოვნა იფილტრება კლუბის იდენტიფიკატორით',
        'პირადი ნომრები ინახება AES-256-GCM შიფრაციით',
        'პერსონალის წვდომა განისაზღვრება როლით: მფლობელი, მენეჯერი, ადმინისტრატორი',
      ],
      en: [
        'Row-Level Security (RLS): every query is scoped to your club ID',
        'Personal ID numbers are stored with AES-256-GCM encryption',
        'Staff access is role-based: owner, manager, front desk',
      ],
      ru: [
        'Row-Level Security (RLS): каждый запрос ограничен ID клуба',
        'Личные номера хранятся с шифрованием AES-256-GCM',
        'Доступ персонала — по ролям: владелец, менеджер, администратор',
      ],
    },
    basis: {
      ka: 'Multi-Tenancy · RLS · AES-256-GCM',
      en: 'Multi-Tenancy · RLS · AES-256-GCM',
      ru: 'Multi-Tenancy · RLS · AES-256-GCM',
    },
  },
  {
    id: 3,
    category: 'b2b',
    refCode: '#03',
    keywords: ['ტაბელ', '01-15', 'შრომის', 'ინსპექც', 'timesheet', 'labor', 'labour', 'inspection', 'приказ', 'табел', 'ინსპექცია', 'ჯარიმა', 'ინსპექტირება'],
    q: {
      ka: 'შეესაბამება თუ არა სისტემა ბრძანება №01-15/ნ-ის მოთხოვნებს?',
      en: 'Does the system comply with Order №01-15/n?',
      ru: 'Соответствует ли система приказу №01-15/н?',
    },
    a: {
      ka: 'დიახ. თანამშრომლის შესვლა-გასვლა ტურნიკეტზე ავტომატურად აისახება სამუშაო დროის აღრიცხვის ელექტრონულ ტაბელში, შრომის ინსპექციის მოთხოვნების შესაბამისად. ეს კლუბს იცავს ჯარიმებისგან.',
      en: 'Yes. Staff entries and exits at the turnstile are logged automatically into an electronic working-time timesheet that meets Labour Inspection requirements — protecting the club from fines.',
      ru: 'Да. Входы и выходы сотрудников через турникет автоматически попадают в электронный табель учёта рабочего времени в соответствии с требованиями Инспекции труда — это защищает клуб от штрафов.',
    },
    points: {
      ka: [
        'ტაბელი ივსება ავტომატურად, ხელით შეყვანის გარეშე',
        'ტაბელის ექსპორტი ინსპექტირებისთვის მზა ფორმატში',
        'ცვლები და ზეგანაკვეთური საათები ჩანს ცალ-ცალკე',
      ],
      en: [
        'Timesheets fill themselves — no manual entry',
        'Inspection-ready timesheet export',
        'Shifts and overtime hours shown separately',
      ],
      ru: [
        'Табель заполняется автоматически, без ручного ввода',
        'Экспорт табеля в формате, готовом к проверке',
        'Смены и сверхурочные часы учитываются отдельно',
      ],
    },
    basis: {
      ka: 'ბრძანება №01-15/ნ · შრომის ინსპექცია',
      en: 'Order №01-15/n · Labour Inspection',
      ru: 'Приказ №01-15/н · Инспекция труда',
    },
  },
  {
    id: 4,
    category: 'b2b',
    refCode: '#04',
    keywords: ['შეწყვეტ', 'ექსპორტ', 'ხელშეკრულ', 'არქივ', 'cancel', 'terminat', 'export', 'contract', 'lock-in', 'archive', 'расторж', 'экспорт', 'договор', 'архив', '30 დღე', '3 წელი'],
    q: {
      ka: 'რა ემართება ჩვენს მონაცემებს ხელშეკრულების შეწყვეტისას?',
      en: 'What happens to our data if we end the contract?',
      ru: 'Что происходит с данными при расторжении договора?',
    },
    a: {
      ka: 'შეწყვეტიდან 30 დღის განმავლობაში შეგიძლიათ სრულად გაიტანოთ საოპერაციო მონაცემები. სისტემაზე მიბმა არ ხდება (No Vendor Lock-in).',
      en: 'You have 30 days after termination to export all operational data. No vendor lock-in.',
      ru: 'В течение 30 дней после расторжения вы можете полностью выгрузить операционные данные. Привязки к системе нет (No Vendor Lock-in).',
    },
    points: {
      ka: [
        '30 დღე — წევრების, აბონემენტებისა და ვიზიტების სრული ექსპორტი (CSV / JSON)',
        'საგადასახადო ჩანაწერები ინახება 3 წელი, საგადასახადო კოდექსის მოთხოვნით',
        'ვადების გასვლის შემდეგ მონაცემები იშლება',
      ],
      en: [
        '30 days — full export of members, memberships and visits (CSV / JSON)',
        'Tax records are retained for 3 years as required by the Tax Code',
        'Data is deleted once these periods end',
      ],
      ru: [
        '30 дней — полный экспорт клиентов, абонементов и посещений (CSV / JSON)',
        'Налоговые записи хранятся 3 года согласно Налоговому кодексу',
        'По истечении сроков данные удаляются',
      ],
    },
    basis: {
      ka: '30-დღიანი ექსპორტი · 3-წლიანი საგადასახადო არქივი',
      en: '30-day export · 3-year tax archive',
      ru: 'Экспорт 30 дней · Налоговый архив 3 года',
    },
  },
  {
    id: 8,
    category: 'b2b',
    refCode: '#08',
    keywords: ['ძველი', 'ტურნიკეტ', 'came', 'zkteco', 'hikvision', 'თავსებად', 'wiegand', 'რელე', 'კონტროლერ', 'old', 'compatibility', 'compatible', 'совместим', 'старый', 'контроллер'],
    q: {
      ka: 'გვაქვს ძველი ტურნიკეტები — აუცილებელია ახლის ყიდვა თუ არსებულზე მიერთდება?',
      en: 'We have old turnstiles — do we need new ones, or can you connect to what we have?',
      ru: 'У нас старые турникеты — нужно покупать новые или можно подключить существующие?',
    },
    a: {
      ka: 'სისტემა სრულად თავსებადია 95%+ არსებულ ტურნიკეტებთან (Came, ZKTeco, Hikvision და სხვ.). მონტაჟდება მხოლოდ ჩვენი კომპაქტური IoT კონტროლერი, რაც 4-ჯერ ამცირებს ხარჯებს ახალი აპარატურის შეძენასთან შედარებით.',
      en: 'The system is fully compatible with 95%+ of existing turnstiles (Came, ZKTeco, Hikvision and others). Only our compact IoT controller is installed — about 4× cheaper than buying new hardware.',
      ru: 'Система полностью совместима с 95%+ существующих турникетов (Came, ZKTeco, Hikvision и др.). Устанавливается только наш компактный IoT-контроллер — это в 4 раза дешевле покупки нового оборудования.',
    },
    points: {
      ka: [
        'მიერთება სტანდარტული ინტერფეისებით: რელე (dry contact), Wiegand, RS-485',
        'არსებული კორპუსი, მექანიკა და კაბელები ადგილზე რჩება',
        'კონტროლერი თავსდება ტურნიკეტის კორპუსში',
      ],
      en: [
        'Connects via standard interfaces: relay (dry contact), Wiegand, RS-485',
        'Existing housing, mechanics and cabling stay in place',
        'The controller fits inside the turnstile housing',
      ],
      ru: [
        'Подключение по стандартным интерфейсам: реле (dry contact), Wiegand, RS-485',
        'Корпус, механика и кабели остаются на месте',
        'Контроллер размещается внутри корпуса турникета',
      ],
    },
    basis: {
      ka: 'Came · ZKTeco · Hikvision · 95%+ თავსებადობა',
      en: 'Came · ZKTeco · Hikvision · 95%+ compatibility',
      ru: 'Came · ZKTeco · Hikvision · совместимость 95%+',
    },
  },
  {
    id: 5,
    category: 'b2c',
    refCode: '#05',
    keywords: ['დაბრუნ', '14 დღ', 'refund', 'money back', 'return', 'возврат', '14 дн', '14 day', 'თანხა', 'გაუქმება', 'კანონი'],
    q: {
      ka: 'შემიძლია აბონემენტის თანხის დაბრუნება?',
      en: 'Can I get a refund on my membership?',
      ru: 'Можно ли вернуть деньги за абонемент?',
    },
    a: {
      ka: 'აპლიკაციით შეძენილ აბონემენტზე მოქმედებს 14-დღიანი დაბრუნების უფლება, თუ მისით სარგებლობა ჯერ არ დაგიწყიათ.',
      en: "Memberships bought in the app carry a 14-day refund right, as long as you haven't started using them.",
      ru: 'На абонементы, купленные в приложении, действует право возврата в течение 14 дней, если вы ещё не начали ими пользоваться.',
    },
    points: {
      ka: [
        'სარგებლობის დაწყება = პირველი შესვლა ტურნიკეტზე',
        'მოთხოვნა: აპლიკაცია → აბონემენტები → თანხის დაბრუნება',
        'თანხა ბრუნდება იმავე ბარათზე',
      ],
      en: [
        '“Started using” = first entry through a turnstile',
        'Request: App → Memberships → Refund',
        'Money returns to the same card',
      ],
      ru: [
        '«Начало использования» = первый проход через турникет',
        'Запрос: Приложение → Абонементы → Возврат',
        'Деньги возвращаются на ту же карту',
      ],
    },
    basis: {
      ka: 'მომხმარებელთა უფლებების დაცვის შესახებ კანონი · 14 დღე',
      en: 'Law on Consumer Rights Protection · 14 days',
      ru: 'Закон о защите прав потребителей · 14 дней',
    },
  },
  {
    id: 6,
    category: 'b2c',
    refCode: '#06',
    keywords: ['qr', 'საშვ', 'სკრინშოტ', 'გაზიარ', 'pass', 'screenshot', 'share', 'пропуск', 'скриншот', 'anti-passback', '15 წამი'],
    q: {
      ka: 'რამდენად უსაფრთხოა QR საშვი? შეიძლება მისი გაზიარება?',
      en: 'How secure is the QR pass? Can I share it?',
      ru: 'Насколько безопасен QR-пропуск? Можно ли его передать?',
    },
    a: {
      ka: 'არა. QR კოდი ავტომატურად ახლდება ყოველ 15 წამში, ამიტომ სკრინშოტი ან გადაგზავნილი სურათი რამდენიმე წამში უვარგისი ხდება.',
      en: 'No. The QR code refreshes every 15 seconds, so a screenshot or forwarded image stops working within seconds.',
      ru: 'Нет. QR-код обновляется каждые 15 секунд, поэтому скриншот или пересланное изображение перестаёт работать через несколько секунд.',
    },
    points: {
      ka: [
        'დინამიური კოდი — განახლება ყოველ 15 წამში',
        'Anti-screenshot: სტატიკური სურათი ტურნიკეტს ვერ გააღებს',
        'Anti-passback: ერთი საშვით ხელახლა შესვლა გასვლის გარეშე შეუძლებელია',
      ],
      en: [
        'Dynamic code — refreshes every 15 seconds',
        'Anti-screenshot: a static image will not open the turnstile',
        'Anti-passback: the same pass cannot enter twice without exiting',
      ],
      ru: [
        'Динамический код — обновление каждые 15 секунд',
        'Anti-screenshot: статичное изображение не откроет турникет',
        'Anti-passback: повторный вход по одному пропуску без выхода невозможен',
      ],
    },
    basis: {
      ka: 'დინამიური QR · Anti-passback',
      en: 'Dynamic QR · Anti-passback',
      ru: 'Динамический QR · Anti-passback',
    },
  },
  {
    id: 7,
    category: 'hybrid',
    refCode: '#07',
    keywords: ['offline', 'ოფლაინ', 'ინტერნეტ', 'ავტონომ', 'internet', 'connection', 'офлайн', 'интернет', 'автоном', 'связ', 'ქეში', 'cache'],
    q: {
      ka: 'იმუშავებს შესვლა, თუ ინტერნეტი გაითიშა?',
      en: 'Does entry still work if the internet goes down?',
      ru: 'Будет ли работать вход, если пропадёт интернет?',
    },
    a: {
      ka: 'დიახ. ტურნიკეტის კონტროლერი ინახავს მოქმედი საშვების ადგილობრივ ქეშს, ამიტომ შესვლა-გასვლა ინტერნეტის გარეშეც გრძელდება.',
      en: 'Yes. Turnstile controllers keep a local cache of valid passes, so entry and exit continue offline.',
      ru: 'Да. Контроллеры турникетов хранят локальный кэш действующих пропусков, поэтому вход и выход продолжают работать офлайн.',
    },
    points: {
      ka: [
        'Edge ქეში — საშვი მოწმდება ადგილზე',
        'ოფლაინ პერიოდის ყველა ვიზიტი ინახება მოწყობილობაზე',
        'კავშირის აღდგენისას მონაცემები მყისიერად სინქრონიზდება',
      ],
      en: [
        'Edge cache — passes are verified on site',
        'All offline visits are stored on the device',
        'Data syncs instantly once the connection returns',
      ],
      ru: [
        'Edge-кэш — пропуск проверяется на месте',
        'Все офлайн-посещения сохраняются на устройстве',
        'При восстановлении связи данные мгновенно синхронизируются',
      ],
    },
    basis: {
      ka: 'Edge Cache · ავტომატური სინქრონიზაცია',
      en: 'Edge Cache · Automatic sync',
      ru: 'Edge Cache · Автоматическая синхронизация',
    },
  },
];
