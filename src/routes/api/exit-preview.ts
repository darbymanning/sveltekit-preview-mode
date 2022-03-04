import { clearPreviewCookie } from "$lib/utils";
import type { RequestHandler } from "@sveltejs/kit";

export const get: RequestHandler = async ({ request, url }) => {
  return {
    status: 307,
    headers: {
      "Set-Cookie": clearPreviewCookie,
      location: request.headers.get("referer") || url.origin,
    },
  };
};
