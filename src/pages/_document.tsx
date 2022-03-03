import { Head, Html, Main, NextScript } from 'next/document'
const MyDocument = () => {
	return (
		<Html prefix="og: http://ogp.me/ns#" lang="ja">
			<Head />
			<body className="font-sans text-base md:text-lg leading-loose font-medium tracking-widest" itemScope itemType="http://schema.org/WebPage">
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}

export default MyDocument
