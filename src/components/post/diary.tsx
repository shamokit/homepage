import Link from 'next/link'
import { PostDate } from '@/components/post/date'
import { TagItem } from '@/components/tag/item'

import {TypeDiary} from '@/types/Diary'

const PostDiary = ({ title, slug, date }: TypeDiary) => {
	return (
		<li>
			<Link href={`/diaries/${slug}/`}>
				<a className="block md:flex py-5 border-b transition-colors hover:text-main">
					<div className="flex-shrink-0 mr-10 font-semibold gradation-text">
						<PostDate dateString={date} />
					</div>
					<p className="leading-normal tracking-wide">{title}</p>
				</a>
			</Link>
		</li>
	)
}

export default PostDiary
