import type { Handle } from "@sveltejs/kit";
import { env } from "$env/dynamic/private";
import previewMode from "sveltekit-preview-mode";

/**
 * Setup preview mode for the SvelteKit app.
 *
 * If the `previewSecret` query parameter matches the `previewSecret` value, then the `isPreview` store value will be set to `true`.
 * If the `exitPreviewQueryParam` query parameter is present, then the `isPreview` store value will be set to `false`.
 * The `isPreview` store value can be used to determine whether to use the production or development API token.
 *
 * If you need to add additional handlers, you can do so using the sequence helper function.
 *
 * @see https://kit.svelte.dev/docs/modules#sveltejs-kit-hooks
 */
export const handle: Handle = previewMode({
  previewSecret: env.PREVIEW_SECRET,
});
