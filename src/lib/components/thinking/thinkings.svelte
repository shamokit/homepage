<script lang="ts">
	import Thinking from '$lib/components/thinking/index.svelte';
	import type { ThinkingResponse } from '$lib/schema/thinking/thinking';
	export let thinkings: ThinkingResponse[];
</script>

{#if thinkings.length > 0}
	<ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
		{#each thinkings as thinking}
			<li><Thinking {thinking} /></li>
		{/each}
	</ul>
{:else}
	<p>準備中です。</p>
{/if}
