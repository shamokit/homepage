import { Container } from '@/components/ui/layout/Container'
import { Meta } from '@/components/seo/meta'
import { LayoutBase } from '@/components/layouts/LayoutBase'
import { PostBody } from '@/components/ui/content/AppContentBody'

import { AppHead01 } from '@/components/ui/head/AppHead01'
import { AppHead02 } from '@/components/ui/head/AppHead02'
import { AppBtn01 } from '@/components/ui/button/AppBtn01'
import { BLOG_DOMAIN } from 'config/constants'
const breadcrumb = [
	{
		name: 'TOP',
		url: `${BLOG_DOMAIN}/`,
	},
	{
		name: 'Profile',
		url: `${BLOG_DOMAIN}/profile`,
	},
]
type Profile = {
	post: {
		title: string,
		content: string
	},
}
const Profile = ({ post }: Profile) => {
	return (
		<>
			<Meta
				pageTitle={'Profile'}
				pageDescription={'しゃもきっとのプロフィールです。'}
				pageUrl={'/profile/'}
				breadcrumb={breadcrumb}
			/>
			<LayoutBase breadcrumb={breadcrumb}>
				<Container>
					<section className="grid gap-4 md:gap-8 lg:gap-12">
						<AppHead01
							as="h1"
							text={'Profile'}
							lead={<p>しゃもきっとのプロフィールです。</p>}
						/>
						<PostBody content={post.content} />
					</section>
				</Container>
			</LayoutBase>
		</>
	)
}
export default Profile
import { getPostBySlug } from '@/lib/api'
import mdToHtml from '@/lib/markdownToHtml'

export async function getStaticProps() {
	const post = getPostBySlug('profile', [
		'title',
		'content',
	])
	const postContent = post['content'] as string
	const content = mdToHtml(postContent! || '')

	return {
		props: {
			post: {
				title: post.title,
				content,
			},
		},
	}
}
