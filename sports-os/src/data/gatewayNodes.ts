import { ArtronNode } from '@/types/gateway';

export const GATEWAY_NODES: ArtronNode[] = [
  {
    id: 1, nodeCode: 'SOVEREIGN_FEDERATIONS', title: 'FEDERATION NODES',
    shortDesc: 'ეროვნული ფედერაციების მონაცემთა ბაზა დაცულია ორმხრივი დაშიფვრით. თითოეული ფედერაციისთვის შექმნილია დამოუკიდებელი კრიპტოგრაფიული კარიბჭე (Secure Gateway API).',
    subChapters: [
      { id: 'fed-registry', title: '01 // CONNECTED FEDERATION REGISTRY', doctrines: ['GEO_FOOTBALL_FED: ● SECURE_ACTIVE', 'GEO_BASKETBALL_FED: ● SECURE_ACTIVE', 'GEO_RUGBY_UNION: ● SECURE_ACTIVE'] },
      { id: 'fed-gateway', title: '02 // CRYPTOGRAPHIC GATEWAY', doctrines: ['[ GATEWAY_KEY ]: AES_256_RSA_ACTIVE', '[ SYS_LOAD ]: 12.4%'] }
    ]
  },
  {
    id: 2, nodeCode: 'CLUB_DIGITAL_TWIN', title: 'FACILITY BLUEPRINT',
    shortDesc: 'ინფრასტრუქტურისა და Edge ტურნიკეტების ციფრული ტყუპი არენებისთვის.',
    subChapters: [
      { id: 'turnstile-feed', title: '01 // TELEMETRY FEED', doctrines: ['RFID_TURNSTILE_01: SECURE ACTIVE', 'შესასვლელი ბარიერი RFID წამკითხველით.'] }
    ]
  },
  {
    id: 3, nodeCode: 'IOT_TELEMETRY', title: 'IOT & TELEMETRY STREAM',
    shortDesc: 'რეალურ დროში ტელემეტრიისა და სენსორების მონაცემთა ნაკადი.',
    subChapters: [{ id: 'iot-stream', title: '01 // SENSOR STREAM', doctrines: ['WebSocket streaming @ sub-50ms latency.', 'Multi-tenant telemetry ingestion pipeline.'] }]
  },
  {
    id: 4, nodeCode: 'ATHLETE_MOBILE_OS', title: 'ATHLETE MOBILE OS',
    shortDesc: 'ათლეტებისა და მწვრთნელების მობილური ეკოსისტემა.',
    subChapters: [{ id: 'mobile-app', title: '01 // REACT NATIVE HUD', doctrines: ['Biometric Passkey Authentication.', 'Offline-first SQLite sync engine.'] }]
  },
  {
    id: 5, nodeCode: 'PARTNERS_INTEGRATIONS', title: 'PARTNERS & INTEGRATIONS',
    shortDesc: 'პარტნიორების, მოდულებისა და ფინანსური სისტემების ინტეგრაციები.',
    subChapters: [{ id: 'partner-mod', title: '01 // MODULAR EXTENSIONS', doctrines: ['MOD_SCHEDULING & MOD_FINANCIAL active.', 'Core telemetry cross-link established.'] }]
  },
  {
    id: 6, nodeCode: 'CORE_TEAM_CAREERS', title: 'CORE TEAM & CAREERS',
    shortDesc: 'ართრონის ბირთვის გუნდი და კარიერული პლატფორმა.',
    subChapters: [{ id: 'careers-hub', title: '01 // JOIN THE CORE', doctrines: ['Engineering & AI Research positions.', 'Enterprise SaaS Matrix team.'] }]
  },
  {
    id: 7, nodeCode: 'ABOUT_US', title: 'ABOUT US (VISION & REASON)',
    shortDesc: 'ართრონის მისია, ხედვა და ტექნოლოგიური დოქტრინა.',
    subChapters: [{ id: 'doctrine-manifesto', title: '01 // ARTRON MANIFESTO', doctrines: ['Systemic self-organization protocol.', 'Biophilic mineral design directive v2.0.'] }]
  },
  {
    id: 8, nodeCode: 'SECURITY_SLA', title: 'SECURITY & SLA PROTOCOLS',
    shortDesc: 'უსაფრთხოების, GDPR და SLA პროტოკოლები.',
    subChapters: [{ id: 'gdpr-purge', title: '01 // GDPR COMPLIANCE SHIELD', doctrines: ['AES-256 PII Encrypted storage.', '14-Day Automated Data Purge Protocol.'] }]
  },
  {
    id: 9, nodeCode: 'CORE_INIT', title: 'ARTRON SPORTS OS',
    shortDesc: 'ართრონი არ არის უბრალოდ პლატფორმა. ეს არის სპორტული სექტორის ლიდერების (ფედერაციების, კლუბებისა და პროფესიონალების) ოპერაციული სისტემა. მართვა ხორციელდება ცენტრალური 9-კვანძიანი Ennea Core ბირთვის მეშვეობით.',
    subChapters: [
      { id: 'membership-init', title: '01 // MEMBERSHIP INIT', doctrines: ['სპორტულ-გამაჯანსაღებელი სუბიექტის (ფედერაცია, კლუბი, ათლეტი) პირველადი ინიციაცია და ბირთვთან დაკავშირება.'] },
      { id: 'console-access', title: '02 // CONSOLE ACCESS', doctrines: ['რეგისტრირებული ოპერატორის ავტორიზებული შესვლა მართვისა და ტელემეტრიის კონსოლში.'] }
    ]
  }
];

