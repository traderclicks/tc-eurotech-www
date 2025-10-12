import { redirect, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  const { url, cookies } = event;

  // Allow login page, API routes, and static assets
  if (
    url.pathname.startsWith('/login') ||
    url.pathname.startsWith('/api/') ||
    url.pathname.startsWith('/_app/') ||
    url.pathname.includes('.')  // Static files (css, js, images)
  ) {
    return resolve(event);
  }

  // Check for authentication cookie
  const isAuthenticated = cookies.get('authenticated') === 'true';

  if (!isAuthenticated) {
    throw redirect(303, '/login');
  }

  return resolve(event);
};
