import { WORKFORCE_MODULES } from '@/components/landing/pure-sports-mirror/data/workforceDimensionData';
import { SPEC_TILE_CATEGORIES } from '@/components/landing/pure-sports-mirror/data/mirrorDataTypes';
import { TILE_FOCUS_POSES } from '@/components/landing/pure-sports-mirror/scene3d/sceneConfig';

describe('Lifeguard Corps & Water Safety (HC-05) System Mirror Implementation', () => {
  it('should have exact data parity for HC-05 water safety guard module matching Claude design', () => {
    const guardMod = WORKFORCE_MODULES.find((m) => m.id === 'guard');
    expect(guardMod).toBeDefined();
    if (!guardMod) return;

    expect(guardMod.kicker).toBe('HC-05 / WATER SAFETY');
    expect(guardMod.name).toBe('მაშველთა კორპუსი');
    expect(guardMod.headline).toBe('წყლის უსაფრთხოების უწყვეტი,\nწამიერი მონიტორინგი.');
    expect(guardMod.cameraTags).toEqual(['BASIN OVERVIEW', 'SCAN CONES', 'RESPONSE MESH', 'DRILL BEACON']);
    expect(guardMod.specRows).toHaveLength(4);

    // Verify key metrics across 4 categories
    expect(guardMod.specRows[0][0].label).toBe('წყლის ზონის 100% დაფარვა');
    expect(guardMod.specRows[0][0].value).toBe('მაშველთა საათობრივი როტაციის ავტო-გრაფიკი');
    expect(guardMod.specRows[0][1].label).toBe('დაღლილობის პრევენცია');
    expect(guardMod.specRows[0][1].value).toBe('20-წუთიანი პერიმეტრული ცვლა (ავტო-განგაში)');
    expect(guardMod.specRows[0][2].label).toBe('მრავალზონიანი კონტროლი');
    expect(guardMod.specRows[0][2].value).toBe('ოლიმპიური აუზი, საბავშვო ზონა, აკვაპარკი');

    expect(guardMod.specRows[1][0].label).toBe('ზედაპირის სკანირება');
    expect(guardMod.specRows[1][0].value).toBe('Scan-10/20 საერთაშორისო პროტოკოლი');
    expect(guardMod.specRows[1][1].label).toBe('პირველადი დახმარების მზადყოფნა');
    expect(guardMod.specRows[1][1].value).toBe('AED და სამაშველო აღჭურვილობის შემოწმება');
    expect(guardMod.specRows[1][2].label).toBe('სასწავლო განგაშები');
    expect(guardMod.specRows[1][2].value).toBe('თვეში ერთხელ პრაქტიკული სიმულაციის ლოგი');

    expect(guardMod.specRows[2][0].label).toBe('რეაგირების ციფრული ტაიმერი');
    expect(guardMod.specRows[2][0].value).toBe('Alarm-to-Contact დროის ავტო-აღრიცხვა');
    expect(guardMod.specRows[2][1].label).toBe('Poolside Panic ღილაკები');
    expect(guardMod.specRows[2][1].value).toBe('მყისიერი ხმოვანი და ვიზუალური განგაში');
    expect(guardMod.specRows[2][2].label).toBe('ინციდენტების ელექტრონული ჟურნალი');
    expect(guardMod.specRows[2][2].value).toBe('სადაზღვევო შემთხვევების სრული დოსიე');

    expect(guardMod.specRows[3][0].label).toBe('საერთაშორისო ILS სტანდარტი');
    expect(guardMod.specRows[3][0].value).toBe('შემოწმებებისას ჯარიმებისგან 100% დაცვა');
    expect(guardMod.specRows[3][1].label).toBe('სერტიფიკატების ვადის კონტროლი');
    expect(guardMod.specRows[3][1].value).toBe('ვადაგასული მაშველის ცვლაში დაშვების ბლოკირება');
    expect(guardMod.specRows[3][2].label).toBe('სამართლებრივი პასუხისმგებლობა');
    expect(guardMod.specRows[3][2].value).toBe('ობიექტის სრული იურიდიული დაცულობა');
  });

  it('should match the 4 spec tile category titles and subtitles', () => {
    expect(SPEC_TILE_CATEGORIES).toHaveLength(4);
    expect(SPEC_TILE_CATEGORIES[0]).toEqual({ title: 'გამტარუნარიანობა', subtitle: 'SCALE & CAPACITY' });
    expect(SPEC_TILE_CATEGORIES[1]).toEqual({ title: 'სპორტული ზონები', subtitle: 'DISCIPLINES' });
    expect(SPEC_TILE_CATEGORIES[2]).toEqual({ title: 'საკვანძო ტექნოლოგია', subtitle: 'TELEMETRY / RFID / BIO' });
    expect(SPEC_TILE_CATEGORIES[3]).toEqual({ title: 'სტანდარტები & უსაფრთხოება', subtitle: 'COMPLIANCE & AUDIT' });
  });

  it('should have all 4 camera focus poses defined for guard matching Claude design poses', () => {
    const poses = TILE_FOCUS_POSES.guard;
    expect(poses).toBeDefined();
    expect(poses).toHaveLength(4);

    // Pose 0: Overview (BASIN OVERVIEW)
    expect(poses[0]).toEqual([0, 4.2, 6.6, 0, -0.9, 0]);
    // Pose 1: SCAN CONES
    expect(poses[1]).toEqual([2.4, 1.6, 3.4, 1.0, -0.9, 0.4]);
    // Pose 2: RESPONSE MESH
    expect(poses[2]).toEqual([0, 2.0, 3.4, 0, 0.3, 0]);
    // Pose 3: DRILL BEACON
    expect(poses[3]).toEqual([-4.6, 1.2, 2.0, -3.5, 0.1, 0]);
  });
});
