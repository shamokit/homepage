import Link from 'next/link'
import { AppDate } from '@/components/ui/date/AppDate'
import { TagItem } from '@/components/model/tags/item'

import { TypeDiary } from '@/components/model/diaries/type'

const PostDiary = ({ title, slug, date }: TypeDiary) => {
	return (
		<li>
			<Link href={`/diaries/${slug}/`}>
				<a className="block md:flex py-5 border-b transition-colors hover:text-main">
					<div className="flex-shrink-0 mr-10 font-semibold gradation-text">
						<AppDate dateString={date} />
					</div>
					<p className="leading-normal tracking-wide">{title}</p>
				</a>
			</Link>
		</li>
	)
}

export default PostDiary
