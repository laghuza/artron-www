import { MobileScreenConfig, PlanItem, TrainingSlot } from './types';

export const SHOWCASE_RGB = [
  '76,189,136',   // 0: Entry Pass (Emerald) #80DAAC
  '119,164,246',  // 1: Mentor / Coach (Blue) #9DC4FF
  '168,148,238',  // 2: Shield (Purple) #C6B7FF
  '198,159,50',   // 3: Renewal (Gold) #E2C06D
  '230,138,88',   // 4: Progress (Coral) #FFAE85
  '55,178,232',   // 5: Freeze (Cyan) #74D1FF
  '234,128,138',  // 6: Guest Pass (Rose) #FFA6AD
  '0,190,175',    // 7: Live Load (Teal) #63DBCD
];

export const SHOWCASE_ACCENTS = [
  '#80DAAC', // 0: Entry Pass
  '#9DC4FF', // 1: Mentor / Coach
  '#C6B7FF', // 2: Shield
  '#E2C06D', // 3: Renewal
  '#FFAE85', // 4: Progress
  '#74D1FF', // 5: Freeze
  '#FFA6AD', // 6: Guest Pass
  '#63DBCD', // 7: Live Load
];

export const SHOWCASE_PALE = [
  '#D5F4E2', // 0
  '#DDECFF', // 1
  '#ECE7FF', // 2
  '#F6EACE', // 3
  '#FFE4D5', // 4
  '#D2F1FF', // 5
  '#FFE1E3', // 6
  '#CFF4EF', // 7
];

export const SHOWCASE_HUES = [160, 262, 293, 88, 48, 232, 15, 185];

export const SCREEN_ORDER = [0, 1, 2, 3, 4, 5, 6, 7];

export const SLOT_INDEX_MAP: Record<number, number> = {
  0: 0,
  1: 1,
  2: 2,
  3: 3,
  4: 0,
  5: 1,
  6: 2,
  7: 3,
};

export const PLANS_CONFIG: PlanItem[] = [
  { id: 0, name: '1 თვე', sub: '12 ვიზიტი', v: '12 ვიზიტი', price: '150 ₾', end: '16.11', d: '30d', g: '12', gs: 'ვიზიტი' },
  { id: 1, name: '3 თვე', sub: '36 ვიზიტი · −11%', v: '36 ვიზიტი', price: '400 ₾', end: '16.01', d: '90d', g: '36', gs: 'ვიზიტი' },
  { id: 2, name: '12 თვე', sub: 'ულიმიტო · −22%', v: 'ულიმიტო', price: '1400 ₾', end: '16.10.27', d: '365d', g: '∞', gs: 'წელი' },
];

export const TRAINING_SLOTS_DATA: TrainingSlot[] = [
  { idx: 0, time: '12:00', cls: 'HIIT', booked: true },
  { idx: 1, time: '13:00', cls: '1:1', booked: false },
  { idx: 2, time: '14:30', cls: 'ჯგუფი', booked: true },
  { idx: 3, time: '16:00', cls: '1:1', booked: false },
  { idx: 4, time: '17:30', cls: 'მობილობა', booked: true },
  { idx: 5, time: '19:00', cls: '1:1', booked: false },
];

export const MOBILE_SCREENS_CONFIG: MobileScreenConfig[] = [
  {
    id: 0,
    code: 'SCREEN 01 — ENTRY PASS · შესვლა',
    badge: '01 — ENTRY PASS · შესვლა',
    tag: 'ENTRY',
    statusBadge: '0.8 წმ · NFC',
    title: 'ურიგო დაშვება & ჭკვიანი ტურნიკეტი',
    desc: 'დინამიური QR ახლდება ყოველ 15 წამში, NFC კი ტურნიკეტს 0.8 წამში ხსნის. ანტი-ფროდ დაცვა და შესვლა რიგის გარეშე.',
    accent: SHOWCASE_ACCENTS[0],
    rgb: SHOWCASE_RGB[0],
    pale: SHOWCASE_PALE[0],
    hue: SHOWCASE_HUES[0],
    logicFormula: 'τ = H(uid ‖ ⌊t / 15⌋)',
    logicParams: [
      { k: 'QR TTL', v: '15 s' },
      { k: 'გადამოწმება', v: '0.8 s' },
      { k: 'ვიზიტი', v: '3 / 12' },
    ],
  },
  {
    id: 1,
    code: 'SCREEN 02 — MENTOR · მწვრთნელი',
    badge: '02 — MENTOR · მწვრთნელი',
    tag: 'COACH',
    statusBadge: 'Live განრიგი',
    title: 'მწვრთნელის განრიგი და ჯავშნები',
    desc: 'მწვრთნელის თავისუფალი სლოტები რეალურ დროში. ჯავშანი ერთი შეხებით — ორმაგი დაჯავშნის გარეშე.',
    accent: SHOWCASE_ACCENTS[1],
    rgb: SHOWCASE_RGB[1],
    pale: SHOWCASE_PALE[1],
    hue: SHOWCASE_HUES[1],
    logicFormula: 'θ = 30·h + m/2 = 480°',
    logicParams: [
      { k: 'სლოტი', v: '16:00' },
      { k: 'თავისუფალი', v: '3 − 1 = 2' },
      { k: 'ხანგრძლივობა', v: '60′' },
    ],
  },
  {
    id: 2,
    code: 'SCREEN 03 — LEGAL SHIELD · გარანტია',
    badge: '03 — LEGAL SHIELD · გარანტია',
    tag: 'SHIELD',
    statusBadge: '100% დაცული',
    title: '14-დღიანი გარანტია და სამართლებრივი სიმშვიდე',
    desc: 'შეძენიდან 14 დღე — სრული თანხის დაბრუნება ერთი შეხებით. შესაბამისობა მომხმარებლის უფლებათა კანონთან და App Store / Google Play სტანდარტებთან.',
    accent: SHOWCASE_ACCENTS[2],
    rgb: SHOWCASE_RGB[2],
    pale: SHOWCASE_PALE[2],
    hue: SHOWCASE_HUES[2],
    logicFormula: 'refund = 150₾ · [d ≤ 14]',
    logicParams: [
      { k: 'შეძენა', v: '15.09' },
      { k: 'ბოლო დღე', v: '29.09' },
      { k: 'დაბრუნება', v: '150 ₾' },
    ],
  },
  {
    id: 3,
    code: 'SCREEN 04 — RENEWAL · განახლება',
    badge: '04 — RENEWAL · განახლება',
    tag: 'RENEWAL',
    statusBadge: 'ონლაინ · 24/7',
    title: 'აბონემენტის ონლაინ განახლება',
    desc: 'ვადის ამოწურვამდე 3 დღით ადრე აპი შეგახსენებთ. აირჩიეთ გეგმა და განაახლეთ Apple Pay-ით ან ბარათით — რეცეფციის გარეშე, ავტო-განახლების ოფციით.',
    accent: SHOWCASE_ACCENTS[3],
    rgb: SHOWCASE_RGB[3],
    pale: SHOWCASE_PALE[3],
    hue: SHOWCASE_HUES[3],
    logicFormula: 'end′ = end + 30d',
    logicParams: [
      { k: 'ძველი ვადა', v: '16.10' },
      { k: 'ახალი ვადა', v: '16.11' },
      { k: 'თანხა', v: '150 ₾' },
    ],
  },
  {
    id: 4,
    code: 'SCREEN 05 — PROGRESS · პროგრესი',
    badge: '05 — PROGRESS · პროგრესი',
    tag: 'PROGRESS',
    statusBadge: 'ავტო-ტრეკინგი',
    title: 'პერსონალური პროგრესი & ვარჯიშის სერია',
    desc: 'ყოველი ვიზიტი ავტომატურად ფიქსირდება. კვირის მიზანი, სერია და მწვრთნელის შეფასება ერთ ეკრანზე.',
    accent: SHOWCASE_ACCENTS[4],
    rgb: SHOWCASE_RGB[4],
    pale: SHOWCASE_PALE[4],
    hue: SHOWCASE_HUES[4],
    logicFormula: 'sₙ = sₙ₋₁ + 1 ⇔ wₙ ≥ 2',
    logicParams: [
      { k: 'სერია', v: '13 კვირა' },
      { k: 'კვირის მიზანი', v: '2 / 2' },
      { k: 'რეკორდი', v: '21 კვ.' },
    ],
  },
  {
    id: 5,
    code: 'SCREEN 06 — FREEZE · გაყინვა',
    badge: '06 — FREEZE · გაყინვა',
    tag: 'FREEZE',
    statusBadge: 'ერთი შეხებით',
    title: 'აბონემენტის გაყინვა',
    desc: 'ავადმყოფობა ან მოგზაურობა — გაყინეთ აბონემენტი 14 დღემდე, ზარისა და განცხადების გარეშე. ვადა ავტომატურად გადაიწევს, ადრე დაბრუნებისას კი დარჩენილი დღეები შეგრჩებათ.',
    accent: SHOWCASE_ACCENTS[5],
    rgb: SHOWCASE_RGB[5],
    pale: SHOWCASE_PALE[5],
    hue: SHOWCASE_HUES[5],
    logicFormula: 'end′ = end + n, n ≤ 14',
    logicParams: [
      { k: 'არჩეული დღეები', v: '7 დღე' },
      { k: 'ძველი ვადა', v: '16 ოქტ' },
      { k: 'ახალი ვადა', v: '23 ოქტ' },
    ],
  },
  {
    id: 6,
    code: 'SCREEN 07 — GUEST PASS · სტუმარი',
    badge: '07 — GUEST PASS · სტუმარი',
    tag: 'GUEST PASS',
    statusBadge: 'ციფრული მოსაწვევი',
    title: 'სტუმრის საშვი მეგობრისთვის',
    desc: 'ერთჯერადი 24-საათიანი საშვი WhatsApp-ით ან SMS-ით — 3 მოსაწვევი ყოველ ციკლში. სტუმარი შედის იმავე ტურნიკეტით.',
    accent: SHOWCASE_ACCENTS[6],
    rgb: SHOWCASE_RGB[6],
    pale: SHOWCASE_PALE[6],
    hue: SHOWCASE_HUES[6],
    logicFormula: 'pass = sign(uid, 24h, 1×)',
    logicParams: [
      { k: 'დარჩა', v: '1 / 3' },
      { k: 'ვადა', v: '16.09 · 11:24' },
      { k: 'შესვლა', v: '1×' },
    ],
  },
  {
    id: 7,
    code: 'SCREEN 08 — LIVE · დატვირთვა',
    badge: '08 — LIVE · დატვირთვა',
    tag: 'LIVE',
    statusBadge: 'რეალურ დროში',
    title: 'დარბაზის დატვირთვა ცოცხლად',
    desc: 'რამდენი ადამიანია დარბაზში ახლა, ზონების მიხედვით, და დღის პროგნოზი — აირჩიეთ ყველაზე თავისუფალი საათი.',
    accent: SHOWCASE_ACCENTS[7],
    rgb: SHOWCASE_RGB[7],
    pale: SHOWCASE_PALE[7],
    hue: SHOWCASE_HUES[7],
    logicFormula: 'ρ = n / C = 44 / 125 = 35%',
    logicParams: [
      { k: 'დარბაზშია', v: '44 ადამიანი' },
      { k: 'ტევადობა', v: '125' },
      { k: 'საუკეთესო დრო', v: '13:00' },
    ],
  },
];
