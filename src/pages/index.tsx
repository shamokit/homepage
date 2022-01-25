import Container from '@/components/layout/Container'
import Meta from '@/components/seo/meta'
import PostIssue from '@/components/post/issue'
import LayoutBase from '@/components/layouts/LayoutBase'
import { Head01 } from '@/components/head/section-head01'
import { getAllPosts } from '@/lib/api'
import { TypePost } from '@/types/Post'
import PostBody from '@/components/post/body'
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
        <div className="grid place-items-center pt-14">
          <PostBody content={mainCopyContentHtml} />
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
            <div className="grid gap-10">
              <section className="grid gap-4">
                <Head01 text="Issue Posts" />
                {issuePosts.length > 0 && (
                  <ul className="grid md:grid-cols-2 gap-2">
                    {issuePosts.map((post) => {
                      return <PostIssue {...post} key={post.slug} />
                    })}
                  </ul>
                )}
              </section>
              <section className="grid gap-4">
                <Head01 text="Book Posts" />
                {bookPosts.length > 0 && (
                  <ul className="grid md:grid-cols-2 gap-2">
                    {bookPosts.map((post) => {
                      return <PostIssue {...post} key={post.slug} />
                    })}
                  </ul>
                )}
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
