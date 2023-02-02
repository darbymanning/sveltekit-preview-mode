import cms from "$lib/cms";
import type { PageServerLoad } from "./$types";

export const load = (async () => {
  return {
    posts: await cms.get_posts(),
  };
}) satisfies PageServerLoad;
