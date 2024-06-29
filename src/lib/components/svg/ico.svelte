<script lang="ts">
	import { icons, iconNames } from './const';
	import { capitalize } from '$lib/functions/capitalize';
	let {
		name = 'edit',
		ariaLabel
	}: {
		name: (typeof iconNames)[number];
		ariaLabel?: string;
	} = $props();
	let icon = $derived(icons[name]);
</script>

<svg
	viewBox={icon.viewBox}
	class="fill-current"
	aria-hidden={!ariaLabel && 'true'}
	aria-label={ariaLabel && ariaLabel}
	role={ariaLabel && 'img'}
>
	<use href={`#ico${capitalize(name)}`} />
</svg>
