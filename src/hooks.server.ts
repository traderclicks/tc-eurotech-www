import { type Handle } from '@sveltejs/kit';
import { dev } from '$app/environment';
import { generateSessionToken } from '$lib/cms/auth-service';

export const handle: Handle = async ({ event, resolve }) => {
  const { url, cookies } = event;

  // Check for preview mode (requires valid session + preview cookie)
  const previewCookie = cookies.get('cms_preview');
  event.locals.isPreviewMode = previewCookie === 'true';

  // LOCAL DEV BYPASS - compile-time safe
  // The `dev` constant is evaluated at build time. In production builds,
  // this entire block is eliminated by dead code elimination.
  // Double-check with hostname for extra safety.
  if (dev && (url.hostname === 'localhost' || url.hostname === '127.0.0.1')) {
    let session = cookies.get('cms_session');
    if (!session) {
      const devUser = {
        userId: 'dev-local',
        email: 'dev@localhost',
        name: 'Local Developer',
        role: 'approver' as const
      };
      session = await generateSessionToken(devUser);
      cookies.set('cms_session', session, {
        path: '/',
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        maxAge: 60 * 60 * 24
      });
    }
    return resolve(event);
  }

  // All public pages are accessible without auth
  // Admin routes have their own auth in /admin/+layout.server.ts
  return resolve(event);
};
