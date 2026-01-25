/**
 * CMS Overlays Management
 * Read/write overlay content (location modals, popups, etc.) from JSON files
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

  console.error('Content directory not found for overlays. Tried:', candidates);
  return candidates[0];
}

const CONTENT_DIR = getContentDir();
const OVERLAYS_DIR = join(CONTENT_DIR, 'overlays');

export interface OverlayFieldSchema {
  label: string;
  type: 'text' | 'textarea';
  placeholder?: string;
}

export interface OverlaySchema {
  label: string;
  fields: Record<string, OverlayFieldSchema>;
}

export interface OverlaySchemas {
  [overlayId: string]: OverlaySchema;
}

export interface OverlayValues {
  [fieldId: string]: string;
}

export interface OverlayLiveData {
  [overlayId: string]: OverlayValues;
}

export interface OverlayPendingChange {
  overlayId: string;
  proposed: OverlayValues;
  proposedBy: string;
  proposedAt: string;
  note?: string;
}

export interface OverlayPendingData {
  [overlayId: string]: OverlayPendingChange;
}

/**
 * Get overlay schema definitions
 */
export function getOverlaySchemas(): OverlaySchemas {
  const schemaPath = join(OVERLAYS_DIR, 'schema.json');
  if (!existsSync(schemaPath)) {
    return {};
  }
  return JSON.parse(readFileSync(schemaPath, 'utf-8'));
}

/**
 * Get current live overlay values
 */
export function getLiveOverlayValues(): OverlayLiveData {
  const livePath = join(OVERLAYS_DIR, 'live.json');
  if (!existsSync(livePath)) {
    return {};
  }
  return JSON.parse(readFileSync(livePath, 'utf-8'));
}

/**
 * Get pending overlay changes awaiting approval
 */
export function getOverlayPendingChanges(): OverlayPendingData {
  const pendingPath = join(OVERLAYS_DIR, 'pending.json');
  if (!existsSync(pendingPath)) {
    return {};
  }
  const pending = JSON.parse(readFileSync(pendingPath, 'utf-8'));
  if (Object.keys(pending).length === 0) {
    return {};
  }
  return pending;
}

/**
 * Propose an overlay change (saves to pending.json)
 */
export function proposeOverlayChange(
  overlayId: string,
  values: OverlayValues,
  proposedBy: string,
  note?: string
): void {
  const pending = getOverlayPendingChanges();

  pending[overlayId] = {
    overlayId,
    proposed: values,
    proposedBy,
    proposedAt: new Date().toISOString(),
    note
  };

  const pendingPath = join(OVERLAYS_DIR, 'pending.json');
  writeFileSync(pendingPath, JSON.stringify(pending, null, 2) + '\n');
}

/**
 * Approve pending overlay change (merge to live.json)
 */
export function approveOverlayChange(overlayId: string): void {
  const pending = getOverlayPendingChanges();
  if (!pending[overlayId]) {
    throw new Error(`No pending change for overlay: ${overlayId}`);
  }

  const live = getLiveOverlayValues();
  live[overlayId] = { ...live[overlayId], ...pending[overlayId].proposed };

  const livePath = join(OVERLAYS_DIR, 'live.json');
  writeFileSync(livePath, JSON.stringify(live, null, 2) + '\n');

  // Remove from pending
  delete pending[overlayId];
  const pendingPath = join(OVERLAYS_DIR, 'pending.json');
  writeFileSync(pendingPath, Object.keys(pending).length > 0 ? JSON.stringify(pending, null, 2) + '\n' : '{}\n');
}

/**
 * Reject pending overlay change
 */
export function rejectOverlayChange(overlayId: string): void {
  const pending = getOverlayPendingChanges();
  if (!pending[overlayId]) {
    throw new Error(`No pending change for overlay: ${overlayId}`);
  }

  delete pending[overlayId];
  const pendingPath = join(OVERLAYS_DIR, 'pending.json');
  writeFileSync(pendingPath, Object.keys(pending).length > 0 ? JSON.stringify(pending, null, 2) + '\n' : '{}\n');
}

export interface OverlayData {
  id: string;
  label: string;
  fields: Record<string, OverlayFieldSchema>;
  values: OverlayValues;
  pendingChange: OverlayPendingChange | null;
}

/**
 * Get all overlay data for admin UI
 */
export function getAllOverlayData(): OverlayData[] {
  const schemas = getOverlaySchemas();
  const liveValues = getLiveOverlayValues();
  const pendingChanges = getOverlayPendingChanges();

  return Object.entries(schemas).map(([id, schema]) => ({
    id,
    label: schema.label,
    fields: schema.fields,
    values: liveValues[id] || {},
    pendingChange: pendingChanges[id] || null
  }));
}

/**
 * Get overlay values for a specific overlay (for frontend use)
 */
export function getOverlayValues(overlayId: string): OverlayValues {
  const live = getLiveOverlayValues();
  return live[overlayId] || {};
}

/**
 * Get overlay values with preview mode support
 * In preview mode, returns pending changes merged with live if any
 */
export function getOverlayValuesWithPreview(overlayId: string, isPreviewMode: boolean): OverlayValues {
  const live = getLiveOverlayValues();
  const liveValues = live[overlayId] || {};

  if (isPreviewMode) {
    const pending = getOverlayPendingChanges();
    if (pending[overlayId]) {
      return { ...liveValues, ...pending[overlayId].proposed };
    }
  }
  return liveValues;
}
