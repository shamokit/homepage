<script lang="ts">
	import { icons, iconNames } from './const'
	import { capitalize } from '$lib/functions/capitalize'
	export let name: typeof iconNames[number] = 'edit'
	$: icon = icons[name]
</script>
<svg viewBox={icon.viewBox} class="fill-current">
	<use href={`#ico${capitalize(name)}`} />
</svg>
