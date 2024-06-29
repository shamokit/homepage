<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		title,
		headingLevel = 2,
		children
	}: {
		title: string;
		headingLevel?: 1 | 2 | 3;
		children: Snippet;
	} = $props();
	let tagName = $derived(`h${headingLevel}`);
</script>

<header class="flex flex-col gap-2.5">
	<svelte:element this={tagName} class="text-xxl">
		{title}
	</svelte:element>
	{@render children()}
</header>
