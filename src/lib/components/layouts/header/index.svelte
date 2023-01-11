<script lang="ts">
	import { onMount } from 'svelte';
	import Logo from '$lib/components/logo/index.svelte';
	import Navigation from '$lib/components/layouts/navigation/index.svelte';
	import { BREAK_POINTS } from '$lib/const';
	let windowWidth: number = 0;
	$: open = false;
	const closeMenu = () => {
		if (windowWidth < BREAK_POINTS.lg) {
			open = false
		}
	}
	onMount(() => {
		windowWidth = document.body.getBoundingClientRect().width
		if(windowWidth >= BREAK_POINTS.lg) {
			open = true
		} else {
			open = false
		}
		const resizeObserver = new ResizeObserver((entries) => {
			const entry = entries.at(0);
			if (!entry) return;
			windowWidth = entry.contentBoxSize[0].inlineSize;
			if (windowWidth >= BREAK_POINTS.lg) {
				if (!open) {
					open = true;
				}
			}
		});
		resizeObserver.observe(document.body);
		return () => resizeObserver.unobserve(document.body);
	});
</script>

<header
	class="fixed top-0 left-0 right-0 z-10 flex items-center h-[var(--header-height)] px-2 lg:px-5 bg-blend-overlay backdrop-blur-sm bg-surface-100"
>
	<h1 class="relative z-10">
		<a
			href="/"
			class="flex items-center gap-2 lg:pl-2.5 lg:pr-5 text-primary-500 text-sm lg:text-md transition-colors rounded-full hover:text-accent-500"
			on:click={closeMenu}
		>
			<span class="block w-10 lg:w-14 shrink-0 p-1 lg:p-2"><Logo /></span>
			<span class="font-bold">しゃもきっとブログ</span>
		</a>
	</h1>
	<div class="ml-auto">
		<button
			type="button"
			class="absolute z-10 top-1/2 -translate-y-1/2 right-2 grid place-items-center grid-cols-[1fr_12px_1fr] grid-rows-[1fr_2px_1fr] rounded-full bg-surface-500 lg:hidden w-10 h-10 text-primary-500"
			on:click={() => (open = !open)}
			aria-expanded={open}
			aria-controls="globalNavigation"
			aria-label={open ? 'メニューを閉じる' : 'メニューを開く'}
		>
			<span
				class="flex col-[2_/_3] row-[2_/_3] w-3 border-b-2 border-current transition-all"
				class:translate-y-1={!open}
				class:rotate-45={open}
			/>
			<span
				class="flex col-[2_/_3] row-[2_/_3] w-3 border-b-2 border-current transition-all"
				class:opacity-0={open}
			/>
			<span
				class="flex col-[2_/_3] row-[2_/_3] w-3 border-b-2 border-current transition-all"
				class:-translate-y-1={!open}
				class:-rotate-45={open}
			/>
		</button>
		<Navigation
			class={`absolute lg:static top-0 left-0 right-0 min-h-screen lg:min-h-0 max-h-screen overflow-auto overscroll-contain pt-[var(--header-height)] lg:pt-0 transition-opacity bg-surface-100 lg:bg-transparent ${
				open ? 'visible opacity-100' : 'invisible opacity-0'
			}`}
			open={open}
			on:menuClose={closeMenu}
		/>
	</div>
</header>
