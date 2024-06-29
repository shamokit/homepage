<script lang="ts">
	import Head01 from '$lib/components/heading/head01/index.svelte';
	import Head02 from '$lib/components/heading/head02/index.svelte';
	import LinkButton from '$lib/components/button/linkButton/index.svelte';
	import Posts from '$lib/components/post/posts.svelte';
	import { contactList } from '$lib/const';
	import zenn from '$lib/assets/zenn.png';
	import qiita from '$lib/assets/qiita.png';
	import ImageLazyLoad from '$lib/components/image/lazyLoad.svelte';
	import { SITE_URL, OG_IMAGE_URL } from '$lib/const';
	let { data } = $props();
</script>

<svelte:head>
	<title>しゃもきっとブログ</title>
	<meta name="description" content="しゃもきっとのエンジニアブログ" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content={SITE_URL} />
	<meta property="og:image" content={`${OG_IMAGE_URL}`} />
	<meta property="og:title" content="しゃもきっとブログ" />
	<meta property="og:description" content="しゃもきっとのエンジニアブログ" />
	<link rel="canonical" href={SITE_URL} />
</svelte:head>
<main>
	<section>
		<div class="grid gap-12 container py-16 lg:py-28">
			<Head01 title="Posts">
				<p>
					Qiita{#if data.zenn.length > 0}とZenn{/if}に記事を投稿しています。
				</p>
			</Head01>
			<div class="grid gap-10">
				{#if data.zenn.length > 0}
					<section class="grid gap-5">
						<Head02 title="Zenn">
							<svelte:fragment slot="ico">
								<img src={zenn} alt="zenn" width="40" height="40" />
							</svelte:fragment>
							<svelte:fragment slot="button">
								<LinkButton href={contactList.zenn.url}>Zenn記事一覧</LinkButton>
							</svelte:fragment>
						</Head02>
						<Posts posts={data.zenn} />
					</section>
				{/if}
				{#if data.qiita.length > 0}
					<section class="grid gap-5">
						<Head02 title="Qiita">
							<svelte:fragment slot="ico">
								<img src={qiita} alt="qiita" width="40" height="40" />
							</svelte:fragment>
							<svelte:fragment slot="button">
								<LinkButton href={contactList.qiita.url}>Qiita記事一覧</LinkButton>
							</svelte:fragment>
						</Head02>
						<Posts posts={data.qiita} />
					</section>
				{/if}
			</div>
		</div>
	</section>
	{#if data.photos}
		<section class:bg-surface-500={!(data.photos.length > 0)}>
			<div class="grid gap-8 container py-16 lg:py-28">
				<Head01 title="Hokke to Unagi">
					<p>うちのねこたちの写真です。</p>
				</Head01>
				<ul class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
					{#each data.photos as photo}
						<li>
							<a
								href={photo.permalink}
								target="_blank"
								rel="noopener noreferrer"
								class="group block overflow-hidden rounded-lg"
								><ImageLazyLoad
									src={photo.media_url}
									alt={photo.caption}
									class="block transition-transform will-change-transform duration-300 ease-in-out group-hover:scale-125 aspect-square"
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
