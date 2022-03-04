import { createClient, gql } from "@urql/svelte";

const client = (preview: boolean) => {
  const token = preview
    ? import.meta.env.VITE_GRAPHCMS_DEV_AUTH_TOKEN
    : import.meta.env.VITE_GRAPHCMS_PROD_AUTH_TOKEN;

  return createClient({
    url: import.meta.env.VITE_GRAPHCMS_PROJECT_API,
    fetch,
    fetchOptions: () => ({
      headers: { authorization: `Bearer ${token}` },
    }),
  });
};

export type Post = {
  author?: Author;
  content: { html: string };
  coverImage?: { url: string };
  date?: string;
  excerpt?: string;
  slug: string;
  title: string;
};

export type Author = {
  name: string;
  picture?: { url: string };
};

export type Posts = Post[];

interface PostAndMorePosts {
  post: Post;
  morePosts: Posts;
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
    coverImage {
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

export const getPostBySlug = async (
  slug: string,
  preview?: boolean
): Promise<Post> => {
  const QUERY = gql`
    query Post($stage: Stage!, $slug: String!) {
      post(where: { slug: $slug }, stage: $stage) {
        ...PostFragment
      }
    }

    ${PostFragment}
  `;

  const variables = {
    slug,
    stage: preview ? "DRAFT" : "PUBLISHED",
  };

  const req = await client(preview).query(QUERY, variables).toPromise();

  return req.data.post;
};

export const getPostAndMorePosts = async (
  slug: string,
  preview?: boolean
): Promise<PostAndMorePosts> => {
  const QUERY = gql`
    query Post($stage: Stage!, $slug: String!) {
      post(where: { slug: $slug }, stage: $stage) {
        ...PostFragment
      }
      morePosts: posts(
        orderBy: date_DESC
        first: 2
        where: { slug_not_in: [$slug] }
      ) {
        ...PostFragment
      }
    }

    ${PostFragment}
  `;

  const variables = {
    slug,
    stage: preview ? "DRAFT" : "PUBLISHED",
  };

  const req = await client(preview).query(QUERY, variables).toPromise();

  return req.data;
};

export const getPosts = async (
  preview?: boolean
): Promise<{ posts: Posts }> => {
  const QUERY = gql`
    query Posts($stage: Stage!) {
      posts(stage: $stage) {
        ...PostFragment
      }
    }

    ${PostFragment}
  `;

  const variables = {
    stage: preview ? "DRAFT" : "PUBLISHED",
  };

  const req = await client(preview).query(QUERY, variables).toPromise();

  return req.data;
};
