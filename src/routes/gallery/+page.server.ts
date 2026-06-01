import type { PageServerLoad } from './$types';
import { getSlotImagesWithPreview } from '$lib/cms/slots';

export const load: PageServerLoad = async () => {
  const slotImages = getSlotImagesWithPreview('gallery-page', false);

  const images = slotImages.map((src, index) => ({
    src,
    alt: `Workshop image ${index + 1}`
  }));

  return {
    images
  };
};
