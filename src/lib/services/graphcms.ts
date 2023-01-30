import { createClient, gql } from '@urql/svelte';
import { env } from '$env/dynamic/private';

// TODO: Remove this when we have a proper preview mode
const preview = false;

const client = () => {
	return createClient({
		url: env.HYGRAPH_PROJECT_API,
		fetch,
		fetchOptions: () => ({
			headers: {
				authorization: `Bearer ${
					preview ? env.HYGRAPH_DEV_AUTH_TOKEN : env.HYGRAPH_PROD_AUTH_TOKEN
				}`
			}
		})
	});
};

type Post = {
	author?: Author;
	content: { html: string };
	cover_image?: { url: string };
	date?: string;
	excerpt: string;
	slug: string;
	title: string;
};

type Author = {
	name: string;
	picture?: { url: string };
};

interface PostAndMorePosts {
	post: Post;
	more_posts: Post[];
}

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

export const get_post_and_more_posts = async (slug: string): Promise<PostAndMorePosts> => {
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
		stage: preview ? 'DRAFT' : 'PUBLISHED'
	};

	const req = await client().query(QUERY, variables).toPromise();

	return req.data;
};

export const get_post = async (): Promise<{ posts: Post[] }> => {
	const QUERY = gql`
		query Posts($stage: Stage!) {
			posts(stage: $stage) {
				...PostFragment
			}
		}

		${PostFragment}
	`;

	const variables = {
		stage: preview ? 'DRAFT' : 'PUBLISHED'
	};

	const req = await client().query(QUERY, variables).toPromise();

	return req.data;
};
