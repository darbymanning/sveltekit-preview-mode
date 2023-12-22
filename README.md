# SvelteKit Preview Mode

SvelteKit Preview Mode is a library for [SvelteKit](https://svelte.dev/docs#sveltekit) that helps you easily enable preview mode for content management systems (CMSs). With this library, you can preview draft or unpublished content without any hassle. This is intended to be a SvelteKit equivelant of the [Next.js Preview Mode](https://nextjs.org/docs/advanced-features/preview-mode).

## Demo (using Hygraph)

- [Live](https://sveltekit-preview-mode.vercel.app/)
- [Preview Mode](https://sveltekit-preview-mode.vercel.app/?secret=quiet-as-a-mouse)

## Installation

To install SvelteKit Preview Mode, run the following command:

```bash
pnpm add sveltekit-preview-mode -D
```

## Usage

To use SvelteKit Preview Mode, simply import it in your SvelteKit application:

```ts
// src/hooks.server.ts
import type { Handle } from "@sveltejs/kit";
import { PREVIEW_SECRET } from "$env/static/private";
import previewMode from "sveltekit-preview-mode";

export const handle: Handle = previewMode({
  previewSecret: PREVIEW_SECRET,
});
```

Don't forget to set the `PREVIEW_SECRET` [environment variable](https://kit.svelte.dev/docs/modules#$env-static-private). This can be any string you'd like. If you need to add additional handlers, you can do so using the [sequence helper function](https://kit.svelte.dev/docs/modules#sveltejs-kit-hooks-sequence).

In order to share the preview status in the client, you'll need to add this to `+layout.server.ts`:

```ts
// src/routes/+layout.server.ts
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
```

And then in `+layout.ts` you will need to pass the server state to the client:

```ts
// src/routes/+layout.ts
import type { LayoutLoad } from "./$types";

/**
 * Get isPreview returned from server load and return in client load so `isPreview` value can be referenced in client-side code.
 */
export const load = (({ data: { isPreview } }) => {
  return {
    isPreview,
  };
}) satisfies LayoutLoad;
```

### Displaying Preview Status

To display a banner when preview mode is enabled, import the `PreviewMode` banner component into `+layout.svelte`:

```svelte
<!-- src/routes/+layout.svelte -->
<script lang="ts">
  import { PreviewBanner } from "sveltekit-preview-mode";
</script>

<PreviewBanner />
```

You can retrieve the preview status by checking the global page store. `$page.data.isPreview`

### Enabling Preview Mode

To enable preview mode, add the query parameter `?secret=PREVIEW_SECRET` to any route. This will then check for a matching secret, and update the `isPreview` value, and set a cookie to securely persist preview mode between sessions.

### Disabling Preview Mode

To disable preview mode, add the query parameter `?exit-preview` to any route. This will then update the `isPreview` value, and update the cookie value.

## Examples

- [Hygraph](https://github.com/darbymanning/sveltekit-preview-mode/blob/main/examples/hygraph)
- [Contentful](https://github.com/darbymanning/sveltekit-preview-mode/blob/main/examples/contentful)

## Options

The `previewMode` handle function has a few options that can be set:

```ts
interface PreviewModeOptions {
  previewSecret: string;
  cookieName?: string;
  cookieOpts?: CookieSerializeOptions;
  exitPreviewQueryParam?: string;
  secretTokenQueryParam?: string;
}
```

<!-- prettier-ignore -->
| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `previewSecret` | `string` | N/A | This is the query parameter value, which needs to match in order to enable preview mode. |
| `cookieName?` | `string` | `__preview_mode` | The name of the cookie that is created to store the preview mode state. |
| `cookieOpts?` | [CookieSerializeOptions](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/98fc6ab64752d9227eeb75b0b5a6f645b1db587b/types/cookie/index.d.ts#L14-L111) | [🔗](https://github.com/darbymanning/sveltekit-preview-mode/blob/main/packages/sveltekit-preview-mode/src/lib/index.ts#L32-L38) | Options for the cookie we create. |
| `exitPreviewQueryParam?` | `string` | `exit-preview` | The query param that should be present to exit preview mode. |
| `secretTokenQueryParam?` | `string` | `secret` | The query param that should be used to enter preview mode. |

## Static Site Generation (SSG)

`sveltekit-preview-mode` mode is reliant on having a server to analyze the request and serve different content based on query params and cookies of the incoming request. Sveltekit does not support static site generation on pages that access cookies or url query params. Due to this, during build `sveltekit-preview-mode` is turned off.

If you would like to take advantage of prerendering while still using `sveltekit-preview-mode` I would suggest creating a copy of the prerendered route with a new routeId `/preview/[slug]` that is dynamic and redirecting back to the static route if not in preview mode.

```ts
// src/routes/preview/[slug]/+page.server.ts
import type { PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

export const prerender = false;
/**
 * Return the `exitPreviewQueryParam` and `isPreview` values so that they can be referenced in client-side code.
 */
export const load = (({ params, locals: { isPreview } }) => {
  if (!isPreview) throw redirect(302, `/${params.slug}`);
  return {
    isPreview,
  };
}) satisfies LayoutServerLoad;
```

## Contributing

If you'd like to contribute to SvelteKit Preview Mode, feel free to open an issue or pull request on our [GitHub repository](https://github.com/darbymanning/sveltekit-preview-mode).

## Credits

This project is inspired by the Vercel Next.js team's approach in providing [Preview Mode functionality](https://nextjs.org/docs/advanced-features/preview-mode). Thanks for their hard work! 🖤

## License

SvelteKit Preview Mode is released under the [ISC License](https://github.com/darbymanning/sveltekit-preview-mode/blob/main/LICENSE).
