import Container from '@/components/layout/Container'
import LayoutBase from '@/components/layouts/LayoutBase'
import { getAllPosts } from '@/lib/api'
import TypePost from '@/types/Post'
import PostIssue from '@/components/post/issue'

type Props = {
  allPosts: TypePost[]
}

const Cat = ({ allPosts }: Props) => {
  return (
    <>
      <LayoutBase>
        <Container>{allPosts.map((post) => {
          return <PostIssue {...post} key={post.slug} />
        })}</Container>
      </LayoutBase>
    </>
  )
}

export default Cat

export const getStaticProps = async () => {
  const allPosts = getAllPosts(
    ['title', 'date', 'slug', 'tags'],
    'issues'
  )

  return {
    props: { allPosts },
  }
}
