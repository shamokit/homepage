<script lang="ts">
	import { icons, iconNames } from './const';
	import { capitalize } from '$lib/functions/capitalize';
	export let name: (typeof iconNames)[number] = 'edit';
	export let ariaLabel: string | undefined = undefined;
	$: icon = icons[name];
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
