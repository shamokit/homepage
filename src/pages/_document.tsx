import { Head, Html, Main, NextScript } from 'next/document'
const MyDocument = () => {
	return (
		<Html prefix="og: http://ogp.me/ns#" lang="ja">
			<Head>
				<link
					rel="stylesheet"
					href="https://fonts.googleapis.com/css2?family=BIZ+UDGothic:wght@400;700&family=Fira+Code&display=swap"
				/>
			</Head>
			<body
				className="theme-engineer setting font-sans text-base md:text-lg leading-loose font-normal tracking-widest bg-white text-base-color scroll-smooth"
				itemScope
				itemType="http://schema.org/WebPage"
			>
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}

export default MyDocument
