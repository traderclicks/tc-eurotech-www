import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getPageWithPreview } from '$lib/cms/pages';

export const load: PageServerLoad = async () => {
  const page = getPageWithPreview('insurance', false);
  if (!page) throw error(404, 'Insurance page content not found');
  return { page };
};
