import { LOGICS, FAC, HOURS, COACHES, LAYERS, MIG, OKR, MONTHS, MRR, MEMBERS, DAYS, BANDS, LOAD, tier, SEGS } from '@/components/landing/b2b-suite/constants';
import { B2BControlCenterSection } from '@/components/landing/b2b-suite';
import { B2BMobileLogicSelector } from '@/components/landing/b2b-suite/B2BMobileLogicSelector';

describe('B2BControlCenterSection & Constants Parity', () => {
  it('should export B2BControlCenterSection and B2BMobileLogicSelector', () => {
    expect(B2BControlCenterSection).toBeDefined();
    expect(B2BMobileLogicSelector).toBeDefined();
  });

  it('should have 10 standard B2B logics defined with code and stage labels', () => {
    expect(LOGICS).toHaveLength(10);
    expect(LOGICS[0].s).toBe('IoT');
    expect(LOGICS[1].s).toBe('ჯავშნები');
    expect(LOGICS[2].s).toBe('კიბერდაცვა');
    expect(LOGICS[3].s).toBe('მიგრაცია');
    expect(LOGICS[4].s).toBe('ეკონომია');
    expect(LOGICS[5].s).toBe('მიზნები');
    expect(LOGICS[6].s).toBe('მაჩვენებლები');
    expect(LOGICS[7].s).toBe('შენარჩუნება');
    expect(LOGICS[8].s).toBe('პიკი');
    expect(LOGICS[9].s).toBe('კამპანია');
  });

  it('should have 3 facilities and 6 hours for booking scheduler', () => {
    expect(FAC).toHaveLength(3);
    expect(HOURS).toHaveLength(6);
    expect(COACHES).toHaveLength(5);
  });

  it('should have 3 cyber defense layers', () => {
    expect(LAYERS).toHaveLength(3);
    expect(LAYERS[0].n).toBe('TLS 1.3');
    expect(LAYERS[1].n).toBe('IP თეთრი სია');
    expect(LAYERS[2].n).toBe('ZERO-TRUST');
  });

  it('should have 3 migration sources with positive records', () => {
    expect(MIG).toHaveLength(3);
    expect(MIG.reduce((a, b) => a + b.rec, 0)).toBe(4250);
  });

  it('should calculate piecewise tier pricing correctly', () => {
    expect(tier(90)).toEqual(['პიკური', 25]);
    expect(tier(70)).toEqual(['მაღალი', 10]);
    expect(tier(50)).toEqual(['სტანდარტული', 0]);
    expect(tier(20)).toEqual(['დაბალი', -15]);
  });

  it('should have 5 members with calculated risk percentages in churn radar', () => {
    expect(MEMBERS).toHaveLength(5);
    MEMBERS.forEach((m) => {
      expect(m.R).toBeGreaterThanOrEqual(0);
      expect(m.R).toBeLessThanOrEqual(100);
    });
  });

  it('should have 3 win-back campaign segments', () => {
    expect(SEGS).toHaveLength(3);
    expect(SEGS[0].n).toBe(214);
    expect(SEGS[1].n).toBe(131);
    expect(SEGS[2].n).toBe(58);
  });
});
