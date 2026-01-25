import type { LayoutServerLoad } from './$types';
import { verifySessionToken, generateSessionToken } from '$lib/cms/auth-service';

export const load: LayoutServerLoad = async ({ cookies }) => {
  // Check for preview mode
  const isPreviewMode = cookies.get('cms_preview') === 'true';

  // Check for CMS session on all pages
  const sessionToken = cookies.get('cms_session');

  if (!sessionToken) {
    return { cmsUser: null, isPreviewMode };
  }

  const user = await verifySessionToken(sessionToken);

  if (!user) {
    // Invalid/expired session - clear cookie
    cookies.delete('cms_session', { path: '/' });
    return { cmsUser: null };
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

  return { cmsUser: user, isPreviewMode };
};
