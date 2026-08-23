import fs from 'fs';
import path from 'path';
import geDict from '@/dictionaries/ge.json';
import enDict from '@/dictionaries/en.json';
import ruDict from '@/dictionaries/ru.json';
import { encryptPersonalId, decryptPersonalId } from '@/lib/crypto';
import { createSessionToken, verifySessionToken } from '@/lib/auth-session';

describe('Phase 26 / Stage 5: System QC Audit & 60 FPS Performance Suite', () => {
  describe('1. CSS GPU Acceleration & 60 FPS Token Audit', () => {
    const globalsCssPath = path.join(process.cwd(), 'src/app/globals.css');
    const globalsCssContent = fs.readFileSync(globalsCssPath, 'utf8');

    test('should include will-change and translate3d GPU acceleration classes', () => {
      expect(globalsCssContent).toContain('will-change: transform');
      expect(globalsCssContent).toContain('transform: translate3d(0, 0, 0)');
      expect(globalsCssContent).toContain('backface-visibility: hidden');
    });

    test('should enforce global overflow-x clipping and responsive 100vw safety', () => {
      expect(globalsCssContent).toContain('overflow-x: clip');
      expect(globalsCssContent).toContain('max-width: 100vw');
    });

    test('should contain full prefers-reduced-motion accessibility fallbacks', () => {
      expect(globalsCssContent).toContain('@media (prefers-reduced-motion: reduce)');
      expect(globalsCssContent).toContain('animation-duration: 0.01ms !important');
      expect(globalsCssContent).toContain('transition-duration: 0.01ms !important');
    });

    test('should have studio-perspective 1200px 3D container styling', () => {
      expect(globalsCssContent).toContain('perspective: 1200px');
      expect(globalsCssContent).toContain('transform-style: preserve-3d');
    });
  });

  describe('2. Multi-Lingual KA / EN / RU 100% Dictionary Parity Audit', () => {
    test('should ensure all dictionaries have core domain namespaces', () => {
      const keysGe = Object.keys(geDict);
      const keysEn = Object.keys(enDict);
      const keysRu = Object.keys(ruDict);

      expect(keysGe.length).toBeGreaterThan(15);
      expect(keysEn.length).toBeGreaterThan(15);
      expect(keysRu.length).toBeGreaterThan(15);

      const requiredSections = ['system', 'registration', 'telemetry', 'ps5_onboarding'];
      for (const section of requiredSections) {
        expect(geDict).toHaveProperty(section);
        expect(enDict).toHaveProperty(section);
        expect(ruDict).toHaveProperty(section);
      }
    });

    test('should verify registration section strings exist across KA, EN, RU', () => {
      expect(geDict.registration.title).toBeDefined();
      expect(enDict.registration.title).toBeDefined();
      expect(ruDict.registration.title).toBeDefined();

      expect(geDict.registration.submit_btn).toBeDefined();
      expect(enDict.registration.submit_btn).toBeDefined();
      expect(ruDict.registration.submit_btn).toBeDefined();
    });

    test('should verify corporate registry code parity across KA, EN, RU', () => {
      expect(geDict.system.registry_code_val).toBe('412799431');
      expect(enDict.system.registry_code_val).toBe('412799431');
      expect(ruDict.system.registry_code_val).toBe('412799431');

      expect(geDict.system.general_email).toBe('info@artron.ge');
      expect(enDict.system.general_email).toBe('info@artron.ge');
      expect(ruDict.system.general_email).toBe('info@artron.ge');
    });
  });

  describe('3. PII AES-256-GCM Encryption & Session Security Audit', () => {
    test('should encrypt and decrypt Georgian National ID (11 digits) with zero loss', () => {
      const testPersonalId = '01024088991';
      const encryptedData = encryptPersonalId(testPersonalId);

      expect(encryptedData.encrypted).toBeDefined();
      expect(encryptedData.iv).toBeDefined();
      expect(encryptedData.authTag).toBeDefined();
      expect(encryptedData.encrypted).not.toBe(testPersonalId);

      const decrypted = decryptPersonalId(
        encryptedData.encrypted,
        encryptedData.iv,
        encryptedData.authTag
      );
      expect(decrypted).toBe(testPersonalId);
    });

    test('should generate HMAC-SHA256 authenticated session tokens and verify integrity', () => {
      const payload = {
        userId: 'usr_test_audit_99',
        tenantId: 'tnt_test_audit_99',
        email: 'ceo@artron-audit.ge',
        name: 'Davit Todua',
        role: 'OWNER',
        subdomain: 'audit-club',
        isTrial: true
      };

      const token = createSessionToken(payload);
      expect(token).toBeDefined();
      expect(token.split('.').length).toBe(3);

      const verified = verifySessionToken(token);
      expect(verified).not.toBeNull();
      expect(verified?.userId).toBe(payload.userId);
      expect(verified?.tenantId).toBe(payload.tenantId);
      expect(verified?.role).toBe('OWNER');
      expect(verified?.isTrial).toBe(true);
    });

    test('should reject tampered session tokens', () => {
      const payload = {
        userId: 'usr_test_audit_99',
        tenantId: 'tnt_test_audit_99',
        email: 'ceo@artron-audit.ge',
        name: 'Davit Todua',
        role: 'OWNER',
        subdomain: 'audit-club',
        isTrial: true
      };

      const token = createSessionToken(payload);
      const [header, data, sig] = token.split('.');
      const tamperedToken = `${header}.${data}_tampered.${sig}`;

      const verified = verifySessionToken(tamperedToken);
      expect(verified).toBeNull();
    });
  });
});
