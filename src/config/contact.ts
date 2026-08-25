/**
 * 📞 ARTRON CONTACT & COMMUNICATION CHANNELS CONFIGURATION
 * Centralized source of truth for all live customer touchpoints.
 */

export const CONTACT_CONFIG = {
  phone: {
    raw: '+995599528155',
    display: '+995 599 52 81 55',
    dialUrl: 'tel:+995599528155',
  },
  whatsapp: {
    number: '995599528155',
    display: '+995 599 52 81 55',
    messages: {
      ka: 'გამარჯობა, მაინტერესებს ARTRON SaaS პლატფორმის დემო ვერსია.',
      en: 'Hello, I am interested in a live demo of the ARTRON SaaS platform.',
      ru: 'Здравствуйте, меня интересует демо-версия SaaS платформы ARTRON.',
    },
    getUrl: (locale: string = 'ka') => {
      const lang = locale === 'en' || locale === 'ru' ? locale : 'ka';
      const msg = CONTACT_CONFIG.whatsapp.messages[lang];
      return `https://wa.me/${CONTACT_CONFIG.whatsapp.number}?text=${encodeURIComponent(msg)}`;
    },
  },
  telegram: {
    phone: '+995599528155',
    name: 'IRAKLI TODUA',
    url: 'https://t.me/+995599528155',
  },
  social: {
    facebook: 'https://facebook.com/artron.ge',
    linkedin: 'https://linkedin.com/company/artron',
  },
  email: {
    primary: 'info@artron.ge',
    support: 'artronsport@gmail.com',
    mailto: 'mailto:info@artron.ge',
  },
  headquarters: {
    city: 'Kutaisi',
    address: 'Nikea st., N 46A, apt. 17',
    country: 'Georgia',
    id: 'ARTRON-GEO-HQ-01',
  },
};
