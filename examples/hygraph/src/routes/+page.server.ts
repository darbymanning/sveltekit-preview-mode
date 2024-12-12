import cms from '$lib/cms';

export async function load({ locals }) {
	return {
		posts: await cms.get_posts(locals.isPreview)
	};
}
