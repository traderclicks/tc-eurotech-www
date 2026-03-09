import type { PageServerLoad } from './$types';
import { getAllBlogPosts } from '$lib/cms/blog';

export const load: PageServerLoad = async () => {
  const posts = getAllBlogPosts();

  return { posts };
};
