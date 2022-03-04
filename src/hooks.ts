import type { GetSession } from "@sveltejs/kit";

export const getSession: GetSession = ({ request: { headers } }) => {
  return {
    preview: headers.get("cookie").includes("__preview_mode=true"),
  };
};
