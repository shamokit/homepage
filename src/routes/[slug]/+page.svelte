<script lang="ts">
	import Breadcrumbs from '$lib/components/layouts/breadcrumbs/index.svelte'
	import Ico from '$lib/components/svg/ico.svelte';
	import MailVisual from '$lib/components/layouts/mainVisual/index.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<svelte:head>
	<title>しゃもきっとブログ</title>
	<meta name="description" content="しゃもきっとのエンジニアブログ" />
</svelte:head>
<Breadcrumbs breadcrumbs={[{
	name: data.page.title,
	slug: `/${data.page.slug}`
}]} />
<article>
	<div class="h-28" />
	<MailVisual title={data.page.title} lead={data.page.lead.lead} />
	<div class="h-16" />
	<div class="container">
		{#each data.page.body.body as section}
			<section class="grid gap-5 pt-7 pb-8">
				{#if section.title}
					<h2 class="text-xl">{section.title}</h2>
				{/if}
				<div class="grid gap-[1.8em]">
					{#each section.body as childSection}
						{#if childSection.fieldId === 'table'}
							<table class="bg-surface-100">
								<tbody>
									{#each childSection.row as row}
										<tr class="border-b border-primary-100">
											<th class="py-3 px-6 text-left">{row.title}</th>
											<td class="w-full py-3 px-6">{@html row.body}</td>
										</tr>
									{/each}
								</tbody>
							</table>
						{/if}
						{#if childSection.fieldId === 'content' && childSection.content}
							<div class="grid gap-[1.8em]">{@html childSection.content.replace(/\r?\n/g, '<br />')}</div>
						{/if}
						{#if childSection.toggle}
							<details class="bg-surface-100 shadow-sm rounded-md overflow-hidden">
								<summary
									class="group flex items-center gap-5 py-3 px-5 bg-primary-500 text-surface-100 font-bold"
								>
									<span class="mr-auto">{childSection.title}</span>
									<span
										class="block w-11 h-11 flex-shrink-0"
										>
										<span class="hidden group-open:block"><Ico name="minus" /></span>
										<span class="block group-open:hidden"><Ico name="add" /></span>
									</span>
								</summary>
								<div class="p-8">
									{#if childSection.fieldId === 'section'}
										{#each childSection.body as childSectionBody}
											{#if childSectionBody.fieldId === 'histories'}
												<table class="w-full">
													<tbody>
														{#each childSectionBody.history as history}
															<tr
																class="border-b border-primary-500 last-of-type:border-0 align-top"
															>
																<td class="w-16 py-4"
																	><span
																		class="block w-7 h-7 border border-secondary-500 rounded-full"
																	/></td
																>
																<th class="w-32 py-4 font-normal text-left">{history.day}</th>
																<td class="py-4">{@html history.content}</td>
															</tr>
														{/each}
													</tbody>
												</table>
											{/if}
										{/each}
									{/if}
								</div>
							</details>
						{/if}
					{/each}
				</div>
			</section>
		{/each}
	</div>
	<div class="h-28" />
</article>
