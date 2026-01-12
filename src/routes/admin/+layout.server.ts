import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { verifySessionToken } from '$lib/cms/auth';

export const load: LayoutServerLoad = async ({ cookies, url }) => {
  // Allow access to login page without auth
  if (url.pathname === '/admin/login') {
    return {};
  }

  const sessionToken = cookies.get('cms_session');

  if (!sessionToken) {
    throw redirect(303, '/admin/login');
  }

  const user = await verifySessionToken(sessionToken);

  if (!user) {
    // Invalid or expired session
    cookies.delete('cms_session', { path: '/' });
    throw redirect(303, '/admin/login');
  }

  return {
    user
  };
};
