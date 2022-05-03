import { AppProps } from 'next/app'
// import type { ReportHandler } from 'web-vitals'
import 'modern-css-reset/dist/reset.min.css'
import '../styles/globals.css'
import Head from 'next/head'
import { BLOG_NAME } from 'config/constants'
/**
	Next.js-hydration: ページのハイドレーションが開始から終了するまでにかかる時間(ミリ秒)
	Next.js-route-change-to-render: ルーティング後、ページがレンダリングを開始するのにかかる時間(ミリ秒)
	Next.js-render: ルーティング後、ページのレンダリングが完了するまでにかかる時間(ミリ秒)
 */
// export const reportWebVitals = (metric: ReportHandler) => {
// 	console.log(metric)
// }
import { useEffect } from "react";
const MyApp = ({ Component, pageProps }: AppProps) => {
	useEffect(() => {
		import("zenn-embed-elements");
	}, []);
	return (
		<>
			<Head>
				<meta charSet="UTF-8" />
				<meta name="viewport" content="width=device-width,initial-scale=1.0, viewport-fit=cover" />
				<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
				<meta property="og:locale" content="ja_JP" />
				<meta name="twitter:card" content="summary" />
				<meta name="twitter:site" content="@shamokit_y2323" />
				<meta name="twitter:creator" content="@shamokit_y2323" />
				<meta property="og:site_name" content={BLOG_NAME} />
				<link rel="preconnect" href="https://fonts.gstatic.com" />
				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href="/favicon/apple-touch-icon.png"
				/>
				<link
					rel="icon"
					href="/favicon/favicon.svg"
					sizes="any"
					type="image/svg+xml"
				/>
				<link rel="icon" href="/favicon/favicon.png" />
				<link rel="icon" href="/favicon/favicon.ico" />
				<meta name="theme-color" content="#1b1e32" />
			</Head>
			<Component {...pageProps} />
		</>
	)
}
export default MyApp
