import { Container } from '@/components/layout/Container'
import { Meta } from '@/components/seo/meta'
import PostCard from '@/components/post/card'
import { TagItem } from '@/components/tag/item'
import { LayoutBase } from '@/components/layouts/LayoutBase'
import { AppHead01 } from '@/components/head/AppHead01'
import { Head02 } from '@/components/head/section-head02'
import { getAllPosts } from '@/lib/api'
import { getTagsWithCount } from '@/lib/tags'
import { TypePost } from '@/types/Post'
import { PostBody } from '@/components/post/body'
import PostBook from '@/components/post/book'
import { AppBtn01 } from '@/components/button/AppBtn01'
import { BLOG_DOMAIN } from '@/lib/constants'
type TypeProps = {
	posts: TypePost[]
	books: TypePost[]
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
	books,
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
								<AppHead01 text="About" />
								<p>
									このサイトはしゃもきっとが運営しているブログサイトです。<br />
									作っている途中なのでコンテンツはほとんどないです。日記は毎日書いてます。
									{/* <br />
									しゃもきっとに関して気になった人は
									Profileページを見てみてください。 */}
								</p>
								{/* <AppBtn01 href="/profile/" text="Profile" /> */}
							</section>
							<section className="grid gap-8 md:gap-12 lg:gap-20">
								<AppHead01 text="Posts" />
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
											<ul className="flex flex-wrap mt-6 -mr-2 -mb-2">
												{tagsInPosts.map((tag) => {
													return (
														<li key={tag.id} className="mr-2 mb-2">
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
								<AppBtn01 href="/posts/">Posts</AppBtn01>
							</section>
							<section className="grid gap-8 md:gap-12 lg:gap-20">
								<AppHead01 text="Books" />
								{books.length > 0 && (
									<ul className="grid lg:grid-cols-2 gap-2 lg:gap-4">
									{books.map((book) => {
										return <PostBook {...book} key={book.slug} />
									})}
								</ul>
								)}
								<section>
									<Head02 text="Tag" />
									{tagsInBooks && tagsInBooks.length > 0 && (
										<ul className="flex flex-wrap mt-6 -mr-2 -mb-2">
											{tagsInBooks.map((tag) => {
												return (
													<li key={tag.id} className="mr-2 mb-2">
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
								</section>
								<AppBtn01 href="/books/">Books</AppBtn01>
							</section>
							<section className="grid gap-8 md:gap-12 lg:gap-20">
								<AppHead01 text="Diaries" />
								{allDiaries.length > 0 && (
									<ul className="grid">
										{allDiaries.map((post) => {
											return <PostDiary {...post} key={post.slug} />
										})}
									</ul>
								)}
								<AppBtn01 href="/diaries/">Diaries</AppBtn01>
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
import { TypeBook } from '@/types/Book'
import PostDiary from '@/components/post/diary'
import {BOOK_API_URL} from '@/lib/constants'
const getBookData = async (isbn: string) => {
	return await fetch(`${BOOK_API_URL}${isbn}`)
}
export const getStaticProps = async () => {
	const mainCopy = getPostBySlug('text', ['content'])
	const mainCopyContent = mainCopy['content'] as string
	const mainCopyContentHtml = await mdToHtml(mainCopyContent || '')

	const posts = getAllPosts(
		['title', 'date', 'slug', 'tags', 'category'],
		'posts'
	)
	let bookPosts: TypeBook[] = getAllPosts(
		['title', 'date', 'slug', 'tags', 'category','isbn'],
		'books'
	)
	bookPosts = bookPosts.slice(0,6)
	const bookPromises = bookPosts.map(async (book) => {
		if(!book.isbn) return book
		let bookData = Object.assign({}, book)
		const thumbnailUrl = await getBookData(book.isbn).then(async (response) => {
			const data = await response.json()
			const thumbnail = data[0]['summary']['cover']
			return thumbnail
		})
		bookData['thumbnail'] = thumbnailUrl
		return bookData
	})
	const books = await Promise.all(bookPromises).then((response) => {
		return response
	})

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
		token: process.env['NEWT_API_KEY'] ? process.env['NEWT_API_KEY']: '' ,
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
			books,
			allDiaries,
			mainCopyContentHtml,
			tagsInPosts,
			tagsInBooks,
		},
	}
}
