import { Head, Html, Main, NextScript } from 'next/document'
const MyDocument = () => {
	return (
		<Html prefix="og: http://ogp.me/ns#" lang="ja">
			<Head />
			<body className="font-sans text-base md:text-lg lg:text-xl leading-loose font-medium tracking-widest">
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}

export default MyDocument
