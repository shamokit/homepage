import { GetStaticProps, GetStaticPaths } from 'next'
import { Container } from '@/components/layout/Container'
import { Meta } from '@/components/seo/meta'
import { LayoutBase } from '@/components/layouts/LayoutBase'
import { getTagPosts } from '@/lib/api'
import { tags, getTagBySlug } from '@/lib/tags'
import { TypePost } from '@/types/Post'
import PostCard from '@/components/post/card'
import { Head01 } from '@/components/head/section-head01'
import { TagType } from '@/types/Tag'

type PathParams = {
	slug: string
}
type TypeProps = {
	tag: TagType
	allPosts: TypePost[] | []
	slug: string
}

const Tag = ({ allPosts, tag, slug }: TypeProps) => {
	const url = `/posts/tag/${slug}/`
	return (
		<>
			<Meta
				pageTitle={`${tag.name}タグ | Posts`}
				pageDescription={`${tag.name}関連で詰まったことなどの解決方法をメモしています。`}
				pageUrl={`${url}`}
			/>
			<LayoutBase>
				<Container>
					<section className="grid gap-4 md:gap-8 lg:gap-12">
						<Head01 as="h1" text={`#${tag.name}`} />
						{allPosts.length > 0 ? (
							<ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 lg:gap-8">
								{allPosts.map((post) => {
									return <PostCard {...post} key={post.slug} dir="posts" />
								})}
							</ul>
						): '記事はありません'}
					</section>
				</Container>
			</LayoutBase>
		</>
	)
}

export default Tag

export const getStaticProps: GetStaticProps = async (context) => {
	const { slug } = context.params as PathParams
	const tag = getTagBySlug(slug)
	const allPosts = getTagPosts(
		['title', 'date', 'slug', 'tags'],
		'posts',
		slug
	)

	return {
		props: { allPosts, tag, slug },
	}
}
export const getStaticPaths: GetStaticPaths = async () => {
	return {
		paths: tags.map((tag) => {
			return {
				params: {
					slug: tag['slug']!,
				},
			}
		}),
		fallback: false,
	}
}
