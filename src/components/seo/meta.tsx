import Head from 'next/head'
import {
	BLOG_DOMAIN,
	BLOG_NAME,
	BLOG_DESCRIPTION,
	DEFAULT_OGP_IMAGE,
} from 'config/constants'
import { TypeBreadcrumb } from '@/components/ui/layout/Breadcrumb'
type TypeMeta = {
	isSingle?: boolean
	pageTitle: string
	pageDescription: string
	pageUrl?: string
	pageImg?: string
	breadcrumb?: TypeBreadcrumb[]
	datePublished?: string
	dateModified?: string
}
export const Meta = ({
	isSingle = false,
	pageTitle,
	pageDescription,
	pageUrl,
	pageImg,
	breadcrumb,
	datePublished,
	dateModified,
}: TypeMeta) => {
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
			'@type': 'ListItem',
			position: index + 1,
			item: {
				'@id': item.url,
				'@type': 'WebPage',
				name: item.name,
			},
		}
	})
	const jsonLd = JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		name: 'パンくずリスト',
		itemListElement: jsonLdList,
	})
	// TODO:変数名変更
	let blogPosting = {
		'@context': 'https://schema.org',
		'@type': 'BlogPosting',
		headline: `${pageTitle}`,
		image: [`${imgUrl}`],
		author: [
			{
				'@type': 'Person',
				name: 'Shamokit',
				url: `${BLOG_DOMAIN}/profile/`,
			},
		],
		datePublished: undefined as unknown,
		dateModified: undefined as unknown,
	}
	if (datePublished) {
		blogPosting.datePublished = datePublished
	}
	if (dateModified) {
		blogPosting.dateModified = dateModified
	}
	const blogPostingJsonLd = JSON.stringify(blogPosting)

	return (
		<Head>
			<title>{title}</title>
			<meta name="description" content={description} />
			<meta property="og:url" content={url} />
			<meta property="og:title" content={title} />
			<meta property="og:type" content={isSingle ? 'article' : 'website'} />
			<meta property="og:description" content={description} />
			<meta property="og:image" content={imgUrl} />

			<link rel="canonical" href={url} />
			{breadcrumb && breadcrumb.length > 0 && (
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: jsonLd }}
				></script>
			)}
			{isSingle && (
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: blogPostingJsonLd }}
				></script>
			)}
		</Head>
	)
}
