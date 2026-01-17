import type { LayoutServerLoad } from './$types';
import { verifySessionToken } from '$lib/cms/auth-service';

export const load: LayoutServerLoad = async ({ cookies, url }) => {
  // Check for CMS session on all pages
  const sessionToken = cookies.get('cms_session');

  if (!sessionToken) {
    return { cmsUser: null };
  }

  const user = await verifySessionToken(sessionToken);
  return { cmsUser: user };
};
