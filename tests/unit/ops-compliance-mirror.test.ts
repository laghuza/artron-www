import { WORKFORCE_MODULES } from '@/components/landing/pure-sports-mirror/data/workforceDimensionData';
import { SPEC_TILE_CATEGORIES } from '@/components/landing/pure-sports-mirror/data/mirrorDataTypes';
import { TILE_FOCUS_POSES } from '@/components/landing/pure-sports-mirror/scene3d/sceneConfig';

describe('Administration & Operations (HC-04) System Mirror Implementation', () => {
  it('should have exact data parity for HC-04 ops module matching Claude design', () => {
    const opsMod = WORKFORCE_MODULES.find((m) => m.id === 'ops');
    expect(opsMod).toBeDefined();
    if (!opsMod) return;

    expect(opsMod.kicker).toBe('HC-04 / OPS & COMPLIANCE');
    expect(opsMod.headline).toBe('ერთიანი საოპერაციო ცენტრი\nდა შრომის აღრიცხვა.');
    expect(opsMod.cameraTags).toEqual(['ROTA RING', 'DEPARTMENT PODS', 'SERVER / CLOCK-IN', 'AUDIT LEDGER']);
    expect(opsMod.specRows).toHaveLength(4);

    // Verify key metrics across 4 categories
    expect(opsMod.specRows[0][0].label).toBe('რეცეფციის ხარჯის 60%-ით შემცირება');
    expect(opsMod.specRows[0][0].value).toBe('თვითმომსახურების კიოსკები და აპი');
    expect(opsMod.specRows[0][1].label).toBe('24/7 უწყვეტი ოპერაციები');
    expect(opsMod.specRows[0][1].value).toBe('ცვლების ავტომატური დაგეგმვა (Auto-Rota)');

    expect(opsMod.specRows[1][0].label).toBe('დეპარტამენტების კავშირი');
    expect(opsMod.specRows[1][0].value).toBe('გაყიდვები, ადმინისტრაცია, დასუფთავება, ტექ-სერვისი');
    expect(opsMod.specRows[1][1].label).toBe('ინვენტარისა და ბარის გაყიდვები');
    expect(opsMod.specRows[1][1].value).toBe('საწყობის ავტომატური ჩამოწერა (Stock-Sync)');
    expect(opsMod.specRows[1][2].label).toBe('კლიენტთა უკუკავშირი');
    expect(opsMod.specRows[1][2].value).toBe('CRM ინტეგრირებული საჩივრების ჟურნალი');

    expect(opsMod.specRows[2][0].label).toBe('ბიომეტრიული Clock-in / Clock-out');
    expect(opsMod.specRows[2][1].label).toBe('სალაროს ავტო-შერიგება');
    expect(opsMod.specRows[2][1].value).toBe('0 ფინანსური გადაცდენა ცვლის ბოლოს');

    expect(opsMod.specRows[3][0].label).toBe('ბრძანება №01-15/ნ-ის 100% დაცვა');
    expect(opsMod.specRows[3][0].value).toBe('შრომის ინსპექციისთვის უნაკლო ტაბელი');
    expect(opsMod.specRows[3][1].label).toBe('სახელფასო უწყისის გენერაცია');
    expect(opsMod.specRows[3][2].label).toBe('აუდიტის უცვლელი ჟურნალი');
    expect(opsMod.specRows[3][2].value).toBe('საეჭვო ოპერაციების მყისიერი ალერტი');
  });

  it('should match the 4 spec tile category titles and subtitles', () => {
    expect(SPEC_TILE_CATEGORIES).toHaveLength(4);
    expect(SPEC_TILE_CATEGORIES[0]).toEqual({ title: 'გამტარუნარიანობა', subtitle: 'SCALE & CAPACITY' });
    expect(SPEC_TILE_CATEGORIES[1]).toEqual({ title: 'სპორტული ზონები', subtitle: 'DISCIPLINES' });
    expect(SPEC_TILE_CATEGORIES[2]).toEqual({ title: 'საკვანძო ტექნოლოგია', subtitle: 'TELEMETRY / RFID / BIO' });
    expect(SPEC_TILE_CATEGORIES[3]).toEqual({ title: 'სტანდარტები & უსაფრთხოება', subtitle: 'COMPLIANCE & AUDIT' });
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
