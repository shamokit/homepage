<script lang="ts">
	import type { Snippet } from 'svelte';
	import Ico from '$lib/components/svg/ico.svelte';
	let {
		title,
		children
	}: {
		title: string;
		children: Snippet;
	} = $props();
</script>

<details class="group bg-surface-100 shadow-sm rounded-md">
	<summary class="flex items-center gap-5 py-3 px-5 bg-primary-500 text-surface-100 font-bold">
		<span class="mr-auto">{title}</span>
		<span class="block w-11 h-11 flex-shrink-0">
			<span class="hidden group-open:block"><Ico name="minus" /></span>
			<span class="block group-open:hidden"><Ico name="add" /></span>
		</span>
	</summary>
	<div class="py-4 px-6">{@render children()}</div>
</details>
