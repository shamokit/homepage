<script lang="ts">
	import dayjs from 'dayjs'
	dayjs.locale('ja')
	import LogoIco from '$lib/components/logo/ico.svelte'
	import Ico from '$lib/components/svg/ico.svelte'
	export let url: string = ''
	export let date: string = ''
	export let title: string = ''
	$: blank = !url.startsWith('https://shamokit.com')
	$: formattedDate = dayjs(date).format('YYYY/MM/DD')
</script>
<a href={url} class="group relative flex gap-3 p-4 lg:p-6 bg-surface-100 visited:bg-surface-300 rounded-lg shadow-sm will-change-all transition-[box-shadow,background] duration-300 ease-in-out hover:bg-surface-100 hover:shadow-md"  target={blank ? "_blank" : null} rel={blank ? "noopener noreferrer" : null}>
	<div class="w-9 flex-shrink-0">
		<LogoIco />
	</div>
	<div class="grid gap-2 flex-1">
		<div class="grid gap-1">
			<p class="font-bold text-xs">@shamokit</p>
			<p class="font-bold text-xxxs">{formattedDate}</p>
		</div>
		<p class="text-sm font-bold group-hover:text-secondary-500">{title}</p>
	</div>
	{#if blank}
		<span class="absolute bottom-1 right-1 block w-3">
			<Ico name="blank" />
		</span>
	{/if}
</a>
