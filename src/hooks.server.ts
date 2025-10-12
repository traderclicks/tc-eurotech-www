import { redirect, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  const { url, cookies } = event;

  // Allow login page and API routes
  if (url.pathname === '/login' || url.pathname.startsWith('/api/')) {
    return resolve(event);
  }

  // Check for authentication cookie
  const isAuthenticated = cookies.get('authenticated') === 'true';

  if (!isAuthenticated) {
    throw redirect(303, '/login');
  }

  return resolve(event);
};
