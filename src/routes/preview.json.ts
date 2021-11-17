import { previewCookie } from "$lib/utils";
import { getPostBySlug } from "$lib/services/graphcms";
import type { RequestHandler } from "@sveltejs/kit";

type GetOutput = {
  message: string;
};

export const get: RequestHandler<unknown, unknown, GetOutput> = async ({
  query,
}) => {
  // Check the secret and slug
  // This secret should only be known to this API route and the CMS
  if (
    query.get("secret") !== import.meta.env.VITE_GRAPHCMS_PREVIEW_SECRET ||
    !query.has("slug")
  ) {
    return {
      status: 401,
      body: {
        message: "Invalid token",
      },
    };
  }

  // Fetch the headless CMS to check if the provided `slug` exists
  // getPostBySlug would implement the required fetching logic to the headless CMS
  const post = await getPostBySlug(query.get("slug"), true);

  // If the slug doesn't exist prevent preview mode from being enabled
  if (!post) {
    return {
      status: 401,
      body: {
        message: "Invalid slug",
      },
    };
  }

  return {
    status: 307,
    headers: {
      // Enable Preview Mode by setting the cookies
      "Set-Cookie": previewCookie,
      // Redirect to the path from the fetched post
      // We don't redirect to request.query.slug as that might lead to open redirect vulnerabilities
      location: "/posts/" + post.slug,
    },
  };
};
