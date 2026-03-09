import type { PageServerLoad } from './$types';
import { getBlogPost } from '$lib/cms/blog';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
  const post = getBlogPost(params.slug);

  if (!post) {
    throw error(404, 'Blog post not found');
  }

  return { post };
};
