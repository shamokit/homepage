<script lang="ts">
	import Head01 from '$lib/components/heading/head01/index.svelte';
	import Head02 from '$lib/components/heading/head02/index.svelte';
	import LinkButton from '$lib/components/button/linkButton/index.svelte';
	import Posts from '$lib/components/post/posts.svelte';
	import { contactList } from '$lib/const';
	import zenn from '$lib/assets/zenn.webp';
	import qiita from '$lib/assets/qiita.webp';
	import note from '$lib/assets/note.png';
	import Image from '$lib/components/image/Image.svelte';
	import { SITE_URL, OG_IMAGE_URL } from '$lib/const';
	let { data } = $props();
</script>

<svelte:head>
	<title>しゃもブログ</title>
	<meta name="description" content="しゃものエンジニアブログ" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content={SITE_URL} />
	<meta property="og:image" content={`${OG_IMAGE_URL}`} />
	<meta property="og:title" content="しゃもブログ" />
	<meta property="og:description" content="しゃものエンジニアブログ" />
	<link rel="canonical" href={SITE_URL} />
</svelte:head>
<main>
	<section>
		<div class="grid gap-12 container py-16 lg:py-28">
			<Head01 title="Posts">
				<p>QiitaとZennとnoteに記事を投稿しています。</p>
			</Head01>
			<div class="grid gap-10">
				{#if data.posts.qiita.length > 0}
					<section class="grid gap-5">
						<Head02 title="Qiita">
							{#snippet ico()}
								<img src={qiita} alt="" width="40" height="40" />
							{/snippet}
							{#snippet button()}
								<LinkButton href={contactList.qiita.url}>Qiita記事一覧</LinkButton>
							{/snippet}
						</Head02>
						<Posts posts={data.posts.qiita} />
					</section>
				{/if}
				{#if data.posts.zenn.length > 0}
					<section class="grid gap-5">
						<Head02 title="Zenn">
							{#snippet ico()}
								<img src={zenn} alt="" width="40" height="40" />
							{/snippet}
							{#snippet button()}
								<LinkButton href={contactList.zenn.url}>Zenn記事一覧</LinkButton>
							{/snippet}
						</Head02>
						<Posts posts={data.posts.zenn} />
					</section>
				{/if}
				{#if data.posts.note.length > 0}
					<section class="grid gap-5">
						<Head02 title="note">
							{#snippet ico()}
								<img src={note} alt="" width="40" height="40" />
							{/snippet}
							{#snippet button()}
								<LinkButton href={contactList.note.url}>note記事一覧</LinkButton>
							{/snippet}
						</Head02>
						<Posts posts={data.posts.note} />
					</section>
				{/if}
			</div>
		</div>
	</section>
	{#if data.photos}
		<section class="bg-surface-500">
			<div class="grid gap-8 container py-16 lg:py-28">
				<Head01 title="Hokke to Unagi">
					<p>うちのねこたちの写真です。</p>
				</Head01>
				<ul class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
					{#each data.photos as photo, i}
						<li>
							<a
								href={photo.permalink}
								target="_blank"
								rel="noopener noreferrer"
								class="group block overflow-hidden rounded-lg"
								><Image
									src={photo.media_url}
									alt={photo.caption || `ほっけとうなぎの写真${i}`}
									class="block transition-transform will-change-transform duration-300 ease-in-out group-hover:scale-125 aspect-square w-full"
									width={600}
									height={600}
								/></a
							>
						</li>
					{/each}
				</ul>
				<LinkButton href={contactList.instagram.url} blank={true}>Instagramへ</LinkButton>
			</div>
		</section>
	{/if}
</main>
