<script lang="ts">
  import { Author, Date } from "../";
  import type { Post } from "schema";

  export let post: Post;

  $: ({ author, cover_image, date, excerpt, title } = post);
  $: href = `/posts/${post.slug}`;
</script>

<article>
  {#if cover_image}
    <a class="cover" {href}>
      <img src={cover_image.url} alt={title} />
    </a>
  {/if}
  <div class="title">
    <a {href}>
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

<style>
  article,
  article footer,
  article .title {
    display: grid;
    gap: 2rem;
  }

  article .cover {
    transition: transform 0.35s;
  }

  article .cover::before {
    box-shadow: 0 1rem 5rem rgba(0, 0, 0, 0.3);
    content: "";
    inset: 0;
    opacity: 0;
    position: absolute;
    transition: opacity 0.35s;
  }

  article .cover:hover {
    transform: perspective(1000px) translate3d(0, 0, 2rem);
  }

  article .cover:hover::before {
    opacity: 1;
  }

  @media screen and (max-width: 47.9375em) {
    article .cover {
      margin: 0 -7.5vw;
    }
  }

  @media screen and (min-width: 48em) {
    article {
      grid-column: 1/-1;
      grid-template-columns: 1fr 1fr;
    }
    article .cover {
      grid-column: 1/-1;
    }
  }

  article h1 {
    font-size: clamp(2.2rem, 7vw, 3rem);
    font-weight: normal;
  }

  article a:not(:hover) {
    text-decoration: none;
  }
</style>
