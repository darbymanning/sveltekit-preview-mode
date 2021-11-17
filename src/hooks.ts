import type { GetSession } from "@sveltejs/kit";

export const getSession: GetSession = ({ headers }) => {
  return {
    preview: headers.cookie?.includes("__preview_mode=true"),
  };
};
