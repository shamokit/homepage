<script lang="ts">
	import Wysiwyg from '$lib/components/wysiwyg/index.svelte';
	export let title: string
	export let body: string
</script>
<tr class="border-b border-primary-100">
	<th class="py-3 px-6 text-left">{title}</th>
	<td class="w-full py-3 px-6">
		<Wysiwyg content={body} />
	</td>
</tr>
