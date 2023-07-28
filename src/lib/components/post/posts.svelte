<script lang="ts">
	export let posts: {
		id: string;
		link: string;
		title: string;
		pubDate: string;
	}[];
	import Post from '$lib/components/post/index.svelte';
</script>

<ul class="grid gap-3">
	{#each posts as post}
		<li>
			<Post {post} />
		</li>
	{/each}
</ul>
