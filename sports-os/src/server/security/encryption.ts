import crypto from 'crypto'

const ALGORITHM = 'aes-256-gcm'
const IV_LENGTH = 12
const AUTH_TAG_LENGTH = 16

/**
 * Gets or falls back to a 32-byte secret key for AES-256 encryption.
 */
function getSecretKey(): Buffer {
  const secret = process.env.PII_ENCRYPTION_KEY || 'artron_sports_os_pii_encryption_key_32_bytes!!'
  return crypto.createHash('sha256').update(secret).digest()
}

export interface EncryptedPayload {
  encryptedData: string
  iv: string
  authTag: string
}

/**
 * Encrypts sensitive text using AES-256-GCM.
 */
export function encryptPii(plaintext: string): string {
  if (!plaintext) return ''

  const iv = crypto.randomBytes(IV_LENGTH)
  const key = getSecretKey()
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv)

  let encrypted = cipher.update(plaintext, 'utf8', 'hex')
  encrypted += cipher.final('hex')
  const authTag = cipher.getAuthTag().toString('hex')

  const payload: EncryptedPayload = {
    encryptedData: encrypted,
    iv: iv.toString('hex'),
    authTag,
  }

  return Buffer.from(JSON.stringify(payload)).toString('base64')
}

/**
 * Decrypts an AES-256-GCM encrypted PII payload string.
 */
export function decryptPii(ciphertextBase64: string): string {
  if (!ciphertextBase64) return ''

  try {
    const payloadStr = Buffer.from(ciphertextBase64, 'base64').toString('utf8')
    const payload: EncryptedPayload = JSON.parse(payloadStr)

    const key = getSecretKey()
    const iv = Buffer.from(payload.iv, 'hex')
    const authTag = Buffer.from(payload.authTag, 'hex')
    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv)

    decipher.setAuthTag(authTag)
    let decrypted = decipher.update(payload.encryptedData, 'hex', 'utf8')
    decrypted += decipher.final('utf8')

    return decrypted
  } catch (error) {
    console.error('Failed to decrypt PII payload:', error)
    return '[ENCRYPTED_DATA_DECRYPTION_FAILED]'
  }
}
