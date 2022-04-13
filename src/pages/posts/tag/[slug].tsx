import { GetStaticProps, GetStaticPaths } from 'next'
import { Container } from '@/components/layout/Container'
import { Meta } from '@/components/seo/meta'
import { LayoutBase } from '@/components/layouts/LayoutBase'
import { getTagPosts } from '@/lib/api'
import { tags, getTagBySlug } from 'utils/tags'
import { TypePost } from '@/components/model/posts/Post'
import PostCard from '@/components/model/posts/card'
import { AppHead01 } from '@/components/ui/head/AppHead01'
import { TagType } from '@/components/model/tags/Tag'

type PathParams = {
	slug: string
}
type TypeProps = {
	tag: TagType
	allPosts: TypePost[] | []
	slug: string
}
import { BLOG_DOMAIN } from 'config/constants'


const Tag = ({ allPosts, tag, slug }: TypeProps) => {
	const url = `/posts/tag/${slug}/`
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
			name: tag.name,
			url: `${BLOG_DOMAIN}${url}`,
		},
	]
	return (
		<>
			<Meta
				pageTitle={`${tag.name}タグ | Posts`}
				pageDescription={`${tag.name}関連で詰まったことなどの解決方法をメモしています。`}
				pageUrl={`${url}`}
				breadcrumb={breadcrumb}
			/>
			<LayoutBase breadcrumb={breadcrumb}>
				<Container>
					<section className="grid gap-4 md:gap-8 lg:gap-12">
						<AppHead01 as="h1" text={`#${tag.name}`} lead={<p>{tag.name}関連で詰まったことや残しておきたい情報を記事にしています。</p>} />
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
		['title', 'date', 'slug', 'category', 'tags'],
		slug,
		'posts',
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
