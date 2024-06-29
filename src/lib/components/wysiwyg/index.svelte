<script lang="ts">
	let {
		content
	}: {
		content: string;
	} = $props();
</script>

<div class="wysiwyg grid grid-cols-1 gap-[1em]">
	{@html content.replace(/\r?\n/g, '<br />')}
</div>

<style lang="postcss">
	.wysiwyg :global(a) {
		@apply underline underline-offset-2;
	}
	.wysiwyg :global(a:hover) {
		@apply no-underline;
	}
	.wysiwyg :global(code) {
		@apply block p-4 bg-primary-500 text-surface-100;
	}
</style>
