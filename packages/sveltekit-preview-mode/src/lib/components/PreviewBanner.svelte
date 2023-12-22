<script lang="ts">
  import { page } from "$app/stores";

  let exit_link: string;

  $: {
    const url = new URL($page.url);
    url.searchParams.set($page.data.exitPreviewQueryParam, "true");
    exit_link = url.toString();
  }
</script>

{#if $page.data?.isPreview}
  <div role="dialog" aria-modal="false" class="preview-banner">
    This page is a preview.
    <a rel="external" href={exit_link}>Click here</a>
    to exit preview mode.
  </div>
{/if}

<style>
  .preview-banner {
    background: #333;
    color: white;
    font-size: 1.4rem;
    left: 0;
    padding: 1em;
    position: sticky;
    text-align: center;
    top: 0;
    width: 100%;
    z-index: 100;
  }
</style>
