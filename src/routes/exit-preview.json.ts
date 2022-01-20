import { clearPreviewCookie } from "$lib/utils";
import type { RequestHandler } from "@sveltejs/kit";

type GetOutput = {
  message: string;
};

export const get: RequestHandler<unknown, GetOutput> = async () => {
  return {
    status: 307,
    headers: {
      "Set-Cookie": clearPreviewCookie,
      location: "/",
    },
  };
};
