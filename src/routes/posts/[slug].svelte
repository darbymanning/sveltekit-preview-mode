<script context="module" lang="ts">
  import type { Load } from "@sveltejs/kit";
  import { getPostAndMorePosts } from "$lib/services/graphcms";

  export const load: Load = async ({ params, session: { preview } }) => {
    const props = await getPostAndMorePosts(params.slug, preview);
    return { props };
  };
</script>

<script lang="ts">
  import type { Post, Posts } from "$lib/services/graphcms";
  import Author from "$lib/components/Author.svelte";
  import Date from "$lib/components/Date.svelte";
  import PostsFeed from "$lib/components/MoreStories.svelte";

  export let post: Post;
  export let morePosts: Posts = [];

  const { author, content, coverImage, date, title } = post;
</script>

<header>
  <a href="/"><h1>Blog.</h1></a>
</header>

<article>
  <h1>{title}</h1>
  {#if author}
    <Author {author} />
  {/if}
  {#if coverImage}
    <img src={coverImage.url} alt={title} />
  {/if}
  <div class="wrapper">
    {#if date}<Date {date} />{/if}
    <div class="body">
      {@html content.html}
    </div>
  </div>
</article>

{#if morePosts.length > 0}
  <hr />
  <PostsFeed posts={morePosts} />
{/if}

<style lang="scss">
  header {
    font-size: clamp(3rem, 7vw, 3.6rem);
    letter-spacing: var(--letter-inset);
    margin-bottom: var(--gap);
  }

  article {
    display: grid;
    gap: var(--gap);

    h1 {
      font-size: clamp(5rem, 7vw, 100rem);
    }

    .wrapper {
      font-size: clamp(1.8rem, 7vw, 2.1rem);
      margin: auto;
      width: min(85vw, 68rem);
    }

    .body {
      margin-top: var(--gap);
    }
  }

  hr {
    border: 1px solid #eaeaea;
    margin: clamp(5rem, 8vw, 10rem) 0;
  }
</style>
