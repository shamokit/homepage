import { TypePost } from '@/types/Post'
type PropTypes = {
	post: TypePost
	className?: string
	dir: string
}
import classnames from 'classnames'
import { PostTitle } from '@/components/post/title'
import { PostDate } from '@/components/post/date'
import { TagItem } from '@/components/tag/item'
export const PostHeader = ({ post, className , dir}: PropTypes) => {
	return (
		<header className={classnames('grid gap-2', className)}>
			{post.tags && post.tags.length > 0 && (
				<ul className="flex gap-2">
					{post.tags
						? post.tags.map((tag) => {
								return (
									<li key={tag}>
										<TagItem id={tag} dirName={dir} />
									</li>
								)
						  })
						: ''}
				</ul>
			)}
			<PostTitle title={post.title}></PostTitle>
			<PostDate pageSingle={true} dateString={post.date}></PostDate>
		</header>
	)
}
