<script lang="ts">
  import Author from "$lib/components/Author.svelte";
  import Date from "$lib/components/Date.svelte";
  import type { Posts } from "$lib/services/graphcms";

  export let posts: Posts;
</script>

<section>
  <h1>More Stories</h1>
  <div class="article-list">
    {#each posts as { author, coverImage, date, excerpt, slug, title }, i}
      <article>
        {#if coverImage}
          <a class="cover" href="/posts/{slug}">
            <img src={coverImage.url} alt={title} />
          </a>
        {/if}
        <div class="title">
          <a href="/posts/{slug}">
            <h2>{title}</h2>
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
    {/each}
  </div>
</section>

<style lang="scss">
  h1 {
    font-size: clamp(3rem, 7vw, 7rem);
    letter-spacing: var(--letter-inset);
    margin: 10rem 0 5rem;
  }

  .article-list {
    align-items: start;
    display: grid;
    gap: clamp(5rem, 7vw, 13rem);

    @media screen and (min-width: 47.9375em) {
      grid-template-columns: 1fr 1fr;
    }
  }

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

    h2 {
      font-size: clamp(2.2rem, 7vw, 3rem);
      font-weight: normal;
    }

    a {
      &:not(:hover) {
        text-decoration: none;
      }
    }
  }
</style>
