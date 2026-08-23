import crypto from "crypto";
import { env } from "@/lib/env";

export interface SessionPayload {
  userId: string;
  tenantId: string;
  email: string;
  name: string;
  role: string;
  subdomain: string;
  isTrial: boolean;
  exp: number; // Unix timestamp in seconds
}

export const SESSION_COOKIE_NAME = "artron_session";
const DEFAULT_EXPIRATION_SECONDS = 7 * 24 * 60 * 60; // 7 days

/**
 * Creates a signed base64url JWT-like session token using HMAC-SHA256
 */
export function createSessionToken(
  payload: Omit<SessionPayload, "exp">,
  expiresInSeconds = DEFAULT_EXPIRATION_SECONDS
): string {
  const secret = env.JWT_SECRET;
  const header = { alg: "HS256", typ: "JWT" };
  const exp = Math.floor(Date.now() / 1000) + expiresInSeconds;
  const fullPayload: SessionPayload = { ...payload, exp };

  const encodedHeader = Buffer.from(JSON.stringify(header)).toString("base64url");
  const encodedPayload = Buffer.from(JSON.stringify(fullPayload)).toString("base64url");

  const signature = crypto
    .createHmac("sha256", secret)
    .update(`${encodedHeader}.${encodedPayload}`)
    .digest("base64url");

  return `${encodedHeader}.${encodedPayload}.${signature}`;
}

/**
 * Verifies and decodes a signed session token
 */
export function verifySessionToken(token: string): SessionPayload | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const [encodedHeader, encodedPayload, signature] = parts;
    const secret = env.JWT_SECRET;

    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(`${encodedHeader}.${encodedPayload}`)
      .digest("base64url");

    if (
      signature.length !== expectedSignature.length ||
      !crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))
    ) {
      return null;
    }

    const payload: SessionPayload = JSON.parse(
      Buffer.from(encodedPayload, "base64url").toString("utf8")
    );

    const now = Math.floor(Date.now() / 1000);
    if (payload.exp && payload.exp < now) {
      return null; // Expired token
    }

    return payload;
  } catch {
    return null;
  }
}
