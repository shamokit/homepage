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

const Post = ({ post }: TypeProps) => {
	const router = useRouter()
	if (!router.isFallback && !post?.slug) {
		return <ErrorPage statusCode={404} />
	}
	const title = `${post.title} | Cats`
	const description = `${post.description}`
	const url = `/cats/${post.slug}/`
	return (
		<LayoutBase>
			<Container>
				{
					<>
						<Meta
							pageTitle={title}
							pageDescription={description}
							pageUrl={url}
						/>
						<article>
							<PostHeader post={post} dir={'cats'} className="mb-12" />
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
		['title', 'date', 'slug', 'tags', 'content'],
		'cats'
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
	const posts = getAllPosts(['slug'], 'cats')

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
