<script lang="ts">
	import { SITE_URL, OG_IMAGE_URL } from '$lib/const';
	import Icon from '$lib/components/svg/ico.svelte';

	let num1 = 0;
	let num2 = 0;
	let num3 = 0;
	let num4 = 0;
</script>

<svelte:head>
	<title>aria-labelの使い方には注意しよう｜しゃもブログ</title>
	<meta name="description" content="aria-labelの使い方には注意しよう｜しゃもブログ" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content={`${SITE_URL}/examples/a11y/aria-label`} />
	<meta
		property="og:image"
		content={`${OG_IMAGE_URL}/?message=${encodeURIComponent('aria-labelの使い方には注意しよう')}`}
	/>
	<meta property="og:title" content="aria-labelの使い方には注意しよう｜しゃもブログ" />
	<meta property="og:description" content="aria-labelの使い方には注意しよう｜しゃもブログ" />
	<link rel="canonical" href={`${SITE_URL}/examples/a11y/aria-label`} />
</svelte:head>
<div class="main">
	<div class="h-8 md:h-14 lg:h-28"></div>
	<div class="grid gap-10 container">
		<h1 class="text-xxl">aria-labelの使い方には注意しよう</h1>
		<section>
			<h2 class="text-xl mb-3">プレーンテキスト</h2>
			{num1}
			<button
				on:click={() => num1++}
				class="inline-flex items-center gap-2 bg-primary-500 text-surface-100 px-3 py-2 rounded-lg"
				type="button"
				><span class="inline-block w-5"><Icon name="add" /></span>カウントアップする</button
			>
		</section>
		<section>
			<h2 class="text-xl mb-3">プレーンテキストとaria-labelの内容が違う</h2>
			{num1}
			<button
				on:click={() => num1++}
				class="inline-flex items-center gap-2 bg-primary-500 text-surface-100 px-3 py-2 rounded-lg"
				type="button"
				aria-label="カウントアップする"
				><span class="inline-block w-5"><Icon name="add" /></span>カウントアップ</button
			>
		</section>
		<section>
			<h2 class="text-xl mb-3">title属性</h2>
			{num1}
			<button
				on:click={() => num1++}
				class="inline-flex items-center gap-2 bg-primary-500 text-surface-100 px-3 py-2 rounded-lg"
				type="button"
				title="カウントアップする"><span class="inline-block w-5"><Icon name="add" /></span></button
			>
		</section>
		<section>
			<h2 class="text-xl mb-3">aria-label属性</h2>
			{num2}
			<button
				on:click={() => num2++}
				class="inline-flex items-center gap-2 bg-primary-500 text-surface-100 px-3 py-2 rounded-lg"
				type="button"
				aria-label="カウントアップする"
				><span class="inline-block w-5"><Icon name="add" /></span></button
			>
		</section>
		<section>
			<h2 class="text-xl mb-3">aria-labelledby属性</h2>
			<div class="flex gap-2 items-center">
				<p id="labelledby">カウントアップする</p>
				{num3}
				<button
					on:click={() => num3++}
					class="inline-flex items-center gap-2 bg-primary-500 text-surface-100 px-3 py-2 rounded-lg"
					type="button"
					aria-labelledby="labelledby"
					><span class="inline-block w-5"><Icon name="add" /></span></button
				>
			</div>
		</section>
		<section>
			<h2 class="text-xl mb-3">visually-hidden</h2>
			{num4}
			<button
				on:click={() => num4++}
				class="inline-flex items-center gap-2 bg-primary-500 text-surface-100 px-3 py-2 rounded-lg"
				type="button"
				><span class="sr-only">カウントアップする</span><span class="inline-block w-5"
					><Icon name="add" /></span
				></button
			>
		</section>
	</div>
	<div class="h-8 md:h-14 lg:h-28"></div>
</div>
