import { WORKFORCE_MODULES } from '@/components/landing/pure-sports-mirror/data/workforceDimensionData';
import { SPEC_TILE_CATEGORIES } from '@/components/landing/pure-sports-mirror/data/mirrorDataTypes';
import { TILE_FOCUS_POSES } from '@/components/landing/pure-sports-mirror/scene3d/sceneConfig';

describe('Group Fitness Leaders (HC-03) System Mirror Implementation', () => {
  it('should have exact data parity for HC-03 group fitness leaders module', () => {
    const groupMod = WORKFORCE_MODULES.find((m) => m.id === 'group');
    expect(groupMod).toBeDefined();
    if (!groupMod) return;

    expect(groupMod.name).toBe('ფიტნეს-ინსტრუქტორები');
    expect(groupMod.kicker).toBe('HC-03 / GROUP LEADERS');
    expect(groupMod.headline).toBe('ჯგუფი ივსება\nგანრიგამდე.');
    expect(groupMod.description).toContain('მართული ჯგუფური გაკვეთილი ისეთივე ოპერაა');
    expect(groupMod.cameraTags).toEqual(['STEREO FLOOR', 'CLASS ZONES', 'HR BOARD', 'SPACES / CERT']);
    expect(groupMod.notes).toHaveLength(4);
    expect(groupMod.specRows).toHaveLength(4);

    // Verify 4 rows in each spec tile
    expect(groupMod.specRows[0]).toHaveLength(4);
    expect(groupMod.specRows[1]).toHaveLength(4);
    expect(groupMod.specRows[2]).toHaveLength(4);
    expect(groupMod.specRows[3]).toHaveLength(4);

    // Verify specific key metrics matching Claude handoff and screenshot
    expect(groupMod.specRows[0][0]).toEqual({ label: 'ჯგუფური გაკვეთილი', value: '180 კვირაში' });
    expect(groupMod.specRows[0][1]).toEqual({ label: 'საშუალო დასწრება', value: '82%' });
    expect(groupMod.specRows[0][2]).toEqual({ label: 'ინსტრუქტორები', value: '46 პირი' });
    expect(groupMod.specRows[0][3]).toEqual({ label: 'ადგილის ხელახლა შევსება', value: '< 15 წუთი' });

    expect(groupMod.specRows[1][0]).toEqual({ label: 'ცეკვა და კარდიო', value: 'Zumba · step · cycle' });
    expect(groupMod.specRows[1][1]).toEqual({ label: 'გონება და სხეული', value: 'Yoga · pilates · stretch' });
    expect(groupMod.specRows[1][2]).toEqual({ label: 'ფუნქციური', value: 'TRX · kettlebell · circuit' });
    expect(groupMod.specRows[1][3]).toEqual({ label: 'ახალი ფორმატი', value: '4-კვირიანი პილოტი' });

    expect(groupMod.specRows[2][0]).toEqual({ label: 'დაჯავშნა', value: 'აპლიკაცია + ლოდინის სია' });
    expect(groupMod.specRows[2][1]).toEqual({ label: 'დასწრება', value: 'NFC check-in' });
    expect(groupMod.specRows[2][2]).toEqual({ label: 'გულისცემის ზონები', value: 'Live HR ეკრანი' });
    expect(groupMod.specRows[2][3]).toEqual({ label: 'გაკვეთილის შეფასება', value: '1 შეხებით, გასვლისას' });

    expect(groupMod.specRows[3][0]).toEqual({ label: 'ინსტრუქტორის სერტიფიკატი', value: 'EREPS დონე 3+' });
    expect(groupMod.specRows[3][1]).toEqual({ label: 'დარბაზის ნორმა', value: '≥ 4 m² მონაწილეზე' });
    expect(groupMod.specRows[3][2]).toEqual({ label: 'ჯანმრთელობის კითხვარი', value: 'PAR-Q · პირველ ვიზიტზე' });
    expect(groupMod.specRows[3][3]).toEqual({ label: 'პირველადი დახმარება', value: 'CPR ყოველ ცვლაში' });

    // Verify notes match offline handoff specifications
    expect(groupMod.notes?.[0]).toContain('ინსტრუქტორი სარკის წინ');
    expect(groupMod.notes?.[1]).toContain('სამი კუთხე — სამი ფორმატი');
    expect(groupMod.notes?.[2]).toContain('გულის ქვეშ თითო სვეტი');
    expect(groupMod.notes?.[3]).toContain('მონიშნული კვადრატი');
  });

  it('should match the 4 spec tile category titles and subtitles', () => {
    expect(SPEC_TILE_CATEGORIES).toHaveLength(4);
    expect(SPEC_TILE_CATEGORIES[0]).toEqual({ title: 'მასშტაბი', subtitle: 'SCALE & CAPACITY' });
    expect(SPEC_TILE_CATEGORIES[1]).toEqual({ title: 'დისციპლინები', subtitle: 'DISCIPLINES' });
    expect(SPEC_TILE_CATEGORIES[2]).toEqual({ title: 'საკვანძო ტექნოლოგია', subtitle: 'TELEMETRY / RFID / BIO' });
    expect(SPEC_TILE_CATEGORIES[3]).toEqual({ title: 'უმაღლესი სტანდარტი', subtitle: 'COMPLIANCE' });
  });

  it('should have all 4 camera focus poses defined for group matching handoff poses', () => {
    const groupPoses = TILE_FOCUS_POSES.group;
    expect(groupPoses).toBeDefined();
    expect(groupPoses).toHaveLength(4);
    expect(groupPoses[0]).toEqual([0, 3.8, 6.2, 0, -0.8, 0]);
    expect(groupPoses[1]).toEqual([0, 2.2, 5.2, 0, -0.9, 1.4]);
    expect(groupPoses[2]).toEqual([0, 1.7, 0.4, 0, 1.05, -2.2]);
    expect(groupPoses[3]).toEqual([-1.37, 1.3, -0.17, -2.6, 0.55, -2.0]);
  });
});
