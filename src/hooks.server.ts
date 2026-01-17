import { redirect, type Handle } from '@sveltejs/kit';
import { verifySessionToken } from '$lib/cms/auth-service';

export const handle: Handle = async ({ event, resolve }) => {
  const { url, cookies } = event;

  // Allow login page, admin (has own auth), API routes, and static assets
  if (
    url.pathname.startsWith('/login') ||
    url.pathname.startsWith('/admin') ||
    url.pathname.startsWith('/api/') ||
    url.pathname.startsWith('/_app/') ||
    url.pathname.includes('.')  // Static files (css, js, images)
  ) {
    return resolve(event);
  }

  // Check for site password authentication cookie
  const isAuthenticated = cookies.get('authenticated') === 'true';

  // Also allow CMS users to bypass site password
  const cmsSession = cookies.get('cms_session');
  const isCmsUser = cmsSession ? await verifySessionToken(cmsSession) : null;

  if (!isAuthenticated && !isCmsUser) {
    throw redirect(303, '/login');
  }

  return resolve(event);
};
