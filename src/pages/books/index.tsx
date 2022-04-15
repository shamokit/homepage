import { Container } from '@/components/ui/layout/Container'
import { Meta } from '@/components/seo/meta'
import { LayoutBase } from '@/components/layouts/LayoutBase'
import { getAllPosts } from '@/lib/api'
import { TypeBook } from '@/components/model/books/type'
import PostBook from '@/components/model/books/book'
import { AppHead01 } from '@/components/ui/head/AppHead01'
type TypeProps = {
	books: TypeBook[]
}
import { BLOG_DOMAIN } from "config/constants";
const breadcrumb = [
	{
		name: 'TOP',
		url: `${BLOG_DOMAIN}/`,
	},
	{
		name: 'Books',
		url: `${BLOG_DOMAIN}/books`,
	},
]
const Book = ({ books }: TypeProps) => {
	return (
		<>
			<Meta
				pageTitle={'Books'}
				pageDescription={'読んだ本の感想やメモなどを残しています。'}
				pageUrl={'/books/'}
				breadcrumb={breadcrumb}
			/>
			<LayoutBase breadcrumb={breadcrumb}>
				<Container>
					<section className="grid gap-10 md:gap-12 lg:gap-16">
						<AppHead01 as="h1" text="Books" lead={<p>読んだ本の感想やメモなどを残しています。<br />読んでいる途中の本には途中タグをつけています。</p>} />
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

import {getBookData} from '@/lib/api'
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
