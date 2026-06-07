import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getAllBlogPosts, getDefaultPostImage } from '$lib/cms/blog';
import { getPageWithPreview } from '$lib/cms/pages';

export const load: PageServerLoad = async () => {
  const page = getPageWithPreview('blog', false);
  if (!page) throw error(404, 'Blog index page content not found');

  const posts = getAllBlogPosts();
  const defaultPostImage = getDefaultPostImage();

  return { page, posts, defaultPostImage };
};
