<script lang="ts">
	import Author from '$lib/components/Author.svelte';
	import Date from '$lib/components/Date.svelte';
	import MorePosts from '$lib/components/MorePosts.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	$: ({ author, content, cover_image, date, title } = data.post);
	$: more_posts = data.more_posts;
</script>

<header>
	<a href="/"><h1>Blog.</h1></a>
</header>

<article>
	<h1>{title}</h1>
	{#if author}
		<Author {author} />
	{/if}
	{#if cover_image}
		<img src={cover_image.url} alt={title} />
	{/if}
	<div class="wrapper">
		{#if date}<Date {date} />{/if}
		<div class="body">
			{@html content.html}
		</div>
	</div>
</article>

{#if !!more_posts.length}
	<hr />
	<MorePosts posts={more_posts} />
{/if}

<style>
	header {
		font-size: clamp(3rem, 7vw, 3.6rem);
		letter-spacing: var(--letter-inset);
		margin-bottom: var(--gap);
	}

	article {
		display: grid;
		gap: var(--gap);
	}

	article h1 {
		font-size: clamp(5rem, 7vw, 100rem);
	}

	article .wrapper {
		font-size: clamp(1.8rem, 7vw, 2.1rem);
		margin: auto;
		width: min(85vw, 68rem);
	}

	article .body {
		margin-top: var(--gap);
	}

	hr {
		border: 1px solid #eaeaea;
		margin: clamp(5rem, 8vw, 10rem) 0;
	}
</style>
