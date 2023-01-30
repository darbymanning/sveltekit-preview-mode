import { PUBLIC_CMS } from '$env/static/public';
import { default as hygraph } from './hygraph';

export type Author = {
	name: string;
	picture?: { url: string };
};

export type Post = {
	author?: Author;
	content: { html: string };
	cover_image?: { url: string };
	date?: string;
	excerpt: string;
	slug: string;
	title: string;
};

export type CMS = {
	get_post_and_more_posts: (slug: string) => Promise<{
		post: Post;
		more_posts: Post[] | [];
	}>;
	get_posts: () => Promise<Post[]>;
};

const cms: Record<string, CMS> = {
	Hygraph: hygraph
};

export default cms[PUBLIC_CMS];
