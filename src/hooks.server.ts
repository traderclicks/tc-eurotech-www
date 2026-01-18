import { redirect, type Handle } from '@sveltejs/kit';
import { verifySessionToken } from '$lib/cms/auth-service';

export const handle: Handle = async ({ event, resolve }) => {
  const { url, cookies } = event;

  // Allow admin routes (has own auth), API routes, and static assets
  if (
    url.pathname.startsWith('/admin') ||
    url.pathname.startsWith('/api/') ||
    url.pathname.startsWith('/_app/') ||
    url.pathname.includes('.')  // Static files (css, js, images)
  ) {
    return resolve(event);
  }

  // Magic link auth required for all pages on preview/client subdomains
  const cmsSession = cookies.get('cms_session');
  const user = cmsSession ? await verifySessionToken(cmsSession) : null;

  if (!user) {
    throw redirect(303, '/admin/login');
  }

  return resolve(event);
};
