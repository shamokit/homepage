import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import { Container } from '@/components/layout/Container'
import { PostBody } from '@/components/post/body'
import { Meta } from '@/components/seo/meta'
import { LayoutBase } from '@/components/layouts/LayoutBase'
import { getPostBySlug, getAllPosts } from '@/lib/api'
import mdToHtml from '@/lib/markdownToHtml'
import { TypeBook } from '@/types/Book'
import { PostHeader } from '@/components/post/header'
import Image from 'next/image'

type TypeProps = {
	book: TypeBook
}
import { BLOG_DOMAIN } from "@/lib/constants";

const Post = ({ book }: TypeProps) => {
	const router = useRouter()
	if (!router.isFallback && !book?.slug) {
		return <ErrorPage statusCode={404} />
	}
	const title = `${book.title}`
	const description = `${book.description}`
	const url = `/books/${book.slug}/`

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
	return (
		<>
			<Meta
				pageTitle={`${title} | Books`}
				pageDescription={description}
				pageUrl={url}
				breadcrumb={breadcrumb}
			/>
			<LayoutBase breadcrumb={breadcrumb}>
				<Container>
					{
						<article>
							<div className="flex items-start mb-12">
								{book.thumbnail && (
									<div className="relative w-32 min-h-[160px] flex-shrink-0 mr-10">
										<Image
											src={book.thumbnail}
											alt=""
											layout="fill"
											objectFit="contain"
											className="transition-opacity group-hover:opacity-90"
										/>
									</div>
								)}
								<PostHeader post={book} dir={'books'} />
							</div>
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
import {BOOK_API_URL} from '@/lib/constants'
const getBookData = async (isbn: string) => {
	return await fetch(`${BOOK_API_URL}${isbn}`)
}
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
		if(!post.isbn) return post
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
