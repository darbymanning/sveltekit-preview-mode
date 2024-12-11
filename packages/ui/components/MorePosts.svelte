<script lang="ts">
	import { Author, Date } from '../';
	import type { Post } from 'schema';

	interface Props {
		posts: Post[];
	}

	let { posts }: Props = $props();
</script>

<section>
	<h1>More Stories</h1>
	<div class="article-list">
		{#each posts as { author, cover_image, date, excerpt, slug, title }}
			<article>
				{#if cover_image?.url}
					<a class="cover" href="/posts/{slug}">
						<img src={cover_image.url} alt={title} />
					</a>
				{/if}
				<div class="title">
					<a href="/posts/{slug}">
						<h2>{title}</h2>
					</a>
					{#if date}<Date {date} />{/if}
				</div>
				<footer>
					{excerpt}
					{#if author}
						<Author {author} />
					{/if}
				</footer>
			</article>
		{/each}
	</div>
</section>

<style>
	h1 {
		font-size: clamp(3rem, 7vw, 7rem);
		letter-spacing: var(--letter-inset);
		margin: 10rem 0 5rem;
	}

	.article-list {
		align-items: start;
		display: grid;
		gap: clamp(5rem, 7vw, 13rem);
	}

	@media screen and (min-width: 47.9375em) {
		.article-list {
			grid-template-columns: 1fr 1fr;
		}
	}

	article,
	article footer,
	article .title {
		display: grid;
		gap: 2rem;
	}

	article .cover {
		transition: transform 0.35s;
	}

	article .cover::before {
		box-shadow: 0 1rem 5rem rgba(0, 0, 0, 0.3);
		content: '';
		inset: 0;
		opacity: 0;
		position: absolute;
		transition: opacity 0.35s;
	}

	article .cover:hover {
		transform: perspective(1000px) translate3d(0, 0, 2rem);
	}

	article .cover:hover::before {
		opacity: 1;
	}

	@media screen and (max-width: 47.9375em) {
		article .cover {
			margin: 0 -7.5vw;
		}
	}

	article h2 {
		font-size: clamp(2.2rem, 7vw, 3rem);
		font-weight: normal;
	}

	article a:not(:hover) {
		text-decoration: none;
	}
</style>
