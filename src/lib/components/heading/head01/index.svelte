<script lang="ts">
	export let title: string = ''
	export let headingLevel: 1 | 2 | 3 = 2
	$: tagName = `h${headingLevel}`
</script>
<header class="flex flex-col gap-2.5">
	<svelte:element this={tagName} class="text-xxl">
		{title}
	</svelte:element>
	<slot />
</header>
