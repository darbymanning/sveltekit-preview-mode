import { createClient, gql, cacheExchange, fetchExchange } from '@urql/svelte';
import {
	HYGRAPH_DEV_AUTH_TOKEN,
	HYGRAPH_PROD_AUTH_TOKEN,
	HYGRAPH_PROJECT_API
} from '$env/static/private';
import type { Post, PostAndMorePosts } from 'schema';

const client = (isPreview = false) => {
	return createClient({
		url: HYGRAPH_PROJECT_API,
		fetch,
		exchanges: [cacheExchange, fetchExchange],
		fetchOptions: () => ({
			headers: {
				authorization: `Bearer ${isPreview ? HYGRAPH_DEV_AUTH_TOKEN : HYGRAPH_PROD_AUTH_TOKEN}`
			}
		})
	});
};

const AuthorFragment = gql`
	fragment AuthorFragment on Author {
		name
		picture {
			url(transformation: { image: { resize: { height: 100, width: 100 } } })
		}
	}
`;

const PostFragment = gql`
	fragment PostFragment on Post {
		slug
		title
		excerpt
		date
		cover_image: coverImage {
			url
		}
		content {
			html
		}
		author {
			...AuthorFragment
		}
	}

	${AuthorFragment}
`;

export const get_post_and_more_posts = async (
	slug: string,
	isPreview = false
): Promise<PostAndMorePosts> => {
	const QUERY = gql`
		query Post($stage: Stage!, $slug: String!) {
			post(where: { slug: $slug }, stage: $stage) {
				...PostFragment
			}
			more_posts: posts(orderBy: date_DESC, first: 2, where: { slug_not_in: [$slug] }) {
				...PostFragment
			}
		}

		${PostFragment}
	`;

	const variables = {
		slug,
		stage: isPreview ? 'DRAFT' : 'PUBLISHED'
	};

	const req = await client(isPreview).query(QUERY, variables).toPromise();

	return req.data;
};

export const get_posts = async (isPreview = false): Promise<Post[]> => {
	const QUERY = gql`
		query Posts($stage: Stage!) {
			posts(stage: $stage) {
				...PostFragment
			}
		}

		${PostFragment}
	`;

	const variables = {
		stage: isPreview ? 'DRAFT' : 'PUBLISHED'
	};

	const req = await client(isPreview).query(QUERY, variables).toPromise();

	return req.data.posts;
};

export default {
	get_post_and_more_posts,
	get_posts
};
