<script lang="ts">
	import Logo from '$lib/components/logo/index.svelte';
	import Navigation from '$lib/components/layouts/header/navigation/index.svelte';
	import { BREAK_POINTS } from '$lib/const';
	import { globalMenuStore } from './store/globalMenu.store';

	let windowWidth: number = 0;
	$: isMobile = windowWidth < BREAK_POINTS.md;

	const { setClose } = globalMenuStore();
	const closeMenu = () => {
		isMobile && setClose();
	};
</script>

<svelte:window bind:outerWidth={windowWidth} />
<header
	class="fixed top-0 left-0 right-0 z-10 flex items-center h-[var(--header-height)] px-2 md:px-5 bg-blend-overlay backdrop-blur-sm bg-surface-100"
>
	<h1 class="relative z-10">
		<a
			href="/"
			class="flex items-center gap-2 md:pl-2.5 md:pr-5 text-primary-500 text-sm md:text-md transition-colors rounded-full hover:text-accent-500"
			on:click={closeMenu}
		>
			<span class="block w-10 md:w-14 shrink-0 p-1 md:p-2"><Logo /></span>
			<span class="font-bold">しゃもきっとブログ</span>
		</a>
	</h1>
	<Navigation />
</header>
