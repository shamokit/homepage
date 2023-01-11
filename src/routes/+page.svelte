<script lang="ts">
	import Head01 from '$lib/components/heading/head01/index.svelte';
	import Head02 from '$lib/components/heading/head02/index.svelte';
	import LinkButton from '$lib/components/button/linkButton/index.svelte';
	import Post from '$lib/components/post/index.svelte';
	import { contactList } from '$lib/const';
	import type { PageData } from './$types';
	import zenn from '$lib/assets/zenn.png';
	import qiita from '$lib/assets/qiita.png';
	export let data: PageData;
</script>

<svelte:head>
	<title>しゃもきっとブログ</title>
	<meta name="description" content="しゃもきっとのエンジニアブログ" />
</svelte:head>
<section>
	<div class="grid gap-12 container py-16 lg:py-28">
		<Head01 title="Posts">
			<p>QiitaとZennに記事を投稿しています。</p>
		</Head01>
		<div class="grid gap-10">
			{#if data.zenn.length > 0}
				<section class="grid gap-5">
					<Head02 title="Zenn">
						<svelte:fragment slot="ico">
							<img src={zenn} alt="zenn" />
						</svelte:fragment>
						<svelte:fragment slot="button">
							<LinkButton href={contactList.zenn.url}>Zenn記事一覧</LinkButton>
						</svelte:fragment>
					</Head02>
					<ul class="grid gap-3">
						{#each data.zenn as post}
							<li>
								<Post url={post.link} title={post.title} date={post.isoDate} />
							</li>
						{/each}
					</ul>
				</section>
			{/if}
			{#if data.qiita.length > 0}
				<section class="grid gap-5">
					<Head02 title="Qiita">
						<svelte:fragment slot="ico">
							<img src={qiita} alt="qiita" />
						</svelte:fragment>
						<svelte:fragment slot="button">
							<LinkButton href={contactList.qiita.url}>Qiita記事一覧</LinkButton>
						</svelte:fragment>
					</Head02>
					<ul class="grid gap-3">
						{#each data.qiita as post}
							<li>
								<Post url={post.link} title={post.title} date={post.isoDate} />
							</li>
						{/each}
					</ul>
				</section>
			{/if}
		</div>
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
			{#each data.photos.data as photo, index}
				<li>
					<a
						href={photo.permalink}
						target="_blank"
						rel="noopener noreferrer"
						class="group block overflow-hidden rounded-lg"
						><img
							src={photo.media_url}
							alt={`うなぎとほっけの写真${index}`}
							class="block transition-transform will-change-transform duration-300 ease-in-out group-hover:scale-125"
							width="600"
							height="600"
						/></a
					>
				</li>
			{/each}
		</ul>
		<LinkButton href={contactList.instagram.url} blank={true}>Instagramへ</LinkButton>
	</div>
</section>
