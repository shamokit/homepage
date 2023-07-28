<script>
	import { icons, iconNames } from './const';
	import { capitalize } from '$lib/functions/capitalize';
</script>

<svg class="hidden">
	{#each iconNames as icon}
		<symbol viewBox={icons[icon].viewBox} id={`ico${capitalize(icon)}`}
			>{@html icons[icon].paths}</symbol
		>
	{/each}
</svg>
