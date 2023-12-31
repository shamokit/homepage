<script lang="ts">
	import type { PropsWithChildren } from 'svelte';
	import '../css/app.css';
	import { page } from '$app/stores';
	import Svg from '$lib/components/svg/index.svelte';
	import Header from '$lib/components/layouts/header/index.svelte';
	import Footer from '$lib/components/layouts/footer/index.svelte';

	let { children } = $props<
		PropsWithChildren<{
			children: string;
		}, never>
	>();
</script>

<div class="flex flex-col min-h-screen pt-[var(--header-height)] bg-surface-300 first:hidden">
	<Svg />
	<Header isHome={$page.route.id === '/'} />
	<div class="flex-1">
		{@render children()}
	</div>
	<Footer />
</div>
