<script lang="ts">
	import { page } from '$app/stores';
	import Ico from '$lib/components/svg/ico.svelte';
	import { links } from '$lib/const';
	import { globalMenuStore } from './globalMenu.store';
	import { isMobile } from '$lib/functions/mediaQuery.store.action';

	$: linkLength = links.length;
	const { menuOpen, openMenu, closeMenu, toggleMenu } = globalMenuStore();
	$: if($isMobile) {
		closeMenu($isMobile)
	} else {
		openMenu()
	}

	let navigationButton: HTMLButtonElement;
	let focusableItems: HTMLAnchorElement[] = [];

	/**
	 * グローバルナビゲーション内でEscキーを押したらメニューを閉じる
	 */
	const closeMenuOnEscHandler = (e: KeyboardEvent) => {
		// Escapeキー以外の場合と、メニューが閉じている場合は何もしない
		if (e.key !== 'Escape' || !$menuOpen) return;
		const target = e.target as HTMLElement;
		if (target.closest('#navigation')) {
			closeMenu($isMobile);
			navigationButton.focus();
		}
	};

	/**
	 * メニューを閉じたらナビゲーションボタンにフォーカスを戻す
	 */
	const focusFirstAtMobile = (e: KeyboardEvent, isLast: boolean) => {
		if (!$menuOpen || !$isMobile) return;
		if (e.key === 'Tab' && !e.shiftKey && isLast) {
			e.preventDefault();
			navigationButton.focus();
		}
	};

	/**
	 * ナビゲーションボタンでShift+Tabキーを押したら最後のフォーカス可能な要素にフォーカスを移す
	 */
	const focusLastAtMobile = (e: KeyboardEvent) => {
		if (!$menuOpen || !isMobile) return;
		if (e.key === 'Tab' && e.shiftKey) {
			e.preventDefault();
			const target = focusableItems[focusableItems.length - 1];
			target.focus();
		}
	};
</script>

<svelte:document on:keydown={closeMenuOnEscHandler} />

<div id="navigation" class="ml-auto">
	<button
		type="button"
		class="absolute z-10 top-1/2 -translate-y-1/2 right-2 grid place-items-center grid-cols-[1fr_12px_1fr] grid-rows-[1fr_2px_1fr] rounded-full bg-surface-500 md:hidden w-10 h-10 text-primary-500"
		aria-expanded={$menuOpen}
		aria-controls="globalNavigation"
		aria-label={$menuOpen ? 'メニューを閉じる' : 'メニューを開く'}
		bind:this={navigationButton}
		on:click={toggleMenu}
		on:keydown={focusLastAtMobile}
	>
		<span
			class="flex col-[2_/_3] row-[2_/_3] w-3 border-b-2 border-current transition-all"
			class:translate-y-1={!$menuOpen}
			class:rotate-45={$menuOpen}
		/>
		<span
			class="flex col-[2_/_3] row-[2_/_3] w-3 border-b-2 border-current transition-all"
			class:opacity-0={$menuOpen}
		/>
		<span
			class="flex col-[2_/_3] row-[2_/_3] w-3 border-b-2 border-current transition-all"
			class:-translate-y-1={!$menuOpen}
			class:-rotate-45={$menuOpen}
		/>
	</button>
	<nav
		id="globalNavigation"
		class={`absolute md:static top-0 left-0 right-0 min-h-screen md:min-h-0 max-h-screen overflow-auto overscroll-contain pt-[var(--header-height)] md:pt-0 transition-opacity bg-surface-100 md:bg-transparent ${
			$menuOpen ? 'visible opacity-100' : 'invisible opacity-0'
		}`}
		aria-hidden={$menuOpen ? null : 'true'}
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
						on:click={() => closeMenu($isMobile)}
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
