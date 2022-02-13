import Container from '@/components/layout/Container'
import Meta from '@/components/seo/meta'
import PostIssue from '@/components/post/issue'
import LayoutBase from '@/components/layouts/LayoutBase'
import { Head01 } from '@/components/head/section-head01'
import { getAllPosts } from '@/lib/api'
import { TypePost } from '@/types/Post'
import PostBody from '@/components/post/body'
import { Btn01 } from '@/components/button/app-btn01'
type Props = {
	bookPosts: TypePost[]
	issuePosts: TypePost[]
	mainCopyContentHtml: any
}

import mdToHtml from '@/lib/markdownToHtml'
import { getPostBySlug } from '@/lib/api'

const Index = ({ bookPosts, issuePosts, mainCopyContentHtml }: Props) => {
	return (
		<>
			<Meta pageTitle={''} pageDescription={''} pageUrl={''} pageImg={''} />
			<LayoutBase>
				<Container className="md:flex items-center justify-center gap-4 lg:gap-10 px-0 lg:py-10">
					<div className="grid place-items-center pt-14 lg:pt-0">
						<PostBody
							content={mainCopyContentHtml}
							className="tracking-normal"
						/>
					</div>
					<h1 className="flex justify-center mt-8 tracking-widest text-lg md:text-xl lg:text-2xl font-bold lg:mt-0">
						<span>
							めんどくさいを<span className="text-glass-blue">楽ちん</span>に。
							<br />
							コーディングを<span className="text-glass-blue">楽しい</span>に。
						</span>
					</h1>
				</Container>
				<div className="mt-16">
					<Container>
						<div className="grid gap-10 md:gap-20 lg:gap-32">
							<section className="grid gap-4 md:gap-8 lg:gap-12">
								<Head01 text="About" />
								<p>
									このサイトはしゃもきっとが運営しているブログサイトです。
									<br />
									しゃもきっとに関して気になった人は
									Profileページを見てみてください。
								</p>
								<Btn01 href="/profile/" text="Profile" />
							</section>
							<section className="grid gap-4 md:gap-8 lg:gap-12">
								<Head01 text="Issue Posts" />
								{issuePosts.length > 0 && (
									<ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 lg:gap-8">
										{issuePosts.map((post) => {
											return <PostIssue {...post} key={post.slug} />
										})}
									</ul>
								)}
								<Btn01 href="/issues/" text="Issue一覧" />
							</section>
							<section className="grid gap-4 md:gap-8 lg:gap-12">
								<Head01 text="Book Posts" />
								{bookPosts.length > 0 && (
									<ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 lg:gap-8">
										{bookPosts.map((post) => {
											return <PostIssue {...post} key={post.slug} />
										})}
									</ul>
								)}
								<Btn01 href="/books/" text="Book一覧" />
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
