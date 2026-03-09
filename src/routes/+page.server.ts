import type { PageServerLoad } from './$types';
import { getLatestBlogPosts } from '$lib/cms/blog';

export const load: PageServerLoad = async () => {
  const latestPosts = getLatestBlogPosts(3);

  return { latestPosts };
};
