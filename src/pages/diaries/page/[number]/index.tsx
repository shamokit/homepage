import { Container } from '@/components/ui/layout/Container'
import { Meta } from '@/components/seo/meta'
import { LayoutBase } from '@/components/layouts/LayoutBase'
import PostDiary from '@/components/model/diaries/diary'
import { AppHead01 } from '@/components/ui/head/AppHead01'
import { AppPager } from '@/components/ui/pager/AppPager'
import { Sidebar } from '@/components/model/diaries/Sidebar'
import {createClient} from 'newt-client-js'
import {TypeDiary} from '@/components/model/diaries/type'

type TypeProps = {
	allPosts: TypeDiary[],
	params: {
		number: number
	}
	page_array: number[]
}
type Params = {
	params: {
		number: number
	}
}
import { BLOG_DOMAIN } from "config/constants";
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
			url: `${BLOG_DOMAIN}/diaries/page/${params.number}`,
		},
	]
	return (
		<>
			<Meta
				pageTitle={`Diaries Page${params.number}`}
				pageDescription={'日記です。'}
				pageUrl={`/diaries/page/${params.number}/`}
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
								<AppPager dir='/diaries' pager={{pages: [1, ...page_array], current: Number(params.number)}} />
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
let requestPram = {
	appUid: 'diary',
	modelUid: 'article',
	query: {
		limit: 10,
		skip: 0,
	}
}
const posts_per_page = 10

export const getStaticProps = async ({ params }:Params) => {
	if(params.number !== 1) {
		requestPram.query.skip = posts_per_page * (params.number - 1)
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
import { generateIntegerArray } from 'utils/generateIntegerArray'
export async function getStaticPaths() {
	let getPram = {
		appUid: 'diary',
		modelUid: 'article',
		query: {
			limit: 1,
		}
	}
	const postTotalNumber = await client
		.getContents<TypeDiary>(getPram)
		.then(({total}) => {
			return total
		})
		.catch((err) => console.log(err));
	const postCount = postTotalNumber ? postTotalNumber : 0
	const page_number = (postCount % posts_per_page == 0) ? (postCount / posts_per_page) : (Math.floor(postCount / posts_per_page) + 1)
	const page_array = [...generateIntegerArray(2, page_number)]
	return {
		paths: page_array?.map((number) => {
			return {
				params: {
					number: `${number}`,
				},
			}
		}),
		fallback: false,
	}
}
