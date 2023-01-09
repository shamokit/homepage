<script lang="ts">
	import Head01 from '$lib/components/heading/head01/index.svelte';
	import LinkButton from '$lib/components/button/linkButton/index.svelte';
	import { contactList } from '$lib/const';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>しゃもきっとブログ</title>
</svelte:head>
<section>
	<div class="grid gap-8 container py-16 lg:py-28">
		<Head01 title="Posts">
			<p>QiitaとZennに記事を投稿しています。</p>
		</Head01>
	</div>
</section>
<section class="bg-surface-500">
	<div class="grid gap-8 container py-16 lg:py-28">
		<Head01 title="Thinking">
			<p>本から得た知識や仕事で得た知識のアウトプット、日頃考えていることを記録しています。</p>
		</Head01>
		<LinkButton href="/thinking">Thinking一覧</LinkButton>
	</div>
</section>
<section>
	<div class="grid gap-8 container py-16 lg:py-28">
		<Head01 title="Hokke to Unagi">
			<p>うちのねこたちの写真です。</p>
		</Head01>
		<ul class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
			{#each data.data as photo, index}
				<li class="rounded-lg overflow-hidden">
					<a href={photo.permalink} target="_blank" rel="noopener noreferrer" class="block transition-opacity hover:opacity-80"
						><img src={photo.media_url} alt={`うなぎとほっけの写真${index}`} /></a
					>
				</li>
			{/each}
		</ul>
		<LinkButton href={contactList.instagram.url} blank={true}>Instagramへ</LinkButton>
	</div>
</section>
