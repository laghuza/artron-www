import { WORKFORCE_MODULES } from '@/components/landing/pure-sports-mirror/data/workforceDimensionData';
import { SPEC_TILE_CATEGORIES } from '@/components/landing/pure-sports-mirror/data/mirrorDataTypes';
import { TILE_FOCUS_POSES } from '@/components/landing/pure-sports-mirror/scene3d/sceneConfig';

describe('Administration & Operations (HC-04) System Mirror Implementation', () => {
  it('should have exact data parity for HC-04 ops module matching Claude design', () => {
    const opsMod = WORKFORCE_MODULES.find((m) => m.id === 'ops');
    expect(opsMod).toBeDefined();
    if (!opsMod) return;

    expect(opsMod.kicker).toBe('HC-04 / OPS & COMPLIANCE');
    expect(opsMod.headline).toBe('ოპერაცია ერთ სიმართლეზე დგას.');
    expect(opsMod.cameraTags).toEqual(['ROTA RING', 'DEPARTMENT PODS', 'SERVER / CLOCK-IN', 'AUDIT LEDGER']);
    expect(opsMod.specRows).toHaveLength(4);

    // Verify key metrics across 4 categories
    expect(opsMod.specRows[0][0].label).toBe('პერსონალი');
    expect(opsMod.specRows[0][0].value).toBe('210 თანამშრომელი');
    expect(opsMod.specRows[0][1].label).toBe('ცვლების დაფარვა');
    expect(opsMod.specRows[0][1].value).toBe('24/7 · 3 ცვლა');

    expect(opsMod.specRows[1][0].label).toBe('რეცეფცია და გაყიდვები');
    expect(opsMod.specRows[1][0].value).toBe('Front desk · CRM');
    expect(opsMod.specRows[1][1].label).toBe('ტექნიკური სამსახური');
    expect(opsMod.specRows[1][1].value).toBe('Maintenance · HVAC');
    expect(opsMod.specRows[1][2].label).toBe('სისუფთავე და უსაფრთხოება');
    expect(opsMod.specRows[1][2].value).toBe('Housekeeping · security');

    expect(opsMod.specRows[2][0].label).toBe('ცვლების დაგეგმვა');
    expect(opsMod.specRows[2][1].label).toBe('დროის აღრიცხვა');
    expect(opsMod.specRows[2][1].value).toBe('Biometric clock-in');

    expect(opsMod.specRows[3][0].label).toBe('ბრძანება №01-15/ნ');
    expect(opsMod.specRows[3][0].value).toBe('სრული შესაბამისობა');
    expect(opsMod.specRows[3][1].label).toBe('შრომის უსაფრთხოება');
    expect(opsMod.specRows[3][2].label).toBe('აუდიტის კვალი');
    expect(opsMod.specRows[3][2].value).toBe('უცვლელი ჟურნალი');
  });

  it('should match the 4 spec tile category titles and subtitles', () => {
    expect(SPEC_TILE_CATEGORIES).toHaveLength(4);
    expect(SPEC_TILE_CATEGORIES[0]).toEqual({ title: 'მასშტაბი', subtitle: 'SCALE & CAPACITY' });
    expect(SPEC_TILE_CATEGORIES[1]).toEqual({ title: 'დისციპლინები', subtitle: 'DISCIPLINES' });
    expect(SPEC_TILE_CATEGORIES[2]).toEqual({ title: 'საკვანძო ტექნოლოგია', subtitle: 'TELEMETRY / RFID / BIO' });
    expect(SPEC_TILE_CATEGORIES[3]).toEqual({ title: 'უმაღლესი სტანდარტი', subtitle: 'COMPLIANCE' });
  });

  it('should have all 4 camera focus poses defined for ops matching Claude design poses', () => {
    const poses = TILE_FOCUS_POSES.ops;
    expect(poses).toBeDefined();
    expect(poses).toHaveLength(4);

    // Pose 0: Overview (ROTA RING)
    expect(poses[0]).toEqual([0, 3.6, 5.8, 0, -0.5, 0]);
    // Pose 1: Department pods close-up
    expect(poses[1]).toEqual([0, 1.8, 3.2, 0, -0.95, 0]);
    // Pose 2: Server rack & Clock-in terminal
    expect(poses[2]).toEqual([1.85, 0.5, 2.11, 3.0, -0.25, 0]);
    // Pose 3: Immutable audit ledger stack
    expect(poses[3]).toEqual([-4.2, 0.6, 2.4, -2.9, -0.1, 0]);
  });
});
