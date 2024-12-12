import cms from '$lib/cms';

export async function load({ params, locals }) {
	return await cms.get_post_and_more_posts(params.slug, locals.isPreview);
}
