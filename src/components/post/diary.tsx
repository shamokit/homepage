import Link from 'next/link'
import { DesignedDate } from '@/components/post/designed-date'
import { TagItem } from '@/components/tag/item'

import {TypeDiary} from '@/types/Diary'

const PostDiary = ({ title, body, _id, slug, day, _sys }: TypeDiary) => {
	return (
		<li className="grid gap-4">
			<Link href={`/diaries/${slug}/`}>
				<a className="group relative block max-w-full bg-base-color rounded text-white overflow-hidden">
					<div className="absolute inset-0 scale-75 opacity-0 glass transition-all group-hover:opacity-100 group-hover:scale-100"></div>
					<div className="pt-[46%]"></div>
					{ <DesignedDate dateString={day} className="absolute top-4 left-4" /> }
				</a>
			</Link>
			<Link href={`/diaries/${slug}/`}>
				<a className="block">
					<p className="font-semibold leading-normal tracking-wide">{title}</p>
				</a>
			</Link>
		</li>
	)
}

export default PostDiary
