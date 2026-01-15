import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import {
  getAllSlotData,
  proposeChange,
  approveChange,
  rejectChange
} from '$lib/cms/slots';
import { getGalleryFolders } from '$lib/cms/gallery';
import { canApprove, canPropose, verifySessionToken } from '$lib/cms/auth';

export const load: PageServerLoad = async ({ parent }) => {
  const { user } = await parent();

  const slots = getAllSlotData();
  const hasPendingChanges = slots.some(slot => slot.pendingChange);
  const gallery = getGalleryFolders();

  return {
    slots,
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
  }
} satisfies Actions;
