<script>
	import qiita from '$lib/assets/qiita.webp';
	import zenn from '$lib/assets/zenn.webp';
	import instagram from '$lib/assets/instagram.webp';
	import x from '$lib/assets/x.webp';
	import github from '$lib/assets/github.webp';
	import note from '$lib/assets/note.png';
	import { links, contactList } from '$lib/const';
	import Ico from '$lib/components/svg/ico.svelte';
</script>

<footer class="bg-surface-700">
	<div class="container py-6 md:py-16">
		<div class="flex flex-col gap-3 md:flex-row md:items-end">
			<ul class="flex gap-x-3 md:order-1 -mx-1">
				<li>
					<a
						href={contactList.qiita.url}
						target="_blank"
						rel="noopener noreferrer"
						class="block w-8 lg:w-10 p-1 rounded-full transition-opacity hover:opacity-80"
						><img src={qiita} alt={contactList.qiita.name} width="40" height="40" /></a
					>
				</li>
				<li>
					<a
						href={contactList.zenn.url}
						target="_blank"
						rel="noopener noreferrer"
						class="block w-8 lg:w-10 p-1 rounded-full transition-opacity hover:opacity-80"
						><img src={zenn} alt={contactList.zenn.name} width="40" height="40" /></a
					>
				</li>
				<li>
					<a
						href={contactList.note.url}
						target="_blank"
						rel="noopener noreferrer"
						class="block w-8 lg:w-10 rounded-full transition-opacity hover:opacity-80"
						><img src={note} alt={contactList.note.name} width="40" height="40" /></a
					>
				</li>
				<li>
					<a
						href={contactList.instagram.url}
						target="_blank"
						rel="noopener noreferrer"
						class="block w-8 lg:w-10 p-1 rounded-full transition-opacity hover:opacity-80"
						><img src={instagram} alt={contactList.instagram.name} width="40" height="40" /></a
					>
				</li>
				<li>
					<a
						href={contactList.x.url}
						target="_blank"
						rel="noopener noreferrer"
						class="block w-8 lg:w-10 p-1.5 rounded-full transition-opacity hover:opacity-80"
						><img src={x} alt={contactList.x.name} width="40" height="41" /></a
					>
				</li>
				<li>
					<a
						href={contactList.github.url}
						target="_blank"
						rel="noopener noreferrer"
						class="block w-8 lg:w-10 p-1 rounded-full transition-opacity hover:opacity-80"
						><img src={github} alt={contactList.github.name} width="40" height="40" /></a
					>
				</li>
			</ul>
			<div class="grid gap-2 flex-1">
				<ul class="flex flex-wrap md:gap-y-3 -mx-2.5">
					{#each links as link}
						<li class="md:py-1">
							<a
								href={link.slug}
								class="flex items-center gap-1.5 px-2.5 md:py-2 transition-all rounded-full hover:text-secondary-500 hover:underline-offset-8 hover:underline"
							>
								{#if link.iconName}
									<span class="inline-block w-5"><Ico name={link.iconName} /></span>
								{/if}
								{link.name}
							</a>
						</li>
					{/each}
				</ul>
				<p class="leading-none"><small class="text-xxs">©️2022-2025 shamokit</small></p>
			</div>
		</div>
	</div>
</footer>
