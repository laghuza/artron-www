import { MASTERY_MODULES } from '@/components/landing/pure-sports-mirror/data/masteryDimensionData';
import { SPEC_TILE_CATEGORIES } from '@/components/landing/pure-sports-mirror/data/mirrorDataTypes';
import { TILE_FOCUS_POSES } from '@/components/landing/pure-sports-mirror/scene3d/sceneConfig';

describe('Masters & Champions (MST-02 / MASTERS & CHAMPIONS) System Mirror Implementation', () => {
  it('should have exact data parity for MST-02 Masters & Champions module matching Claude design', () => {
    const podiumMod = MASTERY_MODULES.find((m) => m.id === 'podium');
    expect(podiumMod).toBeDefined();
    if (!podiumMod) return;

    expect(podiumMod.name).toBe('ოსტატები და ჩემპიონები');
    expect(podiumMod.kicker).toBe('MST-02 / MASTERS & CHAMPIONS');
    expect(podiumMod.headline).toBe('ჩემპიონი არ იბადება — აღირიცხება.');
    expect(podiumMod.description).toContain(
      'ოსტატის წოდება სამი რგოლის ნამრავლია: სტარტი, შედეგი და ხელმოწერილი ოქმი.'
    );
    expect(podiumMod.description).toContain(
      'დღეს სამივე სხვადასხვა ფედერაციის ცხრილშია და ჯაჭვის აღდგენა ყოველ ჯერზე ხელით იწყება'
    );
    expect(podiumMod.sceneVariant).toBe('podium');
    expect(podiumMod.cameraTags).toEqual([
      'PODIUM & SEASON RING',
      'CATEGORY LADDER',
      'RESULT → RANK CHAIN',
      'CLASSIFICATION CODEX',
    ]);
    expect(podiumMod.notes).toHaveLength(4);
    expect(podiumMod.specRows).toHaveLength(4);

    // Verify 4 rows in each spec tile (4x4 matrix)
    expect(podiumMod.specRows[0]).toHaveLength(4);
    expect(podiumMod.specRows[1]).toHaveLength(4);
    expect(podiumMod.specRows[2]).toHaveLength(4);
    expect(podiumMod.specRows[3]).toHaveLength(4);

    // Tile 0 metrics (Scale & Capacity)
    expect(podiumMod.specRows[0][0]).toEqual({ label: 'ოსტატის წოდება', value: '124 მფლობელი' });
    expect(podiumMod.specRows[0][1]).toEqual({ label: 'სეზონური სტარტი', value: '46 ტურნირი' });
    expect(podiumMod.specRows[0][2]).toEqual({ label: 'მედლის კონვერსია', value: '31%' });
    expect(podiumMod.specRows[0][3]).toEqual({ label: 'წოდებამდე მანძილი', value: 'საშუალოდ 2 სტარტი' });

    // Tile 1 metrics (Disciplines)
    expect(podiumMod.specRows[1][0]).toEqual({ label: 'ეროვნული ჩემპიონატი', value: 'ყველა წონითი კატეგორია' });
    expect(podiumMod.specRows[1][1]).toEqual({ label: 'თასების სისტემა', value: 'Cup · league' });
    expect(podiumMod.specRows[1][2]).toEqual({ label: 'ვეტერანთა კლასი', value: 'Masters 35+' });
    expect(podiumMod.specRows[1][3]).toEqual({ label: 'კატეგორიის ცვლა', value: 'წონის ისტორიით დადასტურებული' });

    // Tile 2 metrics (Telemetry / RFID / Bio)
    expect(podiumMod.specRows[2][0]).toEqual({ label: 'შედეგის ჯაჭვი', value: 'Result → protocol → rank' });
    expect(podiumMod.specRows[2][1]).toEqual({ label: 'რეიტინგის ძრავა', value: 'Elo-ტიპის მოდელი' });
    expect(podiumMod.specRows[2][2]).toEqual({ label: 'მედალიონის RFID', value: 'ნამდვილობის შემოწმება' });
    expect(podiumMod.specRows[2][3]).toEqual({ label: 'ოქმის მიღება', value: 'ფედერაციის API · ავტომატური' });

    // Tile 3 metrics (Compliance)
    expect(podiumMod.specRows[3][0]).toEqual({ label: 'კლასიფიკაცია', value: 'ფედერაციის წესდება' });
    expect(podiumMod.specRows[3][1]).toEqual({ label: 'მოსამართლის დაშვება', value: 'ლიცენზიის რეესტრი' });
    expect(podiumMod.specRows[3][2]).toEqual({ label: 'აპელაცია', value: '72 საათიანი ფანჯარა' });
    expect(podiumMod.specRows[3][3]).toEqual({ label: 'სადავო შედეგი', value: 'გაყინული გადაწყვეტამდე' });

    // Notes verification
    expect(podiumMod.notes[0]).toContain('სეზონის რგოლზე თითოეული სტარტია აღნიშნული');
    expect(podiumMod.notes[1]).toContain('კატეგორია და ლიგა განსაზღვრავს');
    expect(podiumMod.notes[2]).toContain('შედეგი ოქმად, ოქმი წოდებად');
    expect(podiumMod.notes[3]).toContain('სადავო შედეგი რეიტინგში არ ჩაითვლება');
  });

  it('should match the 4 spec tile category titles and subtitles', () => {
    expect(SPEC_TILE_CATEGORIES).toHaveLength(4);
    expect(SPEC_TILE_CATEGORIES[0]).toEqual({ title: 'მასშტაბი', subtitle: 'SCALE & CAPACITY' });
    expect(SPEC_TILE_CATEGORIES[1]).toEqual({ title: 'დისციპლინები', subtitle: 'DISCIPLINES' });
    expect(SPEC_TILE_CATEGORIES[2]).toEqual({ title: 'საკვანძო ტექნოლოგია', subtitle: 'TELEMETRY / RFID / BIO' });
    expect(SPEC_TILE_CATEGORIES[3]).toEqual({ title: 'უმაღლესი სტანდარტი', subtitle: 'COMPLIANCE' });
  });

  it('should have all 4 camera focus poses defined for podium matching Claude design', () => {
    const podiumPoses = TILE_FOCUS_POSES.podium;
    expect(podiumPoses).toBeDefined();
    expect(podiumPoses).toHaveLength(4);
    expect(podiumPoses[0]).toEqual([0, 1.8, 6.8, 0, -0.3, 0]);
    expect(podiumPoses[1]).toEqual([-3.6, 0.9, 3.0, -2.95, 0.2, 0]);
    expect(podiumPoses[2]).toEqual([3.6, 0.9, 3.0, 2.95, 0.2, 0]);
    expect(podiumPoses[3]).toEqual([0, 1.6, 5.2, 0, -0.66, 2.55]);
  });
});
