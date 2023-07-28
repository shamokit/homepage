import { onMount } from 'svelte';
import { writable } from 'svelte/store';
import type { Action } from 'svelte/action';
import { BREAK_POINTS } from '$lib/const';

export const isMobile = writable(true);
export const mediaQueryAction: Action<Document> = () => {
	const mediaQuery = window.matchMedia(`(max-width: ${BREAK_POINTS.md}px)`);
	const handleMediaQuery = (matches: boolean) => {
		isMobile.set(matches);
	};
	onMount(() => {
		handleMediaQuery(mediaQuery.matches);
		mediaQuery.addEventListener('change', ({ matches }) => handleMediaQuery(matches));
		return () => {
			mediaQuery.removeEventListener('change', ({ matches }: MediaQueryListEvent) =>
				handleMediaQuery(matches)
			);
		};
	});
};
