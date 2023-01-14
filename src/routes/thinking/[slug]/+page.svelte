<script lang="ts">
	import Breadcrumbs from '$lib/components/layouts/breadcrumbs/index.svelte'
	import Dates from '$lib/components/date/dates.svelte';
	import Thinking from '$lib/components/thinking/index.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<svelte:head>
	<title>{data.post.title}｜Thinking｜しゃもきっとブログ</title>
	<meta name="description" content="しゃもきっとのエンジニアブログ" />
</svelte:head>
<Breadcrumbs breadcrumbs={[{
	name: 'Thinking',
	slug: `/thinking`
},{
	name: data.post.title,
	slug: `/thinking/${data.post.slug}`
}]} />
<article>
	<div class="h-8 md:h-14 lg:h-28" />
	<div class="grid grid-cols-1 gap-10 md:gap-12 lg:gap-16 container">
		<header class="grid grid-cols-1 gap-2.5">
			<h1 class="text-xxl">{data.post.title}</h1>
			<Dates publishedDate={data.post.publishedAt} updatedDate={data.post.updatedAt} />
		</header>
		<div class="py-8 px-6 md:p-8 lg:p-10 rounded-md bg-surface-100">
			{#each data.post.sections as section}
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
													{#each childContent.contents as grandChildContent}
														{#if grandChildContent.fieldId === 'contents'}
															{@html grandChildContent.body}
														{/if}
													{/each}
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
<section class="grid gap-5 bg-surface-500">
	<div class="h-10 md:h-12 lg:h-16"></div>
	<div class="container grid gap-5">
		<h2 class="text-xxl">関連記事</h2>
		<ul class="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
			<li>
				<Thinking post={data.post} />
			</li>
		</ul>
	</div>
	<div class="h-8 md:h-14 lg:h-28" />
</section>
