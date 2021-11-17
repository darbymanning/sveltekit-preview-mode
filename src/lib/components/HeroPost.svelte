<script lang="ts">
  import Author from "$lib/components/Author.svelte";
  import Date from "$lib/components/Date.svelte";
  import type { Post } from "$lib/services/graphcms";

  export let post: Post;
  const { author, excerpt, coverImage, date, title, slug } = post;
</script>

<article>
  {#if coverImage}
    <a class="cover" href="/posts/{slug}">
      <img src={coverImage.url} alt={title} />
    </a>
  {/if}
  <div class="title">
    <a href="/posts/{slug}">
      <h1>{title}</h1>
    </a>
    {#if date}<Date {date} />{/if}
  </div>
  <footer>
    {excerpt}
    {#if author}
      <Author {author} />
    {/if}
  </footer>
</article>

<style lang="scss">
  article {
    &,
    footer,
    .title {
      display: grid;
      gap: 2rem;
    }

    .cover {
      transition: transform 0.35s;

      &::before {
        box-shadow: 0 1rem 5rem rgb(0 0 0 / 30%);
        content: "";
        inset: 0;
        opacity: 0;
        position: absolute;
        transition: opacity 0.35s;
      }

      &:hover {
        transform: perspective(1000px) translate3d(0, 0, 2rem);

        &::before {
          opacity: 1;
        }
      }

      @media screen and (max-width: 47.9375em) {
        margin: 0 -7.5vw;
      }
    }

    @media screen and (min-width: 48em) {
      grid-column: 1 / -1;
      grid-template-columns: 1fr 1fr;

      .cover {
        grid-column: 1 / -1;
      }
    }

    h1 {
      font-size: clamp(2.2rem, 7vw, 3rem);
      font-weight: normal;
    }

    a:not(:hover) {
      text-decoration: none;
    }
  }
</style>
