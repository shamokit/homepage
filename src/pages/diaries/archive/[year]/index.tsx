import { Container } from '@/components/ui/layout/Container'
import { Meta } from '@/components/seo/meta'
import { LayoutBase } from '@/components/layouts/LayoutBase'
import PostDiary from '@/components/model/diaries/diary'
import { AppHead01 } from '@/components/ui/head/AppHead01'
import { Sidebar } from '@/components/model/diaries/Sidebar'
import {createClient} from 'newt-client-js'
import {TypeDiary} from '@/components/model/diaries/type'

type TypeProps = {
	year: string
	allPosts: TypeDiary[]
	page_array: number[]
}
import { BLOG_DOMAIN } from "config/constants";
import { AppPager } from '@/components/ui/pager/AppPager'

const Diary = ({ allPosts, year, page_array }: TypeProps) => {
	const breadcrumb = [
		{
			name: 'TOP',
			url: `${BLOG_DOMAIN}/`,
		},
		{
			name: 'Diaries',
			url: `${BLOG_DOMAIN}/diaries`,
		},
		{
			name: `${year}`,
			url: `${BLOG_DOMAIN}/diaries/archive/${year}`,
		},
	]
	return (
		<>
			<Meta
				pageTitle={`Diaries/${year}`}
				pageDescription={`${year}の日記です。`}
				pageUrl={`/diaries/archive/${year}/`}
				pageImg={`/assets/diary/ogp_${year}.png`}
				breadcrumb={breadcrumb}
			/>
			<LayoutBase sidebar={<Sidebar current={`${year}`} />} breadcrumb={breadcrumb}>
				<Container>
					<section className="grid gap-4 md:gap-8 lg:gap-12">
						<AppHead01 as="h1" text={`Diaries/${year}`} />
						{allPosts.length > 0 ? (
							<>
								<ul className="grid">
									{allPosts.map((post) => {
										return <PostDiary {...post} key={post.slug} />
									})}
								</ul>
								<AppPager dir={`/diaries/archive/${year}`} pager={{pages: [1, ...page_array], current: 1}} />
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

type Params = {
	params: {
		year: string
	}
}
const client = createClient({
	spaceUid: 'shamokit',
	token: process.env['NEWT_API_KEY'] ? process.env['NEWT_API_KEY']: '',
	apiType: 'cdn'
});
let postCount = 0
const posts_per_page = 10
export const getStaticProps = async ({ params }: Params) => {
	let year = Number(params.year)
	const allPosts = await client
		.getContents<TypeDiary>({
			appUid: 'diary',
			modelUid: 'article',
			query: {
				depth: 2,
				limit: 10,
				date: {
					gte: new Date(`${year.toString()}-1`).toISOString(),
					lt: new Date(`${(year + 1).toString()}-1`).toISOString(),
				}
			},
		})
		.then((contents) => {
			postCount = contents.total
			return contents.items
		})
		.catch((err) => console.log(err));
		const page_number = (postCount % posts_per_page == 0) ? (postCount / posts_per_page) : (Math.floor(postCount / posts_per_page) + 1)
		const page_array = [...generateIntegerArray(2, page_number)]
	return {
		props: { allPosts, year: params.year, page_array },
	}
}

import { generateIntegerArray } from 'utils/generateIntegerArray'
export async function getStaticPaths() {
	const firstYear = 2022
	const currentTime = new Date();
	const thisYear = currentTime.getFullYear()

	let yearList = [...generateIntegerArray(firstYear, thisYear)]

	return {
		paths: yearList?.map((year) => {
			return {
				params: {
					year: `${year}`,
				},
			}
		}),
		fallback: false,
	}
}
