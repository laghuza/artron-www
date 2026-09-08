import { INITIAL_BRANCH_IPS, INITIAL_USER_IP_RULES, IP_COMPARISON_MATRIX } from '@/data/ipWhitelistData';
import geDict from '@/dictionaries/ge.json';
import enDict from '@/dictionaries/en.json';
import ruDict from '@/dictionaries/ru.json';

describe('🛡️ IP Whitelist & Geo-fencing Security Module Unit Tests', () => {
  describe('1. Data Integrity & Default Configurations', () => {
    it('should have initial branch IPs registered with valid IPv4 formats', () => {
      expect(INITIAL_BRANCH_IPS.length).toBeGreaterThanOrEqual(4);
      INITIAL_BRANCH_IPS.forEach((branch) => {
        expect(branch.id).toBeDefined();
        expect(branch.ipAddress).toMatch(/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/);
        expect(branch.isActive).toBe(true);
      });
    });

    it('should have staff rules configured with valid branch assignments and roles', () => {
      expect(INITIAL_USER_IP_RULES.length).toBeGreaterThanOrEqual(4);
      const director = INITIAL_USER_IP_RULES.find((u) => u.accessAllIps);
      const cashier = INITIAL_USER_IP_RULES.find((u) => !u.accessAllIps && u.allowedBranchIds.includes('branch-vake-lan'));

      expect(director).toBeDefined();
      expect(director?.userName).toBe('ნინო კაპანაძე');
      expect(cashier).toBeDefined();
      expect(cashier?.userName).toBe('გიორგი ბერიძე');
    });

    it('should have all 6 core comparison criteria in IP_COMPARISON_MATRIX', () => {
      expect(IP_COMPARISON_MATRIX.length).toBe(6);
      const keys = IP_COMPARISON_MATRIX.map((r) => r.featureKey);
      expect(keys).toContain('home_login_block');
      expect(keys).toContain('branch_isolation');
      expect(keys).toContain('webauthn_integration');
      expect(keys).toContain('user_specific_rules');
      expect(keys).toContain('fraud_prevention');
      expect(keys).toContain('audit_trail_depth');
    });
  });

  describe('2. Zero-Trust Rule Evaluation Logic', () => {
    const evaluateIpAccess = (
      user: { isActive: boolean; accessAllIps: boolean; allowedBranchIds: string[] },
      attemptedBranchId: string,
      attemptedIp: string
    ) => {
      if (!user.isActive) {
        return { isAllowed: false, reason: 'Inactive status' };
      }
      if (user.accessAllIps) {
        return { isAllowed: true, reason: 'Access All IPs' };
      }
      if (user.allowedBranchIds.includes(attemptedBranchId)) {
        return { isAllowed: true, reason: 'Allowed Branch IP Match' };
      }
      return { isAllowed: false, reason: 'Denied External IP' };
    };

    it('should ALLOW cashier from registered Vake Gym LAN IP', () => {
      const cashier = INITIAL_USER_IP_RULES.find((u) => u.userId === 'user-01')!;
      const result = evaluateIpAccess(cashier, 'branch-vake-lan', '192.168.1.100');
      expect(result.isAllowed).toBe(true);
      expect(result.reason).toBe('Allowed Branch IP Match');
    });

    it('should BLOCK cashier attempting to log in from Home / Mobile LTE', () => {
      const cashier = INITIAL_USER_IP_RULES.find((u) => u.userId === 'user-01')!;
      const result = evaluateIpAccess(cashier, 'home', '178.134.89.204');
      expect(result.isAllowed).toBe(false);
      expect(result.reason).toBe('Denied External IP');
    });

    it('should ALLOW director from any location due to Access All IPs policy', () => {
      const director = INITIAL_USER_IP_RULES.find((u) => u.userId === 'user-02')!;
      const result = evaluateIpAccess(director, 'home', '178.134.89.204');
      expect(result.isAllowed).toBe(true);
      expect(result.reason).toBe('Access All IPs');
    });

    it('should BLOCK inactive employee even if connecting from gym premises', () => {
      const inactiveStaff = INITIAL_USER_IP_RULES.find((u) => u.userId === 'user-04')!;
      const result = evaluateIpAccess(inactiveStaff, 'branch-batumi-pool', '192.168.3.25');
      expect(result.isAllowed).toBe(false);
      expect(result.reason).toBe('Inactive status');
    });
  });

  describe('3. Multi-Lingual Dictionary Parity (KA / EN / RU)', () => {
    it('should have sub-chapter 08.5 in ge.json, en.json, and ru.json', () => {
      expect(geDict.subchapters['08.5']).toBeDefined();
      expect(enDict.subchapters['08.5']).toBeDefined();
      expect(ruDict.subchapters['08.5']).toBeDefined();

      expect(geDict.subchapters['08.5']).toContain('IP შეზღუდვისა და ლოკაციური უსაფრთხოების მოდული');
      expect(enDict.subchapters['08.5']).toContain('Location-Locked Security');
      expect(ruDict.subchapters['08.5']).toContain('Ограничение по IP');
    });
  });
});
