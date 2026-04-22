/**
 * Admin session auth — JWT stored in an httpOnly cookie.
 *
 * `jose` is used for signing/verifying because it runs in both the Node.js
 * and Edge runtimes (Edge is required by `middleware.ts`).
 *
 * `bcryptjs` is used for password hashing. Only import this module from
 * Node-runtime code (server actions, route handlers, server components).
 * Middleware should only call `verifySessionToken` via `./auth-edge`.
 */

import "server-only";
import { cookies } from "next/headers";
import { SignJWT, jwtVerify, type JWTPayload } from "jose";
import bcrypt from "bcryptjs";

export const SESSION_COOKIE = "jdt_session";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days

function getSecret(): Uint8Array {
  const secret = process.env.AUTH_SECRET;
  if (!secret || secret.length < 16) {
    // Intentionally throw in production — misconfigured auth is never silent.
    if (process.env.NODE_ENV === "production") {
      throw new Error("AUTH_SECRET must be set (>= 16 chars) in production");
    }
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

export async function hashPassword(plain: string): Promise<string> {
  return bcrypt.hash(plain, 10);
}

export async function verifyPassword(
  plain: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(plain, hash);
}

export async function createSessionToken(payload: {
  sub: string;
  email: string;
  name?: string | null;
}): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${MAX_AGE_SECONDS}s`)
    .sign(getSecret());
}

export async function verifySessionToken(
  token: string
): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    return payload as SessionPayload;
  } catch {
    return null;
  }
}

export function setSessionCookie(token: string): void {
  cookies().set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE_SECONDS,
  });
}

export function clearSessionCookie(): void {
  cookies().delete(SESSION_COOKIE);
}

/** Read the current session from the cookie (server-only). */
export async function getSession(): Promise<SessionPayload | null> {
  const token = cookies().get(SESSION_COOKIE)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}
