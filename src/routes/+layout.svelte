<script lang="ts">
	import { PreviewBanner } from 'preview-mode';
</script>

<PreviewBanner />

<main>
	<slot />
</main>

<footer>
	<div class="container">
		<h3>Prerendered with SvelteKit.</h3>
		<a
			href="https://github.com/darbymanning/sveltekit-preview-mode"
			rel="noreferrer"
			target="_blank"
		>
			View on GitHub
		</a>
	</div>
</footer>

<style>
	.container {
		margin: var(--gap) auto;
		width: min(85vw, 128rem);
	}

	footer {
		background: #111;
		gap: 2rem;
		padding: var(--gap) 0;
	}

	.container {
		align-items: center;
		display: flex;
		flex-flow: row wrap;
		justify-content: space-between;
	}

	h3 {
		font-size: clamp(3.2rem, 7vw, 4rem);
		letter-spacing: var(--letter-inset);
	}

	a {
		font-weight: bold;
	}

	a:not(:hover) {
		text-decoration: none;
	}
</style>
