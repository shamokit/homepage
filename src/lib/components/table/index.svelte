<script lang="ts">
	import Row from '$lib/components/table/row.svelte';
	let {
		rows
	}: {
		rows: {
			title: string;
			body: string;
		}[];
	} = $props();
</script>

<table class="bg-surface-100">
	<tbody>
		{#each rows as row}
			<Row title={row.title} body={row.body} />
		{/each}
	</tbody>
</table>
