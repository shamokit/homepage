import { GetServerSidePropsContext, GetStaticPaths } from 'next'
import { Container } from '@/components/ui/layout/Container'
import { Meta } from '@/components/seo/meta'
import { LayoutBase } from '@/components/layouts/LayoutBase'
import { getTagPosts } from '@/lib/api'
import { tags, getTagBySlug } from 'utils/tags'
import { TypeBook } from '@/components/model/books/type'
import PostBook from '@/components/model/books/book'
import { AppHead01 } from '@/components/ui/head/AppHead01'
import { TagType } from '@/components/model/tags/Tag'

type PathParams = {
	slug: string
}
type TypeProps = {
	tag: TagType
	allBooks: TypeBook[] | []
	slug: string
}
import { BLOG_DOMAIN } from "config/constants";

const Tag = ({ allBooks, tag, slug }: TypeProps) => {
	const url = `/books/tag/${slug}/`
	const breadcrumb = [
		{
			name: 'TOP',
			url: `${BLOG_DOMAIN}/`,
		},
		{
			name: 'Books',
			url: `${BLOG_DOMAIN}/books`,
		},
		{
			name: `${tag.name}`,
			url: `${BLOG_DOMAIN}${url}`,
		},
	]
	return (
		<>
			<Meta
				noindex
				pageTitle={`${tag.name}タグ | Books`}
				pageDescription={`${tag.name}関連で読んだ本の感想やメモなどを残しています。`}
				pageUrl={`${url}`}
				breadcrumb={breadcrumb}
			/>
			<LayoutBase breadcrumb={breadcrumb}>
				<Container>
					<section className="grid gap-4 md:gap-8 lg:gap-12">
						<AppHead01 as="h1" text={`#${tag.name}`} lead={<p>読んだ本の感想やメモなどを残しています。<br />読んでいる途中の本には途中タグをつけています。</p>} />
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

import {getBookData} from '@/lib/api'
export const getStaticProps = async ({params}:GetServerSidePropsContext<PathParams>) => {
	const slug = params?.slug!
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
