import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getLatestBlogPosts, getDefaultPostImage } from '$lib/cms/blog';
import { getPageWithPreview } from '$lib/cms/pages';

export const load: PageServerLoad = async () => {
  const page = getPageWithPreview('home', false);
  if (!page) throw error(404, 'Home page content not found');

  const latestPosts = getLatestBlogPosts(3);
  const defaultPostImage = getDefaultPostImage();

  return { page, latestPosts, defaultPostImage };
};
