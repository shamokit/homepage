<script lang="ts">
	import { SITE_URL, OG_IMAGE_URL } from '$lib/const';
	import ico from '$lib/assets/icon.png';
</script>

<svelte:head>
	<title>figureタグの読み上げ例｜ここから始めようWebアクセシビリティ｜しゃもきっとブログ</title>
	<meta name="description" content="figureタグの読み上げ例｜しゃもきっとのエンジニアブログ" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content={`${SITE_URL}/examples/a11y/figure`} />
	<meta
		property="og:image"
		content={`${OG_IMAGE_URL}/?message=${encodeURIComponent('figureタグの読み上げ例')}`}
	/>
	<meta
		property="og:title"
		content="figureタグの読み上げ例｜ここから始めようWebアクセシビリティ｜しゃもきっとブログ"
	/>
	<meta
		property="og:description"
		content="figureタグの読み上げ例｜しゃもきっとのエンジニアブログ"
	/>
	<link rel="canonical" href={`${SITE_URL}/examples/a11y/figure`} />
</svelte:head>
<main>
	<div class="h-8 md:h-14 lg:h-28" />
	<div class="grid gap-10 container">
		<h1 class="text-xxl">figureタグの読み上げ例</h1>
		<section class="grid gap-4">
			<h2 class="text-xl">altが空</h2>
			<table>
				<thead>
					<tr>
						<th></th>
						<th>1. figcaptionなし</th>
						<th>2. figcaptionなし<br />+pタグ</th>
						<th>3. figcaptionあり</th>
						<th>4. figcaptionあり<br />+pタグ</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<th>要素</th>
						<td>
							<a href="/">
								<figure>
									<img src={ico} alt="" />
								</figure>
							</a>
						</td>
						<td>
							<a href="/">
								<figure>
									<img src={ico} alt="" />
								</figure>
								<p>pタグテキスト</p>
							</a>
						</td>
						<td>
							<a href="/">
								<figure>
									<img src={ico} alt="" />
									<figcaption>figcaptionタグテキスト</figcaption>
								</figure>
							</a>
						</td>
						<td>
							<a href="/">
								<figure>
									<img src={ico} alt="" />
									<figcaption>figcaptionタグテキスト</figcaption>
								</figure>
								<p>pタグテキスト</p>
							</a>
						</td>
					</tr>
					<tr>
						<th>コード</th>
						<td>
<pre><code>	&lt;a href="/"&gt;
		&lt;figure&gt;
			&lt;img src={ico} alt="" /&gt;
		&lt;/figure&gt;
	&lt;/a&gt;
</code></pre>
						</td>
						<td>
<pre><code>	&lt;a href="/"&gt;
		&lt;figure&gt;
			&lt;img src={ico} alt="" /&gt;
		&lt;/figure&gt;
		&lt;p&gt;pタグテキスト&lt;/p&gt;
	&lt;/a&gt;
</code></pre>
						</td>
						<td>
<pre><code>	&lt;a href="/"&gt;
		&lt;figure&gt;
			&lt;img src={ico} alt="" /&gt;
			&lt;figcaption&gt;figcaptionタグテキスト&lt;/figcaption&gt;
		&lt;/figure&gt;
	&lt;/a&gt;
</code></pre>
						</td>
						<td>
<pre><code>	&lt;a href="/"&gt;
		&lt;figure&gt;
			&lt;img src={ico} alt="" /&gt;
			&lt;figcaption&gt;figcaptionタグテキスト&lt;/figcaption&gt;
		&lt;/figure&gt;
		&lt;p&gt;pタグテキスト&lt;/p&gt;
	&lt;/a&gt;
</code></pre>
						</td>
					</tr>
					<tr>
						<th>読み上げ</th>
						<td>
							<p>何も読み上げられない</p>
						</td>
						<td>
							<p>pタグテキスト</p>
						</td>
						<td>
							<p>figcaptionタグテキスト</p>
						</td>
						<td>
							<p>pタグテキスト</p>
						</td>
					</tr>
				</tbody>
			</table>
		</section>
		<section class="grid gap-4">
			<h2 class="text-xl">altあり</h2>
			<table>
				<thead>
					<tr>
						<th></th>
						<th>1. figcaptionなし</th>
						<th>2. figcaptionなし<br />+pタグ</th>
						<th>3. figcaptionあり</th>
						<th>4. figcaptionあり<br />+pタグ</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<th>要素</th>
						<td>
							<a href="/">
								<figure>
									<img src={ico} alt="altテキスト" />
								</figure>
							</a>
						</td>
						<td>
							<a href="/">
								<figure>
									<img src={ico} alt="altテキスト" />
								</figure>
								<p>pタグテキスト</p>
							</a>
						</td>
						<td>
							<a href="/">
								<figure>
									<img src={ico} alt="altテキスト" />
									<figcaption>figcaptionタグテキスト</figcaption>
								</figure>
							</a>
						</td>
						<td>
							<a href="/">
								<figure>
									<img src={ico} alt="altテキスト" />
									<figcaption>figcaptionタグテキスト</figcaption>
								</figure>
								<p>pタグテキスト</p>
							</a>
						</td>
					</tr>
					<tr>
						<th>コード</th>
						<td>
<pre><code>	&lt;a href="/"&gt;
		&lt;figure&gt;
			&lt;img src={ico} alt="altテキスト" /&gt;
		&lt;/figure&gt;
	&lt;/a&gt;
</code></pre>
						</td>
						<td>
<pre><code>	&lt;a href="/"&gt;
		&lt;figure&gt;
			&lt;img src={ico} alt="altテキスト" /&gt;
		&lt;/figure&gt;
		&lt;p&gt;pタグテキスト&lt;/p&gt;
	&lt;/a&gt;
</code></pre>
						</td>
						<td>
<pre><code>	&lt;a href="/"&gt;
		&lt;figure&gt;
			&lt;img src={ico} alt="altテキスト" /&gt;
			&lt;figcaption&gt;figcaptionタグテキスト&lt;/figcaption&gt;
		&lt;/figure&gt;
	&lt;/a&gt;
</code></pre>
						</td>
						<td>
<pre><code>	&lt;a href="/"&gt;
		&lt;figure&gt;
			&lt;img src={ico} alt="altテキスト" /&gt;
			&lt;figcaption&gt;figcaptionタグテキスト&lt;/figcaption&gt;
		&lt;/figure&gt;
		&lt;p&gt;pタグテキスト&lt;/p&gt;
	&lt;/a&gt;
</code></pre>
						</td>
					</tr>
					<tr>
						<th>読み上げ</th>
						<td>
							<p>altテキスト</p>
						</td>
						<td>
							<p>pタグテキスト</p>
						</td>
						<td>
							<p>altテキスト figcaptionタグテキスト</p>
						</td>
						<td>
							<p>pタグテキスト</p>
						</td>
					</tr>
				</tbody>
			</table>
		</section>
	</div>
	<div class="h-8 md:h-14 lg:h-28" />
</main>
<style>
	table {
		table-layout: fixed;
		width: 100%;
		background: #fff;
	}
	th, td {
		width: 20%;
		padding: 10px;
		border: 1px solid;
		line-height: 1.5;
	}
	td img {
		border: 1px solid;
		width: 30%;
		margin-bottom: 10px;
	}
	td p,
	td figcaption {
		font-size: 0.8rem;
	}
	pre {
		overflow: auto;
		display: block;
		background: #000;
		color: #fff;
		padding: 10px 0;
		border-radius: 4px;
	}
	code {
		font-size: 0.8rem;
	}
</style>
