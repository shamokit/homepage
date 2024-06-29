<script lang="ts">
	import { page } from '$app/stores';
	import Ico from '$lib/components/svg/ico.svelte';

	let {
		breadcrumbs = []
	}: {
		breadcrumbs?: {
			name: string;
			slug: string;
		}[];
	} = $props();
</script>

<nav class="py-4 lg:py-5 whitespace-nowrap overflow-auto" aria-label="パンくずリスト">
	<div class="container">
		<ol class="flex gap-y-1 gap-x-2 text-xxs">
			{#each [{ name: 'Home', slug: '/' }, ...breadcrumbs] as breadcrumb, index}
				<li class="flex gap-2">
					{#if index !== 0}
						<span class="inline-flex w-3 h-3"><Ico name="next" /></span>
					{/if}
					<a
						href={breadcrumb.slug}
						aria-current={$page.url.pathname === breadcrumb.slug ? 'page' : undefined}
						class={$page.url.pathname === breadcrumb.slug
							? 'flex items-center text-secondary-500 font-bold'
							: 'flex items-center'}>{breadcrumb.name}</a
					>
				</li>
			{/each}
			<li class="w-[2em] shrink-0" aria-hidden={true}></li>
		</ol>
	</div>
</nav>
