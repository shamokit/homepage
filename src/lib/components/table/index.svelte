<script lang="ts">
	import Row from '$lib/components/table/row.svelte';
	export let rows: {
		title: string;
		body: string;
	}[];
</script>

<table class="bg-surface-100">
	<tbody>
		{#each rows as row}
			<Row title={row.title} body={row.body} />
		{/each}
	</tbody>
</table>
