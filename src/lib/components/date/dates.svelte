<script lang="ts">
	import dayjs from 'dayjs';
	dayjs.locale('ja');
	export let publishedDate = '';
	export let updatedDate = '';
	import Date from '$lib/components/date/index.svelte';
</script>

<ul class="flex gap-3 text-xxxs">
	<Date date={publishedDate} type="edit" />
	<Date date={updatedDate} type="updated" timeTag={true} />
</ul>
