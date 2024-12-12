import type { LayoutLoad } from './$types';

/**
 * Call `setPreview` with the `isPreview` value so that the `isPreview` value can be referenced in client-side code.
 */
export const load = (({ data: { isPreview } }) => {
	return {
		isPreview
	};
}) satisfies LayoutLoad;
