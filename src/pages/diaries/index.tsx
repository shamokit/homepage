import { Container } from '@/components/layout/Container'
import { Meta } from '@/components/seo/meta'
import { LayoutBase } from '@/components/layouts/LayoutBase'
import PostDiary from '@/components/post/diary'
import { AppHead01 } from '@/components/head/AppHead01'
import { Sidebar } from '@/components/model/diaries/Sidebar'
import {createClient} from 'newt-client-js'
import {TypeDiary} from '@/types/Diary'
import { PagerList } from '@/components/pager/List'

type TypeProps = {
	allPosts: TypeDiary[],
	page_array: number[]
}
import { BLOG_DOMAIN } from "@/lib/constants";
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
						<AppHead01 as="h1" text={'Diaries'}lead={<p>日記です。</p>}  />
						{allPosts.length > 0 ? (
							<>
							<ul className="grid">
								{allPosts.map((post) => {
									return <PostDiary {...post} key={post.slug} />
								})}
							</ul>
							<PagerList dir='/diaries' pager={{pages: [1, ...page_array], current: 1}} />
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
import { generateIntegerArray } from '@/functions/generateIntegerArray'

export const getStaticProps = async () => {
	const client = createClient({
		spaceUid: 'shamokit',
		token: process.env['NEWT_API_KEY'] ? process.env['NEWT_API_KEY']: '',
		apiType: 'cdn'
	});
	let postCount = 0
const posts_per_page = 10
	const allPosts = await client
		.getContents<TypeDiary>({
			appUid: 'diary',
			modelUid: 'article',
			query: {
				limit: 10,
			}
		})
		.then((contents) => {
			postCount = contents.total
			return contents.items
		})
		.catch((err) => console.log(err));
	const page_number = (postCount % posts_per_page == 0) ? (postCount / posts_per_page) : (Math.floor(postCount / posts_per_page) + 1)
	const page_array = [...generateIntegerArray(2, page_number)]
	return {
		props: { allPosts, page_array },
	}
}