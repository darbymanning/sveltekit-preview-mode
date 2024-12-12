/**
 * Return the `exitPreviewQueryParam` and `isPreview` values so that they can be referenced in client-side code.
 */
export async function load({ locals }) {
	return {
		exitPreviewQueryParam: locals.exitPreviewQueryParam,
		isPreview: locals.isPreview
	};
}
