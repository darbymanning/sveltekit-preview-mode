import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import type { Document } from "@contentful/rich-text-types";
import contentful, { type Asset, type Entry, type RichTextContent } from "contentful";
import { env } from "$env/dynamic/private";
import { isPreview } from "sveltekit-preview-mode";
import type { Post, PostAndMorePosts } from "schema";

const client = () => {
  return contentful.createClient({
    accessToken: isPreview()
      ? env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
      : env.CONTENTFUL_DELIVERY_ACCESS_TOKEN,
    host: isPreview() ? "preview.contentful.com" : "cdn.contentful.com",
    space: env.CONTENTFUL_SPACE_ID,
  });
};

type Author = {
  internalName: string;
  name: string;
  avatar: Asset;
};

type BlogPost = {
  internalName: string;
  seoFields: Record<string, unknown>;
  slug: string;
  author: Entry<Author>;
  publishedDate: string;
  title: string;
  shortDescription: string;
  featuredImage: Asset;
  content: RichTextContent;
  relatedBlogPosts: Entry<BlogPost>[];
};

function model_post(item: Entry<BlogPost>): Post {
  return {
    title: item.fields.title,
    slug: item.fields.slug,
    date: item.fields.publishedDate,
    excerpt: item.fields.shortDescription,
    content: { html: documentToHtmlString(item.fields.content as Document) },
    cover_image: { url: item.fields.featuredImage.fields.file.url },
    author: {
      name: item.fields.author.fields.name,
      picture: { url: item.fields.author.fields.avatar.fields.file.url },
    },
  };
}

export const get_post_and_more_posts = async (slug: string): Promise<PostAndMorePosts> => {
  const [post, more_posts] = await Promise.all([
    client().getEntries<BlogPost>({
      content_type: "pageBlogPost",
      "fields.slug": slug,
      limit: 1,
    }),
    client().getEntries<BlogPost>({
      content_type: "pageBlogPost",
      "fields.slug[nin]": slug,
    }),
  ]);

  return {
    post: model_post(post.items[0]),
    more_posts: more_posts.items.map(model_post),
  };
};

export const get_posts = async (): Promise<Post[]> => {
  const { items } = await client().getEntries<BlogPost>({ content_type: "pageBlogPost" });
  return items.map(model_post);
};

export default {
  get_post_and_more_posts,
  get_posts,
};
