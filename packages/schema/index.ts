export type Post = {
  author?: Author;
  content: { html: string };
  cover_image?: { url: string };
  date?: string;
  excerpt: string;
  slug: string;
  title: string;
};

export type Author = {
  name: string;
  picture?: { url: string };
};

export interface PostAndMorePosts {
  post: Post;
  more_posts: Post[];
}
