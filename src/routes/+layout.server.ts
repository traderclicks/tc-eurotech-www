import type { LayoutServerLoad } from './$types';
import { getReviewsWithPreview } from '$lib/cms/reviews';
import { getInsurersWithPreview } from '$lib/cms/insurers';
import { getFaqsWithPreview } from '$lib/cms/faqs';

export const load: LayoutServerLoad = async ({ cookies }) => {
  // Preview mode arrives from the Controlla Connector (D549) when it ships.
  // For now nothing sets the cookie, so this is effectively always false.
  const isPreviewMode = cookies.get('cms_preview') === 'true';

  const reviews = getReviewsWithPreview(isPreviewMode);
  const insurers = getInsurersWithPreview(isPreviewMode);
  const faqs = getFaqsWithPreview(isPreviewMode);

  return { isPreviewMode, reviews, insurers, faqs };
};
