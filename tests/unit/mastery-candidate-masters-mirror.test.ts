import { MASTERY_MODULES } from '@/components/landing/pure-sports-mirror/data/masteryDimensionData';
import { SPEC_TILE_CATEGORIES } from '@/components/landing/pure-sports-mirror/data/mirrorDataTypes';
import { TILE_FOCUS_POSES } from '@/components/landing/pure-sports-mirror/scene3d/sceneConfig';

describe('Candidate Masters (MST-03 / CMS PIPELINE) System Mirror Implementation', () => {
  it('should have exact data parity for MST-03 Candidate Masters module matching Claude screenshots', () => {
    const passportMod = MASTERY_MODULES.find((m) => m.id === 'passport');
    expect(passportMod).toBeDefined();
    if (!passportMod) return;

    expect(passportMod.name).toBe('ოსტატობის კანდიდატები');
    expect(passportMod.kicker).toBe('MST-03 / CMS PIPELINE');
    expect(passportMod.headline).toBe('კანდიდატი ერთ\nნორმატივს აკლია.');
    expect(passportMod.description).toBe(
      'კანდიდატები ყველაზე ხშირად სისტემის უყურადღებობის გამო იკარგებიან: ნორმატივი ვადაზე ადრე ამოეწურა, სტარტი არ დაუფიქსირდა, დოკუმენტი დაგვიანდა. Artron თითოეულ კანდიდატს აძლევს ცხად რუკას — რა დარჩა, რომელ ტურნირზე და რა ვადამდე.'
    );
    expect(passportMod.sceneVariant).toBe('passport');
    expect(passportMod.cameraTags).toEqual([
      'WIDE ESTABLISH',
      'DISCIPLINE PASS',
      'TECH CLOSE-UP',
      'STANDARD SWEEP',
    ]);
    expect(passportMod.specRows).toHaveLength(4);

    // Verify 3 rows in each spec tile matching screenshots
    expect(passportMod.specRows[0]).toHaveLength(3);
    expect(passportMod.specRows[1]).toHaveLength(3);
    expect(passportMod.specRows[2]).toHaveLength(3);
    expect(passportMod.specRows[3]).toHaveLength(3);

    // Tile 0 metrics (Scale & Capacity)
    expect(passportMod.specRows[0][0]).toEqual({ label: 'CMS კანდიდატი', value: '268 ათლეტი' });
    expect(passportMod.specRows[0][1]).toEqual({ label: 'საშუალო ასაკი', value: '17.4 წელი' });
    expect(passportMod.specRows[0][2]).toEqual({ label: 'გადასვლის მაჩვენებელი', value: '22% წელიწადში' });

    // Tile 1 metrics (Disciplines)
    expect(passportMod.specRows[1][0]).toEqual({ label: 'სასტარტო კალენდარი', value: 'რეგიონული + ეროვნული' });
    expect(passportMod.specRows[1][1]).toEqual({ label: 'ტესტირების ბატარეა', value: 'Speed • Power • VO2' });
    expect(passportMod.specRows[1][2]).toEqual({ label: 'საკვალიფიკაციო ჯგუფები', value: '6 დისციპლინა' });

    // Tile 2 metrics (Telemetry / RFID / Bio)
    expect(passportMod.specRows[2][0]).toEqual({ label: 'ნორმატივის ტრეკერი', value: 'Gap-to-standard %' });
    expect(passportMod.specRows[2][1]).toEqual({ label: 'პროგრესის მოდელი', value: '12-თვიანი პროგნოზი' });
    expect(passportMod.specRows[2][2]).toEqual({ label: 'დატვირთვის ბალანსი', value: 'ACWR 0.8-1.3' });

    // Tile 3 metrics (Compliance)
    expect(passportMod.specRows[3][0]).toEqual({ label: 'ასაკობრივი ლიმიტი', value: 'ფედერაციის ჩარჩო' });
    expect(passportMod.specRows[3][1]).toEqual({ label: 'სამედიცინო დაშვება', value: 'მუდმივი მონიტორინგი' });
    expect(passportMod.specRows[3][2]).toEqual({ label: 'მშობლის თანხმობა', value: 'არასრულწლოვანებზე' });
  });

  it('should match the 4 spec tile category titles and subtitles', () => {
    expect(SPEC_TILE_CATEGORIES).toHaveLength(4);
    expect(SPEC_TILE_CATEGORIES[0]).toEqual({ title: 'მასშტაბი', subtitle: 'SCALE & CAPACITY' });
    expect(SPEC_TILE_CATEGORIES[1]).toEqual({ title: 'დისციპლინები', subtitle: 'DISCIPLINES' });
    expect(SPEC_TILE_CATEGORIES[2]).toEqual({ title: 'საკვანძო ტექნოლოგია', subtitle: 'TELEMETRY / RFID / BIO' });
    expect(SPEC_TILE_CATEGORIES[3]).toEqual({ title: 'უმაღლესი სტანდარტი', subtitle: 'COMPLIANCE' });
  });

  it('should have all 4 camera focus poses defined for passport matching Claude design', () => {
    const passportPoses = TILE_FOCUS_POSES.passport;
    expect(passportPoses).toBeDefined();
    expect(passportPoses).toHaveLength(4);
    expect(passportPoses[0]).toEqual([0, 0.7, 4.6, 0, 0, 0]);
    expect(passportPoses[1]).toEqual([-1.0, 0.35, 2.4, -0.7, 0.2, 0]);
    expect(passportPoses[2]).toEqual([1.0, 0.2, 2.2, 0.8, -0.3, 0]);
    expect(passportPoses[3]).toEqual([0, 1.9, 3.4, 0, 0, 0]);
  });
});

