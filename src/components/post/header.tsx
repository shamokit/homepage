import { TypePost } from "@/types/Post";
type PropTypes = {
  post: TypePost
  className?: string
}
import classnames from "classnames";
import { PostTitle } from "@/components/post/title";
import { PostDate } from "@/components/post/date";
import { TagItem } from "@/components/tag/item";
export const PostHeader = ({post, className}:PropTypes) => {
  return (
    <header className={classnames('glass grid gap-4 p-4 shadow-md rounded', className)}>
      <PostTitle title={post.title}></PostTitle>
      <PostDate pageSingle={true} dateString={post.date}></PostDate>
      {post.tags && post.tags.length > 0 && (
        <ul className="flex gap-2">
          {post.tags
            ? post.tags.map((tag) => {
                return <TagItem id={tag} dirName="issues" />
              })
            : ''}
        </ul>
      )}
    </header>
  )
}
