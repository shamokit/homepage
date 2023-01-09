<script>
	import "../css/app.css";
	import Svg from '$lib/components/svg/index.svelte'
	import Header from '$lib/components/layouts/header/index.svelte'
</script>
<Svg />
<div class="pt-[var(--header-height)]">
	<Header />
	<slot />
</div>
