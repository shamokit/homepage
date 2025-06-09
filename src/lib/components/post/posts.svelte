<script lang="ts">
	import type { ComponentProps } from 'svelte';
	import Post from '$lib/components/post/index.svelte';
	let {
		posts
	}: {
		posts: ComponentProps<typeof Post>[];
	} = $props();
</script>

<div class="grid gap-3">
	{#each posts as post}
		<Post {...post} />
	{/each}
</div>
