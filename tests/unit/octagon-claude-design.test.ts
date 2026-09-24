import { VENUES_MODULES } from '@/components/landing/pure-sports-mirror/data/venuesDimensionData';
import { TILE_FOCUS_POSES, SCENE_VIEWS } from '@/components/landing/pure-sports-mirror/scene3d/sceneConfig';

describe('Octagon Combat Arts - Claude Design & Wall Correction Compliance', () => {
  it('should have octagon module defined with exact Claude Design copy and camera tags', () => {
    const octMod = VENUES_MODULES.find((m) => m.id === 'octagon');
    expect(octMod).toBeDefined();
    expect(octMod?.name).toBe('დოჯოები და რინგი');
    expect(octMod?.kicker).toBe('VEN-04 / COMBAT ARTS');
    expect(octMod?.headline).toBe('ყოველი დარტყმა აღრიცხულია.');
    expect(octMod?.cameraTags).toEqual([
      'WIDE ESTABLISH',
      'DISCIPLINE PASS',
      'TECH CLOSE-UP',
      'STANDARD SWEEP',
    ]);
  });

  it('should have 4 camera focus poses for octagon matching Claude Design', () => {
    const octPoses = TILE_FOCUS_POSES.octagon;
    expect(octPoses).toBeDefined();
    expect(octPoses.length).toBe(4);
    // Pose 0: WIDE ESTABLISH
    expect(octPoses[0]).toEqual([0, 4.4, 5.6, 0, -1.1, 0]);
    // Pose 1: DISCIPLINE PASS
    expect(octPoses[1]).toEqual([1.7, 0.3, 2.3, 0, -1.0, 0]);
    // Pose 2: TECH CLOSE-UP
    expect(octPoses[2]).toEqual([2.3, 0.7, 2.5, 2.0, -0.35, 1.2]);
    // Pose 3: STANDARD SWEEP
    expect(octPoses[3]).toEqual([0, -0.2, 4.4, 0, -0.9, 0]);
  });

  it('should have scene views orbit config defined for octagon', () => {
    const view = SCENE_VIEWS.octagon;
    expect(view).toBeDefined();
    expect(view).toEqual([0, 0.31, 1.06]);
  });
});
