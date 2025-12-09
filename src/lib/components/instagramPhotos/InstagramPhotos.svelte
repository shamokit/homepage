<script lang="ts">
	import Head01 from '$lib/components/heading/head01/index.svelte';
	import LinkButton from '$lib/components/button/linkButton/index.svelte';
	import { contactList } from '$lib/const';
	import Image from '$lib/components/image/Image.svelte';
	import { fetchInstagramPhotos } from './fetchInstagramPhotos.remote';

	const photos = await fetchInstagramPhotos();
</script>

<section class="bg-surface-500">
	<div class="grid gap-8 container py-16 lg:py-28">
		<Head01 title="Hokke to Unagi">
			<p>うちのねこたちの写真です。</p>
		</Head01>
		<ul class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
			{#each photos as photo, i}
				<li>
					<a
						href={photo.permalink}
						target="_blank"
						rel="noopener noreferrer"
						class="group block overflow-hidden rounded-lg"
						><Image
							src={photo.media_url}
							alt={photo.caption || `ほっけとうなぎの写真${i}`}
							class="block transition-transform will-change-transform duration-300 ease-in-out group-hover:scale-125 aspect-square w-full"
							width={600}
							height={600}
						/></a
					>
				</li>
			{/each}
		</ul>
		<LinkButton href={contactList.instagram.url} blank={true}>Instagramへ</LinkButton>
	</div>
</section>
