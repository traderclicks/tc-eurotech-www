import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getSlotImagesWithPreview } from '$lib/cms/slots';
import { getPageWithPreview } from '$lib/cms/pages';

export const load: PageServerLoad = async () => {
  const page = getPageWithPreview('gallery', false);
  if (!page) throw error(404, 'Gallery page content not found');

  const slotImages = getSlotImagesWithPreview('gallery-page', false);
  const images = slotImages.map((src, index) => ({
    src,
    alt: `Workshop image ${index + 1}`
  }));

  return {
    page,
    images
  };
};
