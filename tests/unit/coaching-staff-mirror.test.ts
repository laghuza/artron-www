import { WORKFORCE_MODULES } from '@/components/landing/pure-sports-mirror/data/workforceDimensionData';
import { SPEC_TILE_CATEGORIES } from '@/components/landing/pure-sports-mirror/data/mirrorDataTypes';
import { TILE_FOCUS_POSES } from '@/components/landing/pure-sports-mirror/scene3d/sceneConfig';

describe('Coaching Staff (HC-01) System Mirror Implementation', () => {
  it('should have exact data parity for HC-01 coaching staff module', () => {
    const coachMod = WORKFORCE_MODULES.find((m) => m.id === 'coach');
    expect(coachMod).toBeDefined();
    if (!coachMod) return;

    expect(coachMod.kicker).toBe('HC-01 / COACHING STAFF');
    expect(coachMod.headline).toBe('მწვრთნელი მიდის — მეთოდიკა რჩება.');
    expect(coachMod.cameraTags).toEqual(['STAFF FLOOR', 'GAME MODEL', 'GPS LOAD', 'LICENCE WALL']);
    expect(coachMod.notes).toHaveLength(4);
    expect(coachMod.specRows).toHaveLength(4);

    // Verify 4 rows in each spec tile
    expect(coachMod.specRows[0]).toHaveLength(4);
    expect(coachMod.specRows[1]).toHaveLength(4);
    expect(coachMod.specRows[2]).toHaveLength(4);
    expect(coachMod.specRows[3]).toHaveLength(4);

    // Verify specific key metrics
    expect(coachMod.specRows[0][0].label).toBe('შტაბი');
    expect(coachMod.specRows[0][1].label).toBe('მწვრთნელი / ათლეტი');
    expect(coachMod.specRows[2][0].label).toBe('დატვირთვის მართვა');
    expect(coachMod.specRows[2][1].label).toBe('უსაფრთხო დიაპაზონი');
    expect(coachMod.specRows[3][0].label).toBe('მწვრთნელის ლიცენზია');

    // Verify notes match offline handoff specifications
    expect(coachMod.notes[0]).toContain('მაგიდა ტაქტიკური დაფაა');
    expect(coachMod.notes[1]).toContain('ჰოლოგრამა მოედანია');
    expect(coachMod.notes[2]).toContain('GPS ჟილეტი');
    expect(coachMod.notes[3]).toContain('მწვრთნელის ლიცენზია');
  });

  it('should match the 4 spec tile category titles and subtitles', () => {
    expect(SPEC_TILE_CATEGORIES).toHaveLength(4);
    expect(SPEC_TILE_CATEGORIES[0]).toEqual({ title: 'მასშტაბი', subtitle: 'SCALE & CAPACITY' });
    expect(SPEC_TILE_CATEGORIES[1]).toEqual({ title: 'დისციპლინები', subtitle: 'DISCIPLINES' });
    expect(SPEC_TILE_CATEGORIES[2]).toEqual({ title: 'საკვანძო ტექნოლოგია', subtitle: 'TELEMETRY / RFID / BIO' });
    expect(SPEC_TILE_CATEGORIES[3]).toEqual({ title: 'უმაღლესი სტანდარტი', subtitle: 'COMPLIANCE' });
  });

  it('should have all 4 camera focus poses defined for coach matching handoff poses', () => {
    const coachPoses = TILE_FOCUS_POSES.coach;
    expect(coachPoses).toBeDefined();
    expect(coachPoses).toHaveLength(4);
    expect(coachPoses[0]).toEqual([0, 3.4, 5.8, 0, -0.6, 0]);
    expect(coachPoses[1]).toEqual([0, 2.2, 3.0, 0, 0.9, 0]);
    expect(coachPoses[2]).toEqual([3.6, 1.0, 2.4, 2.85, 0.25, 0]);
    expect(coachPoses[3]).toEqual([-3.8, 1.0, 2.2, -2.9, 0.4, 0]);
  });
});
