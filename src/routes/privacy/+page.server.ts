import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getPageWithPreview } from '$lib/cms/pages';

export const load: PageServerLoad = async ({ parent }) => {
  const { isPreviewMode } = await parent();
  const page = getPageWithPreview('privacy', !!isPreviewMode);
  if (!page) throw error(404, 'Page not found');
  return { page };
};
