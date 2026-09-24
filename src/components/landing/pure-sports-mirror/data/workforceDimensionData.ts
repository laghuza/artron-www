import { MirrorModule } from './mirrorDataTypes';

export const WORKFORCE_MODULES: MirrorModule[] = [
  {
    id: 'coach',
    name: 'სამწვრთნელო შტაბი',
    kicker: 'HC-01 / COACHING STAFF',
    sceneVariant: 'coach',
    headline: 'მწვრთნელი ხედავს ყველას ერთდროულად.',
    description:
      'სავარჯიშო გეგმები რვეულებში იშლება, ათლეტის პროგრესი მწვრთნელის მეხსიერებაზეა დამოკიდებული და კადრის ცვლილებასთან ერთად ცოდნა კლუბს ტოვებს. Artron ინახავს მეთოდიკას, დატვირთვის ისტორიას და მენტორის შეფასებას კლუბის დონეზე — არა პირად ბლოკნოტში.',
    cameraTags: ['STAFF FLOOR', 'GAME MODEL', 'GPS LOAD', 'LICENCE WALL'],
    specRows: [
      [
        { label: 'მწვრთნელი / ათლეტი', value: '1 : 18 საშუალო' },
        { label: 'შტაბის ზომა', value: '34 სპეციალისტი' },
        { label: 'დაგეგმვის ჰორიზონტი', value: 'მაკროციკლი 12 თვე' },
      ],
      [
        { label: 'გამძლეობის ბლოკი', value: 'Endurance · tempo' },
        { label: 'ძალა და სიმძლავრე', value: 'Strength · power' },
        { label: 'ტექნიკა და ტაქტიკა', value: 'Skill · game model' },
      ],
      [
        { label: 'დატვირთვის მართვა', value: 'GPS · RPE · ACWR' },
        { label: 'სესიის ჟურნალი', value: 'ავტომატური ლოგი' },
        { label: 'ვიდეო ანალიზი', value: 'Tag & share' },
      ],
      [
        { label: 'კვალიფიკაცია', value: 'ლიცენზიის ვადის კონტროლი' },
        { label: 'ბავშვებთან მუშაობა', value: 'Safeguarding სერტიფიკატი' },
        { label: 'შრომის ნორმა', value: 'დატვირთვის ლიმიტი' },
      ],
    ],
  },
  {
    id: 'med',
    name: 'ექიმები და რეაბილიტაცია',
    kicker: 'HC-02 / SPORTS MEDICINE',
    sceneVariant: 'med',
    headline: 'ტრავმა ჩანს დაზიანებამდე.',
    description:
      'სამედიცინო ჩანაწერი ერთ ფურცელზეა, დაბრუნების გადაწყვეტილება ინტუიციაზე მიიღება და განმეორებითი ტრავმა სეზონს ანგრევს. Artron აერთიანებს სკრინინგს, აღდგენის მარკერებს და return-to-play პროტოკოლს — ექიმი და მწვრთნელი ერთ მონაცემს უყურებენ.',
    cameraTags: ['TREATMENT BAY', 'JOINT SCAN', 'BIOMETRICS', 'RTP GATES'],
    specRows: [
      [
        { label: 'სამედიცინო შტაბი', value: '9 ექიმი · 12 რეაბილიტოლოგი' },
        { label: 'ათლეტის ბარათი', value: '1 400 აქტიური' },
        { label: 'სკრინინგი', value: 'კვარტალში ერთხელ' },
      ],
      [
        { label: 'ორთოპედია', value: 'Joint · tendon' },
        { label: 'ფიზიოთერაპია', value: 'Manual · instrumental' },
        { label: 'ფუნქციური დიაგნოსტიკა', value: 'VO₂max · ლაქტატი' },
      ],
      [
        { label: 'ბიომეტრია', value: 'HRV · sleep · SpO₂' },
        { label: 'დატვირთვის რისკი', value: 'Risk score realtime' },
        { label: 'რეაბილიტაციის ეტაპები', value: 'RTP gate-checks' },
      ],
      [
        { label: 'სამედიცინო მონაცემები', value: 'GDPR Art. 9 რეჟიმი' },
        { label: 'ანტიდოპინგი', value: 'WADA ცნობიერება' },
        { label: 'პირველადი დახმარება', value: 'AED · BLS გუნდი' },
      ],
    ],
  },
  {
    id: 'group',
    name: 'ფიტნეს-ინსტრუქტორები',
    kicker: 'HC-03 / GROUP LEADERS',
    sceneVariant: 'group',
    headline: 'ჯგუფი ივსება განრიგამდე.',
    description:
      'ცარიელი ჯგუფური გაკვეთილი ისეთივე ძვირია, როგორც გადატვირთული: ინსტრუქტორის საათი გადახდილია, დარბაზი დაკავებულია, შემოსავალი — არა. Artron განრიგს მოთხოვნის ისტორიაზე აგებს, ავსებს ლოდინის სიას და ინსტრუქტორის შედეგს დამსწრეობით ზომავს.',
    cameraTags: ['STUDIO FLOOR', 'CLASS ZONES', 'HR BOARD', 'SPACING / CERT'],
    specRows: [
      [
        { label: 'ჯგუფური გაკვეთილი', value: '180 კვირაში' },
        { label: 'საშუალო დამსწრეობა', value: '82%' },
        { label: 'ინსტრუქტორთა შემადგენლობა', value: '46 პირი' },
      ],
      [
        { label: 'ცეკვა და კარდიო', value: 'Zumba · step · cycle' },
        { label: 'გონება და სხეული', value: 'Yoga · pilates · stretch' },
        { label: 'ფუნქციური', value: 'TRX · kettlebell · circuit' },
      ],
      [
        { label: 'დაჯავშნა', value: 'აპლიკაცია + waitlist' },
        { label: 'დასწრების აღრიცხვა', value: 'NFC check-in' },
        { label: 'გულისცემის ზონები', value: 'Live HR display' },
      ],
      [
        { label: 'ინსტრუქტორის სერტიფიკატი', value: 'EREPS დონე 3+' },
        { label: 'დარბაზის ნორმა', value: 'm² / მონაწილე' },
        { label: 'კლიენტის თანხმობა', value: 'PAR-Q კითხვარი' },
      ],
    ],
  },
  {
    id: 'ops',
    name: 'ადმინისტრაცია და ოპერაციები',
    kicker: 'HC-04 / OPS & COMPLIANCE',
    sceneVariant: 'ops',
    headline: 'ოპერაცია ერთ სიმართლეზე დგას.',
    description:
      'ცვლების გრაფიკი ექსელშია, შვებულებები მესენჯერში, ხელფასის უწყისი ხელით ითვლება — შემოწმების წინ კი დოკუმენტების აღდგენა ერთ კვირას ხარჯავს. Artron ცვლებს, ხელშეკრულებებს და საქართველოს ბრძანება №01-15/ნ-ის მოთხოვნებს ერთ აუდიტირებად რეესტრში კრავს.',
    cameraTags: ['ROTA RING', 'DEPARTMENT PODS', 'SERVER / CLOCK-IN', 'AUDIT LEDGER'],
    specRows: [
      [
        { label: 'პერსონალი', value: '210 თანამშრომელი' },
        { label: 'ცვლების დაფარვა', value: '24/7 · 3 ცვლა' },
        { label: 'დოკუმენტის მოძიება', value: '< 30 წამი' },
      ],
      [
        { label: 'რეცეფცია და გაყიდვები', value: 'Front desk · CRM' },
        { label: 'ტექნიკური სამსახური', value: 'Maintenance · HVAC' },
        { label: 'სისუფთავე და უსაფრთხოება', value: 'Housekeeping · security' },
      ],
      [
        { label: 'ცვლების დაგეგმვა', value: 'Auto-rota + ღირებულება' },
        { label: 'დროის აღრიცხვა', value: 'Biometric clock-in' },
        { label: 'ინციდენტების ჟურნალი', value: 'Digital logbook' },
      ],
      [
        { label: 'ბრძანება №01-15/ნ', value: 'სრული შესაბამისობა' },
        { label: 'შრომის უსაფრთხოება', value: 'OHSAS პროტოკოლი' },
        { label: 'აუდიტის კვალი', value: 'უცვლელი ჟურნალი' },
      ],
    ],
  },
  {
    id: 'guard',
    name: 'მაშველთა კორპუსი',
    kicker: 'HC-05 / WATER SAFETY',
    sceneVariant: 'guard',
    headline: 'ყოველი წამი დათვლილია.',
    description:
      'მაშველის ყურადღება 20 წუთის შემდეგ ეცემა, პოზიციების როტაცია ზეპირად ხდება და სავარჯიშო ტრევოგა თვეებით ჩამორჩება გრაფიკს. Artron მართავს როტაციას, ფიქსირებს რეაგირების დროს და ავტომატურად აგებს უსაფრთხოების ანგარიშს.',
    cameraTags: ['BASIN OVERVIEW', 'SCAN CONES', 'RESPONSE MESH', 'DRILL BEACON'],
    specRows: [
      [
        { label: 'მაშველთა კორპუსი', value: '28 პირი' },
        { label: 'დაფარვის ზონა', value: '4 აუზი · 1 აკვაპარკი' },
        { label: 'როტაციის ინტერვალი', value: '20 წუთი' },
      ],
      [
        { label: 'ზედაპირის მეთვალყურეობა', value: 'Scan-10/20 პროტოკოლი' },
        { label: 'წყალქვეშა სამაშველო', value: 'Deep-water rescue' },
        { label: 'პირველადი დახმარება', value: 'CPR · AED · spinal' },
      ],
      [
        { label: 'რეაგირების ტაიმერი', value: 'Alarm-to-contact log' },
        { label: 'ხედვის კონტროლი', value: 'Underwater detection' },
        { label: 'ტრევოგის ღილაკი', value: 'Poolside panic mesh' },
      ],
      [
        { label: 'ILS სტანდარტი', value: 'საერთაშორისო რეკომენდაცია' },
        { label: 'სერტიფიცირება', value: 'ყოველწლიური რე-ატესტაცია' },
        { label: 'სავარჯიშო ტრევოგა', value: 'თვეში ერთხელ' },
      ],
    ],
  },
];
