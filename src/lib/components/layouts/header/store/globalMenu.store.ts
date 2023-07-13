import { writable } from 'svelte/store'

export const globalMenuStore = () => {
	const { subscribe, update } = writable(false)

	return {
		open: { subscribe },
		setOpen: () => update(() => true),
		setClose: () => update(() => {
			console.log('close')
			return false
		}),
		toggle: () => update(prev => prev = !prev),
	}
}
