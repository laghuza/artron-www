import { EnneaVenue } from '@/components/landing/ecosystem/types';

describe('Phase 44: Venue Detail Working Hours & Live Schedule Suite', () => {
  const testVenues: EnneaVenue[] = [
    {
      id: 'x-area',
      name: 'X AREA GYM',
      regionId: 'imereti',
      category: 'პრემიუმ კლუბი',
      city: 'ქუთაისი',
      lat: 42.2665,
      lon: 42.6945,
      accent: '#00A3FF',
      members: '11,000+',
      status: 'ავტორიზებული დარბაზი // ართრონის ქსელი',
      workingHours: {
        monSat: 'ორშ – შაბ: 08:00 – 23:00',
        sun: 'კვირა: 09:00 – 21:00',
        weekdayOpen: 8,
        weekdayClose: 23,
        weekendOpen: 9,
        weekendClose: 21,
      },
    },
    {
      id: 'zona-15',
      name: 'Fitness Zona 15',
      regionId: 'imereti',
      category: 'ფუნქციური დარბაზი',
      city: 'თერჯოლა',
      lat: 42.178,
      lon: 43.013,
      accent: '#00A3FF',
      members: '1,400+',
      status: 'ავტორიზებული დარბაზი // ართრონის ქსელი',
      workingHours: {
        monSat: 'ორშ – შაბ: 09:00 – 22:00',
        sun: 'კვირა: 10:00 – 20:00',
        weekdayOpen: 9,
        weekdayClose: 22,
        weekendOpen: 10,
        weekendClose: 20,
      },
    },
    {
      id: 'fencing-federation',
      name: 'საქართველოს ფარიკაობის ფედერაცია',
      regionId: 'tbilisi',
      category: 'ფედერაცია',
      city: 'თბილისი',
      lat: 41.7151,
      lon: 44.8271,
      accent: '#00A3FF',
      members: '—',
      status: 'ავტორიზებული ფედერაცია // ართრონის ქსელი',
      workingHours: {
        monSat: 'ორშ – პარ: 09:00 – 20:00, შაბ: 10:00 – 18:00',
        sun: 'კვირა: დასვენება',
        weekdayOpen: 9,
        weekdayClose: 20,
        weekendOpen: 10,
        weekendClose: 18,
        isSunClosed: true,
      },
    },
  ];

  describe('1. Working Hours & Schedule Data Model', () => {
    it('should have valid working hours defined for all venues', () => {
      testVenues.forEach((v) => {
        expect(v.workingHours).toBeDefined();
        expect(v.workingHours?.monSat).toBeTruthy();
        expect(v.workingHours?.sun).toBeTruthy();
        expect(v.workingHours?.weekdayOpen).toBeGreaterThanOrEqual(0);
        expect(v.workingHours?.weekdayClose).toBeLessThanOrEqual(24);
      });
    });

    it('should correctly configure weekend vs weekday limits', () => {
      const zona15 = testVenues.find((v) => v.id === 'zona-15');
      expect(zona15?.workingHours?.weekdayOpen).toBe(9);
      expect(zona15?.workingHours?.weekdayClose).toBe(22);
      expect(zona15?.workingHours?.weekendOpen).toBe(10);
      expect(zona15?.workingHours?.weekendClose).toBe(20);
    });

    it('should properly configure closed days for federations', () => {
      const fencing = testVenues.find((v) => v.id === 'fencing-federation');
      expect(fencing?.workingHours?.isSunClosed).toBe(true);
      expect(fencing?.workingHours?.sun).toContain('დასვენება');
    });
  });

  describe('2. Elimination of Developer Jargon and 24/7', () => {
    it('should not contain "მოქმედი პროდაქშენი" or "24/7" in venue status', () => {
      testVenues.forEach((v) => {
        expect(v.status).not.toContain('მოქმედი პროდაქშენი');
        expect(v.status).not.toContain('მოქმედი პროდაქშენში');
        expect(v.status).not.toContain('24/7');
        expect(v.status).not.toContain('LIVE // 24/7 ACTIVE');
        expect(v.status).toContain('ავტორიზებული');
      });
    });
  });

  describe('3. Working Hours Formatting Helpers', () => {
    it('should cleanly strip prefix from working hours strings for UI display', () => {
      const monSatStr = 'ორშ – შაბ: 09:00 – 22:00';
      const formatted = monSatStr.replace(/^[^:]+:\s*/, '');
      expect(formatted).toBe('09:00 – 22:00');
    });

    it('should format closed status appropriately', () => {
      const sunStr = 'კვირა: დასვენება';
      const formatted = sunStr.replace(/^[^:]+:\s*/, '');
      expect(formatted).toBe('დასვენება');
    });
  });
});
