import Link from 'next/link'
import { getTag } from '@/lib/tags'
const TagItem = ({
	id,
	dirName,
	link = true,
}: {
	id: number
	dirName: string
	link?: boolean
}) => {
	const tagData = getTag(id)
	if (!tagData) return null
	const { slug, name } = tagData
	if (link) {
		return (
			<Link href={`/${dirName}/tag/${slug}/`}>
				<a className="relative group flex place-items-center px-3 py-2 font-code rounded gradation-r text-xs text-white leading-tight overflow-hidden shadow-sm">
					<div className="absolute inset-0 bg-base-color opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
					<span className="relative"># {name}</span>
				</a>
			</Link>
		)
	}
	return (
		<span className="flex place-items-center px-3 py-2 font-code rounded bg-base-color text-white leading-tight">
			{name}
		</span>
	)
}
export { TagItem }
