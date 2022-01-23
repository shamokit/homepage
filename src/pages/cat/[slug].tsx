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
import { CMS_NAME, DEFAULT_OGP_IMAGE_CAT } from '@/lib/constants'
import markdownToHtml from '@/lib/markdownToHtml'
import TypePost from '@/types/Post'

type Props = {
  post: TypePost
}

const Post = ({ post }: Props) => {
  const router = useRouter()
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }
  const title = `${post.title} | ねこ`
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
              <PostHeader
                title={post.title}
                coverImage={post.coverImage}
                date={post.date}
              />
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
  const post = getPostBySlug(params.slug, [
    'title',
    'date',
    'slug',
    'author',
    'content',
    'ogImage',
    'coverImage',
  ])
  const content = await markdownToHtml(post['content']! || '');

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
  const posts = getAllPosts(['slug'])

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
