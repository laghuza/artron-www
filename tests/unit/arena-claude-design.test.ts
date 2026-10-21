import { VENUES_MODULES } from '@/components/landing/pure-sports-mirror/data/venuesDimensionData';
import { TILE_FOCUS_POSES } from '@/components/landing/pure-sports-mirror/scene3d/sceneConfig';

describe('Phase 46: Arena & Stadiums Claude Design Compliance', () => {
  it('should have arena module defined with exact Claude Design copy and camera tags', () => {
    const arenaMod = VENUES_MODULES.find((m) => m.id === 'arena');
    expect(arenaMod).toBeDefined();
    expect(arenaMod?.headline).toBe('მრავალფუნქციური არენის\nცენტრალიზებული კონტროლი.');
    expect(arenaMod?.kicker).toBe('VEN-05 / MULTIPURPOSE ARENA');
    expect(arenaMod?.cameraTags).toEqual([
      'WIDE ESTABLISH',
      'DISCIPLINE PASS',
      'TECH CLOSE-UP',
      'STANDARD SWEEP',
    ]);
    expect(arenaMod?.specRows[0][2].value).toBe('180+ საერთაშორისო ივენთი');
    expect(arenaMod?.specRows[3][2].label).toBe('ჰაერის ხარისხი & HVAC');
  });

  it('should have all 4 camera focus poses defined for arena matching Claude Design', () => {
    const arenaPoses = TILE_FOCUS_POSES.arena;
    expect(arenaPoses).toBeDefined();
    expect(arenaPoses.length).toBe(4);
    // Pose 0: WIDE ESTABLISH
    expect(arenaPoses[0]).toEqual([0, 6.6, 9.4, 0, -1.0, 0]);
    // Pose 1: DISCIPLINE PASS
    expect(arenaPoses[1]).toEqual([0, 1.5, 4.8, 0, -1.15, 0]);
    // Pose 2: TECH CLOSE-UP
    expect(arenaPoses[2]).toEqual([4.8, 2.8, 4.2, 3.9, 0.5, 3.0]);
    // Pose 3: STANDARD SWEEP
    expect(arenaPoses[3]).toEqual([0, 2.2, 7.8, 0, 0.1, 0]);
  });
});
