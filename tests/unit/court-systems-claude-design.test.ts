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
      { label: 'ავტონომიური შესვლა', value: 'დინამიური QR / SMS PIN კოდი' },
      { label: 'თამაშის დროის ფიქსაცია', value: 'სინათლე და კარი იხსნება სლოტზე' },
      { label: '24/7 უპერსონალო რეჟიმი', value: 'რეცეფციის გარეშე მართვადი კორტი' },
    ]);
    // Tile 1: Disciplines
    expect(courtMod?.specRows[1]).toEqual([
      { label: 'სლოტების ონლაინ გაყიდვა', value: '100% წინასწარი გადახდა აპში' },
      { label: 'ცარიელი საათების შევსება', value: 'დინამიური ფასდაკლება Off-peak' },
      { label: 'ლოდინის სია (Waitlist)', value: 'გაუქმებისას სლოტი იყიდება წამებში' },
    ]);
    // Tile 2: Telemetry
    expect(courtMod?.specRows[2]).toEqual([
      { label: 'ჭკვიანი განათება (Presence LED)', value: 'მხოლოდ თამაშისას (-35% ხარჯი)' },
      { label: 'მოთამაშეთა მატჩ-მეიკინგი', value: 'პარტნიორის პოვნა რეიტინგით' },
      { label: 'ინვენტარის გაქირავება', value: 'ჩოგნების/ბურთების ავტო-ჩამოწერა' },
    ]);
    // Tile 3: Compliance
    expect(courtMod?.specRows[3]).toEqual([
      { label: 'გაუქმების პოლიტიკა', value: '24 სთ-მდე თანხის შენარჩუნების წესი' },
      { label: 'მწვრთნელის კორტის საათები', value: 'ინდივიდუალური გაკვეთილების ლოგი' },
      { label: 'ფინანსური რეპორტინგი', value: 'შემოსავალი თითოეულ კორტზე ცალკე' },
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
