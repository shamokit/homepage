<script lang="ts">
	import Ico from '$lib/components/svg/ico.svelte';
	export let title: string;
</script>
<details class="bg-surface-100 shadow-sm rounded-md overflow-hidden">
	<summary
		class="group flex items-center gap-5 py-3 px-5 bg-primary-500 text-surface-100 font-bold"
	>
		<span class="mr-auto">{title}</span>
		<span
			class="block w-11 h-11 flex-shrink-0"
			>
			<span class="hidden group-open:block"><Ico name="minus" /></span>
			<span class="block group-open:hidden"><Ico name="add" /></span>
		</span>
	</summary>
	<div class="py-4 px-6"><slot /></div>
</details>
