import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import { Container } from '@/components/ui/layout/Container'
import { PostBody } from '@/components/ui/content/AppContentBody'
import { Meta } from '@/components/seo/meta'
import { LayoutBase } from '@/components/layouts/LayoutBase'
import { getPostBySlug, getAllPosts } from '@/lib/api'
import mdToHtml from '@/lib/markdownToHtml'
import { TypeBook } from '@/components/model/books/type'
import { AppHeader01 } from '@/components/ui/head/AppHeader01'

type TypeProps = {
	book: TypeBook
}
import { BLOG_DOMAIN } from 'config/constants'
import { TagItem } from '@/components/model/tags/item'
import { AppHead03 } from '@/components/ui/head/AppHead03'
import { AppDate } from '@/components/ui/date/AppDate'

const Post = ({ book }: TypeProps) => {
	const router = useRouter()
	if (!router.isFallback && !book?.slug) {
		return <ErrorPage statusCode={404} />
	}
	const title = `${book.title}`
	const description = `${book.description}`
	const url = `/books/${book.slug}/`
	const date = `${book.date}/`

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
			name: `${title}`,
			url: `${BLOG_DOMAIN}${url}`,
		},
	]
	const hasTags = 'tags' in book && book.tags && book.tags.length > 0
	return (
		<>
			<Meta
				pageTitle={`${title} | Books`}
				pageDescription={description}
				pageUrl={url}
				breadcrumb={breadcrumb}
				isSingle={true}
				datePublished={date}
			/>
			<LayoutBase breadcrumb={breadcrumb}>
				<Container>
					{
						<article>
							<header className="grid grid-cols-4 gap-5 mb-12 md:grid-flow-row">
								{book.thumbnail && (
									<div className="relative col-span-1 md:col-start-1 md:row-start-1 md:row-end-4">
										<img
											src={book.thumbnail}
											className=" transition-opacity group-hover:opacity-90"
											alt=""
											loading="lazy"
										/>
									</div>
								)}
								{hasTags && (
									<div className="col-span-3 md:col-start-2 md:row-start-1 md:col-span-3">
										<ul className="flex flex-wrap -mr-2 -mb-2">
											{book.tags
												? book.tags.map((tag) => {
														return (
															<li key={tag} className="mr-2 mb-2">
																<TagItem id={tag} dirName="books" />
															</li>
														)
													})
												: ''}
										</ul>
									</div>
								)}
								<AppHead03 title={book.title} className="col-span-full md:col-start-2 md:row-start-2 md:col-span-3"></AppHead03>
								<AppDate pageSingle={true} dateString={book.date} className="col-span-full md:col-start-2 md:row-start-3 md:col-span-3"></AppDate>
							</header>
							<PostBody content={book.content} />
						</article>
					}
				</Container>
			</LayoutBase>
		</>
	)
}

export default Post

type Params = {
	params: {
		slug: string
	}
}
import { getBookData } from '@/lib/api'
export async function getStaticProps({ params }: Params) {
	const post = getPostBySlug(params.slug, [
		'title',
		'date',
		'slug',
		'tags',
		'category',
		'content',
		'isbn',
	]) as TypeBook
	const postContent = post.content
	const content = await mdToHtml(postContent! || '')
	const bookDataPromise = async () => {
		if (!post.isbn) return post
		const thumbnailUrl = await getBookData(post.isbn).then(async (response) => {
			const data = await response.json()
			const thumbnail = data[0]['summary']['cover']
			return thumbnail
		})
		let bookData = Object.assign({}, post)
		bookData['thumbnail'] = thumbnailUrl
		return bookData
	}
	const book = await bookDataPromise()
	return {
		props: {
			book: {
				...book,
				content,
			},
		},
	}
}

export async function getStaticPaths() {
	const posts = getAllPosts(['slug', 'category'], 'books')
	return {
		paths: posts.map((post) => {
			return {
				params: {
					slug: post['slug']!,
				},
			}
		}),
		fallback: false,
	}
}
