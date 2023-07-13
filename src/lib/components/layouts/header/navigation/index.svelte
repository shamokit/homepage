<script lang="ts">
	import { onMount, tick } from 'svelte';
	import type { Action } from 'svelte/action';
	import { page } from '$app/stores';
	import Ico from '$lib/components/svg/ico.svelte';
	import { links } from '$lib/const';
	import { BREAK_POINTS } from '$lib/const';
	import { globalMenuStore } from '../store/globalMenu.store';

	$: linkLength = links.length;

	let windowWidth: number = 0;
	$: isMobile = windowWidth < BREAK_POINTS.md;
	const { open, setOpen, setClose, toggle } = globalMenuStore();
	const closeMenu = () => {
		isMobile && setClose();
	};
	let navigationButton: HTMLButtonElement;
	let focusableItems: HTMLAnchorElement[] = [];

	/**
	 * ナビゲーションの表示を制御する
	 */
	const controlNavigation: Action<Document> = (document) => {
		onMount(() => {
			!isMobile && setOpen();
			const resizeObserver = new ResizeObserver((entries) => {
				const entry = entries.at(0);
				if (!entry) return;
				if (!isMobile) setOpen();
			});
			resizeObserver.observe(document.body);
			return () => {
				resizeObserver.unobserve(document.body);
			};
		});
	};
	/**
	 * グローバルナビゲーション内でEscキーを押したらメニューを閉じる
	 */
	const closeMenuOnEscHandler = async (e: KeyboardEvent) => {
		await tick();
		// Escapeキー以外の場合と、メニューが閉じている場合は何もしない
		if (e.key !== 'Escape' || !$open) return;
		const target = e.target as HTMLElement;
		if (target.closest('#navigation')) {
			closeMenu();
			navigationButton.focus();
		}
	};

	/**
	 * メニューを閉じたらナビゲーションボタンにフォーカスを戻す
	 */
	const focusFirstAtMobile = (e: KeyboardEvent, isLast: boolean) => {
		if (!$open || !isMobile) return;
		if (e.key === 'Tab' && !e.shiftKey && isLast) {
			e.preventDefault();
			navigationButton.focus();
		}
	};

	/**
	 * ナビゲーションボタンでShift+Tabキーを押したら最後のフォーカス可能な要素にフォーカスを移す
	 */
	const focusLastAtMobile = (e: KeyboardEvent) => {
		if (!$open || !isMobile) return;
		if (e.key === 'Tab' && e.shiftKey) {
			e.preventDefault();
			const target = focusableItems[focusableItems.length - 1];
			target.focus();
		}
	};
</script>

<svelte:document use:controlNavigation on:keydown={closeMenuOnEscHandler} />
<svelte:window bind:outerWidth={windowWidth} />

<div id="navigation" class="ml-auto">
	<button
		type="button"
		class="absolute z-10 top-1/2 -translate-y-1/2 right-2 grid place-items-center grid-cols-[1fr_12px_1fr] grid-rows-[1fr_2px_1fr] rounded-full bg-surface-500 md:hidden w-10 h-10 text-primary-500"
		aria-expanded={$open}
		aria-controls="globalNavigation"
		aria-label={$open ? 'メニューを閉じる' : 'メニューを開く'}
		bind:this={navigationButton}
		on:click={toggle}
		on:keydown={focusLastAtMobile}
	>
		<span
			class="flex col-[2_/_3] row-[2_/_3] w-3 border-b-2 border-current transition-all"
			class:translate-y-1={!$open}
			class:rotate-45={$open}
		/>
		<span
			class="flex col-[2_/_3] row-[2_/_3] w-3 border-b-2 border-current transition-all"
			class:opacity-0={$open}
		/>
		<span
			class="flex col-[2_/_3] row-[2_/_3] w-3 border-b-2 border-current transition-all"
			class:-translate-y-1={!$open}
			class:-rotate-45={$open}
		/>
	</button>
	<nav
		id="globalNavigation"
		class={`absolute md:static top-0 left-0 right-0 min-h-screen md:min-h-0 max-h-screen overflow-auto overscroll-contain pt-[var(--header-height)] md:pt-0 transition-opacity bg-surface-100 md:bg-transparent ${
			$open ? 'visible opacity-100' : 'invisible opacity-0'
		}`}
		aria-hidden={$open ? null : 'true'}
	>
		<ul
			class="flex flex-col md:flex-row md:justify-end md:items-center gap-3 py-5 md:py-2 px-5 md:px-2 font-bold"
		>
			{#each links as link, i}
				{@const isLast = linkLength - 1 === i}
				{@const isCurrent = $page.url.pathname === link.slug}
				<li class="md:py-1">
					<a
						href={link.slug}
						class="flex items-center gap-1.5 py-1 md:py-2 px-0 md:px-2.5 transition-all rounded-full underline-offset-8 hover:text-secondary-500 hover:underline aria-[current=page]:text-secondary-500 aria-[current=page]:underline-offset-8 aria-[current=page]:underline"
						aria-current={isCurrent ? 'page' : undefined}
						on:click={closeMenu}
						on:keydown={(e) => focusFirstAtMobile(e, isLast)}
						bind:this={focusableItems[i]}
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
</div>
