import { Container } from '@/components/layout/Container'
import { Meta } from '@/components/seo/meta'
import { LayoutBase } from '@/components/layouts/LayoutBase'
import PostDiary from '@/components/post/diary'
import { Head01 } from '@/components/head/section-head01'
import {createClient} from 'newt-client-js'
import {TypeDiary} from '@/types/Diary'

type TypeProps = {
	year: number
	month: number
	allPosts: TypeDiary[]
}

const Diary = ({ allPosts, year, month }: TypeProps) => {
	return (
		<>
			<Meta
				pageTitle={'Diaries'}
				pageDescription={'日記です。'}
				pageUrl={'/diaries/'}
			/>
			<LayoutBase>
				<Container>
					<section className="grid gap-4 md:gap-8 lg:gap-12">
						<Head01 as="h1" text={`Diaries/${year}/${month}`} />
						{allPosts.length > 0 ? (
							<ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 lg:gap-8">
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
	token: 'pvFwQWwMw8VZi2lwuG5can3yhaLKW23nssvOLk6NEyc',
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
				limit: 100,
				day: {
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
	const yearListLength = thisYear - firstYear + 1

	let yearList = []
	const allPosts = await client
		.getContents<TypeDiary>({
			appUid: 'diary',
			modelUid: 'article',
			query: {
				depth: 2,
				limit: 100,
				day: {
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
		const postMonth = new Date(post.day).getMonth() + 1
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
