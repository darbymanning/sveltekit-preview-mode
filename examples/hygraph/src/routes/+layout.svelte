<script lang="ts">
	import { PreviewBanner } from 'sveltekit-preview-mode';
	import { Footer } from 'ui';

	let { children } = $props();
</script>

<PreviewBanner />

<main>
	{@render children()}
</main>

<Footer />
