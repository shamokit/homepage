import { Container } from '@/components/layout/Container'
import { LayoutBase } from '@/components/layouts/LayoutBase'
import {
	BLOG_DOMAIN,
} from '@/lib/constants'
import { TypePost } from '@/types/Post'
import PostCat from '@/components/post/cat'
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
						<Head01 as="h1" text="Cat一覧" />
						{allPosts.length > 0 ? (
							<ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 lg:gap-8">
								{allPosts.map((post) => {
									return <PostCat {...post} key={post.slug} />
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
	const res = await fetch(`${BLOG_DOMAIN}/api/post/?cat=cats`)
  const allPosts = await res.json()
	return {
		props: { allPosts },
	}
}
