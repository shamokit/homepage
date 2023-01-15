<script lang="ts">
	import Wysiwyg from '$lib/components/wysiwyg/index.svelte';
	import type { History } from '$lib/schema/staticPage/history';
	export let histories: History[] = []
</script>
<ul>
	{#each histories as history}
		<li
			class="py-4 border-b border-primary-500 last-of-type:border-0 align-top"
		>
			<div class="flex items-center">
				<div class="mr-2 lg:mr-4"
					><span
						class="block w-5 h-5 lg:w-7 lg:h-7 border border-secondary-500 rounded-full"
					/></div
				>
				<p class="text-sm font-normal text-left">{history.day}</p>
			</div>
			<div class="mt-2 lg:mt-4 text-sm">
				<Wysiwyg content={history.content} />
			</div>
		</li>
	{/each}
</ul>
