<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		title,
		headingLevel = 3,
		ico,
		button
	}: {
		title: string;
		headingLevel?: 3 | 4;
		ico: Snippet;
		button: Snippet;
	} = $props();
	let tagName = $derived(`h${headingLevel}`);
</script>

<header class="flex flex-wrap items-center gap-5">
	<div class="flex items-center gap-3">
		{#if ico}
			<div class="w-6 h-6 lg:w-10 lg:h-10">
				{@render ico()}
			</div>
		{/if}
		<svelte:element this={tagName} class="text-xl">
			{title}
		</svelte:element>
	</div>
	{#if button}
		{@render button()}
	{/if}
</header>
