import { VENUES_DIMENSION } from '@/components/landing/pure-sports-mirror/mirrorVenuesData';
import { WORKFORCE_DIMENSION } from '@/components/landing/pure-sports-mirror/mirrorWorkforceData';
import { MASTERY_DIMENSION } from '@/components/landing/pure-sports-mirror/mirrorMasteryData';
import { MIRROR_DIMENSIONS } from '@/components/landing/pure-sports-mirror/mirrorDataMatrix';

describe('SPORT-OS CONSOLE v3.3: PureSportsMirror Data Matrix & Specifications', () => {
  describe('Dimension 1: Physical Venues (5 items)', () => {
    it('should have exactly 5 venue modules', () => {
      expect(VENUES_DIMENSION.subPills).toHaveLength(5);
    });

    it('should match the exact v3.3 venue items and ids', () => {
      const ids = VENUES_DIMENSION.subPills.map((p) => p.id);
      expect(ids).toEqual(['venue_1', 'venue_2', 'venue_3', 'venue_4', 'venue_5']);

      const labels = VENUES_DIMENSION.subPills.map((p) => p.shortLabel);
      expect(labels).toEqual(['ჰაბები', 'აკადემიები', 'მულტისპორტი', 'ოლიმპიური ბაზები', 'ფედერაციები']);
    });

    it('should not contain removed stadium arenas or niche specialized centers', () => {
      const allText = JSON.stringify(VENUES_DIMENSION);
      expect(allText).not.toContain('სათამაშო არენები');
      expect(allText).not.toContain('სათამაშო სტადიონები და არენები');
      expect(allText).not.toContain('სპეციალიზებული და ნიშური ცენტრები');
    });
  });

  describe('Dimension 2: Pure Sports Workforce (5 items)', () => {
    it('should have exactly 5 workforce modules', () => {
      expect(WORKFORCE_DIMENSION.subPills).toHaveLength(5);
    });

    it('should match the exact v3.3 workforce items and ids', () => {
      const ids = WORKFORCE_DIMENSION.subPills.map((p) => p.id);
      expect(ids).toEqual(['staff_1', 'staff_2', 'staff_3', 'staff_4', 'staff_5']);

      const labels = WORKFORCE_DIMENSION.subPills.map((p) => p.shortLabel);
      expect(labels).toEqual(['მმართველობა', 'მწვრთნელები', 'მედიცინა', 'საოპერაციო', 'აკვა-მაშველი']);
    });

    it('should include Aquatic Safety & Lifeguard with exact safety metrics', () => {
      const lifeguard = WORKFORCE_DIMENSION.subPills.find((p) => p.id === 'staff_5');
      expect(lifeguard).toBeDefined();
      expect(lifeguard?.passport.title).toBe('აკვა-უსაფრთხოება & სამაშველო სამსახური');
      expect(lifeguard?.passport.badge).toBe('AQUATIC SAFETY');
      expect(lifeguard?.passport.highestStandardDetail).toContain('0% ინციდენტი');
      expect(lifeguard?.passport.highestStandardDetail).toContain('პირველადი რეაგირება');
      expect(lifeguard?.passport.highestStandardDetail).toContain('საცურაო ბილიკებისა და აკვა-ზონის წამობრივი უსაფრთხოება');
    });

    it('should not contain removed scouting or referee/VAR modules', () => {
      const allText = JSON.stringify(WORKFORCE_DIMENSION);
      expect(allText).not.toContain('სკაუტინგი');
      expect(allText).not.toContain('მსაჯობა, ეთიკა და რეგლამენტი');
      expect(allText).not.toContain('მსაჯები & VAR');
    });
  });

  describe('Dimension 3: Mastery & Accolades (5 items)', () => {
    it('should have exactly 5 mastery modules', () => {
      expect(MASTERY_DIMENSION.subPills).toHaveLength(5);
    });

    it('should match the exact v3.3 mastery items and ids', () => {
      const ids = MASTERY_DIMENSION.subPills.map((p) => p.id);
      expect(ids).toEqual(['rank_1', 'rank_2', 'rank_3', 'rank_4', 'rank_5']);

      const labels = MASTERY_DIMENSION.subPills.map((p) => p.shortLabel);
      expect(labels).toEqual(['თანრიგები', 'ლიცენზიები', 'კვარცხლბეკი', 'ქამრები', 'დანები']);
    });
  });

  describe('Strict Business Rule: Zero Financial/Accounting Clutter', () => {
    it('should not mention accounting, bookkeeping, or salaries in any dimension', () => {
      const allMatrixText = JSON.stringify(MIRROR_DIMENSIONS);
      expect(allMatrixText).not.toContain('ბუღალტერია');
      expect(allMatrixText).not.toContain('ხელფასები');
      expect(allMatrixText).not.toContain('ხელფასი');
      expect(allMatrixText).not.toContain('გადახდები');
    });
  });

  describe('Full Specification Tiles Integrity', () => {
    it('every module in all dimensions must have complete rich tile deep-reveal text', () => {
      const dimensions = [VENUES_DIMENSION, WORKFORCE_DIMENSION, MASTERY_DIMENSION];

      for (const dim of dimensions) {
        for (const pill of dim.subPills) {
          const p = pill.passport;
          // Scale tile
          expect(p.scaleLabel).toBeTruthy();
          expect(p.scale).toBeTruthy();
          expect(p.scaleDetail).toBeTruthy();
          expect(p.scaleDetail.length).toBeGreaterThan(15);

          // Disciplines tile
          expect(p.disciplinesLabel).toBeTruthy();
          expect(p.disciplines).toBeTruthy();
          expect(p.disciplinesDetail).toBeTruthy();
          expect(p.disciplinesDetail.length).toBeGreaterThan(15);

          // Key area tile
          expect(p.keyAreaLabel).toBeTruthy();
          expect(p.keyArea).toBeTruthy();
          expect(p.keyAreaDetail).toBeTruthy();
          expect(p.keyAreaDetail.length).toBeGreaterThan(15);

          // Highest standard tile
          expect(p.highestStandardLabel).toBeTruthy();
          expect(p.highestStandard).toBeTruthy();
          expect(p.highestStandardDetail).toBeTruthy();
          expect(p.highestStandardDetail.length).toBeGreaterThan(15);
        }
      }
    });
  });
});
