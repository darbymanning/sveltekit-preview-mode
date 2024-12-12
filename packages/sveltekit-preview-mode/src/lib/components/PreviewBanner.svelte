<script lang="ts">
	import { SvelteURL } from 'svelte/reactivity';
	import { page } from '$app/stores';

	let exit_link = $derived.by(() => {
		const url = new SvelteURL($page.url);
		url.searchParams.set($page.data.exitPreviewQueryParam, 'true');

		return url.toString();
	});
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
		background: var(--sveltekit-preview-banner-background, #333);
		color: var(--sveltekit-preview-banner-color, white);
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
