<script lang="ts">
	import Breadcrumbs from '$lib/components/layouts/breadcrumbs/index.svelte';
	import { SITE_URL, OG_IMAGE_URL } from '$lib/const';
	let count = 0;
	let accordionOpen = false;
	let accordion2Open = false;
	let activeTab = 1;
	const focusTab = (id: string) => {
		console.log(id);
		document.getElementById(id)?.focus();
	};
</script>

<svelte:head>
	<title>ランドマークの改善をした例｜ここから始めようWebアクセシビリティ｜しゃもブログ</title>
	<meta name="description" content="ランドマークの改善をした例｜しゃものエンジニアブログ" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content={`${SITE_URL}/examples/a11y/landmark`} />
	<meta
		property="og:image"
		content={`${OG_IMAGE_URL}/?message=${encodeURIComponent('ランドマークの改善をした例')}`}
	/>
	<meta
		property="og:title"
		content="ランドマークの改善をした例｜ここから始めようWebアクセシビリティ｜しゃもブログ"
	/>
	<meta property="og:description" content="ランドマークの改善をした例｜しゃものエンジニアブログ" />
	<link rel="canonical" href={`${SITE_URL}/examples/a11y/more-good`} />
</svelte:head>
<Breadcrumbs
	breadcrumbs={[
		{
			name: 'ランドマークの改善をした例',
			slug: '/examples/a11y/landmark'
		}
	]}
/>
<main>
	<div class="h-8 md:h-14 lg:h-28"></div>
	<div class="grid gap-10 container">
		<h1 class="text-xxl">ランドマークの改善をした例</h1>
		<div class="link grid gap-4">
			<h2 class="text-xl">リンク</h2>
			<p><a class="underline hover:no-underline" href="/">TOPページはこちら</a></p>
		</div>
		<div class="button grid gap-4">
			<h2 class="text-xl">ボタン</h2>
			<div class="flex">
				<button
					aria-label="カウントを1増やす"
					type="button"
					class="inline-flex px-4 bg-primary-500 text-surface-100 rounded-full"
					on:click={() => count++}
				>
					+1
				</button>
			</div>
			<p role="status">
				{count === 0 ? 'クリックするとメッセージが表示されます！' : `${count}回クリックしました！`}
			</p>
		</div>
		<div class="accordion grid gap-4">
			<h2 class="text-xl">アコーディオン</h2>
			<details bind:open={accordionOpen}>
				<summary class="font-bold">
					detailsでの実装<span aria-hidden="true">{accordionOpen ? '▲' : '▼'}</span>
				</summary>
				<div class="grid {accordionOpen ? 'open' : 'close'}">
					<div class="overflow-hidden">このページ内のコンテンツは、キーボードで操作できます！</div>
				</div>
			</details>
			<div>
				<button
					id="accordion2"
					class="font-bold"
					on:click={() => (accordion2Open = !accordion2Open)}
					type="button"
					aria-expanded={accordion2Open}
					aria-controls="accordion2-content"
				>
					buttonでの実装<span aria-hidden="true">{accordion2Open ? '▲' : '▼'}</span>
				</button>
				<div
					id="accordion2-content"
					class="grid {accordion2Open ? 'open' : 'close'}"
					hidden={!accordion2Open}
					aria-labelledby="accordion2"
				>
					<div class="overflow-hidden">このページ内のコンテンツは、キーボードで操作できます！</div>
				</div>
			</div>
		</div>

		<div class="tabcontents grid gap-4">
			<h2 id="animal" class="text-xl">動物</h2>
			<div class="tablist flex border-b border-primary-500" role="tablist" aria-label="animal">
				<button
					role="tab"
					aria-controls="tab-1"
					aria-selected={activeTab === 1}
					id="tab-1"
					tabindex="0"
					class="tab p-2{activeTab === 1 ? ' bg-primary-500 text-surface-100' : ''}"
					on:click={() => (activeTab = 1)}
					on:keyup|preventDefault={(e) => e.key === 'ArrowLeft' && focusTab('tab-3')}
					on:keyup|preventDefault={(e) => e.key === 'ArrowRight' && focusTab('tab-2')}
				>
					哺乳類
				</button>
				<button
					role="tab"
					aria-controls="tab-2"
					aria-selected={activeTab === 2}
					id="tab-2"
					tabindex="-1"
					class="tab p-2{activeTab === 2 ? ' bg-primary-500 text-surface-100' : ''}"
					on:click={() => (activeTab = 2)}
					on:keyup|preventDefault={(e) => e.key === 'ArrowLeft' && focusTab('tab-1')}
					on:keyup|preventDefault={(e) => e.key === 'ArrowRight' && focusTab('tab-3')}
				>
					魚類
				</button>
				<button
					role="tab"
					aria-controls="tab-3"
					aria-selected={activeTab === 3}
					id="tab-3"
					tabindex="-1"
					class="tab p-2{activeTab === 3 ? ' bg-primary-500 text-surface-100' : ''}"
					on:click={() => (activeTab = 3)}
					on:keyup|preventDefault={(e) => e.key === 'ArrowLeft' && focusTab('tab-2')}
					on:keyup|preventDefault={(e) => e.key === 'ArrowRight' && focusTab('tab-1')}
				>
					鳥類
				</button>
			</div>
			<div
				role="tabpanel"
				aria-labelledby="tab-1"
				id="tabpanel-1"
				class="tabpanel"
				tabindex="0"
				hidden={activeTab === 1 ? false : true}
			>
				猿、ゴリラ、一般人
			</div>
			<div
				role="tabpanel"
				aria-labelledby="tab-2"
				id="tabpanel-2"
				class="tabpanel"
				tabindex="0"
				hidden={activeTab === 2 ? false : true}
			>
				たい焼き
			</div>
			<div
				role="tabpanel"
				aria-labelledby="tab-3"
				id="tabpanel-3"
				class="tabpanel"
				tabindex="0"
				hidden={activeTab === 3 ? false : true}
			>
				ペンギン
			</div>
		</div>
	</div>
	<div class="h-8 md:h-14 lg:h-28"></div>
</main>

<style>
	.open {
		grid-template-rows: 1fr;
	}
	.close {
		grid-template-rows: 0fr;
	}
</style>
