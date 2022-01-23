import Container from '@/components/layout/Container'
import MoreStories from '@/components/more-stories'
import HeroPost from '@/components/hero-post'
import LayoutBase from '@/components/layouts/LayoutBase'
import { getAllPosts } from '@/lib/api'
import Head from 'next/head'
import { CMS_NAME } from '@/lib/constants'
import TypePost from '@/types/Post'

type Props = {
  allPosts: TypePost[]
}

const Cat = ({ allPosts }: Props) => {
  const heroPost = allPosts[0]
  const morePosts = allPosts.slice(1)
  return (
    <>
      <LayoutBase>
        <Container>
          {heroPost && (
            <HeroPost
              title={heroPost.title}
              coverImage={heroPost.coverImage}
              date={heroPost.date}
              slug={heroPost.slug}
            />
          )}
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        </Container>
      </LayoutBase>
    </>
  )
}

export default Cat

export const getStaticProps = async () => {
  const allPosts = getAllPosts([
    'title',
    'date',
    'slug',
    'coverImage',
    'excerpt',
  ])

  return {
    props: { allPosts },
  }
}
