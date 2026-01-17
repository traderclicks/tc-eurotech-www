import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import {
  requestMagicLink,
  verifyMagicLink,
  verifySessionToken,
  generateSessionToken
} from '$lib/cms/auth-service';

export const load: PageServerLoad = async ({ url, cookies }) => {
  // Check if already logged in
  const sessionToken = cookies.get('cms_session');
  if (sessionToken) {
    const user = await verifySessionToken(sessionToken);
    if (user) {
      throw redirect(303, '/admin');
    }
  }

  // Check for magic link token in URL
  const token = url.searchParams.get('token');
  if (token) {
    const result = await verifyMagicLink(token);

    if (result.valid && result.user) {
      // Create local session from verified user
      const sessionToken = await generateSessionToken(result.user);

      cookies.set('cms_session', sessionToken, {
        path: '/',
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7 // 7 days
      });

      throw redirect(303, '/admin');
    }

    return {
      error: result.error || 'Invalid or expired magic link. Please request a new one.'
    };
  }

  return {};
};

export const actions = {
  request: async ({ request, url }) => {
    const data = await request.formData();
    const email = data.get('email')?.toString().toLowerCase().trim();

    if (!email) {
      return fail(400, { error: 'Email is required', email: '' });
    }

    // Build callback URL from current origin
    const callbackUrl = `${url.origin}/admin/login`;

    // Delegate to auth service
    const result = await requestMagicLink(email, callbackUrl);

    return {
      success: result.success,
      message: result.message
    };
  },

  logout: async ({ cookies }) => {
    cookies.delete('cms_session', { path: '/' });
    throw redirect(303, '/admin/login');
  }
} satisfies Actions;
