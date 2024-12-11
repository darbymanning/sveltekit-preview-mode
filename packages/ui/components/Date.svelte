<script lang="ts">
	interface Props {
		date: string;
	}

	let { date }: Props = $props();

	const parsed_date = new Date(date);
	const formatted_date = new Intl.DateTimeFormat('en-GB', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	}).format(parsed_date);
</script>

<time datetime={parsed_date.toISOString()}>
	{formatted_date}
</time>
