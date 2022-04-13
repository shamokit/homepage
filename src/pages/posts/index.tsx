import { Container } from '@/components/layout/Container'
import { Meta } from '@/components/seo/meta'
import { LayoutBase } from '@/components/layouts/LayoutBase'
import { getAllPosts } from '@/lib/api'
import { TypePost } from '@/components/model/posts/Post'
import PostCard from '@/components/model/posts/card'
import { AppHead01 } from '@/components/ui/head/AppHead01'
type TypeProps = {
	allPosts: TypePost[]
}
import { BLOG_DOMAIN } from 'config/constants'

const breadcrumb = [
	{
		name: 'TOP',
		url: `${BLOG_DOMAIN}/`,
	},
	{
		name: 'Posts',
		url: `${BLOG_DOMAIN}/posts`,
	},
]
const Cat = ({ allPosts }: TypeProps) => {
	return (
		<>
			<Meta
				pageTitle={'Posts'}
				pageDescription={'詰まったことなどの解決方法をメモしています。'}
				pageUrl={'/posts/'}
				breadcrumb={breadcrumb}
			/>
			<LayoutBase breadcrumb={breadcrumb}>
				<Container>
					<section className="grid gap-4 md:gap-8 lg:gap-12">
						<AppHead01 as="h1" text={'Posts'} lead={<p>詰まったことや残しておきたい情報を記事にしています。</p>} />
						{allPosts.length > 0 ? (
							<ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 lg:gap-8">
								{allPosts.map((post) => {
									return <PostCard {...post} key={post.slug} dir="posts" />
								})}
							</ul>
						) : (
							'記事はありません'
						)}
					</section>
				</Container>
			</LayoutBase>
		</>
	)
}

export default Cat

export const getStaticProps = async () => {
	const allPosts = getAllPosts(['title', 'date', 'slug', 'tags', 'category'], 'posts')
	return {
		props: { allPosts },
	}
}
