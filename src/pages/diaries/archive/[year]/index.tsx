import { Container } from '@/components/layout/Container'
import { Meta } from '@/components/seo/meta'
import { LayoutBase } from '@/components/layouts/LayoutBase'
import PostDiary from '@/components/post/diary'
import { Head01 } from '@/components/head/section-head01'
import { Sidebar } from '@/components/model/diaries/Sidebar'
import {createClient} from 'newt-client-js'
import {TypeDiary} from '@/types/Diary'

type TypeProps = {
	year: number
	allPosts: TypeDiary[]
}

const Diary = ({ allPosts, year }: TypeProps) => {
	return (
		<>
			<Meta
				pageTitle={'Diaries'}
				pageDescription={'日記です。'}
				pageUrl={'/diaries/'}
			/>
			<LayoutBase sidebar={<Sidebar />}>
				<Container>
					<section className="grid gap-4 md:gap-8 lg:gap-12">
						<Head01 as="h1" text={`Diaries/${year}`} />
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
		year: string
	}
}
const client = createClient({
	spaceUid: 'shamokit',
	token: process.env.NODE_ENV,
	apiType: 'cdn'
});
export const getStaticProps = async ({ params }: Params) => {
	let year = Number(params.year)
	const allPosts = await client
		.getContents<TypeDiary>({
			appUid: 'diary',
			modelUid: 'article',
			query: {
				depth: 2,
				limit: 100,
				day: {
					gte: new Date(year.toString()).toISOString(),
					lt: new Date((year + 1).toString()).toISOString(),
				}
			},
		})
		.then((contents) => {
			return contents.items
		})
		.catch((err) => console.log(err));
	return {
		props: { allPosts, year: params.year },
	}
}

import { generateIntegerArray } from '@/functions/generateIntegerArray'
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
