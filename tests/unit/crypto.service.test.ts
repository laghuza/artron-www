import { CryptoService } from '../../src/backend/services/crypto.service';

describe('CryptoService', () => {
  let cryptoService: CryptoService;

  beforeEach(() => {
    // Ensure clear env or fallback is used
    delete process.env.CRYPTO_KEY;
    cryptoService = new CryptoService();
  });

  it('should encrypt and decrypt text successfully', () => {
    const plainText = 'TestPersonalID12345';
    const encryptedResult = cryptoService.encrypt(plainText);

    expect(encryptedResult).toHaveProperty('encryptedText');
    expect(encryptedResult).toHaveProperty('iv');
    expect(encryptedResult).toHaveProperty('authTag');

    expect(typeof encryptedResult.encryptedText).toBe('string');
    expect(typeof encryptedResult.iv).toBe('string');
    expect(typeof encryptedResult.authTag).toBe('string');

    const decryptedText = cryptoService.decrypt(
      encryptedResult.encryptedText,
      encryptedResult.iv,
      encryptedResult.authTag
    );

    expect(decryptedText).toBe(plainText);
  });

  it('should derive different IVs for separate encryptions of the same text', () => {
    const plainText = 'SameText';
    const result1 = cryptoService.encrypt(plainText);
    const result2 = cryptoService.encrypt(plainText);

    expect(result1.iv).not.toBe(result2.iv);
    expect(result1.encryptedText).not.toBe(result2.encryptedText);
  });

  it('should fail decryption if data is tampered with', () => {
    const plainText = 'SecureData';
    const result = cryptoService.encrypt(plainText);

    // Tamper with the encrypted text
    const lastTwo = result.encryptedText.substring(result.encryptedText.length - 2);
    const tamperedText = result.encryptedText.substring(0, result.encryptedText.length - 2) + (lastTwo === '00' ? '11' : '00');

    expect(() => {
      cryptoService.decrypt(tamperedText, result.iv, result.authTag);
    }).toThrow();
  });

  it('should use CRYPTO_KEY from environment if available', () => {
    process.env.CRYPTO_KEY = 'custom_very_long_secret_key_for_testing';
    const serviceWithEnv = new CryptoService();
    const plainText = 'EnvTest';
    
    const encrypted = serviceWithEnv.encrypt(plainText);
    const decrypted = serviceWithEnv.decrypt(encrypted.encryptedText, encrypted.iv, encrypted.authTag);
    
    expect(decrypted).toBe(plainText);
  });
});
