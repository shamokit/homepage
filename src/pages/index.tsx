import Container from '@/components/layout/Container'
import Meta from '@/components/seo/meta'
import PostIssue from '@/components/post/issue'
import LayoutBase from '@/components/layouts/LayoutBase'
import { getAllPosts } from '@/lib/api'
import TypePost from '@/types/Post'
import PostBody from '@/components/post/body'
type Props = {
  allPosts: TypePost[]
  post: any
}

import mdToHtml from '@/lib/markdownToHtml'
import { getPostBySlug } from '@/lib/api'

const Index = ({ allPosts, post }: Props) => {
  return (
    <>
      <Meta
        pageTitle={'テスト'}
        pageDescription={''}
        pageUrl={'localhost:3000'}
        pageImg={''}
      />
      <LayoutBase>
        <div className="grid place-items-center pt-14">
          <PostBody content={post.content} />
        </div>
        <h1 className="flex justify-center mt-8 tracking-widest text-lg font-bold">
          <span>
            めんどくさいを<span className="text-main">楽ちん</span>に。
            <br />
            コーディングを<span className="text-main">楽しい</span>に。
          </span>
        </h1>
        <div className="mt-16">
          <Container>
            {allPosts.length > 0 &&
              allPosts.map((post) => {
                return <PostIssue {...post} key={post.slug} />
              })}
          </Container>
        </div>
      </LayoutBase>
    </>
  )
}

export default Index

export const getStaticProps = async () => {
  const post = getPostBySlug('text', ['title', 'content'], 'mainCopy')
  const postContent = post['content'] as string
  const content = await mdToHtml(postContent || '')
  const allPosts = getAllPosts(['title', 'date', 'slug', 'tags'], 'issues')

  return {
    props: {
      allPosts,
      post: {
        content,
      },
    },
  }
}
