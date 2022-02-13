import { Head, Html, Main, NextScript } from 'next/document'
const MyDocument = () => {
	return (
		<Html prefix="og: http://ogp.me/ns#" lang="ja">
			<Head />
			<body className="pt-14 md:pt-24 lg:pt-32 font-sans text-base md:text-lg leading-loose font-medium tracking-widest">
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}

export default MyDocument
