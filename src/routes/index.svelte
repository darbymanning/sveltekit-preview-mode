<script context="module" lang="ts">
  import type { Load } from "@sveltejs/kit";
  import { getPosts } from "$lib/services/graphcms";

  export const load: Load = async ({ session: { preview } }) => {
    const props = await getPosts(preview);
    return { props };
  };
</script>

<script lang="ts">
  import type { Posts } from "$lib/services/graphcms";
  import MoreStories from "$lib/components/MoreStories.svelte";
  import HeroPost from "$lib/components/HeroPost.svelte";

  export let posts: Posts;

  const heroPost = posts[0];
  const morePosts = posts.slice(1);
</script>

<svelte:head>
  <title>SvelteKit Blog Example with GraphCMS</title>
</svelte:head>

<header>
  <h1>Blog.</h1>
  <p>
    A prerendrered blog example using
    <a href="https://kit.svelte.dev">SvelteKit</a>
    and
    <a href="https://graphcms.com/">GraphCMS</a>.
  </p>
</header>

<HeroPost post={heroPost} />
<MoreStories posts={morePosts} />

<style lang="scss">
  header {
    align-items: center;
    display: flex;
    flex-flow: row wrap;
    gap: 2rem;
    justify-content: space-between;
    margin-bottom: var(--gap);

    h1 {
      font-size: clamp(4.4rem, 7vw, 10rem);
      letter-spacing: var(--letter-inset);
    }

    a:hover {
      color: #0070f3;
    }

    p {
      margin: 0;
    }
  }
</style>
