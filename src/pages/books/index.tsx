import { Container } from '@/components/layout/Container'
import { Meta } from '@/components/seo/meta'
import { LayoutBase } from '@/components/layouts/LayoutBase'
import { getAllPosts } from '@/lib/api'
import { TypeBook } from '@/types/Book'
import PostBook from '@/components/post/book'
import { Head01 } from '@/components/head/section-head01'
type TypeProps = {
	books: TypeBook[]
}

const Book = ({ books }: TypeProps) => {
	return (
		<>
			<Meta
				pageTitle={'Books'}
				pageDescription={'読んだ本の感想やメモなどを残しています。'}
				pageUrl={'/books/'}
			/>
			<LayoutBase>
				<Container>
					<section className="grid gap-10 md:gap-12 lg:gap-16">
						<Head01 as="h1" text="Books" lead={<p>読んだ本の感想やメモなどを残しています。<br />読んでいる途中の本には途中タグをつけています。</p>} />
						{books && books.length > 0 ? (
							<ul className="grid lg:grid-cols-2 gap-2 lg:gap-4">
								{books.map((book) => {
									return <PostBook {...book} key={book.slug} />
								})}
							</ul>
						): '記事はありません'}
					</section>
				</Container>
			</LayoutBase>
		</>
	)
}

export default Book

import {BOOK_API_URL} from '@/lib/constants'
const getBookData = async (isbn: string) => {
	return await fetch(`${BOOK_API_URL}${isbn}`)
}
export const getStaticProps = async () => {
	let allPosts: TypeBook[] = getAllPosts(['title', 'date', 'slug', 'category', 'tags', 'isbn'], 'books')
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
	const books = await Promise.all(bookPromises).then((response) => {
		return response
	})
	return {
		props: { books },
	}
}
