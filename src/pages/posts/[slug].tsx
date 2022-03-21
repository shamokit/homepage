import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import { Container } from '@/components/layout/Container'
import { PostBody } from '@/components/post/body'
import { Meta } from '@/components/seo/meta'
import { LayoutBase } from '@/components/layouts/LayoutBase'
import { getPostBySlug, getAllPosts } from '@/lib/api'
import mdToHtml from '@/lib/markdownToHtml'
import { TypePost } from '@/types/Post'
import { PostHeader } from '@/components/post/header'
type TypeProps = {
	post: TypePost
}
import { BLOG_DOMAIN } from '@/lib/constants'

const Post = ({ post }: TypeProps) => {

	const router = useRouter()
	if (!router.isFallback && !post?.slug) {
		return <ErrorPage statusCode={404} />
	}
	const title = `${post.title} | Posts`
	const description = `${post.description}`
	const url = `/posts/${post.slug}/`
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
		<LayoutBase breadcrumb={breadcrumb}>
			<Container>
				{
					<>
						<Meta
							pageTitle={title}
							pageDescription={description}
							pageUrl={url}
							breadcrumb={breadcrumb}
						/>
						<article>
							<PostHeader post={post} dir={'posts'} className="mb-12" />
							<PostBody content={post.content} />
						</article>
					</>
				}
			</Container>
		</LayoutBase>
	)
}

export default Post

type Params = {
	params: {
		slug: string
	}
}

export async function getStaticProps({ params }: Params) {
	const post = getPostBySlug(
		params.slug,
		['title', 'description', 'date', 'slug', 'tags', 'category', 'content']
	)
	const postContent = post['content'] as string
	const content = await mdToHtml(postContent! || '')

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
