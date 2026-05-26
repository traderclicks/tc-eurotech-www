import type { LayoutServerLoad } from './$types';
import { verifySessionToken, generateSessionToken } from '$lib/cms/auth-service';
import { getReviewsWithPreview } from '$lib/cms/reviews';
import { getInsurersWithPreview } from '$lib/cms/insurers';
import { getFaqsWithPreview } from '$lib/cms/faqs';

export const load: LayoutServerLoad = async ({ cookies }) => {
  // Check for preview mode
  const isPreviewMode = cookies.get('cms_preview') === 'true';

  const reviews = getReviewsWithPreview(isPreviewMode);
  const insurers = getInsurersWithPreview(isPreviewMode);
  const faqs = getFaqsWithPreview(isPreviewMode);

  // Check for CMS session on all pages
  const sessionToken = cookies.get('cms_session');

  if (!sessionToken) {
    return { cmsUser: null, isPreviewMode, reviews, insurers, faqs };
  }

  const user = await verifySessionToken(sessionToken);

  if (!user) {
    // Invalid/expired session - clear cookie
    cookies.delete('cms_session', { path: '/' });
    return { cmsUser: null, isPreviewMode, reviews, insurers, faqs };
  }

  // Sliding window: refresh session on each request
  const newToken = await generateSessionToken(user);
  cookies.set('cms_session', newToken, {
    path: '/',
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: 60 * 30 // 30 minutes
  });

  return { cmsUser: user, isPreviewMode, reviews, insurers, faqs };
};
