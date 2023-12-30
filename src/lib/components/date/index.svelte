<script lang="ts">
	import type { PropsWithChildren } from 'svelte';
	import dayjs from 'dayjs';
	dayjs.locale('ja');
	import Ico from '$lib/components/svg/ico.svelte';

	let {
		date,
		type = 'edit' as const,
		tag = 'li' as const,
		timeTag = false,
		hasIco = true
	} = $props<
		PropsWithChildren<
			{
				date: string;
				type: 'edit' | 'updated';
				tag: 'li' | 'p';
				timeTag: boolean;
				hasIco: boolean;
			},
			never
		>
	>();
	let formattedDate = $derived(dayjs(date).format('YYYY/MM/DD'));
</script>

<svelte:element this={tag} class="flex items-center gap-1">
	{#if hasIco}
		<span class="block flex-shrink-0 w-3"
			><Ico name={type} ariaLabel={type === 'edit' ? '編集日：' : '更新日：'} /></span
		>
	{/if}
	<svelte:element this={timeTag ? 'time' : 'span'} datetime={timeTag ? date : null}
		>{formattedDate}</svelte:element
	>
</svelte:element>
