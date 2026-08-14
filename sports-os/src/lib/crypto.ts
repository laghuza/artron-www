import crypto from "crypto";
import { env } from "@/lib/env";

const ALGORITHM = "aes-256-gcm";

const getKey = (): Buffer => {
  const keyHex = env.PII_AES256_KEY;
  if (!keyHex || keyHex.length !== 64) {
    throw new Error(
      "Invalid encryption key length. PII_AES256_KEY must be a 64-character hex string (32 bytes)."
    );
  }
  return Buffer.from(keyHex, "hex");
};

export interface EncryptedData {
  encrypted: string;
  iv: string;
  authTag: string;
}

/**
 * Encrypts a personal ID string using AES-256-GCM
 */
export function encryptPersonalId(personalId: string): EncryptedData {
  const key = getKey();
  const iv = crypto.randomBytes(12); // Standard GCM IV size is 12 bytes
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);

  let encrypted = cipher.update(personalId, "utf8", "hex");
  encrypted += cipher.final("hex");

  const authTag = cipher.getAuthTag().toString("hex");

  return {
    encrypted,
    iv: iv.toString("hex"),
    authTag,
  };
}

/**
 * Decrypts an AES-256-GCM encrypted personal ID
 */
export function decryptPersonalId(
  encrypted: string,
  ivHex: string,
  authTagHex: string
): string {
  const key = getKey();
  const iv = Buffer.from(ivHex, "hex");
  const authTag = Buffer.from(authTagHex, "hex");

  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
  decipher.setAuthTag(authTag);

  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
}
