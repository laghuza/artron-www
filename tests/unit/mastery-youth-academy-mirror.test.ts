import { MASTERY_MODULES } from '@/components/landing/pure-sports-mirror/data/masteryDimensionData';
import { SPEC_TILE_CATEGORIES } from '@/components/landing/pure-sports-mirror/data/mirrorDataTypes';
import { TILE_FOCUS_POSES } from '@/components/landing/pure-sports-mirror/scene3d/sceneConfig';

describe('Youth Academy (MST-05 / YOUTH ACADEMY) System Mirror Implementation', () => {
  it('should have exact data parity for MST-05 Youth Academy module matching Claude screenshots', () => {
    const academyMod = MASTERY_MODULES.find((m) => m.id === 'academy');
    expect(academyMod).toBeDefined();
    if (!academyMod) return;

    expect(academyMod.name).toBe('იუნიორთა აკადემიები');
    expect(academyMod.kicker).toBe('MST-05 / YOUTH ACADEMY');
    expect(academyMod.headline).toBe('ახალგაზრდა ტალანტის განვითარების\nუსაფრთხო ეკოსისტემა.');
    expect(academyMod.description).toContain(
      'სპორტული აკადემიის წარმატება მომავალი თაობის სწორ აღზრდაზე დგას.'
    );
    expect(academyMod.description).toContain(
      'Artron U8–U18 ასაკობრივ ტრაექტორიას ერთიან სისტემაში აერთიანებს'
    );
    expect(academyMod.sceneVariant).toBe('academy');
    expect(academyMod.cameraTags).toEqual([
      'AGE-STEP COHORTS',
      'SPECIALISATION PODS',
      'GROWTH & SKILL PANEL',
      'CONSENT GATE',
    ]);
    expect(academyMod.notes).toHaveLength(4);
    expect(academyMod.specRows).toHaveLength(4);

    // Verify 4 rows in each spec tile (4x4 matrix) matching screenshots
    expect(academyMod.specRows[0]).toHaveLength(4);
    expect(academyMod.specRows[1]).toHaveLength(4);
    expect(academyMod.specRows[2]).toHaveLength(4);
    expect(academyMod.specRows[3]).toHaveLength(4);

    // Tile 0 metrics (Scale & Capacity)
    expect(academyMod.specRows[0][0]).toEqual({ label: 'აღსაზრდელთა ბაზა', value: '1 850 იუნიორი' });
    expect(academyMod.specRows[0][1]).toEqual({ label: 'ასაკობრივი საფეხურები', value: 'U8 – U18 · 6 ეტაპი' });
    expect(academyMod.specRows[0][2]).toEqual({ label: 'შენარჩუნების მაჩვენებელი', value: '74% სეზონური Retention' });
    expect(academyMod.specRows[0][3]).toEqual({ label: 'გასვლის ადრეული სიგნალი', value: '3 გაცდენა ზედიზედ (AI ალერტი)' });

    // Tile 1 metrics (Disciplines)
    expect(academyMod.specRows[1][0]).toEqual({ label: 'საბაზისო ფიზიკური მომზადება', value: 'ABC · კოორდინაცია · მოქნილობა' });
    expect(academyMod.specRows[1][1]).toEqual({ label: 'სპეციალიზაცია', value: '9 სპორტული მიმართულება' });
    expect(academyMod.specRows[1][2]).toEqual({ label: 'სასწავლო მატჩები', value: 'რეგიონული ლიგა + საბავშვო ფესტივალი' });
    expect(academyMod.specRows[1][3]).toEqual({ label: 'ადრეული სპეციალიზაცია', value: 'მკაცრად შეზღუდული U12-მდე' });

    // Tile 2 metrics (Telemetry / RFID / Bio)
    expect(academyMod.specRows[2][0]).toEqual({ label: 'ზრდის მონიტორინგი', value: 'PHV · ბიოლოგიური სიმაღლის მრუდი' });
    expect(academyMod.specRows[2][1]).toEqual({ label: 'უნარების ბარათი', value: 'Skill Matrix 18 პარამეტრით' });
    expect(academyMod.specRows[2][2]).toEqual({ label: 'მშობლის პორტალი', value: 'დაცული Read-Only მობილური წვდომა' });
    expect(academyMod.specRows[2][3]).toEqual({ label: 'დატვირთვა ზრდის პიკზე', value: 'ავტომატური ადაპტური შემცირება' });

    // Tile 3 metrics (Compliance)
    expect(academyMod.specRows[3][0]).toEqual({ label: 'COPPA რეგულაცია', value: 'მშობლის ვერიფიცირებული თანხმობა' });
    expect(academyMod.specRows[3][1]).toEqual({ label: 'GDPR-K ბავშვთა დაცვა', value: 'მონაცემთა მკაცრი მინიმიზაცია' });
    expect(academyMod.specRows[3][2]).toEqual({ label: 'Safeguarding პროტოკოლი', value: 'მწვრთნელთა პერსონალური შემოწმება' });
    expect(academyMod.specRows[3][3]).toEqual({ label: 'წვდომის უსაფრთხოების ლოგი', value: 'ვინ და როდის ნახა ბავშვის მონაცემი' });

    // Notes verification
    expect(academyMod.notes![0]).toContain('კიბის თითოეული საფეხური ცალკე კოჰორტაა');
    expect(academyMod.notes![1]).toContain('ადრეული ვიწრო სპეციალიზაცია ნიჭს კლავს');
    expect(academyMod.notes![2]).toContain('ზრდის პიკი ტრავმის ყველაზე მაღალი რისკია');
    expect(academyMod.notes![3]).toContain('ბავშვის მონაცემზე წვდომა დალუქულია');
  });

  it('should match the 4 spec tile category titles and subtitles', () => {
    expect(SPEC_TILE_CATEGORIES).toHaveLength(4);
    expect(SPEC_TILE_CATEGORIES[0]).toEqual({ title: 'გამტარუნარიანობა', subtitle: 'SCALE & CAPACITY' });
    expect(SPEC_TILE_CATEGORIES[1]).toEqual({ title: 'სპორტული ზონები', subtitle: 'DISCIPLINES' });
    expect(SPEC_TILE_CATEGORIES[2]).toEqual({ title: 'საკვანძო ტექნოლოგია', subtitle: 'TELEMETRY / RFID / BIO' });
    expect(SPEC_TILE_CATEGORIES[3]).toEqual({ title: 'სტანდარტები & უსაფრთხოება', subtitle: 'COMPLIANCE & AUDIT' });
  });

  it('should have all 4 camera focus poses defined for academy matching Claude design', () => {
    const academyPoses = TILE_FOCUS_POSES.academy;
    expect(academyPoses).toBeDefined();
    expect(academyPoses).toHaveLength(4);
    expect(academyPoses[0]).toEqual([0, 3.2, 7.2, 0, -0.5, 0]);
    expect(academyPoses[1]).toEqual([-3.7, 1.0, 3.1, -2.95, 0.05, 0]);
    expect(academyPoses[2]).toEqual([3.7, 1.0, 3.1, 2.95, 0.3, 0]);
    expect(academyPoses[3]).toEqual([0, 1.6, 5.3, 0, -0.66, 2.6]);
  });
});
