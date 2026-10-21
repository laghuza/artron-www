import { ALL_DIMENSIONS, SPEC_TILE_CATEGORIES } from '@/components/landing/pure-sports-mirror/data';
import { SCENE_VIEWS, TILE_FOCUS_POSES } from '@/components/landing/pure-sports-mirror/scene3d/sceneConfig';

describe('Phase 49: Court Systems (Tennis & Padel) Claude Design Parity', () => {
  const venuesDim = ALL_DIMENSIONS.find((d) => d.id === 'venues');
  const courtMod = venuesDim?.modules.find((m) => m.id === 'court');

  it('should find court module in venues dimension', () => {
    expect(courtMod).toBeDefined();
    expect(courtMod?.name).toBe('ჩოგბურთი და პადელი');
    expect(courtMod?.kicker).toBe('VEN-03 / COURT SYSTEMS');
    expect(courtMod?.sceneVariant).toBe('court');
  });

  it('should have exact 3-line kinetic headline structure matching Claude design', () => {
    expect(courtMod?.headline).toBe('კორტების 100%-იანი დატვირთვა\nდა ჭკვიანი განათება.');
  });

  it('should have exact corrected description copy matching Claude design', () => {
    expect(courtMod?.description).toBe(
      'ბოლო წუთს გაუქმებული ჯავშნები, ცარიელ კორტზე ჩართული განათების ხარჯი და სატელეფონო ჩაწერის ქაოსი ობიექტის მომგებიანობას მკვეთრად ამცირებს. Artron-ის ჭკვიანი სისტემა გაუქმებულ სლოტს ავტომატურად ავსებს ლოდინის სიიდან და განათებას/დაშვებას მხოლოდ დადასტურებული თამაშის დროს ააქტიურებს.'
    );
  });

  it('should have exact spec rows for scale, disciplines, telemetry and compliance', () => {
    expect(courtMod?.specRows).toHaveLength(4);
    // Tile 0: Scale
    expect(courtMod?.specRows[0]).toEqual([
      { label: 'კორტების რაოდენობა', value: '4 ჩოგბურთი · 6 პადელი' },
      { label: 'სლოტების შევსება', value: '87% საშუალო დატვირთვა' },
      { label: 'წინასწარი ჯავშანი', value: '30 დღის ფანჯარა' },
    ]);
    // Tile 1: Disciplines
    expect(courtMod?.specRows[1]).toEqual([
      { label: 'ჩოგბურთის საფარი', value: 'Hard · Clay · Indoor' },
      { label: 'პადელის კორტები', value: 'Panoramic Glass' },
      { label: 'სკვოში / ბადმინტონი', value: 'მულტიფუნქციური ბლოკი' },
    ]);
    // Tile 2: Telemetry
    expect(courtMod?.specRows[2]).toEqual([
      { label: 'ჭკვიანი განათება', value: 'ყოფნის სენსორით (Presence LED)' },
      { label: 'მატჩის ანალიტიკა', value: 'Court Cam · Dwell Time' },
      { label: 'ავტონომიური წვდომა', value: 'დინამიური QR · PIN კოდი' },
    ]);
    // Tile 3: Compliance
    expect(courtMod?.specRows[3]).toEqual([
      { label: 'ITF / FIP სტანდარტი', value: 'საერთაშორისო გეომეტრია' },
      { label: 'განათების ინტენსივობა', value: '500–750 lux (ტურნირის რეჟიმი)' },
      { label: 'დაზღვევა', value: 'პასუხისმგებლობის პოლისი' },
    ]);
  });

  it('should have 4 camera tags', () => {
    expect(courtMod?.cameraTags).toEqual([
      'WIDE ESTABLISH',
      'DISCIPLINE PASS',
      'TECH CLOSE-UP',
      'STANDARD SWEEP',
    ]);
  });

  it('should have 3D court scene configuration and 4 camera poses', () => {
    expect(SCENE_VIEWS.court).toEqual([0, 0.32, 1.04]);
    expect(TILE_FOCUS_POSES.court).toHaveLength(4);
    expect(TILE_FOCUS_POSES.court[0]).toEqual([0, 5.2, 6.2, 0, -1.0, 0]);
  });
});
