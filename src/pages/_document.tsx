import { Head, Html, Main, NextScript } from 'next/document'
const MyDocument = () => {
	return (
		<Html prefix="og: http://ogp.me/ns#" lang="ja">
			<Head>
				<link
					rel="stylesheet"
					href="https://fonts.googleapis.com/css2?family=Fira+Code&family=Zen+Kaku+Gothic+New:wght@500;600;&display=swap"
				/>
			</Head>
			<body
				className="font-sans text-base md:text-lg lg:text-xl leading-loose font-medium tracking-wider bg-white"
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
