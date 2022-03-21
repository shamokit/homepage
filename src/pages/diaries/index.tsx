import { Container } from '@/components/layout/Container'
import { Meta } from '@/components/seo/meta'
import { LayoutBase } from '@/components/layouts/LayoutBase'
import PostDiary from '@/components/post/diary'
import { Head01 } from '@/components/head/section-head01'
import { Sidebar } from '@/components/model/diaries/Sidebar'
import {createClient} from 'newt-client-js'
import {TypeDiary} from '@/types/Diary'

type TypeProps = {
	allPosts: TypeDiary[],
}

const Diary = ({ allPosts }: TypeProps) => {
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
						<Head01 as="h1" text={'Diaries'}lead={<p>日記です。</p>}  />
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

export const getStaticProps = async () => {
	const client = createClient({
		spaceUid: 'shamokit',
		token: process.env.NODE_ENV,
		apiType: 'cdn'
	});
	const allPosts = await client
		.getContents<TypeDiary>({
			appUid: 'diary',
			modelUid: 'article',
			query: {
				limit: 10,
			}
		})
		.then((contents) => {
			return contents.items
		})
		.catch((err) => console.log(err));
	return {
		props: { allPosts },
	}
}
