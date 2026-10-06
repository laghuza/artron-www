import { MASTERY_MODULES } from '@/components/landing/pure-sports-mirror/data/masteryDimensionData';
import { SPEC_TILE_CATEGORIES } from '@/components/landing/pure-sports-mirror/data/mirrorDataTypes';
import { TILE_FOCUS_POSES } from '@/components/landing/pure-sports-mirror/scene3d/sceneConfig';

describe('International Masters (MST-01 / MSIC ELITE) System Mirror Implementation', () => {
  it('should have exact data parity for MST-01 MSIC Elite module', () => {
    const trophyMod = MASTERY_MODULES.find((m) => m.id === 'trophy');
    expect(trophyMod).toBeDefined();
    if (!trophyMod) return;

    expect(trophyMod.name).toBe('საერთაშორისო ოსტატები');
    expect(trophyMod.kicker).toBe('MST-01 / MSIC ELITE');
    expect(trophyMod.headline).toBe('ელიტა მოითხოვს დამტკიცებულ ისტორიას.');
    expect(trophyMod.sceneVariant).toBe('trophy');
    expect(trophyMod.cameraTags).toEqual(['ELITE RING', 'DISCIPLINE BANNERS', 'MOCAP VOLUME', 'PROTOCOL CHAIN']);
    expect(trophyMod.notes).toHaveLength(4);
    expect(trophyMod.specRows).toHaveLength(4);

    // Verify 4 rows in each spec tile
    expect(trophyMod.specRows[0]).toHaveLength(4);
    expect(trophyMod.specRows[1]).toHaveLength(4);
    expect(trophyMod.specRows[2]).toHaveLength(4);
    expect(trophyMod.specRows[3]).toHaveLength(4);

    // Tile 0 metrics
    expect(trophyMod.specRows[0][0]).toEqual({ label: 'MSIC ათლეტი', value: '37 აქტიური' });
    expect(trophyMod.specRows[0][1]).toEqual({ label: 'საერთაშორისო სტარტი', value: '9 წელიწადში' });
    expect(trophyMod.specRows[0][2]).toEqual({ label: 'ოლიმპიური ციკლი', value: '4 წელი · 3 მეოთხედი გავლილი' });
    expect(trophyMod.specRows[0][3]).toEqual({ label: 'დოსიეს აწყობა', value: 'კვირებიდან → 2 საათამდე' });

    // Tile 1 metrics
    expect(trophyMod.specRows[1][0]).toEqual({ label: 'ინდივიდუალური', value: 'მძლეოსნობა · ცურვა · ძალოსნობა' });
    expect(trophyMod.specRows[1][1]).toEqual({ label: 'საბრძოლო', value: 'ჭიდაობა · ძიუდო · კრივი' });
    expect(trophyMod.specRows[1][2]).toEqual({ label: 'გუნდური', value: 'რაგბი · კალათბურთი' });
    expect(trophyMod.specRows[1][3]).toEqual({ label: 'ნორმატივის წყარო', value: 'თითო ფედერაციის ცხრილი' });

    // Tile 2 metrics
    expect(trophyMod.specRows[2][0]).toEqual({ label: 'შედეგის ვერიფიკაცია', value: 'ოქმის ციფრული ხელმოწერა' });
    expect(trophyMod.specRows[2][1]).toEqual({ label: 'ბიომექანიკა', value: 'Motion capture 240 fps' });
    expect(trophyMod.specRows[2][2]).toEqual({ label: 'შედარებითი ანალიტიკა', value: 'World-rank benchmark' });
    expect(trophyMod.specRows[2][3]).toEqual({ label: 'გადახრის სიგნალი', value: 'ტექნიკის რეგრესი 7 დღეში' });

    // Tile 3 metrics
    expect(trophyMod.specRows[3][0]).toEqual({ label: 'ნორმატივი', value: 'ეროვნული კლასიფიკაცია' });
    expect(trophyMod.specRows[3][1]).toEqual({ label: 'ანტიდოპინგი', value: 'WADA · ADAMS whereabouts' });
    expect(trophyMod.specRows[3][2]).toEqual({ label: 'წარდგინება', value: 'სამინისტროს რეგლამენტი' });
    expect(trophyMod.specRows[3][3]).toEqual({ label: 'დოკუმენტის ჯაჭვი', value: '4 ოქმიდან 3 დადასტურებული' });

    // Notes verification
    expect(trophyMod.notes[0]).toContain('ელიტა ერთეულებით ითვლება');
    expect(trophyMod.notes[1]).toContain('ყოველ დისციპლინას თავისი ნორმატივი');
    expect(trophyMod.notes[2]).toContain('მოძრაობის ჩანაწერი და მსოფლიო რეიტინგი');
    expect(trophyMod.notes[3]).toContain('სტატუსი მაშინ იბადება');
  });

  it('should match the 4 spec tile category titles and subtitles', () => {
    expect(SPEC_TILE_CATEGORIES).toHaveLength(4);
    expect(SPEC_TILE_CATEGORIES[0]).toEqual({ title: 'მასშტაბი', subtitle: 'SCALE & CAPACITY' });
    expect(SPEC_TILE_CATEGORIES[1]).toEqual({ title: 'დისციპლინები', subtitle: 'DISCIPLINES' });
    expect(SPEC_TILE_CATEGORIES[2]).toEqual({ title: 'საკვანძო ტექნოლოგია', subtitle: 'TELEMETRY / RFID / BIO' });
    expect(SPEC_TILE_CATEGORIES[3]).toEqual({ title: 'უმაღლესი სტანდარტი', subtitle: 'COMPLIANCE' });
  });

  it('should have all 4 camera focus poses defined for trophy matching Claude design', () => {
    const trophyPoses = TILE_FOCUS_POSES.trophy;
    expect(trophyPoses).toBeDefined();
    expect(trophyPoses).toHaveLength(4);
    expect(trophyPoses[0]).toEqual([0, 1.7, 6.6, 0, -0.1, 0]);
    expect(trophyPoses[1]).toEqual([-3.6, 1.0, 3.0, -2.95, 0.25, 0]);
    expect(trophyPoses[2]).toEqual([3.6, 0.9, 3.0, 2.95, 0.15, 0]);
    expect(trophyPoses[3]).toEqual([0, 1.6, 5.2, 0, -0.62, 2.55]);
  });
});
