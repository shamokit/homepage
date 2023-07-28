<script lang="ts">
	import Ico from '$lib/components/svg/ico.svelte';
	export let href: string;
	export let blank = false;
</script>

<p class="text-sm">
	<a
		{href}
		target={blank ? '_blank' : null}
		rel={blank ? 'noopener noreferrer' : null}
		class="flex items-center gap-2 w-fit pt-[13px] pb-3 px-6 bg-primary-500 border border-primary-500 text-surface-100 font-bold rounded-full transition-colors will-change-colors duration-300 ease-in-out hover:shadow-sm hover:bg-surface-100 hover:text-primary-100"
	>
		<slot />
		<span class="inline-flex w-4 h-4 flex-shrink-0 flex-grow-0"
			><Ico name="blank" ariaLabel="外部サイトに移動します" /></span
		>
	</a>
</p>
