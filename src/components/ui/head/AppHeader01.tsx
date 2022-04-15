import { TypePost } from '@/components/model/posts/Post'
import { TypeDiary } from '@/components/model/diaries/type'
type PropTypes = {
	post: TypePost | TypeDiary
	className?: string
	dir: string
}
import classnames from 'classnames'
import { AppHead03 } from '@/components/ui/head/AppHead03'
import { AppDate } from '@/components/ui/date/AppDate'
import { TagItem } from '@/components/model/tags/item'
export const AppHeader01 = ({ post, className, dir }: PropTypes) => {
	const hasTags = 'tags' in post && post.tags && post.tags.length > 0
	return (
		<header className={classnames('grid gap-2', className)}>
			{hasTags && (
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
			<AppHead03 title={post.title}></AppHead03>
			<AppDate pageSingle={true} dateString={post.date}></AppDate>
		</header>
	)
}
