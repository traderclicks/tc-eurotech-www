import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import {
  getAllSlotData,
  proposeChange,
  approveChange,
  rejectChange
} from '$lib/cms/slots';
import {
  getAllTextSlotData,
  proposeTextChange,
  approveTextChange,
  rejectTextChange
} from '$lib/cms/text-slots';
import {
  getAllMetaSlotData,
  proposeMetaChange,
  approveMetaChange,
  rejectMetaChange
} from '$lib/cms/meta-slots';
import {
  getStoreInfoData,
  proposeStoreChange,
  approveStoreChange,
  rejectStoreChange
} from '$lib/cms/store-info';
import {
  getAllOverlayData,
  proposeOverlayChange,
  approveOverlayChange,
  rejectOverlayChange
} from '$lib/cms/overlays';
import { getGalleryFolders } from '$lib/cms/gallery';
import { canApprove, canPropose, verifySessionToken } from '$lib/cms/auth-service';

export const load: PageServerLoad = async ({ parent }) => {
  const { user } = await parent();

  const slots = getAllSlotData();
  const textSlots = getAllTextSlotData();
  const metaSlots = getAllMetaSlotData();
  const storeInfo = getStoreInfoData();
  const overlays = getAllOverlayData();
  const hasPendingChanges = slots.some(slot => slot.pendingChange) ||
    textSlots.some(slot => slot.pendingChange) ||
    metaSlots.some(slot => slot.pendingChange) ||
    storeInfo.pendingChange !== null ||
    overlays.some(o => o.pendingChange !== null);
  const gallery = getGalleryFolders();

  return {
    slots,
    textSlots,
    metaSlots,
    storeInfo,
    overlays,
    hasPendingChanges,
    gallery,
    canApprove: user ? canApprove(user) : false,
    canPropose: user ? canPropose(user) : false
  };
};

async function getUserFromCookies(cookies: { get: (name: string) => string | undefined }) {
  const sessionToken = cookies.get('cms_session');
  if (!sessionToken) return null;
  return await verifySessionToken(sessionToken);
}

export const actions = {
  propose: async ({ request, cookies }) => {
    const user = await getUserFromCookies(cookies);
    if (!user || !canPropose(user)) {
      return fail(403, { error: 'Not authorized to propose changes' });
    }

    const data = await request.formData();
    const slotId = data.get('slotId')?.toString();
    const imagesRaw = data.get('images')?.toString();
    const note = data.get('note')?.toString();

    if (!slotId || !imagesRaw) {
      return fail(400, { error: 'Missing required fields' });
    }

    try {
      const images = JSON.parse(imagesRaw);
      proposeChange(slotId, images, user.email, note);
      return { success: true, action: 'proposed', slotId };
    } catch (error) {
      return fail(400, { error: error instanceof Error ? error.message : 'Failed to propose change' });
    }
  },

  approve: async ({ request, cookies }) => {
    const user = await getUserFromCookies(cookies);
    if (!user || !canApprove(user)) {
      return fail(403, { error: 'Not authorized to approve changes' });
    }

    const data = await request.formData();
    const slotId = data.get('slotId')?.toString();

    if (!slotId) {
      return fail(400, { error: 'Missing slot ID' });
    }

    try {
      approveChange(slotId);
      return { success: true, action: 'approved', slotId };
    } catch (error) {
      return fail(400, { error: error instanceof Error ? error.message : 'Failed to approve change' });
    }
  },

  reject: async ({ request, cookies }) => {
    const user = await getUserFromCookies(cookies);
    if (!user || !canApprove(user)) {
      return fail(403, { error: 'Not authorized to reject changes' });
    }

    const data = await request.formData();
    const slotId = data.get('slotId')?.toString();

    if (!slotId) {
      return fail(400, { error: 'Missing slot ID' });
    }

    try {
      rejectChange(slotId);
      return { success: true, action: 'rejected', slotId };
    } catch (error) {
      return fail(400, { error: error instanceof Error ? error.message : 'Failed to reject change' });
    }
  },

  // Text slot actions
  proposeText: async ({ request, cookies }) => {
    const user = await getUserFromCookies(cookies);
    if (!user || !canPropose(user)) {
      return fail(403, { error: 'Not authorized to propose changes' });
    }

    const data = await request.formData();
    const slotId = data.get('slotId')?.toString();
    const value = data.get('value')?.toString() ?? '';
    const note = data.get('note')?.toString();

    if (!slotId) {
      return fail(400, { error: 'Missing required fields' });
    }

    try {
      proposeTextChange(slotId, value, user.email, note);
      return { success: true, action: 'proposed', slotId };
    } catch (error) {
      return fail(400, { error: error instanceof Error ? error.message : 'Failed to propose change' });
    }
  },

  approveText: async ({ request, cookies }) => {
    const user = await getUserFromCookies(cookies);
    if (!user || !canApprove(user)) {
      return fail(403, { error: 'Not authorized to approve changes' });
    }

    const data = await request.formData();
    const slotId = data.get('slotId')?.toString();

    if (!slotId) {
      return fail(400, { error: 'Missing slot ID' });
    }

    try {
      approveTextChange(slotId);
      return { success: true, action: 'approved', slotId };
    } catch (error) {
      return fail(400, { error: error instanceof Error ? error.message : 'Failed to approve change' });
    }
  },

  rejectText: async ({ request, cookies }) => {
    const user = await getUserFromCookies(cookies);
    if (!user || !canApprove(user)) {
      return fail(403, { error: 'Not authorized to reject changes' });
    }

    const data = await request.formData();
    const slotId = data.get('slotId')?.toString();

    if (!slotId) {
      return fail(400, { error: 'Missing slot ID' });
    }

    try {
      rejectTextChange(slotId);
      return { success: true, action: 'rejected', slotId };
    } catch (error) {
      return fail(400, { error: error instanceof Error ? error.message : 'Failed to reject change' });
    }
  },

  // Meta slot actions
  proposeMeta: async ({ request, cookies }) => {
    const user = await getUserFromCookies(cookies);
    if (!user || !canPropose(user)) {
      return fail(403, { error: 'Not authorized to propose changes' });
    }

    const data = await request.formData();
    const pageId = data.get('pageId')?.toString();
    const title = data.get('title')?.toString() ?? '';
    const description = data.get('description')?.toString() ?? '';
    const keywords = data.get('keywords')?.toString() ?? '';
    const ogImage = data.get('ogImage')?.toString() ?? '';
    const note = data.get('note')?.toString();

    if (!pageId) {
      return fail(400, { error: 'Missing required fields' });
    }

    try {
      proposeMetaChange(pageId, { title, description, keywords, ogImage }, user.email, note);
      return { success: true, action: 'proposed', slotId: pageId };
    } catch (error) {
      return fail(400, { error: error instanceof Error ? error.message : 'Failed to propose change' });
    }
  },

  approveMeta: async ({ request, cookies }) => {
    const user = await getUserFromCookies(cookies);
    if (!user || !canApprove(user)) {
      return fail(403, { error: 'Not authorized to approve changes' });
    }

    const data = await request.formData();
    const pageId = data.get('pageId')?.toString();

    if (!pageId) {
      return fail(400, { error: 'Missing page ID' });
    }

    try {
      approveMetaChange(pageId);
      return { success: true, action: 'approved', slotId: pageId };
    } catch (error) {
      return fail(400, { error: error instanceof Error ? error.message : 'Failed to approve change' });
    }
  },

  rejectMeta: async ({ request, cookies }) => {
    const user = await getUserFromCookies(cookies);
    if (!user || !canApprove(user)) {
      return fail(403, { error: 'Not authorized to reject changes' });
    }

    const data = await request.formData();
    const pageId = data.get('pageId')?.toString();

    if (!pageId) {
      return fail(400, { error: 'Missing page ID' });
    }

    try {
      rejectMetaChange(pageId);
      return { success: true, action: 'rejected', slotId: pageId };
    } catch (error) {
      return fail(400, { error: error instanceof Error ? error.message : 'Failed to reject change' });
    }
  },

  // Store info actions
  proposeStore: async ({ request, cookies }) => {
    const user = await getUserFromCookies(cookies);
    if (!user || !canPropose(user)) {
      return fail(403, { error: 'Not authorized to propose changes' });
    }

    const data = await request.formData();
    const valuesRaw = data.get('values')?.toString();
    const note = data.get('note')?.toString();

    if (!valuesRaw) {
      return fail(400, { error: 'Missing required fields' });
    }

    try {
      const values = JSON.parse(valuesRaw);
      proposeStoreChange(values, user.email, note);
      return { success: true, action: 'proposed', slotId: 'store-info' };
    } catch (error) {
      return fail(400, { error: error instanceof Error ? error.message : 'Failed to propose change' });
    }
  },

  approveStore: async ({ cookies }) => {
    const user = await getUserFromCookies(cookies);
    if (!user || !canApprove(user)) {
      return fail(403, { error: 'Not authorized to approve changes' });
    }

    try {
      approveStoreChange();
      return { success: true, action: 'approved', slotId: 'store-info' };
    } catch (error) {
      return fail(400, { error: error instanceof Error ? error.message : 'Failed to approve change' });
    }
  },

  rejectStore: async ({ cookies }) => {
    const user = await getUserFromCookies(cookies);
    if (!user || !canApprove(user)) {
      return fail(403, { error: 'Not authorized to reject changes' });
    }

    try {
      rejectStoreChange();
      return { success: true, action: 'rejected', slotId: 'store-info' };
    } catch (error) {
      return fail(400, { error: error instanceof Error ? error.message : 'Failed to reject change' });
    }
  },

  // Overlay actions
  proposeOverlay: async ({ request, cookies }) => {
    const user = await getUserFromCookies(cookies);
    if (!user || !canPropose(user)) {
      return fail(403, { error: 'Not authorized to propose changes' });
    }

    const data = await request.formData();
    const overlayId = data.get('overlayId')?.toString();
    const valuesRaw = data.get('values')?.toString();
    const note = data.get('note')?.toString();

    if (!overlayId || !valuesRaw) {
      return fail(400, { error: 'Missing required fields' });
    }

    try {
      const values = JSON.parse(valuesRaw);
      proposeOverlayChange(overlayId, values, user.email, note);
      return { success: true, action: 'proposed', slotId: overlayId };
    } catch (error) {
      return fail(400, { error: error instanceof Error ? error.message : 'Failed to propose change' });
    }
  },

  approveOverlay: async ({ request, cookies }) => {
    const user = await getUserFromCookies(cookies);
    if (!user || !canApprove(user)) {
      return fail(403, { error: 'Not authorized to approve changes' });
    }

    const data = await request.formData();
    const overlayId = data.get('overlayId')?.toString();

    if (!overlayId) {
      return fail(400, { error: 'Missing overlay ID' });
    }

    try {
      approveOverlayChange(overlayId);
      return { success: true, action: 'approved', slotId: overlayId };
    } catch (error) {
      return fail(400, { error: error instanceof Error ? error.message : 'Failed to approve change' });
    }
  },

  rejectOverlay: async ({ request, cookies }) => {
    const user = await getUserFromCookies(cookies);
    if (!user || !canApprove(user)) {
      return fail(403, { error: 'Not authorized to reject changes' });
    }

    const data = await request.formData();
    const overlayId = data.get('overlayId')?.toString();

    if (!overlayId) {
      return fail(400, { error: 'Missing overlay ID' });
    }

    try {
      rejectOverlayChange(overlayId);
      return { success: true, action: 'rejected', slotId: overlayId };
    } catch (error) {
      return fail(400, { error: error instanceof Error ? error.message : 'Failed to reject change' });
    }
  }
} satisfies Actions;
