<script lang="ts">
	import type { PropsWithChildren } from 'svelte';
	import Ico from '$lib/components/svg/ico.svelte';
	let {
		href,
		blank = false,
		children
	} = $props<PropsWithChildren<
	{
		href: string;
		blank?: boolean;
		children: string;
	}, never>>();
</script>

<p class="text-sm">
	<a
		{href}
		target={blank ? '_blank' : null}
		rel={blank ? 'noopener noreferrer' : null}
		class="flex items-center gap-2 w-fit pt-[13px] pb-3 px-6 bg-primary-500 border border-primary-500 text-surface-100 font-bold rounded-full transition-colors will-change-colors duration-300 ease-in-out hover:shadow-sm hover:bg-surface-100 hover:text-primary-100"
	>
		{@render children()}
		<span class="inline-flex w-4 h-4 flex-shrink-0 flex-grow-0"
			><Ico name="blank" ariaLabel="外部サイトに移動します" /></span
		>
	</a>
</p>
