import Head from 'next/head'
import { BLOG_NAME, BLOG_DESCRIPTION, DEFAULT_OGP_IMAGE } from '@/lib/constants'
type TypeMeta = {
  pageTitle: string
  pageDescription: string
  pageUrl?: string
  pageImg?: string
}
const Meta = ({ pageTitle, pageDescription, pageUrl, pageImg }: TypeMeta) => {
  const defaultTitle = BLOG_NAME
  const defaultDescription = BLOG_DESCRIPTION

  const title = pageTitle ? `${pageTitle} | ${defaultTitle}` : defaultTitle
  const description = pageDescription ? pageDescription : defaultDescription
  const url = pageUrl
  const imgUrl = pageImg ? pageImg : DEFAULT_OGP_IMAGE
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />

      <meta property="og:description" content={description} />
      <meta property="og:image" content={imgUrl} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@shamokit_11" />
      <link rel="canonical" href={url} />
    </Head>
  )
}

export default Meta
