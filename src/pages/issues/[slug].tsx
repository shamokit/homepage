import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Container from '@/components/layout/Container'
import PostBody from '@/components/post-body'
import Header from '@/components/header'
import Meta from '@/components/seo/meta'
import PostHeader from '@/components/post-header'
import LayoutBase from '@/components/layouts/LayoutBase'
import { getPostBySlug, getAllPosts } from '@/lib/api'
import PostTitle from '@/components/post-title'
import mdToHtml from '@/lib/markdownToHtml'
import TypePost from '@/types/Post'
import { TagItem } from '@/components/tag/item'

type Props = {
  post: TypePost
}

const Post = ({ post }: Props) => {
  const router = useRouter()
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }
  const title = `${post.title} | Issues`
  const description = `${post.description}`
  return (
    <LayoutBase>
      <Container>
        <Header />
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <Meta
              pageTitle={title}
              pageDescription={description}
              pageUrl={'localhost:3000'}
            />
            <article className="mb-32">
              <PostHeader title={post.title} date={post.date} />
              {post.tags
                ? post.tags.map((tag) => {
                    return <TagItem id={tag} dirName="issues" />
                  })
                : ''}
              <PostBody content={post.content} />
            </article>
          </>
        )}
      </Container>
    </LayoutBase>
  )
}

export default Post

type Params = {
  params: {
    slug: string
  }
}

export async function getStaticProps({ params }: Params) {
  const post = getPostBySlug(
    params.slug,
    ['title', 'date', 'slug', 'tags', 'content'],
    'issues'
  )
  const postContent = post['content'] as string
  const content = await mdToHtml(postContent! || '')

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  }
}

export async function getStaticPaths() {
  const posts = getAllPosts(['slug'], 'issues')

  return {
    paths: posts.map((post) => {
      return {
				params: {
					slug: post['slug']!,
				},
			};
    }),
    fallback: false,
  }
}
