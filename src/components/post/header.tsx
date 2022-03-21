import { TypePost } from '@/types/Post'
import { TypeDiary } from '@/types/Diary'
type PropTypes = {
	post: TypePost | TypeDiary
	className?: string
	dir: string
}
import classnames from 'classnames'
import { PostTitle } from '@/components/post/title'
import { PostDate } from '@/components/post/date'
import { TagItem } from '@/components/tag/item'
export const PostHeader = ({ post, className , dir}: PropTypes) => {
	const hasTags = ('tags' in post) && post.tags && post.tags.length > 0
	return (
		<header className={classnames('grid gap-2', className)}>
			{
				hasTags && (
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
				)
			}
			<PostTitle title={post.title}></PostTitle>
			<PostDate pageSingle={true} dateString={post.date}></PostDate>
		</header>
	)
}
