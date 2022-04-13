import { Container } from '@/components/layout/Container'
import { Meta } from '@/components/seo/meta'
import { LayoutBase } from '@/components/layouts/LayoutBase'
import PostDiary from '@/components/model/diaries/diary'
import { AppHead01 } from '@/components/ui/head/AppHead01'
import {createClient} from 'newt-client-js'
import {TypeDiary} from '@/components/model/diaries/type'
import { Sidebar } from '@/components/model/diaries/Sidebar'

type TypeProps = {
	year: number
	month: number
	allPosts: TypeDiary[]
}
import { BLOG_DOMAIN } from "config/constants";

const Diary = ({ allPosts, year, month }: TypeProps) => {
	const current = `${year}/${month}`
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
		{
			name: `${month}`,
			url: `${BLOG_DOMAIN}/diaries/archive/${current}`,
		},
	]
	return (
		<>
			<Meta
				pageTitle={`Diaries/${current}`}
				pageDescription={`${current}の日記です。`}
				pageUrl={`/diaries/archive/${year}/${month}/`}
				pageImg={`/assets/diary/ogp_${year}${month < 10 ? '0'+month : month}.png`}
				breadcrumb={breadcrumb}
			/>
			<LayoutBase sidebar={<Sidebar current={current}/>} breadcrumb={breadcrumb}>
				<Container>
					<section className="grid gap-4 md:gap-8 lg:gap-12">
						<AppHead01 as="h1" text={`Diaries/${year}/${month}`} lead={<p>{year}年{month}月の日記です。</p>} />
						{allPosts.length > 0 ? (
							<ul className="grid">
								{allPosts.map((post) => {
									return <PostDiary {...post} key={post.slug} />
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

export default Diary

type Params = {
	params: {
		year: string,
		month: string
	}
}
const client = createClient({
	spaceUid: 'shamokit',
	token: process.env['NEWT_API_KEY'] ? process.env['NEWT_API_KEY']: '',
	apiType: 'cdn'
});
export const getStaticProps = async ({ params }: Params) => {
	let year = Number(params.year)
	let month = Number(params.month)
	const allPosts = await client
		.getContents<TypeDiary>({
			appUid: 'diary',
			modelUid: 'article',
			query: {
				depth: 2,
				limit: 62,
				date: {
					gte: new Date(`${year.toString()}-${month.toString()}`).toISOString(),
					lt: new Date((`${year.toString()}-${(month + 1).toString()}`).toString()).toISOString(),
				}
			},
		})
		.then((contents) => {
			return contents.items
		})
		.catch((err) => console.log(err));
	return {
		props: { allPosts, year: params.year, month: params.month },
	}
}
import { generateIntegerArray } from 'utils/generateIntegerArray'
export async function getStaticPaths() {
	const firstYear = 2022
	const firstYearMonth = 3
	const currentTime = new Date();
	const thisYear = currentTime.getFullYear()
	let yearList = [...generateIntegerArray(firstYear, thisYear)]
	const thisYearMonth = currentTime.getMonth() + 1
	let monthList:number[] = []

	const paths = []

	if(firstYear === thisYear) {
		monthList = [...generateIntegerArray(firstYearMonth, thisYearMonth)]
	} else {
		monthList = [...generateIntegerArray(1, thisYearMonth)]
	}
	for (let index = 0; index < yearList.length; index++) {
		const year = yearList[index];
		paths.push(...monthList.map((month) => {
			return {
				params: {
					year: `${year}`,
					month: `${month}`,
				},
			}
		}))
	}
	return {
		paths: [...paths],
		fallback: false,
	}
}
