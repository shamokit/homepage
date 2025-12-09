<script lang="ts">
	import Head02 from '$lib/components/heading/head02/index.svelte';
	import LinkButton from '$lib/components/button/linkButton/index.svelte';
	import Posts from '$lib/components/post/posts.svelte';
	import { contactList } from '$lib/const';
	import note from '$lib/assets/note.png';
	import { fetchNotePosts } from './fetchNotePosts.remote';

	const posts = await fetchNotePosts();
</script>

<section class="grid gap-5">
	<Head02 title="note">
		{#snippet ico()}
			<img src={note} alt="" width="40" height="40" />
		{/snippet}
		{#snippet button()}
			<LinkButton href={contactList.note.url}>note記事一覧</LinkButton>
		{/snippet}
	</Head02>
	<Posts {posts} />
</section>
