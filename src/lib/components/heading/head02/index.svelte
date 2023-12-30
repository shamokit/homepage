<script lang="ts">
	let { title, headingLevel = 3 } = $props<{
		title: string;
		headingLevel?: 3 | 4;
	}>();
	let tagName = $derived(`h${headingLevel}`);
</script>

<header class="flex flex-wrap items-center gap-5">
	<div class="flex items-center gap-3">
		{#if $$slots.ico}
			<div class="w-6 h-6 lg:w-10 lg:h-10" aria-hidden="true">
				<slot name="ico" />
			</div>
		{/if}
		<svelte:element this={tagName} class="text-xl">
			{title}
		</svelte:element>
	</div>
	{#if $$slots.button}
		<slot name="button" />
	{/if}
</header>
