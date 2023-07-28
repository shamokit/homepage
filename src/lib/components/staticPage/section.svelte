<script lang="ts">
	import type { Section } from '$lib/schema/staticPage/section';
	import Toggle from '$lib/components/toggle/index.svelte';
	import SectionContent from '$lib/components/staticPage/sectionContent.svelte';
	export let section: Section;
	export let level = 2;
	$: headingTag = headingData({ level, field: 'tag' });
	$: headingClass = headingData({ level, field: 'class' });
	$: sectionTag = sectionData({ level, field: 'tag' });
	$: sectionClass = sectionData({ level, field: 'class' });
	const headingData = ({ level, field }: { level: number; field: 'class' | 'tag' }) => {
		switch (level) {
			case 2: {
				if (field === 'tag') return 'h2';
				if (field === 'class') return 'text-xl';
				break;
			}
			case 3: {
				if (field === 'tag') return 'h3';
				if (field === 'class') return 'text-lg';
				break;
			}
			default: {
				if (field === 'tag') return 'h4';
				if (field === 'class') return 'text-md';
				break;
			}
		}
	};
	const sectionData = ({ level, field }: { level: number; field: 'class' | 'tag' }) => {
		const sectionTag = section.toggle && section.title ? 'div' : 'section';
		switch (level) {
			case 2: {
				if (field === 'tag') return sectionTag;
				if (field === 'class') return 'gap-5 py-7';
				break;
			}
			case 3: {
				if (field === 'tag') return sectionTag;
				if (field === 'class') return 'gap-4 py-6 px-7 bg-surface-500';
				break;
			}
			default: {
				if (field === 'tag') return sectionTag;
				if (field === 'class') return 'gap-3 py-3';
				break;
			}
		}
	};
</script>

{#if section.toggle && section.title}
	<Toggle title={section.title}>
		<SectionContent body={section.body} />
	</Toggle>
{:else}
	<svelte:element this={sectionTag} class={`grid ${sectionClass}`}>
		{#if section.title}
			<svelte:element this={headingTag} class={headingClass}>{section.title}</svelte:element>
		{/if}
		<SectionContent body={section.body} {level} />
	</svelte:element>
{/if}
