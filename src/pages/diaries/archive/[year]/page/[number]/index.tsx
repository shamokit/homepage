import { Container } from '@/components/layout/Container'
import { Meta } from '@/components/seo/meta'
import { LayoutBase } from '@/components/layouts/LayoutBase'
import PostDiary from '@/components/post/diary'
import { AppHead01 } from '@/components/head/AppHead01'
import { PagerList } from '@/components/pager/List'
import { Sidebar } from '@/components/model/diaries/Sidebar'
import {createClient} from 'newt-client-js'
import {TypeDiary} from '@/types/Diary'

type TypeProps = {
	allPosts: TypeDiary[],
	params: {
		year: string
		number: string
	}
	page_array: number[]
}
type Params = {
	params: {
		year: string
		number: string
	}
}
import { BLOG_DOMAIN } from "@/lib/constants";
const DiaryPages = ({ allPosts, params, page_array }: TypeProps) => {
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
			name: `Page/${params.number}`,
			url: `${BLOG_DOMAIN}/diaries/archive/${params.year}/page/${params.number}/`,
		},
	]
	return (
		<>
			<Meta
				pageTitle={`Diaries ${params.year}/Page${params.number}`}
				pageDescription={'日記です。'}
				pageUrl={`/diaries/${params.year}/page/${params.number}/`}
				pageImg={`/assets/diary/ogp_${params.year}.png`}
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
								<PagerList dir={`/diaries/archive/${params.year}`} pager={{pages: [1, ...page_array], current: Number(params.number)}} />
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

export default DiaryPages

const client = createClient({
	spaceUid: 'shamokit',
	token: process.env['NEWT_API_KEY'] ? process.env['NEWT_API_KEY']: '',
	apiType: 'cdn'
});
const posts_per_page = 10

export const getStaticProps = async ({ params }:Params) => {
	let year = Number(params.year)
	let requestPram = {
		appUid: 'diary',
		modelUid: 'article',
		query: {
			limit: 10,
			skip: 0,
			date: {
				gte: new Date(`${year.toString()}-1`).toISOString(),
				lt: new Date(`${(year + 1).toString()}-1`).toISOString(),
			}
		}
	}
	const number = Number(params.number)
	if( number !== 1) {
		requestPram.query.skip = posts_per_page * (number - 1)
	}
	let postTotalNumber = 0

	const allPosts = await client
		.getContents<TypeDiary>(requestPram)
		.then((contents) => {
			postTotalNumber = contents.total
			return contents.items
		})
		.catch((err) => console.log(err));
	const postCount = postTotalNumber ? postTotalNumber : 0
	const page_number = (postCount % posts_per_page == 0) ? (postCount / posts_per_page) : (Math.floor(postCount / posts_per_page) + 1)
	const page_array = [...generateIntegerArray(2, page_number)]
	return {
		props: { allPosts, params, page_array },
	}
}
import { generateIntegerArray } from '@/functions/generateIntegerArray'
export async function getStaticPaths() {
	const firstYear = 2022
	const currentTime = new Date();
	const thisYear = currentTime.getFullYear()

	let yearList = [...generateIntegerArray(firstYear, thisYear)]
	let getPram = {
		appUid: 'diary',
		modelUid: 'article',
		query: {
			limit: 1,
		}
	}
	const postTotalNumber = await client
		.getContents<TypeDiary>(getPram)
		.then((contents) => {
			return contents.total
		})
		.catch((err) => console.log(err));
	const postCount = postTotalNumber ? postTotalNumber : 0
	const page_number = (postCount % posts_per_page == 0) ? (postCount / posts_per_page) : (Math.floor(postCount / posts_per_page) + 1)
	const page_array = [...generateIntegerArray(2, page_number)]
	const paths = []
	for (let index = 0; index < yearList.length; index++) {
		const year = yearList[index];
		paths.push(...page_array.map((number) => {
			return {
				params: {
					year: `${year}`,
					number: `${number}`,
				},
			}
		}))
	}
	return {
		paths: [...paths],
		fallback: false,
	}
}
