import type { LayoutServerLoad } from "./$types";

/**
 * Return the `exitPreviewQueryParam` and `isPreview` values so that they can be referenced in client-side code.
 */
export const load = (({ locals: { exitPreviewQueryParam, isPreview } }) => {
  return {
    exitPreviewQueryParam,
    isPreview,
  };
}) satisfies LayoutServerLoad;
