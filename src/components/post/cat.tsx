import Link from 'next/link'
import { DesignedDate } from '@/components/post/designed-date'
import { TagItem } from '@/components/tag/item'

type TypeProps = {
	title: string
	date: string
	slug: string
	tags?: number[]
}

const PostCat = ({ title, date, slug, tags }: TypeProps) => {
	const tagList = tags?.map((tagId) => {
		return (
			<li key={tagId}>
				<TagItem dirName="cats" id={tagId} />
			</li>
		)
	})
	return (
		<li className="grid gap-4">
			<Link href={`/cats/${slug}`}>
				<a className="group relative block max-w-full bg-base-color rounded text-white overflow-hidden">
					<div className="absolute inset-0 scale-75 opacity-0 glass transition-all group-hover:opacity-100 group-hover:scale-100"></div>
					<div className="pt-[46%]"></div>
					<DesignedDate dateString={date} className="absolute top-4 left-4" />
				</a>
			</Link>
			{tagList && <ul className="flex flex-wrap gap-2 text-xs">{tagList}</ul>}
			<Link href={`/cats/${slug}`}>
				<a className="block">
					<p className="font-bold">{title}</p>
				</a>
			</Link>
		</li>
	)
}

export default PostCat
