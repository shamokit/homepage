<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { page } from '$app/stores';
	import Ico from '$lib/components/svg/ico.svelte';
	import { links } from '$lib/const';
	let className: string | null = null;
	export let open: boolean = false;

	const dispatch = createEventDispatcher();
	const onClick = () => {
		dispatch('menuClose')
	}
	const onFocusLast = (e: KeyboardEvent) => {
		dispatch('focusLast', e)
	}
	export { className as class };
	$: linkLength = links.length;
</script>
<nav id="globalNavigation" class={className ?? undefined} aria-hidden={open ? null : 'true'}>
	<ul
		class="flex flex-col md:flex-row md:justify-end md:items-center gap-3 py-5 md:py-2 px-5 md:px-2 font-bold"
	>
		{#each links as link, i}
			<li class="md:py-1">
				<a
					href={link.slug}
					class="flex items-center gap-1.5 py-1 md:py-2 px-0 md:px-2.5 transition-all rounded-full underline-offset-8 hover:text-secondary-500 hover:underline"
					aria-current={$page.url.pathname === link.slug ? 'page' : undefined}
					on:click={onClick}
					on:keydown={(e) => linkLength - 1 === i && onFocusLast(e)}
				>
					{#if link.iconName}
						<span class="inline-block w-5"><Ico name={link.iconName} /></span>
					{/if}
					{link.name}
				</a>
			</li>
		{/each}
	</ul>
</nav>

<style>
	[aria-current] {
		@apply text-secondary-500 underline-offset-8 underline;
	}
</style>
