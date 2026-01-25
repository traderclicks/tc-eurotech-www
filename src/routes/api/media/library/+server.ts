/**
 * Media Library API
 * GET - List all images with optional filtering
 * POST - Add new image metadata
 */

import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { verifySessionToken, canPropose } from '$lib/cms/auth-service';
import {
  getAllImages,
  getImagesFiltered,
  getFolders,
  getAllTags,
  addImage,
  generateImageId,
  getClientSlug,
  validateTenant
} from '$lib/cms/media';
import type { MediaImage } from '$lib/cms/media-types';

async function getUser(cookies: { get: (name: string) => string | undefined }) {
  const sessionToken = cookies.get('cms_session');
  if (!sessionToken) return null;
  return await verifySessionToken(sessionToken);
}

export const GET: RequestHandler = async ({ url, cookies }) => {
  const user = await getUser(cookies);
  if (!user) {
    throw error(401, 'Unauthorized');
  }

  // Validate tenant matches deployment (defense in depth)
  try {
    validateTenant(user);
  } catch {
    throw error(403, 'Tenant mismatch - contact administrator');
  }

  const folder = url.searchParams.get('folder') || undefined;
  const tags = url.searchParams.get('tags')?.split(',').filter(Boolean) || undefined;
  const search = url.searchParams.get('search') || undefined;
  const limit = url.searchParams.get('limit') ? parseInt(url.searchParams.get('limit')!) : undefined;
  const offset = url.searchParams.get('offset') ? parseInt(url.searchParams.get('offset')!) : undefined;
  const includeMeta = url.searchParams.get('meta') === 'true';

  const images = getImagesFiltered({ folder, tags, search, limit, offset });

  if (includeMeta) {
    const folders = getFolders();
    const allTags = getAllTags();
    const totalCount = getAllImages().length;

    return json({
      images,
      folders,
      tags: allTags,
      totalCount,
      filteredCount: images.length
    });
  }

  return json({ images });
};

export const POST: RequestHandler = async ({ request, cookies }) => {
  const user = await getUser(cookies);
  if (!user || !canPropose(user)) {
    throw error(403, 'Not authorized to add images');
  }

  // Validate tenant matches deployment (defense in depth)
  try {
    validateTenant(user);
  } catch {
    throw error(403, 'Tenant mismatch - contact administrator');
  }

  const body = await request.json();

  // Validate required fields
  if (!body.filename || !body.storage?.url || !body.metadata?.alt) {
    throw error(400, 'Missing required fields: filename, storage.url, metadata.alt');
  }

  const now = new Date().toISOString();

  const image: MediaImage = {
    id: generateImageId(),
    filename: body.filename,
    storage: {
      bucket: body.storage.bucket || 'local',
      key: body.storage.key || body.filename,
      url: body.storage.url,
      size: body.storage.size || 0,
      format: body.storage.format || 'jpeg'
    },
    dimensions: {
      width: body.dimensions?.width || 0,
      height: body.dimensions?.height || 0,
      aspectRatio: body.dimensions?.aspectRatio || 'unknown'
    },
    metadata: {
      alt: body.metadata.alt,
      title: body.metadata.title,
      description: body.metadata.description,
      tags: body.metadata.tags || [],
      folder: body.metadata.folder || 'general',
      dominantColor: body.metadata.dominantColor
    },
    attribution: {
      source: body.attribution?.source || 'upload',
      photographer: body.attribution?.photographer,
      photographerUrl: body.attribution?.photographerUrl,
      sourceUrl: body.attribution?.sourceUrl,
      license: body.attribution?.license || 'owned',
      requiresAttribution: body.attribution?.requiresAttribution || false,
      attributionText: body.attribution?.attributionText
    },
    dates: {
      uploaded: now,
      modified: now,
      photographed: body.dates?.photographed
    },
    usage: {
      slots: [],
      usageCount: 0
    },
    client: getClientSlug(user) // Client from auth context, validated against deployment
  };

  try {
    addImage(image);
    return json({ success: true, image }, { status: 201 });
  } catch (err) {
    throw error(400, err instanceof Error ? err.message : 'Failed to add image');
  }
};
