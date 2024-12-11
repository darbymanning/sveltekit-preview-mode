<script lang="ts">
	import { PreviewBanner } from 'sveltekit-preview-mode';
	import { Footer } from 'ui';
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<PreviewBanner />

<main>
	{@render children?.()}
</main>

<Footer />
