<script lang="ts">
	import type { HTMLImgAttributes } from 'svelte/elements';

	let {
		src,
		loading = 'lazy',
		class: className,
		...props
	}: Omit<HTMLImgAttributes, 'src' | 'alt' | 'width' | 'height'> & {
		[K in 'src' | 'alt' | 'width' | 'height']: NonNullable<HTMLImgAttributes[K]>;
	} = $props();

	let img = $state<HTMLImageElement | null>(null);
	let isLoading = $state<boolean>(true);
	let error = $state<boolean>(false);
	const handleError = () => {
		error = true;
	};
	const handleLoad = () => {
		isLoading = false;
	};
</script>

<span class="grid">
	{#if error}
		<span class="grid-over bg-surface-500" style={`aspect-ratio: ${props.width} / ${props.height}`}>
			<span class="sr-only">画像が読み込めませんでした</span></span
		>
	{:else}
		<span class="grid-over bg-surface-500 animate-pulse"></span>
		<img
			bind:this={img}
			{src}
			{loading}
			{...props}
			class={['grid-over', className]}
			onerror={handleError}
			onload={handleLoad}
		/>
	{/if}
</span>

<style>
	.grid-over {
		grid-area: 1/1;
	}
</style>
