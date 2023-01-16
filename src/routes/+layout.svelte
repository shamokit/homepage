<script>
	import "../css/app.css";
	import Svg from '$lib/components/svg/index.svelte'
	import Header from '$lib/components/layouts/header/index.svelte'
	import Footer from '$lib/components/layouts/footer/index.svelte'
</script>
<Svg />
<div class="flex flex-col min-h-screen pt-[var(--header-height)] bg-surface-300">
	<Header />
	<div class="flex-1">
		<slot />
	</div>
	<Footer />
</div>
