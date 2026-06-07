import type { LayoutServerLoad } from './$types';
import { getReviewsWithPreview } from '$lib/cms/reviews';
import { getInsurersWithPreview } from '$lib/cms/insurers';
import { getFaqsWithPreview } from '$lib/cms/faqs';
import { getTextWithPreview } from '$lib/cms/text-slots';

export const load: LayoutServerLoad = async () => {
  // Loader wrappers keep the (isPreviewMode) signature for portfolio
  // consistency with other tc-*-www sites and the Controlla Connector
  // contract (D549). This site has no preview surface today so we
  // always pass false.
  const reviews = getReviewsWithPreview(false);
  const insurers = getInsurersWithPreview(false);
  const faqs = getFaqsWithPreview(false);
  const text = getTextWithPreview(false);

  return { reviews, insurers, faqs, text };
};
