<script lang="ts">
  import type { PageData } from "./$types";
  import { HeroPost, MorePosts } from "ui";

  export let data: PageData;

  $: hero_post = data.posts[0];
  $: more_posts = data.posts.slice(1);
</script>

<svelte:head>
  <title>SvelteKit Blog Example with Contentful</title>
</svelte:head>

<header>
  <h1>Blog.</h1>
  <p>
    A prerendrered blog example using
    <a href="https://kit.svelte.dev">SvelteKit</a>
    and <a href="https://contentful.com">Contentful</a>.
  </p>
</header>

<HeroPost post={hero_post} />

{#if !!more_posts.length}
  <MorePosts posts={more_posts} />
{/if}

<style>
  header {
    align-items: center;
    display: flex;
    flex-flow: row wrap;
    gap: 2rem;
    justify-content: space-between;
    margin-bottom: var(--gap);
  }

  header h1 {
    font-size: clamp(4.4rem, 7vw, 10rem);
    letter-spacing: var(--letter-inset);
  }

  header p {
    margin: 0;
  }
</style>
