import { type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  // Preview mode cookie is set by the Controlla Connector (D549) when it ships.
  // Until then nothing sets it, so isPreviewMode stays false everywhere.
  // CMS loaders still accept the flag via their getXWithPreview() signatures so
  // wiring the Connector later is additive — no signature changes required.
  event.locals.isPreviewMode = event.cookies.get('cms_preview') === 'true';

  return resolve(event);
};
