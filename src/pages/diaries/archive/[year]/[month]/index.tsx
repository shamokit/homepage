import { Container } from '@/components/layout/Container'
import { Meta } from '@/components/seo/meta'
import { LayoutBase } from '@/components/layouts/LayoutBase'
import PostDiary from '@/components/post/diary'
import { Head01 } from '@/components/head/section-head01'
import {createClient} from 'newt-client-js'
import {TypeDiary} from '@/types/Diary'
import { Sidebar } from '@/components/model/diaries/Sidebar'

type TypeProps = {
	year: number
	month: number
	allPosts: TypeDiary[]
}

const Diary = ({ allPosts, year, month }: TypeProps) => {
	const current = `${year}/${month}`
	return (
		<>
			<Meta
				pageTitle={`Diaries/${current}`}
				pageDescription={`${current}の日記です。`}
				pageUrl={`/diaries/archive/${current}`}
			/>
			<LayoutBase sidebar={<Sidebar current={current}/>}>
				<Container>
					<section className="grid gap-4 md:gap-8 lg:gap-12">
						<Head01 as="h1" text={`Diaries/${year}/${month}`} lead={<p>{year}年{month}月の日記です。</p>} />
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
	token: process.env.NODE_ENV,
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
export async function getStaticPaths() {
	const firstYear = 2022
	const currentTime = new Date();
	const thisYear = currentTime.getFullYear()
	const allPosts = await client
		.getContents<TypeDiary>({
			appUid: 'diary',
			modelUid: 'article',
			query: {
				depth: 2,
				limit: 100,
				date: {
					gte: new Date(`${firstYear}`).toISOString(),
					lt: new Date((`${(firstYear + 1).toString()}`).toString()).toISOString(),
				}
			},
		})
		.then((contents) => {
			return contents.items
		})
		.catch((err) => console.log(err));
	let monthList = allPosts?.map((post) => {
		const postMonth = new Date(post.date).getMonth() + 1
		return postMonth
	})
	monthList = [...new Set(monthList)]
	return {
		paths: monthList?.map((month) => {
			return {
				params: {
					year: `${firstYear}`,
					month: `${month}`,
				},
			}
		}),
		fallback: false,
	}
}
