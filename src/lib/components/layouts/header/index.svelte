<script lang="ts">
	import Logo from '$lib/components/logo/index.svelte';
	import Navigation from '$lib/components/layouts/header/navigation/index.svelte';
	import { globalMenuStore } from '$lib/components/layouts/header/navigation/globalMenu.store';
	import { isMobile } from '$lib/functions/mediaQuery.store.action';

	let {
		isHome = false
	}: {
		isHome: boolean;
	} = $props();
	let tag = $derived(isHome ? 'h1' : 'p');

	const { closeMenu } = globalMenuStore();
</script>

<header
	class="fixed top-0 left-0 right-0 z-10 flex items-center h-[var(--header-height)] px-2 md:px-5 bg-blend-overlay backdrop-blur-sm bg-surface-100"
>
	<svelte:element this={tag} class="relative z-10">
		<a
			href="/"
			class="flex items-center gap-2 md:pl-2.5 md:pr-5 text-primary-500 text-sm md:text-md transition-colors rounded-full hover:text-accent-500"
			onclick={() => closeMenu($isMobile)}
		>
			<span class="block w-10 md:w-14 shrink-0 p-1 md:p-2"><Logo /></span>
			<span class="font-bold">しゃもきっとブログ</span>
		</a>
	</svelte:element>
	<Navigation />
</header>
