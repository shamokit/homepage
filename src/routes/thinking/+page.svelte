<script lang="ts">
	import Head01 from '$lib/components/heading/head01/index.svelte';
	import Thinkings from '$lib/components/thinking/thinkings.svelte';
	import { SITE_URL, OG_IMAGE_URL } from '$lib/const';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<svelte:head>
	<title>Thinking｜しゃもきっとブログ</title>
	<meta
		name="description"
		content="本から得た知識や仕事で得た知識のアウトプット、日頃考えていることを記録しています。"
	/>
	<meta property="og:type" content="article" />
	<meta property="og:url" content={`${SITE_URL}/thinking`} />
	<meta
		property="og:image"
		content={`${OG_IMAGE_URL}/?message=Thinking｜本から得た知識や仕事で得た知識のアウトプット、日頃考えていることを記録しています。`}
	/>
	<meta property="og:title" content="Thinking｜しゃもきっとブログ" />
	<meta
		property="og:description"
		content="本から得た知識や仕事で得た知識のアウトプット、日頃考えていることを記録しています。"
	/>
	<link rel="canonical" href={`${SITE_URL}/thinking`} />
</svelte:head>
<main>
	<section>
		<div class="grid gap-8 container py-16 lg:py-28">
			<Head01 title="Thinking" headingLevel={1}>
				<p>本から得た知識や仕事で得た知識のアウトプット、日頃考えていることを記録しています。</p>
			</Head01>
			<Thinkings thinkings={data.thinkings.contents} />
		</div>
	</section>
</main>
