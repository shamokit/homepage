import { GetStaticProps, GetStaticPaths } from 'next'
import Container from '@/components/layout/Container'
import LayoutBase from '@/components/layouts/LayoutBase'
import { getTagPosts } from '@/lib/api'
import { tags } from '@/lib/tags'
import {TypePost} from '@/types/Post'
import PostIssue from '@/components/post/issue'

type PathParams = {
  slug: string
}
type Props = {
  allPosts: TypePost[] | []
}

const Tag = ({ allPosts }: Props) => {
  return (
    <>
      <LayoutBase>
        <Container>
          {allPosts.length > 0 ?
            (
              allPosts.map((post) => {
                return <PostIssue {...post} key={post.slug} />
              })
            ) : '該当の記事はありません'
          }
        </Container>
      </LayoutBase>
    </>
  )
}

export default Tag

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as PathParams
  const allPosts = getTagPosts(
    ['title', 'date', 'slug', 'tags'],
    'issues',
    slug
  )

  return {
    props: { allPosts },
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
