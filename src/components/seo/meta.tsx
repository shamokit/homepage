import Head from 'next/head'
import {
	BLOG_DOMAIN,
	BLOG_NAME,
	BLOG_DESCRIPTION,
	DEFAULT_OGP_IMAGE,
} from '@/lib/constants'
type Breadcrumb = {
	name: string
	url: string
}
type TypeMeta = {
	pageTitle: string
	pageDescription: string
	pageUrl?: string
	pageImg?: string
	breadcrumb?: Breadcrumb[]
}
export const Meta = ({ pageTitle, pageDescription, pageUrl, pageImg, breadcrumb }: TypeMeta) => {
	const defaultTitle = BLOG_NAME
	const defaultDescription = BLOG_DESCRIPTION

	const title = pageTitle ? `${pageTitle} | ${defaultTitle}` : defaultTitle
	const description = pageDescription ? pageDescription : defaultDescription
	const url = pageUrl ? BLOG_DOMAIN + pageUrl : BLOG_DOMAIN
	const imgUrl = pageImg
		? BLOG_DOMAIN + pageImg
		: BLOG_DOMAIN + DEFAULT_OGP_IMAGE
	let jsonLdList = breadcrumb?.map((item, index) => {
		return {
			"@type": "ListItem",
			"position": index+1,
			"item": {
				"@id": item.url,
				"name": item.name,
			}
		}
	})
	const jsonLd = JSON.stringify({
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		"name": "パンくずリスト",
		"itemListElement": jsonLdList
	})
	return (
		<Head>
			<title>{title}</title>
			<meta name="description" content={description} />
			<meta property="og:url" content={url} />
			<meta property="og:title" content={title} />

			<meta property="og:description" content={description} />
			<meta property="og:image" content={imgUrl} />
			<meta name="twitter:card" content="summary" />
			<meta name="twitter:site" content="@shamokit_y2323" />
			<link rel="canonical" href={url} />
			{(breadcrumb && breadcrumb.length > 0) &&
				<script type="application/ld+json" dangerouslySetInnerHTML={{__html: jsonLd}}></script>
			}
		</Head>
	)
}
