import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

const SITE_PASSWORD = process.env.SITE_PASSWORD || 'eurotech2025';

export const actions = {
  default: async ({ request, cookies }) => {
    const data = await request.formData();
    const password = data.get('password');

    if (password === SITE_PASSWORD) {
      // Set authentication cookie (expires in 24 hours)
      cookies.set('authenticated', 'true', {
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 // 24 hours
      });

      throw redirect(303, '/');
    }

    return fail(401, { incorrect: true });
  }
} satisfies Actions;
