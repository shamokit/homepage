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
	export { className as class };
</script>
<nav id="globalNavigation" class={className ?? undefined} aria-hidden={open ? null : 'true'}>
	<ul
		class="flex flex-col lg:flex-row lg:justify-end lg:items-center py-5 lg:py-0 px-5 lg:px-0 gap-5 font-bold"
	>
		{#each links as link}
			<li>
				<a
					href={link.slug}
					class="flex items-center gap-1.5 py-1 lg:py-3 transition-all hover:text-secondary-500 hover:underline-offset-8 hover:underline"
					aria-current={$page.url.pathname === link.slug ? 'page' : undefined}
					on:click={onClick}
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
