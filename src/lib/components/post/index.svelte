<script lang="ts">
	import LogoIco from '$lib/components/logo/ico.svelte';
	import Ico from '$lib/components/svg/ico.svelte';
	import Date from '$lib/components/date/index.svelte';
	import { SITE_URL } from '$lib/const';
	let {
		link,
		title,
		pubDate
	}: {
		id: string;
		link: string;
		title: string;
		pubDate: string;
	} = $props();
	const id = $props.id();

	let blank = $derived(!link.startsWith(SITE_URL));
</script>

<article aria-labelledby={id}>
	<a
		href={link}
		class="group relative flex gap-3 p-4 lg:p-6 bg-surface-100 rounded-lg shadow-sm will-change-all transition-[box-shadow,background] duration-300 ease-in-out hover:bg-surface-100 hover:shadow-md"
		target={blank ? '_blank' : null}
		rel={blank ? 'noopener noreferrer' : null}
	>
		<div class="grid gap-2 flex-1">
			<h4 {id} class="text-sm font-bold group-hover:text-secondary-500">
				{@html title}
			</h4>
			<footer>
				<div class="font-bold text-xxxs">
					<Date date={pubDate} tag="p" />
				</div>
			</footer>
		</div>
		{#if blank}
			<span class="absolute bottom-1 right-1 block w-3">
				<Ico name="blank" />
			</span>
		{/if}
	</a>
</article>
