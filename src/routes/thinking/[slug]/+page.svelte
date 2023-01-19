<script lang="ts">
	import Breadcrumbs from '$lib/components/layouts/breadcrumbs/index.svelte'
	import Dates from '$lib/components/date/dates.svelte';
	import Thinkings from '$lib/components/thinking/thinkings.svelte';
	import Wysiwyg from '$lib/components/wysiwyg/index.svelte';
	import { SITE_URL } from '$lib/const';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<svelte:head>
	<title>{data.thinking.meta?.title ?? `${data.thinking.title}｜Thinking｜しゃもきっとブログ`}</title>
	<meta name="description" content={data.thinking.meta?.description ?? `${data.thinking.title}｜Thinking｜しゃもきっとブログ`} />
	<meta property="og:type" content="article" />
	<meta property="og:url" content={`${SITE_URL}/thinking/${data.thinking.slug}`} />
	<meta property="og:image" content={`${SITE_URL}/og?message=${encodeURIComponent(data.thinking.title)}`} />
	<meta property="og:title" content={data.thinking.meta?.title ?? `${data.thinking.title}｜Thinking｜しゃもきっとブログ`} />
	<meta property="og:description" content={data.thinking.meta?.description ?? `${data.thinking.title}｜Thinking｜しゃもきっとブログ`} />
	<link rel="canonical" href={`${SITE_URL}/thinking/${data.thinking.slug}`}>
</svelte:head>
<Breadcrumbs breadcrumbs={[{
	name: 'Thinking',
	slug: `/thinking`
},{
	name: data.thinking.title,
	slug: `/thinking/${data.thinking.slug}`
}]} />
<main>
	<article>
		<div class="h-8 md:h-14 lg:h-28" />
		<div class="grid grid-cols-1 gap-10 md:gap-12 lg:gap-16 container">
			<header class="grid grid-cols-1 gap-2.5">
				<h1 class="text-xxl">{data.thinking.title}</h1>
				<Dates publishedDate={data.thinking.publishedAt} updatedDate={data.thinking.updatedAt} />
			</header>
			<div class="py-8 px-6 md:p-8 lg:p-10 rounded-md bg-surface-100">
				{#each data.thinking.sections as section}
					<section>
						<h2 class="text-xxl">{section.title}</h2>
						<div class="h-6 lg:h-8"></div>
						{#each section.contents as content}
							{#if content.fieldId === 'contents'}
								{@html content.body}
							{/if}
							{#if content.fieldId === 'section'}
								<section class="py-10 last-of-type:pb-0">
									<h3 class="text-xl">{content.title}</h3>
									<div class="h-3 lg:h-5"></div>
									{#each content.contents as childContent}
										{#if childContent.fieldId === 'contents'}
											{@html childContent.body}
										{/if}
										{#if childContent.fieldId === 'section'}
											<section class="py-6 lg:py-8 last-of-type:pb-0">
												<div class="pt-[1em]">
													<div class="px-6 pb-6 bg-surface-500 rounded-md">
														<h4 class="translate-y-[-1em] w-fit mb-[0.5em] py-1 px-4 rounded-md text-md bg-secondary-500 text-surface-100">{childContent.title}</h4>
														<div class="grid grid-cols-1 gap-[1em]">
															{#each childContent.contents as grandChildContent}
																{#if grandChildContent.fieldId === 'contents'}
																	<Wysiwyg content={grandChildContent.body} />
																{/if}
															{/each}
														</div>
													</div>
												</div>
											</section>
										{/if}
									{/each}
								</section>
							{/if}
						{/each}
					</section>
				{/each}
			</div>
		</div>
		<div class="h-8 md:h-14 lg:h-28" />
	</article>
</main>
{#if data.thinking.relations}
	<section class="grid gap-5 bg-surface-500">
		<div class="h-10 md:h-12 lg:h-16"></div>
		<div class="container grid gap-5">
			<h2 class="text-xxl">関連記事</h2>
			<Thinkings thinkings={data.thinking.relations} />
		</div>
		<div class="h-8 md:h-14 lg:h-28" />
	</section>
{/if}
