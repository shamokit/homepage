<script>
	import { page } from '$app/stores';
	import Head01 from '$lib/components/heading/head01/index.svelte';
</script>

<svelte:head>
	<title>Error！{$page.status}</title>
</svelte:head>
<section>
	<div class="grid gap-12 container py-16 lg:py-28">
		<Head01 title="Error">
			<p>Status: {$page.status}</p>
		</Head01>
		<p>{$page.error?.message}</p>
	</div>
</section>
