<script lang="ts">
  import { slide } from "svelte/transition";
  import { page } from "$app/stores";
  import { onMount } from "svelte";

  let show_preview = false;
  let exit_link: string;

  $: {
    $page.url.searchParams.set($page.data.exitPreviewQueryParam, "true");
    exit_link = $page.url.toString();
  }

  onMount(() => (show_preview = $page.data.isPreview));
</script>

{#if show_preview}
  <div class="preview-banner" role="dialog" transition:slide>
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
