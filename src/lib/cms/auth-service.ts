/**
 * Auth Service Client
 * Delegates magic link auth to tc-services
 * Manages local session tokens
 */

import { SignJWT, jwtVerify } from 'jose';
import { env } from '$env/dynamic/private';

const TC_SERVICES_URL = env.TC_SERVICES_URL || 'https://tc-services-traderclicks.vercel.app';
const SITE_SLUG = 'eurotech';

// Session token secret (for local session management)
const SESSION_SECRET = new TextEncoder().encode(
  env.CMS_SESSION_SECRET || 'eurotech-session-secret-change-in-production'
);
const SESSION_EXPIRY = '7d';

export interface AuthUser {
  userId: string;
  email: string;
  name: string | null;
  role: 'editor' | 'approver' | 'viewer';
}

export interface VerifyResult {
  valid: boolean;
  error?: string;
  user?: AuthUser;
}

/**
 * Request a magic link be sent to the email
 * @param email - User's email address
 * @param callbackUrl - URL to redirect to after login (e.g., current site URL)
 */
export async function requestMagicLink(email: string, callbackUrl?: string): Promise<{ success: boolean; message: string }> {
  try {
    const response = await fetch(`${TC_SERVICES_URL}/api/auth/request`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ siteSlug: SITE_SLUG, email, callbackUrl })
    });

    const data = await response.json();
    return {
      success: data.success || false,
      message: data.message || 'An error occurred'
    };
  } catch (error) {
    console.error('Auth service request error:', error);
    return {
      success: false,
      message: 'Failed to connect to auth service'
    };
  }
}

/**
 * Verify a magic link token
 */
export async function verifyMagicLink(token: string): Promise<VerifyResult> {
  try {
    const response = await fetch(`${TC_SERVICES_URL}/api/auth/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ siteSlug: SITE_SLUG, token })
    });

    const data = await response.json();

    if (data.valid) {
      return {
        valid: true,
        user: {
          userId: data.userId,
          email: data.email,
          name: data.name,
          role: data.role
        }
      };
    }

    return {
      valid: false,
      error: data.error || 'Invalid token'
    };
  } catch (error) {
    console.error('Auth service verify error:', error);
    return {
      valid: false,
      error: 'Failed to connect to auth service'
    };
  }
}

/**
 * Check if user can approve changes
 */
export function canApprove(user: AuthUser): boolean {
  return user.role === 'approver';
}

/**
 * Check if user can propose changes
 */
export function canPropose(user: AuthUser): boolean {
  return user.role === 'editor' || user.role === 'approver';
}

/**
 * Generate a local session token from verified user
 */
export async function generateSessionToken(user: AuthUser): Promise<string> {
  return new SignJWT({
    userId: user.userId,
    email: user.email,
    name: user.name,
    role: user.role,
    type: 'session'
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(SESSION_EXPIRY)
    .sign(SESSION_SECRET);
}

/**
 * Verify a local session token
 */
export async function verifySessionToken(token: string): Promise<AuthUser | null> {
  try {
    const { payload } = await jwtVerify(token, SESSION_SECRET);
    if (payload.type !== 'session') return null;

    return {
      userId: payload.userId as string,
      email: payload.email as string,
      name: payload.name as string | null,
      role: payload.role as 'editor' | 'approver' | 'viewer'
    };
  } catch {
    return null;
  }
}
