import type { PageServerLoad } from './$types';
import { getAllBlogPosts, getDefaultPostImage } from '$lib/cms/blog';

export const load: PageServerLoad = async () => {
  const posts = getAllBlogPosts();
  const defaultPostImage = getDefaultPostImage();

  return { posts, defaultPostImage };
};
