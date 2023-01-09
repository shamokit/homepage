<script>
	import qiita from '$lib/assets/qiita.png';
	import zenn from '$lib/assets/zenn.png';
	import instagram from '$lib/assets/instagram.png';
	import twitter from '$lib/assets/twitter.png';
	import github from '$lib/assets/github.png';
	import { links, contactList } from '$lib/const';
	import Ico from '$lib/components/svg/ico.svelte';
</script>

<footer class="bg-surface-700">
	<div class="container py-6 lg:py-16">
		<div class="flex flex-col gap-3 lg:flex-row lg:items-end">
			<ul class="flex gap-x-3 lg:gap-x-5 lg:order-1">
				<li>
					<a href={contactList.qiita.url} target="_blank" rel="noopener noreferrer" class="block w-6 lg:w-10 transition-opacity hover:opacity-80"
						><img src={qiita} alt={contactList.qiita.name} width="40" height="40" /></a
					>
				</li>
				<li>
					<a href={contactList.zenn.url} target="_blank" rel="noopener noreferrer" class="block w-6 lg:w-10 transition-opacity hover:opacity-80"
						><img src={zenn} alt={contactList.zenn.name} width="40" height="40" /></a
					>
				</li>
				<li>
					<a href={contactList.instagram.url} target="_blank" rel="noopener noreferrer" class="block w-6 lg:w-10 transition-opacity hover:opacity-80"
						><img src={instagram} alt={contactList.instagram.name} width="40" height="40" /></a
					>
				</li>
				<li>
					<a href={contactList.twitter.url} target="_blank" rel="noopener noreferrer" class="block w-6 lg:w-10 transition-opacity hover:opacity-80"
						><img src={twitter} alt={contactList.twitter.name} width="40" height="40" /></a
					>
				</li>
				<li>
					<a href={contactList.github.url} target="_blank" rel="noopener noreferrer" class="block w-6 lg:w-10 transition-opacity hover:opacity-80"
						><img src={github} alt={contactList.github.name} width="40" height="40" /></a
					>
				</li>
			</ul>
			<div class="grid gap-2 flex-1">
				<ul class="grid w-fit grid-cols-2 lg:flex gap-y-3 gap-x-5">
					{#each links as link}
					<li>
						<a
							href={link.slug}
							class="flex items-center gap-1.5 transition-all hover:text-secondary-500 hover:underline-offset-8 hover:underline"
						>
							{#if link.iconName}
								<span class="inline-block w-5"><Ico name={link.iconName} /></span>
							{/if}
							{link.name}
						</a>
					</li>
				{/each}
				</ul>
				<p class="leading-none"><small class="text-xxs">©️2022-2023 shamokit</small></p>
			</div>
		</div>
	</div>
</footer>
