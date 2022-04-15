import { Container } from '@/components/ui/layout/Container'
import { Meta } from '@/components/seo/meta'
import { LayoutBase } from '@/components/layouts/LayoutBase'
import PostDiary from '@/components/model/diaries/diary'
import { AppHead01 } from '@/components/ui/head/AppHead01'
import { Sidebar } from '@/components/model/diaries/Sidebar'
import { TypeDiary } from '@/components/model/diaries/type'
import { AppPager } from '@/components/ui/pager/AppPager'

type TypeProps = {
	allPosts: TypeDiary[]
	page_array: number[]
}
import { BLOG_DOMAIN } from 'config/constants'
const breadcrumb = [
	{
		name: 'TOP',
		url: `${BLOG_DOMAIN}/`,
	},
	{
		name: 'Diaries',
		url: `${BLOG_DOMAIN}/diaries`,
	},
]
const Diary = ({ allPosts, page_array }: TypeProps) => {
	return (
		<>
			<Meta
				pageTitle={'Diaries'}
				pageDescription={'日記です。'}
				pageUrl={'/diaries/'}
				breadcrumb={breadcrumb}
			/>
			<LayoutBase sidebar={<Sidebar />} breadcrumb={breadcrumb}>
				<Container>
					<section className="grid gap-4 md:gap-8 lg:gap-12">
						<AppHead01 as="h1" text={'Diaries'} lead={<p>日記です。</p>} />
						{allPosts.length > 0 ? (
							<>
								<ul className="grid">
									{allPosts.map((post) => {
										return <PostDiary {...post} key={post.slug} />
									})}
								</ul>
								<AppPager
									dir="/diaries"
									pager={{ pages: [1, ...page_array], current: 1 }}
								/>
							</>
						) : (
							'記事はありません'
						)}
					</section>
				</Container>
			</LayoutBase>
		</>
	)
}

export default Diary
import { generateIntegerArray } from 'utils/generateIntegerArray'
import { newtClient } from '@/lib/newt'

export const getStaticProps = async () => {
	let postCount = 0
	const posts_per_page = 10
	const allPosts = await newtClient
		.getContents<TypeDiary>({
			appUid: 'diary',
			modelUid: 'article',
			query: {
				limit: 10,
			},
		})
		.then((contents) => {
			postCount = contents.total
			return contents.items
		})
		.catch((err) => console.log(err))
	const page_number =
		postCount % posts_per_page == 0
			? postCount / posts_per_page
			: Math.floor(postCount / posts_per_page) + 1
	const page_array = [...generateIntegerArray(2, page_number)]
	return {
		props: { allPosts, page_array },
	}
}
