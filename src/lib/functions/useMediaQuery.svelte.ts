import { MediaQuery } from 'svelte/reactivity';
import { BREAK_POINTS } from '$lib/const';

export const useMediaQuery = () => {
	const mediaQuery = new MediaQuery(`(max-width: ${BREAK_POINTS.md}px)`);
	let isMobile = $derived(mediaQuery.current);

	return {
		get isMobile() {
			return isMobile;
		}
	};
};
