<script lang="ts">
	import { SITE_URL, OG_IMAGE_URL } from '$lib/const';
	import Head01 from '$lib/components/heading/head01/index.svelte';
	import QiitaPosts from '$lib/components/qiitaPosts/QiitaPosts.svelte';
	import ZennPosts from '$lib/components/zennPosts/ZennPosts.svelte';
	import NotePosts from '$lib/components/notePosts/NotePosts.svelte';
	import InstagramPhotos from '$lib/components/instagramPhotos/InstagramPhotos.svelte';
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
				<QiitaPosts />
				<ZennPosts />
				<NotePosts />
			</div>
		</div>
	</section>
	<InstagramPhotos />
</main>
