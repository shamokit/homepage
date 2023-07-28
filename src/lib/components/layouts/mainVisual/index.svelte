<script lang="ts">
	export let title = '';
	export let lead: string | null = null;
</script>

<header>
	<div class="grid gap-2.5 container">
		<h1 class="text-xxxl">{title}</h1>
		{#if lead}
			<p>{@html lead.replace(/\r?\n/g, '<br />')}</p>
		{/if}
	</div>
</header>
