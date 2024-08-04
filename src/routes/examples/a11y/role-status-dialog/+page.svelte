<script lang="ts">
	import Breadcrumbs from '$lib/components/layouts/breadcrumbs/index.svelte';
	import { SITE_URL, OG_IMAGE_URL } from '$lib/const';
	let counter1 = 0;
	const addCounter1 = () => (counter1 = counter1 + 1);

	let dialog: HTMLDialogElement | null = null;
	let counter2 = 0;
	const addCounter2 = () => (counter2 = counter2 + 1);

	let dialog2: HTMLDialogElement | null = null;
	let counter3 = 0;
	const addCounter3 = () => (counter3 = counter3 + 1);
</script>

<svelte:head>
	<title>role="status"とdialog｜ここから始めようWebアクセシビリティ｜しゃもきっとブログ</title>
	<meta
		name="description"
		content="role=&quot;status&quot;とdialog｜しゃもきっとのエンジニアブログ"
	/>
	<meta property="og:type" content="website" />
	<meta property="og:url" content={`${SITE_URL}/examples/a11y/role-status-dialog`} />
	<meta
		property="og:image"
		content={`${OG_IMAGE_URL}/?message=${encodeURIComponent('role="status"とdialog')}`}
	/>
	<meta
		property="og:title"
		content="role=&quot;status&quot;とdialog｜ここから始めようWebアクセシビリティ｜しゃもきっとブログ"
	/>
	<meta
		property="og:description"
		content="role=&quot;status&quot;とdialog｜しゃもきっとのエンジニアブログ"
	/>
	<link rel="canonical" href={`${SITE_URL}/examples/a11y/more-good`} />
</svelte:head>
<Breadcrumbs
	breadcrumbs={[
		{
			name: 'role="status"とdialog',
			slug: '/examples/a11y/role-status-dialog'
		}
	]}
/>
<main>
	<div class="h-8 md:h-14 lg:h-28"></div>
	<div class="grid gap-10 container">
		<h1 class="text-xxl">role=&quot;status&quot;とdialog</h1>
		<section class="grid gap-4">
			<h2 class="text-xl">スクリーンリーダーにカウントが通知される例</h2>
			<p role="status" class="sr-only">カウント {counter1}</p>
			<div>
				<p>カウント {counter1}</p>
				<button
					class="block py-2 px-4 bg-primary-500 text-surface-100 rounded-lg"
					type="button"
					on:click={addCounter1}>カウント+1</button
				>
			</div>
		</section>
		<section class="grid gap-4">
			<h2 class="text-xl">
				スクリーンリーダーにカウントが通知されない例(dialogの外にrole=&quot;status&quot;)
			</h2>
			<div>
				<button
					class="block py-2 px-4 bg-primary-500 text-surface-100 rounded-lg"
					type="button"
					on:click={() => dialog?.showModal()}>ダイアログを立ち上げる</button
				>
			</div>
			<p role="status" class="sr-only">カウント {counter2}</p>
			<dialog bind:this={dialog}>
				<div class="grid gap-4 py-8 px-6 rounded-lg">
					<p>カウント {counter2}</p>
					<button
						class="block py-2 px-4 bg-primary-500 text-surface-100 rounded-lg"
						type="button"
						on:click={addCounter2}>カウント+1</button
					>
					<button
						class="block py-2 px-4 bg-primary-500 text-surface-100 rounded-lg"
						type="button"
						on:click={() => dialog?.close()}>dialogを閉じる</button
					>
				</div>
			</dialog>
		</section>
		<section class="grid gap-4">
			<h2 class="text-xl">
				スクリーンリーダーにカウントが通知される例(dialogの中にrole=&quot;status&quot;)
			</h2>
			<div>
				<button
					class="block py-2 px-4 bg-primary-500 text-surface-100 rounded-lg"
					type="button"
					on:click={() => dialog2?.showModal()}>ダイアログを立ち上げる</button
				>
			</div>
			<dialog bind:this={dialog2}>
				<p role="status" class="sr-only">カウント {counter3}</p>
				<div class="grid gap-4 py-8 px-6 rounded-lg">
					<p>カウント {counter3}</p>
					<button
						class="block py-2 px-4 bg-primary-500 text-surface-100 rounded-lg"
						type="button"
						on:click={addCounter3}>カウント+1</button
					>
					<button
						class="block py-2 px-4 bg-primary-500 text-surface-100 rounded-lg"
						type="button"
						on:click={() => dialog2?.close()}>dialogを閉じる</button
					>
				</div>
			</dialog>
		</section>
	</div>
	<div class="h-8 md:h-14 lg:h-28"></div>
</main>
