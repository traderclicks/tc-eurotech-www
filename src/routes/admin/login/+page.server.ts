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
      const magicLink = `${process.env.ORIGIN || 'http://localhost:3021'}/admin/login?token=${token}`;

      // Send email via tc-services
      const servicesUrl = process.env.TC_SERVICES_URL;
      const servicesSecret = process.env.TC_SERVICES_SECRET;

      if (servicesUrl && servicesSecret) {
        const response = await fetch(`${servicesUrl}/api/email/magic-link`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${servicesSecret}`
          },
          body: JSON.stringify({
            to: email,
            magicLink,
            siteName: 'Eurotech Auto CMS'
          })
        });

        if (!response.ok) {
          console.error('Failed to send magic link email:', await response.text());
        }
      } else {
        // Dev fallback: log to console
        console.log('\n========================================');
        console.log('MAGIC LINK (dev mode - tc-services not configured):');
        console.log(magicLink);
        console.log('========================================\n');
      }

      return {
        success: true,
        message: 'If your email is authorized, you will receive a login link shortly.',
        devLink: !servicesUrl ? magicLink : undefined
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
