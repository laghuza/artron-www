import { MirrorModule } from './mirrorDataTypes';

export const VENUES_MODULES: MirrorModule[] = [
  {
    id: 'gym',
    name: 'ათლეტური ჰაბები',
    kicker: 'VEN-01 / MEMBERSHIP HUB',
    sceneVariant: 'gym',
    headline: 'ერთი ჰაბი. სრული კონტროლი.',
    description:
      'პიკის საათებში დარბაზი იტვირთება, ადმინისტრატორი ხელით ავსებს ჟურნალს და გაუქმებული აბონემენტები ჩუმად ჭამს შემოსავალს. Artron აერთიანებს წევრობას, შესვლის კონტროლს და აღჭურვილობის რეალურ დატვირთვას ერთ ცოცხალ სურათში — გადაწყვეტილება მიიღება მონაცემზე, არა ვარაუდზე.',
    cameraTags: ['WIDE ESTABLISH', 'ZONE DISTRIBUTION', 'TELEMETRY CLOSE-UP', 'COMPLIANCE PROFILE'],
    specRows: [
      [
        { label: 'საერთო ფართობი', value: '1 200–8 000 m²' },
        { label: 'ერთდროული ტევადობა', value: '450 მომხმარებელი' },
        { label: 'პიკის ფანჯარა', value: '18:00 – 21:30' },
      ],
      [
        { label: 'ძალოვანი ზონა', value: 'Free weights · Rack' },
        { label: 'ფუნქციური', value: 'HIIT · Cross · Mobility' },
        { label: 'კარდიო ბლოკი', value: '64 ერთეული' },
      ],
      [
        { label: 'წევრის იდენტიფიკაცია', value: 'RFID / NFC ბრასლეტი' },
        { label: 'აღჭურვილობის ტელემეტრია', value: 'IoT 900+ სენსორი' },
        { label: 'დატვირთვის რუკა', value: 'Heatmap 1 წთ ინტერვალი' },
      ],
      [
        { label: 'პერსონალურ მონაცემთა დაცვა', value: 'GDPR · ISO 27001' },
        { label: 'უსაფრთხოების აუდიტი', value: 'კვარტალური' },
        { label: 'ხანძარსაწინააღმდეგო', value: 'EN 13501 კლასი B' },
      ],
    ],
  },
  {
    id: 'pool',
    name: 'ოლიმპიური აუზები',
    kicker: 'VEN-02 / AQUATIC COMPLEX',
    sceneVariant: 'pool',
    headline: 'წყალი, რომელიც თავად ანგარიშობს.',
    description:
      'ქლორის ხელით გაზომვა, ბუნდოვანი ბილიკების განრიგი და მოცურავეთა რიგი კომპლექსს ყოველდღე ნერვიულობაში აგდებს. Artron წყლის ქიმიას, ბილიკების დატვირთვას და მაშველთა როტაციას ერთ პროტოკოლში კრავს და გადახრაზე რეაგირებს წუთებში, არა შემოწმების დღეს.',
    cameraTags: ['WIDE BASIN', 'LANE LANTERNS', 'CHEM SENSORS', 'FINA CERTIFICATE'],
    specRows: [
      [
        { label: 'აუზის ზომა', value: '50 m · 8 ბილიკი' },
        { label: 'წყლის მოცულობა', value: '2 500 m³' },
        { label: 'დღიური ნაკადი', value: '1 100 მოცურავე' },
      ],
      [
        { label: 'ცურვა', value: 'თავისუფალი · ბრასი · დელფინი' },
        { label: 'წყლის პოლო', value: 'სრული მოედანი' },
        { label: 'სინქრონული / დაივინგი', value: '3 m · 5 m პლატფორმა' },
      ],
      [
        { label: 'წყლის ქიმია', value: 'pH · Cl · ORP realtime' },
        { label: 'ბილიკის აღრიცხვა', value: 'ოპტიკური მრიცხველი' },
        { label: 'ტემპერატურა', value: '±0.2 °C კონტროლი' },
      ],
      [
        { label: 'FINA / World Aquatics', value: 'FR 2 სტანდარტი' },
        { label: 'სანიტარული ნორმა', value: 'SanPiN ეკვივალენტი' },
        { label: 'მაშველთა კოეფიციენტი', value: '1 : 75 მოცურავე' },
      ],
    ],
  },
  {
    id: 'court',
    name: 'ჩოგბურთი და პადელი',
    kicker: 'VEN-03 / COURT SYSTEMS',
    sceneVariant: 'court',
    headline: 'კორტი, რომელიც\nარასდროს\nცარიელია.',
    description:
      'ჯავშნის გაუქმება ბოლო წუთს, გამორთული განათების ხარჯი და ტელეფონით დაჯავშნის ქაოსი კორტის მარჟას წლიურად ნახევრად ჭრის. Artron ავტომატურად ავსებს გამოთავისუფლებულ სლოტს ლოდინის სიიდან და განათებას მხოლოდ ნამდვილ თამაშზე რთავს.',
    cameraTags: ['WIDE ESTABLISH', 'DISCIPLINE PASS', 'TECH CLOSE-UP', 'STANDARD SWEEP'],
    specRows: [
      [
        { label: 'კორტების რაოდენობა', value: '4 ჩოგბურთი · 6 პადელი' },
        { label: 'სლოტის შევსება', value: '87% საშუალო' },
        { label: 'დაკავშნის ფანჯარა', value: '30 დღე წინ' },
      ],
      [
        { label: 'ჩოგბურთი', value: 'Hard · Clay · Indoor' },
        { label: 'პადელი', value: 'Panoramic glass' },
        { label: 'სკვოში / ბადმინტონი', value: 'ოპციური ბლოკი' },
      ],
      [
        { label: 'ჭკვიანი განათება', value: 'Presence-based LED' },
        { label: 'მატჩის ანალიტიკა', value: 'Court cam · dwell' },
        { label: 'წვდომა', value: 'QR · PIN კოდი' },
      ],
      [
        { label: 'ITF / FIP', value: 'კორტის განზომილება' },
        { label: 'განათების დონე', value: '500–750 lux' },
        { label: 'დაზღვევა', value: 'პასუხისმგებლობის პოლისი' },
      ],
    ],
  },
  {
    id: 'octagon',
    name: 'დოჯოები და რინგი',
    kicker: 'VEN-04 / COMBAT ARTS',
    sceneVariant: 'octagon',
    headline: 'ყოველი დარტყმა აღრიცხულია.',
    description:
      'სპარინგის დატვირთვა ქაღალდზე იკარგება, წონითი კატეგორიები დღის ბოლოს იზომება და ტრავმა მაშინ ჩანს, როცა გვიანია. Artron სპარინგის მოცულობას, აღდგენას და წონის დინამიკას ერთ პროფილში აგროვებს — მწვრთნელი ხედავს რისკს მოვლენამდე.',
    cameraTags: ['WIDE ESTABLISH', 'DISCIPLINE PASS', 'TECH CLOSE-UP', 'STANDARD SWEEP'],
    specRows: [
      [
        { label: 'საწვრთნელი ზონა', value: '2 თათამი · 1 რინგი' },
        { label: 'ჯგუფის ზომა', value: '24 ათლეტი' },
        { label: 'სესიები დღეში', value: '9 ბლოკი' },
      ],
      [
        { label: 'ჭიდაობა / ძიუდო', value: 'IJF წესი' },
        { label: 'კრივი / MMA', value: 'რინგი 6.1 m · გალია' },
        { label: 'კარატე / ტაეკვონდო', value: 'WKF · WT კატა' },
      ],
      [
        { label: 'სპარინგის ტელემეტრია', value: 'Impact G-sensor' },
        { label: 'წონის კონტროლი', value: 'ბიოიმპედანსი' },
        { label: 'ვიდეო განხილვა', value: '4 კამერა · slow-mo' },
      ],
      [
        { label: 'ტრავმის პროტოკოლი', value: 'Concussion checklist' },
        { label: 'სამედიცინო დაშვება', value: 'სავალდებულო ცნობა' },
        { label: 'არასრულწლოვანთა ზედამხედველობა', value: 'ორმაგი თანხმობა' },
      ],
    ],
  },
  {
    id: 'arena',
    name: 'არენები და სტადიონები',
    kicker: 'VER 01 / MULTIPURPOSE ARENA',
    sceneVariant: 'arena',
    headline: 'არენა ერთი ეკრანიდან.',
    description:
      'ღონისძიებათა შორის გარდამავალი პერიოდი, ბილეთების არხული ნაკადი და შესასვლელების რიგი არენას თითოეულ საგამოს გამოუყენებელ შემოსავლად უჯდება. Artron ერთ კონსოლში აერთიანებს კონფიგურაციის ცვლას, ნაკადის მართვას და კომერციულ ანალიტიკას.',
    cameraTags: ['WIDE ESTABLISH', 'DISCIPLINE PASS', 'TECH CLOSE-UP', 'STANDARD SWEEP'],
    specRows: [
      [
        { label: 'დამსწრეთა ტევადობა', value: '12 000 ადგილი' },
        { label: 'კონფიგურაციის ცვლა', value: '< 4 საათი' },
        { label: 'ღონისძიება წელიწადში', value: '180+' },
      ],
      [
        { label: 'საფეხბურთო / რაგბი', value: 'ბალახის საფარი, ზონალური' },
        { label: 'საკალათბურთო', value: 'პარკეტი, აკუსტიკა' },
        { label: 'კონცერტი / ივენთი', value: 'Stage 360°, end-stage' },
      ],
      [
        { label: 'ნაკადის მართვა', value: 'Turnstile + LiDAR count' },
        { label: 'ბილეთი და წვდომა', value: 'Dynamic QR, reseller API' },
        { label: 'მოედნის მდგომარეობა', value: 'Turf moisture / temp' },
      ],
      [
        { label: 'UEFA / FIBA ინფრასტრუქტურა', value: 'კატეგორია 3+' },
        { label: 'ევაკუაცია', value: '8 წუთი სრული დარბაზი' },
        { label: 'წნევის ნორმა', value: 'ღამის რეჟიმის გათვლა' },
      ],
    ],
  },
];
