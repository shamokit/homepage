<script lang="ts">
	import Ico from '$lib/components/svg/ico.svelte'
	export let href: string = ''
	export let blank: boolean = false
</script>
<p class="text-sm">
	<a href={href} target={blank ? "_blank" : null} rel={blank ? "noopener noreferrer" : null} class="flex items-center gap-2 w-fit pt-[13px] pb-3 px-6 bg-primary-500 text-surface-100 rounded-full">
		<slot />
		<span class="inline-flex w-4 flex-shrink-0 flex-grow-0" aria-label="外部サイトに移動します"><Ico name="blank" /></span>
	</a>
</p>
