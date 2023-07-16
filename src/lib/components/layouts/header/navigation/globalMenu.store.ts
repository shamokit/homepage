import { writable } from 'svelte/store'

export const globalMenuStore = () => {
	const { subscribe, update } = writable(false)
	return {
		menuOpen: { subscribe },
		openMenu: () => update(() => true),
		closeMenu: (isMobile: boolean) => {
			isMobile && update(() => false)
		},
		toggleMenu: () => update(prev => prev = !prev),
	}
}
