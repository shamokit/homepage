import Link from 'next/link'
import { DesignedDate } from '@/components/post/designed-date'
import { PostDate } from '@/components/post/date'
import { TagItem } from '@/components/tag/item'

type Props = {
  title: string
  date: string
  slug: string
  tags?: number[]
}

const PostIssue = ({ title, date, slug, tags }: Props) => {
  const tagList = tags?.map((tagId) => {
    return (
      <li key={tagId}>
        <TagItem dirName="issues" id={tagId} />
      </li>
    )
  })
  return (
    <li className="grid gap-4">
      <Link href={`/issues/${slug}`}>
        <a className="group relative block max-w-full bg-base-color rounded text-white overflow-hidden">
          <div className="absolute inset-0 scale-75 opacity-0 glass transition-all group-hover:opacity-100 group-hover:scale-100"></div>
          <div className="pt-[46%]"></div>
          <DesignedDate dateString={date} className='absolute top-4 left-4' />
        </a>
      </Link>
      {tagList && <ul className="flex flex-wrap gap-2 text-xs">{tagList}</ul>}
      <Link href={`/issues/${slug}`}>
        <a className="block">
          <p className="text-base leading-snug font-bold">{title}</p>
        </a>
      </Link>
    </li>
  )
}

export default PostIssue
