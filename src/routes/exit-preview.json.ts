import { clearPreviewCookie } from "$lib/utils";
import type { RequestHandler } from "@sveltejs/kit";

type GetOutput = {
  message: string;
};

export const get: RequestHandler<unknown, unknown, GetOutput> = async ({
  headers: { referer },
}) => {
  return {
    status: 307,
    headers: {
      "Set-Cookie": clearPreviewCookie,
      location: referer,
    },
  };
};
