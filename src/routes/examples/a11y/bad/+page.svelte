<script lang="ts">
	import { SITE_URL, OG_IMAGE_URL } from '$lib/const';
	let count = 0;
	let accordionOpen = false;
	let activeTab = 1;
</script>

<svelte:head>
	<title>キーボード操作できない例｜ここから始めようWebアクセシビリティ｜しゃもきっとブログ</title>
	<meta name="description" content="キーボード操作できない例｜しゃもきっとのエンジニアブログ" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content={SITE_URL} />
	<meta
		property="og:image"
		content={`${OG_IMAGE_URL}/?message=${encodeURIComponent('キーボード操作できない例')}`}
	/>
	<meta
		property="og:title"
		content="キーボード操作できない例｜ここから始めようWebアクセシビリティ｜しゃもきっとブログ"
	/>
	<meta
		property="og:description"
		content="キーボード操作できない例｜しゃもきっとのエンジニアブログ"
	/>
	<link rel="canonical" href={SITE_URL} />
</svelte:head>
<div class="main">
	<div class="h-8 md:h-14 lg:h-28" />
	<div class="grid gap-10 container">
		<h1 class="text-xxl">キーボード操作できない例</h1>
		<div class="link grid gap-4">
			<h2 class="text-xl">リンク</h2>
			TOPページは<a class="underline hover:no-underline" on:click={() => (window.location = '/')}
				>こちら</a
			>
		</div>
		<div class="button grid gap-4">
			<h2 class="text-xl">ボタン</h2>
			<div class="flex">
				<div
					class="inline-flex px-4 bg-primary-500 text-surface-100 rounded-full"
					on:click={() => count++}
				>
					+1
				</div>
			</div>
			<p>
				{count === 0 ? 'クリックするとメッセージが表示されます！' : `${count}回クリックしました！`}
			</p>
		</div>
		<div class="accordion grid gap-4">
			<h2 class="text-xl">アコーディオン</h2>
			<div class="font-bold" on:click={() => (accordionOpen = !accordionOpen)}>
				このページについて<span aria-hidden="true">{accordionOpen ? '▲' : '▼'}</span>
			</div>
			<div class="grid {accordionOpen ? 'open' : 'close'}">
				<div class="overflow-hidden">
					このページ内のコンテンツは、キーボードで操作できないようにわざと悪い実装やマークアップをしているページです。<br />絶対に真似しないでください。
				</div>
			</div>
		</div>
		<div class="tabcontents grid gap-3 grid gap-4">
			<h2 class="text-xl">動物</h2>
			<div class="tablist flex">
				<div
					class="tab p-2{activeTab === 1 ? ' bg-primary-500 text-surface-100' : ''}"
					on:click={() => (activeTab = 1)}
				>
					哺乳類
				</div>
				<div
					class="tab p-2{activeTab === 2 ? ' bg-primary-500 text-surface-100' : ''}"
					on:click={() => (activeTab = 2)}
				>
					魚類
				</div>
				<div
					class="tab p-2{activeTab === 3 ? ' bg-primary-500 text-surface-100' : ''}"
					on:click={() => (activeTab = 3)}
				>
					鳥類
				</div>
			</div>
			<div class="tabpanel{activeTab === 1 ? '' : ' hidden'}">猿、ゴリラ、一般人</div>
			<div class="tabpanel{activeTab === 2 ? '' : ' hidden'}">たい焼き</div>
			<div class="tabpanel{activeTab === 3 ? '' : ' hidden'}">ペンギン</div>
		</div>
	</div>
	<div class="h-8 md:h-14 lg:h-28" />
</div>

<style>
	.open {
		grid-template-rows: 1fr;
	}
	.close {
		grid-template-rows: 0fr;
	}
</style>
