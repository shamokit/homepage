import { GetServerSidePropsContext } from 'next'

import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import { Container } from '@/components/ui/layout/Container'
import { Meta } from '@/components/seo/meta'
import { LayoutBase } from '@/components/layouts/LayoutBase'
import { TypeDiary } from '@/components/model/diaries/type'
import mdToHtml from '@/lib/markdownToHtml'
import style from '@/styles/markdown-styles.module.css'
import 'zenn-content-css'
import classNames from 'classnames'

import { AppHeader01 } from '@/components/ui/head/AppHeader01'
type TypeProps = {
	post: TypeDiary & { formatDate: string }
}
const Post = ({ post }: TypeProps) => {
	const router = useRouter()
	if (!router.isFallback && !post?.slug) {
		return <ErrorPage statusCode={404} />
	}
	const title = `${post.title}`
	const url = `/diaries/${post.slug}/`
	const date = `${post.date}/`

	const breadcrumb = [
		{
			name: 'TOP',
			url: '/',
		},
		{
			name: 'Diaries',
			url: `/diaries/`,
		},
		{
			name: `${title}`,
			url: `${url}`,
		},
	]
	return (
		<>
			<Meta
				noindex
				pageTitle={title}
				pageDescription={`${post.formatDate}の日記です。`}
				pageImg={`/assets/diary/ogp_${post.formatDate.replaceAll('-', '')}.png`}
				pageUrl={`${url}`}
				isSingle={true}
				datePublished={date}
			/>
			<LayoutBase breadcrumb={breadcrumb}>
				<Container>
					{
						<article>
							<AppHeader01 post={post} dir={'diaries'} className="mb-12" />
							<div
								className={classNames('znc', style['znc'])}
								dangerouslySetInnerHTML={{ __html: post.content }}
							/>
						</article>
					}
				</Container>
			</LayoutBase>
		</>
	)
}

export default Post

import { newtClient } from '@/lib/newt'
type PathParams = {
	slug: string
}
import { DateFormat } from '@/lib/date-format'
export async function getStaticProps({
	params,
}: GetServerSidePropsContext<PathParams>) {
	const slug = params?.slug!
	const post = await newtClient
		.getContents<TypeDiary>({
			appUid: 'diary',
			modelUid: 'article',
			query: {
				depth: 2,
				limit: 1,
				slug: slug,
				body: {
					fmt: 'text',
				},
			},
		})
		.then(async (content) => {
			let data = content.items[0]
			let dateText = ''
			const postContent = mdToHtml(data?.body! || '')
			if (data) {
				dateText = DateFormat({ dateString: data.date })
			}

			return { ...data, content: postContent, formatDate: dateText } || null
		})
		.catch((err) => console.log(err))
	return {
		props: {
			post: {
				...post,
			},
		},
	}
}

export async function getStaticPaths() {
	const allPosts = await newtClient
		.getContents<TypeDiary>({
			appUid: 'diary',
			modelUid: 'article',
		})
		.then((contents) => {
			return contents.items
		})
		.catch((err) => console.log(err))
	return {
		paths: allPosts?.map((post) => {
			return {
				params: {
					slug: post.slug,
				},
			}
		}),
		fallback: false,
	}
}
