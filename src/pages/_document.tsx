import { Head, Html, Main, NextScript } from 'next/document'
const MyDocument = () => {
  return (
    <Html prefix="og: http://ogp.me/ns#" lang='ja'>
      <Head />
      <body className="pt-20 font-sans text-sm md:text-base">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default MyDocument
