import { VENUES_MODULES } from '@/components/landing/pure-sports-mirror/data/venuesDimensionData';
import { TILE_FOCUS_POSES } from '@/components/landing/pure-sports-mirror/scene3d/sceneConfig';

describe('Olympic Pool Claude Design Compliance', () => {
  it('should have Olympic pool module defined with exact Claude Design copy, kicker, and camera tags', () => {
    const poolMod = VENUES_MODULES.find((m) => m.id === 'pool');
    expect(poolMod).toBeDefined();
    expect(poolMod?.headline).toBe('წყალი, რომელიც თავად ანგარიშობს.');
    expect(poolMod?.kicker).toBe('VEN-02 / AQUATIC COMPLEX');
    expect(poolMod?.cameraTags).toEqual([
      'WIDE ESTABLISH',
      'DISCIPLINE PASS',
      'TECH CLOSE-UP',
      'STANDARD SWEEP',
    ]);
    expect(poolMod?.specRows[0][0].value).toBe('50 m · 8 ბილიკი');
    expect(poolMod?.specRows[0][1].value).toBe('2 500 m³');
    expect(poolMod?.specRows[0][2].value).toBe('1 100 მოცურავე');
    expect(poolMod?.specRows[2][0].value).toBe('pH · Cl · ORP realtime');
    expect(poolMod?.specRows[3][0].value).toBe('FR 2 სტანდარტი');
  });

  it('should have all 4 camera focus poses defined for pool matching Claude Design', () => {
    const poolPoses = TILE_FOCUS_POSES.pool;
    expect(poolPoses).toBeDefined();
    expect(poolPoses.length).toBe(4);
    // Pose 0: WIDE ESTABLISH
    expect(poolPoses[0]).toEqual([0, 4.8, 7.4, 0, -0.9, 0]);
    // Pose 1: DISCIPLINE PASS
    expect(poolPoses[1]).toEqual([3.2, 0.3, 3.4, 0.5, -0.8, 0]);
    // Pose 2: TECH CLOSE-UP
    expect(poolPoses[2]).toEqual([-4.0, 0.3, 2.0, -4.6, -0.6, 0]);
    // Pose 3: STANDARD SWEEP
    expect(poolPoses[3]).toEqual([0, 1.1, 4.8, 0, -0.8, 2.2]);
  });
});
