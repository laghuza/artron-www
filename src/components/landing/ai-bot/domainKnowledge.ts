import { CONTACT_CONFIG } from '@/config/contact';
import { BotAction, BotReply, SupportedLocale } from './types';

export function getLeadBridgeActions(locale: SupportedLocale): BotAction[] {
  if (locale === 'ka') {
    return [
      {
        id: 'whatsapp-chat',
        label: '💬 WhatsApp კონსულტაცია',
        actionType: 'whatsapp',
        href: CONTACT_CONFIG.whatsapp.getUrl('ka'),
        iconType: 'whatsapp',
      },
      {
        id: 'phone-call',
        label: `📞 დარეკვა (${CONTACT_CONFIG.phone.display})`,
        actionType: 'phone',
        href: CONTACT_CONFIG.phone.dialUrl,
        iconType: 'phone',
      },
    ];
  }

  if (locale === 'ru') {
    return [
      {
        id: 'whatsapp-chat',
        label: '💬 Консультация в WhatsApp',
        actionType: 'whatsapp',
        href: CONTACT_CONFIG.whatsapp.getUrl('ru'),
        iconType: 'whatsapp',
      },
      {
        id: 'phone-call',
        label: `📞 Позвонить (${CONTACT_CONFIG.phone.display})`,
        actionType: 'phone',
        href: CONTACT_CONFIG.phone.dialUrl,
        iconType: 'phone',
      },
    ];
  }

  return [
    {
      id: 'whatsapp-chat',
      label: '💬 WhatsApp Chat',
      actionType: 'whatsapp',
      href: CONTACT_CONFIG.whatsapp.getUrl('en'),
      iconType: 'whatsapp',
    },
    {
      id: 'phone-call',
      label: `📞 Call Us (${CONTACT_CONFIG.phone.display})`,
      actionType: 'phone',
      href: CONTACT_CONFIG.phone.dialUrl,
      iconType: 'phone',
    },
  ];
}

export function getPricingReply(locale: SupportedLocale): BotReply {
  if (locale === 'ka') {
    return {
      text: 'ართრონის სალიცენზიო პაკეტი და IoT აპარატურა (ტურნიკეტები, სკანერები) ინდივიდუალურად იანგარიშება თქვენი ობიექტის მასშტაბის, დარბაზების რაოდენობისა და საჭირო მოდულების მიხედვით (Starter მცირე სტუდიებისთვის, Pro დარბაზებისთვის, Enterprise კომპლექსებისთვის). ზუსტი ღირებულების დასათვლელად და პერსონალური შეთავაზების მისაღებად, გთხოვთ პირდაპირ დაგვიკავშირდეთ:',
      actions: getLeadBridgeActions(locale),
    };
  }
  if (locale === 'ru') {
    return {
      text: 'Стоимость лицензии ARTRON и аппаратного комплекса (IoT-турникеты, контроллеры) рассчитывается индивидуально в зависимости от масштаба объекта, числа проходов и модулей (Starter для студий, Pro для залов, Enterprise для спорткомплексов). Чтобы получить точный расчет и предложение, свяжитесь с нами:',
      actions: getLeadBridgeActions(locale),
    };
  }
  return {
    text: 'ARTRON software licensing and IoT hardware setup are tailored individually based on facility scale, turnstile gates, and selected modules (Starter, Pro, Enterprise). To receive an accurate calculation and custom commercial proposal, please connect with our team directly:',
    actions: getLeadBridgeActions(locale),
  };
}

export function getOcrReply(locale: SupportedLocale): BotReply {
  if (locale === 'ka') {
    return {
      text: 'Vision OCR ტექნოლოგია უზრუნველყოფს პირადობის მოწმობის ან პასპორტის 5 წამში დასკანირებას კამერით. სახელი, გვარი და პირადი ნომერი 99.8% სიზუსტით ავტომატურად ჯდება სისტემაში. ეს გამორიცხავს ადმინისტრატორის მექანიკურ შეცდომებსა და რიგებს რეცეფციაზე.',
    };
  }
  if (locale === 'ru') {
    return {
      text: 'Технология Vision OCR сканирует ID-карту или паспорт за 5 секунд через камеру. Имя, фамилия и личный номер вносятся в базу с точностью 99.8%. Это полностью исключает опечатки ресепшена и очереди на входе.',
    };
  }
  return {
    text: 'Vision OCR technology scans ID cards or passports in 5 seconds via camera, auto-filling member profile fields at 99.8% accuracy. It eliminates reception typos and check-in queues completely.',
  };
}

export function getVoiceReply(locale: SupportedLocale): BotReply {
  if (locale === 'ka') {
    return {
      text: 'ქართული ხმოვანი ასისტენტი (Speech-to-Text & Text-to-Speech) საშუალებას აძლევს მენეჯერს და ადმინისტრატორს, ხმოვანი კარნახით დაამატონ წევრი, გაყინონ აბონემენტი ან შეამოწმონ სტატისტიკა — კლავიატურაზე ხელით ბეჭდვის გარეშე.',
    };
  }
  if (locale === 'ru') {
    return {
      text: 'Голосовой ассистент на грузинском языке (STT/TTS) позволяет администраторам добавлять клиентов, замораживать карты и запрашивать аналитику голосом, без ручного набора на клавиатуре.',
    };
  }
  return {
    text: 'Our Georgian Voice Assistant (Speech-to-Text & Text-to-Speech) enables staff to register members, freeze passes, or query stats hands-free via voice commands.',
  };
}

export function getTurnstileReply(locale: SupportedLocale): BotReply {
  if (locale === 'ka') {
    return {
      text: 'IoT ტურნიკეტების ინსტალაცია სრულდება 1–3 სამუშაო დღეში დარბაზის გაუჩერებლად. თუ უკვე გაქვთ არსებული ტურნიკეტები (Came, ZKTeco, Hikvision და სხვ.), ახლის შეძენა საჭირო არ არის — ჩვენი უნივერსალური IoT კონტროლერი უერთდება მოდელების 95%-ს, რაც ხარჯებს 4-ჯერ ამცირებს. სისტემაში ჩაშენებულია Anti-passback დაცვა.',
    };
  }
  if (locale === 'ru') {
    return {
      text: 'Установка IoT-турникетов занимает 1–3 рабочих дня без остановки работы клуба. Если у вас уже есть турникеты (Came, ZKTeco, Hikvision и др.), новые покупать не нужно — наш IoT-контроллер совместим с 95%+ моделей, экономя до 4 раз бюджета. Встроена защита Anti-passback.',
    };
  }
  return {
    text: 'IoT turnstiles install in 1–3 business days with zero gym downtime. If you already have gates (Came, ZKTeco, Hikvision, etc.), our IoT smart controller connects to 95%+ of existing models, cutting costs 4×. Built-in Anti-passback prevents pass sharing.',
  };
}

export function getLaborReply(locale: SupportedLocale): BotReply {
  if (locale === 'ka') {
    return {
      text: 'ართრონი 100%-ით აკმაყოფილებს საქართველოს ოკუპირებული ტერიტორიებიდან დევნილთა, შრომის, ჯანმრთელობისა და სოციალური დაცვის მინისტრის ბრძანება №01-15/ნ-ის მოთხოვნებს. მწვრთნელებისა და თანამშრომლების შესვლა-გასვლა ტურნიკეტიდან ავტომატურად აგენერირებს ელექტრონულ ტაბელს (Excel/PDF ექსპორტით), რაც კლუბს სრულად იცავს შრომის ინსპექციის ჯარიმებისგან.',
    };
  }
  if (locale === 'ru') {
    return {
      text: 'ARTRON на 100% соответствует Приказу №01-15/н Минздрава Грузии об обязательном учете рабочего времени. Вход и выход тренеров и сотрудников через турникет автоматически формирует официальный электронный табель (экспорт Excel/PDF), защищая от штрафов инспекции.',
    };
  }
  return {
    text: 'ARTRON fully complies with Georgian Health Ministry Order №01-15/n regarding mandatory employee attendance. Turnstile entry/exit logs automatically build verified electronic timesheets (with Excel/PDF export), shielding clubs from labor inspection fines.',
  };
}

export function getOfflineReply(locale: SupportedLocale): BotReply {
  if (locale === 'ka') {
    return {
      text: 'ინტერნეტის გათიშვის დროსაც კი სისტემა შეუფერხებლად მუშაობს! ართრონის IoT კონტროლერს აქვს ლოკალური Edge მეხსიერება მოქმედი საშვების ქეშით. წევრები ჩვეულებრივად შევლენ და გავლენ. ინტერნეტის აღდგენისთანავე ყველა ვიზიტის მონაცემი მომენტალურად სინქრონიზდება სერვერთან.',
    };
  }
  if (locale === 'ru') {
    return {
      text: 'При отключении интернета турникеты работают без сбоев! IoT-контроллеры ARTRON хранят локальный Edge-кэш действующих карт. Клиенты входят и выходят в штатном режиме, а при восстановлении связи визиты мгновенно синхронизируются с сервером.',
    };
  }
  return {
    text: 'Even during complete internet outages, turnstiles operate smoothly! The ARTRON IoT controller features local Edge memory caching all valid passes. Members check in normally, and all entry logs sync immediately once connectivity returns.',
  };
}

export function getCompanyInfoReply(locale: SupportedLocale): BotReply {
  if (locale === 'ka') {
    return {
      text: `შპს „არტრონი“ (ს/კ 412799431)\nმისამართი: საქართველო, ქუთაისი, ნიკეას ქ., N 46ა, ბ. 17\nტელეფონი: ${CONTACT_CONFIG.phone.display}\nელ-ფოსტა: ${CONTACT_CONFIG.email.primary}\nოფიციალური პლატფორმა: www.artron.ge`,
      actions: getLeadBridgeActions(locale),
    };
  }
  if (locale === 'ru') {
    return {
      text: `ООО «Артрон» (ИНН 412799431)\nАдрес: Грузия, Кутаиси, ул. Никеа, N 46А, кв. 17\nТелефон: ${CONTACT_CONFIG.phone.display}\nEmail: ${CONTACT_CONFIG.email.primary}\nОфициальный сайт: www.artron.ge`,
      actions: getLeadBridgeActions(locale),
    };
  }
  return {
    text: `Artron LLC (Tax ID: 412799431)\nHeadquarters: Kutaisi, Nikea st., N 46A, apt. 17, Georgia\nPhone: ${CONTACT_CONFIG.phone.display}\nEmail: ${CONTACT_CONFIG.email.primary}\nWeb: www.artron.ge`,
    actions: getLeadBridgeActions(locale),
  };
}

export function getOfftopicFallbackReply(locale: SupportedLocale): BotReply {
  if (locale === 'ka') {
    return {
      text: 'მოცემული საკითხი სცდება ართრონის სპორტული ეკოსისტემისა და პლატფორმის შესაძლებლობებს. თუ გაქვთ კითხვები სპორტული ობიექტის მართვაზე, ტექნოლოგიურ ინტეგრაციებზე ან გსურთ ჩვენს გუნდთან დაკავშირება, გთხოვთ აირჩიოთ თქვენთვის მოსახერხებელი საკონტაქტო არხი:',
      actions: getLeadBridgeActions(locale),
    };
  }
  if (locale === 'ru') {
    return {
      text: 'Данный вопрос выходит за рамки спортивной экосистемы и платформы Artron. Если у вас есть вопросы по управлению спортивным объектом, интеграциям или вы хотите связаться с нашей командой, выберите удобный канал связи:',
      actions: getLeadBridgeActions(locale),
    };
  }
  return {
    text: 'This inquiry falls outside the scope of the Artron sports management platform. If you have questions regarding sports facility automation, integrations, or wish to connect with our team directly, please select a contact channel:',
    actions: getLeadBridgeActions(locale),
  };
}
