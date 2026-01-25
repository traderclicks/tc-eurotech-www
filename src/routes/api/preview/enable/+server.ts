import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ cookies, url }) => {
  // Set preview cookie
  cookies.set('cms_preview', 'true', {
    path: '/',
    httpOnly: true,
    secure: false, // Allow on localhost
    sameSite: 'lax',
    maxAge: 60 * 60 * 4 // 4 hours
  });

  // Redirect to homepage or specified return URL
  const returnUrl = url.searchParams.get('return') || '/';
  throw redirect(303, returnUrl);
};
