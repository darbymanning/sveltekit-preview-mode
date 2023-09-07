import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import type { Document } from "@contentful/rich-text-types";
import contentful from "contentful";
import {
  CONTENTFUL_DELIVERY_ACCESS_TOKEN,
  CONTENTFUL_PREVIEW_ACCESS_TOKEN,
  CONTENTFUL_SPACE_ID,
} from "$env/static/private";
import { isPreview } from "sveltekit-preview-mode";
import type { Post, PostAndMorePosts } from "schema";

const client = () => {
  return contentful.createClient({
    accessToken: isPreview() ? CONTENTFUL_PREVIEW_ACCESS_TOKEN : CONTENTFUL_DELIVERY_ACCESS_TOKEN,
    host: isPreview() ? "preview.contentful.com" : "cdn.contentful.com",
    space: CONTENTFUL_SPACE_ID,
  });
};

type Author = {
  contentTypeId: "author";
  fields: {
    internalName: contentful.EntryFieldTypes.Text;
    name: contentful.EntryFieldTypes.Text;
    avatar: contentful.EntryFieldTypes.AssetLink;
  };
};

type BlogPost = {
  contentTypeId: "pageBlogPost";
  fields: {
    internalName: contentful.EntryFieldTypes.Text;
    seoFields: Record<string, unknown>;
    slug: contentful.EntryFieldTypes.Text;
    author: contentful.EntryFieldTypes.EntryLink<Author>;
    publishedDate: contentful.EntryFieldTypes.Text;
    title: contentful.EntryFieldTypes.Text;
    shortDescription: contentful.EntryFieldTypes.Text;
    featuredImage: contentful.EntryFieldTypes.AssetLink;
    content: contentful.EntryFieldTypes.RichText;
    relatedBlogPosts: contentful.EntryFieldTypes.Array<
      contentful.EntryFieldTypes.EntryLink<BlogPost>
    >;
  };
};

function model_post(item: contentful.Entry<BlogPost>): Post {
  const author = item.fields.author as unknown as Author;
  const author_avatar = author.fields.avatar as unknown as contentful.Asset;
  const cover_image = item.fields.featuredImage as unknown as contentful.Asset;

  return {
    title: String(item.fields.title),
    slug: String(item.fields.slug),
    date: String(item.fields.publishedDate),
    excerpt: String(item.fields.shortDescription),
    content: { html: documentToHtmlString(item.fields.content as Document) },
    cover_image: { url: String(cover_image.fields.file?.url) },
    author: {
      name: String(author.fields.name),
      picture: { url: String(author_avatar.fields.file?.url) },
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
      "fields.slug[nin]": [slug],
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
