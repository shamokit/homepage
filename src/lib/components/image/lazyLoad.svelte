<script lang="ts">
	import IntersectionObserver from 'svelte-intersection-observer';
	let elementOnce: HTMLElement;
	let intersectOnce: boolean;
	export let src: string;
	export let alt: string;
	export let width: number;
	export let height: number;
	let className: string | null = null;
	export { className as class };
	$: isIntersecting = false;
</script>

<IntersectionObserver
	once
	element={elementOnce}
	on:observe={(e) => {
		isIntersecting = e.detail.isIntersecting;
	}}
	bind:intersecting={intersectOnce}
>
	<img
		bind:this={elementOnce}
		src={isIntersecting
			? src
			: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAQSURBVHgBAQUA+v8ADVBp/wL6AcYxvWp0AAAAAElFTkSuQmCC'}
		{alt}
		{width}
		{height}
		class={className ?? null}
	/>
</IntersectionObserver>
