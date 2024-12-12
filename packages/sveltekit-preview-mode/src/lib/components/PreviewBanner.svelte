<script lang="ts">
	import { page } from '$app/stores';

	const exit_link = $derived.by(() => {
		const url = $page.url;
		url.searchParams.set($page.data.exitPreviewQueryParam, 'true');

		return url.toString();
	});
</script>

{#if $page.data.isPreview}
	<div role="dialog" aria-modal="false" class="preview-banner fly-in">
		This page is a preview.
		<a rel="external" href={exit_link}>Click here</a>
		to exit preview mode.
	</div>
{/if}

<style>
	.preview-banner {
		backdrop-filter: blur(10px);
		background: var(--sveltekit-preview-banner-background, rgba(255, 255, 255, 0.1));
		border-radius: 50em;
		color: var(--sveltekit-preview-banner-color, white);
		font-size: 1.4rem;
		left: 0;
		left: 50%;
		padding: 1em 1.5em;
		position: fixed;
		text-align: center;
		top: 1rem;
		translate: -50%;
		z-index: 100;
	}

	.fly-in {
		animation: fly-in 0.3s ease-out;
	}

	@keyframes fly-in {
		from {
			translate: -50% -100%;
			opacity: 0;
		}
		to {
			translate: -50%;
			opacity: 1;
		}
	}
</style>
