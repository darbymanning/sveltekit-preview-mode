import cms from "$lib/cms";
import type { PageServerLoad } from "./$types";

export const load = (async ({ locals }) => {
  return {
    posts: await cms.get_posts(locals.isPreview),
  };
}) satisfies PageServerLoad;
