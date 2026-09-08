export interface SecurityFactor {
  id: string;
  label: string;
  description: string;
  points: number;
  icon: string;
  category: 'auth' | 'device' | 'network' | 'policy';
  defaultEnabled: boolean;
}

export const SECURITY_SCORE_FACTORS: SecurityFactor[] = [
  {
    id: 'strong_password',
    label: 'რთული პაროლი & როტაცია',
    description: '12+ სიმბოლო, სიმბოლოები & 60-დღიანი ვადის გასვლა',
    points: 15,
    icon: '🔑',
    category: 'policy',
    defaultEnabled: true,
  },
  {
    id: 'webauthn_passkey',
    label: 'FIDO2 / WebAuthn ბიომეტრია',
    description: 'Touch ID, Face ID ან Windows Hello აპარატურული გასაღები',
    points: 25,
    icon: '👆',
    category: 'auth',
    defaultEnabled: true,
  },
  {
    id: 'backup_webauthn',
    label: 'სარეზერვო ბიომეტრიული მოწყობილობა',
    description: 'მეორე დამოუკიდებელი გაჯეტის მიბმა ექაუნთზე',
    points: 10,
    icon: '📱',
    category: 'auth',
    defaultEnabled: false,
  },
  {
    id: 'backup_codes',
    label: 'აქტიური სარეზერვო კოდები (Backup Codes)',
    description: 'ერთჯერადი კრიპტოგრაფიული გასაღებები (Single-use)',
    points: 15,
    icon: '🛡️',
    category: 'auth',
    defaultEnabled: true,
  },
  {
    id: 'trusted_devices',
    label: 'სანდო სამუშაო მოწყობილობები',
    description: 'სალაროსა და ადმინისტრატორის PC-ების ვალიდაცია',
    points: 10,
    icon: '💻',
    category: 'device',
    defaultEnabled: true,
  },
  {
    id: 'allowed_ip',
    label: 'დარბაზის Allowed IP & Geo-fencing',
    description: 'წვდომა მხოლოდ ფილიალის Wi-Fi/LAN ქსელიდან (Zero-Trust)',
    points: 15,
    icon: '🏢',
    category: 'network',
    defaultEnabled: true,
  },
  {
    id: 'threat_alerts',
    label: 'მომენტალური Email შეტყობინებები',
    description: 'Alert-ები უცხო IP-დან ან ღამით შესვლისას',
    points: 10,
    icon: '📧',
    category: 'policy',
    defaultEnabled: false,
  },
];

export interface ThreatScenario {
  id: string;
  title: string;
  triggerEvent: string;
  systemAction: string;
  badgeText: string;
  badgeType: 'critical' | 'warning' | 'success';
  icon: string;
}

export const THREAT_SCENARIOS: ThreatScenario[] = [
  {
    id: 'night_login',
    title: 'ღამის საათებში შესვლის მცდელობა',
    triggerEvent: 'თანამშრომელი ცდილობს სისტემაში შესვლას 02:40 საათზე',
    systemAction: '🚫 შესვლა დაბლოკილია [Night Lock Rule] + Email შეტყობინება მფლობელს',
    badgeText: 'ავტომატური ბლოკი',
    badgeType: 'critical',
    icon: '🌙',
  },
  {
    id: 'brute_force',
    title: 'პაროლის ბრუტფორს შეტევა',
    triggerEvent: 'ზედიზედ 5 არასწორი პაროლი 60 წამში',
    systemAction: '🔒 ანგარიში ავტომატურად იბლოკება 30 წუთით + IP კრიპტო-იზოლაცია',
    badgeText: 'Account Lockout',
    badgeType: 'critical',
    icon: '⚡',
  },
  {
    id: 'foreign_ip',
    title: 'უცხო ქალაქიდან/IP-დან შესვლა',
    triggerEvent: 'შესვლა უცნობი პროვაიდერიდან ან ქვეყნიდან',
    systemAction: '📧 მფლობელი იღებს მყისიერ Alert-ს IP-ით, რუკითა და 1-კლიკ Force Logout-ით',
    badgeText: 'Instant Alert',
    badgeType: 'warning',
    icon: '📍',
  },
  {
    id: 'force_logout',
    title: 'თანამშრომლის წასვლა / მოპარული ლეპტოპი',
    triggerEvent: 'მენეჯერი აჭერს "ყველა სესიის გაუქმებას"',
    systemAction: '🚪 JWT Token Versioning მომენტალურად აუქმებს ყველა აქტიურ სესიას',
    badgeText: 'Global Revoke',
    badgeType: 'success',
    icon: '🚪',
  },
];

export const FINANCIAL_SOVEREIGNTY_PILLARS = [
  {
    icon: '🏦',
    title: '100% პირდაპირი საბანკო გადახდები',
    subtitle: 'ჩვენ არ ვართ შუამავალი საფულე',
    description:
      'კლიენტების მიერ აბონემენტის გადახდისას თანხა პირდაპირ თქვენს საბანკო ანგარიშზე ჯდება (TBC Bank, Bank of Georgia, Stripe). ართრონი არ ეხება თქვენს ფულს.',
  },
  {
    icon: '🔒',
    title: 'Zero-Peeking & AES-256-GCM შიფრაცია',
    subtitle: 'მკაცრი Multi-Tenant იზოლაცია',
    description:
      'თქვენი ბაზა, ფინანსური ანგარიშგებები და წევრების სია იზოლირებულია. ართრონის ადმინისტრაციას არ აქვს ტექნიკური წვდომა თქვენს შემოსავლებზე.',
  },
  {
    icon: '📜',
    title: 'სრული იურიდიული გარანტია (NDA & GDPR)',
    subtitle: 'კომერციული საიდუმლოების დაცვა',
    description:
      'საქართველოს კანონი „პერსონალურ მონაცემთა დაცვის შესახებ“ და მკაცრი ხელშეკრულება 100%-ით იცავს თქვენს ბიზნეს რეპუტაციასა და ფინანსურ მონაცემებს.',
  },
];

export const SECURITY_STANDARDS_BADGES = [
  { name: 'ISO 27001 Ready', label: 'ინფორმაციული უსაფრთხოება', color: '#00ff87' },
  { name: 'SOC 2 Type II', label: 'მონაცემთა კონფიდენციალურობა', color: '#00A3FF' },
  { name: 'OWASP Top 10', label: 'ნულოვანი დაუცველობა', color: '#a855f7' },
  { name: 'PCI-DSS Compliant', label: 'საბანკო გადახდების იზოლაცია', color: '#38bdf8' },
  { name: 'Law №01-15/ნ & GDPR', label: 'შრომისა და პერსონალურ მონაცემთა დაცვა', color: '#34d399' },
];
