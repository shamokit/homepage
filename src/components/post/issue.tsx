import Link from 'next/link'
import { DateElem } from "@/components/post/date";
import { TagItem } from '@/components/tag/item'

type Props = {
  title: string
  date: string
  slug: string
  tags?: number[]
}

const PostIssue = ({ title, date, slug, tags }: Props) => {
  const tagList = tags?.map((tagId) => {
    return(<li><TagItem dirName='issue' id={tagId} /></li>)
  })
  return (
    <div className='grid gap-2'>
      <Link href={`/issues/${slug}`}>
        <a className="grid gap-2 hover:group">
          <div className="pt-[46%] bg-main group-hover:bg-main-bg"></div>
          <p className="leading-snug font-bold">{title}</p>
        </a>
      </Link>
      {tagList
        ? 
          <ul className='flex gap-2 text-xs'>{tagList}</ul>
        : null
      }
      <div className="text-sm font-code">
        <DateElem dateString={date} />
      </div>
    </div>
  )
}

export default PostIssue
