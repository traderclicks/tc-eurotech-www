import type { PageServerLoad } from './$types';
import { getSlotImagesWithPreview } from '$lib/cms/slots';

export const load: PageServerLoad = async ({ parent }) => {
  const { isPreviewMode } = await parent();

  // Get images from CMS slot
  const slotImages = getSlotImagesWithPreview('gallery-page', isPreviewMode ?? false);

  // Convert to the format the page expects
  const images = slotImages.map((src, index) => ({
    src,
    alt: `Workshop image ${index + 1}`
  }));

  return {
    images
  };
};
