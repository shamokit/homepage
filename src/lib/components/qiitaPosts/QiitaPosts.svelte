<script lang="ts">
	import Head02 from '$lib/components/heading/head02/index.svelte';
	import LinkButton from '$lib/components/button/linkButton/index.svelte';
	import Posts from '$lib/components/post/posts.svelte';
	import { contactList } from '$lib/const';
	import qiita from '$lib/assets/qiita.webp';
	import { fetchQiitaPosts } from './fetchQiitaPosts.remote';

	const posts = await fetchQiitaPosts();
</script>

<section class="grid gap-5">
	<Head02 title="Qiita">
		{#snippet ico()}
			<img src={qiita} alt="" width="40" height="40" />
		{/snippet}
		{#snippet button()}
			<LinkButton href={contactList.qiita.url}>Qiita記事一覧</LinkButton>
		{/snippet}
	</Head02>
	<Posts {posts} />
</section>
