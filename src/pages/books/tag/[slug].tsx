import { GetStaticProps, GetStaticPaths } from 'next'
import { Container } from '@/components/layout/Container'
import { Meta } from '@/components/seo/meta'
import { LayoutBase } from '@/components/layouts/LayoutBase'
import { getTagPosts } from '@/lib/api'
import { tags, getTagBySlug } from '@/lib/tags'
import { TypeBook } from '@/types/Book'
import PostBook from '@/components/post/book'
import { Head01 } from '@/components/head/section-head01'
import { TagType } from '@/types/Tag'

type PathParams = {
	slug: string
}
type TypeProps = {
	tag: TagType
	allBooks: TypeBook[] | []
	slug: string
}
const Tag = ({ allBooks, tag, slug }: TypeProps) => {
	const url = `/books/tag/${slug}/`
	return (
		<>
			<Meta
				pageTitle={`${tag.name}タグ | Books`}
				pageDescription={`${tag.name}関連で読んだ本の感想やメモなどを残しています。`}
				pageUrl={`${url}`}
			/>
			<LayoutBase>
				<Container>
					<section className="grid gap-4 md:gap-8 lg:gap-12">
						<Head01 as="h1" text={`#${tag.name}`} lead={<p>読んだ本の感想やメモなどを残しています。<br />読んでいる途中の本には途中タグをつけています。</p>} />
						{allBooks.length > 0 ? (
							<ul className="grid lg:grid-cols-2 gap-2 lg:gap-4">
								{allBooks.map((post) => {
									return <PostBook {...post} key={post.slug} />
								})}
							</ul>
						): '記事はありません'}
					</section>
				</Container>
			</LayoutBase>
		</>
	)
}

export default Tag
import {BOOK_API_URL} from '@/lib/constants'
const getBookData = async (isbn: string) => {
	return await fetch(`${BOOK_API_URL}${isbn}`)
}
export const getStaticProps: GetStaticProps = async (context) => {
	const { slug } = context.params as PathParams
	const tag = getTagBySlug(slug)
	const allPosts: TypeBook[] = getTagPosts(
		['title', 'date', 'slug', 'category', 'tags', 'isbn'],
		slug,
		'books',
	)
	const bookPromises = allPosts.map(async (book) => {
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
	const allBooks = await Promise.all(bookPromises).then((response) => {
		return response
	})
	return {
		props: { allBooks, tag, slug },
	}
}
export const getStaticPaths: GetStaticPaths = async () => {
	return {
		paths: tags.map((tag) => {
			return {
				params: {
					slug: tag['slug']!,
				},
			}
		}),
		fallback: false,
	}
}
