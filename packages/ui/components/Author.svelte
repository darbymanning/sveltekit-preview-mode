<script lang="ts">
  import type { Author } from "schema";

  export let author: Author;
</script>

<div class="author">
  {#if author.picture}
    <img class="author-picture" src={author.picture.url} alt={author.name} />
  {/if}
  <span class="author-name">{author.name}</span>
</div>

<style>
  .author {
    align-items: center;
    display: grid;
    gap: 2rem;
    grid-auto-flow: column;
    justify-content: start;
  }

  .author-picture {
    border-radius: 50%;
    width: 5rem;
  }

  .author-name {
    font-weight: bold;
  }
</style>
