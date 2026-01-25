/**
 * Single Image API
 * GET - Get image details
 * PATCH - Update image metadata
 * DELETE - Remove image from library
 */

import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { verifySessionToken, canPropose, canApprove } from '$lib/cms/auth-service';
import { getImageById, updateImage, deleteImage, validateTenant } from '$lib/cms/media';
import type { MediaImage } from '$lib/cms/media-types';

async function getUser(cookies: { get: (name: string) => string | undefined }) {
  const sessionToken = cookies.get('cms_session');
  if (!sessionToken) return null;
  return await verifySessionToken(sessionToken);
}

function ensureValidTenant(user: { tenantId: string }) {
  try {
    validateTenant(user as Parameters<typeof validateTenant>[0]);
  } catch {
    throw error(403, 'Tenant mismatch - contact administrator');
  }
}

export const GET: RequestHandler = async ({ params, cookies }) => {
  const user = await getUser(cookies);
  if (!user) {
    throw error(401, 'Unauthorized');
  }
  ensureValidTenant(user);

  const image = getImageById(params.id);
  if (!image) {
    throw error(404, 'Image not found');
  }

  return json({ image });
};

export const PATCH: RequestHandler = async ({ params, request, cookies }) => {
  const user = await getUser(cookies);
  if (!user || !canPropose(user)) {
    throw error(403, 'Not authorized to update images');
  }
  ensureValidTenant(user);

  const image = getImageById(params.id);
  if (!image) {
    throw error(404, 'Image not found');
  }

  const body = await request.json();

  // Only allow updating metadata and attribution
  const updates: Partial<Pick<MediaImage, 'metadata' | 'attribution'>> = {};

  if (body.metadata) {
    updates.metadata = {
      ...image.metadata,
      ...body.metadata
    };
  }

  if (body.attribution) {
    updates.attribution = {
      ...image.attribution,
      ...body.attribution
    };
  }

  try {
    const updated = updateImage(params.id, updates);
    return json({ success: true, image: updated });
  } catch (err) {
    throw error(400, err instanceof Error ? err.message : 'Failed to update image');
  }
};

export const DELETE: RequestHandler = async ({ params, cookies }) => {
  const user = await getUser(cookies);
  // Only admins can delete images
  if (!user || !canApprove(user)) {
    throw error(403, 'Not authorized to delete images');
  }
  ensureValidTenant(user);

  const image = getImageById(params.id);
  if (!image) {
    throw error(404, 'Image not found');
  }

  // Check if image is in use
  if (image.usage.usageCount > 0) {
    throw error(400, `Image is in use by ${image.usage.usageCount} slot(s): ${image.usage.slots.join(', ')}`);
  }

  try {
    deleteImage(params.id);
    return json({ success: true });
  } catch (err) {
    throw error(400, err instanceof Error ? err.message : 'Failed to delete image');
  }
};
