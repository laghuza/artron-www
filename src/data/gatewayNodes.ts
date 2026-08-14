import { ArtronNode } from '@/types/gateway';

export const GATEWAY_NODES: ArtronNode[] = [
  {
    id: 1, nodeCode: 'CRM_SOVEREIGN_PROFILE', title: 'სპორტსმენთა 360° პროფილი და სამართლებრივი უსაფრთხოება (CRM)',
    shortDesc: 'Artron CRM არის მრავალშრიანი, დინამიური ბაზა, რომელიც საშუალებას გაძლევთ ერთიან ციფრულ სივრცეში მართოთ სხვადასხვა სტატუსის მქონე მომხმარებლები — პროფესიონალი სპორტსმენებიდან დაწყებული, ერთჯერადი სტუმრებითა და კორპორატიული ჯგუფებით დასრულებული. სისტემა ავტომატურად აკონტროლებს იურიდიულ და სამედიცინო შესაბამისობას, რაც თქვენს ბიზნესს სრულად იცავს სამართლებრივი რისკებისგან.',
    subChapters: [
      { id: '01.1', title: '01.1 // მრავალ-პროფილიანი იერარქია (ოჯახები, მშობლები და შვილები)', doctrines: ['Family billing & multi-account link'] },
      { id: '01.2', title: '01.2 // კორპორატიული ჯგუფები, სტუდენტები და მეგობრების გაერთიანებები', doctrines: ['Corporate B2B invoicing'] },
      { id: '01.3', title: '01.3 // პროფესიონალი სპორტსმენები vs მოყვარული მოვარჯიშეები', doctrines: ['Pro level segmentation'] },
      { id: '01.4', title: '01.4 // VIP წევრები, სტუმრები და საცდელი ვიზიტები', doctrines: ['Fast-track turnstile guest pass'] },
      { id: '01.5', title: '01.5 // სამედიცინო ვალიდურობა და იურიდიული შესაბამისობა (Compliance & Safety)', doctrines: ['Medical & COPPA automated purge'] }
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

