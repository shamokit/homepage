<script lang="ts">
	import { SITE_URL, OG_IMAGE_URL } from '$lib/const';
</script>

<svelte:head>
	<title>フォームコントロール｜Webアクセシビリティ｜しゃもきっとブログ</title>
	<meta
		name="description"
		content="フォームコントロール｜Webアクセシビリティ｜しゃもきっとのエンジニアブログ"
	/>
	<meta property="og:type" content="website" />
	<meta property="og:url" content={`${SITE_URL}/examples/a11y/form`} />
	<meta
		property="og:image"
		content={`${OG_IMAGE_URL}/?message=${encodeURIComponent(
			'フォームコントロール｜Webアクセシビリティ'
		)}`}
	/>
	<meta
		property="og:title"
		content="フォームコントロール｜Webアクセシビリティ｜しゃもきっとブログ"
	/>
	<meta
		property="og:description"
		content="フォームコントロール｜Webアクセシビリティ｜しゃもきっとのエンジニアブログ"
	/>
	<link rel="canonical" href={`${SITE_URL}/examples/a11y/form`} />
</svelte:head>
<main>
	<div class="h-8 md:h-14 lg:h-28"></div>
	<article class="grid gap-10 container">
		<h1 class="text-xxl" id="form-name">フォームコントロール</h1>
		<form class="grid gap-10" aria-labelledby="form-name">
			<section class="grid gap-6 p-6 md:p-10 bg-surface-700">
				<h2 class="text-xl">プレースホルダー</h2>
				<section class="grid gap-3 p-4 md:p-6 bg-surface-300">
					<h3 class="text-lg">悪い例</h3>
					<div class="grid md:grid-cols-2 gap-4">
						<input type="text" placeholder="山田" class="px-4 py-2" />
						<input type="text" placeholder="太郎" class="px-4 py-2" />
					</div>
				</section>
				<section class="grid gap-3 p-4 md:p-6 bg-surface-300">
					<h3 class="text-lg">良い例</h3>
					<div class="flex gap-4">
						<div class="md:flex items-center gap-6">
							<label for="name" class="text-md leading-snug"
								>名前<br class="hidden md:block" /><span class="text-xs">(例: 山田 太郎)</span
								></label
							>
							<input type="text" name="name" id="name" class="block px-4 py-2" />
						</div>
					</div>
				</section>
			</section>
			<section class="grid gap-6 p-6 md:p-10 bg-surface-700">
				<h2 class="text-xl">チェックボックス</h2>
				<section class="grid gap-3 p-4 md:p-6 bg-surface-300">
					<h3 class="text-lg">悪い例</h3>
					<div class="grid gap-2 bg-surface-500 p-4 md:p-6">
						<h4 class="text-md leading-snug font-bold">好きな動物</h4>
						<ul class="text-sm">
							<li>
								<label class="flex items-center gap-2"
									><input type="checkbox" name="animal" value="ねこ" />ねこ</label
								>
							</li>
							<li>
								<label class="flex items-center gap-2"
									><input type="checkbox" name="animal" value="いぬ" />いぬ</label
								>
							</li>
							<li>
								<label class="flex items-center gap-2"
									><input type="checkbox" name="animal" value="フェレット" />フェレット</label
								>
							</li>
							<li>
								<label class="flex items-center gap-2"
									><input type="checkbox" name="animal" value="へび" />へび</label
								>
							</li>
						</ul>
					</div>
				</section>
				<section class="grid gap-3 p-4 md:p-6 bg-surface-300">
					<h3 class="text-lg">良い例</h3>
					<fieldset class="bg-surface-500 p-4 md:p-6">
						<legend id="animal-head" class="text-md leading-snug font-bold">好きな動物</legend>
						<ul class="text-sm" role="group" aria-labelledby="animal-head">
							<li>
								<label class="flex items-center gap-2"
									><input type="checkbox" name="animal2" value="ねこ" />ねこ</label
								>
							</li>
							<li>
								<label class="flex items-center gap-2"
									><input type="checkbox" name="animal2" value="いぬ" />いぬ</label
								>
							</li>
							<li>
								<label class="flex items-center gap-2"
									><input type="checkbox" name="animal2" value="フェレット" />フェレット</label
								>
							</li>
							<li>
								<label class="flex items-center gap-2"
									><input type="checkbox" name="animal2" value="へび" />へび</label
								>
							</li>
						</ul>
					</fieldset>
				</section>
			</section>
			<section class="grid gap-6 p-6 md:p-10 bg-surface-700">
				<h2 class="text-xl">ラジオボタン</h2>
				<section class="grid gap-3 p-4 md:p-6 bg-surface-300">
					<h3 class="text-lg">悪い例</h3>
					<div class="grid gap-2 bg-surface-500 p-4 md:p-6">
						<h4 class="text-md leading-snug font-bold">今日の夕飯</h4>
						<ul class="text-sm">
							<li>
								<label class="flex items-center gap-2"
									><input type="radio" name="dinner" value="ラーメン" />ラーメン</label
								>
							</li>
							<li>
								<label class="flex items-center gap-2"
									><input type="radio" name="dinner" value="パスタ" />パスタ</label
								>
							</li>
							<li>
								<label class="flex items-center gap-2"
									><input type="radio" name="dinner" value="うどん" />うどん</label
								>
							</li>
							<li>
								<label class="flex items-center gap-2"
									><input type="radio" name="dinner" value="そば" />そば</label
								>
							</li>
						</ul>
					</div>
				</section>
				<section class="grid gap-3 p-4 md:p-6 bg-surface-300">
					<h3 class="text-lg">良い例</h3>
					<fieldset class="bg-surface-500 p-4 md:p-6">
						<legend id="dinner-head" class="text-md leading-snug font-bold">今日の夕飯</legend>
						<ul class="text-sm" role="radiogroup" aria-labelledby="dinner-head">
							<li>
								<label class="flex items-center gap-2"
									><input type="radio" name="dinner2" value="ラーメン" />ラーメン</label
								>
							</li>
							<li>
								<label class="flex items-center gap-2"
									><input type="radio" name="dinner2" value="パスタ" />パスタ</label
								>
							</li>
							<li>
								<label class="flex items-center gap-2"
									><input type="radio" name="dinner2" value="うどん" />うどん</label
								>
							</li>
							<li>
								<label class="flex items-center gap-2"
									><input type="radio" name="dinner2" value="そば" />そば</label
								>
							</li>
						</ul>
					</fieldset>
				</section>
			</section>
			<section class="grid gap-6 p-6 md:p-10 bg-surface-700">
				<h2 class="text-xl">必須</h2>
				<section class="grid gap-3 p-4 md:p-6 bg-surface-300">
					<h3 class="text-lg">悪い例</h3>
					<div class="flex gap-4">
						<div class="md:flex items-center gap-6">
							<label for="pref" class="text-md leading-snug whitespace-nowrap"
								>都道府県<br class="hidden md:block" /><span class="text-xs">※</span></label
							>
							<input type="text" name="pref" id="pref" class="block px-4 py-2 flex-1" />
						</div>
					</div>
				</section>
				<section class="grid gap-3 p-4 md:p-6 bg-surface-300">
					<h3 class="text-lg">良い例</h3>
					<div class="grid gap-4">
						<div class="md:flex items-center gap-6">
							<label for="pref1" class="text-md leading-snug whitespace-nowrap"
								>都道府県<br class="hidden md:block" /><span class="text-xs">(必須)</span></label
							>
							<input type="text" name="pref1" id="pref1" class="block px-4 py-2 flex-1" />
						</div>
						<aside class="text-xs">
							<table>
								<tbody>
									<tr>
										<th scope="row" class="whitespace-nowrap align-top pr-2"
											>補足<span aria-hidden="true">:</span></th
										>
										<td
											>requiredやaria-requiredを追加でつけると、ラベル部分とrequired属性で、「必須」と2回読まれてしまいます。</td
										>
									</tr>
								</tbody>
							</table>
						</aside>
					</div>
				</section>
			</section>
			<section class="grid gap-6 p-6 md:p-10 bg-surface-700">
				<h2 class="text-xl">autocomplete</h2>
				<section class="grid gap-3 p-4 md:p-6 bg-surface-300">
					<h3 class="text-lg">悪い例</h3>
					<div class="grid gap-4">
						<div class="md:flex items-center gap-6">
							<label for="zipcode" class="text-md leading-snug"
								>郵便番号<br class="hidden md:block" /><span class="text-xs">(必須)</span></label
							>
							<input type="number" name="zipcode" id="zipcode" class="block px-4 py-2" />
						</div>
						<aside class="text-xs">
							<table>
								<tbody>
									<tr>
										<th scope="row" class="whitespace-nowrap align-top pr-2"
											>補足<span aria-hidden="true">:</span></th
										>
										<td
											>name属性にzipcodeを指定しているのでautocomplete属性なしでもサジェストされています。</td
										>
									</tr>
								</tbody>
							</table>
						</aside>
					</div>
				</section>
				<section class="grid gap-3 p-4 md:p-6 bg-surface-300">
					<h3 class="text-lg">良い例</h3>
					<div class="grid gap-4">
						<div class="md:flex items-center gap-6">
							<label for="zipcode1" class="text-md leading-snug"
								>郵便番号<br class="hidden md:block" /><span class="text-xs">(必須)</span></label
							>
							<input
								type="text"
								name="zipcode1"
								id="zipcode1"
								class="block px-4 py-2"
								inputmode="numeric"
								autocomplete="postal-code"
							/>
						</div>
						<aside class="text-xs">
							<table>
								<tbody>
									<tr>
										<th scope="row" class="whitespace-nowrap align-top pr-2"
											>補足<span aria-hidden="true">:</span></th
										>
										<td
											>name属性にzipcode1を指定しているので本来サジェストされませんが、<br
											/>autocompleteにpostal-codeを指定しているのでサジェストされています。</td
										>
									</tr>
								</tbody>
							</table>
						</aside>
					</div>
				</section>
			</section>
		</form>
	</article>
	<div class="h-8 md:h-14 lg:h-28"></div>
</main>
