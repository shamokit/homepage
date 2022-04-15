import { GetStaticProps, GetStaticPaths } from 'next'
import { Container } from '@/components/ui/layout/Container'
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

const Tag = ({ allPosts, tag, slug }: TypeProps) => {
	const url = `/cats/tag/${slug}/`
	return (
		<>
			<Meta
				pageTitle={`${tag.name}タグ | Cats`}
				pageDescription={`${tag.name}関連のねこの情報をメモしています。`}
				pageUrl={`${url}`}
			/>
			<LayoutBase>
				<Container>
					<section className="grid gap-4 md:gap-8 lg:gap-12">
						<AppHead01 as="h1" text={`${tag.name} List`} />
						{allPosts.length > 0 ? (
							<ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 lg:gap-8">
								{allPosts.map((post) => {
									return <PostCard {...post} key={post.slug} dir="cats" />
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

export const getStaticProps: GetStaticProps = async ({params}) => {
	const { slug } = params as PathParams
	const tag = getTagBySlug(slug)
	const allPosts = getTagPosts(
		['title', 'date', 'slug', 'tags'],
		slug,
		'cats',
	)

	return {
		props: { allPosts, tag },
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
