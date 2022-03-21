import { Container } from '@/components/layout/Container'
import { Meta } from '@/components/seo/meta'
import PostCard from '@/components/post/card'
import { TagItem } from '@/components/tag/item'
import { LayoutBase } from '@/components/layouts/LayoutBase'
import { Head01 } from '@/components/head/section-head01'
import { Head02 } from '@/components/head/section-head02'
import { getAllPosts } from '@/lib/api'
import { getTagsWithCount } from '@/lib/tags'
import { TypePost } from '@/types/Post'
import { PostBody } from '@/components/post/body'
import { Btn01 } from '@/components/button/app-btn01'
import { BLOG_DOMAIN } from '@/lib/constants'
type TypeProps = {
	posts: TypePost[]
	bookPosts: TypePost[]
	allDiaries: TypeDiary[]
	mainCopyContentHtml: any
	tagsInPosts: (TagType & { count: number })[]
	tagsInBooks: (TagType & { count: number })[]
}

import mdToHtml from '@/lib/markdownToHtml'
import { getPostBySlug } from '@/lib/api'
import { TagType } from '@/types/Tag'
const breadcrumb = [
	{
		name: 'TOP',
		url: `${BLOG_DOMAIN}/`,
	},
]
const Index = ({
	posts,
	bookPosts,
	allDiaries,
	mainCopyContentHtml,
	tagsInPosts,
	tagsInBooks,
}: TypeProps) => {
	return (
		<>
			<Meta
				pageTitle={'しゃもきっとの技術ブログ'}
				pageDescription={''}
				pageUrl={''}
				pageImg={''}
				breadcrumb={breadcrumb}
			/>
			<LayoutBase>
				<Container className="md:flex items-center md:gap-8 lg:gap-16 pt-8 md:pt-14 lg:pt-0">
					<div className="grid place-items-center">
						<PostBody
							content={mainCopyContentHtml}
							className="tracking-normal !leading-normal"
						/>
					</div>
					<h1 className="flex justify-center mt-8 md:mt-0 tracking-wider text-lg md:text-xl lg:text-2xl">
						<span>
							めんどくさいを
							<span className="ml-2 mr-1 text-sub text-2xl md:text-3xl lg:text-4xl tracking-widest">
								楽ちん
							</span>
							に。
							<br />
							コーディングを
							<span className="ml-2 mr-1 text-sub text-2xl md:text-3xl lg:text-4xl tracking-widest">
								楽しい
							</span>
							に。
						</span>
					</h1>
				</Container>
				<div className="mt-16 md:mt-20 lg:mt-32">
					<Container>
						<div className="grid gap-28 md:gap-32 lg:gap-40">
							<section className="grid gap-8 md:gap-12 lg:gap-16">
								<Head01 text="About" />
								<p>
									このサイトはしゃもきっとが運営しているブログサイトです。
									{/* <br />
									しゃもきっとに関して気になった人は
									Profileページを見てみてください。 */}
								</p>
								{/* <Btn01 href="/profile/" text="Profile" /> */}
							</section>
							<section className="grid gap-8 md:gap-12 lg:gap-20">
								<Head01 text="Posts" />
								{posts.length > 0 && (
									<ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 lg:gap-8">
										{posts.map((post) => {
											return <PostCard {...post} key={post.slug} dir="posts" />
										})}
									</ul>
								)}
								{tagsInPosts && (
									<section>
										<Head02 text="Tag" />
										{tagsInPosts.length > 0 && (
											<ul className="flex mt-8 -mr-2">
												{tagsInPosts.map((tag) => {
													return (
														<li key={tag.id} className="mr-2">
															<TagItem
																id={tag.id}
																dirName="posts"
																count={tag.count}
															/>
														</li>
													)
												})}
											</ul>
										)}
									</section>
								)}
								<Btn01 href="/posts/" text="Posts" />
							</section>
							<section className="grid gap-8 md:gap-12 lg:gap-20">
								<Head01 text="Books" />
								{bookPosts.length > 0 && (
									<ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 lg:gap-8">
										{bookPosts.map((post) => {
											return <PostCard {...post} key={post.slug} dir="books" />
										})}
									</ul>
								)}
								{tagsInBooks && tagsInBooks.length > 0 && (
									<ul className="flex -mr-2">
										{tagsInBooks.map((tag) => {
											return (
												<li key={tag.id} className="mr-2">
													<TagItem
														id={tag.id}
														dirName="books"
														count={tag.count}
													/>
												</li>
											)
										})}
									</ul>
								)}
								<Btn01 href="/books/" text="Books" />
							</section>
							<section className="grid gap-8 md:gap-12 lg:gap-20">
								<Head01 text="Diaries" />
								{allDiaries.length > 0 && (
									<ul className="grid">
										{allDiaries.map((post) => {
											return <PostDiary {...post} key={post.slug} />
										})}
									</ul>
								)}
								<Btn01 href="/diaries/" text="Diaries" />
							</section>
						</div>
					</Container>
				</div>
			</LayoutBase>
		</>
	)
}

export default Index
import { getPostSlugs } from '@/lib/api'
import { createClient } from 'newt-client-js'
import { TypeDiary } from '@/types/Diary'
import PostDiary from '@/components/post/diary'
export const getStaticProps = async () => {
	const mainCopy = getPostBySlug('text', ['content'])
	const mainCopyContent = mainCopy['content'] as string
	const mainCopyContentHtml = await mdToHtml(mainCopyContent || '')

	const posts = getAllPosts(
		['title', 'date', 'slug', 'tags', 'category'],
		'posts'
	)
	const bookPosts = getAllPosts(
		['title', 'date', 'slug', 'tags', 'category'],
		'books'
	)

	const allPostSlugs = getPostSlugs()
	const postsForTags = allPostSlugs
		.map((slug) => getPostBySlug(slug, ['tags', 'category']))
		.filter((post) => {
			return post['private'] !== true
		})
	const tagsInPosts = getTagsWithCount(postsForTags, 'posts')
	const tagsInBooks = getTagsWithCount(postsForTags, 'books')

	const client = createClient({
		spaceUid: 'shamokit',
		token: process.env.NODE_ENV,
		apiType: 'cdn',
	})
	const allDiaries = await client
		.getContents<TypeDiary>({
			appUid: 'diary',
			modelUid: 'article',
			query: {
				limit: 7,
			},
		})
		.then((contents) => {
			return contents.items
		})
		.catch((err) => console.log(err))

	return {
		props: {
			posts,
			bookPosts,
			allDiaries,
			mainCopyContentHtml,
			tagsInPosts,
			tagsInBooks,
		},
	}
}
