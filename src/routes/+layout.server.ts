import { setPreview } from 'preview-mode';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = ({ locals: { exitPreviewQueryParam, isPreview } }) => {
	/**
	 * Use `setPreview` to update the `isPreview` store value, so that we can easily reference it when making API calls.
	 *
	 * When making an API call, we can use the `isPreview` store value to determine whether to use the production or development API token.
	 *
	 * For example:
	 *
	 * import { isPreview } from 'preview-mode';
	 * import { createClient } from 'sdk';
	 *
	 * const client = () => createClient({
	 *   projectId: 'project-id',
	 *   accessToken: isPreview() ? 'dev-token' : 'prod-token'
	 * });
	 * */
	setPreview(isPreview);

	/**
	 * Return the `exitPreviewQueryParam` and `isPreview` values so that they can be referenced in client-side code.
	 */
	return {
		exitPreviewQueryParam,
		isPreview
	};
};
