import Link from 'next/link'
import { DesignedDate } from '@/components/post/designed-date'
import { TagItem } from '@/components/tag/item'
import Image from 'next/image'

type TypeProps = {
	title: string
	date: string
	slug: string
	tags?: number[]
	isbn?: string
	thumbnail?: string
}

const PostBook = ({ title, date, slug, tags, thumbnail }: TypeProps) => {
	const tagList = tags?.map((tagId) => {
		return (
			<li key={tagId}>
				<TagItem dirName="books" id={tagId} />
			</li>
		)
	})
	return (
		<li className="flex items-center p-5 gradation-dark text-white rounded-lg shadow">
			{thumbnail && (
				<Link href={`/books/${slug}`}>
					<a className="group relative w-32 min-h-[160px] flex-shrink-0 mr-5">
						<Image
							src={thumbnail}
							alt=""
							layout="fill"
							objectFit="contain"
							className="transition-opacity group-hover:opacity-90"
						/>
					</a>
				</Link>
			)}
			<div className="grid gap-4">
				<p className="font-semibold leading-normal tracking-wide">
					<Link href={`/books/${slug}`}>
						<a className="group relative overflow-hidden inline-block pb-2">
							{title}
							<span className="absolute left-0 bottom-1 right-0 h-[1px] bg-accent scale-0 origin-bottom-right transition-transform ease-in-out duration-300 border-current text-current group-hover:scale-100 group-hover:origin-bottom-left will-change-transform"></span>
						</a>
					</Link>
				</p>
				{tagList && <ul className="flex flex-wrap gap-2 text-xs">{tagList}</ul>}
			</div>
		</li>
	)
}

export default PostBook
