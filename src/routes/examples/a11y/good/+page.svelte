<script lang="ts">
	import { SITE_URL, OG_IMAGE_URL } from '$lib/const';
	let count = 0;
	let accordionOpen = false;
	let accordion2Open = false;
	let activeTab = 1;
	const focusTab = (id: string) => {
		document.getElementById(id)?.focus();
	};
</script>

<svelte:head>
	<title
		>キーボード操作できない例の改善｜ここから始めようWebアクセシビリティ｜しゃもきっとブログ</title
	>
	<meta
		name="description"
		content="キーボード操作できない例の改善｜しゃもきっとのエンジニアブログ"
	/>
	<meta property="og:type" content="website" />
	<meta property="og:url" content={`${SITE_URL}/examples/a11y/good`} />
	<meta
		property="og:image"
		content={`${OG_IMAGE_URL}/?message=${encodeURIComponent('キーボード操作できない例の改善')}`}
	/>
	<meta
		property="og:title"
		content="キーボード操作できない例の改善｜ここから始めようWebアクセシビリティ｜しゃもきっとブログ"
	/>
	<meta
		property="og:description"
		content="キーボード操作できない例の改善｜しゃもきっとのエンジニアブログ"
	/>
	<link rel="canonical" href={`${SITE_URL}/examples/a11y/good`} />
</svelte:head>
<div class="main">
	<div class="h-8 md:h-14 lg:h-28" />
	<div class="grid gap-10 container">
		<h1 class="text-xxl">キーボード操作できない例の改善</h1>
		<div class="link grid gap-4">
			<h2 class="text-xl">リンク</h2>
			<p>TOPページは<a class="underline hover:no-underline" href="/">こちら</a></p>
		</div>
		<div class="button grid gap-4">
			<h2 class="text-xl">ボタン</h2>
			<div class="flex">
				<button
					type="button"
					class="inline-flex px-4 bg-primary-500 text-surface-100 rounded-full"
					on:click={() => count++}
				>
					+1
				</button>
			</div>
			<p>
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
				<button class="font-bold" on:click={() => (accordion2Open = !accordion2Open)}>
					buttonでの実装<span aria-hidden="true">{accordion2Open ? '▲' : '▼'}</span>
				</button>
				<div class="grid {accordion2Open ? 'open' : 'close'}">
					<div class="overflow-hidden">このページ内のコンテンツは、キーボードで操作できます！</div>
				</div>
			</div>
		</div>
		<div class="tabcontents grid gap-4">
			<h2 class="text-xl">動物</h2>
			<div class="tablist flex border-b border-primary-500" role="tablist">
				<button
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
			<div id="tabpanel-1" class="tabpanel" tabindex="0" hidden={activeTab === 1 ? false : true}>
				猿、ゴリラ、一般人
			</div>
			<div id="tabpanel-2" class="tabpanel" tabindex="0" hidden={activeTab === 2 ? false : true}>
				たい焼き
			</div>
			<div id="tabpanel-3" class="tabpanel" tabindex="0" hidden={activeTab === 3 ? false : true}>
				ペンギン
			</div>
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
