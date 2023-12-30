<script lang="ts">
	import Wysiwyg from '$lib/components/wysiwyg/index.svelte';

	let { title, body } = $props<{
		title: string;
		body: string;
	}>();
</script>

<tr class="border-b border-primary-100">
	<th class="py-3 px-6 text-left" scope="row">{title}</th>
	<td class="w-full py-3 px-6">
		<Wysiwyg content={body} />
	</td>
</tr>
