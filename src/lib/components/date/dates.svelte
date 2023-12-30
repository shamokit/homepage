<script lang="ts">
	import dayjs from 'dayjs';
	dayjs.locale('ja');
	import type { PropsWithChildren } from 'svelte';

	let { publishedDate = '', updatedDate = '' } = $props<
		PropsWithChildren<
			{
				publishedDate: string;
				updatedDate: string;
			},
			never
		>
	>();

	import Date from '$lib/components/date/index.svelte';
</script>

<ul class="flex gap-3 text-xxxs">
	<Date date={publishedDate} type="edit" />
	<Date date={updatedDate} type="updated" timeTag={true} />
</ul>
