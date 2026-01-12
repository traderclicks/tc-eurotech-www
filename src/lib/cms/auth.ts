/**
 * CMS Authentication
 * Magic link login with email whitelist
 */

import { SignJWT, jwtVerify } from 'jose';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

const CONTENT_DIR = join(process.cwd(), 'content');
const CONFIG_PATH = join(CONTENT_DIR, 'config.json');

// Secret for signing tokens - in production, use env var
const JWT_SECRET = new TextEncoder().encode(
  process.env.CMS_JWT_SECRET || 'eurotech-cms-secret-change-in-production'
);

const TOKEN_EXPIRY = '7d'; // Session duration
const MAGIC_LINK_EXPIRY = '15m'; // Magic link validity

export interface CMSConfig {
  siteName: string;
  editors: string[];
  approvers: string[];
  settings: {
    requireApproval: boolean;
  };
}

export interface CMSUser {
  email: string;
  role: 'editor' | 'approver';
}

/**
 * Load CMS config from file
 */
export function getConfig(): CMSConfig {
  if (!existsSync(CONFIG_PATH)) {
    throw new Error('CMS config not found');
  }
  return JSON.parse(readFileSync(CONFIG_PATH, 'utf-8'));
}

/**
 * Check if email is allowed to access CMS
 */
export function isAllowedEmail(email: string): boolean {
  const config = getConfig();
  const normalizedEmail = email.toLowerCase().trim();

  const allAllowed = [
    ...config.editors.map(e => e.toLowerCase()),
    ...config.approvers.map(e => e.toLowerCase())
  ];

  return allAllowed.includes(normalizedEmail);
}

/**
 * Get user role from email
 */
export function getUserRole(email: string): 'editor' | 'approver' | null {
  const config = getConfig();
  const normalizedEmail = email.toLowerCase().trim();

  if (config.approvers.map(e => e.toLowerCase()).includes(normalizedEmail)) {
    return 'approver';
  }
  if (config.editors.map(e => e.toLowerCase()).includes(normalizedEmail)) {
    return 'editor';
  }
  return null;
}

/**
 * Generate magic link token
 */
export async function generateMagicLinkToken(email: string): Promise<string> {
  if (!isAllowedEmail(email)) {
    throw new Error('Email not authorized');
  }

  const token = await new SignJWT({ email, type: 'magic-link' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(MAGIC_LINK_EXPIRY)
    .sign(JWT_SECRET);

  return token;
}

/**
 * Verify magic link token and return email
 */
export async function verifyMagicLinkToken(token: string): Promise<string> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);

    if (payload.type !== 'magic-link') {
      throw new Error('Invalid token type');
    }

    const email = payload.email as string;
    if (!isAllowedEmail(email)) {
      throw new Error('Email no longer authorized');
    }

    return email;
  } catch (error) {
    throw new Error('Invalid or expired magic link');
  }
}

/**
 * Generate session token after successful magic link verification
 */
export async function generateSessionToken(email: string): Promise<string> {
  const role = getUserRole(email);
  if (!role) {
    throw new Error('User not authorized');
  }

  const token = await new SignJWT({ email, role, type: 'session' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(TOKEN_EXPIRY)
    .sign(JWT_SECRET);

  return token;
}

/**
 * Verify session token and return user
 */
export async function verifySessionToken(token: string): Promise<CMSUser | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);

    if (payload.type !== 'session') {
      return null;
    }

    const email = payload.email as string;
    const role = payload.role as 'editor' | 'approver';

    // Re-verify user is still allowed
    if (!isAllowedEmail(email)) {
      return null;
    }

    return { email, role };
  } catch {
    return null;
  }
}

/**
 * Check if user can approve changes
 */
export function canApprove(user: CMSUser): boolean {
  return user.role === 'approver';
}

/**
 * Check if user can propose changes
 */
export function canPropose(user: CMSUser): boolean {
  return user.role === 'editor' || user.role === 'approver';
}
