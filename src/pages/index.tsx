import { Container } from '@/components/layout/Container'
import { Meta } from '@/components/seo/meta'
import PostIssue from '@/components/post/issue'
import PostBook from '@/components/post/book'
import { LayoutBase } from '@/components/layouts/LayoutBase'
import { Head01 } from '@/components/head/section-head01'
import { getAllPosts } from '@/lib/api'
import { TypePost } from '@/types/Post'
import { PostBody } from '@/components/post/body'
import { Btn01 } from '@/components/button/app-btn01'
import { BLOG_DOMAIN } from '@/lib/constants'
type TypeProps = {
	bookPosts: TypePost[]
	issuePosts: TypePost[]
	mainCopyContentHtml: any
}

import mdToHtml from '@/lib/markdownToHtml'
import { getPostBySlug } from '@/lib/api'

const Index = ({ bookPosts, issuePosts, mainCopyContentHtml }: TypeProps) => {
	return (
		<>
			<Meta pageTitle={'しゃもきっとの技術ブログ'} pageDescription={''} pageUrl={''} pageImg={''} breadcrumb={[{
				name: 'TOPページ',
				url: `${BLOG_DOMAIN}/`
			}]} />
			<LayoutBase>
				<Container className="md:flex items-center justify-center gap-4 md:gap-8 lg:gap-16">
					<div className="grid place-items-center pt-8 md:pt-14 lg:pt-0">
						<PostBody
							content={mainCopyContentHtml}
							className="tracking-normal !leading-normal"
						/>
					</div>
					<h1 className="flex justify-center mt-8 lg:mt-0 tracking-wider text-lg md:text-xl lg:text-2xl font-medium">
						<span>
							めんどくさいを<span className="ml-2 mr-1 text-sub text-2xl md:text-3xl lg:text-4xl font-semibold tracking-widest">楽ちん</span>に。
							<br />
							コーディングを<span className="ml-2 mr-1 text-sub text-2xl md:text-3xl lg:text-4xl font-semibold tracking-widest">楽しい</span>に。
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
								<Head01 text="Issue Posts" />
								{issuePosts.length > 0 && (
									<ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 lg:gap-8">
										{issuePosts.map((post) => {
											return <PostIssue {...post} key={post.slug} />
										})}
									</ul>
								)}
								<Btn01 href="/issues/" text="Issues" />
							</section>
							<section className="grid gap-8 md:gap-12 lg:gap-20">
								<Head01 text="Book Posts" />
								{bookPosts.length > 0 && (
									<ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 lg:gap-8">
										{bookPosts.map((post) => {
											return <PostBook {...post} key={post.slug} />
										})}
									</ul>
								)}
								<Btn01 href="/books/" text="Books" />
							</section>
						</div>
					</Container>
				</div>
			</LayoutBase>
		</>
	)
}

export default Index

export const getStaticProps = async () => {
	const mainCopy = getPostBySlug('text', ['title', 'content'], 'mainCopy')
	const mainCopyContent = mainCopy['content'] as string
	const mainCopyContentHtml = await mdToHtml(mainCopyContent || '')
	const issuePosts = getAllPosts(['title', 'date', 'slug', 'tags'], 'issues')
	const bookPosts = getAllPosts(['title', 'date', 'slug', 'tags'], 'books')

	return {
		props: {
			bookPosts,
			issuePosts,
			mainCopyContentHtml,
		},
	}
}
