<script lang="ts">
	import type { ThinkingResponse } from '$lib/schema/thinking/thinking';
	import Ico from '$lib/components/svg/ico.svelte';
	import Dates from '$lib/components/date/dates.svelte';

	let {
		thinking
	}: {
		thinking: ThinkingResponse;
	} = $props();
</script>

<a
	href={`/thinking/${thinking.slug}`}
	class="group flex items-start gap-3 py-4 lg:py-6 pr-6 lg:pr-8 pl-4 lg:pl-6 bg-surface-100 rounded-md shadow-sm transition-shadow hover:shadow-md"
>
	<span class="flex-shrink-0 block w-6 md:w-8 pt-0.5"><Ico name="note" /></span>
	<div class="grid gap-2">
		<p class="text-md font-bold group-hover:text-secondary-500">{thinking.title}</p>
		{#if thinking.publishedAt}
			<Dates publishedDate={thinking.publishedAt} updatedDate={thinking.updatedAt} />
		{/if}
	</div>
</a>
