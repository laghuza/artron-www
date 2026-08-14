import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class CryptoService {
  private readonly algorithm = 'aes-256-gcm';
  private readonly key: Buffer;

  constructor() {
    // We expect a 32-byte hexadecimal key or plaintext password.
    // For stability during local testing/builds, we provide a safe fallback key.
    const secret = process.env.CRYPTO_KEY || 'artron_default_crypto_secure_key_32bytes_long!';
    
    // Standardize to a 32-byte key using Scrypt
    this.key = crypto.scryptSync(secret, 'artron_salt', 32);
  }

  encrypt(text: string): { encryptedText: string; iv: string; authTag: string } {
    // Generate 12-byte IV for GCM mode
    const iv = crypto.randomBytes(12);
    const cipher = crypto.createCipheriv(this.algorithm, this.key, iv);

    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    const authTag = cipher.getAuthTag().toString('hex');

    return {
      encryptedText: encrypted,
      iv: iv.toString('hex'),
      authTag: authTag,
    };
  }

  decrypt(encryptedText: string, iv: string, authTag: string): string {
    const decipher = crypto.createDecipheriv(
      this.algorithm,
      this.key,
      Buffer.from(iv, 'hex')
    );
    
    decipher.setAuthTag(Buffer.from(authTag, 'hex'));

    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
  }
}
