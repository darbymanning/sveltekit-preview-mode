<script lang="ts">
  import { page } from "$app/stores";
  import { isPreview } from "../";

  let exit_link: string;

	$: {
		const url = new URL($page.url);
		url.searchParams.set($page.data.exitPreviewQueryParam, 'true');
		exit_link = url.toString();
	}
</script>

{#if isPreview()}
  <div class="preview-banner" role="dialog">
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
