import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getBrandPageWithPreview, listBrandSlugs } from '$lib/cms/brand-pages';

export const load: PageServerLoad = async ({ params, parent }) => {
  const { isPreviewMode } = await parent();
  const brand = getBrandPageWithPreview(params.brand, !!isPreviewMode);
  if (!brand) {
    throw error(404, 'Page not found');
  }
  return { brand, slug: params.brand };
};

export const entries = () =>
  listBrandSlugs().map((brand) => ({ brand }));
