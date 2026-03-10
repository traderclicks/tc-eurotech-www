import type { PageServerLoad } from './$types';
import { getLatestBlogPosts, getDefaultPostImage } from '$lib/cms/blog';

export const load: PageServerLoad = async () => {
  const latestPosts = getLatestBlogPosts(3);
  const defaultPostImage = getDefaultPostImage();

  return { latestPosts, defaultPostImage };
};
