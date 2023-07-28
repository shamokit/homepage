<script lang="ts">
	import type { Section as SectionProps } from '$lib/schema/staticPage/section';
	import Wysiwyg from '$lib/components/wysiwyg/index.svelte';
	import Table from '$lib/components/table/index.svelte';
	import Histories from '$lib/components/history/index.svelte';
	import Section from '$lib/components/staticPage/section.svelte';
	export let body: SectionProps['body'];
	export let level = 2;
</script>

{#each body as childSectionBody}
	{#if childSectionBody.fieldId === 'histories'}
		<Histories histories={childSectionBody.history} />
	{/if}
	{#if childSectionBody.fieldId === 'table'}
		<Table rows={childSectionBody.row} />
	{/if}
	{#if childSectionBody.fieldId === 'content' && childSectionBody.content}
		<Wysiwyg content={childSectionBody.content} />
	{/if}
	{#if childSectionBody.fieldId === 'section'}
		<Section section={childSectionBody} level={level + 1} />
	{/if}
{/each}
