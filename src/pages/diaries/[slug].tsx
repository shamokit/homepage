import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import { Container } from '@/components/layout/Container'
import { Meta } from '@/components/seo/meta'
import { LayoutBase } from '@/components/layouts/LayoutBase'
import { TypeDiary } from '@/types/Diary'
import mdToHtml from '@/lib/markdownToHtml'
import style from '@/styles/markdown-styles.module.css'
import 'zenn-content-css'
import classNames from 'classnames'

import { PostHeader } from '@/components/post/header'
type TypeProps = {
	post: TypeDiary
}
import { BLOG_DOMAIN } from '@/lib/constants'

const Post = ({ post }: TypeProps) => {
	const router = useRouter()
	if (!router.isFallback && !post?.slug) {
		return <ErrorPage statusCode={404} />
	}
	const title = `${post.title}`
	const url = `/diaries/${post.slug}/`
	const breadcrumb = [
		{
			name: 'TOP',
			url: "/",
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
			<Meta pageTitle={title} pageDescription={''} pageUrl={`${url}`} isSingle={true} datePublished={post._sys.createdAt} dateModified={post._sys.updatedAt} />
			<LayoutBase breadcrumb={breadcrumb}>
				<Container>
					{
						<article>
							<PostHeader post={post} dir={'diaries'} className="mb-12" />
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

import { createClient } from 'newt-client-js'
const client = createClient({
	spaceUid: 'shamokit',
	token: 'pvFwQWwMw8VZi2lwuG5can3yhaLKW23nssvOLk6NEyc',
	apiType: 'cdn',
})
type Params = {
	params: {
		slug: string
	}
}

export async function getStaticProps({ params }: Params) {
	const post = await client
		.getContents<TypeDiary>({
			appUid: 'diary',
			modelUid: 'article',
			query: {
				depth: 2,
				limit: 1,
				slug: params.slug,
				body: {
					fmt: 'text',
				},
			},
		})
		.then(async (content) => {
			let data = content.items[0]
			const postContent = await mdToHtml(data?.body! || '')

			return { ...data, content: postContent } || null
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
	const allPosts = await client
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
