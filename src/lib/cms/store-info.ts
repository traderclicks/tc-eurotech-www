/**
 * CMS Store Info Management
 * Read/write store information (phone, address, hours, etc.) from JSON files
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// Resolve content directory - works both locally and on Vercel
function getContentDir(): string {
  const candidates = [
    join(process.cwd(), 'content'),
    '/var/task/content',
    join(dirname(fileURLToPath(import.meta.url)), '../../../../content'),
  ];

  for (const dir of candidates) {
    if (existsSync(dir)) {
      return dir;
    }
  }

  console.error('Content directory not found for store info. Tried:', candidates);
  return candidates[0];
}

const CONTENT_DIR = getContentDir();
const STORE_DIR = join(CONTENT_DIR, 'store');

export interface StoreFieldSchema {
  label: string;
  type: 'text' | 'textarea';
  placeholder?: string;
}

export interface StoreSchemas {
  [fieldId: string]: StoreFieldSchema;
}

export interface StoreValues {
  [fieldId: string]: string;
}

export interface StorePendingChange {
  proposed: StoreValues;
  proposedBy: string;
  proposedAt: string;
  note?: string;
}

/**
 * Get store schema definitions
 */
export function getStoreSchema(): StoreSchemas {
  const schemaPath = join(STORE_DIR, 'schema.json');
  if (!existsSync(schemaPath)) {
    return {};
  }
  return JSON.parse(readFileSync(schemaPath, 'utf-8'));
}

/**
 * Get current live store values
 */
export function getLiveStoreValues(): StoreValues {
  const livePath = join(STORE_DIR, 'live.json');
  if (!existsSync(livePath)) {
    return {};
  }
  return JSON.parse(readFileSync(livePath, 'utf-8'));
}

/**
 * Get pending store changes awaiting approval
 */
export function getStorePendingChange(): StorePendingChange | null {
  const pendingPath = join(STORE_DIR, 'pending.json');
  if (!existsSync(pendingPath)) {
    return null;
  }
  const pending = JSON.parse(readFileSync(pendingPath, 'utf-8'));
  if (Object.keys(pending).length === 0) {
    return null;
  }
  return pending;
}

/**
 * Propose a store info change (saves to pending.json)
 */
export function proposeStoreChange(
  values: StoreValues,
  proposedBy: string,
  note?: string
): void {
  const pending: StorePendingChange = {
    proposed: values,
    proposedBy,
    proposedAt: new Date().toISOString(),
    note
  };

  const pendingPath = join(STORE_DIR, 'pending.json');
  writeFileSync(pendingPath, JSON.stringify(pending, null, 2) + '\n');
}

/**
 * Approve pending store change (merge to live.json)
 */
export function approveStoreChange(): void {
  const pending = getStorePendingChange();
  if (!pending) {
    throw new Error('No pending store change to approve');
  }

  const live = getLiveStoreValues();
  const updated = { ...live, ...pending.proposed };

  const livePath = join(STORE_DIR, 'live.json');
  writeFileSync(livePath, JSON.stringify(updated, null, 2) + '\n');

  const pendingPath = join(STORE_DIR, 'pending.json');
  writeFileSync(pendingPath, '{}\n');
}

/**
 * Reject pending store change
 */
export function rejectStoreChange(): void {
  const pending = getStorePendingChange();
  if (!pending) {
    throw new Error('No pending store change to reject');
  }

  const pendingPath = join(STORE_DIR, 'pending.json');
  writeFileSync(pendingPath, '{}\n');
}

export interface StoreInfoData {
  schema: StoreSchemas;
  values: StoreValues;
  pendingChange: StorePendingChange | null;
}

/**
 * Get all store info data for admin UI
 */
export function getStoreInfoData(): StoreInfoData {
  return {
    schema: getStoreSchema(),
    values: getLiveStoreValues(),
    pendingChange: getStorePendingChange()
  };
}

/**
 * Get store values with preview mode support
 * In preview mode, returns pending changes merged with live if any
 */
export function getStoreValuesWithPreview(isPreviewMode: boolean): StoreValues {
  const live = getLiveStoreValues();

  if (isPreviewMode) {
    const pending = getStorePendingChange();
    if (pending) {
      return { ...live, ...pending.proposed };
    }
  }
  return live;
}
