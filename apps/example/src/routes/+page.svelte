<script lang="ts">
	import type { PageData } from './$types';
	import { PUBLIC_CMS } from '$env/static/public';
	import MorePosts from '$lib/components/MorePosts.svelte';
	import HeroPost from '$lib/components/HeroPost.svelte';

	export let data: PageData;

	$: hero_post = data.posts[0];
	$: more_posts = data.posts.slice(1);
</script>

<svelte:head>
	<title>SvelteKit Blog Example with {PUBLIC_CMS}</title>
</svelte:head>

<header>
	<h1>Blog.</h1>
	<p>
		A prerendrered blog example using
		<a href="https://kit.svelte.dev">SvelteKit</a>
		and {PUBLIC_CMS}.
	</p>
</header>

<HeroPost post={hero_post} />

{#if !!more_posts.length}
	<MorePosts posts={more_posts} />
{/if}

<style>
	header {
		align-items: center;
		display: flex;
		flex-flow: row wrap;
		gap: 2rem;
		justify-content: space-between;
		margin-bottom: var(--gap);
	}

	header h1 {
		font-size: clamp(4.4rem, 7vw, 10rem);
		letter-spacing: var(--letter-inset);
	}

	header p {
		margin: 0;
	}
</style>
