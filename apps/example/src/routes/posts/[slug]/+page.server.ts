import cms from "$lib/cms";
import type { PageServerLoad } from "./$types";

export const load = (async ({ params }) => {
  return await cms.get_post_and_more_posts(params.slug);
}) satisfies PageServerLoad;
