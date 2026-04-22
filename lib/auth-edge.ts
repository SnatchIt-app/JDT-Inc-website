/**
 * Edge-safe subset of auth helpers — used by middleware.ts.
 * This module MUST NOT import bcryptjs or anything Node-only.
 */

import { jwtVerify, type JWTPayload } from "jose";

export const SESSION_COOKIE = "jdt_session";

function getSecret(): Uint8Array {
  const secret = process.env.AUTH_SECRET;
  if (!secret || secret.length < 16) {
    return new TextEncoder().encode(
      "dev-insecure-secret-please-change-in-prod"
    );
  }
  return new TextEncoder().encode(secret);
}

export type SessionPayload = JWTPayload & {
  sub: string;
  email: string;
  name?: string | null;
};

export async function verifySessionTokenEdge(
  token: string
): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    return payload as SessionPayload;
  } catch {
    return null;
  }
}
