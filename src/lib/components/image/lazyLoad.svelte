<script lang="ts">
	let {
		src,
		alt,
		width,
		height,
		class: className
	}: {
		src: string;
		alt: string;
		width: number;
		height: number;
		class: string | null;
	} = $props();

	let image = $state<HTMLElement | null>(null);
	let isIntersecting = $state<boolean>(false);
	let intersectOnce = $state<boolean>(false);

	$effect(() => {
		const intersectionObserver = new IntersectionObserver(
			(entries) => {
				if (entries[0].intersectionRatio <= 0) return;
				if (!intersectOnce) {
					isIntersecting = true;
					intersectOnce = true;
					intersectionObserver.disconnect();
				}
			},
			{
				threshold: 0
			}
		);
		if (!image) return;
		intersectionObserver.observe(image);
	});
</script>

<img
	bind:this={image}
	src={isIntersecting
		? src
		: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAQSURBVHgBAQUA+v8ADVBp/wL6AcYxvWp0AAAAAElFTkSuQmCC'}
	alt={isIntersecting ? alt : 'loading中…'}
	{width}
	{height}
	class={className ?? null}
/>
