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
    expect(guardMod.specRows[0][0].label).toBe('მაშველთა კორპუსი');
    expect(guardMod.specRows[0][0].value).toBe('28 პროფესიონალი');
    expect(guardMod.specRows[0][1].label).toBe('დაფარვის ზონა');
    expect(guardMod.specRows[0][1].value).toBe('4 აუზი · 1 აკვაპარკი');
    expect(guardMod.specRows[0][2].label).toBe('როტაციის ინტერვალი');
    expect(guardMod.specRows[0][2].value).toBe('20 წუთი (ავტო-განგაში)');

    expect(guardMod.specRows[1][0].label).toBe('ზედაპირის მეთვალყურეობა');
    expect(guardMod.specRows[1][0].value).toBe('Scan-10/20 საერთაშორისო პროტოკოლი');
    expect(guardMod.specRows[1][1].label).toBe('წყალქვეშა სამაშველო');
    expect(guardMod.specRows[1][1].value).toBe('Deep-Water Rescue აღჭურვილობა');
    expect(guardMod.specRows[1][2].label).toBe('პირველადი დახმარება');
    expect(guardMod.specRows[1][2].value).toBe('CPR · AED · Spinal Board');

    expect(guardMod.specRows[2][0].label).toBe('რეაგირების ტაიმერი');
    expect(guardMod.specRows[2][0].value).toBe('Alarm-to-Contact ციფრული ლოგი');
    expect(guardMod.specRows[2][1].label).toBe('ხედვის კონტროლი');
    expect(guardMod.specRows[2][1].value).toBe('Underwater Detection სენსორები');
    expect(guardMod.specRows[2][2].label).toBe('საგანგაშო ღილაკი');
    expect(guardMod.specRows[2][2].value).toBe('Poolside Panic Mesh სისტემა');

    expect(guardMod.specRows[3][0].label).toBe('ILS სტანდარტი');
    expect(guardMod.specRows[3][0].value).toBe('საერთაშორისო რეკომენდაცია');
    expect(guardMod.specRows[3][1].label).toBe('სერტიფიცირება');
    expect(guardMod.specRows[3][1].value).toBe('ყოველწლიური რე-აკრედიტაცია');
    expect(guardMod.specRows[3][2].label).toBe('პრაქტიკული წვრთნა');
    expect(guardMod.specRows[3][2].value).toBe('თვეში ერთხელ');
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
