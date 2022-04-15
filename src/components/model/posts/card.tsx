import Link from 'next/link'
import { AppDesignedDate } from '@/components/ui/date/AppDesignedDate'
import { TagItem } from '@/components/model/tags/item'

type TypeProps = {
	title: string
	date: string
	slug: string
	dir: string
	category?: string
	tags?: number[]
}

const PostCard = ({ title, date, slug, dir, category, tags }: TypeProps) => {
	const tagList = tags?.map((tagId) => {
		return (
			<li key={tagId}>
				<TagItem dirName={dir} id={tagId} />
			</li>
		)
	})
	return (
		<li className="grid gap-4">
			<Link href={`/${dir}/${slug}`}>
				<a className="group relative block max-w-full bg-base-color rounded text-white overflow-hidden">
					<div className="absolute inset-0 scale-75 opacity-0 glass transition-all group-hover:opacity-100 group-hover:scale-100"></div>
					<div className="pt-[46%]"></div>
					<AppDesignedDate
						dateString={date}
						className="absolute top-4 left-4"
					/>
				</a>
			</Link>
			{tagList && <ul className="flex flex-wrap gap-2 text-xs">{tagList}</ul>}
			<Link href={`/${dir}/${slug}`}>
				<a className="block">
					<p className="font-semibold leading-normal tracking-wide">{title}</p>
				</a>
			</Link>
		</li>
	)
}

export default PostCard
