<script>
	import '../css/app.css';
	import { page } from '$app/stores';
	import Svg from '$lib/components/svg/index.svelte';
	import Header from '$lib/components/layouts/header/index.svelte';
	import Footer from '$lib/components/layouts/footer/index.svelte';
	import { mediaQueryAction } from '$lib/functions/mediaQuery.store.action';
</script>

<svelte:document use:mediaQueryAction />
<Svg />
<div class="flex flex-col min-h-screen pt-[var(--header-height)] bg-surface-300">
	<Header isHome={$page.route.id === '/'} />
	<div class="flex-1">
		<slot />
	</div>
	<Footer />
</div>
