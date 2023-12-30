<script lang="ts">
	import type { ComponentProps } from 'svelte';
	import Post from '$lib/components/post/index.svelte';
	let { posts } = $props<{
		posts: ComponentProps<Post>[];
	}>();
</script>

<ul class="grid gap-3">
	{#each posts as post}
		<li>
			<Post {...post} />
		</li>
	{/each}
</ul>
