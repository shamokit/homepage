import { AppProps } from 'next/app'
import type { ReportHandler } from 'web-vitals'
import 'modern-css-reset/dist/reset.min.css'
import '../styles/globals.css';
import Head from 'next/head';
import { BLOG_NAME } from '@/lib/constants'
/**
	Next.js-hydration: ページのハイドレーションが開始から終了するまでにかかる時間(ミリ秒)
	Next.js-route-change-to-render: ルーティング後、ページがレンダリングを開始するのにかかる時間(ミリ秒)
	Next.js-render: ルーティング後、ページのレンダリングが完了するまでにかかる時間(ミリ秒)
 */
export const reportWebVitals = (metric: ReportHandler) => {
	console.log(metric)
}

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width,initial-scale=1.0" />
        <meta property="og:BLOG_name" content={BLOG_NAME} />
        <meta property="og:type" content="website" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Fira+Code&family=Zen+Kaku+Gothic+New:wght@400;500;700&display=swap"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link rel="icon" href="/favicon/favicon.svg" type="image/svg+xml" />
        <meta name="theme-color" content="#1b1e32" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}
export default MyApp
