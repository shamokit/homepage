<script lang="ts">
	let { title, headingLevel = 2 } = $props<{
		title: string;
		headingLevel?: 1 | 2 | 3;
	}>();
	let tagName = $derived(`h${headingLevel}`);
</script>

<header class="flex flex-col gap-2.5">
	<svelte:element this={tagName} class="text-xxl">
		{title}
	</svelte:element>
	<slot />
</header>
