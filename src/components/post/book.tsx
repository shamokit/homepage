import Link from 'next/link'
import { DesignedDate } from '@/components/post/designed-date'
import { TagItem } from '@/components/tag/item'

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
		<li className="flex p-2 gradation-r rounded-lg shadow">
			<div className="flex items-center flex-grow flex-shrink p-5 bg-white rounded">
				{thumbnail && (
					<Link href={`/books/${slug}`}>
						<a className="group relative w-32 min-h-[160px] flex-shrink-0 mr-5">
							<img
								src={thumbnail}
								alt={`${title} サムネイル画像`}
								className="transition-opacity group-hover:opacity-90"
								loading='lazy'
							/>
						</a>
					</Link>
				)}
				<div className="grid gap-3">
					<p className="font-semibold leading-normal tracking-wide">
						<Link href={`/books/${slug}`}>
							<a className="group relative overflow-hidden inline-block pb-2 tracking-widest">
								{title}
								<span className="absolute left-0 bottom-1 right-0 h-[1px] bg-accent scale-0 origin-bottom-right transition-transform ease-in-out duration-300 border-current text-current group-hover:scale-100 group-hover:origin-bottom-left will-change-transform"></span>
							</a>
						</Link>
					</p>
					{tagList && <ul className="flex flex-wrap gap-2 text-xs">{tagList}</ul>}
				</div>
			</div>
		</li>
	)
}

export default PostBook
