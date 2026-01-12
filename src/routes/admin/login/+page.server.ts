import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import {
  isAllowedEmail,
  generateMagicLinkToken,
  verifyMagicLinkToken,
  generateSessionToken,
  verifySessionToken
} from '$lib/cms/auth';

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
    try {
      const email = await verifyMagicLinkToken(token);
      const sessionToken = await generateSessionToken(email);

      cookies.set('cms_session', sessionToken, {
        path: '/',
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7 // 7 days
      });

      throw redirect(303, '/admin');
    } catch (error) {
      return {
        error: 'Invalid or expired magic link. Please request a new one.'
      };
    }
  }

  return {};
};

export const actions = {
  request: async ({ request }) => {
    const data = await request.formData();
    const email = data.get('email')?.toString().toLowerCase().trim();

    if (!email) {
      return fail(400, { error: 'Email is required', email: '' });
    }

    if (!isAllowedEmail(email)) {
      // Don't reveal if email exists - same message for all
      return {
        success: true,
        message: 'If your email is authorized, you will receive a login link shortly.'
      };
    }

    try {
      const token = await generateMagicLinkToken(email);

      // In production, send email. For now, log to console.
      const magicLink = `${process.env.ORIGIN || 'http://localhost:5173'}/admin/login?token=${token}`;

      // TODO: Send email with nodemailer
      // For development, log the link
      console.log('\n========================================');
      console.log('MAGIC LINK (dev mode):');
      console.log(magicLink);
      console.log('========================================\n');

      return {
        success: true,
        message: 'If your email is authorized, you will receive a login link shortly.',
        // In dev mode, also return link for easy testing
        devLink: process.env.NODE_ENV === 'development' ? magicLink : undefined
      };
    } catch (error) {
      return fail(500, { error: 'Failed to generate login link', email });
    }
  },

  logout: async ({ cookies }) => {
    cookies.delete('cms_session', { path: '/' });
    throw redirect(303, '/admin/login');
  }
} satisfies Actions;
