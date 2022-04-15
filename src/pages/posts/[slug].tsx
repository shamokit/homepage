import { GetServerSidePropsContext } from 'next'

import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import { Container } from '@/components/ui/layout/Container'
import { PostBody } from '@/components/ui/content/AppContentBody'
import { Meta } from '@/components/seo/meta'
import { LayoutBase } from '@/components/layouts/LayoutBase'
import { getPostBySlug, getAllPosts } from '@/lib/api'
import mdToHtml from '@/lib/markdownToHtml'
import { TypePost } from '@/components/model/posts/Post'
import { AppHeader01 } from '@/components/ui/head/AppHeader01'
type TypeProps = {
	post: TypePost
}
import { BLOG_DOMAIN } from 'config/constants'

const Post = ({ post }: TypeProps) => {
	const router = useRouter()
	if (!router.isFallback && !post?.slug) {
		return <ErrorPage statusCode={404} />
	}
	const title = `${post.title} | Posts`
	const description = `${post.description}`
	const url = `/posts/${post.slug}/`
	const datePublished = `${post.date}`
	const dateModified = `${post.dateModified}` || `${post.date}`
	const breadcrumb = [
		{
			name: 'TOP',
			url: `${BLOG_DOMAIN}/`,
		},
		{
			name: 'Posts',
			url: `${BLOG_DOMAIN}/posts`,
		},
		{
			name: post.title,
			url: `${BLOG_DOMAIN}${url}`,
		},
	]
	return (
		<>
			<Meta
				pageTitle={title}
				pageDescription={description}
				pageUrl={url}
				breadcrumb={breadcrumb}
				isSingle={true}
				datePublished={datePublished}
				dateModified={dateModified}
			/>
			<LayoutBase breadcrumb={breadcrumb}>
				<Container>
					{
						<article>
							<AppHeader01 post={post} dir={'posts'} className="mb-12" />
							<PostBody content={post.content} />
						</article>
					}
				</Container>
			</LayoutBase>
		</>
	)
}

export default Post

type PathParams = {
	slug: string
}

export async function getStaticProps({ params }: GetServerSidePropsContext<PathParams>) {
	const slug = params?.slug!
	const post = getPostBySlug(slug, [
		'title',
		'description',
		'date',
		'dateModified',
		'slug',
		'tags',
		'category',
		'content',
	])
	const postContent = post['content'] as string
	const content = mdToHtml(postContent! || '')

	return {
		props: {
			post: {
				...post,
				content,
			},
		},
	}
}

export async function getStaticPaths() {
	const posts = getAllPosts(['slug', 'category'], 'posts')

	return {
		paths: posts.map((post) => {
			return {
				params: {
					slug: post['slug']!,
				},
			}
		}),
		fallback: false,
	}
}
