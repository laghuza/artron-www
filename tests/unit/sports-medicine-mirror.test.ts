import { WORKFORCE_MODULES } from '@/components/landing/pure-sports-mirror/data/workforceDimensionData';
import { SPEC_TILE_CATEGORIES } from '@/components/landing/pure-sports-mirror/data/mirrorDataTypes';
import { TILE_FOCUS_POSES } from '@/components/landing/pure-sports-mirror/scene3d/sceneConfig';

describe('Sports Medicine & Rehabilitation (HC-02) System Mirror Implementation', () => {
  it('should have exact data parity for HC-02 sports medicine module', () => {
    const medMod = WORKFORCE_MODULES.find((m) => m.id === 'med');
    expect(medMod).toBeDefined();
    if (!medMod) return;

    expect(medMod.name).toBe('ექიმები და რეაბილიტაცია');
    expect(medMod.kicker).toBe('HC-02 / SPORTS MEDICINE');
    expect(medMod.headline).toBe('ათლეტი ბრუნდება,\nროცა სხეული\nმზადაა.');
    expect(medMod.description).toContain('სამედიცინო ჩანაწერი ფურცელზეა');
    expect(medMod.cameraTags).toEqual(['TREATMENT BAY', 'JOINT SCAN', 'BIOMETRICS', 'RTP GATES']);
    expect(medMod.notes).toHaveLength(4);
    expect(medMod.specRows).toHaveLength(4);

    // Verify 4 rows in each spec tile
    expect(medMod.specRows[0]).toHaveLength(4);
    expect(medMod.specRows[1]).toHaveLength(4);
    expect(medMod.specRows[2]).toHaveLength(4);
    expect(medMod.specRows[3]).toHaveLength(4);

    // Verify specific key metrics matching Claude handoff and screenshot
    expect(medMod.specRows[0][0]).toEqual({ label: 'სამედიცინო შტაბი', value: '9 ექიმი · 12 რეაბილიტოლოგი' });
    expect(medMod.specRows[0][1]).toEqual({ label: 'ათლეტის ბარათი', value: '1 400 აქტიური' });
    expect(medMod.specRows[0][2]).toEqual({ label: 'სკრინინგი', value: 'კვარტალში ერთხელ' });
    expect(medMod.specRows[0][3]).toEqual({ label: 'ექიმი ↔ მწვრთნელი', value: 'ერთი საერთო ბარათი' });

    expect(medMod.specRows[1][0]).toEqual({ label: 'ორთოპედია', value: 'სახსარი · მუხლი' });
    expect(medMod.specRows[1][1]).toEqual({ label: 'ფიზიოთერაპია', value: 'Manual · instrumental' });

    expect(medMod.specRows[2][0]).toEqual({ label: 'დილის შემოწმება', value: 'HRV · ძილი · SpO₂' });
    expect(medMod.specRows[2][1]).toEqual({ label: 'რისკის ქულა', value: 'ყოველდღიური · 0–100' });

    expect(medMod.specRows[3][0]).toEqual({ label: 'სამედიცინო მონაცემები', value: 'GDPR Art. 9 რეჟიმი' });
    expect(medMod.specRows[3][1]).toEqual({ label: 'წვდომა', value: 'მხოლოდ ექიმი + ათლეტი' });

    // Verify notes match offline handoff specifications
    expect(medMod.notes?.[0]).toContain('წითელი ჯვარი — სამედიცინო ბლოკი');
    expect(medMod.notes?.[1]).toContain('სკანერის რგოლი');
    expect(medMod.notes?.[2]).toContain('გული — პულსი და HRV');
    expect(medMod.notes?.[3]).toContain('ყავარჯნებიდან ბურთამდე');
  });

  it('should match the 4 spec tile category titles and subtitles', () => {
    expect(SPEC_TILE_CATEGORIES).toHaveLength(4);
    expect(SPEC_TILE_CATEGORIES[0]).toEqual({ title: 'მასშტაბი', subtitle: 'SCALE & CAPACITY' });
    expect(SPEC_TILE_CATEGORIES[1]).toEqual({ title: 'დისციპლინები', subtitle: 'DISCIPLINES' });
    expect(SPEC_TILE_CATEGORIES[2]).toEqual({ title: 'საკვანძო ტექნოლოგია', subtitle: 'TELEMETRY / RFID / BIO' });
    expect(SPEC_TILE_CATEGORIES[3]).toEqual({ title: 'უმაღლესი სტანდარტი', subtitle: 'COMPLIANCE' });
  });

  it('should have all 4 camera focus poses defined for med matching handoff poses', () => {
    const medPoses = TILE_FOCUS_POSES.med;
    expect(medPoses).toBeDefined();
    expect(medPoses).toHaveLength(4);
    expect(medPoses[0]).toEqual([0, 2.8, 5.4, 0, -0.5, 0]);
    expect(medPoses[1]).toEqual([1.3, 1.1, 2.4, 0, 0.2, 0]);
    expect(medPoses[2]).toEqual([3.4, 1.1, 2.4, 2.7, 0.45, 0]);
    expect(medPoses[3]).toEqual([-3.7, 0.9, 2.4, -2.8, -0.6, 0]);
  });
});
