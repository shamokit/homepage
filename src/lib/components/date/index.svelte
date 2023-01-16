<script lang="ts">
	import dayjs from 'dayjs';
	dayjs.locale('ja');
	import Ico from '$lib/components/svg/ico.svelte';
	export let date: string = '';
	$: formattedDate = dayjs(date).format('YYYY/MM/DD');
	export let type: 'edit' | 'updated' = 'edit';
	export let tag: 'li' | 'p' = 'li';
	export let timeTag: boolean = false;
	export let hasIco: boolean = true;
</script>

<svelte:element this={tag} class="flex gap-1">
	{#if hasIco}
		<span class="block flex-shrink-0 w-3"><Ico name={type} /></span>
	{/if}
	<svelte:element this={timeTag ? 'time' : 'span'} datetime={timeTag ? date : null}>{formattedDate}</svelte:element>
</svelte:element>
