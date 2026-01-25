import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ cookies, url }) => {
  // Clear preview cookie
  cookies.delete('cms_preview', { path: '/' });

  // Redirect to homepage or specified return URL
  const returnUrl = url.searchParams.get('return') || '/';
  throw redirect(303, returnUrl);
};
