<script lang="ts">
	import Breadcrumbs from '$lib/components/layouts/breadcrumbs/index.svelte';
	import MailVisual from '$lib/components/layouts/mainVisual/index.svelte';
	import Section from '$lib/components/staticPage/section.svelte';
	import { SITE_URL, OG_IMAGE_URL } from '$lib/const';
	let { data } = $props();
</script>

<svelte:head>
	<title>{data.page.meta?.title ?? `${data.page.title}｜しゃもブログ`}</title>
	<meta
		name="description"
		content={data.page.meta?.description ?? `${data.page.title}｜しゃもブログ`}
	/>
	<meta property="og:type" content="article" />
	<meta property="og:url" content={`${SITE_URL}/${data.page.slug}`} />
	<meta
		property="og:image"
		content={`${OG_IMAGE_URL}/?message=${encodeURIComponent(
			`${data.page.title}｜${data.page.lead.lead}`
		)}`}
	/>
	<meta property="og:title" content={data.page.meta?.title ?? `${data.page.title}｜しゃもブログ`} />
	<meta
		property="og:description"
		content={data.page.meta?.description ?? `${data.page.title}｜しゃもブログ`}
	/>
	<link rel="canonical" href={`${SITE_URL}/${data.page.slug}`} />
</svelte:head>
<Breadcrumbs
	breadcrumbs={[
		{
			name: data.page.title,
			slug: `/${data.page.slug}`
		}
	]}
/>
<main>
	<article>
		<div class="h-8 md:h-14 lg:h-28"></div>
		<MailVisual title={data.page.title} lead={data.page.lead.lead} />
		<div class="h-4 md:h-8 lg:h-16"></div>
		<div class="container">
			{#each data.page.body.body as section}
				<Section {section} />
			{/each}
		</div>
		<div class="h-8 md:h-14 lg:h-28"></div>
	</article>
</main>
