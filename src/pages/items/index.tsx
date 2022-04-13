import { Container } from '@/components/layout/Container'
import { Meta } from '@/components/seo/meta'
import { LayoutBase } from '@/components/layouts/LayoutBase'
import { getAllPosts } from '@/lib/api'
import { TypePost } from '@/components/model/posts/Post'
import PostItem from '@/components/model/items/item'
import { AppHead01 } from '@/components/ui/head/AppHead01'
type TypeProps = {
	allPosts: TypePost[]
}

const Item = ({ allPosts }: TypeProps) => {
	return (
		<>
			<Meta
				pageTitle={'Items'}
				pageDescription={'買ってよかったものの感想やメモなどを残しています。'}
				pageUrl={'/books/'}
			/>
			<LayoutBase>
				<Container>
					<section className="grid gap-4 md:gap-8 lg:gap-12">
						<AppHead01 as="h1" text="Items" />
						{allPosts.length > 0 ? (
							<ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 lg:gap-8">
								{allPosts.map((post) => {
									return <PostItem {...post} key={post.slug} />
								})}
							</ul>
						): '記事はありません'}
					</section>
				</Container>
			</LayoutBase>
		</>
	)
}

export default Item

export const getStaticProps = async () => {
	const allPosts = getAllPosts(['title', 'date', 'slug', 'tags'], 'items')

	return {
		props: { allPosts },
	}
}
