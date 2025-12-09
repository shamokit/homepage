<script lang="ts">
	import Head02 from '$lib/components/heading/head02/index.svelte';
	import LinkButton from '$lib/components/button/linkButton/index.svelte';
	import Posts from '$lib/components/post/posts.svelte';
	import { contactList } from '$lib/const';
	import zenn from '$lib/assets/zenn.webp';
	import { fetchZennPosts } from './fetchZennPosts.remote';

	const posts = await fetchZennPosts();
</script>

<section class="grid gap-5">
	<Head02 title="Zenn">
		{#snippet ico()}
			<img src={zenn} alt="" width="40" height="40" />
		{/snippet}
		{#snippet button()}
			<LinkButton href={contactList.zenn.url}>Zenn記事一覧</LinkButton>
		{/snippet}
	</Head02>
	<Posts {posts} />
</section>
