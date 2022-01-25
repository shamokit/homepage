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
        <TagItem dirName="issue" id={tagId} />
      </li>
    )
  })
  return (
    <li className="relative grid gap-4 px-4 pb-4 rounded overflow-hidden bg-white bg-opacity-10 transition-shadow hover:shadow-md">
      <Link href={`/issues/${slug}`}>
        <a className="relative block -mx-4 hover:group">
          <DesignedDate dateString={date} className='absolute top-2 left-2 text-white' />
          <div className="pt-[46%] bg-main"></div>
        </a>
      </Link>
      <div className="flex">
        <Link href={`/issues/${slug}`}>
          <a className="block transition-colors hover:text-main">
            <p className="text-base leading-snug font-bold">{title}</p>
          </a>
        </Link>
      </div>
      {tagList && <ul className="flex gap-2 text-xs">{tagList}</ul>}
    </li>
  )
}

export default PostIssue
