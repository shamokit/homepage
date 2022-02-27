import { Container } from '@/components/layout/Container'
import { LayoutBase } from '@/components/layouts/LayoutBase'
import { getAllPosts } from '@/lib/api'
import { TypePost } from '@/types/Post'
import PostBooks from '@/components/post/book'
import { Head01 } from '@/components/head/section-head01'
type TypeProps = {
	allPosts: TypePost[]
}

const Cat = ({ allPosts }: TypeProps) => {
	return (
		<>
			<LayoutBase>
				<Container>
					<section className="grid gap-4 md:gap-8 lg:gap-12">
						<Head01 as="h1" text="Book一覧" />
						{allPosts.length > 0 ? (
							<ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 lg:gap-8">
								{allPosts.map((post) => {
									return <PostBooks {...post} key={post.slug} />
								})}
							</ul>
						): '記事はありません'}
					</section>
				</Container>
			</LayoutBase>
		</>
	)
}

export default Cat

export const getStaticProps = async () => {
	const allPosts = getAllPosts(['title', 'date', 'slug', 'tags'], 'books')

	return {
		props: { allPosts },
	}
}
